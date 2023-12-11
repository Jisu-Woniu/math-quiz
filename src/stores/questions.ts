import type { Question } from "@/data/question";
import { defineStore, type StoreDefinition } from "pinia";
import { ref } from "vue";

const useQuestionsStore: StoreDefinition<"questions"> = defineStore(
  "questions",
  () => {
    const questions = ref<Question[]>([]);
    return { questions };
  },
);

export { useQuestionsStore };
