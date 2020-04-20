<template>
  <div>
    <ckeditor
      :editor="editor"
      v-model="myResumer"
      :config="{
        language: 'fr',
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
        ],
      }"
    ></ckeditor>
    <v-btn block class="button-bottom" @click="emitValidation"
      >Valider</v-btn
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class AddUrl extends Vue {
  @Prop(String)
  resumer?: string;
  public myResumer = this.resumer;
  public editor = require('@ckeditor/ckeditor5-build-classic');
  @Watch('myResumer')
  public updateResumer() {
    this.$emit('update:resumer', this.myResumer);
  }
  public emitValidation() {
    this.$emit('swym', this.myResumer);
  }
}
</script>

<style scoped>
.button-bottom {
  margin-bottom: 15px;
}
.ck.ck-content.ck-editor__.editable {
  min-height: 500px;
}
</style>
