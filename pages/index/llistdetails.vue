<template>
	<view class="containers">
		<view class="titles">
			{{dalist[0].title}}
		</view>
		<view class="content">
			{{dalist[0].content}}
		</view>
	</view>
</template>

<script>
	import jsonsa from "../../common/jsons.js"
	export default{
		data(){
			return{
				dalist:[],
			}
		},
		onLoad(e) {
			
			
			
		this.dalist=jsonsa.indexlist.filter(item=>{
			if(item.id == e.id){
				return item
			}
				
			})
			console.log(this.dalist)
		}
	}
</script>

<style lang="scss" scoped>
	.containers{
		padding: 20rpx;
	}
	.titles{
		margin: 20rpx 0;
		font-size: 32rpx;
		text-align: center;
	}
	.content{
		
	}
</style>
