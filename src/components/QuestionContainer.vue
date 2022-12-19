<script lang="ts" setup>
import FillInTheBlankQuestion from "./FillInTheBlankQuestion.vue";
import JudgmentQuestion from "./JudgmentQuestion.vue";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.vue";
import { QuestionType, type Question } from "@/data/question";
import { computed } from "vue";

const props = defineProps<{
  questionInfo: Question;
  questionNumber: number;
  isCorrect: boolean;
}>();

const emits = defineEmits<{ (e: "update:isCorrect", value: boolean): void }>();

const isCorrect = computed<boolean>({
  get() {
    return props.isCorrect;
  },
  set(value) {
    emits("update:isCorrect", value);
  },
});
</script>
<template>
  <div class="card my-1">
    <FillInTheBlankQuestion
      v-if="props.questionInfo.questionType === QuestionType.FillInTheBlank"
      :expression="props.questionInfo.expression"
      :question-number="props.questionNumber"
      v-model:is-correct="isCorrect"
    />
    <JudgmentQuestion
      v-else-if="props.questionInfo.questionType === QuestionType.Judgment"
      :question-number="props.questionNumber"
      :expression="props.questionInfo.expression"
      :result="props.questionInfo.result"
      v-model:is-correct="isCorrect"
    />
    <MultipleChoiceQuestion
      v-else
      :question-number="props.questionNumber"
      :expression="props.questionInfo.expression"
      :options="props.questionInfo.options"
      v-model:is-correct="isCorrect"
    />
  </div>
</template>
<style scoped></style>
