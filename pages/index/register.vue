<template>
	<view>
		<view class="login-warp">
			<u-field label-width="20" v-model="form.mobile" placeholder="请输入手机号">
				<view slot="icon">
					<u-icon class="u-m-r-10" name="jibenxinxi" custom-prefix="custom-icon" size="40" color="#999">
					</u-icon>
				</view>
			</u-field>
			<u-field label-width="20" type="password" v-model="form.account_pwd" placeholder="输入密码">
				<view slot="icon">
					<u-icon class="u-m-r-10" name="mima1" custom-prefix="custom-icon" size="40" color="#999"></u-icon>
				</view>
			</u-field>
			<u-field label-width="20" v-model="form.code" placeholder="请输入验证码">
				<view slot="icon">
					<u-icon class="u-m-r-10" name="xinxi" custom-prefix="custom-icon" size="40" color="#999"></u-icon>
				</view>
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeTips}}</u-button>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			<view class="agreement">
				<u-checkbox v-model="checked" >我已同意并阅读</u-checkbox>				
				<view class="agreement-text">《用户协议》</view>
				<view class="agreement-text" >《隐私协议》</view>
			</view>			
			<view class="logo-confirm" @click="submit">
				注册
			</view>
			<view class="logo-confirm1" @click="routeTo('/pages/user/login')">
				已有账号，去登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				checked: false,
				form: {
					register_from: 'lpzhaoshang_h5',
					mobile: '',
					account_pwd: '',
					code: '',
					auth_code:'',
					platform:''
				},
				codeTips: '',
			}
		},
		onLoad() {
		
		},
		onShow() {

		},
		methods: {
			codeChange(text) {
				this.codeTips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (!this.$u.test.mobile(this.form.mobile)) {
						this.$u.toast('手机格式错误');
						return;
					}
					this.$refs.uCode.start();
			
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			submit() {
				let that = this;
				if (!that.$u.test.mobile(that.form.mobile)) {
					that.$u.toast('手机格式错误');
					return;
				}
				if (!that.$u.test.code(that.form.code, 6)) {
					that.$u.toast('请输入六位数字的验证码');
					return;
				}
				if (that.checked == false) {
					that.$u.toast('请先同意用户注册协议');
					return;
				}
			this.$u.api.register(this.form).then(res => {
				if (res.status == 1) {
					this.$u.vuex('vuex_user_token', '1111');
					uni.showToast({
						icon:"success",
						title:"注册成功"
					})
					setTimeout(()=>{
						uni.switchTab({
							url: '/pages/index/index'
						});
					},1000)
				}else{
				uni.showToast({
					icon:"error",
					title:res.message
				})
			}
			})
			},
	

		}
	}
</script>

<style lang="scss" scoped>
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
		margin-top: 10rpx;
		background-color: #38b485;
	}

	.logo-confirm1 {
		width: 100%;
		height: 80rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #39b485;
		margin-top: 10rpx;
		background-color: #FFFFFF;
	}

	.agreement {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		.agreement-text {
			color: #38b485;
		}
	}
	
</style>
