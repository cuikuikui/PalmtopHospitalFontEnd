<template>
	<view>
		<view class="item" v-for="(item,index) in guides" :key="index" @click="toDetail(item.guideTitle,item.guideTime,item.guideContent,item.type)">
			<view class="left">
				<text>{{item.guideTitle}}</text>
				<text>{{item.guideTime}}</text>
			</view>
			<view class="right" v-if="item.type=='1'">
				<image :src="item.guideContent" mode=""></image>
			</view>
			<view v-else>
				<!-- <text>{{item.guideContent}}</text> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		GuideServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				hId:'',
				guides:[]
			}
		},
		onLoad(options) {
			this.hId = options.hId
			this.getGuides()
		},
		methods:{
			getGuides(){
				var data = {
					FLAG: 'R',
					hId:this.hId
				}
				api.post(GuideServlet, data).then(res => {
					//成功时回调函数 
					// console.log("===res1====",res)
					let curGuide = res
					// console.log("===curGuide====",curGuide)
					for(let i =0;i<curGuide.length;i++){
						// console.log("cccccccccc",curGuide[i].guideContent.lastIndexOf(".")+1)
						let str = curGuide[i].guideContent.substr(curGuide[i].guideContent.lastIndexOf(".") + 1,3)
						console.log("cvcvcvcvcvcv",str)
						// curGuide[i].guideContent.split(':')[0]
						if(str=='pdf'){
							curGuide[i].type = '0'
						}else if(str=='jpg'){
							curGuide[i].type = '1'
						}else {
							
						}
					}
					this.guides = curGuide
					console.log("====this.guides====",this.guides)
				}).catch(err => {
					console.log("ffffff",err)
				})
			},
			toDetail(guideTitle,guideTime,guideContent,type){
				uni.navigateTo({
					url:'./detail?guideTitle='+guideTitle+'&guideTime='+guideTime+'&guideContent='+guideContent+'&type='+type
				})
			}
		}
	}
</script>

<style scoped>
	.item {
		display: flex;
		padding: 10px;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #dbdbdb;
	}

	.item .left {
		display: flex;
		flex-direction: column;
		line-height: 40px;
	}

	.item .right image {
		width: 80px;
		height: 80px;
		border-radius: 10px;
	}
</style>
