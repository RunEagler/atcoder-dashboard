<template>
  <div style="display:inline">
    <a-input
      v-if="visible"
      ref="input"
      type="text"
      size="small"
      :style="{ width: '250px' }"
      :value="inputValue"
      @change="handleInputChange"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
      <a-icon type="plus" /> New Tag
    </a-tag>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'create-tag',
  components: {},
})
export default class CreateTag extends Vue {
  visible: boolean = false;
  inputValue: string = '';

  mounted() {}

  showInput() {
    this.visible = true;
    this.$nextTick(function() {
      const ref: any = this.$refs.input;
      ref.focus();
    });
  }

  handleInputChange(e: any) {
    this.inputValue = e.target.value;
  }

  handleInputConfirm() {
    this.visible = false;
    if (this.inputValue === '') {
      return;
    }
    const newWord: string = this.inputValue;
    this.inputValue = '';
    this.$emit('blur', newWord);
  }
}
</script>

<style scoped lang="scss"></style>
