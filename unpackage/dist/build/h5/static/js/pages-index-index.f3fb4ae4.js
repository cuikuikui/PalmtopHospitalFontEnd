(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"0a51":function(t,e,i){"use strict";var a=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i("67fc"),n=a(i("c89b")),r={data:function(){return{bnrUrl:[{id:1,name:"昆山分院",url:"http://47.102.124.213/images/guaHao/h1.jpeg"},{id:2,name:"苏州分院",url:"http://47.102.124.213/images/guaHao/h2.jpeg"},{id:3,name:"上海分院",url:"http://47.102.124.213/images/guaHao/h3.jpeg"},{id:4,name:"南京分院",url:"http://47.102.124.213/images/guaHao/h4.jpeg"},{id:4,name:"长沙分院",url:"http://47.102.124.213/images/guaHao/h5.jpeg"},{id:4,name:"黄石分院",url:"http://47.102.124.213/images/guaHao/h6.jpeg"},{id:4,name:"武汉分院",url:"http://47.102.124.213/images/guaHao/h7.jpeg"},{id:4,name:"衡阳分院",url:"http://47.102.124.213/images/guaHao/h8.jpeg"}],categoryLists:[{index:1,name:"预约挂号",src:"http://47.102.124.213/images/guaHao/1.png"},{index:2,name:"预约体检",src:"http://47.102.124.213/images/guaHao/2.png"},{index:3,name:"医院介绍",src:"http://47.102.124.213/images/guaHao/3.png"},{index:4,name:"医生介绍",src:"http://47.102.124.213/images/guaHao/4.png"},{index:5,name:"科室介绍",src:"http://47.102.124.213/images/guaHao/5.png"},{index:6,name:"智能导诊",src:"http://47.102.124.213/images/guaHao/6.png"},{index:7,name:"健康百科",src:"http://47.102.124.213/images/guaHao/7.png"},{index:8,name:"满意度调查",src:"http://47.102.124.213/images/guaHao/8.png"},{index:9,name:"院内导航",src:"http://47.102.124.213/images/guaHao/9.png"},{index:10,name:"全部",src:"http://47.102.124.213/images/guaHao/10.png"}],showDoctor:!0,doctors:""}},onLoad:function(){this.LoginIndex=uni.getStorageSync("LoginIndex")},onShow:function(){this.collectedDoctors()},methods:{gotToHospital:function(t){uni.navigateTo({url:"../menu/menu?id="+t})},doctorIntroduce:function(){this.showDoctor=!1,uni.navigateTo({url:"../doctorIntroduce/doctorIntroduce"})},getItem:function(t){t=t;1==t?uni.navigateTo({url:"../hospital/hospital"}):2==t||(3==t?uni.navigateTo({url:"../hospitalIntroduce/hospitalIntroduce"}):4==t?uni.navigateTo({url:"../doctorIntroduce/doctorIntroduce"}):5==t||6==t||(7==t?uni.navigateTo({url:"../webView/webView?index="+t}):8==t?""==this.LoginIndex?uni.redirectTo({url:"../login/login"}):uni.navigateTo({url:"../guaHaoEvaluate/guaHaoEvaluate"}):9==t&&uni.navigateTo({url:"../webView/webView?index="+t})))},collectedDoctors:function(){var t=this,e={openId:uni.getStorageSync("openid")};n.default.post(o.GetCollectDoctorByOpenid,e).then((function(e){t.doctors=e,0==e.length&&(t.showDoctor=!0)})).catch((function(t){}))}}};e.default=r},"1b2b":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".container[data-v-2546780b]{height:%?1800?%}.header[data-v-2546780b]{padding:%?0?% %?30?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.sec[data-v-2546780b]{padding:%?0?% %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?25?%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.u-wrp-bnr[data-v-2546780b]{margin-top:%?20?%;width:100%;height:%?270?%;display:block;\n\t/* position: relative;\n  top: 100rpx; */background:#f0f0f0}\n\n/*轮播图上添加文字*/.u-wrp-bnr .text1[data-v-2546780b]{width:%?200?%;text-align:center;font-size:%?40?%;font-weight:700;color:#1d1b1a;letter-spacing:%?5?%;font-family:cursive;font-weight:700;position:absolute;border-radius:%?20?%;top:0;left:85%;background-color:#deb887;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.u-img-slide[data-v-2546780b]{width:100%;height:inherit}.categoryList[data-v-2546780b]{width:100%;height:%?350?%;border-bottom:%?20?% solid #f4f4f4}.category-info[data-v-2546780b]{display:inline-block;text-align:center;position:relative;margin-top:%?20?%;height:%?150?%;width:20%}.category-image[data-v-2546780b]{width:%?95?%;height:%?95?%}.category-text[data-v-2546780b]{font-size:%?25?%;width:100%;line-height:%?30?%}.collectDoc[data-v-2546780b]{font-size:%?35?%;padding:%?20?% %?50?%;color:#7f7f7d;border-bottom:%?1?% solid #d8d7d7}\n\n/*医生收藏*/.doctItems[data-v-2546780b]{width:100%;height:%?220?%;color:#7f7f7d;display:-webkit-box;display:-webkit-flex;display:flex;font-size:%?35?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-bottom:%?20?%;border-bottom:%?1?% solid #d8d7d7}.itemImage[data-v-2546780b]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;width:%?100?%;height:%?150?%;padding-top:%?40?%;padding-right:%?30?%;padding-left:%?30?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.addCollect[data-v-2546780b]{width:%?150?%;height:%?100?%;font-size:%?30?%;margin-top:%?43?%;margin-left:%?30?%;\n\t/*  position: relative;\n  left:780rpx;*/\n\t/*background-color: #C1C6D4;*/color:#4a4a4a}",""]),t.exports=e},3060:function(t,e,i){"use strict";var a=i("ef6a"),o=i.n(a);o.a},"5ace":function(t,e,i){"use strict";i.r(e);var a=i("a046"),o=i("db9a");for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i("3060");var r,s=i("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"2546780b",null,!1,a["a"],r);e["default"]=c.exports},"67fc":function(t,e){var i="/WechatUserAdd",a="/WechatUserQuery",o="/GetHospitalByCity",n="/GetOfficeByHospitalId",r="/WechatUserInsert",s="/WechatUserQuery",c="/GetRoomsByOfficeId",d="/scheduleList",l="/GetDoctorsByRoomId",u="/GetDoctorsByDay",g="/AskerInsert",p="/AskerQuery",h="/AskerUpdate",f="/AskerDelete",v="/GuaHaoInsert",b="/GetGuaHaoInfoByOpenId",y="/AddScheduleNum",m="/PayGuaHaoOK",w="/GetHospitalByName",A="/InsertCollection",x="/DeleteCollection",k="/GetCollectHospitalByOpenid",G="/GetCollectDoctorByOpenid",D="/GetNoticeByHospitalId",I="/GetAllDoctorList",H="/GetDoctorsByNamePercent",C="/GetGuaHaoHospitals",B="/AddEvaluate";t.exports={getMainPage1:i,getMainPage2:a,GetHospitalByCity:o,GetOfficeByHospitalId:n,WechatUserInsert:r,WechatUserQuery:s,GetRoomsByOfficeId:c,scheduleList:d,GetDoctorsByRoomId:l,GetDoctorsByDay:u,AskerInsert:g,AskerQuery:p,AskerUpdate:h,AskerDelete:f,GuaHaoInsert:v,GetGuaHaoInfoByOpenId:b,AddScheduleNum:y,PayGuaHaoOK:m,GetHospitalByName:w,InsertCollection:A,DeleteCollection:x,GetCollectHospitalByOpenid:k,GetCollectDoctorByOpenid:G,GetNoticeByHospitalId:D,GetAllDoctorList:I,GetDoctorsByNamePercent:H,GetGuaHaoHospitals:C,AddEvaluate:B}},a046:function(t,e,i){"use strict";var a,o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticStyle:{height:"1800rpx"}},[a("v-uni-scroll-view",{staticClass:"container",attrs:{"scroll-y":"true"}},[a("v-uni-view",{staticClass:"header"},[a("v-uni-image",{staticStyle:{width:"50rpx",height:"50rpx","margin-top":"30rpx"},attrs:{src:i("d2d0")}}),a("v-uni-text",{staticStyle:{color:"#3678F0","margin-top":"30rpx"}},[t._v("掌上海隆医院")]),a("v-uni-image",{staticStyle:{width:"50rpx",height:"50rpx","margin-top":"30rpx"},attrs:{src:i("b30a")}})],1),a("v-uni-view",{staticClass:"sec"},[a("v-uni-text",{staticStyle:{color:"#3678F0"}},[t._v("扫一扫")]),a("v-uni-text",{staticStyle:{color:"#3678F0"}},[t._v("二维码")])],1),a("v-uni-swiper",{staticClass:"u-wrp-bnr",attrs:{"indicator-dots":"true",autoplay:"true",interval:"5000",duration:"1000",circular:"true"}},[t._l(t.bnrUrl,(function(e,i){return[a("v-uni-swiper-item",{key:i+"_0",staticStyle:{overflow:"hidden"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.gotToHospital(e.id)}}},[a("v-uni-text",{staticClass:"text1"},[t._v(t._s(e.name))]),a("v-uni-image",{staticClass:"u-img-slide",attrs:{src:e.url,mode:"aspectFill"}})],1)]}))],2),a("v-uni-swiper",{staticClass:"categoryList"},[a("v-uni-swiper-item",[t._l(t.categoryLists,(function(e,i){return[a("v-uni-view",{key:i+"_0",staticClass:"category-info",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.getItem(e.index)}}},[a("v-uni-image",{staticClass:"category-image",attrs:{src:e.src}}),a("v-uni-view",{staticClass:"category-text"},[t._v(t._s(e.name))])],1)]}))],2)],1),a("v-uni-view",{staticClass:"collectDoc"},[t._v("收藏的医生")]),a("v-uni-view",{staticClass:"doctItems"},[a("v-uni-scroll-view",{staticStyle:{width:"700rpx","white-space":"nowrap"},attrs:{"scroll-x":"true",hidden:t.showDoctor}},[a("v-uni-view",{staticStyle:{width:"600rpx"}},t._l(t.doctors,(function(e,i){return a("v-uni-view",{key:i,staticClass:"itemImage",staticStyle:{display:"inline-block"}},[a("v-uni-image",{staticStyle:{width:"100rpx",height:"100rpx"},attrs:{src:e.dimg}}),a("v-uni-view",{staticStyle:{"font-size":"30rpx"}},[t._v(t._s(e.dname))])],1)})),1)],1),1==t.showDoctor?a("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.doctorIntroduce.apply(void 0,arguments)}}},[a("v-uni-text",[t._v("暂无收藏医生,可在"),a("v-uni-text",{staticStyle:{color:"rgb(15, 196, 216)"}},[t._v("医生介绍")]),t._v("中收藏医生")],1)],1):t._e()],1),a("v-uni-view",{staticClass:"collectDoc"},[t._v("就诊提醒")]),a("v-uni-view",{staticClass:"doctItems"})],1)],1)},n=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}))},b30a:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADyElEQVRoQ+1ZTYwMURD+qmfISgRheyeIxMlhbaaHiJ8TDm4IpoflRNxIJOLn4oCLk0REHCQSEgmH6dkIVwkOEg7oGVkiKyFB7E4PDg4r1nRJj2nbenu63+vpNXazfZp5/bqqvldVX716jzDFH5ri9mMGQKc92NIDOd3aFNc401AfBH07GTInAOjbO5JJjSnDcY13v/v+A/Ne31G/Of9zO74u4PTPr+3KTNtY8nRA/eSVMwGAs0oM3G9XGcM+WzEyZxw5WX3kDEE53a5MAjb7vTv9AZDNB8yBnutRq5fbVd3PCl1z54V5gNjeaZYyt2VlxvJA2VCFqVbTLSf0GskfAuBB2VA3Rxnvvtd0i93fiQDwMok/HuMCiJCZDIBWTOJlG1kAgjKTAdCKSbyhIgtAUOYMgEYSC66WVBILykzGAzm9dojBl/3swYx9lZJ6yxmXDSFBmckAaBp4DMDWca6HWTHUox7Kk/KAoMzkAERxt6wHouQ1AbYHQCFl5fPiopeyysIqsWhxzOaH1xGlHrdVyAB8BDAUCYCwAowlIlsJACMAXkXKZFoO4uXtAojUEzShY7vR1fkv2TrVy7Gs9nzkZadWbCOrwyaseVFUn4b2Ax7O3yiroBU7BbGNrGyG/dDtLyIByArv5HzhrXInjQzTHQigWeITC6G+/s/LUmN8EsR9DFiKbV80BzKPohYlV6jmmOmCM084hCYjiTXdcir4+T8GE+6Wi+r2KABavvbWS6NCSfyPmnqhrszbjTlgY3VkSRQyP40yUKwY6u5ID+jVKkCqOy/FKe1ZaWEllIX8HkhiK6EVakvBfATAWmdBmOuXlDqPIJ1uVFkmGioXu52K/9ej7bFWoI4rUjngByC6b2lyfeBu1G/YqsLnXpvtwfFxGiwb3X1RHgl6H3ku5AXQTEbp7bRfcVCeySyUVAi5ggWbDyEPdASAYPs3A8AbHlq+dg3E+3+P0RP6OdZv3l78LlYIdcIDidSBPznQ4ohc5GArbhInCsA1Is7R4n8FIIyrWzX1/m96C9W5s0A3wdjWeMd0vVzqPuCMe+fOYmpckLhPrK1EEsfrv4/eleMArwTYOW4uVoyew17jsrp1moDGhUirR2F7y/NS5p5UEsepjo1FDb+hmbCZ03RrFEBXmD4CnzONnlPTG8BkXPJphdpOMA94Yvm8aagn/uZ86yoIB0M9QLzKLPaYoR4IYhvZMAq6Zt1QeD9nlLvWKTT7w7Pi/DdBMrO7htf7xxWFVjtjoz+UG+6tpxAAWaM7NX96NvWdWs04eqe8B34BvOGnXkPkqb4AAAAASUVORK5CYII="},c89b:function(t,e,i){i("99af"),i("d3b7");var a=function(t,e){return new Promise((function(i,a){uni.request({url:"".concat(getApp().globalData.host).concat(t),method:e.method,data:"GET"===e.method?JSON.stringify(e.data):e.data,header:{"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"},success:function(t){200===t.statusCode?i(t.data):a(t.data)},fail:function(t){a(t.data)}})}))},o=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return a(t,{method:"GET",data:e})},n=function(t,e){return a(t,{method:"POST",data:e})},r=function(t,e){return a(t,{method:"PUT",data:e})},s=function(t,e){return a(t,{method:"DELETE",data:e})};t.exports={get:o,post:n,put:r,remove:s}},d2d0:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAChklEQVRoQ+1Zv2sUURD+5oIIaQyCWGiZEAgEIuR2Tac2KgTExlqtJYUo7ipiLOLtKVh4XZr8ATaSQsFGrZLdi2CpksZGrQUR/LEjd9yG5W735k3uHseFt+37ZuabH+9u3gxhzD8ac/5wDow6g6UZ8B7zMlKcA2OWCZMGRHeaAd2WcF6NV0GYY+CYhAXhcyXF+zik9TJsoQMdIw9EA12ACcbMVki7/eT8iF8ycFGp+3US0PkimR4HvDovgtFUGmjDk4DEO1WN+AkBt7T6iXA9vkMb3XK9DtS4AcKNNpDxMCXEYPySDO6E9FbCZOdLNZ7+A5yU8BXCPIBnHdxuEtCM7ECdX4FxoePAlSSk55Ihm+dexB8BzLbj+Q+nmvfoQ95eTwaqEb8h4EwLlDLOaiJrwxGJj3PARtTzOl0G3B0YsMZcCbkSGkEJ7fUqJr3NgPxE8XzvVMSnsPlq9SpSVylaHiKgHx+xexwiDyuqDqYDS0/56N/fuA9gwUrYFEqJ8S4JabVMpDADpx+xn1awrbBjDUrA1zigEyoH/DU+zhP4bo2VTvGLJKDLKgcy8GKN2++CUX7SH+nBvMSjjLjWdtGjPpvbfDGZ82gNavG5OVIhnx4H8nMbkzmPlpAWL/Fxb2JtRLV496CRfoe1EdXiXQZcBrQ104V3JTR2JeRHvMHA1U4mV5KAGgNWwUDiXsScKaBJHIlX6EdeYVkvlF8vfWLgmwGLoe/IsjF/yzYzNpshXermUdhO5y+OAfE9iEnvtM8dWen6qvQ94Nf5GjPuApg2dcJkjqTckf0koBEHFO7rRdYSqq7xAlcwJTmhueymO7JDhxFv3aS++zn3IpMyY/vcZcB2hCX9/wG2wb9AO+6ZzQAAAABJRU5ErkJggg=="},db9a:function(t,e,i){"use strict";i.r(e);var a=i("0a51"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},ef6a:function(t,e,i){var a=i("1b2b");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("222a4aed",a,!0,{sourceMap:!1,shadowMode:!1})}}]);