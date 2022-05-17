<template>
	<view class="wrap">
		<u-form ref="uForm">
			<u-form-item label="手机" label-width="150">
				<u-input v-model="data.mobile" />
			</u-form-item>
			<u-form-item label="验证码" label-width="150">
				<u-input placeholder="请输入验证码" v-model="data.code" type="text"></u-input>
				<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
			</u-form-item>
			<u-form-item label="新密码" label-width="150">
				<u-input v-model="data.account_pwd" type="password" />
			</u-form-item>
			<view class="text-tips">*如果手机号已接收不到信息，请拨打客服400-100-5891</view>
			<u-button shape="circle" class="u-m-20" type="success" @click="submit">提交</u-button>
		</u-form>
		<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					mobile: '',
					code: '',
					account_pwd: '',
				},
				codeTips: '',
				mobile: '',
			};
		},
		onLoad() {
	
		},
		methods: {
			submit() {
				if (!this.$u.test.mobile(this.data.mobile)) {
					this.$u.toast('手机格式错误');
					return;
				}
				if (!this.$u.test.code(this.data.code, 6)) {
					this.$u.toast('请输入六位数字的验证码');
					return;
				}
				if (this.$u.test.isEmpty(this.data.account_pwd) == true) {
					this.$u.toast('请输入新密码');
					return;
				}
			
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					if (!this.$u.test.mobile(this.data.mobile)) {
						this.$u.toast('手机格式错误');
						return;
					}
					this.$refs.uCode.start();
								
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.codeTips = text;
			},
		}
	};
</script>

<style scoped lang="scss">
	page{
		background-color: #FFFFFF;
	}
	.wrap {
		padding:0 30rpx;
	}
	.text-tips{
		padding-top: 20rpx;
		font-size: 22rpx;
	}
</style>
