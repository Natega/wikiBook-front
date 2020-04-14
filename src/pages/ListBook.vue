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
        <v-card-title>{{ book.title || 'un' }}</v-card-title>
        <v-card-text>{{ book._id }}</v-card-text>
        <v-card-actions>
          <v-btn text @click="deleteBook(book._id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-content>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Axios from 'axios';
import FormBook from '../components/FormBook.vue';
@Component({
  components: {
    FormBook,
  },
})
export default class ListBooks extends Vue {
  public books: any[] = [];
  public hasPanelAddedBook = false;
  public addBook(data: Record<string, string | number | string[]>) {
    console.log(data);
    Axios.post('http://localhost:8000/book', { ...data });
  }
  public deleteBook(id: string) {
    Axios.delete('http://localhost:8000/book', { data: { id } }).then(r => {
      console.log(this.books.filter(el => el._id !== r.data.id));
      this.books = this.books.filter(el => el._id !== r.data.id);
    });
  }
  mounted() {
    Axios.get('http://localhost:8000/book/all').then(r => {
      this.books = r.data;
    });
  }
}
</script>
