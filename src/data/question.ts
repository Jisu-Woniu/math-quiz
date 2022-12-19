const enum QuestionType {
  FillInTheBlank,
  MultipleChoice,
  Judgment,
}

interface FillInTheBlankQuestion {
  questionType: QuestionType.FillInTheBlank;
  expression: string;
  options?: never;
  result?: never;
}

interface JudgmentQuestion {
  questionType: QuestionType.Judgment;
  expression: string;
  options?: never;
  result: number;
}

interface MultipleChoiceQuestion {
  questionType: QuestionType.MultipleChoice;
  expression: string;
  options: number[];
  result?: never;
}

type Question =
  | FillInTheBlankQuestion
  | JudgmentQuestion
  | MultipleChoiceQuestion;

const round = (x: number) => Math.round(x * 10) / 10;

export { QuestionType, type Question, round };
