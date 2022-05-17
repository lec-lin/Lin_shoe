// 微信公众号授权
export function wxAuthorize(path,query) {

	if(this.vuex_openid || isWechat() == false){
		return;
	}
	// 非静默授权，第一次有弹框
	let appid = 'wxe9ee7644bc9184e0' // 公众号appid
	let code = getUrlCode().code; // 截取微信重定向code
	
	let auth_forward = uni.getStorageSync('auth_forward');
	let auth_domain = query.auth_domain;	
		
	let _code = query.code; // 截取应用重新加载code
			
	if (code == null || code == '' || typeof(code) == 'undefined' ) {
		if (_code == null || _code == '' || typeof(_code) == 'undefined'  ) {
			uni.setStorageSync('auth_forward', path == 'pages/index/auth'?('/pages/index/index'):('/' + path + this.$u.queryParams(query)));
			
			//alert(path);
			//alert(uni.getStorageSync('auth_forward'));
			
			let redirect_uri = 'https://zhaoshangwang.jczhaoshang.com/zhaoshangwang/#/pages/index/auth?auth_domain=' + window.location.host;
			// 如果没有code，就去请求获取code
			console.log('当前没有code，进入授权页面')
			let uri = encodeURIComponent(redirect_uri)
			window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`);
		}else{
			console.log('存在code，使用code换取用户信息')
			uni.setStorageSync('auth_forward','');
			
			//alert(_code);
			//alert(code);
			
			this.$u.api.weixinLogin({code:_code,_no_need_openid:1}).then(res => {
				if (res.code == 1001) {
					this.$u.vuex('vuex_openid', res.data.openid);
					this.$u.vuex('vuex_weixin_user', res.data.weixin_user);
					if(res.data.uid){
						this.$u.vuex('vuex_uid', res.data.uid);
					}
					if(res.data.vip_time){
						this.$u.vuex('vuex_vip_time', res.data.vip_time);
					}				
					if(res.data.token){
						this.$u.vuex('vuex_token', res.data.token);
					}
					auth_forward = auth_forward?auth_forward:'/pages/index/index';
					//alert('获取用户信息成功');
					//alert(auth_forward);
					
					this.routeTo(auth_forward);
					console.log('获取用户信息成功');
				} else {
					// 失败的逻辑
					// window.alert('获取用户信息失败')
					console.log(res)
					console.log('获取用户信息失败')
				}
			})
		}
	}else {
		window.location.replace('https://'+auth_domain + '/zhaoshangwang/#/pages/index/auth?code='+code);
	}
}

function getUrlCode() {
	// 截取url中的code方法
	var url = location.search;
	// this.winUrl = url;
	var theRequest = new Object();
	if (url.indexOf('?') != -1) {
		var str = url.substr(1);
		var strs = str.split('&');
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
		}
	}
	return theRequest;
}
function isWechat(){
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/micromessenger/i) == 'micromessenger') {
		return true;
	} else { 
		return false;
	}
}