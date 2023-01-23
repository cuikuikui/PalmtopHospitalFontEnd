<template>
	<view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog" v-for="(item,index) in notice" :key="index">
				<view class="cu-bar bg-white">
					<view class="content">{{item.n_Title}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="time"><text>发布时间: {{item.n_Time}}</text></view>
				<view class="padding-xl">
					{{item.n_Content}}
				</view>
				<view class="cu-bar bg-white">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>

		<view class="container">
			<view class="header">
				<view class="top">
					<view class="left">
						<image :src="hospital.himg"></image>
					</view>
					<view class="right">
						<view class="top1"> {{hospital.hname}}</view>
						<view class="center1">
							<span class="iconfont icon-dengji"></span>{{hospital.hgrade}}	
							<span style="padding-left:10px" class="iconfont icon-yiyuan"></span>{{hospital.htype}}
							<view :class="collected?'active':'attention'" @click.stop="onattention"
								data-flag="locaFlag">
								{{collected?'已关注':'关注'}}
							</view>
						</view>
						<view class="bottom1">{{hospital.haddress}}</view>
					</view>
				</view>
				<view class="center">
					<text>评分{{hospital.hrate}}</text>
					<text>医生态度{{hospital.hattitude}}</text>
					<text>就医环境：{{hospital.henviroment}}</text>
				</view>
				<view class="bottom" @click="showModal" data-target="Modal">
					<span style="padding: 0 7px;" class="iconfont icon-alert"></span>
					<text>接诊时间变更通知（2020/06/29）</text>
				</view>
			</view>
			<view style="width:100%;height:25rpx;background-color: #C9C7C7"></view>
			<view class="title">医院科室</view>

			<view class="content-container">
				<scroll-view class="classify-container" scroll-y="true">
					<view v-for="(item,index) in officesList" :key="index" @click="tapClassify(item.o_Id)"
						class="classify" :class="classifySeleted==item.o_Id ? 'active' : '' ">
						<view class="name" :class="classifySeleted==item.o_Id ? 'active' : '' ">
							{{item.o_Name}}
						</view>
					</view>
				</scroll-view>

				<view class="goods-container">
					<view v-for="(item,index) in roomList" :key="index">
						<view class="title1" @click="getDoctors(item.r_Id,item.r_Name,hospital.hname)">{{item.r_Name}}
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		GetOfficeByHospitalId,
		OfficeServlet,
		RoomServlet,
		GetRoomsByOfficeId,
		InsertCollection,
		DeleteCollection,
		GetCollectHospitalByOpenid,
		NoticeServlet,
		DoctorOfficeRoomDaoServlet,
		CollectionServlet,
	} from '@/pages/common/api.js'
	var submitData = require('@/pages/common/submitData.js')
	import api from '@/pages/common/request.js'
	import {randomNum} from '@/pages/common/utils.js'
	var oId = null
	export default {
		data() {
			return {
				collected: false,
				showNotice: true,
				n_Content: '',
				hidden: false,
				nocancel: true,
				hospital: [],
				notice: [],
				officesList: [],
				doctorOfficeRooms: [],
				roomList: [],
				modalName: 'Modal',
				classifySeleted: 'o002',
				collectList:[]
				// hospitalId:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// console.log('----------------')
			// console.log(getApp().globalData.hospitals)
			// console.log('----------------')
			this.hospitalId = options.id
			this.hospitals = getApp().globalData.hospitals
			this.LoginIndex = uni.getStorageSync('LoginIndex')
			this.GetOffice()
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this
			that.getShowNotice()
			that.collectList = uni.getStorageSync('collectHospitals')
			console.log("==查询收藏的医院信息=====",that.collectList);
			// console.log("===的滴滴答答滴滴答答的=====",that.collectList.length!=0);
			that.collectShow()
			
			var localHospitals = this.hospitals
			var hospitalId = this.hospitalId;
			for (var i = 0; i < localHospitals.length; i++) {
				if (localHospitals[i].hid == hospitalId) {
					this.hospital = localHospitals[i]
					break;
				}
			}
			// var localOfficeId = 1
			// var localRoomList = uni.getStorageSync('roomList')
		},
		methods: {
			showModal(e) {
				console.log(e.currentTarget.dataset.target)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			confirm: function() {
				this.hidden = true
			},
			cancel: function() {
				this.hidden = true
			},
			getShowNotice: function() {
				this.notice = []
				this.hidden = false
				var data = submitData.notice
				data.FLAG = "R",
					data.hId = this.hospitalId
				api.post(NoticeServlet, data).then(res => {
					//成功时回调函数
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							// console.log("======dddd=========", res[i])
							this.notice.push(res[i])
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
				})
				// console.log("======dddd=========", this.notice)
			},
			hideNotice: function() {
				this.showNotice = true
			},
			// 给collected赋值功能：取出收藏列表，并给collected赋值------------------------------------------------------
			collectShow: function() {
				this.collectedUpdate()
				var localCollectList = uni.getStorageSync("collectHospitals")
				console.log("更新后的数据",uni.getStorageSync("collectHospitals"));
				if(localCollectList.length ==0){

				}else {
					for (var i = 0; i < localCollectList.length; i++) {
						if (this.hospitalId == localCollectList[i].hid) {
							this.collected = true
							this.cid = localCollectList[i].cid
							break
						}
					}
				}
			},
			// 添加收藏功能：向收藏表插入数据（成功后清除缓存数据）--------------------------------------------------
			collectedAdd: function() {
				var InsertData = {
					FLAG:'C',
					cId:randomNum("ch",6),
					hId: this.hospitalId,
					dId:"",
					openId: uni.getStorageSync('openid')
				}
				api.post(CollectionServlet, InsertData).then(res => {
					if(res[0].SYS_HEAD.ReturnCode ='000000'){
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration:2000
						});
						this.collectShow()
					}else {
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
					
				}).catch(err => {
					console.log("=err====",err);
				})
			},
			//取消收藏功能：获取最新的收藏列表（在添加收藏成功后会清除缓存数据，这里要进行重新设置缓存）------------------
			collectedDelete: function() {
				this.collectShow()
				var selectData = {
					FLAG:"D",
					openId:uni.getStorageSync('openid'),
					cId: this.cid
				}
				api.post(CollectionServlet, selectData).then(res => {
					if(res[0].SYS_HEAD.ReturnCode ='000000'){
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration:2000
						});
						
					}else {
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err => {
					//失败时回调函数
				})
			},
			// 获取收藏列表功能：获取最新的收藏列表（在添加收藏成功后会清除缓存数据，这里要进行重新设置缓存）------------------
			collectedUpdate: function() {
				var data = {
					FLAG:'R',
					collectionType:'Hospital',
					openId: uni.getStorageSync('openid')
				}
				// console.log("======data====",data);
				api.post(CollectionServlet, data).then(res => {
					// console.log("======data====",res);
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
						this.collectList = arrCHospital
					}
					console.log("=======menuCollections========",arrCHospital);
					// uni.removeStorageSync("collectHospitals")
					uni.setStorageSync("collectHospitals", arrCHospital)
				}).catch(err => {
					//失败时回调函数
				})
			},
			// 添加收藏
			// 关注
			onattention: function() {
				try{
					// 如果获取的collected是true，此时进行取消收藏功能
					console.log("==onattention is called====",this.collected);
					if (this.collected == true) {
						this.collectedDelete()
						this.collected = false
					} else {
						this.collectedAdd()
						this.collected = true
					}
				}catch(e){
					console.log("===exception====",e);
				}
			},
			tapClassify: function(id) {
				this.classifySeleted = id	
				this.GetRooms(id)
			},
			getDoctors: function(roomid, rname, hname) {
				console.log(roomid, rname, hname)
				if (this.LoginIndex == '') {
					uni.redirectTo({
						url: "/pagesA/login/login"
					})
				} else {
					uni.navigateTo({
						url: '/pagesA/doctors/doctors?hospitalId=' + this.hospitalId + '&roomId=' + roomid +
							'&rname=' + rname + '&hname=' + hname
					})
				}
			},

			GetOffice: function() {
				var officeData = submitData.DoctorOfficeRoom
				officeData.FLAG = "R",
					officeData.hId = this.hospitalId
				api.post(OfficeServlet, officeData).then(res => {
					//成功时回调函数 
					//成功时回调函数
					let arrOffice = []
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							// console.log("======dddd=========", res[i])
							arrOffice.push(res[i])
						}
					} else {
						uni.showToast({
							title: res[res.length - 1].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
					this.officesList = arrOffice;
					this.GetRooms(arrOffice[0].o_Id)
				}).catch(err => {
					//失败时回调函数

				})
			},
			GetRooms: function(officrId) {
				var data = {}
				data.FLAG = "R",
				data.hId = this.hospitalId
				data.oId = officrId;
				data.rId = ""
				data.rName = ""
				data.currentPage ='1'
				api.post(RoomServlet, data).then(res => {
					//成功时回调函数 
					let arrRoom = []
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							// console.log("======dddd=========", res[i])
							arrRoom.push(res[i])
						}
					} else {
						uni.showToast({
							title: res[res.length - 1].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
					this.roomList = arrRoom
					console.log('vvvvvvvvv', this.roomList);
					// console.log('dfdfdf',this.roomList);
				})
			}
		},
	}
</script>

<style>
	@import "@/static/style/index.css";

	/* ---------------------------------------------整体样式 -----------------------------------------------*/
	.container {
		height: 1800rpx;
		overflow: hidden;
	}

	.notice .time {
		font-size: 30rpx;
		color: #9D9D9D;
		display: flex;
		justify-content: center;
		margin-top: 15rpx;
	}

	.notice .content {
		font-size: 30rpx;
		padding: 10rpx 20rpx;
	}

	.notice .known {
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		font-size: 40rpx;
		color: rgb(12, 253, 248)
	}

	.header {
		width: 100%;
		height: 350rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 15rpx;
		/*background-color: #F796F4*/
	}

	.top {
		width: 100%;
		height: 200rpx;
		display: flex;
		/*background-color: #F71111*/
	}

	.top .left {
		width: 200rpx;
		height: 100%;
		/*background-color: #F51B1B*/
	}

	.top .left image {
		width: 200rpx;
		height: 200rpx;
	}

	.top .right {
		width: 550rpx;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-left: 20rpx;
		font-size: 30rpx;
		color: #444242;
		/*background-color: #1B1BF5*/
	}

	.top .right .top1 {
		width: 100%;
		height: 50rpx;
		font-size: 40rpx;
		/*background-color: #0DFA07*/
	}

	.top .right .center1 {
		width: 100%;
		height: 50rpx;
		display: flex;
		align-items: center;
		/*background-color: #0CBAFA*/
	}

	.top .right .center1 image {
		width: 40rpx;
		height: 40rpx;
	}

	.top .right .bottom1 {
		width: 400rpx;
		height: 50rpx;
		/*background-color: #F7FA07*/
	}

	.top .right .center1 .attention,
	.top .right .center1 .active {
		width: 100rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		margin-left: 100rpx;
		margin-top: 80rpx;
		background-color: #08F6F9
	}

	.top .right .center1 .active {
		color: #9D9D9D;
		background-color: #646464
	}

	.center {
		width: 100%;
		height: 50rpx;
		display: flex;
		color: #767676;
		justify-content: space-around;
		font-size: 30rpx;
		/*background-color: #2111F7*/
	}

	.bottom {
		width: 100%;
		height: 50rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		color: #444343;
		margin-left: 50rpx;
		background-color: #E3E2E2;
	}

	.title {
		width: 100%;
		height: 70rpx;
		padding: 15rpx;
		font-size: 30rpx;
		color: #0DFDFA;
		border: 1rpx solid rgb(192, 192, 180);
	}

	/* 左侧选择菜单按钮页面样式 */
	.content-container {
		display: flex;
		height: 93%;
		box-sizing: border-box;
		/*padding-bottom: 100rpx;*/
	}

	.classify-container {
		width: 150rpx;
		background-color: #DCDBDB;
		height: 100%;
	}

	.classify-container .classify {
		padding: 20rpx 10rpx;
		text-align: center;
		/*border-bottom: 1px dashed #aaa;*/
	}

	.classify-container .classify.active {
		background-color: white;
		color: #07DCEF
	}

	.classify-container .classify .name {
		display: inline-block;
		font-size: 30rpx;
		/*color: #3A3939;*/
		line-height: 1.2;
		text-align: left;
		pointer-events: none;
	}

	/* 右侧详细商品页面样式 */
	.goods-container {
		/*flex: 1;*/
		/*background: #fff;*/
		height: 100%;
	}

	.goods-container .title1 {
		padding: 20rpx 25rpx;
		color: #4B4A4A;
		font-size: 30rpx;
		line-height: 30rpx;
		/*background: #f7f7f7;*/
	}

	/* ==================
	         模态窗口
	 ==================== */

	.cu-modal {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1110;
		opacity: 0;
		outline: 0;
		text-align: center;
		-ms-transform: scale(1.185);
		transform: scale(1.185);
		backface-visibility: hidden;
		perspective: 2000upx;
		/* background: rgba(0, 0, 0, 0.6); */
		transition: all 0.3s ease-in-out 0s;
		pointer-events: none;
	}

	.cu-modal::before {
		content: "\200B";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}

	.cu-modal.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}

	.cu-dialog {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		margin-left: auto;
		margin-right: auto;
		width: 680upx;
		max-width: 100%;
		background-color: #f8f8f8;
		border-radius: 10upx;
		overflow: hidden;
	}

	.bg-white {
		background-color: #ffffff;
		color: #666666;
	}

	.cu-modal .cu-dialog>.cu-bar:first-child .action {
		min-width: 100rpx;
		margin-right: 0;
		min-height: 100rpx;
	}

	.justify-end {
		justify-content: flex-end;
	}
</style>
