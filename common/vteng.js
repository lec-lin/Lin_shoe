// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html

const install = (Vue, vm) => {
	Vue.prototype.$vteng = {
		getPayType: function(platform) {
			// #ifdef H5
			if (platform == 1 && vm.$jwx.isWechat()) {
				return 20;
			}
			// #endif
			// #ifdef MP-WEIXIN
			if (platform == 1) {
				return 22;
			}
			// #endif
			// #ifdef APP-PLUS
			if (platform == 1) {
				return 23;
			}
			// #endif

			return false;
		},
		setShareInfo: function(data) {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];

			let shareData = {
				title: page.$holder?page.$holder.navigationBarTitleText:'',
				desc: '',
				path: page.$page.fullPath,
				imageUrl: ''
			};

			if (data && data.path) {
				shareData.path = data.path;
			}
			if (data && data.title) {
				shareData.title = data.title;
				uni.setNavigationBarTitle({
					title: data.title
				});
			}
			if (data && data.desc) {
				shareData.desc = data.desc;
			}
			if (data && data.imageUrl) {
				shareData.imageUrl = data.imageUrl;
			}

			if (vm.vuex_login_type == 'user' && vm.vuex_user_token) {
				if (shareData.path.indexOf("?") >= 0) {
					shareData.path += "&referee_id=" + vm.vuex_user.id;
				} else {
					shareData.path += "?referee_id=" + vm.vuex_user.id;
				}
			}

			// #ifdef MP-WEIXIN
			return shareData
			// #endif

			// #ifdef H5
			return shareData
			// #endif
		},
		gotoPay: function(data, pay_type, paySuccess) {
			console.log(data);
			if (pay_type == 20) {
				console.log('公众号支付');
				vm.$jwx.wxpay({
					data: data,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						paySuccess && paySuccess()
					},
					fail: function(err) {
						vm.$u.toast('取消支付');
						console.log('fail:' + JSON.stringify(err));
					}
				})
			} else if (pay_type == 22) {
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data['timestamp'],
					nonceStr: data['nonceStr'],
					package: data['package'],
					signType: data['signType'],
					paySign: data['paySign'],
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						paySuccess && paySuccess()
					},
					fail: function(err) {
						vm.$u.toast('取消支付');
						console.log('fail:' + JSON.stringify(err));
					}
				});
			} else if (pay_type == 23) {
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: data,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						paySuccess && paySuccess()
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			}
		}
	}






}

export default {
	install
}
