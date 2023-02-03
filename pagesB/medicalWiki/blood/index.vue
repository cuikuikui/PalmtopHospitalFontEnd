<template>
	<view class="blood">
		<text style="color: #8a8a8a;">血型一般分为A、B、AB和O四种，其中，AB型可接受任何血型的血液输入，因此被称为万能受血者，O型可以输出给任何血型的人体内，因此被称作万能输血者、异能血者。</text>
		<text style="text-indent: 5px;margin-top: 10px;">填写基本信息</text>
		<view class="fa-mo">
			<text>父亲血型</text>
			<view v-for="(item,index) in fathers" :key="item.id" v-if="item.flag=='1'" @click="switchBlood('father')">{{item.label}}</view>
		</view>
		<view class="fa-mo">
			<text>母亲血型</text>
			<view v-for="(item,index) in mothers" :key="item.id" v-if="item.flag=='1'" @click="switchBlood('mother')">{{item.label}}</view>
		</view>
		<text style="margin-top: 20px;color: #c2922d;">【注：本测试仅供参考，有关疾病相关诊断请咨询医生。】</text>
		<text style="margin-top: 20px;">宝宝的血型可能是：<text style="color: #59d144;">{{booldOk}}</text> </text>
		<text>不可能出现血型是：<text style="color: #db5a2c;">{{bloodNg}}</text> </text>
		
		<view class="searchRes" @click="searchRes">
			查看结果
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				fathers:[
					{id:'f01',label:'A',flag:'1'},
					{id:'f02',label:'B',flag:'0'},
					{id:'f03',label:'O',flag:'0'},
					{id:'f04',label:'AB',flag:'0'},
				],
				mothers:[
					{id:'m01',label:'A',flag:'1'},
					{id:'m02',label:'B',flag:'0'},
					{id:'m03',label:'O',flag:'0'},
					{id:'m04',label:'AB',flag:'0'},
				],
				father:'A',
				mother:'A',
				category1:['A-A','A-O','O-A'],
				category2:['A-B','B-A'],
				category3:['A-AB','B-AB','AB-A','AB-B','AB-AB'],
				category4:['B-B','B-O','O-B'],
				category5:['O-O'],
				category6:['O-AB','AB-O'],
				booldOk:'',
				bloodNg:''
			}
		},
		methods:{
			searchRes(){
				let submitData = this.father+'-'+this.mother
				if(this.category1.includes(submitData)){
					this.booldOk = 'A型或O型'
					this.bloodNg = 'B型或AB型'
				}else if(this.category2.includes(submitData)){
					this.booldOk = 'A型或B型或O型或AB型'
					this.bloodNg = ''
				}else if(this.category3.includes(submitData)){
					this.booldOk = 'A型或B型或AB型'
					this.bloodNg = 'O型'
				}else if(this.category4.includes(submitData)){
					this.booldOk = 'B型或O型'
					this.bloodNg = 'A型或AB型'
				}else if(this.category5.includes(submitData)){
					this.booldOk = 'O型'
					this.bloodNg = 'A型或B型或AB型'
				}else if(this.category6.includes(submitData)){
					this.booldOk = 'A型或B型'
					this.bloodNg = 'O型或AB型'
				}else {
					
				}
				// console.log("=====mother====",submitData)
			},
			switchBlood(type){
				if(type=="father"){
					let curFa = this.fathers
					for(let i=0;i<curFa.length;i++){
						let count = i;
						if(count>=curFa.length-1){
							curFa[0].flag ='1'
							curFa[1].flag ='0'
							curFa[2].flag ='0'
							curFa[3].flag ='0'
							this.father =curFa[0].label
							break
						}else {
							if(curFa[count].flag=='1'){
								curFa[count].flag ='0'
								count++
								curFa[count].flag ='1'
								this.father =curFa[count].label
								break
							}
						}
					}
				}else if(type=="mother"){
					let curMa = this.mothers
					for(let i=0;i<curMa.length;i++){
						let count = i;
						if(count>=curMa.length-1){
							curMa[0].flag ='1'
							curMa[1].flag ='0'
							curMa[2].flag ='0'
							curMa[3].flag ='0'
							this.mother =curMa[0].label
							break
						}else {
							if(curMa[count].flag=='1'){
								curMa[count].flag ='0'
								count++
								curMa[count].flag ='1'
								this.mother =curMa[count].label
								break
							}
						}
					}
				}else {
					
				}
			}
		}
	}
</script>

<style scoped>
	.blood {
		padding: 13px;
		font-size: 13px;
		display: flex;
		flex-direction: column;
	}
	.fa-mo {
		display: flex;
		justify-content: space-between;
		margin-top: 25px;
	}
	.searchRes {
		width: 92%;
		padding: 10px;
		margin-top: 15px;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: 15px;
		background-color: #1765ea;
	}
</style>