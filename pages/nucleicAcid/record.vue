<template>
	<view class="container">
		<text style="font-weight: bolder;">预约记录</text>
		<view class="jiazai" v-if="record==true">
			<image style="width: 100px;height: 100px" src="../../static/images/upset.png" mode=""></image>
			<text>请求中...</text>
		</view>
		<view class="item"  v-if="record==false" v-for="(item,index) in appoints"  :key="index" @click="appointDetail(item.code,item.FId,item.Fname,item.IDCard,item.Phone,item.appDate,item.appNo,item.appType,item.appStatus,item.paySatus)">
			<view class="header" :style="{'background-color':item.appStatus=='0' ? '#FFFFFF' : ''}">
				<text>预约人姓名</text>
				<text>{{item.Fname}}</text>
			</view>
		
		   <view class="component-code">
				<tki-barcode
					ref="barcode"
					onval
					:val="item.code"
					:load-make="true"
					:opations="barOpations"/>
			</view>
			
			<view class="content" v-if="item.appStatus=='1'">
				<text>预约项目</text>
				<text>新冠核酸检测</text>
			</view>
			<view class="content">
				<text>预约状态</text>
				<text v-if="item.appStatus=='1'">已预约</text>
				<text v-else>已取消</text>
			</view>
			<view class="content">
				<text>预约日期</text>
				<text>{{item.appDate}}</text>
			</view>
			<view class="content" v-if="item.appStatus=='1'">
				<text>缴费状态</text>
				<text v-if="item.paySatus=='1'">已收费</text>
				<text v-else>未收费</text>
			</view>
	
		</view>
	</view>
</template>

<script>
	import tkiBarcode from "@/components/tki-barcode/tki-barcode"
	import {
		randomNum
	} from '../common/utils.js'
	import {
		AppointServlet
	} from '../../pages/common/api.js'
	import api from '../../pages/common/request.js'
	export default {
		components: {
			tkiBarcode
		},
		data(){
			return {
				record:true,
				barOpations: {
					height: 150,
					displayValue: false
				},
				appoints:[],
				family:[]
			}
		},
		created() {
			this.getAppoints()
		},
		methods:{
			appointDetail(code,FId,Fname,IDCard,Phone,appDate,appNo,appType,appStatus,paySatus){
				uni.navigateTo({
					url:'./recordDetail?code=' + code + '&FId=' + FId+ '&Fname=' + Fname+ '&IDCard=' + IDCard+ '&Phone=' + Phone+ '&appDate=' + appDate+ '&appNo=' + appNo+ '&appType=' + appType+ '&appStatus=' + appStatus+ '&paySatus=' + paySatus
				})
			},
			// 获取预约信息
			getAppoints(){
				uni.showLoading({
					title: '加载中',
					mask:false
				});
				var openid = uni.getStorageSync('openid')
				var data = {
					//从全局变量data中获取数据
					openId: openid,
					FLAG: "R"
				}
				
				api.post(AppointServlet, data).then(res => {
					//成功时回调函数
					// console.log("====res====",res);
					setTimeout(function () {
						uni.hideLoading();
					}, 2000);
					this.record = false
					
					let curArr = res
					let arr = uni.getStorageSync('family_list')
					console.log("====arr====",arr);
					for(let i =0;i<arr.length;i++){
						for(let j=0;j<curArr.length;j++){
							if(arr[i].a_Id ==curArr[j].FId){
								curArr[j].Fname = arr[i].a_Name
								curArr[j].IDCard = arr[i].a_IDCard
								curArr[j].Phone = arr[i].a_Phone
							}
						}
					}
					
					for(let i =0;i<curArr.length;i++){
						curArr[i].code = randomNum(curArr[i].appNo, 6)
					}
					setTimeout(() => {
						for(let i =0;i<curArr.length;i++){
							curArr[i].code = randomNum(curArr[i].appNo, 6)
						}
					}, 5000)

					this.appoints = curArr
					console.log("====curArr====",curArr);
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
		padding: 5px;
	}
	.jiazai {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: darkgray;
		/* margin-top: 100px; */
	}
	.item{
		padding: 10px;
		box-shadow: 2px 2px 8px 10px darkgrey;
		border-radius:5px;
		margin-top: 10px;
	}
	.header {
		display: flex;
		padding: 10px;
		background-color: dodgerblue;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		justify-content: space-between;
		font-size: 15px;
	}
	.component-code {
		/* border-radius: 16rpx; */
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
</style>