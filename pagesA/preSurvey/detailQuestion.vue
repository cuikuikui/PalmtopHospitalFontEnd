<template>
	<view class="question">
		<view class="family">
			<view class="header">就诊人信息</view>
			<view class="item">
				<text>患者姓名</text>
				<text>{{a_Name}}</text>
			</view>
			<view class="item">
				<text>身份证号</text>
				<text>{{a_IDCard}}</text>
			</view>
			<view class="item">
				<text>联系电话</text>
				<text>{{a_Phone}}</text>
			</view>
			<view class="item">
				<text>日期</text>
				<text>{{surveyDate}}</text>
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
							<radio :disabled="true" :value="item.value" :checked="item.value === curEpidemic" />
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
							<radio :disabled="true" :value="item.value" :checked="item.value === curTouch" />
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
							<radio :disabled="true" :value="item.value" :checked="item.value === curHighRisk" />
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
							<radio :disabled="true" :value="item.value" :checked="item.value === curClinical" />
						</view>
					</label>
				</radio-group>
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
				surveyDate:'',
				family:{},
				epidemicHis:data.epidemicHis,//流行病史
				touchHis:data.touchHis,//接触史
				highRisk:data.highRisk,//高风险岗位人员
				clinical:data.clinical,//十大临床病状
				curEpidemic:'',
				curTouch:'',
				curHighRisk:'',
				curClinical:'',
				a_Name:'',
				a_IDCard:'',
				a_Phone:''
			}
		},
		onLoad(options) {
			this.surveyDate = options.surveyDate.substring(0,10)
			this.curEpidemic = options.epidemic
			this.curClinical = options.clinical
			this.curHighRisk = options.highRisk
			this.curTouch = options. touchHis
			this.a_Name = options.a_Name
			this.a_IDCard = options.a_IDCard
			this.a_Phone = options.a_Phone
		},
		onShow() {

		},
		methods:{
			
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
</style>