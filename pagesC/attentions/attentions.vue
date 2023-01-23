<template>
	<view>
		<scroll-view scroll-y="true" class="container">
			<view class="hospital" v-for="(item,index) in collectList" :key="index" :data-hid="item.hid" @click="getHospital">
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
							<!-- <image src="../../static/images/star.png"></image> -->
							<text>{{item.hrate}}</text>
						</view>

						<view class="center1">
							<span class="iconfont icon-dengji"></span>
							<!-- <image src="../../static/images/type.png"></image> -->
							<text>{{item.htype}}</text>
						</view>
						<view class="bottom1">
							<span class="iconfont icon-arrow-right"></span>
							<text>{{item.hdistance}}km</text>
						</view>
					</view>
					<view class="bottom">
						<span class="iconfont icon-location"></span>
						<!-- <image src="../../static/images/location1.png"></image> -->
						<text :decode="true">&nbsp;{{item.haddress}}</text>
					</view>
				</view>
			</view>
		</scroll-view>


	</view>
</template>

<script>
	import {
		GetCollectHospitalByOpenid,
		CollectionServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				collectList: ''
			}
		},
		onShow: function() {
			this.collectedUpdate()
		},
		methods: {
			collectedUpdate: function() {
				var data = {
					FLAG:'R',
					collectionType:'Hospital',
					openId: uni.getStorageSync('openid')
				}
				api.post(CollectionServlet, data).then(res => {
					//成功时回调函数
					let arrCHospital =[]
					if(res.length==0){
						
					}else {
						if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
							for (let i = 0; i < res.length - 1; i++) {
								arrCHospital.push(res[i])
							}
						} else {
							uni.showToast({
								title: res[res.length - 1].SYS_HEAD.ReturnMessage,
								icon: 'none',
								duration: 2000
							});
						}
					}
					console.log("=======menuCollections========",arrCHospital);
					this.collectList = arrCHospital
					getApp().globalData.hospitals = arrCHospital
					// uni.setStorageSync("collectHospitals", arrCHospital)
				}).catch(err => {
					//失败时回调函数
				})
			},
			getHospital: function(e) {
				var hid = e.currentTarget.dataset.hid
				uni.navigateTo({
					url: '/pagesA/menu/menu?id=' + hid
				})
			},
		}
	}
</script>

<style>
	/*医院信息页面*/
	.container {
		width: 100%;
		height: 1800rpx;
		position: relative;
		padding: 20rpx 40rpx;
		/*top:90rpx;*/
		/*background-color: white;*/
	}

	.container1 {
		width: 100%;
		height: 1000rpx;
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
		/*background-color:yellow;*/

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
		/*margin-left: -20rpx;*/
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
