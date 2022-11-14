<template>
	<view>
		<view class="title">海隆昆山医院</view>
		<view class="content">
			<view class="item">
				<text>就诊科室：</text>
				<text :decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{guHaoInfor.roomname}}</text>
			</view>
			<view class="item">
				<text>就诊日期：</text>
				<text :decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{guHaoInfor.visiTime}}</text>
			</view>
			<view class="item">
				<text>门诊类型：</text>
				<text :decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{guHaoInfor.drole}}</text>
			</view>
			<view class="item">
				<text>医事服务费：</text>
				<text :decode="true">&nbsp;&nbsp;&nbsp;￥{{guHaoInfor.dfee}}</text>
			</view>
			<view class="item reason">
				<text>病因：</text>
				<input  type="text" focus name="reason" required @input="getReason" placeholder="请输入病情" :focus="focus" />
			</view>
		</view>
		<view class="choseperson" required @click="chosePerson">
			<text>就诊人</text>
			<text style="color:#FC6907" v-if="!choseFamily1">选择就诊人 > </text>
			<text style="position: relative;left:-410rpx;" v-else>{{family.fname}}</text>
		</view>
		<view class="conform" @click="confirm">确认预约</view>
		<view class="notice">挂号前请仔细阅读<text style="color:#65BC4E">《挂号须知》</text></view>
	</view>
</template>

<script>
	import {
		GuaHaoInsert,
		GuaHaoServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	import {
		randomNum
	} from '../common/utils.js'
	export default {
		data() {
			return {
				guHaoInfor: [],
				family: [],
				choseFamily1: ''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.family = getApp().globalData.family
			this.guHaoInfor = getApp().globalData.guHaoInfor
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			if (this.family != null) {
				uni.setStorageSync('family', this.family)
				this.choseFamily1 = uni.getStorageSync('family').choseFamily
			}
			this.getOrderNum()
		},
		methods: {
			chosePerson: function() {
				getApp().globalData.globalJumpFlag = true
				uni.redirectTo({
					url: '../family/listFamily'
				})
			},
			getReason: function(e) {
				uni.setStorageSync('gIntroduce', e.detail.value)
				this.gIntroduce = uni.getStorageSync('gIntroduce')
			},
			// 获取订单号
			getOrderNum: function() {
				var orderNum = ""
				for (var i = 0; i < 5; i++) { //j位随机数，用以加在时间戳后面。
					orderNum += Math.floor(Math.random() * 10)
				}
				orderNum = (new Date().getTime() + orderNum).replace(/(.{4})/g, "$1 ")
				this.orderNum = orderNum
			},
			confirm: function() {
				if (this.gIntroduce == null) {
					uni.showToast({
						title: '请输入病因！',
						icon: 'none',
						duration: 2000 //持续的时间
					})
					return false
				}
				if (this.family == null) {
					uni.showToast({
						title: '请选择就诊人！',
						icon: 'none',
						duration: 2000 //持续的时间
					})
					return false
				}
				var data = {
					FLAG: 'C',
					gId: randomNum('g', 6),
					gTime: this.guHaoInfor.visiTime,
					roomName: this.guHaoInfor.roomname,
					gIntroduce: this.gIntroduce,
					aId: this.family.fid,
					dId: this.guHaoInfor.dId,
					timePeriod: this.guHaoInfor.timePeriod,
					dayOfWeek: this.guHaoInfor.dayOfWeek,
					mornNum: this.guHaoInfor.mornNum,
					afternNum: this.guHaoInfor.afternNum,
					openId: uni.getStorageSync('openid'),
					gOrder: this.orderNum,
					gPayStatus:'0',
					hName: this.guHaoInfor.hname,
					dateTimes: this.guHaoInfor.dateTimes,
					orderStartTime:this.guHaoInfor.orderStartTime,
					orderEndTime:this.guHaoInfor.orderEndTime,
				}
				console.log("==预约挂号提交数据===", data);
				uni.showModal({
					title: '你已预约本次挂号,请尽快完成支付',
					content: this.guHaoInfor.visiTime,
					success: function(res) {
						if (res.confirm) { //这里是点击了确定以后
							getApp().globalData.successFlag = true
							api.post(GuaHaoServlet, data).then(res => {
								console.log("==预约成功===", res);
								if (res[0].SYS_HEAD.ReturnCode = '000000') {
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
									setTimeout(function() {
										uni.switchTab({
											url: '../guaHao/guaHao'
										})
									}, 2000);
								} else {
									uni.showToast({
										title: res[0].SYS_HEAD.ReturnMessage,
										icon: 'none',
										duration: 2000
									});
								}
							}).catch(err => {
								//失败时回调函数
								uni.showToast({
									title: '预约失败',
									icon: 'success',
									duration: 2000 //持续的时间
								})
							})
						} else if (res.cancel) { //这里是点击了取消以后
							uni.showToast({
								title: '取消预约',
								icon: 'success',
								duration: 2000 //持续的时间
							})
						}
					}
				})
			},
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 500rpx;
	}

	.title {
		width: 100%;
		height: 50rpx;
		text-align: center;
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		border-bottom: 2rpx solid rgba(218, 217, 217, 1);
	}

	.content {
		border-bottom: 20rpx solid rgba(218, 217, 217, 1);
		font-size: 32rpx;
	}

	.item {
		/*	display: flex;
	text-align: center;*/
		padding: 20rpx;

	}

	.reason {
		display: flex;
	}

	.item input {
		/* position: relative;
		top: -50rpx;
		left: 120rpx; */
	}

	.choseperson {
		display: flex;
		justify-content: space-between;
		padding: 35rpx 30rpx;
		font-size: 32rpx;
		border-bottom: 1rpx solid rgba(218, 217, 217, 1);
	}

	.conform {
		margin-top: 50rpx;
		width: 550rpx;
		height: 100rpx;
		background-color: #50B05E;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 100rpx;
	}

	.notice {
		font-size: 32rpx;
		padding-top: 30rpx;
		margin-left: 180rpx;
	}
</style>
