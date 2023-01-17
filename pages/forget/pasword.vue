<template>
	<view class="main">
		<!-- 登录框 -->
		<view class="loginBox">
			<view class="loginInptu">
				<input :type="seen ? type_text : type_password" class="password" value="" placeholder="请设置8-32位(数字+字母)"
					maxlength="16" v-model="password" />
				<view class="passwordType" @click="changeSeen">
					<span class="iconfont" :class="seen ==true? 'icon-eye1':'icon-eye'"></span>
				</view>
			</view>
			<button class="loginUp" @click="savePassword">保存新密码</button>
		</view>
	</view>
</template>

<script>
	import {
		userServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	export default {
		data() {
			return {
				password: "",
				seen: false,
				type_text: "text",
				type_password: "password",
			}
		},
		onLoad(e) {
			this.phone = e.phone
		},
		methods: {
			changeSeen: function() {
				this.seen = !this.seen;
			},
			// 点击登录
			savePassword: function() {
				var data = {
					openId: this.phone,
					inforType: 'uPassword',
					inforMation: this.password,
					FLAG: "U"
				}
				console.log("===data====",data)
				api.post(userServlet, data).then(res => {
					uni.showToast({
						title: "密码修改成功",
						duration: 2000
					})
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}).catch(err => {
					//失败时回调函数
					console.log(err)
				})
			},
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
