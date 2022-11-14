<template>
	<view>
		<!-- 输入要绑定的手机号 -->
		<view v-if="verifyCode==false">
			<view class="textphone">
				<text>绑定关联手机号</text>
			</view>
			<view class="phone">
				<view class="choseCountry">
					<text>+86</text>
					<image src="../../../static/images/up.png" mode=""></image>
				</view>
				<view class="inputPhone">
					<input  type="text" :value="phoneNumber" placeholder="请输入手机号" @input="inputPhone" />
					<image v-if="markPhone==true" src="../../../static/images/error.png" mode="" @click="vauleEmpty" ></image>
				</view>
			</view>
			<view class="Next" :style="markPhone==true?'background-color: #0AF920;color: white;':''" @click="toVerifyCode">
				<text>下一步</text>
			</view>
		</view>
		<!-- 输入验证码 -->
		<view v-if="verifyCode==true">
			<view class="textCode">
				<text>输入短信验证码</text>
				<text style="font-size: 25rpx;color: #9A9696;">已经向你的手机6886 发送验证码</text>
			</view>
			<view class="txtInput">
				<input type="text" value="" placeholder="请输入验证码" @input="codeInput" />
				<view class="repeatSend"><text>重新发送(54秒)</text></view>
			</view>
			<view @click="toTxtNext" class="txtNext" :style="markCode==true?'background-color:#00FFFF;color: white;':''">
				<text>下一步</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		userServlet
	} from '../../common/api.js'
	import api from '../../common/request.js'
	var util = require('../../common/util.js');
	export default {
		data() {
			return {
				markPhone:'',
				markCode:false,
				phoneNumber:'',
				verifyCode:false,
				code: "", //获取当前输入的验证码
				iscode: "",//获取手机接受的验证码 
				nickName:'',
				avatarUrl:''
				
			}
		},
		onLoad(options) {
			this.nickName=options.nickName
			this.avatarUrl=options.avatarUrl
		},
		onShow() {
			// console.log("---------------l")
			// console.log(this.avatarUrl)
			// console.log("----------------")
		},
		methods: {
			// 手机号输入
			inputPhone:function(e){
				this.phoneNumber=e.detail.value
				if(e.detail.value==''){
					this.markPhone=false
				}else{
					this.markPhone=true
				}
			},
			vauleEmpty:function(){
				this.markPhone=false
				this.phoneNumber='';
			},
			toVerifyCode:function(){
				this.verifyCode=true
			},
			// 验证码输入
			codeInput:function(e){
				this.code=e.detail.value
				if(e.detail.value!=''){
					this.code=e.detail.value
					this.markCode=true
				}else{
					this.markCode=false
				}
			},
			toTxtNext:function(){
				var isCode='123456'
				if(this.code=isCode){
					var uEnvirn='MP-WEIXIN'
					var uFlag='weiixin'
					var registerTime = util.formatTime(new Date());
					var data1 = {
						FLAG:"C",
						openId: uni.getStorageSync('openid'),
						u_Password:'xxxx',
						// session_key:getApp().globalData.session_key,
						u_Name: this.nickName,
						u_Img: this.avatarUrl,
						uRegisterTime: registerTime,
						uEnvirn:uEnvirn,
						uFlag:uFlag,
						u_Phone:this.phoneNumber
					}
					
					//插入登录的用户的相关信息到数据库
					api.post(userServlet, data1).then(res => {
						//成功时回调函数
						uni.setStorageSync('WeChatUserInfo', data1)
						uni.setStorageSync('LoginIndex', 1)
						uni.switchTab({
							url: '../../index/index',
						})
						//授权成功后，跳转进入小程序首页
					}).catch(err => {
						//失败时回调函数
						// 
					})
				}else{
					uni.showToast({
						title: '验证码输入错误',
						icon: 'none',
						duration: 1000
					})
				}
			}
		}
	}
</script>

<style>
	/* 手机号验证 */
.textphone,.textCode{
	margin: 50rpx 40rpx;
}
.textphone,.textCode text{
	font-size: 50rpx;
}
.phone{
	display: flex;
	flex-direction: row;
	/* justify-content: center; */
	align-items: center;
	border-bottom: 1rpx solid #F2F2F2;
	padding-bottom: 30rpx;
	margin: 0rpx 40rpx;
	/* background-color: #C8C7CC; */
}
.phone .choseCountry{
	display: flex;
	flex-direction: row;
	/* margin-left: 40rpx; */
	justify-content: center;align-items: center;
}
.phone .choseCountry image{
	width:20rpx;
	height: 20rpx;
	margin-left: 10rpx;
	
}
.phone .inputPhone{
	display: flex;
	flex-direction: row;
	
}
.phone .inputPhone input{
	margin-left: 40rpx;
}
.phone .inputPhone image{
	width:34rpx;
	height: 30rpx;
	margin-left: 250rpx;
}
.Next{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 15rpx 0rpx;
	background-color: #C8C7CC;
	color: white;
	margin: 50rpx 50rpx;
	font-size: 35rpx;
	font-weight: bold;
}
/* 验证码验证 */
.textCode{
	display: flex;
	flex-direction: column;
}
.txtInput{
	margin: 0rpx 40rpx;
}
.txtInput input{
	border: 1rpx solid #DDDDDD;
	padding: 20rpx 20rpx;
}
.txtInput .repeatSend{
	margin-top:20rpx;
	display: flex;
	justify-content: center;
	font-size: 27rpx;
	color:#AAA9A9 ;
}
.txtNext{
	width:600rpx;
	background-color: #C8C7CC;
	color:#E0E0E0;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 60rpx;
	margin-top: 20rpx;
	padding: 20rpx 0rpx;
	
}
</style>
