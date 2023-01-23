<template>
	<view style="height:1200rpx">
		<!-- 搜索按钮 -->
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
					<input name="goodsName" type="text" class="weui-search-bar__input" :value="inputVal"
						placeholder="请输入医院" :focus="!showdetail" @blur="getInput_1" @input="getInput_2" />
					<view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
						<icon type="clear" size="14"></icon>
					</view>
				</view>
			</view>
			<view class="weui-search-bar__cancel-btn" @click="getShowdetail">搜索</view>
		</view>

		<!-- 热门搜索 -->
		<view class="body">
			<view class="hot">
				<text class="text">热门搜索</text>
			</view>

			<view class="categories">
				<text class="text" v-for="(item,index) in hot" :key="index" @click="getItemHot(index)">{{item}}</text>
			</view>
		</view>

		<!-- 历史搜索 -->
		<view class="footer">
			<view class="history">
				<text class="text">历史搜索</text>
				<span class="iconfont icon-delete"></span>
			</view>
			<view class="categories">
				<text class="text" v-for="(item,index) in sercherStorage" :key="index">{{item}}</text>
			</view>
		</view>

		<!-- 医院列表 -->
		<view class="detail" :hidden="showdetail">
			<scroll-view scroll-y="true" class="container">
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
							<!-- <image src="../../static/images/location1.png"></image> -->
							<text :decode="true">&nbsp;{{item.haddress}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var app = getApp()
	import {
		GetHospitalByName,
		HospitalServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	var submitData = require('@/pages/common/submitData.js')
	export default {
		data() {
			return {
				showdetail: true,
				itemdetail: true,
				flag: true,
				inputVal: "",
				hot: ['海隆', '昆山', '中医院', '人民', '一院', '二院', '三院'],
				sercherStorage: [],
				hospitals: [],
				disconnt: [],
				localFlag: false,
				fiexedStyle: false
			}
		},
		// onPullDownRefresh:function(){
		// 	// uni.stopPullDownRefresh()
		// 	console.log('111111')
		// },
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			that.getLishi();
		},
		methods: {
			//获取缓存名字list的缓存数据，然后获取成功赋值给data里面的sercherStorage用来渲染页面。
			getLishi: function() {
				var that = this;
				uni.getStorage({
					key: "list",
					success: function(res) {
						that.sercherStorage = res.data
					}
				})
			},
			addArray: function() {
				if (this.inputVal != "") {
					var array = this.sercherStorage;
					array.push(this.inputVal)
					uni.setStorageSync('list', array);
					this.getLishi();
				}
			},
			// 获取点击的值
			getItemHot: function(index) {
				this.inputVal = this.hot[index]
				this.addArray()
			},

			// 获取输入值,失去焦点触发e.detail.value
			getInput_1: function(e) {
				// console.log(e.detail.value)
				this.inputVal = e.detail.value
				this.addArray()
			},
			// 显示简洁商品界面
			getInput_2: function(e) {
				this.inputVal = e.detail.value
				this.showdetail = false
				if (this.inputVal != '') {
					this.hospitals = this.hospitals
				} else {
					this.hospitals = []
				}

			},
			// 显示详细商品界面
			getShowdetail: function() {
				this.hospitals = []
				var that = this;
				that.fiexedStyle = true
				var name = that.inputVal;
				var data = submitData.hospital
				data.FLAG = 'R',
				data.hName = name,
				data.hCity = ""
				console.log("=========",data)
				api.post(HospitalServlet, data).then(res => {
					//成功时回调函数				
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							this.hospitals.push(res[i])
						}
					} else {
						uni.showToast({
							title: res[res.length - 1].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err => {
					//失败时回调函数
					// 
				})		
				that.flag = false
				that.showdetail = false
			},

			// 清除输入框中输入的数据
			clearInput: function() {
				this.inputVal = ''
				this.showdetail = !this.showdetail
			},
			// 清除历史记录
			clearStore: function(index) {
				uni.removeStorageSync('list')
				this.sercherStorage = []
			},
			getHospital: function(id) {
				var hid = id
				wx.navigateTo({
					url: '/pagesA/menu/menu?id=' + hid
				})
			},
		}
	}
</script>

<style>
	.fixedStyle {
		position: fixed;
		top: 10rpx;
	}

	.searchbar-result {
		margin-top: 0;
		font-size: 14px;
	}

	.searchbar-result:before {
		display: none;
	}

	.weui-cell {
		padding: 12px 15px 12px 35px;
	}

	.body {
		width: 100%;
		height: 300rpx;
		/* background-color: aqua */
	}

	.body .hot {
		width: 100%;
		height: 70rpx;
		border-bottom: 1rpx solid rgba(190, 190, 207, 0.925);
		/* background-color: blueviolet */
	}

	.body .hot .text {
		font-size: 25rpx;
		margin-left: 20rpx;
	}

	.body .categories {
		background: #fff;
		margin: 13px 10px 24px 10px;
		max-height: 380px;
		overflow: hidden;
	}

	.body .categories .text {
		padding: 0 10px;
		height: 28px;
		line-height: 28px;
		color: #666;
		margin: 3px 5px;
		margin-left: 10rpx;
		font-size: 13px;
		display: inline-block;
		position: relative;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 1rpx solid rgb(190, 176, 176);
	}

	.footer {
		width: 100%;
		height: 300rpx;
		margin-top: 80rpx;
		/* background-color: aqua */
	}

	.footer .history {
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content:space-between;
		border-bottom: 1rpx solid rgba(190, 190, 207, 0.925);
		padding-right:10px;
	}

	.footer .history .text {
		font-size: 25rpx;
		margin-left: 20rpx;
	}

	.footer .categories {
		background: #fff;
		margin: 13px 10px 24px 10px;
		max-height: 380px;
		overflow: hidden;
	}

	.footer .categories .text {
		padding: 0 10px;
		height: 28px;
		line-height: 28px;
		color: #666;
		margin: 3px 5px;
		margin-left: 10rpx;
		font-size: 13px;
		display: inline-block;
		position: relative;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 1rpx solid rgb(190, 176, 176);
	}

	.detail {
		width: 100%;
		height: 100%;
		position: relative;
		left: 0rpx;
		top: -700rpx;
		background-color: white
	}

	.detail .restaurantsList {
		margin-bottom: 180rpx;
	}

	.detail .restaurants-list {
		font-size: 25rpx;
		display: flex;
		width: 100%;
		padding: 10rpx 0;
		border-bottom: 1rpx solid #ECECEC;
		color: #6D6D6D;
		justify-content: space-between;
	}

	.detail .restaurants-info-name {
		width: 500rpx;
		color: black;
		font-size: 30rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.detail .restaurants-image1 {
		width: 200rpx;
		height: 125rpx;
		margin: 20rpx;
	}

	.detail .restaurants-image2 {
		position: absolute;
		width: 60rpx;
		height: 30rpx;
		margin-left: -120rpx;
		/* right: 0; */
	}

	.detail .restaurants-info {
		width: 100%;
		margin: 15rpx;
		flex: 1;
	}

	.detail .restaurants-distribution {
		display: flex;
		width: 100rpx;
		margin-right: 20rpx;
	}

	.detail .restaurants-info-rating {
		display: flex;
		width: 100%;
		flex-wrap: nowrap;
		height: 50rpx;
		line-height: 50rpx;
	}

	.detail .restaurants-info-price {
		display: flex;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}

	.detail .restaurants-info-mark {
		width: 50px;
		height: 15px;
		margin-left: 50rpx;
		margin-top: 10rpx;
	}

	.detail .restaurants-info-minus {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}

	image.restaurants-info-minus {
		width: 16px;
		height: 16px;
		padding-right: 10px;
	}

	.detail .restaurants-info-discount {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}

	image.restaurants-info-discount {
		width: 20px;
		height: 20px;
		padding-right: 10px;
	}

	.detail .restaurants-info-rating-stars {
		color: rgb(182, 181, 179);
		width: 130rpx;
		height: 50rpx;
	}

	text.restaurants-info-rating-stars {
		color: #6A6A6A;
	}

	.detail .restaurants-info-rating-sales {
		width: 150rpx;
		height: 50rpx;
	}

	.detail .restaurants-distribution {
		flex-direction: column;
		text-align: right;
		justify-content: center;
	}

	/*医院信息页面*/
	.container {
		width: 100%;
		height: 1350rpx;
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

	/*.rt.top .flag{
  width:60rpx;
  height:40rpx;
  display: flex;
  margin-left: 15rpx;
  align-items: center;
  justify-content: center;
  background-color: #FF8D07;
  color:white;
  font-size: 25rpx;
}*/
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
