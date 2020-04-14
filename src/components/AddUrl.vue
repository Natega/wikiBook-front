<template>
  <div>
    <v-text-field
      v-model="url"
      block
      label="Lien vers votre vidéo"
      placeholder="Lien vers Youtube"
      :autofocus="true"
    />
    <v-btn block class="button-bottom" @click="test">Ajouter</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AddUrl extends Vue {
  public url = '';
  @Prop(Function)
  callbackFn?: Function;
  public test() {
    if (this.callbackFn) {
      this.callbackFn({ url: this.url });
    }
  }
}
</script>

<style>
.button-bottom {
  margin-bottom: 15px;
}
</style>
