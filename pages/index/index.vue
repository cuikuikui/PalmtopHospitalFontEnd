<template>
	<view>		
		<scroll-view style="height: 100%;" scroll-y="true">
			<!--1、扫一扫组件 -->
			<scan class="scan"></scan>
			<view style="margin-top: 60px;"></view>
			<!--2、就诊卡 -->
			<view class="family-container" v-if="showQrcode">
				<view class="header">
					<text>{{family.a_Name}}</text>
					<view v-if="family.isDefault=='1'" class="default">默认</view>
					<view class="switch" @click="chosePerson">切换</view>
				</view>
				
				<view class="body">
					<view class="left">
						<text>{{family.a_Id}}</text>
						<text>{{family.a_IDCard}}</text>
						<text>{{family.a_Phone}}</text>
					</view>
					
					<view class="right" @click="openQrcode(family.a_Id,family.secretName)">
						<tki-qrcode foreground="#15cebc" pdground="#15cebc" cid="qrcode1" ref="qrcode" :val="family.secretAid" :size="size1" :unit="unit" :icon="icon"
							:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"
							@result="qrR" />
						<view style="width: 45px;">
							就诊码
						</view>	
					</view>
				</view>
				
				<div class="line"></div>
				
				<view class="footer">
					<label v-if="family.isDefault=='1'"><radio value="r1" :disabled="true" :checked="family.isDefault=='1'?true :false" />默认就诊人</label>
					<label v-else></label>
					
					<view class="delete"  @click="deletes(family.secretAid)">解绑</view>
				</view>
			</view>	
			<view v-else class="family-container" @click="addFamily">
				<view class="header" style="align-items: center;font-size: 17px;">
					<span class="iconfont icon-yiyuan1"></span>
					<text>徐州中医医院</text>
				</view>
				<view class="body" style="display: flex;flex-direction: column;align-items: center;color:white">
					<text style="font-size: 22px;">就诊卡</text>
					<text style="font-size: 15px;">Medical Card</text>
				</view>
				<view class="add">初次使用请先添加就诊人</view>
			</view>
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

						<view v-if="showDoctor==false" style="width:150rpx;display: inline-block;"
							@click="goToDoctor">
								<span class="iconfont icon-add" style="font-size: 55px;position: relative;top: 10px"></span>
							<view style="font-size: 30rpx;">收藏医生</view>
						</view>
					</view>
				</scroll-view>
				<view v-if="showDoctor==true" @click="doctorIntroduce" style="position:relative;right:200rpx">
					<text>暂无收藏医生,可在 <text style="color:rgb(15, 196, 216)">医生介绍</text> 中收藏医生</text>
				</view>
			</view>
			<!-- 4、放大的二维码 -->
			<view v-if="qrcodeFlag" class="qrcode-image" @click="closeQrcode">
				<view class="qrcode">
					<tki-qrcode cid="qrcode1" ref="qrcode" :val="value1" :size="size2" :unit="unit" :icon="icon"
						:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"
						@result="qrR" />
					<view class="card">
						<text>卡号：{{value1}}</text>
						<text>就诊人：{{value2}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// 导入的公共组件
	import Scan from "@/components/content/index/Scan";
	import {
		GetCollectDoctorByOpenid,
		CollectionServlet,
		AskerServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	import {decrypt} from '@/pages/common/utils.js'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {reload} from "@/pages/common/utils.js"
	export default {
		components: {
			tkiQrcode,
			Scan
		},
		data() {
			return {
				switchA: false,
				size1: 150, // 二维码大小
				size2: 400, // 二维码大小
				val: '', // 要生成的二维码值
				unit: 'upx', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				qrcodeFlag:false,
				showQrcode:false,
				value1:'',
				value2:'',
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
						name: "核酸检测",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/myd.png"
					},
					// {
					// 	index: 2,
					// 	name: "预约体检",
					// 	src: "http://localhost:8080/PalmtopHospitalBackEnd/images/myd.png"
					// },
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
						name: "预检分诊问卷",
						src: "http://localhost:8080/PalmtopHospitalBackEnd/images/fenjianwenjuan.png"
					},
					// {
					// 	index: 6,
					// 	name: "智能导诊",
					// 	src: "http://localhost:8080/PalmtopHospitalBackEnd/images/zhinengdianzi.png"
					// },
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
				doctors: [],
				scanCode: '',
				family:{},
				fId:''
			}
		},
		onLoad() {	
			uni.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShow() {	
			console.log('xxxxxxxxxxx')
			this.fId = getApp().globalData.fId
			this.getFamilys()
			this.LoginIndex = uni.getStorageSync('LoginIndex')
			if (uni.getStorageSync('LoginIndex') == '') {
				this.doctors = ""
			} else {
				this.collectedDoctors()
			}
		},
		methods: {
			// 关闭二维码
			closeQrcode(){
				this.qrcodeFlag = false
			},
			addFamily(){
				if (uni.getStorageSync('LoginIndex') == '') {
					uni.redirectTo({
						url: '/pagesA/login/login'
					})
				} else {
					getApp().globalData.familySign = "02"
					uni.setStorageSync("switchFlag",true)
					uni.redirectTo({
						url: '/pagesC/family/listFamily'
					})
				}
			},
			// 切换就诊人
			chosePerson(){
				uni.setStorageSync("switchFlag",true)
				getApp().globalData.familySign = "02"
				uni.redirectTo({
					url: '/pagesC/family/listFamily'
				})
			},
			deletes(aId){
				var data = {
					aId: aId,
					FLAG: 'D'
				}
				console.log("=====",data)
				uni.showModal({
					title: '提示',
					content: '确认删除该就诊人信息吗？',
					success: function(res) {
						if (res.confirm) {
							//成功时回调函数
							api.post(AskerServlet, data).then(res => {
								console.log("===res====",res)
								reload()
							}).catch(err => {
								//失败时回调函数
							})
						} else if (res.cancel) {
							console.log("取消")
						}else{
							
						}
					}
				})
			},
			qrR(res) {
				this.src = res
				// console.log("====this.src=====",this.src);
			},
			// 放大二维码
			openQrcode(secretAid,secretName){
				this.value1 = secretAid
				this.value2 = secretName
				this.qrcodeFlag = true
			},
			getFamilys(){
				var data = {
					openId: uni.getStorageSync('openid'),
					FLAG: 'R',
					type:'getDesensFamily'
				}
				api.post(AskerServlet, data).then(res => {
					//成功时回调函数 
					console.log(res)
					if(res.length==""){
						this.showQrcode = false
					}else {
						this.showQrcode = true
						let curArr = res
						console.log('====uni.getStorageSync("switchFlag")=====',uni.getStorageSync("switchFlag"))
						if(uni.getStorageSync("switchFlag")){
							for(let i =0;i<curArr.length;i++){
								if(decrypt(curArr[i].secretAid) == this.fId){
									console.log('111111111')
									this.family = curArr[i]
									uni.setStorageSync('switchFlag',false)
									getApp().globalData.fId =""
									break
								}
							}	
						}else {
							for(let i =0;i<curArr.length;i++){
								if(curArr[i].isDefault =='1'){
									console.log('222222222')
									this.family = curArr[i]
								}else {
									console.log('333333333')
									this.family = curArr[0]
								}
							}
						}
						this.family.secretAid =decrypt(this.family.secretAid)
						this.family.secretName =decrypt(this.family.secretName)
						console.log("===this.family ===",this.family)
					}
				}).catch(err => {
					//失败时回调函数
				})
			},
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
					url: '/pagesA/doctorDetail/doctorDetail?doctorId=' + doctorId + '&dname=' + dname + '&drole=' +
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
						url: '/pagesA/hospital/hospital'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pagesA/nucleicAcid/index'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pagesA/hospitalIntroduce/hospitalIntroduce'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '/pagesA/doctorIntroduce/doctorIntroduce'
					})
				} else if (index == 5) {
					uni.showToast({
						title: '待开发中.............',
						icon: 'loading',
						duration: 2000 //持续的时间
					})
				} else if (index == 6) {
					if(uni.getStorageSync('family_list')==""){
						uni.showToast({
							title:'先绑定就诊卡',
							icon:'error',
							duration: 2000
						})
					}else {
						getApp().globalData.familySign = "03"
						uni.navigateTo({
							url: '/pagesC/family/listFamily'
						})
					}
				} else if (index == 7) {
					uni.navigateTo({
						url: '/pagesA/webView/webView?index=' + index
					})
				} else if (index == 8) { //满意度调查
					if (this.LoginIndex == '') {
						uni.redirectTo({
							url: "/pagesA/login/login"
						})
					} else {
						uni.navigateTo({
							url: '/pagesA/guaHaoHospital/guaHaoHospital'
						})
					}
				} else if (index == 9) {
					uni.navigateTo({
						url: '/pagesA/webView/webView?index=' + index
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
					url: '/pagesA/doctorIntroduce/doctorIntroduce'
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
		}
	}
</script>

<style>
	/*1、扫一扫组件 */
	.scan {
		position: fixed;
		top: -1px;
		width: 100%;
		z-index: 100;
	}

	/*2、就诊卡 */
	.family-container {
		padding: 10px;
		margin: 10px;
		border-radius: 10px;
		background-color: #15cebc;
	}
	.family-container .header {
		display: flex;
		color: white;
		flex-direction: row;
		font-size: 13px;
	}
	.family-container .header .default {
		border: 1px solid white;
		padding: 1rpx 15rpx;
		border-radius: 5px;
		margin-left: 7px;
	}
	.family-container .header .switch {
		border: 1px solid white;
		padding: 1rpx 15rpx;
		border-radius: 5px;
		margin-left: 7px;
		color: #15cebc;
		background-color: white;
	}
	.family-container .body {
		display: flex;
		justify-content: space-between;
	}
	.family-container .body .left {
		margin-top: 5px;
		color: white;
		display: flex;
		flex-direction: column;
		font-size: 13px;
		line-height: 27px;
	}
	.family-container .body .right {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 13px;
		color:white;
		padding-right: 20px;
	}
	.family-container .line {
		border: 1rpx dashed white;
		margin: 10px 0;
	}
	.family-container .footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: white;
		font-size: 13px;
		padding: 3px 0;
	}
	.family-container .footer .delete {
		padding: 0 10px;
		color: white;
		border: 1px solid white;
		border-radius: 5px;
		/* margin-right: 5px; */
	}
	.add {
		display: flex;
		background-color: white;
		justify-content: center;
		color:#15cebc;
		font-size: 14px;
		margin: 10px 0;
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
	/* 收藏 */
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
	/* 放大二维码 */
	.qrcode-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(58 53 53 / 25%);
		z-index: 100;
	}
	.qrcode {
		border-radius: 10px;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	    margin-top: 100px;
	    margin-left: 20px;
	    padding-top: 30px;
	    padding-bottom: 20px;
	    margin-right: 20px;
	}
	.card {
		display: flex;
		flex-direction: column;
		font-size:15px;
	}
</style>
