<template>
  <v-content>
    <v-btn
      @click="hasPanelAddedBook = !hasPanelAddedBook"
      class="mx-2 button-top"
      fab
      dark
      color="indigo"
      v-if="!hasPanelAddedBook"
    >
      <v-icon dark>mdi-pencil</v-icon>
    </v-btn>
    <v-row v-else>
      <v-col cols="4">
        <v-card>
          <v-card-title>Ajouter un livre</v-card-title>
          <v-card-text>
            <FormBook :action="addBook" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-for="book in books" :key="book._id">
      <CardBook :book="book" :goToBook="goToBook" :deleteBook="deleteBook" />
    </div>
  </v-content>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import IBook from '@/types/IBook';
import FormBook from '@/components/FormBook.vue';
import CardBook from '@/components/CardBook.vue';

import config from '@/config';
@Component({
  components: {
    FormBook,
    CardBook,
  },
})
export default class ListBooks extends Vue {
  public books: IBook[] = [];
  public hasPanelAddedBook = false;
  public addBook(data: IBook) {
    Axios.post(config.back + '/book', { ...data }).then(response => {
      this.books.push({ _id: response.data._id, ...data });
      this.hasPanelAddedBook = false;
    });
  }
  public goToBook(_id: string) {
    this.$router.push({ name: 'BookById', params: { _id } }); //@TODO maybe use compose api or utils
  }
  public deleteBook(_id: string) {
    Axios.delete(config.back + '/book', { data: { _id } }).then(
      response => {
        this.books = this.books.filter(el => el._id !== response.data._id);
      }
    );
  }
  mounted() {
    Axios.get(config.back + '/book/all').then(response => {
      this.books = response.data as IBook[];
    });
  }
}
</script>
