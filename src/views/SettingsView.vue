<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";
import { isValidSetting } from "@/data/setting";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const {
  numberOfJudgments,
  numberRange,
  numberOfOperands,
  allowNegative,
  allowParentheses,
  numberOfMultipleChoices,
  numberOfFillInTheBlanks,
} = storeToRefs(useSettingsStore());
const numberRangeTemp = ref(numberRange.value);
const numberOfOperandsTemp = ref(numberOfOperands.value);
const allowNegativeTemp = ref(allowNegative.value);
const allowParenthesesTemp = ref(allowParentheses.value);
const numberOfJudgmentsTemp = ref(numberOfJudgments.value);
const numberOfMultipleChoicesTemp = ref(numberOfMultipleChoices.value);
const numberOfFillInTheBlanksTemp = ref(numberOfFillInTheBlanks.value);

const router = useRouter();
const submitDisabled = computed(
  () =>
    (numberRangeTemp.value === numberRange.value &&
      numberOfOperandsTemp.value === numberOfOperands.value &&
      allowNegativeTemp.value === allowNegative.value &&
      allowParenthesesTemp.value === allowParentheses.value &&
      numberOfJudgments.value === numberOfJudgmentsTemp.value &&
      numberOfFillInTheBlanks.value === numberOfFillInTheBlanksTemp.value &&
      numberOfMultipleChoices.value === numberOfMultipleChoicesTemp.value) ||
    !isValidSetting({
      numberRange: numberRangeTemp,
      numberOfOperands: numberOfOperandsTemp,
      allowNegative: allowNegativeTemp,
      allowParentheses: allowParenthesesTemp,
      numberOfJudgments: numberOfJudgmentsTemp,
      numberOfFillInTheBlanks: numberOfFillInTheBlanksTemp,
      numberOfMultipleChoices: numberOfMultipleChoicesTemp,
    })
);

const saveSettings = () => {
  useSettingsStore().applySettings({
    numberRange: numberRangeTemp,
    numberOfOperands: numberOfOperandsTemp,
    allowNegative: allowNegativeTemp,
    allowParentheses: allowParenthesesTemp,
    numberOfJudgments: numberOfJudgmentsTemp,
    numberOfMultipleChoices: numberOfMultipleChoicesTemp,
    numberOfFillInTheBlanks: numberOfFillInTheBlanksTemp,
  });
  router.push("/");
};
</script>

<template>
  <form>
    <div class="row mb-3">
      <label class="col-lg-3 col-form-label" for="number-of-judgments">
        ??????????????????
      </label>
      <div class="col-lg-5">
        <input
          class="form-control"
          type="number"
          name="number-of-judgments"
          id="number-of-judgments"
          v-model="numberOfJudgmentsTemp"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-lg-3 col-form-label" for="number-of-multiple-choices">
        ??????????????????
      </label>
      <div class="col-lg-5">
        <input
          class="form-control"
          type="number"
          name="number-of-multiple-choices"
          id="number-of-multiple-choices"
          v-model="numberOfMultipleChoicesTemp"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label
        class="col-lg-3 col-form-label"
        for="number-of-fill-in-the-blanks"
      >
        ??????????????????
      </label>
      <div class="col-lg-5">
        <input
          class="form-control"
          type="number"
          name="number-of-fill-in-the-blanks"
          id="number-of-fill-in-the-blanks"
          v-model="numberOfFillInTheBlanksTemp"
        />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-lg-3 col-form-label" for="range-select">
        ???????????????
      </label>
      <div class="col-lg-5">
        <select
          class="form-select"
          name="range"
          id="range-select"
          v-model="numberRangeTemp"
        >
          <option :value="0" disabled>?????????</option>
          <option :value="10">10 ??????</option>
          <option :value="100">100 ??????</option>
          <option :value="1000">1000 ??????</option>
        </select>
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-lg-3 col-form-label" for="number-of-operands">
        ??????????????????
      </label>
      <div class="col-lg-5">
        <input
          class="form-control"
          type="number"
          name="number-of-operands"
          id="number-of-operands"
          v-model="numberOfOperandsTemp"
          @change="if (numberOfOperandsTemp < 3) allowParenthesesTemp = false;"
          min="2"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-5 offset-lg-3">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            name="allow-negative"
            id="allow-negative"
            v-model="allowNegativeTemp"
          />
          <label class="form-check-label" for="allow-negative">????????????</label>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-lg-5 offset-lg-3">
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            name="allow-parentheses"
            id="allow-parentheses"
            v-model="allowParenthesesTemp"
            :disabled="numberOfOperandsTemp < 3"
          />
          <label class="form-check-label" for="allow-parentheses">
            ????????????
          </label>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      :disabled="submitDisabled"
      @click="saveSettings"
    >
      ???????????????
    </button>
  </form>
</template>
<style scoped>
main {
  display: flex;
  flex-flow: column;
  height: 100%;
  align-items: center;
}

label {
  padding-left: 1em;
}

input[type="number"] {
  width: 100px;
}

form {
  margin: 10% 20%;
  display: grid;
  align-items: center;
}
</style>
