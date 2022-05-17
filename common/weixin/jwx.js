var jweixin = require('./jweixin-module');

export default {
	//判断是否在微信中    
	isWechat: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			return true;
		} else { 
			return false;
		}
	},
	// 初始化
	initJssdk: function(callback) {
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		// 记录进入app时的url
		if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
			window.entryUrl = location.href.split('#')[0]
		}
		let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		// 进行签名的时候  Android 不用使用之前的链接， ios 需要
		let signLink = isiOS ? window.entryUrl : location.href.split('#')[0];
		// console.warn('-----------当前签名url--------------')
		 console.warn(signLink)
		// var uri = encodeURIComponent(location.href.split('#')[0]); //获取当前url然后传递给后台获取授权和签名信息
		var uri = (signLink); //获取当前url然后传递给后台获取授权和签名信息
		//服务端进行签名
		getApp().$u.api.getWeixinSignPackage({url:uri,_no_need_openid:1}).then(res => {
			//注入config权限配置
			jweixin.config({
				debug: res.data.debug,
				appId: res.data.appId,
				timestamp: res.data.timestamp,
				nonceStr: res.data.nonceStr,
				signature: res.data.signature,
				jsApiList: res.data.jsApiList
			});
			jweixin.ready(function() {
				console.log('config注入成功')
				// window.alert('签名的URL：'+ signLink)
				if (callback) {
					callback();
				}
			})
		})
	},
	//在需要定位页面调用  
	getlocation: function(callback) {
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
					success: function(res) {
						// console.log(res);  
						callback(res)
					},
					fail: function(res) {
						console.log(res)
					},
					// complete:function(res){  
					//     console.log(res)  
					// }  
				});
			});
		});
	},
	openlocation: function(data, callback) { //打开位置  
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.openLocation({ //根据传入的坐标打开地图  
					latitude: data.latitude,
					longitude: data.longitude
				});
			});
		});
	},
	chooseImage: function(callback) { //选择图片  
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		//console.log(data);  
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(res) {
						callback(res)
					}
				})
			});
		});
	},
	//微信支付  
	wxpay: function(params = {}) {
		if (!this.isWechat()) {
			//console.log('不是微信客户端')  
			return;
		}
		this.initJssdk(function() {
			// console.log(params)
			jweixin.chooseWXPay({
				timestamp: params.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
				nonceStr: params.data.nonceStr, // 支付签名随机串，不长于 32 位  
				package: params.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）  
				signType: params.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
				paySign: params.data.paySign, // 支付签名  
				success: function(res) {
					// console.log(res);  
					// console.log('微信JSAPI返回支付成功')
					params.success(res)
				},
				cancel: function(res) {
					params.fail(res)
					// console.log('微信JSAPI返回支付失败')
				},
				// complete:function(res){  
				//     console.log(res)  
				// }  
			});

		});
	},
	//在需要自定义分享的页面中调用
	share: function(data) {
		//#ifndef H5
			return ;
		//#endif
		var _app = getApp();
		
		if(!_app.vuex_openid) {
			return;
		}
		
		var that = this;
		//每次都需要重新初始化配置，才可以进行分享  
		this.initJssdk(function() {
			
			var shareData1 = {
				title: data && data.title ? data.title : (window.document.title?window.document.title:_app.vuex_project.seo_title),
				desc: data && data.desc ? data.desc : _app.vuex_project.seo_keywords,
				link: that.getShareLink(data&&data.link?data.link:'',1),
				imgUrl: data && data.imgUrl ? data.imgUrl : (_app.vuex_project.share_pic_link?_app.vuex_project.share_pic_link:_app.vuex_project.pc_logo_link),
				success: function(res) {			
					if(data.appMessageSuccess){
						(data.appMessageSuccess)(res);
					}
				}
			};
	
			var shareData2 = {
				title: shareData1.title,
				desc:shareData1.desc,
				link: that.getShareLink(data&&data.link?data.link:'',2),
				imgUrl: shareData1.imgUrl,
				success: function(res) {	
					if(data.timelineSuccess){
						(data.timelineSuccess)(res);
					}
				}
			};		
					
			//分享给朋友接口  
			jweixin.onMenuShareAppMessage(shareData1);
			//分享到朋友圈接口  
			jweixin.onMenuShareTimeline(shareData2);
		});
	},
	// 选择通讯地址
	chooseAddress: function(callback) {
		this.initJssdk(function() {
			jweixin.openAddress({
				success: function(res) {
					callback(res)
				}
			})
		})
	},
	updateShare(data){
		//#ifndef H5
			return ;
		//#endif
		var _app = getApp();
		
		if(!_app.vuex_openid) {
			return;
		}
		
		var that = this;
		
		var shareData1 = {
			title: data && data.title ? data.title : (window.document.title?window.document.title:_app.vuex_project.seo_title),
			desc: data && data.desc ? data.desc : _app.vuex_project.seo_keywords,
			link: that.getShareLink(data&&data.link?data.link:'',1),
			imgUrl: data && data.imgUrl ? data.imgUrl : _app.vuex_project.pc_logo_link,
			success: function(res) {			
				if(data.appMessageSuccess){
					(data.appMessageSuccess)(res);
				}
			}
		};
			
		var shareData2 = {
			title: shareData1.title,
			desc:shareData1.desc,
			link: that.getShareLink(data&&data.link?data.link:'',2),
			imgUrl: shareData1.imgUrl,
			success: function(res) {	
				if(data.timelineSuccess){
					(data.timelineSuccess)(res);
				}
			}
		};		
				
		//分享给朋友接口  
		jweixin.updateAppMessageShareData(shareData1);
		//分享到朋友圈接口  
		jweixin.updateTimelineShareData(shareData2);	
		
	},
	hideMenu: function(callback) {
		this.initJssdk(function() {
			jweixin.hideOptionMenu();
			jweixin.hideAllNonBaseMenuItem();
			/*
			jweixin.hideMenuItems({
				menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
			});*/
		})
	},
	getShareLink(link,share_type=1){
		if(!link || link == null || link == '' || typeof(link) == 'undefined'){
			link = window.location.href;
		}else{
			if (link.indexOf('http') == -1) {
				let href = (window.location.href).split('#')[0];
				link =  href + '#' + link;
			}
		}
		if (link.indexOf('?') == -1) {
			link = link + '?share_type=' + share_type ;
		}else{
			link = link + '&share_type=' + share_type ;
		}
		if (link.indexOf('referee_id') == -1 && getApp().vuex_uid) {
			link = link + '&referee_id=' + getApp().vuex_uid ;
		}
		return link;
	}
}
