<template>
  <v-content>
    <v-row>
      <v-col md="4" sm="12">
        <v-expansion-panels accordion v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header>
              <h2>{{ title }}</h2>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col md="6" sm="12">
                  <center>
                    <v-img class="white--text align-end" :src="img" width="200px"></v-img>
                  </center>
                </v-col>
                <v-col md="6" sm="12">
                  <div v-if="!editBook">
                    Auteur :
                    <B>{{ author }}</B>
                    <center>
                      <v-btn
                        @click="editBook = true"
                        class="mx-2 button-top"
                        fab
                        dark
                        color="indigo"
                        v-if="!addVideoUrl"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </center>
                  </div>
                  <FormBook v-else :author="author" />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Vidéos ({{ videos.length }})</v-expansion-panel-header>
            <v-expansion-panel-content>
              <center>
                <transition name="fade" mode="out-in">
                  <v-btn
                    @click="invertAddVideoUrl()"
                    class="mx-2 button-top"
                    fab
                    dark
                    color="indigo"
                    v-if="!addVideoUrl"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                  <AddUrl v-else :callbackFn="callAddUrl" />
                </transition>
                <div v-for="(video, index) in videos" :key="index">
                  <VideoFrame :url="video" />
                </div>
              </center>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>Podcasts ({{ podcasts.length }})</v-expansion-panel-header>
            <v-expansion-panel-content>
              <center>
                <transition name="fade" mode="out-in">
                  <v-btn
                    @click="invertAddPodcastUrl()"
                    class="mx-2 button-top"
                    fab
                    dark
                    color="indigo"
                    v-if="!addPodcastUrl"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                  <AddUrl v-else :callbackFn="callAddUrl" />
                </transition>
                <div v-for="(podcast, index) in podcasts" :key="index">
                  <PodcastFrame :url="podcast" />
                </div>
              </center>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col :cols="10" md="4" sm="12">
        <h2>Résumé</h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas maximus
        odio sit amet leo iaculis, sed consectetur dolor congue. Aliquam lacinia urna
        id neque
      </v-col>
      <v-col :cols="10" md="4" sm="12"></v-col>
    </v-row>
  </v-content>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import FormBook from './FormBook.vue';
import VideoFrame from './VideoFrame.vue';
import PodcastFrame from './PodcastFrame.vue';
import AddUrl from './AddUrl.vue';
import config from '@/config';
export default Vue.extend({
  components: {
    VideoFrame,
    AddUrl,
    PodcastFrame,
    FormBook,
  },
  methods: {
    invertAddPodcastUrl() {
      this.addPodcastUrl = !this.addPodcastUrl;
    },
    invertAddVideoUrl() {
      this.addVideoUrl = !this.addVideoUrl;
    },
    callAddUrl: function(data: object) {
      alert(data);
      this.addPodcastUrl = false;
    },
  },
  mounted() {
    axios
      .get(config.back + '/book/id/' + this.$route.params._id, {})
      .then((response: any) => {
        this.img = response.data.img;
        this.title = response.data.title;
        this.videos = response.data.videos;
        this.podcasts = response.data.podcasts;
        this.author = response.data.author;
      });
  },
  data(): {
    img: string;
    title: string;
    loading: boolean;
    videos: string[];
    podcasts: string[];
    panel: number;
    author: string;
    addVideoUrl: boolean;
    addPodcastUrl: boolean;
    editBook: boolean;
  } {
    return {
      editBook: false,
      addVideoUrl: false,
      addPodcastUrl: false,
      panel: 0,
      podcasts: [],
      loading: true,
      title: '',
      videos: [],
      author: '',
      img: '',
    };
  },
});
</script>

<style>
.button-top {
  margin-top: 15px;
  margin-bottom: 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
