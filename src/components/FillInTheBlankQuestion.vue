<script setup lang="ts">
import { evalExpr } from "@/data/questionGenerator";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  questionNumber: number;
  expression: string;
  isCorrect: boolean;
}>();

const emits = defineEmits<{ (e: "update:isCorrect", value: boolean): void }>();

const answer = ref<number | undefined>(undefined);
const realAnswer = computed(() => evalExpr(props.expression));

const isCorrect = computed<boolean>({
  get: () => props.isCorrect,
  set: (value) => emits("update:isCorrect", value),
});

watch(answer, (answerValue) => {
  isCorrect.value =
    answerValue !== undefined && realAnswer.value === answerValue;
});
</script>
<template>
  <div class="card-body">
    <p>
      <span class="q-number text-primary">{{ questionNumber }}.</span>
      {{ expression }} =
    </p>
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
      <input
        type="number"
        name="answer"
        class="form-control col-1"
        placeholder="请输入答案"
        v-model="answer"
      />
    </div>
  </div>
</template>
<style scoped>
.q-number {
  font-size: large;
}
</style>
