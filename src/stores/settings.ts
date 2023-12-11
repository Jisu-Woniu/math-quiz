import { computed, ref, unref } from "vue";
import { defineStore, type StoreDefinition } from "pinia";
import type { Setting } from "@/data/setting";

const useSettingsStore: StoreDefinition<"settings", Setting> = defineStore(
  "settings",
  () => {
    const allowNegative = ref(false);
    const allowParentheses = ref(false);
    const numberOfOperands = ref(2);
    const numberOfJudgments = ref(3);
    const numberOfMultipleChoices = ref(3);
    const numberOfFillInTheBlanks = ref(4);
    const numberRange = ref(0);
    const totalNumber = computed(
      () =>
        numberOfFillInTheBlanks.value +
        numberOfJudgments.value +
        numberOfMultipleChoices.value,
    );

    const applySettings = (settings: Setting) => {
      allowNegative.value = unref(settings.allowNegative);
      allowParentheses.value = unref(settings.allowParentheses);
      numberOfJudgments.value = unref(settings.numberOfJudgments);
      numberOfFillInTheBlanks.value = unref(settings.numberOfFillInTheBlanks);
      numberOfMultipleChoices.value = unref(settings.numberOfMultipleChoices);
      numberOfOperands.value = unref(settings.numberOfOperands);
      numberRange.value = unref(settings.numberRange);
    };

    return {
      numberOfJudgments,
      numberRange,
      numberOfOperands,
      allowNegative,
      allowParentheses,
      numberOfMultipleChoices,
      numberOfFillInTheBlanks,
      totalNumber,
      applySettings,
    };
  },
);
export { useSettingsStore };
