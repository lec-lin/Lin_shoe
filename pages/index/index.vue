<template>
	<view class="content">
		<view class="content-left-title">
			江月超市 <u-icon class="Wticon" name="xiangxia1" custom-prefix="custom-icon" size="20" color="#fff"></u-icon>
		</view>
	<view class="wrap">
			<u-swiper height="350" :list="list"></u-swiper>
		</view>
		
		<view class="content">
			<view class="cart">
				<view class="top">
					<view class="top-left">
						功能中心
					</view>
					<view class="top-right">
						查看全部
					</view>
				</view>
				<view class="cart1">
					<view class="left" @click="routeTo('/pages/index/map')">
						核酸地点查看
					</view>
					<view class="right" @click="routeTo('/pages/index/recovery')">
						口罩回收
					</view>
				</view>
			
			</view>
		</view>
		
		<view class="header-images">
			<image src="../../static/header.png" mode="widthFix"></image>
		</view>
		<view class="cart-list" v-for="item in indexlist" @click="indeTo(item.id)" :key="item.id">
			<view class="left">
				<image :src="item.img" mode=""></image>
			</view>
			<view class="right">
				{{item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	import json from "../../common/jsons.js"
	export default {
		data() {
			return {
				indexlist:[],
						list: [{
										image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
										title: '昨夜星辰昨夜风，画楼西畔桂堂东'
									},
									{
										image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
										title: '身无彩凤双飞翼，心有灵犀一点通'
									},
									{
										image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
										title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
									}
								],
			}
		},
		onLoad() {

		},
		methods: {
			indeTo(id){
				uni.navigateTo({
					url: '/pages/index/llistdetails?id='+id,
				});
			},
			
		routeTo(link){
			uni.navigateTo({
				url: link
			});
		}
		},
		onShow() {
		this.indexlist=	json.indexlist
		}
	}
</script>

<style lang="scss" scoped>
	.cart-list{
		display: flex;
		width: 90%;
		background-color: #fff;
		border-radius: 15rpx;
		margin: 25rpx auto;
		padding: 25rpx;
		.left{
			image{
				width: 150rpx;
				height: 150rpx;
			}
			
		}
		.right{
			margin-left: 40rpx;
			font-size: 30rpx;
		}
	}
	.header-images{
		width: 90%;
		max-height:100%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		image{
			width: 100%;
		}
	}
	.content-left-title{
		display: flex;
		align-items: center;
		padding-left: 15rpx;
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
	}
	page{
	background-color: #f69e9c;	
	}
	
	.content{
		width: 100%;
		padding: 20rpx;
		.cart{
			background-color: #FFFFFF;
			border-radius: 10rpx;
				box-shadow: 0px 1px 4px rgba(0,0,0,0.3),
							0px 0px 20px rgba(0,0,0,0.1);
			padding: 25rpx;
			.top{
				display: flex;
				justify-content: space-between;
			}
			.cart1{
				margin: 15rpx 0;
				display: flex;
				justify-content: space-between;
				.left{
					width: 250rpx;
					height: 250rpx;
					border-radius: 15rpx;
					font-weight: bold;
					background:linear-gradient(to left, #82f2b8, #b8f5f6);
					text-align: center;
					line-height: 250rpx;
				}
				.right{
					width: 250rpx;
					height: 250rpx;
					border-radius: 15rpx;
					font-weight: bold;
					background:linear-gradient(to left, #82f2b8, #b8f5f6);
					text-align: center;
					line-height: 250rpx;
				}
			}
		}
	}

	.wrap {
		padding: 40rpx 20rpx;
	}
</style>
