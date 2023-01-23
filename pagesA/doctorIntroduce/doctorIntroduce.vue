<template>
	<view>
		<view class="search" @click="searchDoctor">
			<span class="iconfont icon-search"></span>
			搜索医生
		</view>
		<scroll-view scroll-y="true" class="container">
			<view class="center1" v-for="(item,index) in doctors" :key="index" @click="getDoctorDetail(item.d_Id,item.d_Name,item.d_Count,item.d_ReceiveNum,item.d_Fee,item.d_Role,item.d_Introduce,item.h_Name,item.r_Name,item.d_Img)">																									
				<view class="img">
					<image :src="item.d_Img"></image>
				</view>
				<view class="right">
					<text style="color:#080808">姓名：{{item.d_Name}}</text>
					<text>职称：{{item.d_Role}}</text>
					<text>医院：{{item.h_Name}}</text>
					<text>科室：{{item.r_Name}}</text>
					<text>资费：{{item.d_Fee}}</text>
					<view class="good">擅长：{{item.d_Introduce}}</view>
				</view>
			</view>
		</scroll-view>
		<!-- <back-top @click.native="backTop" v-show="isShowBackTop"></back-top> -->
	</view>
</template>

<script>
	// import BackTop from "../../components/common/backTop/BackTop.vue"
	import {GetAllDoctorList,DoctorServlet} from '@/pages/common/api.js'
	var submitData = require('@/pages/common/submitData.js')
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				doctors:''
			}
		},
		components:{
			// BackTop
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.LoginIndex=uni.getStorageSync('LoginIndex')
			var data = submitData.Doctors
			data.FLAG = 'R'
			data.hId =''
			data.rId =''
			data.day =''
			data.dName=''
			data.currentPage ='1'
			console.log('dsdsdsdsdffv',data);
			api.post(DoctorServlet, data).then(res => {
				console.log("dhsidhhdsih",res);
				let arrDoctor = []
				if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
					for (let i = 0; i < res.length - 1; i++) {
						// console.log("======dddd=========", res[i])
						arrDoctor.push(res[i])
					}
				} else {
					uni.showToast({
						title: res[res.length - 1].SYS_HEAD.ReturnMessage,
						icon: 'none',
						duration: 2000
					});
				}
				//成功时回调函数
				this.doctors=arrDoctor
			}).catch(err => {
				//失败时回调函数
			})
		},
		// onPageScroll(res){
		// 	console.log(res.scrollTop);//距离页面顶部距离
		// },
		methods: {
			// onPageScroll(res){
			// 	console.log(res.scrollTop);
			// },
			getDoctorDetail: function(did,dname,dcount,dreceive,dfee,drole,dintroduce,hname,rname,dimg) {
				if (this.LoginIndex == '') {
					uni.redirectTo({
						url: "../login/login"
					})
				} else {		
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
						url: '../doctorDetail/doctorDetail?doctorId=' + doctorId + '&dname=' + dname + '&drole=' + drole + '&dcount=' +
							dcount + '&dreceive=' + dreceive + '&dfee=' + dfee + '&dintroduce=' + dintroduce +
							'&hname=' + hname + '&rname=' + rname + '&dimg=' + dimg
					})
				}
			},
			searchDoctor: function() {
				console.log('111111111')
				uni.navigateTo({
					url: '../searchDoctor/searchDoctor'
				})
			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 1460rpx;
		position: relative;
		top: 120rpx;
	}

	/*医生搜索*/
	.search {
		display: flex;
		position: fixed;
		align-items: center;
		width: 700rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
		height: 80rpx;
		font-size: 25rpx;
		background-color: white;
		border-radius: 10rpx;
		line-height: 40rpx;
		color: #AAA9A9;
		border: 1rpx solid rgb(192, 192, 180);
	}

	.search image {
		height: 31rpx;
		width: 31rpx;
		padding: 0rpx 10rpx;
	}

	/*医生信息*/
	.center1 {
		display: flex;
		font-size: 25rpx;
		align-items: center;
		padding-left: 20rpx;
		padding-top: 20rpx;
		border-bottom: 1rpx solid rgb(192, 192, 180)
	}

	.center1 .img {
		width: 150rpx;
		height: 150rpx;
	}

	.center1 .img image {
		width: 150rpx;
		height: 150rpx;
	}

	.center1 .right {
		padding-left: 25rpx;
		display: flex;
		flex-direction: column;
		line-height: 50rpx;
		/*color:;*/
	}

	.center1 .right .good {
		width: 550rpx;
		height: 50rpx;
		font-size: 25rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
