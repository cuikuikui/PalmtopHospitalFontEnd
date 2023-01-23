<template>
	<div class="container"> 
		<div class="item" v-for="(item,index) in process" @click="Jump(item.id)" :key="index">
			<!-- <image :src="item.img" mode=""></image> -->
			<span class="iconfont" :class="item.img"></span>
			<div>{{item.title}}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				process:[
					{id:1,title:'绑定就诊卡',img:'icon-order-manager'},
					{id:2,title:'新冠核酸预约',img:'icon-yuyue'},
					{id:3,title:'核酸预约记录',img:'icon-record'},
					// {id:4,title:'自助建档',img:'../../static/images/自助建档.png'}
				]
			}
		},
		methods:{
			Jump(id){
				if(id =='1'){
					uni.navigateTo({
						url: '/pagesC/family/listFamily'
					})
				}else if(id=='2'){
					let arr = uni.getStorageSync('family_list')
					console.log("=====arr2====",arr)
					if(arr==null || arr==""){
						uni.showToast({
							title: "请先绑定就诊卡",
							icon: 'none',
							duration: 2000
						});
					}else {
						uni.navigateTo({
							url: '../nucleicAcid/appointment'
						})
					}
				}else if(id=='3'){
					uni.navigateTo({
						url:"./record"
					})	
				}else if(id=='4'){
			
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
		/* background-color: aqua; */
		/* padding: 10px; */
	}
	.item {
		display: flex;
		width: 250rpx;
		height: 200rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
	}
	.item image {
		width: 100rpx;
		height: 100rpx;
	}
</style>
