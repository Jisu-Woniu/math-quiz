<script setup lang="ts">
import { evalExpr } from "@/data/questionGenerator";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  questionNumber: number;
  expression: string;
  options: number[];
  isCorrect: boolean;
}>();

const emits = defineEmits<{ (e: "update:isCorrect", value: boolean): void }>();

const picked = ref<number | undefined>(undefined);
const realAnswer = computed(() => evalExpr(props.expression));

const isCorrect = computed<boolean>({
  get: () => props.isCorrect,
  set: (value) => emits("update:isCorrect", value),
});

watch(picked, (pickedValue) => {
  isCorrect.value =
    pickedValue !== undefined &&
    realAnswer.value === props.options[pickedValue];
});
</script>
<template>
  <div class="card-body">
    <p>
      <span class="q-number text-primary">{{ questionNumber }}.</span>
      {{ expression }} =
    </p>
    <div class="row">
      <div class="col-12 col-sm-6 col-md-3 col-lg-2">
        <input
          class="form-check-input"
          type="radio"
          :name="`option-a-${questionNumber}`"
          :id="`option-a-${questionNumber}`"
          :value="0"
          v-model="picked"
        />
        <label class="form-check-label" :for="`option-a-${questionNumber}`">
          A. {{ options[0] }}
        </label>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-2">
        <input
          class="form-check-input"
          type="radio"
          :name="`option-b-${questionNumber}`"
          :id="`option-b-${questionNumber}`"
          :value="1"
          v-model="picked"
        />
        <label class="form-check-label" :for="`option-b-${questionNumber}`">
          B. {{ options[1] }}
        </label>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-2">
        <input
          class="form-check-input"
          type="radio"
          :name="`option-c-${questionNumber}`"
          :id="`option-c-${questionNumber}`"
          :value="2"
          v-model="picked"
        />
        <label class="form-check-label" :for="`option-c-${questionNumber}`">
          C. {{ options[2] }}
        </label>
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-lg-2">
        <input
          class="form-check-input"
          type="radio"
          :name="`option-d-${questionNumber}`"
          :id="`option-d-${questionNumber}`"
          :value="3"
          v-model="picked"
        />
        <label class="form-check-label" :for="`option-d-${questionNumber}`">
          D. {{ options[3] }}
        </label>
      </div>
    </div>
  </div>
</template>
<style scoped>
.q-number {
  font-size: large;
}
.container {
  border: 1px lightgrey solid;
  margin: 0.5em;
  padding: 1em;
  display: flex;
  flex-direction: column;
}

input[type="radio"] {
  margin-left: 1rem;
}

label {
  padding-left: 0.5rem;
}
</style>
