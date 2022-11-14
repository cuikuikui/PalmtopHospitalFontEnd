<template>
	<view>
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">环形图</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchPie($event,'canvasRing')"></canvas>
		</view>
	</view>
</template>

<script>
	var canvasObj = {};
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			touchPie(e,id) {
			  canvasObj[id].showToolTip(e, {
			      format: function(item) {
			          return item.name + ':' + item.data
			      }
			  });
			},
		}
	}
</script>

<style>
	.charts {
		width: 750rpx;
		height: 500rpx;
		background-color: #FFFFFF;
	}
	.qiun-charts {
		width: 750rpx;
		height: 500rpx;
		background-color: #FFFFFF;
	}
	.qiun-bg-white {
		background: #FFFFFF;
	}
	.qiun-title-bar {
		width: 96%;
		padding: 10rpx 2%;
		flex-wrap: nowrap;
	}
	.qiun-common-mt {
		margin-top: 10rpx;
	}
	.qiun-title-dot-light {
		border-left: 10rpx solid #0ea391;
		padding-left: 10rpx;
		font-size: 32rpx;
		color: #000000
	}
</style>
