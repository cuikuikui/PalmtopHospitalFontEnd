<template>
	<view class="hospital">
		<view class="header">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item>
					<image class="image" src="../../static/images/hospital/1.jpeg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image class="image" src="../../static/images/hospital/2.jpeg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image class="image" src="../../static/images/hospital/3.jpeg" mode=""></image>
				</swiper-item>
				<swiper-item>
					<image class="image" src="../../static/images/hospital/4.png" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="more">
			<text>医院新闻</text>
			<view class="label">
				<text>更多</text>
				<span class="iconfont icon-arrow-right2"></span>
			</view>
		</view>
		
		<swiper class="categoryList">
			<swiper-item>
				<block v-for="(item,index) in categoryLists" :key="index">
					<view class="category-info" @click="getItem(item.index)">
						<image :src="item.src" class="category-image"></image>
						<view class="category-text">{{item.name}}</view>
					</view>
				</block>
			</swiper-item>
		</swiper>
		
		<view class="more">
			<text>科室介绍</text>
			<view class="label">
				<text>更多</text>
				<span class="iconfont icon-arrow-right2"></span>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				hId:'',
				categoryLists: [{
						index: 1,
						name: "医院简介",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/医院简介.png"
					},
					{
						index: 2,
						name: "就医指南",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/就医指南.png"
					},
					{
						index: 3,
						name: "医学百科",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/医学百科.png"
					},
					{
						index: 4,
						name: "健康宣教",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/健康宣教.png"
					},
					{
						index: 5,
						name: "医院导航",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/医院导航.png"
					}
				]
				
			}
		},
		onLoad(options) {
			this.hId = options.hId
			console.log("===xxxxx====",this.hId)
		},
		methods:{
			getItem: function(index) {
				var index = index
				if (index == 1) {
					uni.navigateTo({
						url: '/pagesB/hospitalProfile/hospitalProfile'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pagesB/hospitalGuide/index?hId='+this.hId
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pagesB/medicalWiki/index'
					})
				} else if (index == 4) {
					// uni.navigateTo({
					// 	url: '/pagesA/doctorIntroduce/doctorIntroduce'
					// })
				} else if (index == 5) {
					// uni.showToast({
					// 	title: '待开发中.............',
					// 	icon: 'loading',
					// 	duration: 2000 //持续的时间
					// })
				} else {
					// uni.showToast({
					// 	title: '待开发中.............',
					// 	icon: 'loading',
					// 	duration: 2000 //持续的时间
					// })
				}
			
			}
		}
		
	}
</script>

<style scoped>
	.hospital {
		padding: 10px;
	}
	.swiper {
		height: 160px;
	}
	.image {
		width: 100%;
	}
	
	.more {
		display: flex;
		justify-content: space-between;
		padding: 7px;
		border-bottom: 1rpx solid gainsboro;
		font-size: 17px;
		font-weight: bolder;
	}
	.more .label {
		color: darkgrey;
		font-weight: normal;
		font-size: 15px;
		
	}
	/* 3、功能菜单轮播图 */
	.categoryList {
		height: 210rpx;
		/* border-bottom: 20rpx solid #f4f4f4; */
	}
	
	.category-info {
		display: inline-block;
		text-align: center;
		position: relative;
		margin-top: 20rpx;
		padding: 10px;
	}
	
	.category-image {
		width: 80rpx;
		height: 80rpx;
	}
	
	.category-text {
		font-size: 25rpx;
		width: 100%;
		line-height: 30rpx
	}
</style>