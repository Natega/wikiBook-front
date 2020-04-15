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
      <v-card>
        <v-card-title>{{ book.title || 'undefined' }}</v-card-title>
        <v-card-text>{{ book._id }}</v-card-text>

        <v-img class="white--text align-end" :src="book.img" width="200px"></v-img>
        <v-card-actions>
          <v-btn text @click="goToBook(book._id)">Explore</v-btn>
          <v-btn text @click="deleteBook(book._id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-content>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import IBook from '@/types/IBook';
import FormBook from '../components/FormBook.vue';
@Component({
  components: {
    FormBook,
  },
})
export default class ListBooks extends Vue {
  public books: IBook[] = [];
  public hasPanelAddedBook = false;
  public addBook(data: IBook) {
    alert('ddd');
    Axios.post(process.env.VUE_APP_BACK + '/book', { ...data }).then(response => {
      this.books.push({ _id: response.data._id, ...data });
      this.hasPanelAddedBook = false;
    });
  }
  public goToBook(_id: string) {
    this.$router.push({ name: 'BookById', params: { _id } });
  }
  public deleteBook(_id: string) {
    Axios.delete(process.env.VUE_APP_BACK + '/book', { data: { _id } }).then(r => {
      this.books = this.books.filter(el => el._id !== r.data._id);
    });
  }
  mounted() {
    Axios.get(process.env.VUE_APP_BACK + '/book/all').then(r => {
      this.books = r.data;
    });
  }
}
</script>
