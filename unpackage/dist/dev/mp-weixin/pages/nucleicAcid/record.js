(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/nucleicAcid/record"],{530:function(e,n,t){"use strict";(function(e){var n=t(3);t(25),t(26);n(t(24));var o=n(t(531));wx.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t(1)["createPage"])},531:function(e,n,t){"use strict";t.r(n);var o=t(532),r=t(534);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);t(536);var c,i=t(40),u=Object(i["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"e676f266",null,!1,o["components"],c);u.options.__file="pages/nucleicAcid/record.vue",n["default"]=u.exports},532:function(e,n,t){"use strict";t.r(n);var o=t(533);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},533:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return c})),t.d(n,"recyclableRender",(function(){return a})),t.d(n,"components",(function(){return o}));try{o={tkiBarcode:function(){return Promise.all([t.e("common/vendor"),t.e("components/tki-barcode/tki-barcode")]).then(t.bind(null,610))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},a=!1,c=[];r._withStripped=!0},534:function(e,n,t){"use strict";t.r(n);var o=t(535),r=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},535:function(e,n,t){"use strict";(function(e){var o=t(3);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(195),a=t(185),c=o(t(186)),i=function(){Promise.all([t.e("common/vendor"),t.e("components/tki-barcode/tki-barcode")]).then(function(){return resolve(t(610))}.bind(null,t)).catch(t.oe)},u={components:{tkiBarcode:i},data:function(){return{record:!0,barOpations:{height:150,displayValue:!1},appoints:[],family:[]}},created:function(){this.getAppoints()},methods:{appointDetail:function(n,t,o,r,a,c,i,u,d,s){e.navigateTo({url:"./recordDetail?code="+n+"&FId="+t+"&Fname="+o+"&IDCard="+r+"&Phone="+a+"&appDate="+c+"&appNo="+i+"&appType="+u+"&appStatus="+d+"&paySatus="+s})},getAppoints:function(){var n=this;e.showLoading({title:"加载中",mask:!1});var t=e.getStorageSync("openid"),o={openId:t,FLAG:"R"};c.default.post(a.AppointServlet,o).then((function(t){console.log("====xxxx====",0==t.length),t.length>0&&(n.record=!1),setTimeout((function(){e.hideLoading()}),2e3);var o=t,a=e.getStorageSync("family_list");console.log("====arr====",a);for(var c=0;c<a.length;c++)for(var i=0;i<o.length;i++)a[c].a_Id==o[i].FId&&(o[i].Fname=a[c].a_Name,o[i].IDCard=a[c].a_IDCard,o[i].Phone=a[c].a_Phone);for(var u=0;u<o.length;u++)o[u].code=(0,r.randomNum)(o[u].appNo,6);setTimeout((function(){for(var e=0;e<o.length;e++)o[e].code=(0,r.randomNum)(o[e].appNo,6)}),5e3),n.appoints=o,console.log("====curArr====",o)})).catch((function(e){}))}}};n.default=u}).call(this,t(1)["default"])},536:function(e,n,t){"use strict";t.r(n);var o=t(537),r=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},537:function(e,n,t){}},[[530,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/nucleicAcid/record.js.map