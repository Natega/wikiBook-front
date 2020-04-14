<template>
  <iframe
    v-if="url !== ''"
    width="100%"
    min-height="500px"
    height="315px"
    :src="url"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
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
