<template>
	<view class="page">
		<view class="logo" @click="chooseImage">
			<image :src="avatarUrl" mode=""></image>
		</view>
		<!-- 填写区 -->
		<view class="input-info">

			<view class="info">
				<input type="tel" maxlength="11" placeholder="手机号" @input="getNumber">
				<view class="more">
				</view>
			</view>

			<view class="info">
				<input type="tel" maxlength="6" placeholder="请输入验证码" @input="inputCode">

				<view class="more" :style="markPhone?'background-color: #FC603A;color:white':''" @click="getCode" style="background-color: #DDDDDD;color:#9D9D9D">
					<text class="mo">{{ c2 || '发送验证码' }}</text>
				</view>
			</view>

			<view class="info">
				<input type="password" maxlength="26" placeholder="请输入密码" @input="inputPassword">
				<view class="more" style="width:55% ;">
					<text class="iconfont" :class="isPassword?'icon-eye-on':'icon-eye-off'" @click="isPassword = !isPassword"></text>
				</view>
			</view>
			<!-- <view class="info" style="padding: 0rpx;height:60rpx"> -->
			<view class="info" style="padding: 0rpx;height:60rpx" v-if="markPassword==true">
				<view class="more" style="width:100%;justify-content: flex-start;">
					<tr>
						<td style="margin: 0rpx;color:#9D9D9D;font-size: 20rpx;">密码强度:</td>
						<td :style="{'background-color':Lcolor}">数字</td>
						<td :style="{'background-color':Mcolor}">大写</td>
						<td :style="{'background-color':Hcolor}">小写</td>
					</tr>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="btn-info">
			<view class="btn" :style="markPhone&&markCode&&markPassword?'background-color: #FC603A;color:white':''" @click="register"
			 style="background-color: #DDDDDD;color:#9D9D9D">
				<text>注册</text>
			</view>
		</view>
		<!-- 操作 -->
		<view class="operation">
			<text></text>
			<text @click="onLogin">已有账号?登录</text>
		</view>
	</view>
</template>

<script>
	import {
		$wuxCountDown
	} from '../../components/index'
	var zhenzisms = require('../common/zhenzisms.js')
	import {
		// WechatUserInsert,
		// WechatUserQuery
		userServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	var util = require('../common/util.js');
	export default {
		data() {
			return {
				isPassword: false,
				isRegister: false,
				markPhone: false,
				markCode: false,
				markPassword: false,
				Password: '',
				phoneNumber: "", //获取当前输入的是手机号
				code: "", //获取当前输入的验证码
				iscode: "", //获取手机接受的验证码 
				avatarUrl: "../../static/images/logo.png",
				mark: false,
				Dfault_color: '', //默认颜色
				Lcolor: '', //低强度的颜色，且只显示在最左边的单元格中  
				Mcolor: '', //中等强度的颜色，且只显示在左边两个单元格中  
				Hcolor: ''
			};
		},
		methods: {
			onLogin() {
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			chooseImage: function() {
				this.active = false
				var that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						var tempFilePaths = res.tempFilePaths[0]
						that.avatarUrl = tempFilePaths
						uni.uploadFile({
							url: 'http://47.102.124.213/MTWMPro/uploadFiles',
							filePath: that.avatarUrl,
							name: 'file',
							formData: {
								user: 'test'
							},
							success(res) {
								var data = res.data
								that.avatarUrl = data
							}
						})
					}
				})
			},
			//判断输入密码的类型    
			CharMode: function(iN) {
				if (iN >= 48 && iN <= 57) //数字    
					return 1;
				if (iN >= 65 && iN <= 90) //大写    
					return 2;
				if (iN >= 97 && iN <= 122) //小写    
					return 4;
				else
					return 8;
			},
			//bitTotal函数    
			//计算密码模式    
			bitTotal: function(num) {
				var modes = 0;
				for (var i = 0; i < 4; i++) {
					if (num && 1) modes++;
					num >>>= 1;
				}
				return modes;
			},
			//返回强度级别    
			checkStrong: function(sPW) {
				// console.log(sPW.length)
				if (sPW.length < 6)
					return 0; //密码太短，不检测级别  
				var Modes = 0;
				for (var i = 0; i < sPW.length; i++) {
					//密码模式    
					Modes |= this.CharMode(sPW.charCodeAt(i));
					// console.log(Modes)
				}
				return this.bitTotal(Modes);
			},
			//显示颜色    
			pwStrength: function(pwd) {
				var tempDfault_color = "#9D9D9D"; //默认颜色  
				var tempL_color = "#FF0000"; //低强度的颜色，且只显示在最左边的单元格中          数字
				var tempM_color = "#FF9900"; //中等强度的颜色，且只显示在左边两个单元格中        大写字母
				var tempH_color = "#33CC00"; //高强度的颜色，三个单元格都显示  
				if (pwd == null || pwd == '') {
					this.Lcolor = this.Mcolor = this.Hcolor = tempDfault_color
				} else {
					var S_level = this.checkStrong(pwd);
					// console.log(S_level)
					switch (S_level) {
						case 0: //特殊情况三者皆不存在
							this.Lcolor = this.Mcolor = this.Hcolor = tempDfault_color
							break;
						case 1: //只有数字
							this.Lcolor = tempL_color
							this.Mcolor = tempDfault_color
							this.Hcolor = tempDfault_color
							break;
						case 2: //数字和大写字母
							this.Lcolor = tempL_color
							this.Mcolor = tempM_color
							this.Hcolor = tempDfault_color
							// this.Lcolor = this.Mcolor = tempM_color
							// this.Hcolor = tempDfault_color
							break;
						case 3: //数字和大写字母和小写字母
							this.Lcolor = tempL_color
							this.Mcolor = tempM_color
							this.Hcolor = tempH_color
							// this.Lcolor = this.Mcolor = tempM_color
							// this.Hcolor = tempDfault_color
							break;
						default: //数字和大写字母和小写字母
							console.log('xxxxxxxxxxxxxxxxx')
							this.Lcolor = tempL_color
							this.Mcolor = tempM_color
							this.Hcolor = tempH_color
					}
				}
			},
			inputPassword: function(e) {
				var myPassword = e.detail.value; //从页面获取到用户输入的验证码
				this.Password = myPassword
				if (myPassword != '' && myPassword.length >= 6) {
					this.pwStrength(myPassword)
					this.Password = myPassword
					this.markPassword = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markPassword = false //把获取到的密码赋值给全局变量Date中的password
				}
				// this.pwStrength(e.detail.value)
			},
			//处理code的触发事件
			inputCode: function(e) {
				var myCode = e.detail.value; //从页面获取到用户输入的验证码
				this.code = myCode
				if (myCode != '' && myCode.length >= 4) {
					this.code = myCode
					this.markCode = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markCode = false //把获取到的密码赋值给全局变量Date中的password
				}
				// console.log("验证码" + myCode)
			},
			//处理phoneNumber的触发事件
			getNumber: function(e) {
				var myPhoneNumber = e.detail.value; //从页面获取到用户输入的用户名/邮箱/手机号
				this.phoneNumber = myPhoneNumber
				if (myPhoneNumber != '' && myPhoneNumber.length >= 11) {
					this.markPhone = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markPhone = false //把获取到的密码赋值给全局变量Date中的password
				}
			},
			//触发获取验证码功能
			getCode(e) {
				var that = this;
				var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
				var currentPhone = this.phoneNumber;
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
					var locaCode = "";
					for (var i = 0; i < 6; i++) {
						locaCode += Math.floor(Math.random() * 10);
					}
					this.isCode = locaCode
					console.log(this.isCode)
					that.timer()
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
				var myPwd = /^[a-zA-Z]\w{5,17}$/; //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
				var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
				//验证手机号
				if (this.phoneNumber == "") {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else if (!myreg.test(this.phoneNumber)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 1000
					})
					return false;
				} else if (this.code == "") {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else if (this.code != this.isCode) {
					uni.showToast({
						title: '验证码输入错误',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else if (this.Password == "") {
					uni.showToast({
						title: '密码不能为空',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else if (!myPwd.test(this.Password)) {
					uni.showToast({
						title: '密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else {

					return true;
				}
			},
			//处理login的触发事件
			register: function(e) {
				var uEnvirn = 'MP-WEIXIN'
				var uFlag = "weixin"
				var registerTime = util.formatTime(new Date());
				var data = {
					FLAG:"C",
					openId: this.phoneNumber,
					u_Password: this.Password,
					u_Name: this.phoneNumber,
					u_Img: this.avatarUrl,
					uRegisterTime: registerTime,
					uEnvirn: uEnvirn,
					uFlag: uFlag,
					phone:this.phoneNumber
				}
				if (this.check()) {
					api.post(userServlet, data).then(res => {
						console.log(typeof(res))
						console.log(res==false)
						if(res==false){
							uni.showToast({
								title: '存在该用户',
								icon: 'none',
								duration: 2000
							})
						}
						if(res==true){
							uni.showToast({
								title: '用户注册成功',
								icon: 'success',
								duration: 2000
							})
							setTimeout(function() {
								uni.navigateTo({
									url: '../login/login'
								})
							}, 2000)
						}
				
					}).catch(err => {
						//失败时回调函数
						console.log(err)
					})

				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import 'register.scss';

	.codeActive {
		background-color: rgb(247, 212, 14);
		color: white
	}

	// .loginActive{
	//   background-color: rgb(247, 212, 14);
	//   color:white
	// }
</style>
