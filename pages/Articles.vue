<template>
  <div v-if="loaded">
    <BannerTitle
      title="Get your head out of the sand"
      description="Stay informed and learn ways to protect your privacy"
    />
    <b-container>
      <div class="small-container">
        <b-card v-for="(post, index) in posts" :key="index">
          <b-card-body>
            <b-card-title>
              <div class="caption mb-2">
                {{ getPostDate(post.date) }}
              </div>
              <h2 class="text-center">
                <NuxtLink :to="'/articles/' + post.slug">
                  {{ post.title.rendered }}
                </NuxtLink>
              </h2>
            </b-card-title>
          </b-card-body>

          <b-card-img
            img-top
            v-if="post._embedded && post._embedded['wp:featuredmedia']"
            :src="post._embedded['wp:featuredmedia'][0].source_url"
          />
          <b-card-text
            class="mt-4 f-Roboto"
            v-html="post.excerpt ? post.excerpt.rendered : ''"
          ></b-card-text>          

          <div class="my-4">
            <facebook :url="''" scale="2" class="mr-1"></facebook>
            <twitter :url="''" scale="2" class="mr-1"></twitter>
          </div>

          <NuxtLink
            :to="'/articles/' + post.slug"
            class="card-link btn btn-outline f-Montserrat"
          >
            READ MORE
            <b-icon-arrow-right></b-icon-arrow-right>
          </NuxtLink>
        </b-card>
      </div>
      <div class="overflow-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>

      <!-- <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more"></div>
        <div slot="no-results">No articles found</div>
      </infinite-loading> -->
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
// import VueInstagram from 'vue-instagram'
import {
  Facebook,
  Twitter,
} from "vue-socialmedia-share";

export default {
  head: {
    title: "Deep State Defender Articles",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Get your head out of the sand!"
      }
    ]
  },
  components: {
    Facebook,
    Twitter,
  },
  created() {
    var self = this;
    self.$nextTick(function() {
      self.loaded = true;
    });
  },
  layout: "pages",
  data() {
    // asyncData(context) {
    return {
      postsUrl: "https://wp.dsdefender.com/wp-json/wp/v2/posts",
      queryOptions: {
        per_page: 6,
        page: 0,
        _embed: true
      },
      // Returned Posts in an Array
      posts: [],
      loaded: false,
      currentPage: 0,
      rows: 15,
      perPage: 6
    };
  },
  methods: {
    // Get Recent Posts From WordPress Site

    infiniteHandler($state) {
      this.queryOptions.page++;
      this.getRecentMessages()
        .then(response => {
          this.posts = this.posts.concat(response.data);
          if (response.data.length) {
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(() => {
          $state.complete();
        });
    },
    getRecentMessages() {
      return axios
        .get(this.postsUrl, { params: this.queryOptions })
        .then(response => {
          return response;
        })
        .catch(error => {
          console.log(error);
        });
    },

    getPostDate(date) {
      return moment(date).format("lll");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.articles-container {
  padding-top: 70px;
  padding-bottom: 80px;
  @media (max-width: 991px) {
    padding-top: 30px;
    padding-bottom: 40px;
  }
}
.card {
  background: transparent;
  border: none;
  .card-title {
    color: #fff;
    h2 {
      font-size: 45px;
    }
    @media (max-width: 991px) {
      h2 {
        font-size: 24px;
      }
    }
    a:hover {
      color: #73fd05;
    }
    .caption {
      color: #9ea1a6;
      font-size: 14px;
    }
  }
  .card-img-top {
    width: 100%;
    border-radius: 8px;
    height: 289px;
    object-fit: cover;
  }
  .card-text {
    color: #9ea1a6;
  }
  .card-link {
    .icon {
      vertical-align: middle;
    }
  }
}
</style>
