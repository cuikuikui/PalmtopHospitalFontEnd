<template>
	<view>
		<scroll-view style="flex: 1;background: #fff;height: 100%;" scroll-y="true">
			<view class="tui-accordion-content">

				<!--  如何绑定就诊人 -->
				<view class="bind">
					<text>一、如何绑定就诊人</text>
				</view>
				<view class="tui-menu-list">
					<view @click="showFrom" data-param="1" class="title">
						<text class="title-text">1、门诊绑定卡</text>
						<image class="title-arrow" :src="isShowFrom1Src"></image>
					</view>
					<view :class="isShowFrom1 ? '' : 'tui-hide'" style="background-color: #E7E1E1;padding:20rpx;font-size: 25rpx;line-height: 45rpx;">
						<text>打开就诊人管理，点击添加就诊人。根据提示输入姓名，预留手机号码和门诊号（医保卡请输入医保卡号）。系统会发送短信验证码。验证成功后完成绑定</text>
					</view>
				</view>

				<view class="tui-menu-list">
					<view @click="showFrom" data-param="2" class="title">
						<text class="title-text">2、绑定住院号</text>
						<image class="title-arrow" :src="isShowFrom2Src"></image>
					</view>
					<view :class="isShowFrom2 ? '' : 'tui-hide'" style="background-color: #E7E1E1;padding:20rpx;font-size: 25rpx;line-height: 45rpx;">
						<text>打开就诊人管理，点击添加就诊人。切换到住院绑定，根据提示输入住院号码，病人姓名，身份证号码，系统验证通过后完成绑定</text>
					</view>
				</view>

				<!--  如何预约挂号 -->
				<view class="bind">
					<text>二、如何预约挂号</text>
				</view>
				<view class="tui-menu-list">
					<view @click="showFrom" data-param="3" class="title">
						<text class="title-text">3、进入预约挂号</text>
						<image class="title-arrow" :src="isShowFrom3Src" style="position:relative;left:470rpx"></image>
					</view>
					<view :class="isShowFrom3 ? '' : 'tui-hide'" style="background-color: #E7E1E1;padding:20rpx;font-size: 25rpx;line-height: 45rpx;">
						<text>打开首页，选择预约挂号。选择您想预约的科室和医生和日期后，点击马上预约（目前只支持已绑定就诊人的患者）。</text>
					</view>
				</view>

				<view class="tui-menu-list">
					<view @click="showFrom" data-param="4" class="title">
						<text class="title-text">4、预约成功提示</text>
						<image class="title-arrow" :src="isShowFrom4Src" style="position:relative;left:470rpx"></image>
					</view>
					<view :class="isShowFrom4 ? '' : 'tui-hide'" style="background-color: #E7E1E1;padding:20rpx;font-size: 25rpx;line-height: 45rpx;">
						<text>确认预约是否成功。请以健康之路短信通知为准，APP内提示预约成功并不代表真实预约成功！</text>
					</view>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowFrom1: false,
				isShowFrom1Src: '',
				isShowFrom2: false,
				isShowFrom2Src: '',
				isShowFrom3: false,
				isShowFrom3Src: '',
				isShowFrom4: false,
				isShowFrom4Src: '',
				act_index: 0
			}
		},
		onLoad() {
			this.ifshowFrom()
		},
		methods: {
			ifshowFrom: function() {
				if (this.isShowFrom1 == 1) {
					this.isShowFrom1Src = "../../static/images/down.png"
				} else {
					this.isShowFrom1Src = "../../static/images/up.png"
				}
				if (this.isShowFrom2 == 1) {
					this.isShowFrom2Src = "../../static/images/down.png"
				} else {
					this.isShowFrom2Src = "../../static/images/up.png"
				}
				if (this.isShowFrom3 == 1) {
					this.isShowFrom3Src = "../../static/images/down.png"
				} else {
					this.isShowFrom3Src = "../../static/images/up.png"
				}
				if (this.isShowFrom4 == 1) {
					this.isShowFrom4Src = "../../static/images/down.png"
				} else {
					this.isShowFrom4Src = "../../static/images/up.png"
				}
			},
			showFrom: function(e) {
				var param = e.target.dataset.param;
				this.act_index = param
				this.isShowFrom1 = param == 1 ? (!this.isShowFrom1) : false
				this.isShowFrom2 = param == 2 ? (!this.isShowFrom2) : false
				this.isShowFrom3 = param == 3 ? (!this.isShowFrom3) : false
				this.isShowFrom4 = param == 4 ? (!this.isShowFrom4) : false
				this.ifshowFrom()
			}
		}
	}
</script>

<style>
	/* pages/accordion/accordion.wxss */
	page {
		width: 100%;
		height: 100%;
	}

	.tui-accordion-content {
		width: 100%;
		border: 1px solid #c8c7cc;
		overflow: hidden;
	}

	.title {
		width: 100%;
		height: 90rpx;
		display: flex;
		flex-direction: row;
	}

	.title-image {
		width: 40rpx;
		height: 40rpx;
		margin-top: 30rpx;
		margin-left: 20rpx;

	}

	.title-text {
		font-size: 30rpx;
		margin-top: 8rpx;
		margin-left: 10rpx;
	}

	.title-arrow {
		width: 30rpx;
		height: 20rpx;
		position: relative;
		margin-top: 40rpx;
		left: 500rpx;
		/* margin-left: 480rpx; */
	}

	.text-item {
		padding: 20rpx;
		line-height: 40rpx;
	}

	.text-item-title {
		font-weight: bold;
		font-size: 30rpx;
	}

	.text-item-size {
		font-size: 24rpx;
	}

	.scrowview {
		flex: 1;
		background: #fff;
		height: 100%;
	}

	/*文字列表样式  */
	.bind {
		height: 100%;
		/* line-height: 80rpx; */
		color: #555;
		font-size: 35rpx;
		padding: 20rpx 15rpx;
		font-size: 35rpx;
		font-weight: bold;
		border-bottom: 1rpx solid #c8c7cc;
	}

	.tui-menu-list {
		height: 100%;
		line-height: 80rpx;
		color: #555;
		font-size: 35rpx;
		position: relative;
	}

	.tui-menu-list:before {
		content: '';
		display: block;
		height: 1px;
		width: 100%;
		background-color: #c8c7cc;
		position: absolute;
		bottom: 0;
	}

	.tui-menu-list:last-child:before {
		height: 0;
	}

	.tui-hide {
		display: none;
	}
</style>
