require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/nucleicAcid/success"],{300:function(e,t,n){"use strict";(function(e,t){var i=n(4);n(26);i(n(25));var o=i(n(301));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n(1)["default"],n(2)["createPage"])},301:function(e,t,n){"use strict";n.r(t);var i=n(302),o=n(304);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n(306);var c,r=n(32),u=Object(r["default"])(o["default"],i["render"],i["staticRenderFns"],!1,null,"6985f5c8",null,!1,i["components"],c);u.options.__file="pagesA/nucleicAcid/success.vue",t["default"]=u.exports},302:function(e,t,n){"use strict";n.r(t);var i=n(303);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},303:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return o})),n.d(t,"staticRenderFns",(function(){return c})),n.d(t,"recyclableRender",(function(){return a})),n.d(t,"components",(function(){return i}));var o=function(){var e=this,t=e.$createElement;e._self._c},a=!1,c=[];o._withStripped=!0},304:function(e,t,n){"use strict";n.r(t);var i=n(305),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},305:function(e,t,n){"use strict";(function(e){var i=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(179),a=n(177),c=i(n(178)),r={data:function(){return{appNo:"",appType:"",payDate:"",payTime:""}},onLoad:function(e){this.appNo=e.appNo,this.appType=e.appType,this.payDate=(0,o.getClientNowSystemTime)("yyyy-MM-dd"),this.payTime=(0,o.getClientNowSystemTime)("HH:mm:ss"),console.log("===this.payDate===",this.payDate),console.log("===this.payTime===",this.payTime)},methods:{toPay:function(){var t=e.getStorageSync("openid"),n={openId:t,appNo:this.appNo,payFee:"1"==this.appType?"16.00":"4.00",payDate:this.payDate+" "+this.payTime,type:"pay",FLAG:"U"};console.log("====data====",n),c.default.post(a.AppointServlet,n).then((function(t){console.log("====res====",t);var n=t.split(",")[0],i=t.split(",")[1];"200"==n?(e.showLoading({title:"加载中"}),setTimeout((function(){e.hideLoading(),e.showToast({title:i,icon:"none",duration:2e3}),e.navigateTo({url:"../nucleicAcid/pay1"})}),2e3)):e.showToast({title:i,icon:"none",duration:2e3})})).catch((function(e){}))},toRecord:function(){e.showLoading({title:"加载中"}),setTimeout((function(){e.hideLoading(),e.navigateTo({url:"../nucleicAcid/record"})}),2e3)}}};t.default=r}).call(this,n(2)["default"])},306:function(e,t,n){"use strict";n.r(t);var i=n(307),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},307:function(e,t,n){}},[[300,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesA/nucleicAcid/success.js.map