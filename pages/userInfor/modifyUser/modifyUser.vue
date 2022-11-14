<template>
	<view class="content">
		<!-- 修改用户名 -->
		<view class="modifyName" v-if="modifyFlag==1">
			<input type="text" placeholder="用户名" class="input" maxlength="10" @input="inputName" />
			<text style="font-size: 20rpx;color:#C8C7CC;padding: 20rpx 30rpx;">用户名只能修改1次(5~24个字)</text>
			<view class="conform" :style="markName==true?'background-color: #FC603A;color: white;':''" @click="conformName">确认修改</view>
		</view>

		<!-- 修改手机号验证码 -->
		<view class="modifPhone" v-if="modifyFlag==2&&!newModifyFlag==true">
		<!-- <view class="modifPhone" v-if="modifyFlag==2&&!newModifyFlag==false"> -->
			<view class="phone">
				<view class="phone-1">
					<text>手机号</text>
					<text style="margin-right: 100rpx;">{{infor}}</text>
				</view>
				<view class="getcode" @click="getCode">
					<text>{{ c2 || '获取验证码' }}</text>
				</view>
			</view>

			<view class="code">
				<text>验证码</text>
				<input type="text" @input="codeInput" placeholder="请输入验证码" class="input" />
			</view>

			<view class="conform" @click="conformCode" :class="markCode==true?'codeCheck':''">验证后绑定新手机</view>
		</view>

		<view class="modifPhone" v-if="modifyFlag==2&&newModifyFlag==true">
			<view class="code">
				<text>手机号</text>
				<input type="text" @input="newPhoneInput" placeholder="请输入新手机号" class="input" />
			</view>
			<view class="conform" @click="conformPhone" :class="markCode==true?'codeCheck':''">确认绑定新手机</view>
		</view>

		<!-- 修改密码 -->
		<view v-if="modifyFlag==3">
			<view class="password">
				<input type="password" placeholder="旧密码" @input="oldPwdChange" />
				<input type="password" placeholder="新密码" @input="newPwdChange" />
				<input type="password" placeholder="确认密码" @input="conformPwdChange" style="margin-bottom: 20rpx;" />
			</view>
			<view class="conform" :class="passwordCheck==true?'codeCheck':''" @click="conformPwds">确认并保存</view>
		</view>

	</view>
</template>

<script>
	import {
		// WechatUserUpdate,
		// WechatUserQuery
		userServlet
	} from '../../common/api.js'
	import api from '../../common/request.js'
	import {
		$wuxCountDown
	} from '../../../components/index'
	var zhenzisms = require('../../common/zhenzisms.js')
	export default {
		data() {
			return {
				userName: '',
				modifyFlag: 1,
				codeCheck: false,
				passwordCheck: true,
				newModifyFlag: false,
				infor: '',
				markPhone: false,
				markCode: false,
				markName: '',
				newPhone:'',
				code: "", //获取当前输入的验证码
				iscode: "" //获取手机接受的验证码 
			}
		},
		onLoad(options) {
			this.modifyFlag = options.modifyFlag
			this.infor = options.infor
			console.log(options.infor)
		},
		onShow() {

			// this.checkPwd(this.oldPwd,this.conformPwd)
		},
		methods: {
			//------------------------ 修改用户名-----------------------------
			inputName: function(e) {
				this.userName = e.detail.value
				// console.log(typeof(e.detail.value))
				if (e.detail.value == '' && e.detail.value.length == 0) {
					this.markName = false
				} else {
					this.markName = true
				}
			},
			conformName: function() {
				var inforType = 'uName'
				var inforMation = this.userName
				var message = "用户名修改成功"
				if (this.userName != '') {
					this.updateUser(inforType, inforMation, message)
					// this.queryUsreInfo()
					// uni.redirectTo({
					// 	url:'../userInfor?u_Name='+this.userName
					// })
				} else {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none',
						duration: 1000
					})
				}
			},
			//------------------------ 修改手机号-----------------------------
			// 验证码输入
			codeInput: function(e) {
				var myCode = e.detail.value; //从页面获取到用户输入的验证码
				// this.code = myCode
				if (myCode != '') {
					this.code = myCode
					this.markCode = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markCode = false //把获取到的密码赋值给全局变量Date中的password
				}
				// this.code = e.detail.value
			},
			//触发获取验证码功能
			getCode: function(e) {
				var that = this;
				var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
				var currentPhone = this.infor;
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
			checkCode: function() {
				if (this.code != this.isCode) {
					uni.showToast({
						title: '验证码输入错误',
						icon: 'none',
						duration: 2000
					})
					return false;
				} else {
					uni.showToast({
						title: '验证成功',
						icon: 'none',
						duration: 2000
					})
					return true;
				}
			},
			conformCode: function() {
				var inforType = "uPassword"
				// var inforMation=
				if (this.checkCode()) {
					this.newModifyFlag = true
					// this.updateUser(inforType,inforMation)
				} else {
					this.newModifyFlag = false
				}
			},
			newPhoneInput:function(e){
				var newPhone = e.detail.value//从页面获取到用户输入的验证码
				// this.code = myCode
				if (newPhone != '') {
					this.newPhone = newPhone
					this.markCode = true //把获取到的密码赋值给全局变量Date中的password
				} else {
					this.markCode = false //把获取到的密码赋值给全局变量Date中的password
				}
			},
			conformPhone:function(){
				var inforType = 'uPhone'
				var inforMation = this.newPhone
				var message = "手机号修改成功"
				this.updateUser(inforType,inforMation,message)
				// this.queryUsreInfo()
				uni.redirectTo({
					url:'../userInfor?u_Phone='+this.newPhone
				})
				// console.log(this.newPhone)
			},
			//------------------------ 修改密码-----------------------------
			checkPwd: function(pwd) {
				if (pwd == this.infor) {

				} else {
					uni.showToast({
						title: '旧密码输入错误,请重新输入',
						duration: 2000
					})
				}
			},
			oldPwdChange: function(e) {
				this.oldPwd = e.detail.value
			},
			newPwdChange: function(e) {
				this.checkPwd(this.oldPwd)
				this.newPwd = e.detail.value
			},
			conformPwdChange: function(e) {
				this.conformPwd = e.detail.value
				if (e.detail.value != "") {
					this.passwordCheck = true
				} else {
					this.passwordCheck = false
				}
			},
			checkPwds: function(newPwd, conformPwd) {
				if (newPwd == conformPwd) {
					return true
				} else {
					return false
				}
			},
			conformPwds: function() {
				var inforType = 'uPassword'
				var inforMation = this.newPwd
				var message = "密码修改成功"
				if (this.checkPwds(this.newPwd, this.conformPwd)) {
					this.updateUser(inforType, inforMation, message)
					// this.queryUsreInfo()
					// uni.navigateTo({
					// 	url:'../userInfor'
					// })
				} else {
					uni.showToast({
						title: '两次密码输入不一致，请重新输入',
						duration: 2000
					})
				}
				// if(this.oldPwd==this.conformPwd){

				// }
			},
			updateUser: function(inforType, inforMation, message) {
				// console.log(inforType,inforMation)
				// console.log('22222222222222222')
				// console.log(uni.getStorageSync('openid'))
				// console.log('22222222222222222')
				var data = {
					openId: uni.getStorageSync('openid'),
					inforType: inforType,
					inforMation: inforMation,
					FLAG:"U"
				}
				api.post(userServlet, data).then(res => {
					uni.showToast({
						title: message,
						duration: 2000
					})
					this.queryUsreInfo()
					// uni.navigateTo({
					// 	url:'../userInfor'
					// })
				}).catch(err => {
					//失败时回调函数
					console.log(err)
				})
			},
			//获取用户信息的接口
			queryUsreInfo: function() {
				var uEnvirn = 'MP-WEIXIN'
				// #ifdef APP-PLUS
				var uEnvirn = 'APP-PLUS'
				// #endif
				console.log(uni.getStorageSync('openid'))
				var data2 = {
					openId: uni.getStorageSync('openid'),
					uEnvirn: uEnvirn,
					FLAG:"R"
					// session_key:uni.getStorageSync('session_key'),
				}
				api.post(userServlet, data2).then(res => {
					uni.removeStorageSync('WeChatUserInfo')
					//成功时回调函数
					uni.setStorageSync('WeChatUserInfo', res)
					// uni.setStorageSync('LoginIndex', 1)
					// uni.redirectTo({
					// 	url: '../userInfor',
					// })
					uni.navigateBack({
			            //关闭当前页面，返回上一页面或多级页面。
			            delta:1
			        });
				}).catch(err => {
					//失败时回调函数
					// 
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 1200rpx;
		background-color: #F1F1F1
	}

	/* 修改用户名 */
	.modifyName {
		/* padding-left:30rpx; */
	}

	.modifyName .input {
		padding: 20rpx 30rpx;
		font-size: 30rpx;
		color: #C8C7CC;
		background-color: white;
	}

	.modifyName .conform {
		display: flex;
		margin: 20rpx 30rpx;
		border-radius: 15rpx;
		justify-content: center;
		align-items: center;
		padding: 20rpx 30rpx;
		color: white;
		background-color: #999999;
	}

	/* 修改手机号 */
	.modifPhone {
		display: flex;
		flex-direction: column;
	}

	.modifPhone .phone {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		padding: 20rpx 0rpx
	}

	.modifPhone .phone .phone-1 {
		width: 60%;
		margin-left: 45rpx;
		display: flex;
		justify-content: space-between;
		/* background-color: #09FC76; */
	}

	.modifPhone .phone .getcode {
		width: 20%;
		background-color: #FC603A;
		color: white;
		display: flex;
		justify-content: center;
		margin-right: 70rpx;
		padding: 10rpx 10rpx;
		border-radius: 5rpx;
	}

	.modifPhone .code {
		display: flex;
	}

	.modifPhone .code {
		display: flex;
		flex-direction: row;
		margin-top: 3rpx;
		justify-content: space-around;
		align-items: center;
		/* margin-left: -10rpx; */
		background-color: white;
		padding: 20rpx 0rpx
	}

	.modifPhone .code .input {
		margin-right: 175rpx;
	}

	.modifPhone .conform {
		width: 600rpx;
		padding: 15rpx 0rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #767676;
		background-color: #CCCCCC;
		margin-top: 40rpx;
		border-radius: 5rpx;
		margin-left: 70rpx;
	}

	.modifPhone .codeCheck {
		background-color: #FC603A;
		color: white;
	}

	/* 修改密码 */
	.password {
		/* margin: 10rpx 30rpx; */
		display: flex;
		flex-direction: column;
		background-color: white;
	}

	.password input {
		border: 1rpx solid #DCDBDB;
		margin: 10rpx 30rpx;
		padding: 20rpx 20rpx;
		margin-top: 20rpx;
		background-color: #DDDDDD;
		border-radius: 5rpx;
	}

	.conform {
		display: flex;
		margin: 30rpx 30rpx;
		border-radius: 5rpx;
		justify-content: center;
		font-weight: bold;
		align-items: center;
		padding: 20rpx 30rpx;
		color: white;
		background-color: #999999;
	}

	.codeCheck {
		background-color: #1C16F2;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
	}
</style>
