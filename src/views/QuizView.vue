<script setup lang="ts">
import QuestionContainer from "@/components/QuestionContainer.vue";
import { round, type Question } from "@/data/question";
import { evalExpr, questionGenerator } from "@/data/questionGenerator";
import { isValidSetting } from "@/data/validate";
import { useSettingsStore } from "@/stores/settings";
import { nextTick, onMounted, ref } from "vue";
import ModalDialog from "@/components/ModalDialog.vue";

const settings = useSettingsStore();
const questions = ref<Question[]>([]);
const isCorrect = ref<boolean[]>([]);
const showModal = ref(false);
const generate = () => {
  if (isValidSetting(settings)) {
    questions.value = questionGenerator(settings);
    isCorrect.value = Array.from(
      { length: settings.totalNumber ?? 0 },
      () => false
    );
  }
};
const anchor = document.createElement("a");
const download = () => {
  const report = questions.value.map(
    (q, i) =>
      `${i + 1}. ${
        isCorrect.value[i]
          ? "正确"
          : "错误，正确答案：" + evalExpr(q.expression)
      }`
  );
  report.push(
    `共 ${settings.totalNumber} 题，你答对了 ${
      isCorrect.value.filter(v => v).length
    } 题，得分 ${round(
      (isCorrect.value.filter(v => v).length / (settings.totalNumber ?? 1)) *
        100
    )}`
  );
  const blob = new Blob([report.join("\n")], {
    type: "text/plain",
  });
  anchor.href = URL.createObjectURL(blob);
  anchor.download =
    (d =>
      `Report-${d.getFullYear()}${d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}${d.getSeconds()}`)(
      new Date()
    ) + ".txt";
  anchor.click();
};
const forceRegenerate = async () => {
  const numberOfJudgments = settings.numberOfJudgments;
  settings.numberOfJudgments = 0;
  const numberOfMultipleChoices = settings.numberOfMultipleChoices;
  settings.numberOfMultipleChoices = 0;
  const numberOfFillInTheBlanks = settings.numberOfFillInTheBlanks;
  settings.numberOfFillInTheBlanks = 0;
  questions.value = questionGenerator(settings);
  await nextTick();
  settings.numberOfJudgments = numberOfJudgments;
  settings.numberOfMultipleChoices = numberOfMultipleChoices;
  settings.numberOfFillInTheBlanks = numberOfFillInTheBlanks;
  generate();
};
onMounted(generate);
</script>

<template>
  <main class="quiz-view" v-if="isValidSetting(settings)">
    <div class="questions container-sm">
      <QuestionContainer
        v-for="{ question, qNumber } in questions.map((q, i) => {
          return { question: q, qNumber: i };
        })"
        :key="qNumber"
        :question-number="qNumber + 1"
        :question-info="question"
        v-model:is-correct="isCorrect[qNumber]"
      />
    </div>
    <button class="btn btn-primary btn-lg" @click="showModal = true">
      提交
    </button>
    <ModalDialog
      v-model="showModal"
      @close="
        showModal = false;
        forceRegenerate();
      "
      @save="download"
      title="答题结果"
      close-text="再来一轮"
      save-text="导出"
    >
      <table>
        <tr
          v-for="i in Array.from(
            { length: settings.totalNumber ?? 0 },
            (_, i) => i
          )"
          :key="i"
        >
          <td class="text-primary">{{ i + 1 }}.</td>
          <td class="text-body">{{ questions[i].expression }}</td>
          <td v-if="isCorrect[i]" class="text-success" colspan="3">正确</td>
          <span v-else>
            <td class="text-danger">错误</td>
            <td class="text-body">，</td>
            <td class="text-info">
              正确答案：{{ evalExpr(questions[i].expression) }}
            </td>
          </span>
        </tr>
      </table>
      <p>
        共 {{ settings.totalNumber }} 题，你答对了
        {{ isCorrect.filter(v => v).length }} 题，得分
        {{
          round(
            (isCorrect.filter(v => v).length / (settings.totalNumber ?? 1)) *
              100
          )
        }}
      </p>
    </ModalDialog>
  </main>
  <main class="info" v-else>
    <div>
      你还没有设置题目信息哦，快去
      <RouterLink class="link-primary" to="/settings">
        <i class="bi bi-gear"></i> 设置
      </RouterLink>
      页面修改吧！
    </div>
  </main>
</template>

<style scoped>
.quiz-view {
  display: flex;
  flex-direction: column;
}
.info {
  display: flex;
  height: 100%;
  min-height: 50vh;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  font-size: 2rem;
}
.btn {
  align-self: stretch;
  margin: 1em;
}
</style>
