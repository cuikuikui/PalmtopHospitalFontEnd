<template>
	<view>
		<custom-tabs type="c1" :value="value" :animation="true" :defaultTextStyle="{'color':'#8a8a8a'}"
			:activeTextStyle="{color:'#1ee7e3','font-weight':700}"
			:activeLineStyle="{'background-color':'#1ee7e3',height:'6rpx'}" @change="changeIndex">

			<custom-tab-pane label="医院简介" name="c1_1">
				<view class="pane">
					苏州大学附属第二医院始建于1988年，又名核工业总医院、中法友好医院，是一所集医疗、教学、科研、预防、应急等为一体的三级甲等医院，也是苏州大学医学部第二临床医学院、国家卫生健康委核事故医学应急中心第四临床部。医院是国家临床医学博士后流动站，临床医学一级学科博士、硕士学位授予点，住院医师规范化培训基地，国家药物临床试验基地。医院设有放射医学与辐射防护国家重点实验室临床中心、江苏省体医融合促进老年骨骼健康应用工程研究中心、江苏省神经疾病诊疗技术工程研究中心、苏州市放射治疗学临床医学中心、苏州市神经疾病临床医学中心、苏州市神经外科临床医学中心、苏州市骨科临床医学中心、苏州市骨质疏松临床医学中心，4个苏州大学研究所、10个市重点实验室。
					医院正在建设“全国一流三甲医院、核特色鲜明的一流大学附属医院、高度国际化的医教研融合临床研究中心。”医院现由三香路院区、络香路院区、浒关院区和西环路院区组成，共设床位2050张。在2021年度全国三级公立医院绩效考核中，我院位居全国无年报组（非政府财政预算）第2名。医院现有临床科室34个，医技科室14个，教研室26个，在职员工3300多人，高级专家670多名，享受国务院政府特殊津贴专家15人，博士生导师53名，硕士生导师160名。
				</view>
			</custom-tab-pane>
			
			<custom-tab-pane label="医院交通" name="c1_2">
				<view class="pane">
					地址：江苏省苏州市姑苏区三香路1055号
					
					公交线路：2路、35路、38路、39路、40路、51路、60路、68路、69路、89路、303路、304路、308路、317路、321路、502路、931路附二院(体育中心)站下
					（地铁1号线西环路站下步行约1.1公里，地铁2号线三香广场站下步行约1.3公里）
					
					注：交通路线请以交通管理部门实时情况为准。
				</view>
			</custom-tab-pane>
			
			<custom-tab-pane label="官方网站" name="c1_3">
				<view class="pane">https://www.sdfey.com/</view>
			</custom-tab-pane>
			
			<custom-tab-pane label="医院电话" name="c1_4">
				<view class="pane">医院电话:0512-68282030</view>
			</custom-tab-pane>
		</custom-tabs>
	</view>
</template>
// #ifdef VUE3
<script setup>
	import { reactive, ref, watch } from 'vue';
	const value = ref(2);
	function changeIndex(e) {
		console.log('选中1:', e)
	}
</script>
 // #endif
<script>
	export default {
		data() {
			return {
				value: 0
			}
		},
		methods: {
			changeIndex(e) {
				console.log('选中2:', e)
			}
		}
	}
</script>
<style scoped>
	.pane {
		padding: 10px;
		font-size: 12px;
	}
</style>
