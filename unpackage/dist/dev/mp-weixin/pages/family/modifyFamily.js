(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/modifyFamily"],{381:function(e,i,n){"use strict";(function(e){var i=n(3);n(25),n(26);i(n(24));var t=i(n(382));wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(1)["createPage"])},382:function(e,i,n){"use strict";n.r(i);var t=n(383),o=n(385);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(i,e,(function(){return o[e]}))}(a);n(387);var r,l=n(40),s=Object(l["default"])(o["default"],t["render"],t["staticRenderFns"],!1,null,null,null,!1,t["components"],r);s.options.__file="pages/family/modifyFamily.vue",i["default"]=s.exports},383:function(e,i,n){"use strict";n.r(i);var t=n(384);n.d(i,"render",(function(){return t["render"]})),n.d(i,"staticRenderFns",(function(){return t["staticRenderFns"]})),n.d(i,"recyclableRender",(function(){return t["recyclableRender"]})),n.d(i,"components",(function(){return t["components"]}))},384:function(e,i,n){"use strict";var t;n.r(i),n.d(i,"render",(function(){return o})),n.d(i,"staticRenderFns",(function(){return r})),n.d(i,"recyclableRender",(function(){return a})),n.d(i,"components",(function(){return t}));var o=function(){var e=this,i=e.$createElement;e._self._c},a=!1,r=[];o._withStripped=!0},385:function(e,i,n){"use strict";n.r(i);var t=n(386),o=n.n(t);for(var a in t)["default"].indexOf(a)<0&&function(e){n.d(i,e,(function(){return t[e]}))}(a);i["default"]=o.a},386:function(e,i,n){"use strict";(function(e){var t=n(3);Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=n(185),a=n(195),r=t(n(186)),l={data:function(){return{name:"请填写您的姓名",tel:"请填写您的联系方式",array:["身份证","军官证","驾驶证","台胞证","护照","港澳通行证"],index:0,region:["选择省","市","区/县"],switchA:!1,modifyFamily:[],gender:"",detailRegion:""}},onLoad:function(e){console.log("===options.fId===",e.fId),this.fId=e.fId,this.getSecretFamily(this.fId)},methods:{getSecretFamily:function(i){var n=this,t={openId:e.getStorageSync("openid"),fId:i,FLAG:"R",type:"getSecretFamily"};r.default.post(o.AskerServlet,t).then((function(e){for(var i=e,t=0;t<i.length;t++)i[t].openId=(0,a.decrypt)(i[t].openId),i[t].a_Id=(0,a.decrypt)(i[t].a_Id),i[t].a_IDCard=(0,a.decrypt)(i[t].a_IDCard),i[t].a_Name=(0,a.decrypt)(i[t].a_Name),i[t].a_Phone=(0,a.decrypt)(i[t].a_Phone),n.index=i[t].idType,n.region=void 0!=i[t].region?i[t].region.split(","):i[t],n.detailRegion=i[t].detailRegion,n.isDefault=i[t].isDefault,n.switchA="1"==i[t].isDefault,n.gender=i[t].a_Sex;n.modifyFamily=i[0]})).catch((function(e){}))},SwitchA:function(e){this.switchA=e.detail.value},RegionChange:function(e){this.region=e.detail.value,console.log("地址选择",this.region)},bindPickerChange:function(e){console.log("picker发送选择改变，携带值为",e.detail.value),this.index=e.detail.value},radioChange:function(e){0==e.detail.value?this.gender="女":this.gender="男"},deletes:function(){var i={aId:this.fId,FLAG:"D"};e.showModal({title:"提示",content:"确认删除该就诊人信息吗？",success:function(n){n.confirm?r.default.post(o.AskerServlet,i).then((function(i){e.redirectTo({url:"../family/listFamily"})})).catch((function(e){})):n.cancel&&e.redirectTo({url:"../family/listFamily"})}})},cancel:function(){e.redirectTo({url:"../family/listFamily"})},showWarn:function(i){e.showToast({title:i,icon:"none",duration:2e3})},save:function(){console.log(this.modifyFamily);var i="";if(""==this.modifyFamily.a_Name)console.log("1111111"),i="请填写您的姓名！",this.showWarn(i);else if(""==this.modifyFamily.a_Phone)console.log("22222"),i="请填写您的手机号！",this.showWarn(i);else if(/^1(3|4|5|7|8)\d{9}$/.test(this.modifyFamily.a_Phone))if(""==this.modifyFamily.a_IDCard)console.log("4444444"),i="请填写您的身份证号",this.showWarn(i);else if(0==(0,a.isCardID)(this.modifyFamily.a_IDCard))console.log("555555555"),i="身份证号格式不正确",this.showWarn(i);else if(""==this.modifyFamily.detailRegion)console.log("6666666"),i="请填写详细地址",this.showWarn(i);else{console.log("77777777");var n={aName:this.modifyFamily.a_Name,aSex:this.gender,aPhone:this.modifyFamily.a_Phone,aId:this.fId,openId:e.getStorageSync("openid"),aIDCard:this.modifyFamily.a_IDCard,IdType:this.index,region:this.region[0]+","+this.region[1]+","+this.region[2],detailRegion:this.modifyFamily.detailRegion,isDefault:1==this.switchA?"1":"0",FLAG:"U"};console.log("===修改地址====",n),r.default.post(o.AskerServlet,n).then((function(i){e.redirectTo({url:"../family/listFamily"})})).catch((function(e){}))}else console.log("3333333"),i="手机号格式不正确",this.showWarn(i)}}};i.default=l}).call(this,n(1)["default"])},387:function(e,i,n){"use strict";n.r(i);var t=n(388),o=n.n(t);for(var a in t)["default"].indexOf(a)<0&&function(e){n.d(i,e,(function(){return t[e]}))}(a);i["default"]=o.a},388:function(e,i,n){}},[[381,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/family/modifyFamily.js.map