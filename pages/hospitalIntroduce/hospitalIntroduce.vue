<template>
	<view>
		<scroll-view scroll-y="true" class="container">
			<view class="title">
				<text>海隆人民医院</text>
			</view>
			<swiper class='u-wrp-bnr' indicator-dots='true' autoplay='true' interval='5000' duration='1000' circular='true'>
				<block v-for="(item,index) in swiperImg" :key="index">
					<swiper-item style="overflow: hidden;">
						<!-- 这里可以添加标题 -->
						<text class="text1">{{item.name}}</text>
						<image :src='item.url' class='u-img-slide' mode='aspectFill'></image>
					</swiper-item>
				</block>
			</swiper>
			<view class="content" style="margin-top: 50rpx;">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>
			<view class="hname">1、海隆人民医院<text>昆山</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">2、海隆人民医院<text>上海</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">3、海隆人民医院<text>苏州</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">4、海隆人民医院<text>南京</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">5、海隆人民医院<text>长沙</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">6、海隆人民医院<text>衡阳</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">7、海隆人民医院<text>武汉</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>

			<view class="hname">8、海隆人民医院<text>黄石</text>分院</view>
			<view class="content">
				<text :decode="true">
					&nbsp;&nbsp;海隆人民医院建于xxxx年，国家卫生健康委委管医院，集医疗、教学、科研、预防、康复与保健为一体的综合性医院。目前,在昆山、苏州、南京、上海、长沙、衡阳、武汉以及黄石等城市分别设有4个分院。至今全国共计32个分院。
				</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperImg: [{
					"id": 1,
					"name": "昆山分院",
					"url": "http://47.102.124.213/images/guaHao/h1.jpeg"
				}, {
					"id": 2,
					"name": "苏州分院",
					"url": "http://47.102.124.213/images/guaHao/h2.jpeg"
				}, {
					"id": 3,
					"name": "上海分院",
					"url": "http://47.102.124.213/images/guaHao/h3.jpeg"
				}, {
					"id": 4,
					"name": "南京分院",
					"url": "http://47.102.124.213/images/guaHao/h4.jpeg"
				}, {
					"id": 4,
					"name": "长沙分院",
					"url": "http://47.102.124.213/images/guaHao/h5.jpeg"
				}, {
					"id": 4,
					"name": "黄石分院",
					"url": "http://47.102.124.213/images/guaHao/h6.jpeg"
				}, {
					"id": 4,
					"name": "武汉分院",
					"url": "http://47.102.124.213/images/guaHao/h7.jpeg"
				}, {
					"id": 4,
					"name": "衡阳分院",
					"url": "http://47.102.124.213/images/guaHao/h8.jpeg"
				}],
			}
		},
		methods: {

		}
	}
</script>

<style>
	.container {
		height: 1400rpx;
		/*overflow: hidden;*/
	}

	.container .u-wrp-bnr {
		margin-top: 20rpx;
		width: 100%;
		height: 270rpx;
		display: block;
		/* position: relative;
  top: 100rpx; */
		background: #f0f0f0;
	}

	.container .u-img-slide {
		width: 100%;
		height: inherit;
		/*z-index: 1*/
	}

	.container .title {
		width: 100%;
		text-align: center;
		font-size: 80rpx;
		font-weight: bold;
		color: #F40E0E;
		letter-spacing: 5rpx;
		font-family: cursive;
		font-weight: bold;
		background-color: #00FFFF
	}

	/*轮播图上添加文字*/
	.container .u-wrp-bnr .text1 {
		width: 200rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		color: rgb(29, 27, 26);
		letter-spacing: 5rpx;
		font-family: cursive;
		font-weight: bold;
		position: absolute;
		border-radius: 20rpx;
		top: 0;
		left: 85%;
		background-color: burlywood;
		transform: translateX(-50%);
	}

	.container .content {
		padding-left: 30rpx;
		padding-right: 30rpx;
		font-size: 26rpx;
		color: #767474;
		letter-spacing: 5rpx;
		font-family: SimSun;
	}

	.container .hname {
		/*	width:700rpx;
	height:50rpx;*/
		margin: 20rpx;
		background-color: #FAE9E9;
		padding: 20rpx;
		color: #101010;
		font-size: 30rpx;
		font-weight: bold;
		border-radius: 15rpx;
		letter-spacing: 7rpx;
	}

	.container .hname text {
		color: #1C16F2;
	}
</style>
