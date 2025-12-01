export const QUESTION_BANK: Array<{ q: string; options: string[]; correct: string }> = [
  { q: "Which indicator measures volatility?", options: ["Bollinger Bands", "RSI", "MACD", "EMA"], correct: "Bollinger Bands" },
  { q: "What does RSI stand for?", options: ["Relative Strength Index", "Rate of Share Increase", "Risk Sentiment Indicator", "Relative Stock Impact"], correct: "Relative Strength Index" },
  { q: "Which pattern signals potential reversal?", options: ["Head and Shoulders", "Ascending Channel", "Flag", "Triangle"], correct: "Head and Shoulders" },
  { q: "What is dollar-cost averaging?", options: ["Buying fixed amounts periodically", "Selling at fixed profit", "Shorting with leverage", "Holding without buying"], correct: "Buying fixed amounts periodically" },
  { q: "Which order executes immediately at market price?", options: ["Market Order", "Limit Order", "Stop Order", "OCO Order"], correct: "Market Order" },
  { q: "What reduces risk by diversifying assets?", options: ["Portfolio diversification", "Martingale", "Averaging down", "All-in"], correct: "Portfolio diversification" },
  { q: "Which moving average reacts faster?", options: ["EMA", "SMA", "WMA", "VWAP"], correct: "EMA" },
  { q: "What is a stop-loss used for?", options: ["Limiting downside", "Increasing leverage", "Boosting profits", "Averaging entries"], correct: "Limiting downside" },
  { q: "Which timeframe suits scalping?", options: ["1–5 minutes", "4 hours", "Daily", "Weekly"], correct: "1–5 minutes" },
  { q: "What does MACD compare?", options: ["Two EMAs and signal", "Two RSIs", "Two SMAs", "Price and volume"], correct: "Two EMAs and signal" },
  { q: "What is the main benefit of using limit orders?", options: ["Control entry price", "Faster execution", "Higher leverage", "Avoid slippage"], correct: "Control entry price" },
  { q: "Which indicator is typically used to identify overbought/oversold?", options: ["RSI", "Ichimoku Cloud", "ATR", "OBV"], correct: "RSI" },
  { q: "What does ATR measure?", options: ["Average True Range", "Average Trade Return", "Asset Trend Ratio", "Accumulated Trade Risk"], correct: "Average True Range" },
  { q: "A bullish engulfing pattern suggests what?", options: ["Potential upward reversal", "Continuation downtrend", "Neutral movement", "Sideways consolidation"], correct: "Potential upward reversal" },
  { q: "What does diversification help reduce?", options: ["Unsystematic risk", "Systematic risk", "Leverage risk", "Execution risk"], correct: "Unsystematic risk" },
  { q: "Which tool plots support/resistance via percentages?", options: ["Fibonacci retracement", "VWAP", "ADX", "OBV"], correct: "Fibonacci retracement" },
  { q: "What is slippage?", options: ["Difference between expected and executed price", "Broker fee", "Spread widening", "Latency delay"], correct: "Difference between expected and executed price" },
  { q: "Which strategy follows the trend?", options: ["Moving average crossover", "Mean reversion", "Arbitrage", "Grid trading"], correct: "Moving average crossover" },
  { q: "What does liquidity refer to?", options: ["Ease of buying/selling without large price impact", "Leverage amount", "Market volatility", "Number of traders"], correct: "Ease of buying/selling without large price impact" },
  { q: "What does VWAP represent?", options: ["Volume Weighted Average Price", "Variable Weighted Asset Price", "Volatility Weighted Average Position", "Value Weighted Average Profit"], correct: "Volume Weighted Average Price" },
  { q: "Which candlestick shows indecision?", options: ["Doji", "Hammer", "Marubozu", "Shooting Star"], correct: "Doji" },
  { q: "Which order protects profits after price moves favorably?", options: ["Trailing stop", "Limit sell", "Market sell", "OCO"], correct: "Trailing stop" },
  { q: "What is leverage?", options: ["Borrowed capital to increase position size", "Reducing risk", "Averaging entries", "Hedging"], correct: "Borrowed capital to increase position size" },
  { q: "What does a high Sharpe ratio indicate?", options: ["Better risk-adjusted returns", "Higher fees", "More volatility", "Lower returns"], correct: "Better risk-adjusted returns" },
  { q: "Which pattern suggests continuation?", options: ["Bullish flag", "Head and shoulders", "Double top", "Evening star"], correct: "Bullish flag" },
  { q: "What does OBV track?", options: ["On-Balance Volume", "Overall Buy Value", "Off-Book Volume", "Order Book Velocity"], correct: "On-Balance Volume" },
  { q: "What does a breakout above resistance suggest?", options: ["Potential upward move", "Immediate reversal", "No change", "Lower liquidity"], correct: "Potential upward move" },
  { q: "What is mean reversion?", options: ["Prices revert to average over time", "Prices always trend", "Buy strength sell weakness", "Follow momentum"], correct: "Prices revert to average over time" },
  { q: "Which tool displays multiple averages and clouds?", options: ["Ichimoku", "RSI", "MACD", "Stochastic"], correct: "Ichimoku" },
  { q: "Which market condition suits range trading?", options: ["Sideways", "Strong uptrend", "Strong downtrend", "Breakout"], correct: "Sideways" },
  { q: "What is a stop order triggered by?", options: ["Stop price", "Limit price", "Time", "Volume"], correct: "Stop price" },
  { q: "Which security measure prevents large losses?", options: ["Stop-loss", "Martingale", "Averaging down", "Pyramiding"], correct: "Stop-loss" },
  { q: "What does correlation near +1 indicate?", options: ["Assets move together", "Assets move opposite", "No relation", "High volatility"], correct: "Assets move together" },
  { q: "Which timeframe suits swing trading?", options: ["4H–Daily", "1–5m", "Weekly only", "15m–30m"], correct: "4H–Daily" },
  { q: "What does a hammer at support suggest?", options: ["Potential reversal up", "Continuation down", "Neutral", "Breakdown"], correct: "Potential reversal up" },
  { q: "What is position sizing?", options: ["Determining trade size by risk", "Choosing broker", "Selecting timeframe", "Setting alerts"], correct: "Determining trade size by risk" },
  { q: "Which moving average filters noise better?", options: ["SMA", "EMA", "WMA", "HMA"], correct: "SMA" },
  { q: "What does risk-to-reward 1:3 mean?", options: ["Risk 1 unit to aim 3 units", "Risk 3 units to aim 1", "Equal risk/reward", "No risk"], correct: "Risk 1 unit to aim 3 units" },
  { q: "Which indicator compares two EMAs?", options: ["MACD", "RSI", "ADX", "ATR"], correct: "MACD" },
  { q: "What is a double bottom?", options: ["Bullish reversal", "Bearish continuation", "Neutral pattern", "Exhaustion gap"], correct: "Bullish reversal" },
  { q: "Which term describes buying at regular intervals?", options: ["DCA", "HFT", "Scalping", "Grid"], correct: "DCA" },
  { q: "What is spread?", options: ["Difference between bid and ask", "Broker commission", "Price gap", "Order size"], correct: "Difference between bid and ask" },
  { q: "Which tool measures trend strength?", options: ["ADX", "OBV", "ATR", "RSI"], correct: "ADX" },
  { q: "Which chart pattern forms a narrowing range?", options: ["Triangle", "Rectangle", "Flag", "Cup and handle"], correct: "Triangle" },
  { q: "What is alpha?", options: ["Excess return over benchmark", "Risk measure", "Volatility", "Fee"], correct: "Excess return over benchmark" },
  { q: "Which order type sets max buy price?", options: ["Limit", "Market", "Stop", "Trailing"], correct: "Limit" },
  { q: "What is hedging?", options: ["Offsetting risk with another position", "Increasing leverage", "Averaging down", "Ignoring risk"], correct: "Offsetting risk with another position" },
  { q: "Which oscillator uses %K and %D?", options: ["Stochastic", "RSI", "MACD", "CCI"], correct: "Stochastic" },
  { q: "What is a bear market?", options: ["Prolonged price decline", "Sideways movement", "Rapid rise", "Low volatility"], correct: "Prolonged price decline" },
  { q: "Which metric is total trading volume over time?", options: ["OBV", "RSI", "VWAP", "ATR"], correct: "OBV" },
  { q: "What does take-profit do?", options: ["Closes trade at target price", "Adds to position", "Sets stop-loss", "Opens hedge"], correct: "Closes trade at target price" },
  { q: "Which setup focuses on breakouts from consolidation?", options: ["Volatility squeeze", "Mean reversion", "Carry trade", "Arbitrage"], correct: "Volatility squeeze" },
  { q: "What is beta?", options: ["Volatility relative to market", "Excess return", "Risk-free rate", "Leverage"], correct: "Volatility relative to market" },
  { q: "Which pattern resembles a cup followed by small dip?", options: ["Cup and handle", "Flag", "Wedge", "Rectangle"], correct: "Cup and handle" },
  { q: "What is the typical max risk per trade recommended?", options: ["1%", "5%", "10%", "20%"], correct: "1%" },
  { q: "Which action best reduces portfolio drawdowns?", options: ["Using stop-losses", "Doubling down", "Removing stops", "Increasing leverage"], correct: "Using stop-losses" },
  { q: "Kelly Criterion is primarily used for", options: ["Position sizing", "Trend detection", "Broker selection", "Tax optimization"], correct: "Position sizing" },
  { q: "R multiple refers to", options: ["Risk-based return unit", "Relative momentum", "Rate of change", "Return after fees"], correct: "Risk-based return unit" },
  { q: "With a 40% win rate and 1:3 R:R, expectancy is", options: ["Positive", "Negative", "Zero", "Undefined"], correct: "Positive" },
  { q: "Which strategy buys pullbacks in an uptrend?", options: ["Trend following", "Mean reversion", "Arbitrage", "Grid"], correct: "Trend following" },
  { q: "Breakout entries are strongest when", options: ["High volume at resistance", "Low liquidity", "No stop-loss", "Random entries"], correct: "High volume at resistance" },
  { q: "In range markets, entries are best", options: ["Near support/resistance", "At all-time high", "After parabolic move", "Random"], correct: "Near support/resistance" },
  { q: "VWAP retest entries help confirm", options: ["Institutional average price", "Risk-free return", "Tax basis", "Funding rate"], correct: "Institutional average price" },
  { q: "Which timeframe mix suits swing trading?", options: ["4H and Daily", "1m only", "Weekly only", "Tick charts"], correct: "4H and Daily" },
  { q: "Which bias leads to chasing winners?", options: ["Recency bias", "Loss aversion", "Anchoring", "Confirmation"], correct: "Recency bias" },
  { q: "Best response to consecutive losses is", options: ["Reduce size and follow plan", "Increase leverage", "Double down", "Remove stop"], correct: "Reduce size and follow plan" },
  { q: "What helps maintain trading discipline?", options: ["Written trading plan", "Social media tips", "Hunches", "Random entries"], correct: "Written trading plan" },
  { q: "Which routine improves decision quality?", options: ["Journaling after each trade", "Skipping reviews", "Trading sleep-deprived", "Ignoring emotions"], correct: "Journaling after each trade" },
  { q: "FOMO stands for", options: ["Fear of missing out", "Forecast of market oscillation", "Fund order management", "Fee optimization"], correct: "Fear of missing out" },
  { q: "Which indicator shows momentum crossovers?", options: ["MACD", "OBV", "ATR", "VWAP"], correct: "MACD" },
  { q: "A shooting star at resistance often implies", options: ["Bearish reversal", "Bullish continuation", "Neutral", "Gap fill"], correct: "Bearish reversal" },
  { q: "Which tool identifies support via retracement levels?", options: ["Fibonacci", "RSI", "ADX", "CCI"], correct: "Fibonacci" },
  { q: "ADX primarily measures", options: ["Trend strength", "Overbought/oversold", "Liquidity", "Risk"], correct: "Trend strength" },
  { q: "Which pattern can signal exhaustion after a strong uptrend?", options: ["Rising wedge", "Bull flag", "Cup and handle", "Rectangle"], correct: "Rising wedge" },
];

export type AssessmentQuestion = {
  id: string;
  topic: "Risk Management" | "Trading Strategy" | "Psychology" | "Technical Analysis";
  question: string;
  options: string[];
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateAssessmentQuestions(topic: AssessmentQuestion["topic"], count: number): AssessmentQuestion[] {
  const base: AssessmentQuestion[] = [];

  const push = (q: string, options: string[]) => base.push({ id: `${topic}-${base.length + 1}`, topic, question: q, options });

  if (topic === "Risk Management") {
    push("What is a reasonable stop-loss percentage for volatile assets?", ["1%", "2%", "5%", "10%"]);
    push("Which risk control best prevents large drawdowns?", ["Fixed stop-loss", "Martingale", "No stop", "Double down"]);
    push("Position sizing should primarily be based on", ["Risk per trade", "Account balance only", "Hunch", "Broker leverage"]);
    push("A trailing stop is used to", ["Protect gains", "Enter earlier", "Increase leverage", "Remove risk limits"]);
    push("Diversification helps reduce", ["Unsystematic risk", "Systematic risk", "Fees", "Latency"]);
    push("Risk-to-reward 1:3 implies", ["Risk 1 to aim 3", "Risk 3 to aim 1", "Equal risk/reward", "No risk"]);
  }

  if (topic === "Trading Strategy") {
    push("Which approach follows momentum?", ["Trend following", "Mean reversion", "Arbitrage", "Grid"]);
    push("DCA stands for", ["Dollar-cost averaging", "Daily chart analysis", "Derivative cost allocation", "Dual candle average"]);
    push("Breakouts from consolidation often use", ["Volatility squeeze", "Random entries", "No stops", "News only"]);
    push("Moving average crossover is typically a", ["Trend strategy", "Counter-trend", "Scalping only", "Arb"]);
    push("Range trading suits", ["Sideways markets", "Parabolic moves", "High volatility spikes", "Illiquid assets"]);
    push("Take-profit is used to", ["Exit at target", "Increase stake", "Set stop", "Open hedge"]);
  }

  if (topic === "Psychology") {
    push("Which bias leads to holding losers too long?", ["Loss aversion", "Confirmation", "Anchoring", "Recency"]);
    push("A trading plan helps reduce", ["Emotional decisions", "Fees", "Latency", "Spreads"]);
    push("Journaling trades improves", ["Self-awareness", "Leverage", "Execution speed", "Spread"]);
    push("Overtrading is often caused by", ["Impatience", "Diversification", "Risk limits", "Position sizing"]);
    push("After a loss, best practice is", ["Stick to plan", "Double down", "Remove stop", "Chase"]);
    push("Confidence should be based on", ["Data & process", "Luck", "Hype", "Social media"]);
  }

  if (topic === "Technical Analysis") {
    push("RSI typically identifies", ["Overbought/oversold", "Trend strength", "Volatility", "Liquidity"]);
    push("MACD compares", ["EMAs and signal", "RSIs", "SMAs only", "Volume"]);
    push("ATR measures", ["Average True Range", "Trade return", "Alpha", "Beta"]);
    push("A doji often signals", ["Indecision", "Strong bullish", "Strong bearish", "Gap fill"]);
    push("Bollinger Bands primarily reflect", ["Volatility", "Trend", "Liquidity", "Fees"]);
    push("Ichimoku provides", ["Cloud & averages", "Only RSI", "Only volume", "Only candles"]);
  }

  // Synthesize extra variations to reach desired count
  const variants: AssessmentQuestion[] = [];
  const stems = {
    "Risk Management": [
      "Choose the safest risk per trade for a \u0024{acct} account",
      "Select a stop-loss distance for a {vol}% volatility asset",
    ],
    "Trading Strategy": [
      "Pick an entry rule for a {trend} trend",
      "Select a position size for risk {risk}%",
    ],
    "Psychology": [
      "Identify the best response to a {event}",
      "Pick a routine to reduce {bias}",
    ],
    "Technical Analysis": [
      "Select a confirmation tool for a {pattern} breakout",
      "Choose a timeframe for {style} trading",
    ],
  } as const;

  const optionsPool: Record<string, string[]> = {
    perTrade: ["0.5%", "1%", "2%", "3%"],
    stopDist: ["1%", "2%", "3%", "5%"],
    entryRule: ["MA crossover", "Pullback", "Breakout", "VWAP retest"],
    routine: ["Plan review", "Journal", "Break", "Risk check"],
    confirmTool: ["RSI", "MACD", "Volume", "Fibs"],
    timeframe: ["1H", "4H", "Daily", "Weekly"],
  };

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  while (base.length + variants.length < count) {
    const stemList = stems[topic];
    const stem = stemList[Math.floor(Math.random() * stemList.length)];
    const q = stem
      .replace("{acct}", `${Math.floor(1 + Math.random() * 9)}k`)
      .replace("{vol}", `${10 + Math.floor(Math.random() * 30)}`)
      .replace("{trend}", rand(["bullish", "bearish"]))
      .replace("{risk}", `${0.5 + Math.floor(Math.random() * 3)}`)
      .replace("{event}", rand(["losing streak", "win streak", "large loss"]))
      .replace("{bias}", rand(["overconfidence", "loss aversion", "recency"]))
      .replace("{pattern}", rand(["triangle", "flag", "cup-and-handle"]))
      .replace("{style}", rand(["swing", "scalp", "position"]));

    let opts: string[] = [];
    if (topic === "Risk Management") opts = optionsPool.perTrade;
    else if (topic === "Trading Strategy") opts = optionsPool.entryRule;
    else if (topic === "Psychology") opts = optionsPool.routine;
    else opts = optionsPool.confirmTool;

    variants.push({ id: `${topic}-v-${variants.length + 1}`, topic, question: q, options: shuffle(opts) });
  }

  const combined = shuffle([...base, ...variants]).slice(0, count);
  const seen = new Set<string>();
  return combined.filter((q) => (seen.has(q.id) ? false : (seen.add(q.id), true)));
}
