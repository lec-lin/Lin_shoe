<template>
	<view class="content">
		<view class="text-area">
			<view class="title">
				便携生活，一点就好
			</view>
			<view class="lable">
				您好，欢迎本产品，请登录
			</view>
		</view>
		<view class="login-warp">
			<u-field label-width="20" v-model="form.account" placeholder="请输入手机号">
				<view slot="icon">
					<u-icon class="Wticon" name="jibenxinxi" custom-prefix="custom-icon" size="40" color="#999"></u-icon>
				</view>
			</u-field>
			<u-field label-width="20" type="password" v-model="form.account_pwd" placeholder="输入密码">
				<view slot="icon">
					<u-icon class="Wticon" name="mima1" custom-prefix="custom-icon" size="40" color="#999"></u-icon>
				</view>
			</u-field>
			<view class="logo-confirm" @click="login">
				登录
			</view>
			<view class="tips">
				<view class="forgetPass"  @click="routeTo('/pages/index/resetPwd')">
					忘记密码？
				</view>
				<view class="register" @click="routeTo('/pages/index/register')">
					直接注册
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					account: '',
					account_pwd: '',
					login_from: 'lpzhaoshang_h5',
					code:'',
					platform:''
				}
			}
		},
		onLoad() {
		},
		methods: {
		login(){
			uni.showToast({
				icon:"success",
				title:"登录成功"
			})
			setTimeout(()=>{
				uni.switchTab({
					url: '/pages/index/index'
				});
			},1000)
			// uni.switchTab({
			// 	url: '/pages/index/index'
			// });
			// this.$u.api.login(this.form).then(res => {
			// if(res.status == 1){
			// 	this.$u.toast(res.message);
			// 	this.$u.vuex('vuex_user_token', '1111');
			// 	uni.showToast({
			// 		icon:"success",
			// 		title:"登录成功"
			// 	})
			// 	setTimeout(()=>{
			// 		uni.switchTab({
			// 			url: '/pages/index/index'
			// 		});
			// 	},1000)
			// }
			// })
		}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		margin: 40% 0;
	}
  .title{
	   font-size: 50rpx;
		text-align: center;
		margin: 20rpx auto;
		font-weight: bold;
  }
  .lable{
	  font-size: 22rpx;
	  		text-align: center;
	  		margin: 20rpx auto;
  }
  .Wticon {
  	margin-right: 10rpx;
  }
  .checkbox {
  	margin-top: 20rpx;
  
  	text {
  		color: #38b485;
  	}
  }
  .login-warp {
  	width: 90%;
  	margin: 0 auto;
  
  }
  
  .logo-confirm {
  	width: 100%;
  	height: 80rpx;
  	border-radius: 10rpx;
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	color: #fff;
  	margin-top: 30rpx;
	background-color: #3366FF;
  }
  
  .tips {
  	display: flex;
  	justify-content: center;
  	margin-top: 20rpx;
  
  	.forgetPass {
  		color: #ff0000;
  	}
  
  	.register {
  		margin-left: 20rpx;
  		color: #666;
  	}
  }
  
  .agreement {
  	display: flex;
  	align-items: center;
  	margin: 20rpx 0;
  	.agreement-text {
  		color: #3366FF;
  	}
  }	
</style>
