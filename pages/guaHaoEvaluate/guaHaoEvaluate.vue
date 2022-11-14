<template>
	<view>
		<!--pages/05form/05form.wxml-->
		<scroll-view scroll-y="true" class="container">
			<view class="main">
				<form @submit="formSubmit" @reset="formReset">
					<view class="title">满意度评价</view>
					<view class="_title"><text>*1.</text> 您的姓名</view>
					<input class="_input" name="username" placeholder="请输入姓名" />
					<view class="_title"><text>*2.</text> 您的年龄</view>
					<input class="_input" name="age" placeholder="请输入年龄" />
					<!-- 您的性别 -->
					<view class="_title"><text>{{radioSingle[0].text}}.</text> {{radioSingle[0].title}}</view>
					<radio-group @change="radioChange" name="sex" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[0].tempct" checked>{{radioSingle[0].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[0].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您的付费方式 -->
					<view class="_title"><text>{{radioSingle[1].text}}.</text> {{radioSingle[1].title}}</view>
					<radio-group @change="radioChange" name="Payment" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[1].tempct" checked>{{radioSingle[1].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[1].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您来自(实际居住地) -->
					<view class="_title"><text>{{radioSingle[2].text}}.</text> {{radioSingle[2].title}}</view>
					<radio-group @change="radioChange" name="address" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[2].tempct" checked>{{radioSingle[2].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[2].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您的学历 -->
					<view class="_title"><text>{{radioSingle[3].text}}.</text> {{radioSingle[3].title}}</view>
					<radio-group @change="radioChange" name="education" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[3].tempct" checked>{{radioSingle[3].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[3].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 概括而言,您对自己身体的整体健康评价 -->
					<view class="_title"><text>{{radioSingle[4].text}}.</text> {{radioSingle[4].title}}</view>
					<radio-group @change="radioChange" name="healthy" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[4].tempct" checked>{{radioSingle[4].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[4].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 医院医院整体的清洁程度 -->
					<view class="_title"><text>{{radioSingle[5].text}}.</text> {{radioSingle[5].title}}</view>
					<radio-group @change="radioChange" name="clean" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[5].tempct" checked>{{radioSingle[5].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[5].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您对医院医生的诊疗技术水平-->
					<view class="_title"><text>{{radioSingle[6].text}}.</text> {{radioSingle[6].title}}</view>
					<radio-group @change="radioChange" name="technology" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[6].tempct" checked>{{radioSingle[6].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[6].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您对医院所有人员的服务态度和服务效率的满意程度 -->
					<view class="_title"><text>{{radioSingle[7].text}}.</text> {{radioSingle[7].title}}</view>
					<radio-group @change="radioChange" name="attitude" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[7].tempct" checked>{{radioSingle[7].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[7].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您对本次就诊的整体满意程度 -->
					<view class="_title"><text>{{radioSingle[8].text}}.</text> {{radioSingle[8].title}}</view>
					<radio-group @change="radioChange" name="comments" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[8].tempct" checked>{{radioSingle[8].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[8].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<!-- 您是否愿意将该医院推荐给您的家人、亲戚、朋友和同事 -->
					<view class="_title"><text>{{radioSingle[9].text}}.</text> {{radioSingle[9].title}}</view>
					<radio-group @change="radioChange" name="recommend" class="radio-group">
						<view class="radio">
							<radio :value="radioSingle[9].tempct" checked>{{radioSingle[9].tempct}}</radio>
						</view>
						<view class="radio" v-for="(item,index) in radioSingle[9].content" :key="index">
							<radio :value="content[item].name">{{content[item].name}}</radio>
						</view>
					</radio-group>
					<view class="_title"><text>*13.</text>您选择本医院的原因是什么(可多选)</view>
					<checkbox-group @change="checkChange" name="hooby" class="checkbox-group">
						<checkbox class="checkbox" value="他人介绍或别院转诊" color="blue">他人介绍或别院转诊</checkbox>
						<checkbox class="checkbox" value="就医时间方便">就医时间方便</checkbox>
						<checkbox class="checkbox" value="医疗设备完善">医疗设备完善</checkbox>
						<checkbox class="checkbox" value="媒体宣传介绍">媒体宣传介绍</checkbox>
						<checkbox class="checkbox" value="医务人员服务态度好" color="blue">医务人员服务态度好</checkbox>
						<checkbox class="checkbox" value="以往的就医习惯和经验">以往的就医习惯和经验</checkbox>
						<checkbox class="checkbox" value="医生专业水平高">医生专业水平高</checkbox>
					</checkbox-group>
					
					<view>
						<view class="_title"><text>*14.</text>问题反馈</view>
						<view class="text-area">
							<textarea name="feedbacks" placeholder-style="color:#696969" placeholder="请输入您的建议或意见"/>
						</view>
					</view>
					<view class="btn">
						<button form-type="submit" type="primary" size="mini" hover-class="btn-active">提交</button>
						<button form-type="reset" type="warn" size="mini" hover-class="btn-active">重置</button>
					</view>
				</form>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		EvaluateAdd
	} from '../common/api.js'
	import api from '../common/request.js'
	var data = require('../common/data.js')
	var  graceChecker = require("../common/graceChecker.js");
	import formatTimes from '../common/util.js'
	export default {
		data() {
			return {
				isloading: false,
				radioSingle: data.radioSingle,
				content: data.content,
				contents: [],
				min: 5, //最少字数
				max: 520, //最多字数 (根据自己需求改变),
				currentWordNumber:'',				
			}
		},
		onLoad(options) {
			this.hid=options.hid
			
		},
		onShow() {
			console.log(uni.getStorageSync("openid"))
		},
		methods: {
			checkChange(e){
			
			},
			radioChange(e) {
				// console.log(e.detail.value)
			},
			formatDate:function(localDate){
			  var localDate=new Date().toLocaleDateString()
			  localDate=localDate.split('/')
			  if(parseInt(localDate[1])<10){
			    localDate[1]='0'+localDate[1]
			  }
			  if(parseInt(localDate[0])<10){
			    localDate[0]='0'+localDate[0]
			  }
			  var newDate=localDate[2]+'-'+localDate[0]+'-'+localDate[1]
			  return newDate
			},
			formatTime:function(localTime){
			  var dayFlag=localTime.split(' ')[1]
			  if(dayFlag=="PM"){
			    localTime=(parseInt(localTime.split(':')[0])+12)+":"+localTime.split(':')[1]
			  }else{
			    localTime=localTime.split(':')[0]+':'+localTime.split(':')[1]
			  }
			  return localTime
			},
			formSubmit(e) {
				var myDate=new Date()
				var date=this.formatDate(myDate.toLocaleDateString());
				var time=this.formatTime(myDate.toLocaleTimeString());     //获取当前时间
				var localTime=date+" "+time
				var hid=this.hid
				//定义表单规则
				var rule = [
				    {name:"username", checkType : "string", checkRule:"1,4",  errorMsg:"姓名应为1-4个字符"},
				    {name:"age", checkType : "notnull", checkRule:"男,女",  errorMsg:"请选择性别"},
				    {name:"sex", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				var data = {
					username: e.detail.value.username,
					age: e.detail.value.age,
					sex: e.detail.value.sex,
					payment: e.detail.value.Payment,
					address: e.detail.value.address,
					education: e.detail.value.education,
					healthy: e.detail.value.healthy,
					clean: e.detail.value.clean,
					technology: e.detail.value.technology,
					attitude: e.detail.value.attitude,
					comments: e.detail.value.comments,
					recommend: e.detail.value.recommend,
					hooby: e.detail.value.hooby,
					feedbacks: e.detail.value.feedbacks,
					time:localTime,
					hid:hid,
					openid:uni.getStorageSync("openid")
				}
				if(checkRes){
					api.post(EvaluateAdd, data).then(res => {
						uni.navigateTo({
							url: '../guaHaoEvaluateSuccess/guaHaoEvaluateSuccess'
						})
						//成功时回调函数
					}).catch(err => {
						//失败时回调函数
					})
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			formReset(e) {
				this.currentWordNumber = 0
			},
		}
	}
</script>

<style>
	/* pages/05form/05form.wxss */
	.container {
		height: 100%;
	}

	.main {
		padding: 0 14rpx;
	}

	.main .title {
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		padding-top: 30rpx;
		/*color: white;*/
		/*  border-radius: 10rpx;*/
		/*  background-color: #ff4500;*/
	}

	._title {
		font-size: 30rpx;
		font-weight: bold;
		letter-spacing: 8rpx;
		padding: 30rpx 0 10rpx;
		margin-left: 30rpx;
	}

	._title text {
		font-size: 30rpx;
		color: #FA3711;
	}

	._input {
		/*border: 2rpx solid #646464;*/
		width: 600rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: #333;
		margin-left: 30rpx;
		padding: 5rpx 45rpx;
		/*min-height:50rpx;*/
		/*border-radius: 20rpx;*/
		background-color: #F9F5F5
	}


	.radio-group {
		display: flex;
		flex-wrap: wrap;
	}

	.radio {
		width: 200rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 30rpx;
		background-color: #F8F0F0;
		margin-top: 20rpx;
	}

	.checkbox-group {
		display: flex;
		flex-wrap: wrap;
	}

	.checkbox {
		margin-left: 30rpx;
		margin-top: 20rpx;
		/*  width:200rpx;
  height:40rpx;*/
		/*background-color: #F84848*/
	}

	.advice {
		width: 700rpx;
		height: 200rpx;
		margin-left: 30rpx;
		background-color: #E7E6E6
	}

	.section-top {
		width: 100%;
		height: 250rpx;
		border-radius: 3%;
		/* background-color: #e90d2a; */
	}

	.currentWordNumber {
		font-size: 28rpx;
		color: rgb(65, 62, 62);
		position: absolute;
		left: 533rpx;
		top: 150rpx;
	}

	.btn {
		display: flex;
		justify-content: space-between;
		margin: 60rpx 0;
	}

	.btn .btn-active {
		opacity: .6;
	}
	
	/* 问题反馈 */
	.text{
		font-size: 25rpx;
		color: #696969;
		letter-spacing: 5rpx;
	}
	/* textarea */
	.text-area{
		width:95%;
		/* padding:0rpx 30rpx ; */
		margin-left: 20rpx;
		background:#FFF;
		margin-top: 20rpx;
	}
	.text-area textarea{
		width:96%;
		padding:18rpx 2%;
		line-height:1.6;
		font-size:28rpx;
		height:250rpx;
		border: 1rpx solid rgb(192, 192, 180) ;
		border-radius: 10rpx;
	}
	.submit{
		width:685rpx;
		height:40rpx;
		color: white;
		font-size: 25rpx;
		border-radius: 10rpx;
		padding:15rpx;
		display: flex;
		margin-top: 40rpx;
		justify-content: center;
		align-items: center;
		background-color: #FD0517;
	}
</style>
