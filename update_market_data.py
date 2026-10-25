#!/usr/bin/env python3
import concurrent.futures
import json
import statistics
import urllib.request
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parent
BEIJING = ZoneInfo("Asia/Shanghai")
STOCK_DEFINITIONS = [
    ("sh601168", "601168", "SZ", "西部矿业", "工业金属", "铜价与资源品"),
    ("sh601179", "601179", "SH", "中国西电", "电网设备", "电网投资与设备需求"),
    ("sh603400", "603400", "SH", "华之杰", "通用设备", "高端制造与设备需求"),
    ("sz002475", "002475", "SZ", "立讯精密", "消费电子", "消费电子与精密制造"),
    ("sh601899", "601899", "SH", "紫金矿业", "有色金属", "黄金与铜资源"),
    ("sz002384", "002384", "SZ", "东山精密", "电子元件", "PCB与精密制造"),
    ("sz000657", "000657", "SZ", "中钨高新", "小金属", "钨资源与硬质合金"),
    ("sh603986", "603986", "SH", "兆易创新", "半导体", "存储芯片与微控制器"),
]
A_SYMBOLS = ["sh000001", "sz399001", "sz399006", "sh000688"]
HK_SYMBOLS = ["hkHSI", "hkHSTECH"]
US_SYMBOLS = ["usDJI", "usINX", "usIXIC"]
COMMODITY_SYMBOLS = ["hf_CL", "hf_OIL", "hf_GC", "hf_HG"]


def fetch(url, attempts=3):
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
            "Referer": "https://gu.qq.com/",
        },
    )
    last_error = None
    for _ in range(attempts):
        try:
            with urllib.request.urlopen(request, timeout=35) as response:
                return response.read()
        except Exception as error:
            last_error = error
    raise RuntimeError(f"request failed: {url}") from last_error


def fetch_json(url):
    return json.loads(fetch(url))


def parse_quote_payload(payload):
    fields = payload.split("~")
    if len(fields) < 35:
        raise ValueError("invalid quote payload")

    def number_at(index):
        try:
            return float(fields[index] or 0)
        except (IndexError, ValueError):
            return 0.0

    return {
        "name": fields[1],
        "price": number_at(3),
        "previousClose": number_at(4),
        "open": number_at(5),
        "timestamp": fields[30],
        "change": number_at(31),
        "pct": number_at(32),
        "high": number_at(33),
        "low": number_at(34),
        "turnover": number_at(38),
        "pe": number_at(39),
        "floatMarketCap": number_at(44),
        "marketCap": number_at(45),
        "pb": number_at(46),
        "volumeRatio": number_at(49),
        "amountWan": number_at(57),
    }


def fetch_quotes(symbols):
    raw = fetch(f"https://qt.gtimg.cn/q={','.join(symbols)}").decode("gb18030", errors="replace")
    parsed = {}
    for line in raw.splitlines():
        if '="' not in line:
            continue
        symbol = line.split("=", 1)[0].lstrip("v_")
        parsed[symbol] = parse_quote_payload(line.split('="', 1)[1].rsplit('";', 1)[0])
    missing = [symbol for symbol in symbols if symbol not in parsed]
    if missing:
        raise RuntimeError(f"missing quotes: {', '.join(missing)}")
    return parsed


def fetch_market(symbol):
    minute = fetch_json(f"https://web.ifzq.gtimg.cn/appstock/app/minute/query?code={symbol}")
    daily = fetch_json(f"https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param={symbol},day,,,90,qfq")
    return symbol, minute["data"][symbol]["data"]["data"], daily["data"][symbol]


def fetch_index_history(symbol):
    payload = fetch_json(
        f"https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param={symbol},day,,,45,qfq"
    )["data"][symbol]
    rows = payload.get("day") or payload.get("qfqday")
    if not rows or len(rows) < 20:
        raise RuntimeError(f"insufficient index history for {symbol}")
    return symbol, rows


def ema(values, period):
    multiplier = 2 / (period + 1)
    result = [values[0]]
    for value in values[1:]:
        result.append(value * multiplier + result[-1] * (1 - multiplier))
    return result


def calculate_rsi(values, period=14):
    changes = [values[index] - values[index - 1] for index in range(1, len(values))]
    gains = [max(change, 0) for change in changes[-period:]]
    losses = [max(-change, 0) for change in changes[-period:]]
    average_gain = sum(gains) / period
    average_loss = sum(losses) / period
    if average_loss == 0:
        return 100.0
    return 100 - 100 / (1 + average_gain / average_loss)


def clamp(value, minimum, maximum):
    return max(minimum, min(maximum, value))


def quote_date_and_clock(raw):
    digits = "".join(character for character in raw if character.isdigit())
    if len(digits) < 12:
        return "", 0
    return f"{digits[:4]}-{digits[4:6]}-{digits[6:8]}", int(digits[8:10]) * 60 + int(digits[10:12])


def market_status(title, quote):
    date_text, clock = quote_date_and_clock(quote["timestamp"])
    month_day = date_text[5:].replace("-", "/")
    if title == "A股":
        return f"{'收盘' if clock >= 15 * 60 else '盘中'} · {month_day}"
    if title == "港股与期指":
        return f"{'收盘' if clock >= 16 * 60 else '盘中'} · {month_day}"
    if clock >= 16 * 60:
        return f"收盘 · {month_day} 美东"
    if clock >= 9 * 60 + 30:
        return f"盘中 · {month_day} 美东"
    return f"盘前/最近 · {month_day} 美东"


def group_rows(quotes, symbols, digits=2):
    return [
        {
            "symbol": symbol,
            "name": quotes[symbol]["name"],
            "value": round(quotes[symbol]["price"], digits),
            "pct": round(quotes[symbol]["pct"], 2),
            "time": quotes[symbol]["timestamp"],
        }
        for symbol in symbols
    ]


def parse_commodity(payload):
    fields = payload.split(",")
    return {
        "value": float(fields[0]),
        "pct": float(fields[1]),
        "timestamp": f"{fields[12]} {fields[6]}",
        "name": fields[13],
    }


def fetch_commodities():
    raw = fetch(f"https://qt.gtimg.cn/q={','.join(COMMODITY_SYMBOLS)}").decode("gb18030", errors="replace")
    parsed = {}
    for line in raw.splitlines():
        if '="' not in line:
            continue
        symbol = line.split("=", 1)[0].lstrip("v_")
        parsed[symbol] = parse_commodity(line.split('="', 1)[1].rsplit('";', 1)[0])
    return parsed


def trim_minute(rows):
    minute_map = {}
    for row in rows:
        parts = row.split()
        if len(parts) >= 2:
            minute_map[parts[0]] = float(parts[1])
    targets = [
        "0930", "0940", "0950", "1000", "1010", "1020", "1030", "1040",
        "1050", "1100", "1110", "1120", "1130", "1309", "1319", "1329",
        "1339", "1349", "1359", "1409", "1419", "1429", "1439", "1449",
        "1459", "1500",
    ]

    def value_at(target):
        if target in minute_map:
            return minute_map[target]
        later = sorted(time for time in minute_map if time >= target)
        return minute_map[later[0]] if later else list(minute_map.values())[-1]

    return [[target, round(value_at(target), 2)] for target in targets]


def build_stock(definition, quote, minute_rows, daily_payload):
    symbol, code, exchange, name, sector, business = definition
    minute = trim_minute(minute_rows)
    daily_rows = daily_payload.get("qfqday") or daily_payload.get("day")
    if not daily_rows or len(daily_rows) < 60:
        raise RuntimeError(f"insufficient daily data for {name}")

    closes = [float(row[2]) for row in daily_rows]
    daily = [[row[0][5:], round(float(row[2]), 2)] for row in daily_rows[-31:]]
    ma5, ma10, ma20, ma60 = [statistics.mean(closes[-period:]) for period in (5, 10, 20, 60)]
    price = quote["price"]
    rsi14 = calculate_rsi(closes)
    ema12, ema26 = ema(closes, 12), ema(closes, 26)
    dif = [first - second for first, second in zip(ema12, ema26)]
    signal = ema(dif, 9)
    macd_histogram = (dif[-1] - signal[-1]) * 2
    close_position = (price - quote["low"]) / max(quote["high"] - quote["low"], 0.01) * 100

    true_ranges = []
    for index in range(max(1, len(daily_rows) - 14), len(daily_rows)):
        row = daily_rows[index]
        day_high, day_low = float(row[3]), float(row[4])
        prior_close = float(daily_rows[index - 1][2])
        true_ranges.append(max(day_high - day_low, abs(day_high - prior_close), abs(day_low - prior_close)))
    atr_pct = statistics.mean(true_ranges) / price * 100

    if atr_pct >= 6:
        volatility_level, volatility_width = "高", 82
    elif atr_pct >= 4:
        volatility_level, volatility_width = "中高", 68
    elif atr_pct >= 2.5:
        volatility_level, volatility_width = "中等", 52
    else:
        volatility_level, volatility_width = "中低", 38

    ten_day_low = min(float(row[4]) for row in daily_rows[-10:])
    twenty_day_high = max(float(row[3]) for row in daily_rows[-20:])
    support = min(ten_day_low, ma10 if ma10 < price else ten_day_low)
    resistance_candidates = [
        (value, label)
        for value, label in ((ma10, "MA10"), (ma20, "MA20"), (twenty_day_high, "20日高点"))
        if value > price * 1.003
    ]
    if resistance_candidates:
        resistance1, resistance_label = min(resistance_candidates)
    else:
        resistance1, resistance_label = price * (1 + max(atr_pct * 0.6, 2) / 100), "波动上沿"
    resistance2 = max(resistance1 * 1.04, twenty_day_high if twenty_day_high > resistance1 else ma60)

    above_short = price >= ma5 and price >= ma10
    above_mid = price >= ma20
    if quote["pct"] >= 4 and close_position >= 75:
        bias, trend = "高开分化", "强势加速"
        description = "尾盘接近日内高位，次日容易惯性高开；同时短线获利盘较多，需要成交量继续确认。"
        probability = 62
    elif above_short and macd_histogram >= 0:
        bias, trend = "平开偏强", "短线转强"
        description = "收盘站上短周期均线，动能有所改善；若开盘不明显放量低走，延续偏强的概率相对更高。"
        probability = 58
    elif above_mid:
        bias, trend = "震荡偏强", "上升整理"
        description = "价格仍处于中期均线上方，但短线动能一般，次日更可能以震荡换手消化获利盘。"
        probability = 55
    else:
        bias, trend = "低开修复", "弱势修复"
        description = "收盘仍未完全摆脱短中期均线压力，次日若低开，需要观察低位买盘能否迅速承接。"
        probability = 49
    probability = int(clamp(probability + (3 if close_position > 70 else -2), 45, 66))

    open_width = max(atr_pct * 0.28, 0.8) / 100
    open_range = f"{price * (1 - open_width):.2f}—{price * (1 + open_width):.2f}"
    fundamental_pill = "周期低估" if quote["pe"] < 15 else "估值适中" if quote["pe"] < 30 else "估值偏高" if quote["pe"] < 50 else "高估值"

    signals = [
        ["收盘位置", "偏强" if close_position >= 65 else "中性" if close_position >= 40 else "偏弱", "positive-signal" if close_position >= 65 else "neutral-signal" if close_position >= 40 else "negative-signal"],
        ["短均线", "站上" if above_short else "未收复", "positive-signal" if above_short else "negative-signal"],
        ["MACD", "正动能" if macd_histogram > 0 else "负动能", "positive-signal" if macd_histogram > 0 else "negative-signal"],
        ["活跃度", "较高" if quote["turnover"] >= 5 else "常态", "neutral-signal"],
    ]
    trigger_price = ma5 if bias == "高开分化" else resistance1
    scenarios = [
        {"title": "平开后震荡整固", "tag": "基准", "description": f"开盘在 {open_range} 元附近，围绕 {price:.2f} 元上下换手。", "trigger": f"开盘后 15 分钟不跌破 {support:.2f} 元，视为正常整理"},
        {"title": "放量向上确认", "tag": "强势", "description": f"市场情绪延续，价格向上测试 {resistance1:.2f} 元附近压力。", "trigger": f"放量站稳 {resistance1:.2f} 元，下一观察位 {resistance2:.2f} 元"},
        {"title": "低开回踩支撑", "tag": "谨慎", "description": f"若板块或大盘转弱，价格可能回踩 {support:.2f} 元附近支撑。", "trigger": f"放量跌破 {support:.2f} 元，波动等级上调"},
    ]

    thesis = (
        f"今日收盘 {price:.2f} 元，较昨收 {quote['pct']:+.2f}%，"
        f"收盘位于日内振幅的 {close_position:.0f}% 位置。"
        f"当前 RSI(14) 约 {rsi14:.1f}，MACD柱体为 {macd_histogram:+.3f}；"
        f"{'已站上' if above_mid else '仍低于'} MA20，趋势{'改善' if above_mid and macd_histogram > 0 else '仍需确认'}。"
    )

    return {
        "id": code,
        "price": price,
        "previousClose": quote["previousClose"],
        "open": quote["open"],
        "high": quote["high"],
        "low": quote["low"],
        "change": quote["change"],
        "changePct": quote["pct"],
        "amount": f"{quote['amountWan'] / 10000:.2f} 亿元",
        "turnover": f"{quote['turnover']:.2f}%",
        "pe": f"{quote['pe']:.2f}×",
        "pb": f"{quote['pb']:.2f}×",
        "marketCap": f"{quote['marketCap']:.1f} 亿元",
        "openBias": bias,
        "openProbability": probability,
        "openDescription": description,
        "openRange": open_range,
        "openTrigger": f"{'守住' if probability >= 55 else '收复'} {trigger_price:.2f} 元是短线确认信号",
        "volatilityLevel": volatility_level,
        "volatilityWidth": volatility_width,
        "volatilityText": f"近14日平均真实波幅约 {atr_pct:.1f}%",
        "trendLabel": trend,
        "fundamentalPill": fundamental_pill,
        "support1": f"{support:.2f}",
        "resistance1": f"{resistance1:.2f}",
        "resistance2": f"{resistance2:.2f}",
        "supportLabel": "近10日低点",
        "resistanceLabel": resistance_label,
        "resistance2Label": "中期压力",
        "thesis": thesis,
        "signals": signals,
        "movingAverages": [
            ["MA5", round(ma5, 2), round((price - ma5) / ma5 * 100, 2)],
            ["MA10", round(ma10, 2), round((price - ma10) / ma10 * 100, 2)],
            ["MA20", round(ma20, 2), round((price - ma20) / ma20 * 100, 2)],
            ["MA60", round(ma60, 2), round((price - ma60) / ma60 * 100, 2)],
        ],
        "scenarios": scenarios,
        "minute": minute,
        "daily": daily,
        "history": {"bias": bias, "volatility": volatility_level, "trigger": f"守住 {support:.2f}"},
        "sector": sector,
        "business": business,
        "_analysis": {
            "score": (2 if quote["pct"] >= 4 else 1 if quote["pct"] > 0 else -1)
            + (1 if above_short else -1)
            + (1 if above_mid else -1)
            + (1 if macd_histogram > 0 else -1)
            + (1 if 25 <= rsi14 <= 55 else 0)
            - (1 if rsi14 > 75 else 0),
            "driver": business,
            "watch": f"{support:.2f} 元支撑与 {resistance1:.2f} 元压力",
        },
    }


def build_tomorrow_analysis(quotes, index_histories, stock_updates, commodities):
    rows = index_histories["sh000001"]
    closes = [float(row[2]) for row in rows]
    price = quotes["sh000001"]["price"]
    ma5, ma10, ma20 = [statistics.mean(closes[-period:]) for period in (5, 10, 20)]
    ten_day_low = min(float(row[4]) for row in rows[-10:])
    twenty_day_high = max(float(row[3]) for row in rows[-20:])
    true_ranges = []
    for index in range(max(1, len(rows) - 14), len(rows)):
        row = rows[index]
        previous_close = float(rows[index - 1][2])
        true_ranges.append(
            max(
                float(row[3]) - float(row[4]),
                abs(float(row[3]) - previous_close),
                abs(float(row[4]) - previous_close),
            )
        )
    atr_pct = statistics.mean(true_ranges) / price * 100

    support_candidates = [
        value
        for value in (quotes["sh000001"]["previousClose"], ma5, ma10, ma20, ten_day_low)
        if value < price
    ]
    resistance_candidates = [value for value in (ma5, ma10, ma20, twenty_day_high) if value > price]
    support = max(support_candidates) if support_candidates else ten_day_low
    resistance = min(resistance_candidates) if resistance_candidates else price * (1 + atr_pct / 100)
    support2 = min(ten_day_low, ma20)
    resistance2 = max(twenty_day_high, ma20)

    average_index_change = statistics.mean(quotes[symbol]["pct"] for symbol in A_SYMBOLS)
    positive_indices = sum(1 for symbol in A_SYMBOLS if quotes[symbol]["pct"] > 0)
    positive_stocks = sum(1 for item in stock_updates if item["changePct"] > 0)
    us_average = statistics.mean(quotes[symbol]["pct"] for symbol in US_SYMBOLS)
    commodity_penalty = -2 if commodities["hf_CL"]["pct"] > 3 else 0
    probability = round(
        clamp(
            50
            + average_index_change * 2
            + (positive_indices - 2) * 2
            + (positive_stocks - len(stock_updates) / 2)
            + (2 if price > ma20 else -2)
            + (-2 if us_average < -0.8 else 0)
            + commodity_penalty,
            45,
            68,
        )
    )

    if average_index_change >= 1.5 and positive_indices >= 3:
        bias = "偏强震荡"
        summary = "成长指数和多数自选板块同步走强，下一交易日仍有惯性，但接近压力位后更看重成交量。"
    elif average_index_change >= 0:
        bias = "震荡偏强"
        summary = "市场结构偏多但指数尚未形成单边趋势，下一交易日更可能在支撑与压力之间反复确认。"
    elif average_index_change <= -1:
        bias = "低开修复"
        summary = "指数承压后需要先确认低位承接，若支撑有效才具备修复条件。"
    else:
        bias = "区间震荡"
        summary = "指数与板块分化，方向性不足，下一交易日重点看成交量能否打破平衡。"

    open_width = max(atr_pct * 0.3, 0.7) / 100
    open_range = f"{price * (1 - open_width):.1f}—{price * (1 + open_width):.1f}"
    high_probability = round((100 - probability) * 0.55)
    risk_probability = 100 - probability - high_probability
    date_label = next_trading_day().strftime("%-m月%-d日")
    weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    date_label = f"{date_label} {weekdays[next_trading_day().weekday()]}"

    return {
        "dateLabel": date_label,
        "bias": bias,
        "probability": probability,
        "summary": summary,
        "openRange": open_range,
        "support1": f"{support:.2f}",
        "support2": f"{support2:.2f}",
        "resistance1": f"{resistance:.2f}",
        "resistance2": f"{resistance2:.2f}",
        "trigger": f"站上 {resistance:.2f} 且成交额放大，偏强情景确认",
        "invalidation": f"跌破 {support:.2f} 后不能快速收回，偏强判断失效",
        "scenarios": [
            {
                "tag": "基准",
                "title": "支撑上方震荡",
                "probability": probability,
                "description": f"指数在 {support:.2f}—{resistance:.2f} 区间内换手，板块继续分化。",
                "trigger": f"守住 {support:.2f}，成交额不明显萎缩",
            },
            {
                "tag": "强势",
                "title": "放量突破压力",
                "probability": high_probability,
                "description": f"成长与资源方向同步走强，指数向上测试 {resistance:.2f}。",
                "trigger": f"放量站稳 {resistance:.2f}",
            },
            {
                "tag": "谨慎",
                "title": "跌破支撑回踩",
                "probability": risk_probability,
                "description": f"外围风险或高估值板块回落，指数跌破 {support:.2f}。",
                "trigger": f"放量跌破 {support:.2f} 且 30 分钟内未收复",
            },
        ],
    }


def build_market_summary(quotes, commodities):
    def metric(symbol):
        quote = quotes[symbol]
        return [quote["name"], round(quote["price"], 4 if quote["price"] < 10 else 2), round(quote["pct"], 2)]

    a_growth = statistics.mean([quotes["sz399006"]["pct"], quotes["sh000688"]["pct"]])
    a_main = statistics.mean([quotes["sh000001"]["pct"], quotes["sz399001"]["pct"]])
    hk_gap = quotes["hkHSTECH"]["pct"] - quotes["hkHSI"]["pct"]
    us_values = [quotes[symbol]["pct"] for symbol in US_SYMBOLS]
    cards = [
        {
            "region": "A股",
            "status": market_status("A股", quotes["sh000001"]),
            "title": "成长风格明显领先" if a_growth > a_main + 0.5 else "权重与成长同步",
            "metrics": [metric(symbol) for symbol in A_SYMBOLS[:3]],
            "note": f"创业板与科创50平均涨跌幅 {a_growth:+.2f}%，主板均值 {a_main:+.2f}%；下一阶段重点看成交额能否延续。",
        },
        {
            "region": "港股",
            "status": market_status("港股与期指", quotes["hkHSI"]),
            "title": "科技修复强于主板" if hk_gap > 0.3 else "主板与科技分化有限",
            "metrics": [metric(symbol) for symbol in HK_SYMBOLS],
            "note": f"恒生科技相对恒生指数 {hk_gap:+.2f} 个百分点；外围利率和人民币波动仍会影响修复持续性。",
        },
        {
            "region": "美股",
            "status": market_status("美股", quotes["usDJI"]),
            "title": "分化加剧" if max(us_values) - min(us_values) > 1 else "整体波动有限",
            "metrics": [metric(symbol) for symbol in US_SYMBOLS],
            "note": f"三大指数最大强弱差 {max(us_values) - min(us_values):.2f} 个百分点，需继续观察科技权重和利率预期。",
        },
        {
            "region": "宏观",
            "status": f"最近可得 · {commodities['hf_CL']['timestamp']}",
            "title": "输入型成本仍有压力" if commodities["hf_CL"]["pct"] > 0 else "大宗价格压力缓和",
            "metrics": [
                ["WTI原油", round(commodities["hf_CL"]["value"], 2), round(commodities["hf_CL"]["pct"], 2)],
                ["COMEX铜", round(commodities["hf_HG"]["value"] / 100, 4), round(commodities["hf_HG"]["pct"], 2)],
                ["COMEX黄金", round(commodities["hf_GC"]["value"], 2), round(commodities["hf_GC"]["pct"], 2)],
            ],
            "note": "原油上行会增加制造业成本；铜价偏强有利于资源板块；黄金回落通常对应避险需求降温。",
        },
    ]
    return cards


def next_trading_day():
    current = datetime.now(BEIJING).date() + timedelta(days=1)
    while current.weekday() >= 5:
        current += timedelta(days=1)
    return current


def main():
    now = datetime.now(BEIJING)
    quote_symbols = A_SYMBOLS + HK_SYMBOLS + US_SYMBOLS + [item[0] for item in STOCK_DEFINITIONS]
    quotes = fetch_quotes(quote_symbols)
    commodities = fetch_commodities()

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        market_data = {
            symbol: (minute, daily)
            for symbol, minute, daily in executor.map(fetch_market, [item[0] for item in STOCK_DEFINITIONS])
        }
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        index_histories = dict(executor.map(fetch_index_history, A_SYMBOLS))

    stock_updates = []
    for definition in STOCK_DEFINITIONS:
        symbol = definition[0]
        minute, daily = market_data[symbol]
        stock_updates.append(build_stock(definition, quotes[symbol], minute, daily))

    a_average = statistics.mean([quotes[symbol]["pct"] for symbol in A_SYMBOLS])
    breadth_positive = sum(1 for item in stock_updates if item["changePct"] > 0)
    tomorrow_analysis = build_tomorrow_analysis(quotes, index_histories, stock_updates, commodities)
    ranked_stocks = sorted(stock_updates, key=lambda item: item["_analysis"]["score"], reverse=True)
    sector_pulse = [
        {
            "id": item["id"],
            "bias": "偏强" if item["_analysis"]["score"] >= 4 else "修复" if item["_analysis"]["score"] >= 1 else "承压" if item["_analysis"]["score"] <= -4 else "震荡",
            "priority": index + 1,
            "driver": item["_analysis"]["driver"],
            "watch": item["_analysis"]["watch"],
        }
        for index, item in enumerate(ranked_stocks)
    ]

    generated_label = now.strftime("%Y-%m-%d %H:%M")
    market_read_title = "成长修复，资源分化，外部风险仍在" if a_average > 0 else "市场承压，优先等待支撑确认"
    market_read_text = (
        f"A股主要指数平均涨跌幅 {a_average:+.2f}%，自选股上涨家数 {breadth_positive}/{len(stock_updates)}。"
        f"恒生科技相对恒生指数 {(quotes['hkHSTECH']['pct'] - quotes['hkHSI']['pct']):+.2f} 个百分点。"
        f"WTI原油 {commodities['hf_CL']['pct']:+.2f}%，COMEX铜 {commodities['hf_HG']['pct']:+.2f}%，"
        f"COMEX黄金 {commodities['hf_GC']['pct']:+.2f}%。"
    )
    market_news = [
        [f"A股：上证 {quotes['sh000001']['pct']:+.2f}%，深证 {quotes['sz399001']['pct']:+.2f}%，创业板 {quotes['sz399006']['pct']:+.2f}%。", f"自动快照 · {generated_label}"],
        [f"港股：恒生指数 {quotes['hkHSI']['pct']:+.2f}%，恒生科技 {quotes['hkHSTECH']['pct']:+.2f}%。", f"自动快照 · {generated_label}"],
        [f"美股：道指 {quotes['usDJI']['pct']:+.2f}%，标普500 {quotes['usINX']['pct']:+.2f}%，纳指 {quotes['usIXIC']['pct']:+.2f}%。", f"自动快照 · {generated_label}"],
        [f"商品：WTI {commodities['hf_CL']['pct']:+.2f}%，布伦特 {commodities['hf_OIL']['pct']:+.2f}%，COMEX铜 {commodities['hf_HG']['pct']:+.2f}%。", f"行情源 · {commodities['hf_CL']['timestamp']}"],
        ["自动任务不替代交易所公告；涉及公司订单、监管和重大事项时，应以正式公告为准。", "风险提示"],
    ]

    snapshot = {
        "version": 1,
        "generatedAt": generated_label,
        "marketGroups": [
            {"title": "A股", "status": market_status("A股", quotes["sh000001"]), "rows": group_rows(quotes, A_SYMBOLS)},
            {"title": "港股与期指", "status": market_status("港股与期指", quotes["hkHSI"]), "rows": group_rows(quotes, HK_SYMBOLS)},
            {"title": "美股", "status": market_status("美股", quotes["usDJI"]), "rows": group_rows(quotes, US_SYMBOLS)},
        ],
        "macro": [
            {"symbol": "102.CL00Y", "value": round(commodities["hf_CL"]["value"], 2), "pct": round(commodities["hf_CL"]["pct"], 2), "note": "美元/桶"},
            {"symbol": "112.B00Y", "value": round(commodities["hf_OIL"]["value"], 2), "pct": round(commodities["hf_OIL"]["pct"], 2), "note": "美元/桶"},
            {"symbol": "101.GC00Y", "value": round(commodities["hf_GC"]["value"], 2), "pct": round(commodities["hf_GC"]["pct"], 2), "note": "美元/盎司"},
            {"symbol": "101.HG00Y", "value": round(commodities["hf_HG"]["value"] / 100, 4), "pct": round(commodities["hf_HG"]["pct"], 2), "note": "美元/磅"},
        ],
        "stocks": stock_updates,
        "marketSummaryCards": build_market_summary(quotes, commodities),
        "marketRead": {"title": market_read_title, "text": market_read_text},
        "dailyMainline": {"title": market_read_title, "text": market_read_text},
        "macroRelease": f"自动快照生成于 {generated_label}。宏观日历与公司公告未由本任务抓取，涉及最新事件请以官方发布为准。",
        "marketNews": market_news,
        "sectorPulseDefinitions": sector_pulse,
        "tomorrowAnalysis": tomorrow_analysis,
    }

    snapshot_path = ROOT / "latest.json"
    temporary_path = ROOT / "latest.json.tmp"
    temporary_path.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n")
    temporary_path.replace(snapshot_path)

    report_lines = [
        "# 地平线 · 每日股市简报",
        "",
        f"- 自动生成：{generated_label}（北京时间）",
        "- 数据源：腾讯公开行情接口",
        "- 说明：预测为规则模型条件情景，不构成投资建议",
        "",
        "## 大盘快照",
        "",
    ]
    for card in snapshot["marketSummaryCards"]:
        metrics = "；".join(f"{name} {value}（{pct:+.2f}%）" for name, value, pct in card["metrics"])
        report_lines.extend([f"### {card['region']} · {card['title']}", "", f"{metrics}。", "", card["note"], ""])
    report_lines.extend(
        [
            f"## 明日分析 · {tomorrow_analysis['dateLabel']}",
            "",
            f"**{tomorrow_analysis['bias']}（{tomorrow_analysis['probability']}%）**",
            "",
            tomorrow_analysis["summary"],
            "",
            f"- 开盘参考：{tomorrow_analysis['openRange']}",
            f"- 第一 / 第二支撑：{tomorrow_analysis['support1']} / {tomorrow_analysis['support2']}",
            f"- 第一 / 第二压力：{tomorrow_analysis['resistance1']} / {tomorrow_analysis['resistance2']}",
            f"- 确认信号：{tomorrow_analysis['trigger']}",
            f"- 失效条件：{tomorrow_analysis['invalidation']}",
            "",
            "## 明日板块优先级",
            "",
        ]
    )
    for definition in sector_pulse:
        item = next(stock for stock in stock_updates if stock["id"] == definition["id"])
        report_lines.append(
            f"{definition['priority']}. {item['sector']} / {item['id']}：{definition['bias']}；观察 {definition['watch']}"
        )
    report_lines.extend(["", snapshot["macroRelease"], ""])
    (ROOT / "DAILY_REPORT_LATEST.md").write_text("\n".join(report_lines))
    print(json.dumps({"generatedAt": generated_label, "stocks": len(stock_updates), "indices": len(A_SYMBOLS + HK_SYMBOLS + US_SYMBOLS)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
