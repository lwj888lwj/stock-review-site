const stocks = [
  {
    id: "601168",
    exchange: "SH",
    name: "西部矿业",
    sector: "工业金属",
    session: "15:00 已收盘",
    price: 31.28,
    previousClose: 30.83,
    open: 29.81,
    high: 31.52,
    low: 29.58,
    change: 0.45,
    changePct: 1.46,
    amount: "14.72 亿元",
    turnover: "2.03%",
    pe: "9.96×",
    pb: "2.98×",
    marketCap: "745.4 亿元",
    openBias: "低开修复",
    openProbability: 54,
    openDescription: "低开后存在回补机会，但是否形成持续反弹，要看30.83元能否快速收复。",
    openRange: "30.50—31.10",
    openTrigger: "收复 30.83 是修复确认信号，站上 31.52 才会增强",
    volatilityLevel: "中高",
    volatilityWidth: 68,
    volatilityText: "预期日内振幅 3.2%—5.0%",
    trendLabel: "偏弱修复",
    fundamentalPill: "利润提速",
    support1: "29.58",
    resistance1: "32.77",
    resistance2: "34.21",
    supportLabel: "今日低点",
    resistanceLabel: "10日均线",
    resistance2Label: "20日均线",
    thesis: "今日从29.58元拉回31.28元，形成明显深V修复；但收盘价仍低于主要均线，趋势尚未真正反转。",
    positiveFactors: [
      "前三季度归母净利润同比增长130.5%，盈利端明显加速。",
      "今日尾盘价格接近日内高位，买盘承接较强。",
      "铜价上涨、资源储量备案及采矿许可证构成中期基本面支撑。"
    ],
    riskFactors: [
      "股价仍在5、10、20、60日均线下方，日线趋势偏空。",
      "铜、钼等商品价格回落会快速压缩盈利预期。",
      "若跌破29.58元，短线可能继续测试28—29元区域。"
    ],
    signals: [
      ["日内修复", "偏强", "positive-signal"],
      ["均线结构", "偏弱", "negative-signal"],
      ["MACD", "负动能", "negative-signal"],
      ["量能", "中性", "neutral-signal"]
    ],
    movingAverages: [
      ["MA5", 31.49, 0.67],
      ["MA10", 32.77, 4.76],
      ["MA20", 34.21, 9.37],
      ["MA60", 37.00, 18.29]
    ],
    fundamentals: [
      ["营业收入", "597.88 亿", "+23.42%"],
      ["归母净利润", "67.89 亿", "+130.50%"],
      ["基本EPS", "2.85 元", "前三季度"],
      ["ROE", "31.22%", "盈利效率高"],
      ["毛利率", "24.14%", "成本控制"],
      ["经营现金流/股", "5.31 元", "现金充沛"]
    ],
    fundamentalNote: "2026年三季报数据。盈利大幅增长主要由金属业务量价改善推动，周期属性仍然较强。",
    scenarios: [
      {
        title: "小幅低开后修复",
        tag: "基准",
        description: "开盘位于30.50—31.10元，30.83元附近多空争夺后逐步回升。",
        trigger: "15分钟内量价同步修复，并重新站上30.83元"
      },
      {
        title: "高开并突破压力",
        tag: "强势",
        description: "宏观或商品价格继续偏强，开盘直接进入31.52—32.77元观察区。",
        trigger: "放量站稳32.77元，下一观察位34.21元"
      },
      {
        title: "低开跌破支撑",
        tag: "谨慎",
        description: "若商品价格回落或市场风险偏好转弱，价格可能再次测试29.58元。",
        trigger: "放量跌破29.58元，波动等级上调"
      }
    ],
    minute: [
      ["0930",29.81],["0940",29.98],["0950",30.08],["1000",29.77],["1010",29.77],
      ["1020",29.76],["1030",29.85],["1040",30.38],["1050",30.20],["1100",30.50],
      ["1110",30.42],["1120",30.34],["1130",30.42],["1309",30.67],["1319",30.79],
      ["1329",30.97],["1339",30.97],["1349",30.98],["1359",30.98],["1409",31.07],
      ["1419",31.32],["1429",31.17],["1439",31.30],["1449",31.38],["1459",31.25],["1500",31.28]
    ],
    daily: [
      ["09-03",40.00],["09-04",38.79],["09-07",38.63],["09-08",40.69],["09-09",41.15],
      ["09-10",40.47],["09-11",37.59],["09-14",36.65],["09-15",35.77],["09-16",36.19],
      ["09-17",35.45],["09-18",36.03],["09-21",36.23],["09-22",36.77],["09-23",36.81],
      ["09-24",35.19],["09-28",33.77],["09-29",35.17],["09-30",35.35],["10-08",35.13],
      ["10-09",36.01],["10-12",34.74],["10-13",35.31],["10-14",34.85],["10-15",32.50],
      ["10-16",32.85],["10-19",32.37],["10-20",31.32],["10-21",31.67],["10-22",30.83],["10-23",31.28]
    ],
    history: {
      bias: "小幅低开后尝试修复",
      volatility: "中高",
      trigger: "收复 30.83"
    }
  },
  {
    id: "601179",
    exchange: "SH",
    name: "中国西电",
    sector: "电网设备",
    session: "15:00 已收盘",
    price: 11.44,
    previousClose: 11.19,
    open: 11.00,
    high: 11.49,
    low: 10.87,
    change: 0.25,
    changePct: 2.23,
    amount: "9.34 亿元",
    turnover: "1.63%",
    pe: "39.49×",
    pb: "2.49×",
    marketCap: "586.4 亿元",
    openBias: "平开偏强",
    openProbability: 57,
    openDescription: "短线动能已经改善，若开盘守住11.24元附近，震荡向上的概率略高。",
    openRange: "11.25—11.50",
    openTrigger: "守住 11.24 是短线偏强基础，突破 11.49 可看 11.54",
    volatilityLevel: "中等",
    volatilityWidth: 52,
    volatilityText: "预期日内振幅 2.5%—3.8%",
    trendLabel: "弱势转强",
    fundamentalPill: "盈利改善",
    support1: "11.19",
    resistance1: "11.54",
    resistance2: "12.34",
    supportLabel: "昨日收盘",
    resistanceLabel: "20日均线",
    resistance2Label: "20日高点",
    thesis: "今日从10.87元拉起并收在11.44元，重新站上5日和10日均线；MACD绿柱收缩，短线有转强迹象。",
    positiveFactors: [
      "前三季度归母净利润同比增长22.95%，第三季度利润增长提速。",
      "收盘位置接近日内高位，短线买盘较前几个交易日活跃。",
      "电网设备、电力投资和出海需求构成中期基本面支撑。"
    ],
    riskFactors: [
      "股价仍低于20日和60日均线，中期趋势尚未完全扭转。",
      "当前PE约39.5倍，市场对后续盈利增长要求较高。",
      "经营现金流每股为负，需继续观察回款和订单转化。"
    ],
    signals: [
      ["日内修复", "偏强", "positive-signal"],
      ["短均线", "已收复", "positive-signal"],
      ["MACD", "动能改善", "positive-signal"],
      ["估值", "偏高", "negative-signal"]
    ],
    movingAverages: [
      ["MA5", 11.22, 0.00],
      ["MA10", 11.25, 0.88],
      ["MA20", 11.54, 3.50],
      ["MA60", 12.57, 12.75]
    ],
    fundamentals: [
      ["营业收入", "188.15 亿", "+10.65%"],
      ["归母净利润", "11.54 亿", "+22.95%"],
      ["基本EPS", "0.225 元", "前三季度"],
      ["ROE", "4.96%", "同比改善"],
      ["毛利率", "24.35%", "稳中有升"],
      ["经营现金流/股", "-0.50 元", "回款待观察"]
    ],
    fundamentalNote: "2026年三季报数据。收入与利润保持增长，利润增速快于收入；但经营现金流为负，需要跟踪回款节奏。",
    scenarios: [
      {
        title: "平开后震荡偏强",
        tag: "基准",
        description: "开盘位于11.25—11.50元，围绕11.44元附近换手后尝试继续向上。",
        trigger: "守住11.24元，并用成交量确认突破11.49元"
      },
      {
        title: "高开测试中期压力",
        tag: "强势",
        description: "开盘站上11.49元，电网设备或高股息风格继续提供支撑。",
        trigger: "站上11.49元后，下一观察位11.54元"
      },
      {
        title: "冲高回落",
        tag: "谨慎",
        description: "若开盘偏强但成交快速萎缩，价格可能回踩11.19元确认支撑。",
        trigger: "跌破11.19元且弱于电网设备板块"
      }
    ],
    minute: [
      ["0930",11.00],["0940",11.03],["0950",10.99],["1000",10.94],["1010",10.95],
      ["1020",10.87],["1030",10.91],["1040",10.98],["1050",10.96],["1100",11.08],
      ["1110",11.04],["1120",11.04],["1130",11.08],["1309",11.26],["1319",11.28],
      ["1329",11.27],["1339",11.28],["1349",11.31],["1359",11.29],["1409",11.33],
      ["1419",11.43],["1429",11.40],["1439",11.47],["1449",11.47],["1459",11.43],["1500",11.44]
    ],
    daily: [
      ["09-03",12.415],["09-04",12.545],["09-07",12.455],["09-08",12.365],["09-09",12.505],
      ["09-10",12.435],["09-11",12.255],["09-14",12.175],["09-15",12.035],["09-16",12.115],
      ["09-17",11.995],["09-18",12.175],["09-21",12.315],["09-22",12.165],["09-23",12.00],
      ["09-24",11.75],["09-28",11.48],["09-29",11.41],["09-30",11.61],["10-08",11.79],
      ["10-09",11.66],["10-12",11.83],["10-13",11.55],["10-14",11.19],["10-15",10.83],
      ["10-16",10.96],["10-19",11.18],["10-20",11.10],["10-21",11.19],["10-22",11.19],["10-23",11.44]
    ],
    history: {
      bias: "平开后震荡偏强",
      volatility: "中等",
      trigger: "守住 11.24"
    }
  },
  {
    id: "603400",
    exchange: "SH",
    name: "华之杰",
    sector: "通用设备",
    session: "15:00 已收盘",
    price: 40.80,
    previousClose: 42.06,
    open: 40.92,
    high: 41.62,
    low: 37.85,
    change: -1.26,
    changePct: -3.00,
    amount: "1.84 亿元",
    turnover: "12.94%",
    pe: "73.78×",
    pb: "4.41×",
    marketCap: "52.97 亿元",
    openBias: "平开宽幅震荡",
    openProbability: 49,
    openDescription: "重组事件让筹码交换较激烈，开盘可能围绕40元附近宽幅波动，方向确认应等待前15分钟量价。",
    openRange: "39.80—41.60",
    openTrigger: "收复 42.06 偏强；跌破 39.17 后防再次测试 37.85",
    volatilityLevel: "高",
    volatilityWidth: 88,
    volatilityText: "预期日内振幅 6.0%—9.0%",
    trendLabel: "弱势高波动",
    fundamentalPill: "利润承压",
    support1: "37.85",
    resistance1: "42.06",
    resistance2: "43.95",
    supportLabel: "今日低点",
    resistanceLabel: "昨日收盘",
    resistance2Label: "60日均线",
    thesis: "今日先跌至37.85元，午后一度拉到41.62元，最终收在40.80元；盘面修复明显，但整体仍处于高换手、弱趋势阶段。",
    positiveFactors: [
      "今日从日内低点明显回升，40元附近出现短线承接。",
      "公司正在推进发行股份及支付现金购买资产并募集配套资金，事件关注度较高。",
      "前三季度经营现金流每股为正，经营现金回笼尚可。"
    ],
    riskFactors: [
      "前三季度归母净利润同比下降47.52%，盈利表现明显承压。",
      "近20个交易日仍下跌约20%，并低于20日和60日均线。",
      "换手率高达12.94%、估值偏高，重组进展和消息变化容易放大波动。"
    ],
    signals: [
      ["日内修复", "偏强", "positive-signal"],
      ["20日趋势", "偏弱", "negative-signal"],
      ["MACD", "负动能", "negative-signal"],
      ["换手活跃", "12.94%", "neutral-signal"]
    ],
    movingAverages: [
      ["MA5", 41.30, 1.22],
      ["MA10", 40.30, 1.24],
      ["MA20", 45.69, 10.70],
      ["MA60", 43.95, 7.17]
    ],
    fundamentals: [
      ["营业收入", "10.75 亿", "+4.25%"],
      ["归母净利润", "0.58 亿", "-47.52%"],
      ["基本EPS", "0.45 元", "前三季度"],
      ["ROE", "4.61%", "同比承压"],
      ["毛利率", "20.66%", "利润率下降"],
      ["经营现金流/股", "0.52 元", "现金为正"]
    ],
    fundamentalNote: "2026年三季报数据。营收小幅增长但利润明显下降；当前PE约73.78倍、PB约4.41倍，估值对重组预期和后续业绩修复较敏感。",
    scenarios: [
      {
        title: "平开后宽幅震荡",
        tag: "基准",
        description: "开盘围绕40—41元波动，40.92元与39.17元构成短线多空观察带。",
        trigger: "开盘15分钟守住39.17元，并逐步收复40.92元"
      },
      {
        title: "高开突破事件压力",
        tag: "强势",
        description: "重组预期升温或高波动资金继续参与，开盘直接测试42.06元上方。",
        trigger: "放量站稳42.06元，下一观察位43.95元"
      },
      {
        title: "低开延续调整",
        tag: "谨慎",
        description: "若开盘跌回39.17元下方，昨日套牢盘和短线筹码可能继续释放。",
        trigger: "放量跌破39.17元，重新下看37.85元"
      }
    ],
    minute: [
      ["0930",40.92],["0940",38.31],["0950",38.54],["1000",37.96],["1010",38.62],
      ["1020",38.16],["1030",38.33],["1040",38.36],["1050",38.37],["1100",38.42],
      ["1110",38.33],["1120",38.12],["1130",38.19],["1309",38.83],["1319",38.91],
      ["1329",38.93],["1339",39.15],["1349",39.58],["1359",39.65],["1409",39.70],
      ["1419",40.47],["1429",40.22],["1439",41.34],["1449",41.32],["1459",40.81],["1500",40.80]
    ],
    daily: [
      ["08-20",50.78],["08-21",48.85],["08-24",45.49],["08-25",44.10],["08-26",46.52],
      ["08-27",45.61],["08-28",44.29],["08-31",45.78],["09-01",46.10],["09-02",48.38],
      ["09-03",51.20],["09-04",53.60],["09-07",53.21],["09-08",52.81],["09-09",51.18],
      ["09-10",52.12],["09-11",49.70],["09-14",54.67],["09-30",53.00],["10-08",47.70],
      ["10-09",42.93],["10-12",41.09],["10-13",39.84],["10-14",39.22],["10-15",38.47],
      ["10-16",37.83],["10-19",38.60],["10-20",42.46],["10-21",42.60],["10-22",42.06],["10-23",40.80]
    ],
    history: {
      bias: "平开后宽幅震荡",
      volatility: "高",
      trigger: "守住 39.17"
    }
  }
];

const liveMarketGroups = [
  {
    title: "A股",
    status: "今日收盘",
    rows: [
      { symbol: "sh000001", name: "上证指数", value: 3690.48, pct: 0.89, time: "15:00 收盘", digits: 2 },
      { symbol: "sz399001", name: "深证成指", value: 11673.83, pct: 2.79, time: "15:00 收盘", digits: 2 },
      { symbol: "sz399006", name: "创业板指", value: 2684.10, pct: 4.16, time: "15:00 收盘", digits: 2 },
      { symbol: "sh000688", name: "科创50", value: 1345.51, pct: 3.04, time: "15:00 收盘", digits: 2 }
    ]
  },
  {
    title: "港股与期指",
    status: "港股收盘",
    rows: [
      { symbol: "hkHSI", name: "恒生指数", value: 23093.37, pct: 0.69, time: "16:00 收盘", digits: 2 },
      { symbol: "hkHSTECH", name: "恒生科技", value: 3871.66, pct: 2.05, time: "16:00 收盘", digits: 2 },
      { symbol: "104.CN00Y", name: "A50期指", value: 13008.0, pct: -0.24, time: "连续交易", digits: 1 }
    ]
  },
  {
    title: "美股",
    status: "盘中",
    rows: [
      { symbol: "usDJI", name: "道琼斯", value: 52317.76, pct: -1.04, time: "盘中报价", digits: 2 },
      { symbol: "usINX", name: "标普500", value: 7647.56, pct: -0.21, time: "盘中报价", digits: 2 },
      { symbol: "usIXIC", name: "纳斯达克", value: 26053.94, pct: 0.17, time: "盘中报价", digits: 2 }
    ]
  }
];

const macroDefinitions = [
  { symbol: "133.USDCNH", name: "USD/CNH", value: 6.6699, pct: -0.04, digits: 4, note: "离岸人民币" },
  { symbol: "104.CN00Y", name: "富时A50期指", value: 13008.0, pct: -0.24, digits: 1, note: "连续交易" },
  { symbol: "102.CL00Y", name: "WTI原油", value: 102.15, pct: 2.69, digits: 2, note: "美元/桶" },
  { symbol: "112.B00Y", name: "布伦特原油", value: 116.14, pct: 2.62, digits: 2, note: "美元/桶" },
  { symbol: "101.GC00Y", name: "COMEX黄金", value: 4010.7, pct: -1.22, digits: 1, note: "美元/盎司" },
  { symbol: "101.HG00Y", name: "COMEX铜", value: 6.4945, pct: 1.51, digits: 4, note: "美元/磅" },
  { fixed: true, name: "美国10年期国债", value: 5.00, pct: null, digits: 2, note: "收益率，最近可得" },
  { fixed: true, name: "美国2年期国债", value: 4.70, pct: null, digits: 2, note: "收益率，最近可得" }
];

const marketNews = [
  ["美国10月制造业PMI初值56.0，服务业PMI为57.9，综合PMI为57.6，经济景气仍处扩张区间。", "宏观数据 · 23:00 左右"],
  ["美股盘中明显分化：道指下跌约1.04%，纳指小幅上涨0.17%；大型科技股经历快速波动。", "美股盘中 · 23:15"],
  ["原油延续强势，WTI升破102美元、布伦特超过116美元，地缘供应风险与运输成本成为主要推手。", "大宗商品 · 23:15"],
  ["A股成长方向强势修复，创业板指上涨4.16%、科创50上涨3.04%，机器人及AI视觉题材领涨。", "A股收盘 · 15:00"],
  ["市场继续关注AI资本开支、科技公司财报与能源价格对通胀预期的二次冲击。", "风险观察 · 今日"]
];

const liveQuoteSymbols = [
  "sh000001", "sz399001", "sz399006", "sh000688",
  "hkHSI", "hkHSTECH", "usDJI", "usINX", "usIXIC",
  "sh601168", "sh601179", "sh603400"
];

const tickerMap = {
  "601168": "sh601168",
  "601179": "sh601179",
  "603400": "sh603400"
};

let liveRefreshTimer = null;

const glossary = [
  ["收盘价", "当天交易结束时的最后成交价格。"],
  ["涨跌幅", "相对上一个交易日收盘价的变化比例。"],
  ["MA5 / MA10 / MA20", "最近5、10、20个交易日的平均收盘价，用来看短期和中期趋势。"],
  ["RSI", "衡量上涨和下跌力量强弱的指标；过高可能过热，过低可能偏弱。"],
  ["MACD", "比较快慢两条均价线，用来观察趋势动能是否增强或减弱。"],
  ["换手率", "当天成交股份占可交易股份的比例，反映交易活跃度。"],
  ["PE", "市盈率，股价相对每股盈利的倍数；周期股低PE也可能因为盈利处在高点。"],
  ["PB", "市净率，股价相对每股净资产的倍数。"],
  ["支撑位", "价格下跌时较容易获得买盘承接的区域，不是绝对不会跌破。"],
  ["压力位", "价格上涨时较容易遇到卖盘的位置，不是绝对无法突破。"],
  ["开盘概率", "根据当日收盘位置、趋势和量能做出的规则评分，不是统计预测。"],
  ["波动等级", "预计价格上下变化可能有多大，等级越高越需要控制仓位和滑点风险。"]
];

let activeStockIndex = 0;
let glossaryExpanded = false;

const $ = (id) => document.getElementById(id);

function formatPrice(value) {
  return value >= 20 ? value.toFixed(2) : value.toFixed(3).replace(/0$/, "");
}

function formatNumber(value, digits = 2) {
  return Number(value).toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  });
}

function formatChange(value, digits = 2) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";
  return `${numeric >= 0 ? "+" : ""}${numeric.toFixed(digits)}%`;
}

function quoteTimestamp(raw) {
  if (!raw || raw.length < 14) return "时间未知";
  const compact = raw.replace(/\D/g, "").slice(0, 14);
  return `${compact.slice(4, 6)}/${compact.slice(6, 8)} ${compact.slice(8, 10)}:${compact.slice(10, 12)}`;
}

function renderGlobalReport() {
  $("marketGroups").innerHTML = liveMarketGroups.map((group) => `
    <article class="market-group">
      <div class="market-group-head"><strong>${group.title}</strong><span>${group.status}</span></div>
      ${group.rows.map((row) => `
        <div class="market-row ${row.pct >= 0 ? "positive-live" : "negative-live"}" data-market-symbol="${row.symbol}">
          <span class="name">${row.name}</span>
          <strong class="value">${formatNumber(row.value, row.digits)}</strong>
          <span class="change">${formatChange(row.pct)}</span>
        </div>
      `).join("")}
    </article>
  `).join("");

  $("macroGrid").innerHTML = macroDefinitions.map((item, index) => `
    <div class="macro-item" data-macro-index="${index}">
      <span>${item.name}</span>
      <strong>${item.name.includes("国债") ? `${formatNumber(item.value, item.digits)}%` : formatNumber(item.value, item.digits)}</strong>
      <small class="${item.pct == null ? "" : item.pct >= 0 ? "positive-live" : "negative-live"}">${item.pct == null ? item.note : `${formatChange(item.pct)} · ${item.note}`}</small>
    </div>
  `).join("");

  $("marketNews").innerHTML = marketNews.map(([text, time]) => `
    <li>${text}<time>${time}</time></li>
  `).join("");
}

function updateLiveMarketRow(row) {
  const element = document.querySelector(`[data-market-symbol="${row.symbol}"]`);
  if (!element) return;
  const found = liveMarketGroups.flatMap((group) => group.rows).find((item) => item.symbol === row.symbol);
  if (!found) return;
  found.value = row.value;
  found.pct = row.pct;
  found.time = row.time;
  element.querySelector(".value").textContent = formatNumber(row.value, found.digits);
  element.querySelector(".change").textContent = formatChange(row.pct);
  element.classList.toggle("positive-live", row.pct >= 0);
  element.classList.toggle("negative-live", row.pct < 0);
}

function parseTencentQuote(variable, symbol) {
  if (typeof variable !== "string") return null;
  const fields = variable.split("~");
  if (fields.length < 35) return null;
  return {
    symbol,
    price: Number(fields[3]),
    previousClose: Number(fields[4]),
    open: Number(fields[5]),
    timestamp: fields[30],
    change: Number(fields[31]),
    pct: Number(fields[32]),
    high: Number(fields[33]),
    low: Number(fields[34]),
    volume: Number(fields[36]),
    amount: Number(fields[37]),
    turnover: Number(fields[38]),
    pe: Number(fields[39]),
    pb: Number(fields[46])
  };
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.charset = "gbk";
    script.referrerPolicy = "no-referrer";
    script.async = true;
    const timeout = window.setTimeout(() => {
      script.remove();
      reject(new Error("行情请求超时"));
    }, 10000);
    script.onload = () => {
      window.clearTimeout(timeout);
      script.remove();
      resolve();
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      script.remove();
      reject(new Error("行情请求失败"));
    };
    document.head.appendChild(script);
  });
}

function loadJsonp(baseUrl, callbackName) {
  return new Promise((resolve, reject) => {
    window[callbackName] = (payload) => {
      delete window[callbackName];
      resolve(payload);
    };
    const separator = baseUrl.includes("?") ? "&" : "?";
    loadScript(`${baseUrl}${separator}cb=${callbackName}&_=${Date.now()}`)
      .catch((error) => {
        delete window[callbackName];
        reject(error);
      });
  });
}

function updateMacroDefinition(definition, data) {
  if (!data) return;
  const scale = 10 ** Number(data.f59 ?? 2);
  const index = macroDefinitions.indexOf(definition);
  const element = document.querySelector(`[data-macro-index="${index}"]`);
  if (!element || !Number.isFinite(Number(data.f43))) return;
  const value = Number(data.f43) / scale;
  const pct = Number(data.f170) / 100;
  definition.value = value;
  definition.pct = pct;
  element.querySelector("strong").textContent = formatNumber(value, definition.digits);
  element.querySelector("small").textContent = `${formatChange(pct)} · ${definition.note}`;
  element.querySelector("small").className = pct >= 0 ? "positive-live" : "negative-live";
}

async function refreshLiveData() {
  try {
    const response = await fetch(`https://qt.gtimg.cn/q=${liveQuoteSymbols.join(",")}&_=${Date.now()}`, {
      cache: "no-store",
      referrerPolicy: "no-referrer"
    });
    if (!response.ok) throw new Error("行情请求失败");
    const raw = new TextDecoder("gbk").decode(await response.arrayBuffer());
    const quotePayloads = {};
    for (const match of raw.matchAll(/v_([A-Za-z0-9_]+)="([^"]*)"/g)) {
      quotePayloads[match[1]] = match[2];
    }
    let latestTimestamp = "";
    liveQuoteSymbols.forEach((symbol) => {
      const quote = parseTencentQuote(quotePayloads[symbol], symbol);
      if (!quote || !Number.isFinite(quote.price)) return;
      latestTimestamp = quote.timestamp || latestTimestamp;
      updateLiveMarketRow({ ...quote, time: `${quoteTimestamp(quote.timestamp)} 行情源` });
      const stock = stocks.find((item) => tickerMap[item.id] === symbol);
      if (stock) {
        stock.price = quote.price;
        stock.previousClose = quote.previousClose;
        stock.open = quote.open;
        stock.high = quote.high;
        stock.low = quote.low;
        stock.change = quote.change;
        stock.changePct = quote.pct;
        stock.turnover = `${quote.turnover.toFixed(2)}%`;
        if (Number.isFinite(quote.amount)) stock.amount = `${(quote.amount / 10000).toFixed(2)} 亿元`;
        if (Number.isFinite(quote.pe)) stock.pe = `${quote.pe.toFixed(2)}×`;
        if (Number.isFinite(quote.pb)) stock.pb = `${quote.pb.toFixed(2)}×`;
        stock.session = `行情源 ${quoteTimestamp(quote.timestamp)}`;
      }
    });
    renderTabs();
    render();
    $("liveUpdateTime").textContent = `行情已同步 · ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`;
  } catch (error) {
    $("liveUpdateTime").textContent = "实时源暂不可用，显示最近快照";
  }

  const macroRequests = macroDefinitions
    .filter((item) => !item.fixed)
    .map((item) => loadJsonp(
      `https://push2.eastmoney.com/api/qt/stock/get?secid=${item.symbol}&fields=f43,f57,f58,f59,f86,f169,f170`,
      `jp_macro_${item.symbol.replace(/\W/g, "_")}`
    ).then((payload) => updateMacroDefinition(item, payload?.data)).catch(() => null));

  await Promise.allSettled(macroRequests);
}

function renderTabs() {
  $("stockCount").textContent = `${stocks.length} 只 · 可继续扩充`;
  $("stockTabs").innerHTML = stocks.map((stock, index) => `
    <button class="stock-tab ${index === activeStockIndex ? "active" : ""}" type="button"
      role="tab" aria-selected="${index === activeStockIndex}" data-index="${index}">
      <span class="tab-name"><span>${stock.name}</span><span class="${stock.changePct >= 0 ? "positive" : "negative"}">${stock.changePct >= 0 ? "+" : ""}${stock.changePct.toFixed(2)}%</span></span>
      <span class="tab-meta"><span>${stock.id}.${stock.exchange}</span><span>${formatPrice(stock.price)}</span></span>
    </button>
  `).join("");

  document.querySelectorAll(".stock-tab").forEach((button) => {
    button.addEventListener("click", () => {
      activeStockIndex = Number(button.dataset.index);
      renderTabs();
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function buildChart(stock) {
  const width = 900;
  const height = 270;
  const padding = { top: 18, right: 10, bottom: 15, left: 10 };
  const values = stock.minute.map(([, value]) => value);
  const buffer = Math.max((Math.max(...values) - Math.min(...values)) * 0.18, stock.price * 0.004);
  const min = Math.min(...values, stock.previousClose) - buffer;
  const max = Math.max(...values, stock.previousClose) + buffer;
  const x = (i) => padding.left + (i / (values.length - 1)) * (width - padding.left - padding.right);
  const y = (value) => padding.top + ((max - value) / (max - min)) * (height - padding.top - padding.bottom);
  const line = values.map((value, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
  const area = `${line} L${x(values.length - 1)} ${height - padding.bottom} L${x(0)} ${height - padding.bottom} Z`;
  const prevY = y(stock.previousClose);
  const grid = [0.2, 0.45, 0.7].map((ratio) => {
    const gy = padding.top + ratio * (height - padding.top - padding.bottom);
    return `<line class="chart-grid-line" x1="10" x2="${width - 10}" y1="${gy}" y2="${gy}"/>`;
  }).join("");
  const lastX = x(values.length - 1);
  const lastY = y(values[values.length - 1]);

  return `
    <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${stock.name}今日分时走势">
      <defs>
        <linearGradient id="areaGradient-${stock.id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2f70e8" stop-opacity=".22"/>
          <stop offset="1" stop-color="#2f70e8" stop-opacity=".01"/>
        </linearGradient>
        <linearGradient id="lineGradient-${stock.id}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#3274e8"/>
          <stop offset="1" stop-color="#10b29a"/>
        </linearGradient>
      </defs>
      ${grid}
      <line class="chart-ref-line" x1="10" x2="${width - 10}" y1="${prevY}" y2="${prevY}"/>
      <text x="${width - 12}" y="${prevY - 6}" text-anchor="end" fill="#b18432" font-size="11">昨收 ${formatPrice(stock.previousClose)}</text>
      <path d="${area}" fill="url(#areaGradient-${stock.id})"/>
      <path d="${line}" fill="none" stroke="url(#lineGradient-${stock.id})" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${lastX}" cy="${lastY}" r="5" fill="#ffffff" stroke="#2f70e8" stroke-width="3"/>
    </svg>
  `;
}

function render() {
  const stock = stocks[activeStockIndex];
  const sign = stock.changePct >= 0 ? "+" : "";
  $("stockName").textContent = stock.name;
  $("stockCode").textContent = `${stock.id}.${stock.exchange}`;
  $("stockSector").textContent = stock.sector;
  $("sessionBadge").textContent = stock.session;
  $("lastPrice").textContent = formatPrice(stock.price);
  $("priceChange").textContent = `${sign}${stock.changePct.toFixed(2)}%`;
  $("priceChange").className = stock.changePct >= 0 ? "positive" : "negative";
  $("priceDetail").textContent = `${stock.change >= 0 ? "上涨" : "下跌"} ${Math.abs(stock.change).toFixed(2)} 元 · 成交 ${stock.amount}`;
  $("openPrice").textContent = formatPrice(stock.open);
  $("highPrice").textContent = formatPrice(stock.high);
  $("lowPrice").textContent = formatPrice(stock.low);
  $("turnover").textContent = stock.turnover;
  $("intradayChart").innerHTML = buildChart(stock);

  $("signalStrip").innerHTML = stock.signals.map(([label, value, klass]) => `
    <div class="signal ${klass}"><span>${label}</span><strong>${value}</strong></div>
  `).join("");

  $("openBias").textContent = stock.openBias;
  $("openDescription").textContent = stock.openDescription;
  $("probValue").textContent = `${stock.openProbability}%`;
  $("probRing").style.setProperty("--prob", stock.openProbability);
  $("openRange").textContent = stock.openRange;
  $("openTrigger").textContent = stock.openTrigger;
  $("volatilityLevel").textContent = stock.volatilityLevel;
  $("volatilityBar").style.width = `${stock.volatilityWidth}%`;
  $("volatilityText").textContent = stock.volatilityText;
  $("scenarioTimestamp").textContent = `按 10/23 收盘数据推演 · ${stock.name}`;

  $("scenarioList").innerHTML = stock.scenarios.map((scenario) => `
    <div class="mini-scenario">
      <i></i>
      <div><span>${scenario.tag}</span><strong>${scenario.title}</strong></div>
      <em>${scenario.tag === "基准" ? "主观察" : scenario.tag === "强势" ? "向上确认" : "风险预案"}</em>
    </div>
  `).join("");

  $("scenarioGrid").innerHTML = stock.scenarios.map((scenario, index) => `
    <article class="scenario-card">
      <span class="scenario-no">0${index + 1} · ${scenario.tag}情景</span>
      <h3>${scenario.title}</h3>
      <p>${scenario.description}</p>
      <div class="scenario-trigger"><span>盘中确认信号</span><strong>${scenario.trigger}</strong></div>
    </article>
  `).join("");

  $("trendLabel").textContent = stock.trendLabel;
  $("maList").innerHTML = stock.movingAverages.map(([name, value, distance]) => `
    <div class="ma-row">
      <span>${name}</span>
      <div class="ma-track"><i style="width:${Math.min(100, 100 - distance * 5)}%"></i></div>
      <strong>${formatPrice(value)}</strong>
    </div>
  `).join("");
  $("support1").textContent = stock.support1;
  $("resistance1").textContent = stock.resistance1;
  $("resistance2").textContent = stock.resistance2;
  $("support1").nextElementSibling.textContent = stock.supportLabel;
  $("resistance1").nextElementSibling.textContent = stock.resistanceLabel;
  $("resistance2").nextElementSibling.textContent = stock.resistance2Label;

  $("fundamentalPill").textContent = stock.fundamentalPill;
  $("fundamentalGrid").innerHTML = stock.fundamentals.map(([label, value, note]) => `
    <div class="fundamental-item"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>
  `).join("");
  $("fundamentalNote").textContent = stock.fundamentalNote;
  $("thesis").textContent = stock.thesis;
  $("positiveFactors").innerHTML = stock.positiveFactors.map((factor) => `<li>${factor}</li>`).join("");
  $("riskFactors").innerHTML = stock.riskFactors.map((factor) => `<li>${factor}</li>`).join("");

  $("historyRows").innerHTML = `
    <tr>
      <td>2026-10-23</td>
      <td><strong>${stock.name}</strong> ${stock.id}</td>
      <td>${stock.history.bias}</td>
      <td>${stock.history.volatility}</td>
      <td>${stock.history.trigger}</td>
      <td><span class="pending">待次日验证</span></td>
    </tr>
  `;
}

function renderGlossary() {
  $("glossaryGrid").innerHTML = glossary.map(([term, explanation]) => `
    <article class="glossary-item ${glossaryExpanded ? "" : "collapsed"}">
      <h3>${term}</h3>
      <p>${explanation}</p>
    </article>
  `).join("");
  $("toggleGlossary").textContent = glossaryExpanded ? "全部收起 ↑" : "全部展开 ↓";
}

function setupDialog() {
  const dialog = $("extendDialog");
  $("openExtendModal").addEventListener("click", () => dialog.showModal());
  $("closeExtendModal").addEventListener("click", () => dialog.close());
  $("ackExtendModal").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function setupPwa() {
  const installButton = $("installAppButton");
  const installDialog = $("installDialog");
  const standalone = window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
  let deferredPrompt = null;

  if (!standalone) installButton.hidden = false;

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    installButton.hidden = true;
  });

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
      $("installInstructions").textContent = isIos
        ? "点击 Safari 底部的分享按钮，再选择“添加到主屏幕”。"
        : "请打开浏览器菜单，选择“安装应用”或“添加到主屏幕”。";
      installDialog.showModal();
      return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.hidden = true;
  });

  $("closeInstallModal").addEventListener("click", () => installDialog.close());
  $("ackInstallModal").addEventListener("click", () => installDialog.close());
  installDialog.addEventListener("click", (event) => {
    if (event.target === installDialog) installDialog.close();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {
        // The site remains usable when service workers are unavailable.
      });
    });
  }
}

$("toggleGlossary").addEventListener("click", () => {
  glossaryExpanded = !glossaryExpanded;
  renderGlossary();
});

renderTabs();
renderGlobalReport();
render();
renderGlossary();
setupDialog();
setupPwa();
refreshLiveData();
liveRefreshTimer = window.setInterval(refreshLiveData, 60000);
