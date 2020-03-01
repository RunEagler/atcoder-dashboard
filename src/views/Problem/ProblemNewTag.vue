<template>
  <div style="display:inline" class="problem-new-tag">
    <a-popover trigger="click" v-model="visible" placement="right">
      <template slot="content">
        <p style="width:700px">
          <a-select size="small" defaultValue="0" @change="handleChangeTag" style="width: 100%">
            <a-select-option key="0" value="0">Please select tag</a-select-option>
            <a-select-option v-for="(tag, i) in tags" :key="`tag-${i}`" :value="tag.id">
              {{ tag.word }}
            </a-select-option>
          </a-select>
          <a-divider>or</a-divider>
          <a-input
            ref="input"
            type="text"
            size="small"
            placeholder="Please input new tag"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
        </p>
      </template>
      <a-button type="primary">New Tag</a-button>
    </a-popover>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Tag } from '@/models/tag';
import { tagModule } from '@/store/modules/tag.module';

@Component({
  name: 'problem-new-tag',
  components: {},
})
export default class ProblemNewTag extends Vue {
  visible: boolean = false;
  inputValue: string = '';

  mounted() {}

  get tags(): Tag[] {
    return tagModule.tags;
  }

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

  handleChangeTag(tagID: number) {
    this.visible = false;
    this.$emit('select', tagID);
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

<style lang="scss">
.problem-new-tag {
}
</style>
