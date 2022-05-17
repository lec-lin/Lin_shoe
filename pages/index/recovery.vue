<template>
	<view class="">
		<view class="content">
			<view class="cart">
				<u-field
						v-model="form.clock"
						label="预约时间"
						@click="onckiust"
						placeholder="请填写预约上门时间"
						:disabled="true"
					>
					</u-field>
				<u-field
						v-model="form.number"
						label="口罩数量"
						placeholder="请填写口罩数量"
					>
					</u-field>
				<u-field
						v-model="form.name"
						label="联系人"
						placeholder="请填写联系人"
					>
					</u-field>
				<u-field
						v-model="form.mobile"
						label="电话"
						placeholder="请填写手机号"
					>
					</u-field>
					<u-field
							v-model="form.address"
							label="地址"
							placeholder="请填写地址"
						>
						</u-field>
						<view class="" @click="confirms" style="display: flex; justify-content: center;">
							<view class="buttons">
								确认
							</view>
						</view>
						
			</view>
			<u-picker v-model="form.show" @confirm="timeConfirm" mode="time"></u-picker>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					show: false,
					clock:"",
					number:"",
					mobile:"",
					name:"",
					address:""
				}
				
			}
		},
		methods:{
			onckiust(){
				this.form.show = true
				console.log('sdfs')
			},
			timeConfirm(e){
				this.form.clock = e.year+'-'+e.month+'-'+e.day;
				// console.log('sdfs')
				console.log(e)
			},
			confirms(){
				if(this.form.number<100){
					uni.showToast({
						icon:'error',
						title:"口罩未达到100个，不给回收"
					})
				}else{
					uni.showToast({
						icon:'success',
						title:"回收成功"
					})
					setTimeout(()=>{
						uni.switchTab({
							url:"/pages/index/index"
						})
					},600)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	.cart{
		height: 90vh;
		padding: 10rpx;
		border-radius: 15rpx;
		background-color: #fff;
	}
	.content{
		padding: 20rpx;
	}
	.buttons{
		width: 80%;
		height: 100rpx;
		display: flex;
		margin-top: 400rpx;
		align-items: center;
		color: #fff;
		border-radius: 25rpx;
		justify-content: center;
		background-color: #18B566;
	}
</style>
