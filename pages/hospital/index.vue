<template>
	<view class="hospital">
		<view class="item" v-for="(item,index) in hospitals" :key="index" @click="toChoseMenu(item.hid)">
			<view class="text">{{item.hname}}</view>
			<image  mode=""  :src="item.himg" ></image>
		</view>
	</view>
</template>

<script>
	import {HospitalServlet} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data(){
			return {
				hospitals:[]
			}	
		},
		onShow() {
			this.GetHospitals()
		},
		methods:{
			toChoseMenu(hid){
				uni.navigateTo({
					url:'/pagesB/choseMenu/choseMenu?hId='+hid
				})
			},
			GetHospitals: function() {
				var data = {
					FLAG: "R",
					hId:'',
					hCity:'',
					hName:''
				}
				api.post(HospitalServlet, data).then(res => {
					//成功时回调函数
					console.log("=====xxxx=====",res)
					 if (res[res.length-1].SYS_HEAD.ReturnCode == "000000") {
						for(let i =0;i<res.length-1;i++){
						  this.hospitals.push(res[i])
						}
					  } else {
						  uni.showToast({
						  	title: res[res.length-1].SYS_HEAD.ReturnMessage,
						  	icon: 'none',
						  	duration:2000
						  });
					  }
				}).catch(err => {
					//失败时回调函数
				})
			}
		}
		
	}
</script>

<style scoped>
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.item .text {
		position: relative;
		top: 120px;
		font-size: 25px;
		color:white;
	}
	.item image {
		width: 90%;
		height: 150px;
		margin-top: 20px;
		border-radius: 10px;
	}
	
</style>