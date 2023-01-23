<template>
	<view class="preSurvey">
		<view class="directions">
			<span>江苏省医疗机构患者信息登记</span>
			<text>尊敬的患者及家属</text>
			<text style="text-indent:2em;">为了做好新型冠状病毒肺炎防控工作，根据省卫健委相关疫情防控要求，请于<text style="color: red;">就诊当日</text>通过新增登记按钮进行相关信息填报。</text>
			<text style="text-indent:2em;">信息表登记后权限<text style="color: red;">当天有效</text>,请在进入医疗机构时向预检分诊人员出示。</text>
		</view>
		<view class="button" @click="toQuestion">
			填写登记
		</view>
		<view class="record" v-if="recordFlag">
			<text style="color: white;font-size: 17px;">{{family.a_Name}}</text>
			<view class="idCard">
				<text>身份证：</text>
				<text>{{family.a_IDCard}}</text>
			</view>
			<view class="recordTime">
				<text>登记时间：</text>
				<text>{{survery.surveyDate}}</text>
			</view>
			<view class="line"></view>
			<view class="search" @click="recordDetail(survery.surveyDate,survery.epidemic,survery.clinical,survery.highRisk,survery.touchHis, family.a_Name,family.a_IDCard,family.a_Phone)">
				点击查询详情
			</view>
		</view>
		<view class="noRecord" v-else>
			暂无问卷记录
		</view>
	</view>
</template>

<script>
	import {
		AskerServlet,PreSurveyServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	import {decrypt} from '@/pages/common/utils.js'
	export default {
		data(){
			return {
				fId:'',
				survery:{},
				family:{},
				recordFlag:false,
			}
		},
		onShow() {
			this.fId = getApp().globalData.fId
			this.getRecords()
			console.log("====this.fId=====",this.fId)
		},
		methods:{
			recordDetail(surveyDate,epidemic,clinical,highRisk,touchHis, a_Name,a_IDCard,a_Phone){
				uni.navigateTo({
					url:"./detailQuestion?surveyDate="+surveyDate +"&epidemic="+epidemic + "&clinical="+clinical + "&highRisk="+highRisk + "&touchHis="+touchHis + "&a_Name="+a_Name + "&a_IDCard="+a_IDCard+ "&a_Phone="+a_Phone
				})
			},
			// 获取就诊人信息
			 getFamilys(){
				var data = {
					openId: uni.getStorageSync('openid'),
					FLAG: 'R',
					type:'getDesensFamily'
				}
				api.post(AskerServlet, data).then(res => {
					//成功时回调函数 
					// console.log("11111",res)
					let curArr = res
					this.family = curArr.filter(item=>{
						// getApp().globalData.fId =""
						return decrypt(item.secretAid) == this.fId
					})[0]
					console.log("====cycycycycyc====",this.family)
				}).catch(err => {
					//失败时回调函数
				})
			},
			getRecords(){
				var data = {
					openId: uni.getStorageSync('openid'),
					FLAG: 'R',
					fId:this.fId,
				}
				console.log("===data===",data)
				api.post(PreSurveyServlet, data).then(res => {
					//成功时回调函数 
					console.log("11111",res)
					if(res.length>0 &&  res[0].FId ==this.fId){
						this.survery = res[0]
						this.getFamilys()
						this.recordFlag = true
						// getApp().globalData.familySign = ""
						// getApp().globalData.fId = ""
					}
					// if(this.survery.FId ==this.fId){
					// 	console.log("===xxxxx====")
					// 	this.getFamilys()
					// 	this.recordFlag = true
					// }
				}).catch(err => {
					//失败时回调函数
				})
			},
			toQuestion(){
				if(this.survery.FId ==this.fId){
					uni.showToast({
						title: "当日已答过问卷，无需重复答题",
						icon: 'none',
						duration: 2000
					});
				}else {
					uni.navigateTo({
						url:'./question'
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background-color: #f5f2f2;
	}
	 .directions {
		margin: 10px;
		padding: 15px;
		display:flex;
		flex-direction: column;
		border-radius: 7px;
		justify-content: center;
		background-color: white;
	}
	.preSurvey .directions span{
		font-size: 25px;
		font-weight: bolder;
	}
	.preSurvey .directions text{
		font-size: 14px;
	}
	.button {
		display: flex;
		justify-content: center;
		padding: 7px;
		margin: 30px 40px;
		border-radius: 7px;
		color: white;
		background-color: #2aada1;
	}
	.record {
		padding: 10px;
		margin: 10px;
		background-color: #2aada1;
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		color: #fbf3f3;
		font-size: 14px;
	}
	/* .record */
	.record .line {
		border: 1rpx dashed white;
		margin: 10px 0;
	}
	.record .search {
		display: flex;
		width: 100px;
		padding: 3px;
		justify-content: center;
		align-items: center;
		border: 1px solid white;
		margin: auto;
		border-radius: 5px;
	}
	.noRecord {
		color: darkgray;
		font-size: 15px;
		display: flex;
		margin-top: 70px;
		justify-content: center;
	}
	
</style>