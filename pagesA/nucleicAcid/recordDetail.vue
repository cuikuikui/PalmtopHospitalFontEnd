<template>
	<div class="container" >
		<view class="component-code">
			<tki-barcode
				ref="barcode"
				onval
				:val="code"
				:load-make="true"
				:opations="barOpations"/>
		</view>
		<view class="content">
			<text>就诊卡号</text>
			<text>{{FId}}</text>
		</view>
		<view class="content">
			<text>预约者姓名</text>
			<text>{{Fname}}</text>
		</view>
		<view class="content">
			<text>身份证号</text>
			<text>{{IDCard}}</text>
		</view>
		<view class="content">
			<text>手机号</text>
			<text>{{Phone}}</text>
		</view>
		<view class="content">
			<text>预约日期</text>
			<text>{{appDate}}</text>
		</view>
		<view class="content">
			<text>预约单号</text>
			<text>{{appNo}}</text>
		</view>
		
		<view class="content" v-if="appStatus=='1'">
			<text>已预约项目</text>
			<!-- <text v-if="appType=='0'">新型冠状病毒核酸检测混采(自费)</text> -->
			<text v-if="appType=='1'">新型冠状病毒核酸检测单采(自费)</text>
			<text v-else>新型冠状病毒核酸检测混采(自费)</text>
		</view>
		<view class="content">
			<text>预约状态</text>
			<text v-if="appStatus=='1'">已预约</text>
			<text v-else>已取消</text>
		</view>
		<view class="content">
			<text>收费状态</text>
			<text v-if="paySatus=='1'">已收费</text>
			<text v-else>未收费</text>
		</view>
		<view class="submit" v-if="appStatus=='1'">
			<button type="primary" style="background-color: dodgerblue;" @click="submit">去支付</button>
			<button type="primary" style="background-color: dodgerblue;margin-top: 10px;" @click="canceil">取消预约</button>
		</view>
	</div>
</template>

<script>
	import tkiBarcode from '@/pagesA/components/tki-barcode/tki-barcode'
	import {
		randomNum
	} from '@/pages/common/utils.js'
	import {
		AppointServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		components: {
			tkiBarcode
		},
		data(){
			return {
				barOpations: {
					height: 150,
					displayValue: false
				},
				code:'',
				FId:'',
				Fname:'',
				IDCard:'',
				Phone:'',
				appDate:'',
				appNo:'',
				appType:'',
				appStatus:'',
				paySatus:''
			}
		},
		onLoad(options) {
			this.code = options.code;
			this.FId = options.FId
			this.Fname = options.Fname
			this.IDCard = options.IDCard
			this.Phone = options.Phone
			this.appDate = options.appDate
			this.appNo = options.appNo
			this.appType = options.appType
			this.appStatus = options.appStatus
			this.paySatus = options.paySatus
			console.log("==options====",options)
			
		},
		methods:{
			submit(){
				uni.navigateTo({
					url:"./pay1"
				})
			},
			getAppoints(){
				var openid = uni.getStorageSync('openid')
				var data = {
					//从全局变量data中获取数据
					openId: openid,
					FLAG: "R"
				}
				
				api.post(AppointServlet, data).then(res => {
					//成功时回调函数			
					for(let i =0;i<res.length;i++){
						if(this.appNo==res[i].appNo){
							this.appStatus = res[i].appStatus
						}
					}
					//授权成功后，跳转进入小程序首页
				}).catch(err => {
					//失败时回调函数
				})	
			},
			canceil(){
				var openid = uni.getStorageSync('openid')
				let that = this
				var data = {
					//从全局变量data中获取数据
					openId: openid,
					appNo:this.appNo,
					type:'cancel',
					FLAG: "U"
				}
				
				api.post(AppointServlet, data).then(res => {
					//成功时回调函数
					console.log("====res====",res);
					let code = res.split(',')[0]
					let message = res.split(',')[1]
					//成功时回调函数
					if(code =="200"){
						uni.showLoading({
							title: '加载中'
						});
						setTimeout(function () {
							uni.hideLoading();
							that.getAppoints()
							uni.showToast({
								title: message,
								icon: 'none',
								duration: 2000
							});
						}, 2000);
						
					}else {
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						});
					}
					//授权成功后，跳转进入小程序首页
				}).catch(err => {
					//失败时回调函数
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		padding: 10px;
	}
	.component-code {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		flex: 1;
		width: 100%;
		margin-top:10rpx;
	}
	.content {
		width: 100%;
		display: flex;
		padding:10px 0;
		font-size: 15px;
		color: slategray;
		border-bottom: 1rpx dotted darkgray;
		justify-content: space-between;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.submit {
		width: 92%;
		margin-top: 30rpx;
		margin-left: 30rpx;
		/* background-color: mediumblue; */
		color: #fff;
		border-radius: 10px;
	/* 	position: relative;
		bottom: -100px; */
	}
</style>