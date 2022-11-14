<template>
	<view>
		<view class='table'>
			<view class='table_header'>
				<view class="th1">
					<view class="cell_label" :class="colorFlag==true?'colorFlag':''" @click="textChange">全部时间</view>
				</view>
				<!--渲染日期和周的匹配  -->
				<scroll-view scroll-x="true" style="width: 100%;white-space: nowrap;" :key="index">
					<view class="th2" style="width:100rpx;display: inline-block" v-for="(item,index) in dateArray" :key="index"
					 @click="doctorFilter(item.weekNum+1)">
						<view class="cell_date_label" :class="selectId==item.weekNum+1?'colorFlag':''">{{item.date_text}}</view>
						<view class="cell_label" :class="selectId==item.weekNum+1?'colorFlag':''">{{item.weekName}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="doctors">
			<view class="itemdot" v-for="(item,index) in doctor" :key="index" :data-did="item.d_Id" :data-dname="item.d_Name"
			 :data-dcount="item.d_Count" :data-dreceive="item.d_ReceiveNum" :data-dfee="item.d_Fee"
			 :data-drole="item.d_Role" :data-introduce="item.d_Introduce" :data-dimg="item.d_Img" @click="getDoctors">
				<view class="top">
					<view class="left">
						<image :src="item.d_Img" style="width:180rpx;height:180rpx;"></image>
					</view>
					<view class="right">
						<view class="top1">
							<text style="font-size: 35rpx;color: #0C0C0C">{{item.d_Name}}</text>
							<text> ({{item.d_Role}})</text>
							<view class="youHao" v-if="item.d_ReceiveNum<30">有号</view>
							<view class="wuHao" wx:else>无号</view>
						</view>
						<view class="bottom1">
							<text>接诊总量 {{item.d_Count}}</text>
							<text :decode="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已接诊 {{item.d_ReceiveNum}}</text>
						</view>
					</view>
				</view>
				<view class="bottom">
					{{item.d_Introduce}}
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	var weeksArray = [];
	import {
		GetDoctorsByRoomId,
		GetDoctorsByDay,
		DoctorServlet
	} from '../common/api.js'
	var submitData = require('../common/submitData.js')
	import api from '../common/request.js'
	export default {
		data() {
			return {
				dateArray: [],
				oIndex: 0,
				left: 0,
				colorFlag: true,
				doctor:'',
				selectId:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.hId=options.hospitalId
			this.rId=options.roomId
			this.rname=options.rname
			this.hname=options.hname
			this.getDoctorsByRoomId("R",options.hospitalId,options.roomId,"","")
			
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var daysArray = this.getSevenDays()
			console.log("fffffff",daysArray);
			this.dateArray=daysArray
		},
		methods: {
			getDoctorsByRoomId(FLAG,hId,rId,day,dName){
				var data = submitData.Doctors
				data.FLAG = FLAG,
				data.hId = hId
				data.rId = rId
				data.day = day
				data.dName=dName
				api.post(DoctorServlet, data).then(res => {
					// console.log("dhsidhhdsih",res);
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
				}).catch(err => {
					//失败时回调函数
				})
			},
			textChange: function() {
				this.selectId=null
				this.colorFlag=true
				this.getDoctorsByRoomId("R",this.hId,this.rId,"","")
			},
			removeSameDoctor: function(doctor, Name) {
				var map = {},
					dest = [];
				for (var i = 0; i < doctor.length; i++) {
					var ai = doctor[i];
					if (i == 0) {
						dest.push(ai);
					} else {
						var filterData = dest.filter(function(e) {
							return e[Name] == ai[Name];
						})
						if (filterData.length == 0) {
							dest.push(ai);
						}
					}
				}
				return dest;
			},
			doctorFilter: function(index) {
				console.log("dddddd",index);
				this.colorFlag=false
				this.selectId=index
				this.getDoctorsByRoomId("R",this.hId,this.rId,this.selectId,"")
			},
			getDoctors: function(e) {
				var doctorId = e.currentTarget.dataset.did
				var dname = e.currentTarget.dataset.dname
				var drole = e.currentTarget.dataset.drole
				var dcount = e.currentTarget.dataset.dcount
				var dreceive = e.currentTarget.dataset.dreceive
				var rname = this.rname
				var dfee = e.currentTarget.dataset.dfee
				var dintroduce = e.currentTarget.dataset.introduce
				var dimg = e.currentTarget.dataset.dimg
				var hname = this.hname
				uni.navigateTo({
					url: '../doctorDetail/doctorDetail?doctorId=' + doctorId + '&dname=' + dname + '&drole=' + drole + '&dcount=' +
						dcount + '&dreceive=' + dreceive + '&dfee=' + dfee + '&drole=' + drole +
						'&dintroduce=' + dintroduce + '&dimg=' + dimg + '&rname=' + rname + '&hname=' + hname
				})
			},
			/**
			 * 据日期获取当前星期几
			 * 参数(String)：2020-07-03
			 * 返回值(String)：周五
			 */
			getWeekByDay: function(dayValue) {
				//  2020-07-03   -----》   Fri Jul 03 2020 00:00:00 GMT+0800 (中国标准时间)
				var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化  
				var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"); //创建星期数组  
				return today[day.getDay()]; //返一个星期中的某一天，其中0为星期日     day.getDay()根据日期获取当前星期几
			},
			/**
			 * 第一部分 先将从今天开始往后7天的日期放到数组中，作为第一大块的数据源
			 *   返回值：object
			 *   0: {date_text: "07/03", weekName: "周五", weekNum: 4}
			 *   1: {date_text: "07/04", weekName: "周六", weekNum: 5}
			 *   2: {date_text: "07/05", weekName: "周日", weekNum: 6}
			 *   3: {date_text: "07/06", weekName: "周一", weekNum: 0}
			 *   4: {date_text: "07/07", weekName: "周二", weekNum: 1}
			 *   5: {date_text: "07/08", weekName: "周三", weekNum: 2}
			 *   6: {date_text: "07/09", weekName: "周四", weekNum: 3}
			 * 
			 * 
			 */
			getSevenDays: function() {
				var daysArray = [];
				var dayDict = {};
				var weekStr = '';
				var weekNum = '';
				for (var i = 0; i < 7; i++) {
					var date = new Date(); //当前日期
					var newDate = new Date();
					newDate.setDate(date.getDate() + i);
					// 获取月份 07
					var m = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
					// 获取日数 03
					var d = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
					// 获取全部时间 2020-07-03
					var time = newDate.getFullYear() + "-" + m + "-" + d;
					// 拼接日期 07/03
					var dayStr = m + "/" + d;
					if (this.getWeekByDay(time) == '周一') {
						weekNum = 0;
					} else if (this.getWeekByDay(time) == '周二') {
						weekNum = 1;
					} else if (this.getWeekByDay(time) == '周三') {
						weekNum = 2;
					} else if (this.getWeekByDay(time) == '周四') {
						weekNum = 3;
					} else if (this.getWeekByDay(time) == '周五') {
						weekNum = 4;
					} else if (this.getWeekByDay(time) == '周六') {
						weekNum = 5;
					} else if (this.getWeekByDay(time) == '周日') {
						weekNum = 6;
					}
					dayDict = {
						"date_text": dayStr,
						"weekName": this.getWeekByDay(time),
						"weekNum": weekNum
					};
					daysArray.push(dayDict);
				}
				weeksArray = daysArray;
				return daysArray;
			},
		}
	}
</script>

<style>
	/*科室排班表  */
	.table {
		width: 100%;
		/* height:500rpx; */
		padding: 15rpx;
		/* padding-top: 100rpx; */
		display: flex;
		flex-direction: column;
		/*border: 1rpx solid rgba(218, 217, 217, 1);*/
		border-bottom: 10rpx solid rgba(218, 217, 217, 1);
		/* background-color: blue; */
	}

	.table_header {
		display: flex;
		height: 110rpx;
	}

	.th1 {
		display: flex;
		/*flex-direction: column;*/
		width: 150rpx;
		height: 100rpx;
		/*background: rgba(241, 252, 255, 1);*/
		border-right: 1rpx solid #494747;
		padding:0 5px;
	/* 	padding-right: 5rpx;
		padding-left: 5rpx; */
		/*border-bottom: 1rpx solid rgba(218, 217, 217, 1); */
		justify-content: center;
		align-items: center;
		/*overflow-x: auto;*/
	}

	.th2 {
		display: flex;
		flex-direction: row;
		width: 100rpx;
		height: 110rpx;
		/*background: rgba(241, 252, 255, 1);*/
		/*border-right: 1rpx solid #494747; */
		padding-right: 15rpx;
		padding-left: 15rpx;
		/*border-bottom: 1rpx solid rgba(218, 217, 217, 1); */
		justify-content: center;
		align-items: center;
		overflow-x: auto;
	}

	.cell_label {
		width: 80rpx;
		/* height: 60rpx; */
		font-size: 30rpx;
		padding-left: 10rpx;
		color: rgba(74, 74, 74, 1);
	}

	.colorFlag {
		color: #0AF920;
	}

	.cell_date_label {
		font-size: 30rpx;
		/*color: rgba(74, 74, 74, 1);*/
	}

	.table_main {
		display: flex;
		flex-direction: row;
	}

	.right-item {
		display: flex;
		flex-direction: row;
	}

	.doctors {
		width: 100%;
		height: 1100rpx;
	}

	.itemdot {
		width: 100%;
		height: 270rpx;
		border-bottom: 10rpx solid rgba(218, 217, 217, 1);
		margin-top: 15rpx;
		padding: 15rpx;
		padding-left: 30rpx;
		padding-top: 30rpx;

	}

	.itemdot .top {
		width: 100%;
		height: 190rpx;
		display: flex;
		/*background-color: #13B5F1*/
	}

	.itemdot .top .left {
		width: 230rpx;
		height: 180rpx;
		/*background-color: #FF0707*/
	}

	.itemdot .top .right {
		width: 100%;
		height: 180rpx;
		display: flex;
		flex-direction: column;
		align-items: space-between;
		padding-left: 20rpx;
		font-size: 28rpx;
		line-height: 70rpx;
		color: #B0ABAB;
		/*background-color: #07FFDF*/
	}

	.youHao {
		width: 70rpx;
		height: 40rpx;
		background-color: #09FC76;
		color: white;
		position: relative;
		left: 450rpx;
		top: -50rpx;
		line-height: 40rpx;
		display: flex;
		justify-content: center;
	}

	.wuHao {
		width: 70rpx;
		height: 40rpx;
		background-color: #6B6B6B;
		color: white;
		position: relative;
		left: 450rpx;
		top: -50rpx;
		line-height: 40rpx;
		display: flex;
		justify-content: center;
	}

	.itemdot .bottom {
		width: 700rpx;
		height: 50rpx;
		font-size: 30rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
