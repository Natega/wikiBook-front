<template>
  <iframe :src="url" width="100%" frameborder="0" scrolling="no" height="150px"></iframe>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  // Makes a "exampleProperty" a component prop with the default value of 'Example'
  @Prop(String)
  url?: string;
}
</script>

<style></style>
