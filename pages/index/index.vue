<template>
	<view style="height:900rpx">
		<scroll-view scroll-y="true">
			<!--1、扫一扫组件 -->
			<scan class="scan"></scan>
			<!--2、医院轮播图 -->
			<swiper class='u-wrp-bnr' indicator-dots='true' autoplay='true' interval='5000' duration='1000'
				circular='true'>
				<block v-for="(item,index) in bnrUrl" :key="index">
					<swiper-item style="overflow: hidden;" @click="gotToHospital(item.id)">
						<text class="text1">{{item.name}}</text>
						<image :src="item.url" class='u-img-slide' mode='aspectFill'></image>
					</swiper-item>
				</block>
			</swiper>
			<!--3、功能菜单轮播图 -->
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
			<view class="collectDoc">收藏的医生</view>
			<view class="doctItems">
				<scroll-view scroll-x="true" style="width:700rpx;white-space: nowrap;display: flex;"
					:hidden="showDoctor">
					<view style="width:400rpx;">
						<view class="itemImage" style="display: inline-block;" v-for="(item,index) in doctors"
							:key="index">
							<image :src="item.dimg" style="width:100rpx;height:100rpx;"
								@click="getDoctorDetail(item.did,item.dname,item.dcount,item.dreceive,item.dfee,item.drole,item.dintroduce,item.hname,item.rname,item.dimg)">
							</image>
							<view style="font-size: 30rpx;">{{item.dname}}</view>
						</view>

						<view v-if="showDoctor==false" style="width:150rpx;margin-top: 50rpx;display: inline-block;"
							@click="goToDoctor">
							<image src="../../static/images/All.png"
								style="width:90rpx;height:90rpx;margin-left: 20rpx;"></image>
							<view style="font-size: 30rpx;">收藏医生</view>
						</view>
					</view>
				</scroll-view>
				<view v-if="showDoctor==true" @click="doctorIntroduce" style="position:relative;right:200rpx">
					<text>暂无收藏医生,可在 <text style="color:rgb(15, 196, 216)">医生介绍</text> 中收藏医生</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 导入的公共组件
	import Scan from "components/content/index/Scan";
	import {
		GetCollectDoctorByOpenid,
		CollectionServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	export default {
		data() {
			return {
				bnrUrl: [{
					"id": 1,
					"name": "昆山分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h1.jpeg"
				}, {
					"id": 2,
					"name": "苏州分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h2.jpeg"
				}, {
					"id": 3,
					"name": "上海分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h3.jpeg"
				}, {
					"id": 4,
					"name": "南京分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h4.jpeg"
				}, {
					"id": 4,
					"name": "长沙分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h5.jpeg"
				}, {
					"id": 4,
					"name": "黄石分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h6.jpeg"
				}, {
					"id": 4,
					"name": "武汉分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h7.jpeg"
				}, {
					"id": 4,
					"name": "衡阳分院",
					"url": "http://localhost:8080/PalmtopHospitalBackEnd/images/h8.jpeg"
				}],
				categoryLists: [{
						index: 1,
						name: "预约挂号",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/tj.png"
					},
					{
						index: 2,
						name: "预约体检",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/myd.png"
					},
					{
						index: 3,
						name: "医院介绍",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/yy.png"
					},
					{
						index: 4,
						name: "医生介绍",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png"
					},
					{
						index: 5,
						name: "科室介绍",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/jkjs.png"
					},
					{
						index: 6,
						name: "智能导诊",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/zhinengdianzi.png"
					},
					{
						index: 7,
						name: "健康百科",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/ksjs.png"
					},
					{
						index: 8,
						name: "满意度调查",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/yuyue.png"
					},
					{
						index: 9,
						name: "院内导航",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/sqdh.png"
					},
					{
						index: 10,
						name: "全部",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/All.png"
					}
				],
				showDoctor: true,
				doctors: '',
				scanCode: '',
				titleArr:[
					"公司门牌",
					"法人合照",
					"工作场景",
					"其他",
					"业务确认"
				],
				imgArr:[
					{name:"公司门牌",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"公司门牌",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"公司门牌",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"法人合照",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"法人合照",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"法人合照",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"工作场景",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"工作场景",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"工作场景",imgUrl:'http://localhost:8080/PalmtopHospitalBackEnd/images/ys.png',count:'1'},
					{name:"其他",imgUrl:'',count:'0'},
					{name:"其他",imgUrl:'',count:'0'},
					{name:"其他",imgUrl:'',count:'0'},
					{name:"业务确认",imgUrl:'',count:'0'},
					{name:"业务确认",imgUrl:'',count:'0'},
					{name:"业务确认",imgUrl:'',count:'0'},
				],
				countImg:[],
			}
		},
		components: {
			Scan
		},
		onLoad() {
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
			// #endif
		},
		onShow() {	
			this.LoginIndex = uni.getStorageSync('LoginIndex')
			if (uni.getStorageSync('LoginIndex') == '') {
				this.doctors = ""
			} else {
				this.collectedDoctors()
			}

		},
		methods: {
			getDoctorDetail: function(did, dname, dcount, dreceive, dfee, drole, dintroduce, hname, rname, dimg) {
				var doctorId = did
				var dname = dname
				var dcount = dcount
				var dreceive = dreceive
				var dfee = dfee
				var drole = drole
				var dintroduce = dintroduce
				var hname = hname
				var rname = rname
				var dimg = dimg
				uni.navigateTo({
					url: '../doctorDetail/doctorDetail?doctorId=' + doctorId + '&dname=' + dname + '&drole=' +
						drole + '&dcount=' +
						dcount + '&dreceive=' + dreceive + '&dfee=' + dfee + '&dintroduce=' + dintroduce +
						'&hname=' + hname + '&rname=' + rname + '&dimg=' + dimg
				})
			},
			saoyisao: function() {
				var that = this;
				uni.scanCode({
					onlyFromCamera: true, // 只允许从相机扫码
					success(res) {
						// console.log("扫码成功：" + JSON.stringify(res))
						// 扫码成功后  在此处理接下来的逻辑
						that.scanCode = res.result
						// console.log(that.scanCode)
					}
				})
			},
			erweima: function() {
				uni.showToast({
					title: '待开发中.............',
					icon: 'loading',
					duration: 2000 //持续的时间
				})
			},
			gotToHospital: function(id) {
				uni.navigateTo({
					url: '../menu/menu?id=' + id
				})
			},
			doctorIntroduce: function() {
				this.showDoctor = false
				uni.navigateTo({
					url: '../doctorIntroduce/doctorIntroduce'
				})
			},
			getItem: function(index) {
				var index = index
				if (index == 1) {
					uni.navigateTo({
						url: '../hospital/hospital'
					})
				} else if (index == 2) {
					uni.showToast({
						title: '待开发中.............',
						icon: 'loading',
						duration: 2000 //持续的时间
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '../hospitalIntroduce/hospitalIntroduce'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '../doctorIntroduce/doctorIntroduce'
					})
				} else if (index == 5) {
					uni.showToast({
						title: '待开发中.............',
						icon: 'loading',
						duration: 2000 //持续的时间
					})
				} else if (index == 6) {
					uni.showToast({
						title: '待开发中.............',
						icon: 'loading',
						duration: 2000 //持续的时间
					})
				} else if (index == 7) {
					uni.navigateTo({
						url: '../webView/webView?index=' + index
					})
				} else if (index == 8) { //满意度调查
					if (this.LoginIndex == '') {
						uni.redirectTo({
							url: "../login/login"
						})
					} else {
						uni.navigateTo({
							url: '../guaHaoHospital/guaHaoHospital'
						})
					}
				} else if (index == 9) {
					uni.navigateTo({
						url: '../webView/webView?index=' + index
					})
				} else {
					uni.showToast({
						title: '待开发中.............',
						icon: 'loading',
						duration: 2000 //持续的时间
					})
				}

			},
			goToDoctor: function() {
				uni.navigateTo({
					url: '../doctorIntroduce/doctorIntroduce'
				})
			},
			// 获取收藏列表功能：获取最新的收藏列表（在添加收藏成功后会清除缓存数据，这里要进行重新设置缓存）------------------
			collectedDoctors: function() {
				var data = {
					FLAG: 'R',
					collectionType: 'Doctor',
					openId: uni.getStorageSync("openid")
				}
				api.post(CollectionServlet, data).then(res => {
					//成功时回调函数
					let arrCDoctor = []
					if(res.length==0){
						
					}else {
						if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
							for (let i = 0; i < res.length - 1; i++) {
								arrCDoctor.push(res[i])
							}
						} else {
							uni.showToast({
								title: res[res.length - 1].SYS_HEAD.ReturnMessage,
								icon: 'none',
								duration: 2000
							});
							
						}
					}
					// console.log("index.vue中查询收藏的医生信息",arrCDoctor);
					this.doctors = arrCDoctor
					if (arrCDoctor.length == 0) {
						this.showDoctor = true
					} else {
						this.showDoctor = false
					}
				}).catch(err => {
					//失败时回调函数
				})
			},
			
			
			// collectedDoctors: function() {
			// 	var selectData = {
			// 		openId: uni.getStorageSync('openid')
			// 	}
			// 	api.post(GetCollectDoctorByOpenid, selectData).then(res => {
			// 		//成功时回调函数
			// 		this.doctors = res
			// 		if (res.length == 0) {
			// 			this.showDoctor = true
			// 		} else {
			// 			this.showDoctor = false
			// 		}
			// 	}).catch(err => {
			// 		//失败时回调函数

			// 	})
			// },
			// #ifdef MP-WEIXIN
			// 分享到朋友圈  
			onShareTimeline: function() {
				return {
					title: "欢迎体验掌上海隆医院小程序",
					query: "id=110101&name=heyzqt",
					imageUrl: '../../static/images/logo.png'
				}
			},
			// 分享给微信好友
			onShareAppMessage: function() {
				var path = '/pages/index/index';
				var title = '欢迎体验掌上海隆医院小程序';
				return {
					title: title,
					path: path
				}
			},
			openShare: function(e) {
				this.shareFlag = e.currentTarget.dataset.share
			},
			// #endif
		}
	}
</script>

<style>
	/*1、扫一扫组件 */
	.scan {
		position: fixed;
		width: 100%;
		z-index: 100;
	}

	/*2、医院轮播图 */
	.u-wrp-bnr {
		padding-top: 115rpx;
		width: 100%;
		height: 270rpx;
		display: block;
		background: #f0f0f0;
	}

	/*轮播图上添加文字*/
	.u-wrp-bnr .text1 {
		width: 200rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		color: rgb(29, 27, 26);
		letter-spacing: 5rpx;
		font-family: cursive;
		font-weight: bold;
		position: absolute;
		border-radius: 20rpx;
		top: 0;
		left: 85%;
		background-color: burlywood;
		transform: translateX(-50%);
	}

	.u-img-slide {
		width: 100%;
		height: inherit;
	}

	/* 3、功能菜单轮播图 */
	.categoryList {
		width: 100%;
		height: 350rpx;
		border-bottom: 20rpx solid #f4f4f4;
	}

	.category-info {
		display: inline-block;
		text-align: center;
		position: relative;
		margin-top: 20rpx;
		height: 150rpx;
		width: 20%;
	}

	.category-image {
		width: 95rpx;
		height: 95rpx;
	}

	.category-text {
		font-size: 25rpx;
		width: 100%;
		line-height: 30rpx
	}

	.collectDoc {
		font-size: 35rpx;
		padding: 20rpx 50rpx;
		color: rgb(127, 127, 125);
		border-bottom: 1rpx solid rgb(216, 215, 215);
	}

	.doctItems {
		width: 100%;
		height: 220rpx;
		color: rgb(127, 127, 125);
		display: flex;
		font-size: 35rpx;
		justify-content: center;
		align-items: center;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid rgb(216, 215, 215);
	}

	.itemImage {
		display: flex;
		flex-direction: row;
		width: 100rpx;
		height: 150rpx;
		padding-top: 40rpx;
		padding-right: 30rpx;
		padding-left: 30rpx;
		justify-content: center;
		align-items: center;
	}

	.addCollect {
		width: 150rpx;
		height: 100rpx;
		font-size: 30rpx;
		margin-top: 43rpx;
		margin-left: 30rpx;
		/*  position: relative;
	  left:780rpx;*/
		/*background-color: #C1C6D4;*/
		color: rgba(74, 74, 74, 1);
	}
</style>
