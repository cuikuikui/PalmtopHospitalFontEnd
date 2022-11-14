<template>
	<view>
		<view class="container">
			<scroll-view :scroll-y="true" class="content">
				<view class="address" :key="index" v-for="(item,index) in family" :data-fid="item.a_Id" :data-fidcard="item.a_IDCard"
				 :data-fname="item.a_Name" :data-fsex="item.a_Sex" :data-fphone="item.a_Phone" @click="getChoseFamily">
					<view class="leftcontent">
						<view class="detailAddress">
							<text class="doornumber">{{item.a_IDCard}}</text>
						</view>
						<view class="detailinfor">
							<text class="name">{{item.a_Name}}</text>
							<text class="sex">{{item.a_Sex}}</text>
							<text class="number">{{item.a_Phone}}</text>
						</view>
					</view>
					<view class="rightcontent" @click.stop="modify" :data-index="item.a_Id">
						<image class="modify" src="../../static/images/moify.png"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="add" @click="addAddre">
			<image class="left" src="../../static/images/addAddre.png" mode="widthFix" />
			<view class="text">新增就诊人</view>
			<image class="right" src="../../static/images/right.png" mode="widthFix" />
		</view>
	</view>
</template>

<script>
	import {
		AskerServlet
	} from '../common/api.js'
	import api from '../common/request.js'
	var index = 0;
	var li = [];
	export default {
		data() {
			return {
				list: li,
				choseFamily: false,
				family:'',
				JumpFlag:false
			}
		},
		onLoad: function(options) {
			var data = {
				openId: uni.getStorageSync('openid'),
				FLAG:'R'
			}
			api.post(AskerServlet, data).then(res => {
				//成功时回调函数 
				console.log(res)
				uni.setStorageSync('family_list', res)
				this.family = res
			}).catch(err => {
				//失败时回调函数
			})

		},
		onShow: function() {
			this.JumpFlag=getApp().globalData.globalJumpFlag
		},
		methods: {
			addAddre: function(e) {
				uni.redirectTo({
					url: '../family/addFamily'
				})
			},
			//修改地址信息
			modify: function(e) {
				var localaddId = e.currentTarget.dataset.index
				this.fId = localaddId
				uni.redirectTo({
					url: '/pages/family/modifyFamily?fId=' + this.fId
				})
			},
			getChoseFamily: function(e) {
				if(this.JumpFlag){
					this.choseFamily = true
					var fid = e.currentTarget.dataset.fid
					var fname = e.currentTarget.dataset.fname
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
					getApp().globalData.globalJumpFlag=false
					uni.redirectTo({
						url: '../confirmGuahao/confirmGuahao'
					})
				}else{
					
				}
			},
		}
	}
</script>

<style>
	.container {
	  width: 100%;
	  height: 87%;
	  /* margin-bottom: 500rpx; */
	}
	.content{
	  width:100%;
	  height:100%;
	  /* background-color: aqua */
	}
	.address{
	  width:100%;
	  height:130rpx;
	  margin:0rpx 20rpx;
	  display: flex;
	  border-top: 1rpx solid rgb(130, 131, 133);
	  border-bottom:1rpx solid rgb(130, 131, 133);
	  /* background-color: blue */
	}
	.leftcontent{
	  width:85%;
	  margin:20rpx 0rpx;
	  display: flex;
	  flex-direction: column;
	  font-size: 25rpx;
	  /* background-color: chartreuse */
	}
	.detailAddress{
	  width:100%;
	  height:50%;
	  font-weight: bolder;
	  display: flex;
	  align-items: center;
	  /* background-color: cornflowerblue */
	}
	.locations{
	  overflow: hidden;
	  white-space:nowrap; 
	  text-overflow: ellipsis;
	}
	.doornumber{
	  margin-left:15rpx;
	}
	.detailinfor{
	  width:100%;
	  heiht:50%;
	  display: flex;
	  align-items: center;
	  margin-top: 5rpx;
	  color: dimgrey;
	  /* background-color: rgb(237, 100, 168) */
	}
	.name{
	}
	.sex{
	  margin-left: 15rpx;
	}
	.number{
	  margin-left: 25rpx;
	}
	.rightcontent{
	  width:15%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  /* background-color: crimson */
	}
	.modify{
	  width:30rpx;
	  height:30rpx;
	}
	.add {
	  height:4%;
	  width: 100%;
	  background-color: #fff;
	  position: absolute;
	  bottom: 0;
	  padding: 15rpx 15rpx 30rpx 40rpx;
	  border-top: 1rpx solid #e0e0e0;
	  margin-bottom: 30rpx;
	}
	
	.add image {
	  width: 50rpx;
	  margin-top: 15rpx;
	  margin-right: 20rpx;
	}
	
	.add .right {
	  width: 25rpx;
	  float: right;
	  margin-right: 60rpx;
	  padding-top: 15rpx;
	  color: #e0e0e0;
	}
	
	.text {
	  float: left;
	  margin-top: 20rpx;
	}
	
	.left {
	  float: left;
	}
</style>
