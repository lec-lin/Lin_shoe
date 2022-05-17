<template>
	<view class="containers">
		<u-search bg-color="#fff" placeholder="搜索城市" v-model="keyword"></u-search>
		
		<view class="city-cart"  v-for="(item,index) in 3" :key="index">
			<view class="city-cart1">
				<view class="cart-left">
					<view class="title">
						禅城医院
					</view>
					<view class="phone">
						地址:佛山市禅城区
					</view>
					<view class="phone">
						电话:12345678991
					</view>
				</view>
				<view class="cart-right">
					<image src="../../static/123.png" mode="widthFix"></image>
				</view>
			</view>
	
			<view class="mpa">
				<image src="../../static/12.png" mode="widthFix"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				keyword: ''
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	.containers{
		margin-top: 15rpx;
		padding: 0 20rpx;
	}
	.city-cart1{
		margin-bottom: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.city-cart{
	
		margin: 25rpx 0;
		border-radius: 15rpx;
		line-height:60rpx;
		padding: 15rpx;
		background-color: #fff;
		.title{
			font-weight: bold;
		}
		.mpa{
			width: 100%;
			height: 250rpx;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.cart-right{
		width: 150rpx;
		height: 150rpx;
		margin-right: 40rpx;
		border-radius: 15rpx;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>
