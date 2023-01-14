<template>
	<view>
		<text>{{countdownStr}}</text>
	</view>
</template>

<script>
import {GuaHaoServlet} from '../../pages/common/api.js'
	import api from '../../pages/common/request.js'
	var util = require('../../pages/common/util.js');
	export default {
		data() {
			return {
				countdownStr: "",
				// payStatusX:''
			}
		},
		props: { //接收父组件的数据
			orderEndTime: {
				type: String,
				default: ''
			},
			gId:{
				type:String,
				default:''
			},
			payStatus:{
				type:String,
				default:''
			},
			gTime:{
				type:String,
				default:''
			},
			gWeek:{
				type:String,
				default:''
			},
			dId:{
				type:String,
				default:''
			}
		},
		watch: { //监听时间的变化
			orderEndTime() {
				this.countdowm(this.orderEndTime,this.gId,this.payStatus)
			},
			payStatus() {
				this.countdowm(this.orderEndTime,this.gId,this.payStatus)
			}
		},
		mounted() {
			this.countdowm(this.orderEndTime,this.gId,this.payStatus)
		},
		methods: {
			showPrompt() {
				let self = this
				uni.showModal({
					title:"订单支付超时",
					content: '支付超时，请重新下单',
					showCancel: false,
					// confirmText: "重新下单",
					cancelText: "取消", // 取消按钮的文字  
					confirmText: "确认", // 确认按钮的文字  
					showCancel: true, // 是否显示取消按钮，默认为 true
					confirmColor: '#f55850',
					cancelColor: '#39B54A',
					success: function(res) {
						// console.log("====res===",res);
						if (res.confirm) {
							util.reload()
							// self.$emit("updatePay")
							// console.log('confirm',self.countdownStr) //点击取消之后执行的代码 
						} else {  
							console.log('cancel') //点击取消之后执行的代码 
						}
					}
				});
			},
			convertWeek: function(gweek) {
				if (gweek == "周日") {
					gweek = '7'
				} else if (gweek == "周一") {
					gweek = '1'
				} else if (gweek == "周二") {
					gweek = '2'
				} else if (gweek == "周三") {
					gweek = '3'
				} else if (gweek == "周四") {
					gweek = '4'
				} else if (gweek == "周五") {
					gweek = '5'
				} else {
					gweek = '6'
				}
				return gweek
			},
			updatePayStatus(gId){
				var that = this
				var did = this.dId
				var gtime = this.gTime
				var gweek = parseInt(this.convertWeek((this.gWeek).trim().split(" ")[3]))
				var data = {
					FLAG: "U",
					payFlag:'UB',
					dId: did,
					period: gtime,
					dayOfWeek: gweek,
					gId: gId,
					gPayStatus:'2',
				}
				api.post(GuaHaoServlet, data).then(res => {
					if (res[0].SYS_HEAD.ReturnCode = '000000') {
			
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
						title: err,
						icon: 'none',
						duration: 2000
					});
				})
			},
			countdowm(orderEndTime,gId,payStatus) {
				let self = this;
				getApp().globalData.timer = setInterval(function() {
					var go_time = new Date((orderEndTime).replace(/-/g, '/'));
					var now_time = new Date();
					if (!go_time.getTime()) {
						return
					}
					var alltime = go_time.getTime() - now_time.getTime(); //剩余的时间（毫秒
					console.log("==alltime===", alltime);
					if (alltime <= 0) {		
						console.log("=====预约失败时出发该状态=====");
						if(payStatus=='0'){
							self.showPrompt()
							self.updatePayStatus(gId)
							// clearInterval(getApp().globalData.timer);
						}
						self.countdownStr = "支付超时,重新提交订单"
						clearInterval(getApp().globalData.timer);
						// self.updatePayStatus(gId)
						// self.countdownStr = "支付超时,重新提交订单"
						// clearInterval(getApp().globalData.timer);
						return
					} else {
						var haoscend = alltime % 1000; //毫秒
						//console.log(haoscend);
						var scend = parseInt((alltime / 1000) % 60)
						//console.log(scend);
						var minute = parseInt((alltime / 1000 / 60) % 60)
						// console.log(minute);
						var hour = parseInt((alltime / 1000 / 60 / 60) % 24)
						if (scend < 10) {
							scend = "0" + scend
						}
						if (minute < 10) {
							minute = "0" + minute
						}
						let str = minute + ":" + scend;
						if (hour > 0) {
							str = hour + ':' + str
						}
						self.countdownStr = "支付剩余时间:"+str
						// console.log(str);
					}
				}, 1000);
			}
		}
	}
</script>

<style>
</style>
