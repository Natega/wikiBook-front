<template>
  <div>
    <span v-if="this._id">{{ this._id }}</span>
    <v-text-field v-model="myTitle" label="Titre" />
    <v-text-field v-model="myImg" label="Image" />
    <v-text-field v-model="myAuthor" label="Auteur" />
    <v-textarea v-model="mySubtitle" label="Sous-titre" maxlength="150" />
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
  @Prop({ type: String, default: '' })
  _id?: string;
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

  public myTitle?: string = this.title;
  public myImg?: string = this.img;
  public myAuthor?: string = this.author;
  public mySubtitle?: string = this.subtitle;
  public myDescription?: string = this.description;
  public mode = 'full';
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
