<template>
	<view class="result">
		<view class="topx">
			<text>BMI = 体重kg ÷ 身高㎡。是世界卫生组织认定的胖瘦判断以及是否健康的标准，适用于成年男女。</text>
		</view>
		<view class="topy">
			<text style="color:#e6b967;font-size: 20px;">您的BMI是:{{result}}</text>
			<text style="margin-left: 30px;color: #8a8a8a;">体型:{{resMsg}}</text>
		</view>
		<view class="index" :style="leftPos">
			<span class="iconfont icon-dingwei"></span>
		</view>
		<view class="center">
			<text style="margin-bottom: 20px;">( 身高：{{height}} cm {{''}} 体重：{{weight}} kg )</text>
			<view class="line">
				<text style="left: 10px;">15</text>
				<view class="model1 model">偏瘦</view>
				<text style="left: 35px;">18.5</text>
				<view class="model2 model">正常</view>
				<text style="left: 107px;">24</text>
				<view class="model3 model">偏胖</view>
				<text style="left: 155px;">28</text>
				<view class="model4 model">肥胖</view>
				<text style="left: 250px;">36</text>
				<view class="model5 model">重度</view>
				<text style="left: 350px;">45</text>
			</view>
		</view>
		
		<view class="alerMsg">
			<text>{{alertMsg}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				result:'',
				weight:'',
				height:'',
				resMsg:'',
				alertMsg:'',
				leftPos:''
			}
		},
		onLoad(options) {
			this.result = options.result
			this.weight = options.weight
			this.height = options.height
			let res = parseFloat(this.result)
			let percent = ((res-15)/30).toFixed(2)
			let curPos =(percent*350).toFixed(2)
			this.leftPos = 'left:'+curPos+'px'
			console.log("ewewewewe",this.leftPos)
			if(res>15 && res<18.5){
				this.resMsg = '偏瘦'
				this.alertMsg='您的体重状况为:偏瘦。根据本计算，您目前的体重低于。正常范围，请适当调整饮食结构，增加富含营养的食物摄入(如蔬菜水果、鱼类等)，加强锻炼。必要时请就医，检查有无患慢性全身性消耗性疾病(如贫血、慢性萎缩性。胃炎、恶性肿瘤、糖尿病、结核病等)可能。'
			}else if(res>=18.5 && res<24){
				this.resMsg = '正常'
				this.alertMsg ='您的体重状况为:正常。根据本计算，您目前的体重在健康范围内，患心血管疾病、糖尿病、高血压、高血脂等疾病风险较低，请继续保持。'
			}else if(res>=24 && res<28){
				this.resMsg = '偏胖'
				this.alertMsg ='您的体重状况为:偏胖。根据本计算，您目前的体重稍高。于正常范围，请适当运动，调整饮食结构，补充富含膳食纤维的食物(如蔬菜水果、粗粮杂粮、豆类及菌藻类食物)，减少不必要的高热量食物(如蛋糕、饮料、酸奶等)摄入。同时，您患心血管疾病、糖尿病、高血压、高血脂等疾病的风险较高，请定期检查。'
			}else if(res>=28 && res<36){
				this.resMsg = '肥胖'
				this.alertMsg ='您的体重状况为:肥胖。根据本计算，您目前属于肥胖，请定日定量运动，调整饮食结构，补充富含膳食纤维的食。物(如蔬菜水果、粗粮杂粮、豆类及菌藻类食物)，减少不必要的高热量食物(如蛋糕、饮料、酸奶等)摄入。必要时及时就医，检查有无心血管疾病、高血压、高胆固醇。等疾病。'
			}else if(res>=36 && res<=45){
				this.resMsg = '重度肥胖'
				this.alertMsg ='您的体重状况为:重度肥胖。根据本计算，您目前属于重度肥胖，可能引起高血压、糖尿病、痛风等疾病，并发其他疾病的风险也高于非肥胖者。建议先去医院进行一次彻底的体检，然后寻求专业的减肥机构来减肥。健康无价，加油哦!'
			}else {
				
			}
		},
		onShow() {
			// let curHeight = uni.getSystemInfoSync().windowHeight;
			// let curWidth = uni.getSystemInfoSync().windowWidth;
			// console.log("==curHeight===",curHeight)
			// console.log("==curWidth===",curWidth)
		}
	}
</script>

<style scoped>
	.result {
		padding: 10px;
	}
	.topx {
		display: flex;
		font-size: 13px;
	}
	.center {
		display: flex;
		color: #8a8a8a;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.line {
		width: 97%;
		height: 35px;
		border: 2px solid #8a8a8a;
		display: flex;
	}
	.line text {
		position: absolute;
		font-size: 15px;
		top: 165px;
	}
	.index {
		position: absolute;
		top: 92px;
		left:91px;
	}
	.alerMsg {
		padding-top: 30px;
		font-size: 15px;
	}
	.model {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		color: white;
	}
	.model1 {
		width: 12%;
		background-color: #33c5b8;
	}
	.model2{
		width: 18%;
		background-color: #8BC34A;
	}
	.model3 {
		width: 13%;
		background-color: #FFC107;
	}
	.model4{
		width: 27%;
		background-color: #F44336;
	}
	.model5{
		width: 30%;
		background-color: #b763c5;
	}

</style>