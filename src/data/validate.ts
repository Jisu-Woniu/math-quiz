import { unref, type Ref } from "vue";

export interface Settings {
  totalNumber?: number;
  numberRange: number | Ref<number>;
  numberOfOperands: number | Ref<number>;
  allowNegative: boolean | Ref<boolean>;
  allowParentheses: boolean | Ref<boolean>;
  numberOfJudgments: number | Ref<number>;
  numberOfMultipleChoices: number | Ref<number>;
  numberOfFillInTheBlanks: number | Ref<number>;
}

export const isValidSetting = (s: Settings) => {
  const numberRange = unref(s.numberRange);
  const numberOfOperands = unref(s.numberOfOperands);
  const allowParentheses = unref(s.allowParentheses);
  const numberOfJudgments = unref(s.numberOfJudgments);
  const numberOfMultipleChoices = unref(s.numberOfMultipleChoices);
  const numberOfFillInTheBlanks = unref(s.numberOfFillInTheBlanks);

  return (
    numberRange > 0 &&
    numberOfOperands >= 2 &&
    Number.isInteger(numberOfOperands) &&
    numberOfJudgments >= 0 &&
    Number.isInteger(numberOfJudgments) &&
    numberOfMultipleChoices >= 0 &&
    Number.isInteger(numberOfMultipleChoices) &&
    numberOfFillInTheBlanks >= 0 &&
    Number.isInteger(numberOfFillInTheBlanks) &&
    (!allowParentheses || numberOfOperands >= 3)
  );
};
