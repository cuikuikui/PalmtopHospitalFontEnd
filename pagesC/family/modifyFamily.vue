<template>
	<view>
		<!-- 信息部分开始 -->
		<view class="info">
			<!-- 姓名部分 -->
			<view class="item">
				<view class="left">
					<text>姓名</text>
				</view>
				<view class="right">
					<input type="text" name="name" v-model="modifyFamily.a_Name" />
				</view>
			</view>

			<!-- 性别部分 -->
			<view class="item">
				<view class="left">
					<text>性别</text>
				</view>
				<radio-group class="radio-group" name="gender" @change="radioChange">
					<label class="radio">
						男
						<radio :value="1" :checked='modifyFamily.a_Sex=="男"?"checked":""' />
					</label>
					<label class="radio">
						女
						<radio :value="0" :checked='modifyFamily.a_Sex=="女"?"checked":""' />
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
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>

			<!-- 证件号码 -->
			<view class="item">
				<view class="left">
					<text>身份证号</text>
				</view>
				<view class="right">
					<input name="idCard" type="text" v-model="modifyFamily.a_IDCard" />
				</view>
			</view>

			<!-- 地址 -->
			<view class="item">
				<view class="left">
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
					<input name="detailRegion" v-model="modifyFamily.detailRegion" type="text" />
				</view>
			</view>

			<!-- 电话部分 -->
			<view class="item">
				<view class="left">
					<text>手机号</text>
				</view>
				<view class="right">
					<input name="tel" type="number" v-model="modifyFamily.a_Phone" />
				</view>
			</view>

			<!-- 设为默认就诊人-->
			<view class="item">
				<view class="left">
					<text>默认就诊人</text>
				</view>
				<view class="right" style="justify-content: flex-start;">
					<switch name="isDefault" @change="SwitchA" :class="switchA?'checked':''"
						:checked="switchA?true:false"></switch>
				</view>
			</view>

		</view>
		<!-- 信息部分结束 -->
		<button class="save"  @click="save">保存</button>
		<button class="delete" @click="deletes">删除就诊人</button>
		<button class="delete" @click="cancel">取消</button>
	</view>
</template>

<script>
	import {
		AskerServlet
	} from '@/pages/common/api.js'
	import {
		decrypt,isCardID
	} from '@/pages/common/utils.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				name: "请填写您的姓名",
				tel: "请填写您的联系方式",
				array: ['身份证', '军官证', '驾驶证', '台胞证', '护照', '港澳通行证'],
				index: 0,
				region: ['选择省', '市', '区/县'],
				switchA: false,
				modifyFamily: [],
				gender: '',
				detailRegion: ''
			}
		},
		onLoad: function(options) {
			console.log("===options.fId===",options.fId)
			this.fId = options.fId
			this.getSecretFamily(this.fId)
		},
		methods: {
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
						this.index = curArr[i].idType
						this.region = curArr[i].region != undefined ? curArr[i].region.split(',') : curArr[i]
						this.detailRegion = curArr[i].detailRegion
						this.isDefault = curArr[i].isDefault
						this.switchA = curArr[i].isDefault == "1" ? true : false
						this.gender = curArr[i].a_Sex
					}
					this.modifyFamily = curArr[0]
				}).catch(err => {
					//失败时回调函数
				})
			},
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
			// 性别
			radioChange: function(e) {
				// var localValue=0
				// localValue=e.detail.value
				if (e.detail.value == 0) {
					this.gender = "女"
				} else {
					this.gender = "男"
				}
			},
			//点击删除
			deletes: function() {
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
									url: './listFamily'
								});
							}).catch(err => {
								//失败时回调函数
							})
						} else if (res.cancel) {
							uni.redirectTo({
								url: './listFamily'
							});
						}
					}
				})
			},
			//点击取消，返回上个页面
			cancel: function() {
				uni.redirectTo({
					url: './listFamily'
				});
			},
			showWarn: function(warn) {
				uni.showToast({
					title: warn,
					icon: 'none',
					duration: 2000 //持续的时间
				})
			},
			//点击保存
			save() {
				console.log(this.modifyFamily);
				var warn = "";
				// var that = this;
				if (this.modifyFamily.a_Name == "") {
					console.log("1111111")
					warn = "请填写您的姓名！";
					this.showWarn(warn)
				} else if (this.modifyFamily.a_Phone == "") {
					console.log("22222")
					warn = "请填写您的手机号！";
					this.showWarn(warn)
				} else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.modifyFamily.a_Phone))) {
					console.log("3333333")
					warn = "手机号格式不正确";
					this.showWarn(warn)
				} else if (this.modifyFamily.a_IDCard == "") {
					console.log("4444444")
					warn = "请填写您的身份证号";
					this.showWarn(warn)
				} else if (isCardID(this.modifyFamily.a_IDCard) == false) {
					console.log("555555555")
					warn = "身份证号格式不正确";
					this.showWarn(warn)
				} else if (this.modifyFamily.detailRegion == "") {
					console.log("6666666")
					warn = "请填写详细地址";
					this.showWarn(warn)
				} else {
					console.log("77777777")
					var data = {
						//从全局变量data中获取数据
						aName: this.modifyFamily.a_Name,
						aSex: this.gender,
						aPhone: this.modifyFamily.a_Phone,
						aId: this.fId,
						openId: uni.getStorageSync('openid'),
						aIDCard: this.modifyFamily.a_IDCard,
						IdType: this.index,
						region: this.region[0]+','+this.region[1]+','+this.region[2],
						detailRegion: this.modifyFamily.detailRegion,
						isDefault: this.switchA == true ? '1' : '0',
						FLAG: 'U'
					}
					console.log("===修改地址====", data)
					api.post(AskerServlet, data).then(res => {
						//成功时回调函数
						// wx.removeStorageSync('address_list')
						uni.redirectTo({
							url: './listFamily'
						})
						//授权成功后，跳转进入小程序首页
					}).catch(err => {
						//失败时回调函数
					})
				}
				
				
			}
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
		height: 90rpx;
		align-items: center;
		display: flex;
		margin-left: 30rpx;
		border-bottom: 1rpx solid #eee;
	}

	.left {
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

	.text1 {
		font-size: 30rpx;
	}

	input placeholder {
		color: red;
	}

	.area {
		width: 150rpx;
		border: 1rpx solid #939393;
	}

	button {
		width: 92%;
		margin-top: 30rpx;
	}

	.remind {
		padding-top: 6rpx;
		color: #e64340;
		font-size: 20rpx;
	}

	.save {
		background-color: #FFC800;
		color: #fff;
	}

	.image {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
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
