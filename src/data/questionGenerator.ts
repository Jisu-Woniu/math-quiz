import { type Question, QuestionType } from "./question";
import type { Setting } from "./setting";
import { unref } from "vue";
import { evalExpr, round } from "./expression";

/**
 * 生成 [min, max) 范围的随机数
 * @param max 随机数上界（不含）
 * @param min 随机数下界
 */
const randInt = (max: number, min: number = 0) =>
  Math.floor(Math.random() * (max - min) + min);

/**
 * 根据设置生成表达式
 * @param settings 设置项
 */
const expressionGenerator = (settings: Setting): string => {
  const n = unref(settings.numberOfOperands);
  const numberRange = unref(settings.numberRange);

  /**
   * 生成长为 n 的操作数序列
   */
  const operandsGen = (): string[] =>
    Array.from<void, string>({ length: n }, () => {
      const i = round(
        unref(settings.allowNegative)
          ? Math.random() * numberRange * 2 - numberRange
          : Math.random() * numberRange,
      );
      return i < 0 ? `(${i})` : `${i}`;
    });

  /**
   * 生成长为 n - 1 的运算符序列
   */
  const operatorsGen = (): string[] =>
    Array.from<void, string>(
      { length: n - 1 },
      () => [" + ", " - ", " × ", " ÷ "][randInt(4)],
    );

  /**
   * 将操作数与运算符组合成最终表达式
   */
  const expression = ((): string => {
    let expr = "";
    do {
      const operands = operandsGen();
      const operators = operatorsGen();
      if (settings.allowParentheses && randInt(2)) {
        // 生成括号序列
        let l = randInt(n - 1);
        let r = randInt(n + 1, l + 2);
        while (l == 0 && r == n) {
          l = randInt(n - 1);
          r = randInt(n + 1, l + 2);
        }
        operators.splice(l, 0, "(");
        operators.splice(r, 0, ")");
      }
      expr = "";
      let j = 0;
      for (let i = 0; i < operators.length; ++i) {
        const operator = operators[i];
        if (operator === "(") {
          expr += operator;
          continue;
        } else {
          expr += operands[j];
          ++j;
          expr += operator;
          if (operator === ")") {
            ++i;
            if (i < operators.length) expr += operators[i];
          }
        }
      }
      if (j < operands.length) expr += operands[j];
    } while (Math.abs(evalExpr(expr)) > settings.numberRange);
    return expr;
  })();

  return expression;
};

/**
 * 从列表中乱序选出若干项
 * @param xs 待选择项构成的列表
 * @param n 需选择项的数目
 */
const shuffleAndChoose = <T>(xs: T[], n?: number): T[] => {
  if (n === undefined) {
    n = xs.length;
  }

  // Fisher-Yates 算法
  for (let i = 0; i < n; i++) {
    const j = randInt(i, n);
    const t = xs[i];
    xs[i] = xs[j];
    xs[j] = t;
  }

  return xs.slice(0, n);
};

/**
 * 根据设置生成问题列表
 * @param settings 设置项
 */
const questionGenerator = (settings: Setting) => [
  ...Array.from<void, Question>(
    { length: unref(settings.numberOfJudgments) },
    (): Question => {
      const expression = expressionGenerator(settings);
      const realAnswer = evalExpr(expression);
      const answer = round(
        randInt(2) ? realAnswer : realAnswer + Math.random() * 2 - 1,
      );
      return {
        questionType: QuestionType.Judgment,
        expression,
        result: answer,
      };
    },
  ),
  ...Array.from<void, Question>(
    { length: unref(settings.numberOfMultipleChoices) },
    (): Question => {
      const expression = expressionGenerator(settings);
      const realAnswer = evalExpr(expression);
      const options = shuffleAndChoose([
        realAnswer,
        ...shuffleAndChoose(
          [
            realAnswer + 0.1,
            realAnswer + 0.2,
            realAnswer + 0.3,
            realAnswer + 0.4,
            realAnswer + 0.5,
            realAnswer - 0.1,
            realAnswer - 0.2,
            realAnswer - 0.3,
            realAnswer - 0.4,
            realAnswer - 0.5,
          ],
          3,
        ),
      ]).map(round);
      return {
        questionType: QuestionType.MultipleChoice,
        expression,
        options,
      };
    },
  ),
  ...Array.from<void, Question>(
    { length: unref(settings.numberOfFillInTheBlanks) },
    (): Question => ({
      questionType: QuestionType.FillInTheBlank,
      expression: expressionGenerator(settings),
    }),
  ),
];

export { questionGenerator };
