<template>
	<view class="main">
		<!-- 登录上方菜单栏 -->
		<view class="loginTop">
			<view class="loginTopCode" v-if="loginMode == 1" @click="loginCode">验证码登录</view>
			<view class="loginTopCode" v-else-if="loginMode == 2" @click="loginPhone">账号密码登录</view>
		</view>
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="logoImgBox">
				<image :src="loginImage" mode="" style="width:600rpx;height:350rpx;"></image>
			</view>
			<view class="loginInptu">
				<input type="text" v-if="loginMode == 1" @blur="phonecheck" class="username" value="" placeholder="请输入手机号" maxlength="11"
					@input="phoneInput" />
				<input type="number" v-else-if="loginMode == 2" class="username" :focus="focus" value="" placeholder="请输入手机号"
					maxlength="11" @input="phoneInput" />
			</view>
			<view class="loginInptu" v-if="loginMode == 1">
				<input :type="seen ? type_text : type_password" class="password" v-model="password" value="" placeholder="请输入密码"
					maxlength="16" />
				<view v-show='seen' @click="changeSeen" class="passwordType">
					<image src="../../static/images/openEyes.png" class="passwordType-image" />
				</view>
				<view v-show='!seen' @click="changeSeen" class="passwordType">
					<image src="../../static/images/closeEyes.png" class="passwordType-image" style="width:80rpx" />
				</view>
			</view>
			<view class="loginInptu loginInptuCode" v-else-if="loginMode == 2">
				<input type="text" class="code" value="" placeholder="请输入验证码" maxlength="6" @input="codeInput" />
				<view class="huoquyanzhengma" :style="markPhone?'background-color: #FC603A;color:white':''"
					@click="getCode">
					<text class="mo">{{ c2 || '获取验证码' }}</text>
				</view>
			</view>
			<view class="loginUp" @click="loginUp">
				<image src="../../static/images/denglu.png" mode="" style="width:100rpx;height:100rpx;"></image>
			</view>
		</view>
		<!-- 其他登录方式 -->
		<view class="otherLoginTitle">————————其他登录方式————————</view>
		<view class="otherLogin">
			<!--#ifdef APP-PLUS-->
			<view class="weiixnLogin" @click="login_weixin(1)">
				<image src="../../static/images/weixin.png" mode="" style="width:100rpx;height:100rpx;"></image>
			</view>
			<view class="qqLogin" @click="login_qq(2)">
				<image src="../../static/images/QQ.png" mode="" style="width:100rpx;height:100rpx;"></image>
			</view>
			<view class="weiboLogin" @click="weibologin(3)">
				<image src="../../static/images/weibo.png" mode="" style="width:100rpx;height:100rpx;"></image>
			</view>
			<!--#endif-->
			<!--#ifdef MP-WEIXIN-->
			<view class="weiixnLogins" @click="login_weixin">
				<image src="../../static/images/weixin.png" mode="" style="width:100rpx;height:100rpx;"></image>
			</view>
			<!--#endif-->
		</view>

		<!-- 忘记密码/新用户注册 -->
		<view class="bottomBox">
			<view class="wangjimima" @click="forget">忘记密码</view>
			<view class="yonghuzhuce" @click="register">用户注册</view>
		</view>
	</view>
</template>

<script>
	import {
		$wuxCountDown
	} from '../../components/index'
	var zhenzisms = require('../common/zhenzisms.js')
	import {
		GetCollectHospitalByOpenid,
		GetCollectDoctorByOpenid,
		CollectionServlet,
		// WechatUserQuery
		userServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	export default {
		data() {
			return {
				loginMode: 1,
				usernameType: "text",
				codeBut: "获取验证码",
				loginImage: "../../static/images/logo.png",
				markPhone: false,
				markCode: false,
				phone: "",
				password: "",
				code: "", //获取当前输入的验证码
				iscode: "", //获取手机接受的验证码 
				markCode: false,
				seen: false,
				type_text: "text",
				type_password: "password",
				focus:true,
			}
		},
		onLoad() {

		},
		methods: {
			forget(){
				uni.navigateTo({
					url: '../forget/forget?phone=' + this.phone
				})
			},
			register: function() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			GetCollectHospitalByOpenid: function(openId) {
				var data = {
					FLAG: 'R',
					collectionType: 'Hospital',
					openId: openId
				}
				api.post(CollectionServlet, data).then(res => {
					//成功时回调函数
					let arrCHospital = []
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
					}
					uni.setStorageSync('collectHospitals', arrCHospital)
					console.log("=======loginCollections========", arrCHospital);
				}).catch(err => {
					//失败时回调函数
				})
			},
			GetCollectDoctorByOpenid: function(openId) {
				var data = {
					FLAG: 'R',
					collectionType: 'Doctor',
					openId: openId
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
					uni.setStorageSync("collectDoctors", arrCDoctor)
					console.log("=======loginCollections========", arrCDoctor);
				}).catch(err => {
					//失败时回调函数
				})
			},
			loginCode() {
				this.loginMode = 2
				this.usernameType = "number"
			},
			loginPhone() {
				this.loginMode = 1
				this.usernameType = "text"
			},
			// 手机号输入
			phoneInput(e) {
				// this.phone = e.detail.value
				var myPhoneNumber = e.detail.value; //从页面获取到用户输入的用户名/邮箱/手机号
				this.phone = myPhoneNumber
				if (myPhoneNumber != '' && myPhoneNumber.length >= 11) {
					this.markPhone = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markPhone = false //把获取到的密码赋值给全局变量Date中的password
				}
				// console.log(e.detail.value)
			},
			changeSeen: function() {
				this.seen = !this.seen;
			},
			// 验证码输入
			codeInput(e) {
				var myCode = e.detail.value; //从页面获取到用户输入的验证码
				this.code = myCode
				if (myCode != '' && myCode.length >= 4) {
					this.code = myCode
					this.markCode = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markCode = false //把获取到的密码赋值给全局变量Date中的password
				}
				// this.code = e.detail.value
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
					console.log("==322222==",status=="200");
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
							title: "系统异常1",
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {
					uni.showToast({
						title: "系统异常2",
						icon: 'none',
						duration: 1000
					});
				})
			},
			//触发获取验证码功能
			async getCode(e) {
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
					// }, currentPhone, '海隆网' + this.iscode + '(登录验证码。工作人员不会向你索要，请勿向任何人透露，以免造成账户或资金损失您的验证码为。')
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
			phonecheck(){
				var data = {
					uEnvirn: 'MP-WEIXIN',
					openId: this.phone,
					FLAG: "CheckPhone"
				}
				api.post(userServlet, data).then(res => {
					//成功时回调函数
					console.log("=====",res);
					if (res==false){
						uni.showToast({
							title: '手机号未注册',
							icon: 'none',
							duration: 2000
						});
						this.focus = true
					} else {
			
					}
				}).catch(err => {
					uni.showToast({
						title: '登录失败',
						icon: 'none',
						duration: 1000
					});
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
			// 点击登录
			loginUp: function() {
				//这里请求接口
				if(this.loginMode=="1"){
					this.phonePasLogin()
				}else {
					this.phoneCodLogin()
				}
			},
			// 验证码登录
			phoneCodLogin(){
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
						let status = res.split('*')[0];
						let message = res.split('*')[1];
						let user = res.split('*')[2];
						let json = JSON.parse(user)  //json字符串转json对象
						uni.setStorageSync('LoginIndex', 1)
						uni.setStorageSync('WeChatUserInfo', json)
						uni.setStorageSync('openid', this.phone)
						// console.log("==json对象==",json);
						// console.log("==User数组==",user.split(''));
						// console.log("==status==",status);
						// console.log("==message==",message);
						//成功时回调函数
						if(status =='200'){
							this.GetCollectHospitalByOpenid(this.phone)
							this.GetCollectDoctorByOpenid(this.phone)
							uni.showToast({
								title: '登录成功',
								icon: 'none',
								duration: 2000
							});
							setTimeout(function() {
								uni.switchTab({
									url: '../index/index'
								})
							}, 2000)
						}else{
							uni.showToast({
								title: message,
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 1000
						});
					})
				}
			},
			// 手机账号密码登录
			phonePasLogin(){
				var data = {
					uEnvirn: 'MP-WEIXIN',
					openId: this.phone,
					FLAG: "R"
				}
				if (this.check()) {
					api.post(userServlet, data).then(res => {
						//成功时回调函数
						console.log("=====dsdsds====",res);
						uni.setStorageSync('LoginIndex', 1)
						uni.setStorageSync('WeChatUserInfo', res)
						uni.setStorageSync('openid', this.phone)
						if (res.open_Id == this.phone && res.u_Password == this.password) {
							this.GetCollectHospitalByOpenid(this.phone)
							this.GetCollectDoctorByOpenid(this.phone)
							uni.showToast({
								title: '登录成功',
								icon: 'none',
								duration: 2000
							});
							setTimeout(function() {
								uni.switchTab({
									url: '../index/index'
								})
							}, 2000)
						} else {
							uni.showToast({
								title: '用户名或密码错误',
								icon: 'none',
								duration: 1000
							});
						}
					}).catch(err => {
						uni.showToast({
							title: '登录失败',
							icon: 'none',
							duration: 1000
						});
					})
				}
			},
			// 获取验证码

			//QQ登录
			//#ifdef APP-PLUS
			login_qq: function(e) {
				console.log('-------------------------------------------')
				let _this = this;
				uni.login({
					provider: 'qq',
					success: function(loginRes) {
						console.log(loginRes)
						// 获取用户信息
						uni.getUserInfo({
							provider: 'qq',
							success: function(infoRes) {
								console.log(infoRes)
								// _this.other_login(loginRes, infoRes, 'qq')
							}
						});
					}
				});
			},
			//#endif
			//微信登录
			//#ifdef APP-PLUS
			login_weixin: function(e) {
				var that = this
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						// console.log(loginRes)
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								// console.log(infoRes)
								uni.setStorageSync('openid', infoRes.userInfo.openId)
								uni.setStorageSync('WeChatUserInfo', infoRes.userInfo)
								that.GetCollectHospitalByOpenid(infoRes.userInfo.openId)
								that.GetCollectDoctorByOpenid(infoRes.userInfo.openId)
								uni.setStorageSync('LoginIndex', e)
								uni.navigateTo({
									url: '../WechatLogin/WechatLogin'
								})
							}
						});
					}
				});
			},
			//#endif

			//#ifdef MP-WEIXIN	
			login_weixin: function() {
				// uni.clearStorage()
				// uni.removeStorageSync('WeChatUserInfo')
				// uni.removeStorageSync('LoginIndex')
				// uni.removeStorageSync('openid')
				// console.log('-----------login------------------------')
				// console.log(uni.getStorageSync('openid'))
				// // console.log(uni.getSystemInfoSync().platform)
				// console.log('------------login-----------------------')
				var that = this
				uni.login({
					success: res => {
						uni.request({
							url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc15c4fcf719eb5a3&secret=4ca91306643d90b167038c49bdb4d33f&js_code=' +
								res.code + '&grant_type=authorization_code',
							data: {
								text: 'uni.request'
							},
							header: {
								'custom-header': 'hello' //自定义请求头信息
							},
							success: res => {
								// console.log('-----------login1------------------------')
								// console.log(res.data.openid)
								// // console.log(uni.getSystemInfoSync().platform)
								// console.log('------------login1-----------------------')
								uni.setStorageSync('openid', res.data.openid)
								// that.GetCollectHospitalByOpenid(res.data.openid)
								// that.GetCollectDoctorByOpenid(res.data.openid)
								uni.navigateTo({
									url: '../WechatLogin/WechatLogin'
								})
								// uni.navigateTo({
								// 	url:'../WechatLogin/WechatLogin?openid='+res.data.openid
								// })	
							}
						});
					}
				})
				// uni.navigateTo({
				// 	url:'../WechatLogin/WechatLogin?openid='+uni.getStorageSync("openid")
				// })	 
			}
			// #endif	
			// #ifdef APP-PLUS
			// 微博登录
			weibologin: function(e) {
				var that = this
				uni.login({
					provider: "sinaweibo",
					success: function(loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: 'sinaweibo',
							success: function(infoRes) {
								console.log(infoRes)
								// that.GetCollectHospitalByOpenid(res.data.openid)
								// that.GetCollectDoctorByOpenid(res.data.openid)
								// _this.other_login(loginRes, infoRes, 'wx');
							}
						});
					}
				})
			}
			// #endif
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

	.loginTop {
		width: 100%;
		color: #E64340;
		box-sizing: border-box;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bolder;
		margin: 0 auto;
		height: 20upx;
		line-height: 40upx;
		display: flex;
		justify-content: flex-end;
		font-size: 36upx;
		padding: 30rpx;
		padding-right: 50rpx;
		/* background-color: #0081FF; */
	}

	.loginTopBack {
		width: 35upx;
		height: 35upx;
	}

	.loginUp {
		width: 100upx;
		height: 100upx;
		margin: 0 auto;
		padding: 15upx;
		border: 1upx solid #333333;
		border-radius: 60upx;
		margin-top: 60upx;
		background: #333333;
	}

	.code {
		background: url(../../static/images/code.png)no-repeat;
		background-position: 10upx;
		padding-left: 65upx;
		width: 300upx;
		background-size: 58upx;
	}

	.huoquyanzhengma {
		background: #333333;
		color: #fff;
		line-height: 85upx;
		width: 200upx;
		text-align: center;
		border-radius: 10upx;
	}

	.loginBox {
		width: 650upx;
		margin: 30upx auto;
	}

	.username {
		background: url(../../static/images/shouji.png)no-repeat;
		background-position: 10upx;
		padding-left: 70upx;
		width: 380rpx
	}

	.password {
		background: url(../../static/images/mima.png)no-repeat;
		background-position: 5upx;
		padding-left: 70upx;
		width: 380rpx
	}

	.passwordType {
		display: flex;
		position: relative;
		left: 15rpx;
		align-items: center;
	}

	.passwordType-image {
		width: 80rpx;
		height: 60rpx;
		/* margin-left: 20rpx; */
	}

	.loginInptu {
		width: 540upx;
		height: 80upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		/* margin: 0 auto; */
		background: #fff;
		margin-top: 20upx;
		line-height: 80upx;
		border-radius: 10upx;
		margin-left: 100rpx;
	}

	.loginInptuCode {
		display: flex;
	}

	.loginInptu>input {
		height: 100%;
		font-size: 30upx;
		background-color: #EEEEEE;
	}

	.logoImgBox {
		width: 700upx;
		height: 350upx;
		/* margin: 0 auto; */
		/* margin-bottom: 50upx; */
	}

	.otherLogin {
		width: 500upx;
		height: 95upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.otherLogin>view {
		width: 95upx;
		height: 95upx;
		background: #fff;
		border-radius: 95upx;
	}

	.otherLoginTitle {
		width: 100%;
		text-align: center;
		color: #555555;
		font-size: 28upx;
		line-height: 80upx;
	}

	.bottomBox {
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 60upx;
		left: 0;
		right: 0;
		margin: auto;
		height: 30upx;
		line-height: 30upx;
		font-size: 32upx;
	}

	.wangjimima {
		border-right: 1rpx solid #555;
		height: 25upx;
		padding-right: 15upx;
	}

	.yonghuzhuce {
		padding-left: 15upx;
	}

	.weiixnLogins {
		margin-left: 200rpx;
	}
</style>
