import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_referee_id','vuex_weixin_user', 'vuex_user', 'vuex_user_token', 'vuex_member_token', 'vuex_login_type','vuex_platform'];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_miniapp_user:  '',
		vuex_weixin_user: lifeData.vuex_weixin_user ? lifeData.vuex_weixin_user : {},
		vuex_openid: lifeData.vuex_openid ? lifeData.vuex_openid : '',
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {},
		vuex_user_token: lifeData.vuex_user_token ? lifeData.vuex_user_token : '',
		vuex_member_token: lifeData.vuex_member_token ? lifeData.vuex_member_token : '',
		vuex_login_type: lifeData.vuex_login_type ? lifeData.vuex_login_type : 'user', //user or member 
		// 如果vuex_version无需保存到本地永久存储，无需lifeData.vuex_version方式
		vuex_platform: [{name: '微信',key: 1}],
		vuex_referee_id:lifeData.vuex_referee_id ? lifeData.vuex_referee_id : 0,
		// 自定义tabbar数据
		vuex_tabbar: {
			user: [{
					iconPath: "/static/image/tabBar/home.png",
					selectedIconPath: "/static/image/tabBar/home-select.png",
					text: '首页',
					isDot: true,
					pagePath: "/pages/index/index"
				},
				{
					iconPath: "/static/image/tabBar/company.png",
					selectedIconPath: "/static/image/tabBar/company-select.png",
					text: '品牌',
					// midButton: true,
					pagePath: "/pages/user/company/index"
				},
				{
					iconPath: "/static/image/tabBar/Report.png",
					selectedIconPath: "/static/image/tabBar/Report-select.png",
					text: '报备',
					pagePath: "/pages/index/customer"
				},
				{
					iconPath: "/static/image/tabBar/shop.png",
					selectedIconPath: "/static/image/tabBar/shop-select.png",
					text: '商城',
					pagePath: "/pages/mall/index"
				},
				{
					iconPath: "/static/image/tabBar/user.png",
					selectedIconPath: "/static/image/tabBar/user-select.png",
					text: '我的',
					pagePath: "/pages/index/my"
				},
			],
			member: [{
					iconPath: "/static/image/tabBar/home.png",
					selectedIconPath: "/static/image/tabBar/home-select.png",
					text: '首页',
					isDot: true,
					pagePath: "/pages/index/index"
				},
				{
					iconPath: "/static/image/tabBar/company.png",
					selectedIconPath: "/static/image/tabBar/company-select.png",
					text: '客户',
					// midButton: true,
					pagePath: "/pages/index/customer"
				},
				{
					iconPath: "/static/image/tabBar/shop.png",
					selectedIconPath: "/static/image/tabBar/shop-select.png",
					text: '商城',
					pagePath: "/pages/mall/index"
				},
				{
					iconPath: "/static/image/tabBar/user.png",
					selectedIconPath: "/static/image/tabBar/user-select.png",
					text: '我的',
					pagePath: "/pages/index/my"
				},
			]
		}
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
