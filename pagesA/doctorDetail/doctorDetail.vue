<template>
	<view>
		<view class="container">
			<!--医生信息-->
			<view class="center1">
				<view class="img">
					<image :src="dimg"></image>
				</view>
				<view class="right">
					<text style="color:#080808">姓名：{{dname}}</text>
					<text>职称：{{drole}}</text>
					<text>医院：{{hname}}</text>
					<text>科室：{{rname}}</text>
					<text>资费：{{dfee}}</text>
				</view>
				<view :class="collected?'active':'attention'" @click.stop="onattention" :data-flag="locaFlag">
					{{collected?'已关注':'关注'}}
				</view>
			</view>
			<view class="good">擅长：{{dintroduce}}</view>


			<view class="Yuyue1">预约挂号</view>
			<!--<view class="Yuyue2">眼科（坪山）深圳平乐骨伤科医院坪山院区</view>-->

			<view class='table'>
				<view class='table_header'>
					<view class="th" style='width:85rpx;background-color:white'>
						<view class='centerclass cell_label'>排班</view>
					</view>
					<!--渲染日期和周的匹配  -->
					<block v-for="(item,index) in dateArray" :key="index">
						<view class='th'>
							<view class="cell_label centerclass">{{item.weekName}}</view>
							<view class="cell_date_label centerclass">{{item.date_text}}</view>
						</view>
					</block>
				</view>

				<block v-for="(item,index) in sch_listData" :key="index">
					<view class='table_main'>
						<!--上午下午  -->
						<view class='td' style='width:85rpx;background-color:white;'>
							<view class="cell_label centerclass">{{item.time_title}}</view>
						</view>

						<!-- 周一 -->
						<view class='td'>
							<block v-for="(trade,index) in item.Mon_text" :key="index">
								<view :class='item.Mon_text.length-1==index? "table_Text_last_class":"table_Text_class"' @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum' :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>

						<!--周二  -->
						<view class='td'>
							<block v-for="(trade,index) in item.Tues_text" :key="index">
								<view :class='item.Tues_text.length-1==index? "table_Text_last_class":"table_Text_class"'  @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum'  :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>
						<!--周三  -->
						<view class="td">
							<block v-for="(trade,index) in item.Wed_text" :key="index">
								<view :class='item.Wed_text.length-1==index? "table_Text_last_class":"table_Text_class"'  @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum'  :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>
						<!--周四  -->
						<view class='td'>
							<block v-for="(trade,index) in item.Thur_text" :key="index">
								<view :class='item.Thur_text.length-1==index? "table_Text_last_class":"table_Text_class"'  @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum'  :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>
						<!--周五  -->
						<view class='td'>
							<block v-for="(trade,index) in item.Fri_text" :key="index">
								<view :class='item.Fri_text.length-1==index? "table_Text_last_class":"table_Text_class"'  @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum'  :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>
						<!--周六  -->
						<view class='td'>
							<block v-for="(trade,index) in item.Sat_text" :key="index">
								<view :class='item.Sat_text.length-1==index? "table_Text_last_class":"table_Text_class"'  @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum'  :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>
						<!-- 周日 -->
						<view class='td'>
							<block v-for="(trade,index) in item.Sun_text" :key="index">
								<view :class='item.Sun_text.length-1==index? "table_Text_last_class":"table_Text_class"'  @click='clickDoctor'
								 :data-schedleid='trade.s_id' :data-did='trade.d_id' :data-flag='trade.flag' :data-smorningnum='trade.s_orningnum'
								 :data-safternoonnum='trade.s_afternoonnum' :data-sorningnum='trade.s_orningnum'  :data-dayofweek='trade.dayOfWeek' :data-timeperiod='trade.timePeriod'>
									<text style="font-size: 30rpx;" v-if="trade.s_orningnum>0">点击\n预约</text>
									<text style="font-size: 30rpx;color:#646262" wx:else>预约\n已满</text>
								</view>
							</block>
						</view>
					</view>
				</block>
			</view>
		</view>

	</view>
</template>

<script>
	import {randomNum,getClientNowSystemTime} from '@/pages/common/utils.js'
	var weeksArray = [];
	import {
		scheduleList,
		InsertCollection,
		DeleteCollection,
		GetCollectDoctorByOpenid,
		ScheduleServlet,
		CollectionServlet
	} from '@/pages/common/api.js'
	import api from '@/pages/common/request.js'
	export default {
		data() {
			return {
				dimg:'',
				dname:'',
				drole:'',
				hname:'',
				rname:'',
				dfee:'',
				dintroduce:'',
				dateTimes:'',
				sch_listData: [],
				dateArray: [],
				collected: false
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			// console.log('1111111111')
			// console.log(options.doctorId)
			// console.log(options.dname)
			this.dId=options.doctorId
			this.dname=options.dname
			this.dcount=options.dcount
			this.dreceive=options.dreceive
			// this.roomname=options.roomname
			this.dfee=options.dfee
			this.drole=options.drole
			this.dintroduce=options.dintroduce
			this.hname=options.hname
			this.rname=options.rname
			this.dimg=options.dimg

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		async onShow() {
			var that = this
			that.collectList = uni.getStorageSync("collectDoctors")
			// console.log("==查询收藏的医生信息=====",uni.getStorageSync("collectDoctors"));
			// console.log("==查询收藏的医生信息=====",that.collectList);
			that.collectShow()
			
			var data = {
				FLAG:"R",
				dId: this.dId
			}
			api.post(ScheduleServlet, data).then(res => {
				//成功时回调函数
				let arrSchedule = []
				if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
					for (let i = 0; i < res.length - 1; i++) {
						// console.log("======dddd=========", res[i])
						arrSchedule.push(res[i])
					}
				} else {
					uni.showToast({
						title: res[res.length - 1].SYS_HEAD.ReturnMessage,
						icon: 'none',
						duration: 2000
					});
				}
				var daysArray = that.getSevenDays();
				var sList = arrSchedule
				var sch_listData = that.dealData(sList);
				that.dateArray = daysArray
				that.sch_listData = sch_listData
			}).catch(err => {
				//失败时回调函数
			})
		},
		methods: {
			// 给collected赋值功能：取出收藏列表，并给collected赋值------------------------------------------------------
			collectShow() {
				// console.log(" collectShow is called")
				this.collectedUpdate()
				var localCollectList = uni.getStorageSync("collectDoctors")
				// console.log("更新后的数据",localCollectList);
				if(localCollectList.length ==0){
							
				}else {
					for (var i = 0; i < localCollectList.length; i++) {
						if (this.dId == localCollectList[i].did) {
							this.collected = true
							this.cid = localCollectList[i].cid
							break
						}
					}
				}
			},
			// 添加收藏功能：向收藏表插入数据（成功后清除缓存数据）--------------------------------------------------
			collectedAdd() {
				var InsertData = {
					FLAG:'C',
					cId:randomNum("cd",6),
					hId: "",
					dId:this.dId,
					openId: uni.getStorageSync('openid')
				}
				api.post(CollectionServlet, InsertData).then(res => {
					if(res[0].SYS_HEAD.ReturnCode ='000000'){
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration:2000
						});
						// console.log("collectedAdd is success");
						this.collectShow();
					}else {
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
					
				}).catch(err => {
					console.log("=err====",err);
				})
			},
			//取消收藏功能：获取最新的收藏列表（在添加收藏成功后会清除缓存数据，这里要进行重新设置缓存）------------------
			collectedDelete() {
				var that = this
				that.collectShow();
				var selectData = {
					FLAG:"D",
					openId:uni.getStorageSync('openid'),
					cId: this.cid
				}
				api.post(CollectionServlet, selectData).then(res => {
					if(res[0].SYS_HEAD.ReturnCode ='000000'){
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration:2000
						});
						// that.collectShow();
					}else {
						uni.showToast({
							title: res[0].SYS_HEAD.ReturnMessage,
							icon: 'none',
							duration: 2000
						});
					}
				}).catch(err => {
					//失败时回调函数
				})
			},
			// 获取收藏列表功能：获取最新的收藏列表（在添加收藏成功后会清除缓存数据，这里要进行重新设置缓存）------------------
			collectedUpdate(openId) {
				// console.log(" collectedUpdate is called");
				var data = {
					FLAG: 'R',
					collectionType: 'Doctor',
					openId: uni.getStorageSync('openid')
				}
				api.post(CollectionServlet, data).then(res => {
					// console.log(" collectedUpdate api.post",res);
					//成功时回调函数
					let arrCDoctor = []
					if(res.length==0){
						
					}else {
						// console.log(" collectedUpdate res.length!=0");
						if (res[res.length - 1].SYS_HEAD.ReturnCode == "000000") {
							for (let i = 0; i < res.length - 1; i++) {
								arrCDoctor.push(res[i])
							}
							// console.log(" collectedUpdate res.length!=0");
						} else {
							uni.showToast({
								title: res[res.length - 1].SYS_HEAD.ReturnMessage,
								icon: 'none',
								duration: 2000
							});
							
						}
						this.collectList = arrCDoctor
						uni.setStorageSync("collectDoctors", arrCDoctor)
						// console.log("=======在doctorDetail查询收藏的医生信息========", arrCDoctor);	
					}

				}).catch(err => {
					//失败时回调函数
				})
			},
			// 添加收藏
			// 关注
			onattention() {
				try{
					// 如果获取的collected是true，此时进行取消收藏功能
					// console.log("==onattention is called====",this.collected);
					if (this.collected == true) {
						this.collectedDelete()
						this.collected = false
					} else {
						this.collectedAdd()
						this.collected = true
					}
				}catch(e){
					console.log("===exception====",e);
				}
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
			getWeekText: function(tag) {
				var week = ''
				if (tag == 1) {
					week = "周一"
				} else if (tag == 2) {
					week = "周二"
				} else if (tag == 3) {
					week = "周三"
				} else if (tag == 4) {
					week = "周四"
				} else if (tag == 5) {
					week = "周五"
				} else if (tag == 6) {
					week = "周六"
				} else {
					week = "周日"
				}
				return week
			},
			/**
			 * 点击预约挂号按钮
			 * 
			 */
			clickDoctor: function(e) {
				var $dict = e.currentTarget.dataset;
				console.log("=====",$dict);
				var tag = $dict.dayofweek; //周几
				var week = this.getWeekText(tag)
				var sorningnum = $dict.sorningnum;
				
				console.log("=sorningnum==",sorningnum)
				var appdate = '';
				for (var k = 0; k < weeksArray.length; k++) {
					if (weeksArray[k].weekNum == tag) {
						appdate = weeksArray[k].date_text;
						break;
					}
				}
				console.log("=appdate==",appdate)
				var dd = new Date();
				var dateTimes=getClientNowSystemTime('yyyy-MM-dd HH:mm:ss')
				// dd.getFullYear()+'-'+dd.getMonth()+'-'+dd.getDate()+' '+dd.getHours()+':'+dd.getMinutes()+':'+dd.getSeconds()
				this.dateTimes=dateTimes  //此处日期要插入数据库中用于排序
				//console.log('111111111   '+dateTimes+'   111111111111')
				var strTime=dd.toLocaleTimeString() //此处日期要插入数据库中用于显示挂号信息	
				appdate = dd.getFullYear() + '/' + appdate+" "+strTime;
				var str = 0;
				var timeStr = $dict.timeperiod;
				if (timeStr == 1) {
					timeStr = '上午';
				} else { //timeStr=="B"
					timeStr = '下午';
				}
				var mornNum = mornNum = $dict.smorningnum
				var afternNum = $dict.safternoonnum
				var dayOfWeek = $dict.dayofweek
				var timePeriod = $dict.timeperiod
				var dId = $dict.did
				if ($dict.timeperiod == 1) {
					mornNum -= 1
				} else {
					afternNum -= 1
				}
				var visiTime = appdate + ' ' + timeStr + ' ' + week;	
				var roomname = this.rname
				var dfee = this.dfee
				var drole = this.drole
				// 获取当前时间的时间戳
				let strTimex = new Date((getClientNowSystemTime('yyyy-MM-dd HH:mm:ss')).replace(/-/g, '/')).getTime()
				// 将当前时间转为时间戳
				let orderEndTime = this.$moment(strTimex +1800000).format('yyyy-MM-DD HH:mm:ss')
				var guHaoInfor = {
					mornNum: mornNum,
					afternNum: afternNum,
					dayOfWeek: dayOfWeek,
					timePeriod: timePeriod,
					dId: dId,
					visiTime: visiTime,
					roomname: roomname,
					dfee: dfee,
					drole: drole,
					hname: this.hname,
					dateTimes:this.dateTimes,
					orderStartTime:getClientNowSystemTime('yyyy-MM-dd HH:mm:ss'),
					orderEndTime:orderEndTime,
				}
				getApp().globalData.guHaoInfor = guHaoInfor
				if(sorningnum<=0){
					uni.showToast({
						title: "预约已满",
						icon:'exception',
						duration:850
					});
				}else {
					uni.navigateTo({
						url: '/pagesA/confirmGuahao/confirmGuahao'
					})
				}

			},
			dealData: function(scheduleInfoList) {
				var tag = weeksArray[0].weekNum;
				// 定义一周七天
				var ar = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
				var A_Mon_text_ar = [];
				var A_Tues_text_ar = [];
				var A_Wed_text_ar = [];
				var A_Thur_text_ar = [];
				var A_Fri_text_ar = [];
				var A_Sat_text_ar = [];
				var A_Sun_text_ar = [];
				var B_Mon_text_ar = [];
				var B_Tues_text_ar = [];
				var B_Wed_text_ar = [];
				var B_Thur_text_ar = [];
				var B_Fri_text_ar = [];
				var B_Sat_text_ar = [];
				var B_Sun_text_ar = [];
				for (var i = 0; i < scheduleInfoList.length; i++) {
					// 
					if (scheduleInfoList[i].timePeriod == 1) {
						if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
							A_Mon_text_ar = A_Mon_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
							A_Tues_text_ar = A_Tues_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
							A_Wed_text_ar = A_Wed_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
							A_Thur_text_ar = A_Thur_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
							A_Fri_text_ar = A_Fri_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
							A_Sat_text_ar = A_Sat_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
							A_Sun_text_ar = A_Sun_text_ar.concat(scheduleInfoList[i]);
						}
					} else {
						if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
							B_Mon_text_ar = B_Mon_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
							B_Tues_text_ar = B_Tues_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
							B_Wed_text_ar = B_Wed_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
							B_Thur_text_ar = B_Thur_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
							B_Fri_text_ar = B_Fri_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
							B_Sat_text_ar = B_Sat_text_ar.concat(scheduleInfoList[i]);
						} else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
							B_Sun_text_ar = B_Sun_text_ar.concat(scheduleInfoList[i]);
						}
					}
				}
				var sch_listData = [{
						"time_title": "上午",
						"Mon_text": A_Mon_text_ar,
						"Tues_text": A_Tues_text_ar,
						"Wed_text": A_Wed_text_ar,
						"Thur_text": A_Thur_text_ar,
						"Fri_text": A_Fri_text_ar,
						"Sat_text": A_Sat_text_ar,
						"Sun_text": A_Sun_text_ar
					},
					{
						"time_title": "下午",
						"Mon_text": B_Mon_text_ar,
						"Tues_text": B_Tues_text_ar,
						"Wed_text": B_Wed_text_ar,
						"Thur_text": B_Thur_text_ar,
						"Fri_text": B_Fri_text_ar,
						"Sat_text": B_Sat_text_ar,
						"Sun_text": B_Sun_text_ar
					},
				]
				return sch_listData;
			}
		}
	}
</script>

<style>
	/**index.wxss**/
	.container {
		width: 100%;
		height: 1800rpx;
		display: flex;
		flex-direction: column;
		/* background-color: aquamarine; */
	}

	.ActContainer {
		width: 100%;
		height: 1177rpx;
		background-color: brown;
	}

	/* 关注信息 */
	.center1 .attention,
	.center1 .active {
		width: 100rpx;
		height: 50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10rpx;
		margin-left: 100rpx;
		margin-top: 80rpx;
		background-color: #08F6F9
	}

	.center1 .active {
		color: #9D9D9D;
		background-color: #646464
	}

	/*医生信息----------------------------start---------------------------*/
	.center1 {
		display: flex;
		font-size: 25rpx;
		align-items: center;
		padding-left: 20rpx;
		padding-top: 20rpx;
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

	.good {
		width: 100%;
		height: 100rpx;
		font-size: 25rpx;
		box-sizing: border-box;
		margin-left: 30rpx;
		padding-right: 30rpx;
		/* overflow: hidden;
    white-space:nowrap; 
    text-overflow: ellipsis; */
	}

	/*医生信息----------------------------end---------------------------*/






	.Yuyue1 {
		width: 100%;
		height: 10rpx;
		/* background-color:red; */
		display: flex;
		justify-content: flex-Start;
		align-items: center;
		padding: 30rpx 20rpx;
		font-size: 30rpx;
		color: rgb(1.6%, 99.5%, 100%);
		border-top: 1rpx solid rgb(216, 215, 215);
		/* border-bottom: 1rpx solid rgb(216, 215, 215); */
	}

	/*科室排班表  */
	.table {
		width: 100%;
		/* height:500rpx; */
		padding: 15rpx;
		/* padding-top: 100rpx; */
		display: flex;
		flex-direction: column;
		border: 1rpx solid rgba(218, 217, 217, 1);
		border-bottom: 0;
		margin-bottom: 15rpx;
		/* background-color: blue; */
	}

	.table_header {
		display: flex;
	}

	.th {
		display: flex;
		flex-direction: column;
		width: 90rpx;
		height: 90rpx;
		background: rgba(241, 252, 255, 1);
		border-right: 1rpx solid rgba(218, 217, 217, 1);
		border-bottom: 1rpx solid rgba(218, 217, 217, 1);
		justify-content: center;
		align-items: center;
		overflow-x: auto;
	}

	.cell_label {
		font-size: 26rpx;
		color: rgba(74, 74, 74, 1);
	}

	.cell_date_label {
		font-size: 20rpx;
		color: rgba(74, 74, 74, 1);
	}

	.table_main {
		display: flex;
		flex-direction: row;
	}

	.right-item {
		display: flex;
		flex-direction: row;
	}

	.td {
		display: flex;
		flex-direction: column;
		width: 90rpx;
		height: 90rpx;
		/* height: 90rpx; */
		background: white;
		justify-content: center;
		align-items: center;
		border: 1rpx solid rgba(218, 217, 217, 1);
		border-top: 0;
		border-left: 0;
		/*background-color: aqua;*/
	}

	.table_Text_class {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60rpx;
		font-size: 30rpx;
		color: rgba(55, 134, 244, 1);
		width: 100%;
		word-break: normal;
		/* border-bottom: 1rpx solid rgba(218, 217, 217, 1); */
	}

	.table_Text_last_class {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60rpx;
		font-size: 30rpx;
		color: #0EEBF9;
		width: 100%;
		word-break: normal;
	}

	/* 时间安排 */

	.Shedule {
		width: 100%;
		height: 600rpx;
		padding: 15rpx;
		display: flex;
		flex-direction: column;
		/* flex-wrap: wrap; */
		background-color: goldenrod;
		position: absolute;
		top: 700rpx;
	}

	.time {
		widows: 100%;
		height: 400rpx;
		background-color: blueviolet;
	}

	.item {
		width: 130rpx;
		height: 50rpx;
		background-color: seashell;
	}
</style>
