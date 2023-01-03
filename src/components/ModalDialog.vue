<script lang="ts" setup>
import { computed, ref } from "vue";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
  closeText?: string;
  saveText?: string;
}>();
const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
  (e: "save"): void;
}>();

const showModal = computed({
  get: () => props.modelValue,
  set: value => emits("update:modelValue", value),
});

const showModalDialog = ref(true);
</script>
<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="showModal"
        class="modal modal-mask"
        @click="showModalDialog = !showModalDialog"
        :class="{ 'modal-mask-fade': !showModalDialog }"
      >
        <div v-if="showModalDialog" class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                {{ title ?? "Title" }}
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="emits('close')"
                aria-label="Close"
              />
            </div>
            <div class="modal-body">
              <slot>
                <p>Modal body text goes here.</p>
              </slot>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="emits('close')"
              >
                {{ closeText ?? "Close" }}
              </button>

              <button
                type="button"
                class="btn btn-primary"
                @click="emits('save')"
              >
                {{ saveText ?? "Save" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
@import "bootstrap/scss/bootstrap-utilities.scss";
.modal-mask {
  position: fixed;
  z-index: $zindex-modal-backdrop;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  transition: opacity 0.3s linear;
}
.modal-mask-fade {
  background-color: rgba(0, 0, 0, 0.1);
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>
