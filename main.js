import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
// main.js
import Json from './Json' //测试用数据
import uView from 'uview-ui';
import store from '@/store';
Vue.use(uView);
Vue.use(store);
Vue.prototype.routeTo = function(link) {
	if (!link) {
		return false;
	}
	if(this.$u.test.url(link)){
		uni.navigateTo({
			url: '/pages/index/web?link='+encodeURIComponent(link)
		});
	}
	let tabBarLinks = []
	for (var i = 0, len = this.vuex_tabbar.user.length; i < len; i++) {
		tabBarLinks.push(this.vuex_tabbar.user[i]['pagePath'])
	}
	for (var i = 0, len = this.vuex_tabbar.member.length; i < len; i++) {
		tabBarLinks.push(this.vuex_tabbar.member[i]['pagePath'])
	}
	let check_str = link.substr(0, 1) != '/' ? link : link.substr(1);
	check_str = link;//
	if (tabBarLinks.indexOf((check_str.split('?')[0])) > -1) {
		uni.switchTab({
			url: link
		});
	} else {
		uni.navigateTo({
			url: link
		});
	}
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}
Vue.prototype.$api = {json};

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);
const app = new Vue({
	store,
    ...App
})

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif