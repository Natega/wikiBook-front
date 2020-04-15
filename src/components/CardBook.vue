<template>
  <v-card>
    <v-card-title>{{ book.title || 'undefined' }}</v-card-title>
    <v-card-text>{{ book._id }}</v-card-text>
    <v-img class="white--text align-end" :src="book.img" width="200px"></v-img>
    <v-card-actions>
      <v-btn v-if="goToBook" text @click="goToBook(book._id)">Explore</v-btn>
      <v-btn v-if="deleteBook" text @click="deleteBook(book._id)">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import IBook from '@/types/IBook';
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class CardBook extends Vue {
  @Prop()
  book?: IBook;
  @Prop()
  goToBook?: Function;
  @Prop()
  deleteBook?: Function;
}
</script>
>
