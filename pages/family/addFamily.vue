<template>
	<view>
		<!-- 信息部分开始 -->
		<form @submit="formSubmit" :report-submit="true">
			<view class="info">
				<!-- 姓名部分 -->
				<view class="item">
					<view class="left">
						<text>姓名</text>
					</view>
					
					<view class="right">
						<input type="text" name="name" placeholder="请输入姓名" :focus="focus" />
					</view>
				</view>

				<!-- 性别 -->
				<view class="item">
					<view class="left">
						<text>性别</text>
					</view>
					
					<radio-group class="radio-group" name="gender" @change="radioChange">
						<label class="radio">
							男
							<radio :value="1" checked />
						</label>
						<label class="radio">
							女
							<radio :value="0" />
						</label>
					</radio-group>
				</view>

				<!-- 证件类型 -->
				<view class="item">
					<view class="left">
						<text>证件类型</text>
					</view>
					
					<view class="right" style="justify-content: flex-start;">
						<picker name="idType" @change="bindPickerChange" :value="index" :range="array">
							<view>{{array[index]}}</view>
						</picker>
					</view>
				</view>

				<!-- 身份证号 -->
				<view class="item">
					<view class="left">
						<text>身份证号</text>
					</view>
					
					<view class="right">
						<input name="idCard" type="text" placeholder="请输入身份证号" />
					</view>
				</view>

				<!-- 地址 -->
				<view class="item">
					<view class="left" >
						<text>选择地址</text>
					</view>
				
					<view class="right" style="justify-content: flex-start;">
						<picker name="region" mode="region" @change="RegionChange" :value="region">
							<view class="picker">
								{{region[0]}}，{{region[1]}}，{{region[2]}}
							</view>
						</picker>
					</view>
				</view>

				<!-- 详细地址-->
				<view class="item">
					<view class="left">
						<text>详细地址</text>
					</view>
					
					<view class="right">
						<input name="detailRegion" type="text" placeholder="输入详细地址" />
					</view>
				</view>

				<!-- 手机-->
				<view class="item">
					<view class="left">
						<text>手机号</text>
					</view>
					
					<view class="right">
						<input name="tel" type="number" placeholder="请输入手机号" />
					</view>
				</view>
				
				<!-- 设为默认就诊人-->
				<view class="item">
					<view class="left">
						<text>默认就诊人</text>
					</view>
					
					<view class="right" style="justify-content: flex-start;">
						<switch name="isDefault" @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
					</view>
				</view>
			</view>
			<!-- 信息部分结束 -->
			<button class="save" formType="submit">保存</button>
		</form>
	</view>
</template>

<script>
	import {
		AskerServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	import {
		randomNum,isCardID
	} from '../common/utils.js'
	export default {
		data() {
			return {
				gender: "男",
				IDCardType: '',
				array: ['身份证', '军官证', '驾驶证', '台胞证', '护照', '港澳通行证'],
				index: 0,
				region: ['选择省', '市', '区/县'],
				switchA: false,
			}
		},
		methods: {
			// 设为默认就诊人
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			// 地址选择
			RegionChange(e) {
				this.region = e.detail.value
				console.log('地址选择', this.region)
			},
			// 证件类型选择
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			// 性别选择
			radioChange: function(e) {
				if (e.detail.value == 0) {
					this.gender = "女"
				} else {
					this.gender = "男"
				}
			},
			showWarn: function(warn) {
				uni.showToast({
					title: warn,
					icon: 'none',
					duration: 2000 //持续的时间
				})
			},
			formSubmit: function(e) {				
				var openid = uni.getStorageSync('openid')
				var that = this
				var warn = "";
				var flag = false;
				if (e.detail.value.name == "") {
					warn = "请填写您的姓名！";
					this.showWarn(warn)
				} else if (e.detail.value.idCard == "") {
					warn = "请填写您的身份证号";
					this.showWarn(warn)
				} else if (isCardID(e.detail.value.idCard) == false) {
					warn = "身份证号格式不正确";
					this.showWarn(warn)
				} else if (e.detail.value.detailRegion == "") {
					warn = "请填写详细地址";
					this.showWarn(warn)
				} else if (e.detail.value.tel == "") {
					warn = "请填写您的手机号！";
					this.showWarn(warn)
				} else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
					warn = "手机号格式不正确";
					this.showWarn(warn)
				} else {
					var data = {
						//从全局变量data中获取数据
						aId: randomNum(new Date().getFullYear(), 6),
						aName: e.detail.value.name,
						aSex: this.gender,
						aPhone: e.detail.value.tel,
						aIDCard: e.detail.value.idCard,
						openId: openid,
						IdType:e.detail.value.idType,
						region:e.detail.value.region,
						detailRegion:e.detail.value.detailRegion,
						isDefault:e.detail.value.isDefault ==true?'1':'0',
						FLAG: "C"
					}
					console.log("====data====",data);
					api.post(AskerServlet, data).then(res => {
						//成功时回调函数
						// wx.removeStorageSync('address_list')
						uni.redirectTo({
							url: '../family/listFamily'
						})
						//授权成功后，跳转进入小程序首页
					}).catch(err => {
						//失败时回调函数
					})
				}
			},
		}
	}
</script>

<style>
	page {
		display: block;
		min-height: 100%;
		background-color: #f6f6f6;
		font-family: "微软雅黑";
		font-size: 30rpx;
		color: #353535;
		position: relative;
	}

	.info {
		background-color: #fff;
	}

	.item {
		width: 100%;
		height: 90rpx;
		align-items: center;
		display: flex;
		margin-left: 30rpx;
		border-bottom: 1rpx solid #eee;
	}
	.left{
		width: 30%;
	}
	.right {
		width: 65%;
		display: flex;
		justify-content: center;
		/* padding-left: 30rpx;
		width: 75%;
		display: flex; */
	}
	input placeholder {
		color: red;
	}

	.area {
		width: 150rpx;
		border: 1rpx solid #939393;
	}

	.remind {
		padding-top: 6rpx;
		color: #e64340;
		font-size: 20rpx;
	}

	.save {
		width: 92%;
		margin-top: 30rpx;
		background-color: #FFC800;
		color: #fff;
	}



	.item .center {
		width: 450rpx;
		height: 100%;
		margin-left: 35rpx;
		/* background-color: #e64340 */
	}

	.text1 {
		font-size: 30rpx;
	}

	.image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
	}

	input {
		width: 100%;
	}

	radio-group {
		display: flex;
		align-items: center;
	}

	radio-group .radio {
		margin-left: 20rpx;
	}

	radio-group radio {
		margin-left: 10rpx;
	}
</style>
