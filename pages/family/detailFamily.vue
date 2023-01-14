<template>
	<view class="detailFamily">
		<view class="header">
			<tki-qrcode class="qrcode" cid="qrcode1" ref="qrcode" :val="family.secretAid" :size="size" :unit="unit" :icon="icon"
				:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"
				@result="qrR" />
			<text>就诊卡号: {{family.a_Id}}</text>
		</view>
		<view class="body">
			<view class="open">
				<text>就诊人信息</text>
				<image @click="clickEye" :src="eyeFlag==true ? openEye : closeEye" mode=""></image>
			</view>
			<view class="detail">
				<view class="text1">真实姓名</view>
				<view class="text2">{{family.a_Name}}</view>
			</view>
			<view class="detail">
				<view class="text1">证件号</view>
				<view class="text2">{{family.a_IDCard}}</view>
			</view>
			<view class="detail">
				<view class="text1">就诊卡号</view>
				<view class="text2">{{family.a_Id}}</view>
			</view>
			<view class="detail">
				<view class="text1">性别</view>
				<view class="text2">{{family.a_Sex}}</view>
			</view>
			<view class="detail">
				<view class="text1">联系方式</view>
				<view class="text2">{{family.a_Phone}}</view>
			</view>
			<view class="detail">
				<view class="text1">家庭住址</view>
				<view class="text2">{{family.region}} {{family.detailRegion}}</view>
			</view>
		</view>

		<view class="delete">
			<view class="d1" @click="deletes">删除就诊人</view>
		</view>
		

		<slider-verify :isShow="sliderVerifyFLag" @touchSliderResult="verifyResult" ref="verifyElement"></slider-verify>

		
	</view>
</template>

<script>
	import sliderVerify from '@/components/slider-verify/slider-verify.vue';
	import {
		AskerServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	import {
		randomNum
	} from '../common/utils.js'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {
		decrypt
	} from '../../pages/common/utils.js'
	export default {
		components: {
			tkiQrcode,
			sliderVerify
		},
		data(){
			return {
				fId:'',
				family:{},
				size: 250, // 二维码大小
				val: '', // 要生成的二维码值
				unit: 'upx', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '',// 二维码生成后的图片地址或base64
				eyeFlag:false,
				closeEye:'../../static/images/closeEye.png',
				openEye:'../../static/images/openEye.png',
				sliderVerifyFLag: false,
				desensFamily:{},
				secretFamily:{}
			}
		},
		onLoad(options) {
			this.fId = options.fId
			// this.fId = '2023030606'
			this.getDesensFamily(this.fId )
		},
		
		methods:{
			deletes(){
				var data = {
					aId: this.fId,
					FLAG: 'D'
				}
				uni.showModal({
					title: '提示',
					content: '确认删除该就诊人信息吗？',
					success: function(res) {
						if (res.confirm) {
							//成功时回调函数
							api.post(AskerServlet, data).then(res => {
								uni.redirectTo({
									url: '../family/listFamily'
								});
							}).catch(err => {
								//失败时回调函数
							})
						} else if (res.cancel) {
							console.log("取消")
							// uni.redirectTo({
							// 	url: '../family/listFamily'
							// });
						}
					}
				})
			},
			qrR(res) {
				this.src = res
				console.log("====this.src=====",this.src);
			},
			// 滑块验证结果回调函数
			verifyResult(res) {
				this.sliderVerifyFLag = false;
				if (res) {  //校验通过
					this.eyeFlag = true
					this.sliderVerifyFLag = false;
					this.getSecretFamily(this.fId)
				}else{
					this.eyeFlag = false
					this.getDesensFamily(this.fId)
					// console.log("3333");
					// 校验失败,点击关闭按钮
				}
			},
			clickEye(){
				if(this.eyeFlag ==false){
					this.eyeFlag = true
					this.sliderVerifyFLag = true
					this.getSecretFamily(this.fId)					
				}else {
					this.eyeFlag = false
					this.sliderVerifyFLag = false
					this.getDesensFamily(this.fId)
				}
			},
			getDesensFamily(fId){
				let currArr = uni.getStorageSync("family_list")
				this.family = currArr.filter(item=>{
					return item.secretAid == fId
				})[0]
				console.log("===getDesensFamily===",this.family)
			},
			getSecretFamily(fId){
				var data = {
					openId: uni.getStorageSync('openid'),
					fId:fId,
					FLAG: 'R',
					type:'getSecretFamily'
				}
				api.post(AskerServlet, data).then(res => {
					//成功时回调函数 
					// console.log(res)
					let curArr = res
					for(let i =0;i<curArr.length;i++){
						curArr[i].openId = decrypt(curArr[i].openId)
						curArr[i].a_Id = decrypt(curArr[i].a_Id)
						curArr[i].a_IDCard = decrypt(curArr[i].a_IDCard)
						curArr[i].a_Name = decrypt(curArr[i].a_Name)
						curArr[i].a_Phone = decrypt(curArr[i].a_Phone)
					}
					console.log("====getSecretFamily====",curArr)
					// uni.setStorageSync('family_list', curArr)
					this.family = curArr[0]
				}).catch(err => {
					//失败时回调函数
				})
			}
		}
	}
</script>

<style scoped>
	.detailFamily {
		background-color:#f6f3f3;
		height: 100%;
		width: 100%;
	}
	.header {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 20px 0;
		background-color: white;
	}
	.body .open {
		padding: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #8a8a8a;
	}
	.body .open image{
		width: 27px;
		height: 27px;
		padding-left: 10px;
	}
	.body .detail{
		padding: 10px;
		margin-bottom: 1px;
		border-bottom: 1px solid #f6f3f3;
		display: flex;
		flex-direction: row;
		background-color: white;
	}
	.body .detail .text1{
		width: 20%;
		font-size: 15px;
		color: #8a8a8a;
	}
	.body .detail .text2{
		display: flex;
		width: 80%;
		font-size: 15px;
		color: #515151;
		justify-content: flex-start;
	}
	.delete {
		height: 80px;
	}
	.delete .d1 {
		margin: 20px;
		padding: 10px;
		border-radius: 10px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1aaba8;
		font-size: 13px;
	}
</style>