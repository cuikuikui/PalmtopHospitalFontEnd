
<script>
	import Vue from 'vue'
	export default {
		globalData:{
			    hospitals:null,
			    WeChatUserInfo:null,
			    guHaoInfor:null,
			    family:null,
			    successFlag:false,
			    imgNew:'',
			    imgOld:'',
			    testImg:'',
			    appkey:"db071422252a8acc",
				timer:null,
				// 远程服务器电脑
			    // host:'http://47.102.124.213/Hospital',
				// 公司电脑
				host:'http://localhost:8080/PalmtopHospitalBackEnd',
				// macBook电脑
				// host:'http://localhost:8088/Hospital/',
			    location: "",
			    LoginIndex:'',
				familySign:'',//跳转到就诊人标志，01:从确认挂号跳转到就诊人页面，02:从首页处跳转到就诊人页面
				fId:'',
		},
		onLaunch: function() {
			// uni.clearStorage()
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;	
				}
			})
			console.log('App Launch5')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>	
	@import '././static/style/weui.wxss';
	@import '././static/style/font/iconfont.css';
	/*每个页面公共css */
</style>
