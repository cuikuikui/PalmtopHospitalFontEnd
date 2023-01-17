<template>
	<view>
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
					<input name="goodsName" type="text" class="weui-search-bar__input" :value="inputVal" placeholder="请输入医生名字"
					 :focus="!showdetail" @blur="getInput_1" @input="getInput_2" />
					<view class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
						<icon type="clear" size="14"></icon>
					</view>
				</view>
			</view>
			<view class="weui-search-bar__cancel-btn" @click="getShowdetail">搜索</view>
		</view>

		<view class="body">
			<view class="hot">
				<text class="text">热门搜索</text>
			</view>

			<view class="categories">
				<text class="text" v-for="(item,index) in hot" :key="index" @click="getItemHot(index)">{{item}}</text>
			</view>
		</view>

		<view class="footer">
			<view class="history">
				<text class="text">历史搜索</text>
				<span class="iconfont icon-delete" @click="clearStore(index)"></span>
				<!-- <image class="img" src="../../static/images/delete.png" @click="clearStore(index)"></image> -->
			</view>
			<view class="categories">
				<text class="text" v-for="(item,index) in sercherStorage" :key="index">{{item}}</text>
			</view>
		</view>
		<!-- 医院列表 -->
		<view class="detail" :hidden="showdetail">
			<scroll-view scroll-y="true" style="height:100%">
			<!-- <scroll-view scroll-y="true" class="container"> -->
				<!-- <view class="center1" v-for="(item,index) in doctor" :key="index" @click="getDoctorDetail(item.did,item.dname,item.dcount,item.dreceive,item.dfee,item.drole,item.dintroduce,item.hname,item.rname,item.dimg)">	 -->
				<view class="center1" v-for="(item,index) in doctor" :key="index" @click="getDoctorDetail(item.d_Id,item.d_Name,item.d_Count,item.d_Receive,item.d_Fee,item.d_Role,item.d_Introduce,item.h_Name,item.r_Name,item.d_Img)">																			
					<view class="img">
						<image :src="item.d_Img"></image>
					</view>
					<view class="right">
						<text style="color:#080808">姓名：{{item.d_Name}}</text>
						<text>职称：{{item.d_Role}}</text>
						<text>医院：{{item.h_Name}}</text>
						<text>科室：{{item.r_Name}}</text>
						<text>资费：{{item.d_Fee}}</text>
						<view class="good">擅长：{{item.d_Introduce}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { GetDoctorsByNamePercent,DoctorServlet} from '../common/api.js'
	import api from '../common/request.js'
	var submitData = require('../common/submitData.js')
	export default {
		data() {
			return {
				showdetail: true,
				itemdetail: true,
				flag: true,
				inputVal: "",
				hot: ['王正', '周天一', '许迟', '赵', '孙', '张益达', '李虎'],
				sercherStorage: [],
				restaurant: [],
				disconnt: [],
				doctor:[],
				localFlag: false,
				LoginIndex: uni.getStorageSync('LoginIndex')
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			var that = this;
			that.getLishi();
		},
		onPageScroll(res){
			console.log(res.scrollTop);//距离页面顶部距离
		},
		methods: {
			//获取缓存名字list的缓存数据，然后获取成功赋值给data里面的sercherStorage用来渲染页面。
			getLishi: function() {
				var that = this;
				uni.getStorage({
					key: "list",
					success: function(res) {
						that.sercherStorage=res.data
					}
				})
			},
			addArray: function() {
				if (this.inputVal != "") {
					var array = this.sercherStorage;
					array.push(this.inputVal)
					uni.setStorageSync('list', array);
					this.getLishi();
				}
			},
			// 获取点击的值
			getItemHot: function(index) {
				this.inputVal=this.hot[index]
				this.addArray()
			},

			// 获取输入值,失去焦点触发e.detail.value
			getInput_1: function(e) {
				this.inputVal=e.detail.value
				this.addArray()
			},
			// 显示简洁商品界面
			getInput_2: function(e) {
				this.inputVal=e.detail.value
				this.showdetail=false
				if (this.inputVal != '') {
					this.doctor=this.doctor
				} else {
					this.doctor=[]
				}
			},
			// 显示详细商品界面
			getShowdetail: function() {
				var data = submitData.Doctors
				data.FLAG = 'R'
				data.hId =''
				data.rId =''
				data.day =''
				data.dName =this.inputVal
				data.currentPage ='1'
				console.log('dsdsdsdsdffv',data);
				api.post(DoctorServlet, data).then(res => {
					console.log("dhsidhhdsih",res);
					let arrDoctor = []
					if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
						for (let i = 0; i < res.length - 1; i++) {
							// console.log("======dddd=========", res[i])
							arrDoctor.push(res[i])
						}
					} else {
						uni.showToast({
							title: res[res.length - 1].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
					//成功时回调函数
					this.doctor=arrDoctor
					this.flag=false
					this.showdetail=false
				}).catch(err => {
					//失败时回调函数
				})				
				// var that = this;
				// var name = that.inputVal;
				// var data = {
				// 	//从全局变量data中获取数据
				// 	dName: name
				// }
				// api.post(GetDoctorsByNamePercent, data).then(res => {
				// 	//成功时回调函数
				// 	that.doctor=res
				// 	// app.globalData.restaurants=res
				// }).catch(err => {
				// 	//失败时回调函数
				// 	// 
				// })
			
			},

			// 清除输入框中输入的数据
			clearInput: function() {
				this.inputVal=''
				this.showdetail=!this.showdetail
			},
			// 清除历史记录
			clearStore: function(e) {
				uni.removeStorageSync('list')
				this.sercherStorage=[]
			},
			getDoctorDetail: function(did,dname,dcount,dreceive,dfee,drole,dintroduce,hname,rname,dimg) {
				if (this.LoginIndex == '') {
					uni.redirectTo({
						url: "../login/login"
					})
				} else {
					console.log(did)
					console.log(dname)
					console.log(dcount)
					console.log(dreceive)
					console.log(dfee)
					console.log(drole)
					console.log(dintroduce)
					console.log(hname)
					console.log(rname)
					console.log(dimg)
					var doctorId = did
					var dname = dname
					var dcount = dcount
					var dreceive = dreceive
					var dfee = dfee
					var drole = drole
					var dintroduce = dintroduce
					var hname = hname
					var rname = rname
					var dimg = dimg				
					uni.navigateTo({
						url: '../doctorDetail/doctorDetail?doctorId=' + doctorId + '&dname=' + dname + '&drole=' + drole + '&dcount=' +
							dcount + '&dreceive=' + dreceive  + '&dfee=' + dfee + '&dintroduce=' + dintroduce +
							'&hname=' + hname + '&rname=' + rname + '&dimg=' + dimg
					})
				}
			}
		}
	}
</script>

<style>
	.searchbar-result {
		margin-top: 0;
		font-size: 14px;
	}

	.searchbar-result:before {
		display: none;
	}

	.weui-cell {
		padding: 12px 15px 12px 35px;
	}

	.body {
		width: 100%;
		height: 300rpx;
		/* background-color: aqua */
	}

	.body .hot {
		width: 100%;
		height: 70rpx;
		border-bottom: 1rpx solid rgba(190, 190, 207, 0.925);
		/* background-color: blueviolet */
	}

	.body .hot .text {
		font-size: 25rpx;
		margin-left: 20rpx;
	}

	.body .categories {
		background: #fff;
		margin: 13px 10px 24px 10px;
		max-height: 380px;
		overflow: hidden;
	}

	.body .categories .text {
		padding: 0 10px;
		height: 28px;
		line-height: 28px;
		color: #666;
		margin: 3px 5px;
		margin-left: 10rpx;
		font-size: 13px;
		display: inline-block;
		position: relative;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 1rpx solid rgb(190, 176, 176);
	}

	.footer {
		width: 100%;
		height: 300rpx;
		margin-top: 80rpx;
		/* background-color: aqua */
	}

	.footer .history {
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content:space-between;
		padding-right:10px;
		border-bottom: 1rpx solid rgba(190, 190, 207, 0.925);
	}

	.footer .history .text {
		font-size: 25rpx;
		margin-left: 20rpx;
	}

	.footer .categories {
		background: #fff;
		margin: 13px 10px 24px 10px;
		max-height: 380px;
		overflow: hidden;
	}

	.footer .categories .text {
		padding: 0 10px;
		height: 28px;
		line-height: 28px;
		color: #666;
		margin: 3px 5px;
		margin-left: 10rpx;
		font-size: 13px;
		display: inline-block;
		position: relative;
		max-width: 150px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		border: 1rpx solid rgb(190, 176, 176);
	}

	.detail {
		width: 100%;
		height: 100%;
		position: relative;
		left: 0rpx;
		top: -700rpx;
		background-color: white
	}

	.detail .restaurantsList {
		margin-bottom: 180rpx;
	}

	.detail .restaurants-list {
		font-size: 25rpx;
		display: flex;
		width: 100%;
		padding: 10rpx 0;
		border-bottom: 1rpx solid #ECECEC;
		color: #6D6D6D;
		justify-content: space-between;
	}

	.detail .restaurants-info-name {
		width: 500rpx;
		color: black;
		font-size: 30rpx;
		margin-bottom: 10rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.detail .restaurants-image1 {
		width: 200rpx;
		height: 125rpx;
		margin: 20rpx;
	}

	.detail .restaurants-image2 {
		position: absolute;
		width: 60rpx;
		height: 30rpx;
		margin-left: -120rpx;
		/* right: 0; */
	}

	.detail .restaurants-info {
		width: 100%;
		margin: 15rpx;
		flex: 1;
	}

	.detail .restaurants-distribution {
		display: flex;
		width: 100rpx;
		margin-right: 20rpx;
	}

	.detail .restaurants-info-rating {
		display: flex;
		width: 100%;
		flex-wrap: nowrap;
		height: 50rpx;
		line-height: 50rpx;
	}

	.detail .restaurants-info-price {
		display: flex;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}

	.detail .restaurants-info-mark {
		width: 50px;
		height: 15px;
		margin-left: 50rpx;
		margin-top: 10rpx;
	}

	.detail .restaurants-info-minus {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}

	image.restaurants-info-minus {
		width: 16px;
		height: 16px;
		padding-right: 10px;
	}

	.detail .restaurants-info-discount {
		display: flex;
		flex-wrap: nowrap;
		width: 100%;
		height: 50rpx;
		line-height: 50rpx;
	}

	image.restaurants-info-discount {
		width: 20px;
		height: 20px;
		padding-right: 10px;
	}

	.detail .restaurants-info-rating-stars {
		color: rgb(182, 181, 179);
		width: 130rpx;
		height: 50rpx;
	}

	text.restaurants-info-rating-stars {
		color: #6A6A6A;
	}

	.detail .restaurants-info-rating-sales {
		width: 150rpx;
		height: 50rpx;
	}

	.detail .restaurants-distribution {
		flex-direction: column;
		text-align: right;
		justify-content: center;
	}


	.container {
		width: 100%;
		height: 1800rpx;
		/*padding:20rpx 40rpx;*/
		/*background-color: white;*/
	}

	/*医生搜索*/
	.search {
		display: flex;
		align-items: center;
		width: 700rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
		height: 80rpx;
		padding: 0rpx 10rpx;
		font-size: 25rpx;
		/* background-c */
		border-radius: 10rpx;
		line-height: 40rpx;
		color: #AAA9A9;
		border: 1rpx solid rgb(192, 192, 180);
	}

	.search image {
		height: 31rpx;
		width: 31rpx;
		padding: 0rpx 10rpx;
	}

	/*医生信息*/
	.center1 {
		display: flex;
		font-size: 25rpx;
		align-items: center;
		padding-left: 20rpx;
		padding-top: 20rpx;
		border-bottom: 1rpx solid rgb(192, 192, 180)
	}

	.center1 .img {
		width: 150rpx;
		height: 150rpx;
	}

	.center1 .img image {
		width: 150rpx;
		height: 150rpx;
	}

	.center1 .right {
		padding-left: 25rpx;
		display: flex;
		flex-direction: column;
		line-height: 50rpx;
		/*color:;*/
	}

	.center1 .right .good {
		width: 550rpx;
		height: 50rpx;
		font-size: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
