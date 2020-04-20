<template>
  <div>
    <v-text-field
      v-model="url"
      block
      label="Lien vers votre vidéo"
      placeholder="Lien vers Youtube"
      :autofocus="true"
      :rules="myRules"
    />
    <v-btn :disabled="!isValidUrl" block class="button-bottom" @click="test">Ajouter</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AddUrl extends Vue {
  public url = '';
  get myRules() {
    if (this.rules) {
      return Object.values(this.rules);
    }
    return [];
  }
  get isValidUrl() {
    if (this.rules && typeof this.rules === 'object') {
      for (const rule in this.rules) {
        if (this.rules[rule](this.url) !== true) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  @Prop(Function)
  callbackFn?: Function;
  public test() {
    if (this.callbackFn) {
      this.callbackFn({ url: this.url });
    }
  }
  @Prop({
    type: Object,
    default: function() {
      return {
        required: (value: string) => !!value || 'Required.',
        url: (value: string) => {
          const pattern = /^https?:\/\/./;
          return (
            pattern.test(value) || 'Non valide url doit être https ou http'
          );
        },
      };
    },
  })
  rules?: Record<string, Function>;
}
</script>

<style>
.button-bottom {
  margin-bottom: 15px;
}
</style>
