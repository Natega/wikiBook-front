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
                  <FormBook v-else :title.sync="title" />
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
                  <AddUrl v-else :callbackFn="callAddVideoUrl" :rules="youtubeRules" />
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
                  <AddUrl v-else :callbackFn="callAddPodcastUrl" />
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
        <article v-html="resumer"></article>
      </v-col>
      <v-col :cols="10" md="4" sm="12">
        <center>
          <v-btn
            @click="invertEditResumer()"
            class="mx-2 button-top"
            fab
            dark
            color="indigo"
            v-if="!editResumer"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </center>
        <Swym v-if="editResumer" :resumer.sync="resumer" @swym="invertEditResumer" />
      </v-col>
    </v-row>
  </v-content>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';
import axios from 'axios';
import FormBook from './FormBook.vue';
import VideoFrame from './VideoFrame.vue';
import PodcastFrame from './PodcastFrame.vue';
import Swym from './Swym.vue';
import AddUrl from './AddUrl.vue';
import config from '@/config';
import Axios from 'axios';
export default Vue.extend({
  components: {
    VideoFrame,
    AddUrl,
    PodcastFrame,
    FormBook,
    Swym,
  },
  methods: {
    invertEditResumer() {
      this.editResumer = !this.editResumer;
    },
    invertAddPodcastUrl() {
      this.addPodcastUrl = !this.addPodcastUrl;
    },
    invertAddVideoUrl() {
      this.addVideoUrl = !this.addVideoUrl;
    },
    callAddVideoUrl: function(data: object) {
      this.addVideoUrl = false;
      Axios.patch(
        config.back + '/book/video/' + this.$route.params._id,
        data
      ).then(response => {
        if (this.videos) {
          this.videos.push(response.data.url);
        }
      });
    },
    callAddPodcastUrl: function(data: object) {
      this.addPodcastUrl = false;
      Axios.patch(
        config.back + '/book/podcast/' + this.$route.params._id,
        data
      ).then(response => {
        if (this.podcasts) {
          this.podcasts.push(response.data.url);
        }
      });
    },
  },
  mounted() {
    axios
      .get(config.back + '/book/id/' + this.$route.params._id, {})
      .then((response: any) => {
        this.title = response.data.title;
        this.img = response.data.img;
        this.videos = response.data.videos;
        this.podcasts = response.data.podcasts;
        this.author = response.data.author;
      });
  },
  data(): {
    img: string;
    author: string;
    title: string;
    panel: number;
    podcasts: string[];
    videos: string[];
    addVideoUrl: boolean;
    addPodcastUrl: boolean;
    editBook: boolean;
    editResumer: boolean;
    youtubeRules: Record<string, Function>;
    resumer: string;
  } {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      resumer: '<h2>HW</h2> My bad <br/>',
      editResumer: false,
      editBook: false,
      addVideoUrl: false,
      addPodcastUrl: false,
      panel: 0,
      img: '',
      author: '',
      title: '',
      podcasts: [],
      videos: [],
      youtubeRules: {
        url: (value: string) => {
          const pattern = /^https:\/\/www.youtube.com\/embed\/.{11}$/;
          return pattern.test(value) || "Ceci n'est pas une url youtube";
        },
      },
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
