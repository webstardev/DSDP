import Vue from 'vue'
import VueGoodshareFacebook from "vue-goodshare/src/providers/Facebook.vue";
import VueGoodshareTwitter from "vue-goodshare/src/providers/Twitter.vue";

Vue.component('VueGoodshareFacebook', VueGoodshareFacebook);
Vue.component('VueGoodshareTwitter', VueGoodshareTwitter);

Vue.use(VueGoodshareFacebook);
Vue.use(VueGoodshareTwitter);