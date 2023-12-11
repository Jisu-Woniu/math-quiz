import {
  create,
  evaluateDependencies,
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  unaryMinusDependencies,
} from "mathjs/number";

const math = create({
  evaluateDependencies,
  addDependencies,
  subtractDependencies,
  multiplyDependencies,
  divideDependencies,
  unaryMinusDependencies,
});

const round = (x: number) => Math.round(x * 10) / 10;

/**
 * 计算表达式
 * @param expression 待计算表达式
 */
const evalExpr: (e: string) => number = (expression) => {
  const t = expression.replace(/×/g, "*").replace(/÷/g, "/");
  return round(math.evaluate(t));
};

export { evalExpr, round };
