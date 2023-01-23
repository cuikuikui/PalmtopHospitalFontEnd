<template>
	<view>
		<scroll-view scroll-y="true" class="container">
			<view class="item" v-for="(item,index) in hospitals" :key="index" :data-hid="item.hid" @click="goToEvaluate">
				<image :src="item.himg"></image>
				<text>{{item.hname}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {GetGuaHaoHospitals } from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				hospitals:''
			}
		},
		onShow: function () {
		  var data={
		    openId:uni.getStorageSync('openid'),
		  }
		  api.post(GetGuaHaoHospitals,data).then(res => {
		  //成功时回调函数
		  this.hospitals=res
		  }).catch(err => {
		  //失败时回调函数
		  })
		},
		methods: {
			goToEvaluate:function(e){
			  uni.navigateTo({
			    url:'../guaHaoEvaluate/guaHaoEvaluate?hid='+e.currentTarget.dataset.hid
			  })
			},
		}
	}
</script>

<style>
.container{
	height:100%;
	background-color: #FAF0F0
}
.item{
	height:200rpx;
	width:700rpx;
	margin:20rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	box-sizing:border-box;
 	border-radius: 20rpx;
 	background-color: #FFFFFF
}
.item image{
	width:150rpx;
	height:150rpx;
	margin-left: 20rpx;
	margin-right:20rpx;
}
.item text{
	font-size: 45rpx;
	color:#F40E0E;
	/*font-style:italic;*/
	font-family: cursive;
	font-weight: bold;
}
</style>
