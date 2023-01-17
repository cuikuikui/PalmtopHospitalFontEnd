<template>
	<div class="info">
		<!-- 选择预约人 -->
		<view class="item">
			<view class="left"><text>选择预约人</text></view>
			<view class="right">
				<picker name="idType" @change="bindPickerChange" :value="index" :range="appoints">
					<view class="uni-input">{{appoints[index]}}</view>
				</picker>
			</view>
		</view>
		<!-- 预约者姓名 -->
		<view class="item">
			<view class="left">
				<text>预约者姓名</text>
			</view>
			
			<view class="right">
				<text>{{family[index].a_Name}}</text>
			</view>
		</view>
		
		<!-- 身份证号 -->
		<view class="item">
			<view class="left">
				<text>身份证号</text>
			</view>
			
			<view class="right">
				<text>{{family[index].a_IDCard}}</text>
			</view>
		</view>
		
		<!-- 手机号 -->
		<view class="item">
			<view class="left">
				<text>手机号</text>
			</view>
			
			<view class="right">
				<text>{{family[index].a_Phone}}</text>
			</view>
		</view>
		
		<!-- 日期选择 -->
		<view class="item">
			<view class="left" >
				<text>预约日期</text>
			</view>
		
			<view class="right" style="justify-content: flex-start;">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
		
		<!-- 新冠筛查预约项目 -->
		<view class="item" style="height: 80px;">
			<view class="left">
				<text>新冠筛查预约项目</text>
			</view>
			
			<view class="right">
				<radio-group class="radio-group" name="selectNucle" @change="radioChange">
					<label class="radio">
						<radio :value="1" checked />
						核酸检测（单采）
					</label>
					<label class="radio">
						<radio :value="0" />
						核酸检测（混采）
					</label>
				</radio-group>
			</view>
		</view>
		
		<view class="record" @click="toRecord">
			<span class="iconfont icon-record1"></span>
			<text>预约记录</text>
		</view>
		<view class="submit">
			<button type="primary" style="background-color: dodgerblue;" @click="submit" >预约</button>
		</view>
	</div>
</template>

<script>
	import {
		AppointServlet
	} from '../../pages/common/api.js'
	import api from '../../pages/common/request.js'
	import {
		randomNum,getClientNowSystemTime
	} from '../common/utils.js'
	export default {
		data(){
			const currentDate = this.getDate({
				format: true
			})
			return {
				family:[],
				appoints:[],
				index:0,
				date: currentDate,
				selectNucle:'核酸检测（混采）',
				appType:'1',
				loadModal: false,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		created() {
			let arr = uni.getStorageSync('family_list')
			if(arr==null || arr==""){
				uni.showToast({
					title: "请先添加就诊人",
					icon: 'none',
					duration: 2000
				});
				return 0;
			}
			this.family =arr
			for(let i =0;i<arr.length;i++){
				if(arr[i].isDefault=="1"){
					this.index=i
					break;
				}
			}
			// this.family = arr.filter((item)=>{
			// 	return item.isDefault =='1'
			// })
			
			for(let i =0;i<this.family.length;i++){
				this.appoints.push(this.family[i].a_Name+" "+this.family[i].a_Id)
			}
			// console.log("family",this.family);
			// console.log("family",this.appoints);
		},
		mounted() {
			
		},
		methods:{
			toRecord(){
				uni.navigateTo({
					url:"./record"
				})	
			},
			// 核酸单采和混踩选项
			radioChange: function(e) {
				if (e.detail.value == 0) {  ///0：代表混采，1:代表单采
					this.selectNucle = "核酸检测（混采）"
					this.appType = '0'
				} else {
					this.selectNucle = "核酸检测（单采）"
					this.appType = '1'
				}
			},
			// 日期选择
		    bindDateChange: function(e) {
				this.date = e.detail.value
			},
			// 预约人选择
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			submit(){
				var openid = uni.getStorageSync('openid')
				var data = {
					//从全局变量data中获取数据
					appNo: randomNum(getClientNowSystemTime('yyyyMMdd'), 6),
					appDate: this.date,
					appType: this.appType,
					appStatus: '1',
					fId:this.family[this.index].a_Id,
					openId: openid,
					paySatus:'0',
					FLAG: "C"
				}
				console.log("====data====",data);
				api.post(AppointServlet, data).then(res => {
					let code = res.split(',')[0]
					let message = res.split(',')[1]
					//成功时回调函数
				
					if(code =="200"){
						uni.showLoading({
							title: '加载中'
						});
						setTimeout(function () {
							uni.hideLoading();
							uni.navigateTo({
								url:'../nucleicAcid/success?appNo='+ data.appNo + '&appType=' + data.appType
							})
						}, 2000);
					}else {
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						});
					}
					//授权成功后，跳转进入小程序首页
				}).catch(err => {
					//失败时回调函数
				})
		
				
			}
		}
	}
</script>

<style scoped>
	.info {
		background-color: #fff;
		font-size: 13px;
		color: dimgray;
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
		width: 40%;
	}
	.right {
		width: 60%;
		display: flex;
		justify-content: flex-start;
	}
	
	
	.radio-group {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}
	.radio{
		margin: 7px 0;
	}
	.record {
		display: flex;
		padding: 5px;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		background-color: paleturquoise;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 0;
		bottom: 100px;
		
	}
	.submit {
		width: 92%;
		margin-top: 30rpx;
		margin-left: 30rpx;
		background-color: mediumblue;
		color: #fff;
		border-radius: 10px;
		position: relative;
		bottom: -200px;
	}

</style>