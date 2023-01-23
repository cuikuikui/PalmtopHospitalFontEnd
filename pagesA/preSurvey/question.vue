<template>
	<view class="question">
		<view class="family">
			<view class="header">就诊人信息</view>
			<view class="item">
				<text>患者姓名</text>
				<text>{{family.a_Name}}</text>
			</view>
			<view class="item">
				<text>身份证号</text>
				<text>{{family.a_IDCard}}</text>
			</view>
			<view class="item">
				<text>联系电话</text>
				<text>{{family.a_Phone}}</text>
			</view>
			<view class="item">
				<text>日期</text>
				<text>{{curDate}}</text>
			</view>
		</view>
		
		<view class="body">
			<view class="header">预检分诊</view>
			<!-- 1、流行病史 -->
			<view class="item">
				<view style="background-color:#f5f2f2;padding: 5px;"></view>
				<view class="title">
					<text><text style="color: red;">*</text>1.</text>
					<text>{{' '}} 流行病史</text>
				</view>
				<radio-group>
					<label class="item-list" v-for="(item, index) in epidemicHis" :key="item.value">
						<view>{{item.name}}</view>
						<view @click="radioChange('epidemicHis',item.value)">
							<radio :value="item.value" :checked="item.value === curEpidemic" />
						</view>
					</label>
				</radio-group>
			</view>

			<!-- 2、接触史 -->
			<view class="item">
				<view style="background-color:#f5f2f2;padding: 5px;"></view>
				<view class="title">
					<text><text style="color: red;">*</text>2.</text>
					<text>{{' '}} 接触史</text>
				</view>
				<radio-group>
					<label class="item-list" v-for="(item, index) in touchHis" :key="item.value">
						<view>{{item.name}}</view>
						<view @click="radioChange('touchHis',item.value)">
							<radio :value="item.value" :checked="item.value === curTouch" />
						</view>
					</label>
				</radio-group>
			</view>
			
			<!-- 3、高风险岗位人员 -->
			<view class="item">
				<view style="background-color:#f5f2f2;padding: 5px;"></view>
				<view class="title">
					<text><text style="color: red;">*</text>3.</text>
					<text>{{' '}} 高风险岗位人员</text>
				</view>
				<radio-group>
					<label class="item-list" v-for="(item, index) in highRisk" :key="item.value">
						<view>{{item.name}}</view>
						<view @click="radioChange('highRisk',item.value)">
							<radio :value="item.value" :checked="item.value === curHighRisk" />
						</view>
					</label>
				</radio-group>
			</view>
			
			<!-- 4、十大临床病状 -->
			<view class="item">
				<view style="background-color:#f5f2f2;padding: 5px;"></view>
				<view class="title">
					<text><text style="color: red;">*</text>4.</text>
					<text>{{' '}} 十大临床病状</text>
				</view>
				<radio-group>
					<label class="item-list" v-for="(item, index) in clinical" :key="item.value">
						<view>{{item.name}}</view>
						<view @click="radioChange('clinical',item.value)">
							<radio :value="item.value" :checked="item.value === curClinical" />
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		
		<view class="footer">
			<view class="content">
				<view class="left">
					<checkbox-group>
						<label>
							<checkbox value="cb" checked="true" />
						</label>
					</checkbox-group>
				</view>
				
				<view class="right">
					<text>特别提醒：根据<text style="color: red;">《传染病防治法》{{' '}}《治安管理</text></text>
					<text><text style="color: red;">处罚法》</text>等法律规定，如果您隐瞒上述情况或</text>
					<text>者拒绝配合医务人员开展调查等处置措施的，</text>
					<text>将承担相应的法律责任。</text>
				</view>
			</view>
			<view class="submit" @click="submit">
				提交
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		AskerServlet,PreSurveyServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	import {decrypt,getClientNowSystemTime,randomNum} from '@/pages/common/utils.js'
	var data = require('@/pages/common/data.js')
	export default {
		data(){
			return {
				fId:'',
				surveyId:'',
				curDate:getClientNowSystemTime('yyyy-MM-dd'),
				family:{},
				epidemicHis:data.epidemicHis,//流行病史
				touchHis:data.touchHis,//接触史
				highRisk:data.highRisk,//高风险岗位人员
				clinical:data.clinical,//十大临床病状
				curEpidemic:'',
				curTouch:'',
				curHighRisk:'',
				curClinical:''
			}
		},
		// onLoad(options) {
		// 	this.surveyId = options.surveyId
		// 	this.fId = options.fId
		// },
		onShow() {
			// this.fId = '2023266183'
			this.fId = getApp().globalData.fId
			this.getFamilys()
			console.log("===this.fId ======",this.fId )
		},
		methods:{
			submit(){
				let data = {
					FLAG: 'C',
					openId: uni.getStorageSync('openid'),
					surveyId:randomNum(getClientNowSystemTime('yyyy'), 6),
					fId:decrypt(this.family.secretAid),
					surveyDate:getClientNowSystemTime('yyyy-MM-dd HH:mm:ss'),
					epidemic:this.curEpidemic,
					touchHis:this.curTouch,
					highRisk:this.curHighRisk,
					clinical:this.curClinical,
					expireFlag:'1'
				}
				console.log("=====data=====",data)
				api.post(PreSurveyServlet, data).then(res => {
					console.log("=====res=====",res)
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
								url:'/pagesA/preSurvey/preSurvey'
							})
						}, 2000);
					}else {
						uni.showToast({
							title: message,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err => {
					//失败时回调函数
				})
			},
			radioChange(message,value){
				if(message=="epidemicHis"){
					this.curEpidemic = value
					console.log(this.curEpidemic)
				}else if(message=="touchHis"){
					this.curTouch = value
					console.log(this.curTouch)
				}else if(message=="highRisk"){
					this.curHighRisk = value
					console.log(this.curHighRisk)
				}else {
					this.curClinical = value
					console.log(this.curClinical)
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
					// console.log("11111",res)
					let curArr = res
					this.family = curArr.filter(item=>{
						// getApp().globalData.fId =""
						return decrypt(item.secretAid) == this.fId
					})[0]
					// console.log("===this.family ===",this.family)
				}).catch(err => {
					//失败时回调函数
				})
			}
		}
	}
</script>

<style scoped>
	.family .header {
		padding: 10px;
		color: #4c4a4a;
		font-size: 17px;
		background-color: #f5f2f2;
	}
	.family .item {
		padding: 7px 10px;
		color: grey;
		font-size: 14px;
		display: flex;
		border: 1px solid #f5f2f2;
		justify-content: space-between;
	}
	.body {
		padding-bottom: 180px;
	}
	.body .header {
		display: flex;
		justify-content: center;
		padding-top: 10px;
		font-size: 17px;
		background-color: #f5f2f2;
	}
	.body .item .item-list {
		padding: 7px 10px;
		color: #2d2c2c;
		font-size: 14px;
		display: flex;
		border: 1px solid #f5f2f2;
		justify-content: space-between;
	}
	.body .item .title {
		padding: 15px;
	}
	
	.footer {
		width: 100%;
		padding: 10px;
		background-color: white;
		position: fixed;
		bottom: 0;
		z-index: 100;
		border-top: 2px solid #f5f2f2;
		box-shadow: 2px 2px 8px 10px #d0cdcd;	
	}
	.footer .content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.footer .content .left {
		display: flex;
		width: 10%;
		justify-content: center;
		align-items: center;
	}
	.footer .content .right {
		width: 80%;
		font-size: 13px;
		display:flex;
		flex-direction: column;
	}
	.footer .submit{
		display: flex;
		margin: 10px 20px;
		border-radius: 10px;
		color: white;
		padding: 10px;
		justify-content: center;
		background-color: #2aada1;
	}
</style>