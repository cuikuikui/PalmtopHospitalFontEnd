<template>
	<view>
		<!-- <view class="choseCity" :hidden="showLocation"> -->
		<view class="choseCity" :class="!showLocation?'show':''">
			<view class="itemCity">
			<view class="currentCity">
				<text>当前城市:{{clickCity}}</text>
				<span class="iconfont icon-close" @click="closeLocation"></span>
			</view>
			<scroll-view class="classify-container" scroll-y="true">
				<view class="classify" v-for="(classify,index) in province" :key="index"
				 @click="tapClassify(classify.id,classify.classifyName)">
					<view class="name" :class="classifyViewed==classify.id ? 'actStyle':'' ">{{classify.classifyName}}</view>
				</view>
			</scroll-view>
			<scroll-view class="goods-container" scroll-y="true" :scroll-into-view="classifyViewed">
				<view v-for="(classify,index) in province"  :key="index" :id="classify.id">
					<view class="title">{{classify.classifyName}}</view>
					<view class="goods" v-for="(item,index) in (classify.city)" :key="index" @click="getLocation(city[item].name)">
						<view class="goodsIcon" hidden="showIcon">
							<span class="iconfont icon-xuanze"></span>
						</view>
						<view class="name">{{city[item].name}}</view>
					</view>
				</view>
			</scroll-view>
			</view>
		</view>
		
		<view class="header">	
			<view class="location" @click="getShowLocation">
				<span class="iconfont icon-location"></span>
				<!-- <image src="../../static/images/location.png"></image> -->
				<text>{{clickCity}}</text>
			</view>
			
			<view class="search" @click="searchHospital">
				<span style="padding-top:4px" class="iconfont icon-search"></span>
				<!-- <image src="../../static/images/search.png" /> -->
				搜索医院
			</view>
		</view>
		 <!-- <view scroll-y="true" :class="!showLocation?'container1':''"></view> -->
		 <view class="container">	
			<view class="hospital" v-for="(item,index) in hospitals" :key="index" @click="getHospital(item.hid)">
				<view class="lt">
					<image :src="item.himg" style="width:150rpx;height:150rpx;"></image>
				</view>
				<view class="rt">
					<view class="top" style="font-size: 30rpx;color:#757272">
						<text :decode="true">{{item.hname}}&nbsp;&nbsp;&nbsp;{{item.hgrade}}医院</text>
					</view>
					<view class="center">
						<view class="left1">
							<span class="iconfont icon-star-thr"></span>
							<text>{{item.hrate}}</text>
						</view>
						<view class="center1">
							<span class="iconfont icon-dengji"></span>
							<text>{{item.htype}}</text>
						</view>
						<view class="bottom1">
							<span class="iconfont icon-arrow-right"></span>
							<text>{{item.hdistance}}km</text>
						</view>
					</view>
					<view class="bottom">
						<span class="iconfont icon-location"></span>
						<text :decode="true">&nbsp;{{item.haddress}}</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	var data = require('@/pages/common/data.js')
	var submitData = require('@/pages/common/submitData.js')
	// import data from '../'
	import {GetHospitalByCity,HospitalServlet} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				province: data.province,
				city: data.city,
				showLocation: true,
				clickCity: '昆山',
				actStyle: false,
				hospitals:[],
				classifyViewed:''
			}
		},
		onLoad() {
			this.GetHospitalByCity()
			// getApp().globalData.hospitals=this.data.hospitals
		},
		methods: {
			// 显示或者隐藏地区选择的功能
			getShowLocation: function() {
				this.showLocation = !this.showLocation
			},
			searchHospital: function() {
				uni.navigateTo({
					url: '/pagesA/searchHospital/searchHospital'
				})
			},
			getHospital: function(hid) {
				// console.log(hid)
				uni.navigateTo({
					url: '/pagesA/menu/menu?id='+hid
				})
			},
			// 点击左侧省显示市
			tapClassify: function(id,name) {
				this.hospitals =[]
				// console.log(id)
				console.log(name)
				this.classifyViewed=id
				this.clickCity=name
				
			},
			// 点击选中的时间，并将时间选择页面隐藏
			getLocation: function(name) {
				// console.log(name)
				var localLocation =name //获取城市
				this.clickCity=localLocation
				this.showLocation=!this.showLocation,
				this.GetHospitalByCity()
			},
			closeLocation: function() {
				this.showLocation=true
			},
			GetHospitalByCity: function() {
				this.hospitals =[]
				console.log(this.clickCity)
				var data =submitData.hospital
				data.FLAG ='R',
				data.hCity = this.clickCity
				// console.log("======上送数据=========",data)
				api.post(HospitalServlet, data).then(res => {
					//成功时回调函数
					// console.log("======根据城市获取医院信息=========",res);
					 if (res[res.length-1].SYS_HEAD.ReturnCode == "000000") {
						for(let i =0;i<res.length-1;i++){
							// console.log("======dddd=========",res[i])
						  this.hospitals.push(res[i])
						}
					  } else {
						  uni.showToast({
						  	title: res[res.length-1].SYS_HEAD.ReturnMessage,
						  	icon: 'none',
						  	duration:2000
						  });
						// // this.$message({
						// //   type: "error",
						// //   message: "请求失败，错误码:" + response[response.length-1].SYS_HEAD.ReturnCode + "，错误信息：" + response[response.length-1].SYS_HEAD
						// // 	.ReturnMessage
						// // });
					  }
					// console.log(this.hospitals)
					getApp().globalData.hospitals =this.hospitals
					//授权成功后，跳转进入小程序首页
				}).catch(err => {
					//失败时回调函数
				})
			},
		}
	}
</script>

<style>
	/*头部页面样式*/
	.header {
		display: flex;
		align-items: center;
		height: 90rpx;
		width: 750rpx;
		box-sizing: border-box;
		padding: 40rpx 0;
		margin-left: 20rpx;
/* 		position: relative;
		top: 0; */
		border-bottom: 1rpx solid rgb(192, 192, 180)
			/*background-color: brown*/
	}

	.location {
		width: 170rpx;
		height: 60rpx;
		text-align: center;
		/*background-color: red;*/
		display: flex;
		/*margin-left: 10rpx;*/
		justify-content: flex-start;
		align-items: center;
		/*heigh*/
	}
	.location image {
		width: 40rpx;
		height: 40rpx;
	}

	.location text {
		font-size: 30rpx;
		color: #00FFFF;
		font-weight: bold;
	}

	.search {
		display: flex;
		align-items: center;
		width: 500rpx;
		/* margin-left: 20rpx; */
		height: 50rpx;
		/* padding: 0rpx 10rpx; */
		font-size: 25rpx;
		background: #E8E8EC;
		border-radius: 10rpx;
		line-height: 40rpx;
		color: #AAA9A9;
		border: 1rpx solid rgb(192, 192, 180);
	}

	.search image {
		height: 21rpx;
		width: 21rpx;
		padding: 0rpx 10rpx;
	}
	.itemCity{
		width: 550rpx;
		height: 750rpx;
		position: absolute;
		top: 200rpx;
		margin: 0rpx 100rpx;
		border-radius: 10rpx;
		transition: all 2s ease-in-out;
		border: 1rpx solid #686363;
		transition: all 2s ease-in-out;
		background-color: white;
	}
	/* 选择时间样式 */
	.choseCity {	
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-webkit-transform: scale(1.185);
		transform: scale(1.185);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-perspective: 2000rpx;
		perspective: 2000rpx;
		background: rgba(0, 0, 0, 0.6);
		-webkit-transition: all 0.3s ease-in-out 0s;
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;

	}
	.show{
		opacity: 1;
		-webkit-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-webkit-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
	.currentCity {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 495rpx;
		height: 50rpx;
		padding: 30rpx;
		/*background-color: blue*/
	}

	.currentCity text {
		font-size: 30rpx;
		color: #B9B0B0
	}

	.currentCity image {
		width: 40rpx;
		height: 40rpx;
	}

	.content-container {
		display: flex;
		width: 100%;
		height: 480rpx;
		position: absolute;
		margin: 0rpx 130rpx;
		/* padding: 30rpx; */
		line-height: 50rpx;
		/* background-color: rgb(252, 248, 252); */
		box-sizing: border-box;
		/*background-color: brown; */
		/* padding-bottom: 100rpx; */
	}

	.cancel {
		width: 100%;
		height: 90rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		/* text-align: center; */
		font-weight: bold;
		position: relative;
		bottom: -1160rpx;
		line-height: 20rpx;
		background-color: #faf8f8;
		/* color: #aaa; */
	}

	/* 左侧选择菜单按钮页面样式 */
	.classify-container {
		width: 150rpx;
		background: #faf8f8;
		height: 500rpx;
		position: absolute;
		left: -120rpx;
		margin: 0rpx 130rpx;
		/*bottom:-600rpx;*/
		/*background-color: brown; */
	}

	.classify-container .classify {
		padding: 20rpx 10rpx;
		text-align: center;
		border-bottom: 1rpx ridge;
	}

	/* style：none ，hidden，dotted，dashed，solid，double，groove，ridge，inset，outset */
	.classify-container .classify .name {
		display: inline-block;
		font-size: 30rpx;
		color: #646464;
		line-height: 1.2;
		text-align: left;
		pointer-events: none;
	}

	.classify-container .classify .actStyle {
		color: #06EBF9;
	}

	/* 右侧详细商品页面样式 */
	.goods-container {
		flex: 1;
		background: #fff;
		width: 300rpx;
		height: 500rpx;
		position: absolute;
		top: 100rpx;
		left: 200rpx;
	}

	.goods-container .title {
		padding: 20rpx 25rpx;
		color: #646464;
		font-size: 30rpx;
		line-height: 60rpx;
		background: #f7f7f7;
	}

	.goods-container .goods {
		/* height:100rpx; */
		position: relative;
		/* padding: 5rpx 15rpx; */
		font-size: 36rpx;
		/* text-align: center; */
		/* line-height: 40rpx; */
		border-bottom: 1px solid #f7f7f7;
	}

	.goods-container .goodsIcon {
		width: 40rpx;
		height: 40rpx;
		position: relative;
		left: 450rpx;
		top: 40rpx;
		/* padding: 20rpx 30rpx; */
		/* position: relative;
    padding: 20rpx 30rpx;
    font-size: 36rpx;
    line-height: 40rpx;
    border-bottom: 1px solid #f7f7f7; */
	}

	.goods-container .goods .name {
		color: #000;
		font-size: 36rpx;
		padding-bottom: 35rpx;
		padding-left: 30rpx;
		line-height: 46rpx;
	}

	/*医院信息页面*/
	.container {
		width: 100%;
		height: 1000rpx;
		padding: 20rpx 40rpx;
		background-color: white;
		overflow: hidden;
	}

	.container1 {
		width: 100%;
		height: 1000rpx;
		/* margin-top: 190rpx; */
		background-color: rgba(0, 0, 0, 0.7);
	}

	.isLocationShow {
		display: block;
	}

	.isLocationHide {
		display: none;
	}

	.actContainer {
		background-color: #949292
	}

	.hospital {
		width: 100%;
		height: 220rpx;
		display: flex;
		align-items: center;
		padding-bottom: 20rpx;
		border-bottom: 2rpx solid #E3E0E0;
		/* background-color:yellow; */

	}

	.lt {
		width: 20%;
	}

	.rt {
		width: 80%;
		line-height: 80rpx;
		margin-left: 20rpx;
	}

	.rt.top {
		width: 100%;
		height: 60rpx;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		/*background-color: #2E0DF8*/
	}

	.rt.top text {
		font-size: 30rpx;
		color: #9A9696
	}

	.rt.top .flag {
		width: 60rpx;
		height: 40rpx;
		display: flex;
		margin-left: 15rpx;
		align-items: center;
		justify-content: center;
		background-color: #FF8D07;
		color: white;
		font-size: 25rpx;
	}

	.center {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 10rpx;
		margin-left: -100rpx;
		/*background-color: #0DF829*/
	}

	.center .left1 {
		margin-left: 90rpx;
	}

	.center .center1 {
		margin-left: 80rpx;
	}

	.center .bottom1 {
		margin-left: 80rpx;
	}

	.center image {
		width: 30rpx;
		height: 30rpx;
		/*	margin-left: 30rpx;*/
		/*margin-right: -50rpx;*/
	}

	.center text {
		font-size: 30rpx;
		color: #9A9696
	}

	.bottom {
		width: 100%;
		height: 60rpx;
		margin-bottom: 10rpx;
		/*background-color: #F8EA0D*/
	}

	.bottom image {
		width: 30rpx;
		height: 30rpx;
		/*margin-left: -70rpx;*/
		/*margin-left: -20rpx;*/
	}

	.bottom text {
		font-size: 30rpx;
		color: #9A9696
	}
</style>
