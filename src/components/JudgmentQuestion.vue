<script setup lang="ts">
import { evalExpr } from "@/data/expression";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  questionNumber: number;
  expression: string;
  result: number;
  isCorrect: boolean;
}>();

const emits = defineEmits<{ (e: "update:isCorrect", value: boolean): void }>();

const picked = ref<boolean | undefined>(undefined);

const realAnswer = computed(() => evalExpr(props.expression));

const isCorrect = computed<boolean>({
  get: () => props.isCorrect,
  set: (value) => emits("update:isCorrect", value),
});

watch(picked, (pickedValue) => {
  isCorrect.value =
    pickedValue !== undefined &&
    pickedValue === (realAnswer.value === props.result);
});
</script>
<template>
  <div class="card-body">
    <p>
      <span class="q-number text-primary">{{ questionNumber }}.</span>
      {{ expression }} =
      {{ result }}
    </p>
    <div class="row">
      <div class="col-6 col-sm-3 col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :name="`option-right-${questionNumber}`"
          :id="`option-right-${questionNumber}`"
          :value="true"
          v-model="picked"
        />
        <label class="form-check-label" :for="`option-right-${questionNumber}`">
          √
        </label>
      </div>
      <div class="col-6 col-sm-3 col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :name="`option-wrong-${questionNumber}`"
          :id="`option-wrong-${questionNumber}`"
          :value="false"
          v-model="picked"
        />
        <label class="form-check-label" :for="`option-wrong-${questionNumber}`">
          ×
        </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.q-number {
  font-size: large;
}

input[type="radio"] {
  margin-left: 1rem;
}

label {
  padding-left: 0.5rem;
}
</style>
