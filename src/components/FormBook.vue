<template>
  <div>
    <v-text-field v-model="myTitle" :value="title" label="Titre" />
    <v-text-field v-model="myImg" :value="img" label="Image" />
    <v-text-field v-model="myAuthor" :value="author" label="Auteur" />
    <v-textarea v-model="mySubtitle" :value="subtitle" label="Sous-titre" maxlength="150" />
    <v-textarea
      v-model="myDescription"
      :value="description"
      label="Petite description"
      maxlength="150"
    />
    <v-btn block class="button-bottom" @click="addBook">Modifier</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class FormBook extends Vue {
  public myTitle?: string;
  public myImg?: string;
  public myAuthor?: string;
  public mySubtitle?: string;
  public myDescription?: string;
  @Prop({ type: String, default: '' })
  title?: string;
  @Prop({ type: String, default: '' })
  img?: string;
  @Prop({ type: String, default: '' })
  author?: string;
  @Prop({ type: String, default: '' })
  description?: string;
  @Prop({ type: String, default: '' })
  subtitle?: string;
  @Prop({ type: Function })
  action?: Function;
  public addBook() {
    if (this.action) {
      this.action({
        title: this.myTitle,
        img: this.myImg,
        author: this.myAuthor,
        description: this.myDescription,
        subtitle: this.mySubtitle,
      });
    }
  }
}
</script>
<style></style>
