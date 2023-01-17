<template>
	<view class="family">
		<view class="item" v-for="(item,index) in family" :key="index" :data-fid="item.a_Id" :data-fidcard="item.a_IDCard"
				 :data-fname="item.a_Name" :data-fsex="item.a_Sex" :data-fphone="item.a_Phone" :data-nickName="item.nickName2" :data-secretfid="item.secretAid" @click="toClickFamily">
			<view class="header">
				<!-- <image src="../../static/images/hospital-family.png" mode=""></image> -->
				<span class="iconfont icon-yiyuan"></span>
				<text>徐州中医医院</text>
			</view>
			<view class="body">
				<view class="body-left">
					<view class="body-content" style="margin-top: 10px;">
						{{item.nickName1}}
					</view>
				</view>
				<view class="body-center">
					<view class="body-center-content">
						<view class="s1">
							<text style="font-size: 20px;">{{item.a_Name}}</text>
							<text style="font-size: 13px;">{{item.a_Sex}}</text>
						</view>
						<view class="s2">
							<text style="font-size: 13px;">已实名</text>
						</view>
					</view>
					<view class="body-center-content">
						<text style="letter-spacing:15px;"> 电{{' '}}话 </text>
						<view class="s4">
							<text style="color: black;">{{item.a_Phone}}</text>
						</view>
					</view>
					<view class="body-center-content">
						<text style="letter-spacing:10px;">就诊卡</text>
						<view class="s4">
							<text style="color: black;">{{item.a_Id}}</text>
						</view>
					</view>
					<view class="body-center-content">
						<text style="letter-spacing:10px;">证件号</text>
						<view class="s4">
							<text style="color: black;">{{item.a_IDCard}}</text>
						</view>
					</view>
				</view>
				<view class="body-right" @click.stop="openQrcode(item.a_Id,item.nickName2)">
					<view class="qrcodeText" style="width: 45px;">
						扫码就医
					</view>
					<tki-qrcode cid="qrcode1" ref="qrcode" :val="item.a_Id" :size="size1" :unit="unit" :icon="icon"
						:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"
						@result="qrR" />
						
				</view>
			</view>
			<view class="footer">
				<label class="radio"><radio value="r1" :disabled="true" :checked="item.isDefault=='1'?true :false" />默认就诊人</label>
				<view class="footer-update">
					<view class="delete"  @click.stop="modify(item.secretAid)">修改</view>
					<view class="delete"  @click.stop="deletes(item.secretAid)">解绑</view>
				</view>
			</view>
			
			<view v-if="qrcodeFlag" class="qrcode-image" @click.stop="closeQrcode">
				<view class="qrcode">
					<tki-qrcode cid="qrcode1" ref="qrcode" :val="item.a_Id" :size="size2" :unit="unit" :icon="icon"
						:iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true"
						@result="qrR" />
					<view class="card">
						<text>卡号：{{value1}}</text>
						<text>就诊人：{{value2}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="add" @click="addFamily">
			<text style="color: darkcyan;font-size: 15px;">+ {{' '}} 添加就诊人</text>
			<text v-if="totalFamily<5" style="color: grey;font-size: 13px;margin-left: 5px;">(已有{{totalFamily}}人,还能添加{{5-totalFamily}}人)</text>
			<text v-else style="color: grey;font-size: 13px;margin-left: 5px;">就诊人已满5人，不可再添加</text>
		</view>
	</view>
</template>

<script>
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
	var index = 0;
	var li = [];
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				list: li,
				choseFamily: false,
				family: '',
				JumpFlag: false,
				size1: 130, // 二维码大小
				size2: 400, // 二维码大小
				val: '', // 要生成的二维码值
				unit: 'upx', // 单位
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64
				qrcodeFlag:false,
				totalFamily:0,
				value1:'',
				value2:''
			}
		},
		onLoad: function(options) {
			this.getFamilys()
		},
		onShow: function() {
			this.JumpFlag = getApp().globalData.globalJumpFlag
		},
		methods: {
			// 放大二维码
			openQrcode(aId,nickName){
				this.value1 = aId
				this.value2 = nickName
				this.qrcodeFlag = true
			},
			// 关闭二维码
			closeQrcode(){
				this.qrcodeFlag = false
			},
			addFamily(){
				if(this.totalFamily>=5){
					uni.showToast({
						title: '绑卡数已达上限',
						icon:'error',
						duration: 2000
					})
				}else {
					uni.redirectTo({
						url: '../family/addFamily'
					})
				}
				
			},
			getFamilys(){
				var data = {
					openId: uni.getStorageSync('openid'),
					FLAG: 'R',
					type:'getDesensFamily'
				}
				api.post(AskerServlet, data).then(res => {
					//成功时回调函数 
					// console.log(res)
					let curArr = res
					for(let i =0;i<curArr.length;i++){
						curArr[i].secretAid = decrypt(curArr[i].secretAid)
						curArr[i].nickName1 = curArr[i].a_Name.substr(0,1)
						curArr[i].nickName2 = decrypt(curArr[i].secretName)
					}
					this.totalFamily = curArr.length
					console.log("===this.totalFamily===",this.totalFamily)
					console.log("===curArr===",curArr)
					uni.setStorageSync('family_list', curArr)
					this.family = curArr
				}).catch(err => {
					//失败时回调函数
				})
			},
			deletes(aId){
				var data = {
					aId: aId,
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
				// console.log("====this.src=====",this.src);
			},
			addAddre: function(e) {
				uni.redirectTo({
					url: '../family/addFamily'
				})
			},
			//修改地址信息
			modify: function(fId) {
				this.fId = fId
				uni.redirectTo({
					url: '/pages/family/modifyFamily?fId=' + this.fId
				})
			},
			toClickFamily: function(e) {
				if (this.JumpFlag) {
					this.choseFamily = true
					var fid = e.currentTarget.dataset.secretfid
					var fname = e.currentTarget.dataset.nickName
					var fidcard = e.currentTarget.dataset.fidcard
					var fsex = e.currentTarget.dataset.fsex
					var fphone = e.currentTarget.dataset.fphone
					var family = {}
					family.fid = fid
					family.fidcard = fidcard
					family.fsex = fsex
					family.fphone = fphone
					family.fname = fname
					family.choseFamily = this.choseFamily
					// address=JSON.stringify(address)
					getApp().globalData.family = family
					getApp().globalData.globalJumpFlag = false
					uni.redirectTo({
						url: '../confirmGuahao/confirmGuahao'
					})
				} else {
					
					// console.log("xxxxxxxx",e.currentTarget.dataset.secretfid)
					// let secretAid = decrypt(e.currentTarget.dataset.secretfid)
					uni.navigateTo({
						url:'./detailFamily?fId='+e.currentTarget.dataset.secretfid
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #f6f3f3;
	}
	.family {
		padding: 15px;
		/* background-color: aqua; */
	}
	.item {
		width: 100%;
		margin-top: 10px;
		border:none;
		border-radius: 10px;
		box-shadow: 0px 0px 5px #484444; 
		background-color: white;
	}
	.header {
		padding: 5px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		box-shadow: 0px 0px 5px #ccc; 
		display: flex;
		align-items: center;
		color: white;
		background-image: url(../../static/images/hospital-family-header.webp);
	}

	.header image {
		width: 30px;
		height: 30px;
		margin-right: 5px;
	}

	.body {
		display: flex;
		justify-content: space-around;
		/* align-items: center; */
		padding: 10px;
	}

	.body-content {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		background-color: darkcyan;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
	}

	.body-center {
		display: flex;
		flex-direction: column;
		padding: 5px;

	}

	.body-center-content {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		font-size: 13px;
		color: grey;
	}

	.body-center-content .s1 {
		width: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: black;
	}

	.body-center-content .s2 {
		width: 100px;
		height: 20px;
		display: flex;
		justify-content: flex-start;
		color: mediumaquamarine;
		font-weight: bolder;
	}
	.body-center-content .s4 {
		display: flex;
		width: 100px;
		justify-content: flex-start;
	}
	.body-right {
		/* padding: 5px; */
		/* padding-bottom: 10px; */
	}
	.body-right .qrcodeText {
		padding: 5rpx;
		border-radius: 10px;
		font-size: 10px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 5px;
		background-color: #1195db;
		position: relative;
		top: 50px;
		left: 7px;
		z-index: 100;
	}
	.footer {
		padding: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.footer .footer-update {
		display: flex;
	}
	.footer .radio {
		color: black;
		font-size: 13px;
		display: flex;
		align-items: center;
	}
	.footer .delete {
		padding: 0 7px;
		color: darkcyan;
		border: 1px solid darkcyan;
		border-radius: 15px;
		margin-right: 10px;
	}
	.add {
		margin-top: 20px;
		padding: 10px 0;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.qrcode-image {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgb(58 53 53 / 25%);
		z-index: 100;
	}
	.qrcode {
		border-radius: 10px;
		background-color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	    margin-top: 100px;
	    margin-left: 20px;
	    padding-top: 30px;
	    padding-bottom: 20px;
	    margin-right: 20px;
	}
	.card {
		display: flex;
		flex-direction: column;
		font-size:15px;
	}
/* 	.qrcode2 {
		width
	} */

</style>
