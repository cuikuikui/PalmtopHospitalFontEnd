var city= {
      1:
      {
        id: 1,
        name: '苏州',
      },
      2:
      {
        id: 2,
        name: '上海',
      },
      3:
      {
        id: 3,
        name: '南京',
      }
      ,
      4:
      {
        id: 4,
        name: '昆山',
      },
      5:
      {
        id: 5,
        name: '长沙',
      },
      6:
      {
        id: 6,
        name: '衡阳',
      },
      7:
      {
        id: 7,
        name: '武汉',
      },
      8:
      {
        id: 8,
        name: '黄石',
      },
      9:
      {
        id: 9,
        name: '郑州',
      }
      ,
      10:
      {
        id: 10,
        name: '开封',
      }
      ,
      11:
      {
        id: 11,
        name: '衡水',
      }
      ,
      12:
      {
        id: 12,
        name: '石家庄',
      }
      ,
      13:
      {
        id: 13,
        name: '宁波',
      }
      ,
      14:
      {
        id: 14,
        name: '杭州',
      }
      ,
      15:
      {
        id: 15,
        name: '佛山',
      },
      16:
      {
        id: 16,
        name: '珠海',
      },
    }
var province=[
      {
        id: 'category1',
        classifyName: '热门地区',
        city: [1,2]
      },
      {
        id: 'category2',
        classifyName: '江苏',
        city: [3,4]
      },
      {
        id: 'category3',
        classifyName: '湖南',
        city: [5,6]
      },
      {
        id: 'category4',
        classifyName: '湖北',
        city: [7,8] 
      },
      {
        id: 'category5',
        classifyName: '河南',
        city: [9,10]
      },
      {
        id: 'category6',
        classifyName: '河北',
        city: [11,12] 
      },
      {
        id: 'category7',
        classifyName: '浙江',
        city: [13,14] 
      },
      {
        id: 'category8',
        classifyName: '广东',
        city: [15,16]
      }
    ]
var content={
  1:
  {
    id: 1,
    name: '女',
  },
  2:
  {
    id: 2,
    name: '公费',
  },
  3:
  {
    id: 3,
    name: '新农合',
  },
  4:
  {
    id: 4,
    name: '自费',
  },
  5:
  {
    id: 5,
    name: '其他',
  },
  6:
  {
    id: 6,
    name: '本市郊区',
  },
  7:
  {
    id: 7,
    name: '本市以外',
  },
  8:
  {
    id: 8,
    name: '大专、高中',
  },
  9:
  {
    id: 9,
    name: '本科',
  },
  10:
  {
    id: 10,
    name: '研究生以上',
  },
  11:
  {
    id: 11,
    name: '良好',
  },
    12:
  {
    id: 12,
    name: '好',
  },
    13:
  {
    id: 13,
    name: '较差',
  },
    14:
  {
    id: 14,
    name: '很差',
  },
    15:
  {
    id: 15,
    name: '满意',
  },
    16:
  {
    id: 16,
    name: '一般',
  },
    17:
  {
    id: 17,
    name: '不满意',
  },
    18:
  {
    id: 18,
    name: '非常不满意',
  },
    19:
  {
    id: 19,
   name: '满意',
  },
    20:
  {
    id: 20,
    name: '一般',
  },
    21:
  {
    id: 21,
    name: '不满意',
  },
    22:
  {
    id: 22,
    name: '非常不满意',
  },
    23:
  {
    id: 23,
   name: '满意',
  },
    24:
  {
    id: 24,
    name: '一般',
  },
    25:
  {
    id: 25,
    name: '不满意',
  },
    26:
  {
    id: 26,
    name: '非常不满意',
  },
      27:
  {
    id: 27,
   name: '满意',
  },
    28:
  {
    id: 28,
    name: '一般',
  },
    29:
  {
    id: 29,
    name: '不满意',
  },
    30:
  {
    id: 30,
    name: '非常不满意',
  },
      31:
  {
    id: 31,
   name: '满意',
  },
    32:
  {
    id: 32,
    name: '一般',
  },
    33:
  {
    id: 33,
    name: '不满意',
  },
    34:
  {
    id: 34,
    name: '非常不满意',
  }
}
var radioSingle=[
	  {text:'*3',title:'您的性别',tempct:'男',content:[1]},
	  {text:'*4',title:'您的付费方式',tempct:'医保',content:[2,3,4,5]},
	  {text:'*5',title:'您来自(实际居住地)',tempct:'本市城区',content:[6,7]},
	  {text:'*6',title:'您的学历',tempct:'中专、初中以下',content:[8,9,10]},
	  {text:'*7',title:'概括而言,您对自己身体的整体健康评价',tempct:'极好',content:[11,12,13,14]},
	  {text:'*8',title:'医院医院整体的清洁程度',tempct:'非常满意',content:[15,16,17,18]},
	  {text:'*9',title:'您对医院医生的诊疗技术水平',tempct:'非常满意',content:[19,20,21,22]},
	  {text:'*10',title:'您对医院所有人员的服务态度和服务效率的满意程度',tempct:'非常满意',content:[23,24,25,26]},
	  {text:'*11',title:'您对本次就诊的整体满意程度',tempct:'非常满意',content:[27,28,29,30]},
	  {text:'*12',title:'您是否愿意将该医院推荐给您的家人、亲戚、朋友和同事',tempct:'非常满意',content:[31,32,33,34]},
    ]
	
var disClaimers=[
	{text:'1、一切移动客户端用户在下载并浏览APP手机APP软件时均被视为已经仔细阅读本条款并完全同意。凡以任何方式登陆本APP，或直接、间接使用本APP资料者，均被视为自愿接受本网站相关声明和用户服务协议的约束。 '},
	{text:'2、APP手机APP转载的内容并不代表APP手机APP之意见及观点，也不意味着本网赞同其观点或证实其内容的真实性。 '},
	{text:'3、APP手机APP转载的文字、图片、音视频等资料均由本APP用户提供，其真实性、准确性和合法性由信息发布人负责。APP手机APP不提供任何保证，并不承担任何法律责任。 '},
	{text:'4、APP手机APP所转载的文字、图片、音视频等资料，如果侵犯了第三方的知识产权或其他权利，责任由作者或转载者本人承担，本APP对此不承担责任。'},
	{text:'5、APP手机APP不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该外部链接指向的不由APP手机APP实际控制的任何网页上的内容，APP手机APP不承担任何责任。'},
	{text:'6、用户明确并同意其使用APP手机APP网络服务所存在的风险将完全由其本人承担；因其使用APP手机APP网络服务而产生的一切后果也由其本人承担，APP手机APP对此不承担任何责任。 '},
	{text:'7、除APP手机APP注明之服务条款外，其它因不当使用本APP而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，APP手机APP概不负责，亦不承担任何法律责任。 '},
	{text:'8、对于因不可抗力或因黑客攻击、通讯线路中断等APP手机APP不能控制的原因造成的网络服务中断或其他缺陷，导致用户不能正常使用APP手机APP，APP手机APP不承担任何责任，但将尽力减少因此给用户造成的损失或影响。'},
	{text:'9、本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。'},
	{text:'10、本网站相关声明版权及其修改权、更新权和最终解释权均属APP手机APP所有。'}
]
// 1、流行病史
let epidemicHis = [
	{
		value: 'A1',
		name: '有境外高风险地区旅居史（14天内）',
		flag:'0'
	},
	{
		value: 'A2',
		name: '有境内中高风险地区旅居史（7天内）',
		flag:'0'
	},
	{
		value: 'A3',
		name: '有省市卫生行政部门发布的疫情重点地区（县/区）旅居史（7天内）',
		flag:'0'
	},
	{
		value: 'A4',
		name: '本人（及陪同家属）以上均无',
		flag:'0'
	}
]
// 2、接触史
let touchHis = [
	{
		value: 'B1',
		name: '有新冠病毒感染人员或病例报告社区有发热、呼吸道等症状人员接触史（7天内）',
		flag:'0'
	},
	{
		value: 'B2',
		name: '健康码异常人员（7天内）',
		flag:'0'
	},
	{
		value: 'B3',
		name: '有聚集性发病史（2例及以上发热或呼吸道症状病例）（7天内）',
		flag:'0'
	},
	{
		value: 'B4',
		name: '本人（及陪同家属）以上均无。',
		flag:'0'
	}
]
// 3、高风险岗位人员
let highRisk = [
	{
		value: 'C1',
		name: '跨境交通工具司乘、保洁、维修等人员。',
		flag:'0'
	},
	{
		value: 'C2',
		name: '海关、移民管理部门等其他直接接触入境人员和物品的一线人员。',
		flag:'0'
	},
	{
		value: 'C3',
		name: '口岸进口物品搬运人员和管理服务人员。',
		flag:'0'
	},
	{
		value: 'C4',
		name: '船舶引航员等登临外籍船舶作业人员。',
		flag:'0'
	},
	{
		value: 'C5',
		name: '进口冷链食品、药品（含外包装）监管和从业人员。',
		flag:'0'
	},
	{
		value: 'C6',
		name: '定点医疗机构和普通医疗机构发热门诊工作人员。',
		flag:'0'
	},
	{
		value: 'C7',
		name: '从事新冠病毒感染者及其他风险人群转运的急救及社区工作人员。',
		flag:'0'
	},
	{
		value: 'C8',
		name: '集中隔离医学观察场所工作人员。',
		flag:'0'
	},
	{
		value: 'C9',
		name: '从事风险人群核酸采样、运送及检测人员。',
		flag:'0'
	},
	{
		value: 'C10',
		name: '其他经风险研判确定的高风险岗位人员。',
		flag:'0'
	},
	{
		value: 'C11',
		name: '本人（及陪同家属）以上均无。',
		flag:'0'
	}
]
// 4、十大临床病状
let clinical =[
	{
		value: 'D1',
		name: '发热',
		flag:'0'
	},
	{
		value: 'D2',
		name: '干咳',
		flag:'0'
	},
	{
		value: 'D3',
		name: '鼻塞',
		flag:'0'
	},
	{
		value: 'D4',
		name: '流涕',
		flag:'0'
	},
	{
		value: 'D5',
		name: '咽喉等呼吸道症状',
		flag:'0'
	},
	{
		value: 'D6',
		name: '腹泻等消化道症状',
		flag:'0'
	},
	{
		value: 'D7',
		name: '乏力',
		flag:'0'
	},
	{
		value: 'D8',
		name: '肌痛',
		flag:'0'
	},
	{
		value: 'D9',
		name: '结膜炎',
		flag:'0'
	},
	{
		value: 'D10',
		name: '嗅觉味觉减退等其他症状',
		flag:'0'
	},
	{
		value: 'D11',
		name: '本人（及陪同家属）以上均无。',
		flag:'0'
	}
]
module.exports = {
    province,
    city,
	radioSingle,
	content,
	disClaimers,
	epidemicHis,
	touchHis,
	highRisk,
	clinical
}
