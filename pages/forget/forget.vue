<template>
	<view class="main">
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginInptu">
				<input type="text" v-model="phone" class="username" placeholder="请输入手机号" value=""/>
				<view class="huoquyanzhengma" @click="getCode">
					<text class="mo">{{ c2 || '获取验证码' }}</text>
				</view>
			</view>
			<view class="loginInptu">
				<input type="text" class="code"  v-model="code" value="" placeholder="请输入验证码" maxlength="6" />
			</view>
			<button class="loginUp" @click="validateCode">验证</button>
		</view>
	</view>
</template>

<script>
	import {
		$wuxCountDown
	} from '../../components/index'
	var zhenzisms = require('../common/zhenzisms.js')
	import {
		userServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	export default {
		data() {
			return {
				usernameType: "text",
				codeBut: "获取验证码",
				phone: "18861815669",
				password: "",
				code: "", //获取当前输入的验证码
				iscode: "", //获取手机接受的验证码 
				seen: false,
				type_text: "text",
				type_password: "password",
				// c2:''
			}
		},
		onLoad(e) {
			this.phone = e.phone
		},
		methods: {	
			changeSeen: function() {
				this.seen = !this.seen;
			},
			async sendCode(code){
					console.log("xxxxxx",code)
					this.timer()
					// zhenzisms.client.init('https://sms_developer.zhenzikj.com', '101155', '7acd8ebc-d61f-45f7-9382-64817f679202');
					// zhenzisms.client.send(function(res) {
					// 	if (res.data.code == 0) {
					// 		that.timer()
					// 		return;
					// 	}
					// 	uni.showToast({
					// 		title: res.data.data,
					// 		icon: 'none',
					// 		duration: 2000
					// 	})
					// }, currentPhone, '海隆网' + locaCode + '(登录验证码。工作人员不会向你索要，请勿向任何人透露，以免造成账户或资金损失您的验证码为。')
			},
			// 申请验证码
			applyCode(){
				let that = this
				var data = {
					uEnvirn: 'MP-WEIXIN',
					openId: this.phone,
					FLAG: "applyCode"
				}
				api.post(userServlet, data).then(async res => {
					console.log("==验证码===",res);
					let status = res.split(',')[0];
					let code = res.split(',')[1];
					let message = res.split(',')[2];
					console.log("==status==",status);
					console.log("==code==",code);
					console.log("==message==",message);
					//成功时回调函数
					if(status =='200'){
						that.iscode = code;
						await that.sendCode(code);
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						})
					}else if(status =='201') {
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						})
					}else if(status =='202'){
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						})
					}else if(status =='203'){
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						})
					}else {
						uni.showToast({
							title: "系统异常",
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					uni.showToast({
						title: "系统异常",
						icon: 'none',
						duration: 1000
					});
				})
			},
			async getCode() {
				var that = this;
				var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
				var currentPhone = this.phone;
				
				if (currentPhone == "") {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 1000
					})
				} else if (!myreg.test(currentPhone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 1000
					})
				} else {
					await that.applyCode()
					// var locaCode = ''
					// for (var i = 0; i < 6; i++) {
					// 	locaCode += Math.floor(Math.random() * 10);
					// }
					// this.isCode = locaCode
					
					// console.log("xxxxxx",that.isCode)
					
					// that.timer()
					// zhenzisms.client.init('https://sms_developer.zhenzikj.com', '101155', '7acd8ebc-d61f-45f7-9382-64817f679202');
					// zhenzisms.client.send(function(res) {
					// 	if (res.data.code == 0) {
					// 		that.timer()
					// 		return;
					// 	}
					// 	uni.showToast({
					// 		title: res.data.data,
					// 		icon: 'none',
					// 		duration: 2000
					// 	})
					// }, currentPhone, '海隆网' + locaCode + '(登录验证码。工作人员不会向你索要，请勿向任何人透露，以免造成账户或资金损失您的验证码为。')
				}
			},
			timer: function() {
				if (this.c2 && this.c2.interval) return !1
				this.c2 = new $wuxCountDown({
					date: +(new Date) + 10000,
					onEnd() {
						this.setData({
							c2: '重新发送',
						})
					},
					render(date) {
						const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
						date.sec !== 0 && this.setData({
							c2: sec
						})
					},
				})
			},
			check: function() {
				var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
				//验证手机号
				if (this.phone == "") {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else if (!myreg.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 1000
					})
					return false;
				} else if (this.password == "" && this.loginMode == 1) {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else if (this.code == "" && this.loginMode == 2) {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else {
					return true;
				}
			},
			// 验证码校验
			validateCode: function() {
				//这里请求接口
				var data = {
					uEnvirn: 'MP-WEIXIN',
					openId: this.phone,
					code: this.code,
					FLAG: "validateCode"
				}
				console.log("======",data);
				if (this.check()) {
					api.post(userServlet, data).then(res => {
						console.log("===res===",res);
						let status = res.split(',')[0];
						let message = res.split(',')[1];
						console.log("==status==",status);
						console.log("==message==",message);
						//成功时回调函数
						if(status =='200'){
							uni.showToast({
								title: message,
								icon: 'none',
								dubration: 2000
							})
							uni.navigateTo({
								url:"./pasword?phone="+this.phone
							})
						}else{
							uni.showToast({
								title: message,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						// uni.showToast({
						// 	title: '登录失败',
						// 	icon: 'none',
						// 	duration: 1000
						// });
					})
				}
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.main {
		/* background:white; */
		width: 100%;
		height: 100%;
	}

	.mainHead {
		height: var(--status-bar-height);
	}

	.loginUp {
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 60rpx;
		background: linear-gradient(to right, rgba(255, 231, 21, 0.8), rgba(255, 193, 7, 0.8));
		color: #FFFFFF;
		border-radius: 100rpx;
		justify-content: center;
		/* color: white; */
		font-weight: bolder;
	}

	.code {
		background: url(../../static/images/code.png)no-repeat;
		background-position: 30rpx;
		padding-left: 100rpx;
		width: 52%;
		background-size: 58rpx;
		border-radius: 60rpx;
	}

	.huoquyanzhengma {
		color: #797676;
		/* line-height: 75rpx; */
		font-weight: bolder;
		width: 200rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.loginBox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 50rpx;
	}

	.username {
		background: url(../../static/images/shouji.png)no-repeat;
		background-position: 30rpx;
		padding-left: 100rpx;
		width: 50%;
		border-radius: 60rpx;
	}

	.password {
		background: url(../../static/images/mima.png)no-repeat;
		background-position: 30rpx;
		padding-left: 100rpx;
		width: 100%;
		border-radius: 60rpx;

	}

	.passwordType {
		display: flex;
		align-items: center;
		width: 100px;
		justify-content: space-around;
	}

	.passwordType-image {
		width: 60rpx;
		height: 60rpx;
	}

	.loginInptu {
		width: 100%;
		height: 120rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #EEEEEE;
		margin-top: 20rpx;
		line-height: 80rpx;
		border-radius: 60rpx;
		/* margin-left: 100rpx; */
	}

/* 	.loginInptuCode {
		display: flex;
	} */

	.loginInptu>input {
		height: 100%;
		font-size: 30rpx;
		background-color: #EEEEEE;
	}
</style>
