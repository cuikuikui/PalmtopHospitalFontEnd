require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/nucleicAcid/recordDetail"],{316:function(t,n,e){"use strict";(function(t,n){var o=e(4);e(26);o(e(25));var a=o(e(317));t.__webpack_require_UNI_MP_PLUGIN__=e,n(a.default)}).call(this,e(1)["default"],e(2)["createPage"])},317:function(t,n,e){"use strict";e.r(n);var o=e(318),a=e(320);for(var i in a)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(i);e(322);var r,c=e(32),u=Object(c["default"])(a["default"],o["render"],o["staticRenderFns"],!1,null,"3e94c38e",null,!1,o["components"],r);u.options.__file="pagesA/nucleicAcid/recordDetail.vue",n["default"]=u.exports},318:function(t,n,e){"use strict";e.r(n);var o=e(319);e.d(n,"render",(function(){return o["render"]})),e.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(n,"components",(function(){return o["components"]}))},319:function(t,n,e){"use strict";var o;e.r(n),e.d(n,"render",(function(){return a})),e.d(n,"staticRenderFns",(function(){return r})),e.d(n,"recyclableRender",(function(){return i})),e.d(n,"components",(function(){return o}));var a=function(){var t=this,n=t.$createElement;t._self._c},i=!1,r=[];a._withStripped=!0},320:function(t,n,e){"use strict";e.r(n);var o=e(321),a=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},321:function(t,n,e){"use strict";(function(t){var o=e(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;e(179);var a=e(177),i=o(e(178)),r=function(){Promise.all([e.e("pagesA/common/vendor"),e.e("pagesA/components/tki-barcode/tki-barcode")]).then(function(){return resolve(e(582))}.bind(null,e)).catch(e.oe)},c={components:{tkiBarcode:r},data:function(){return{barOpations:{height:150,displayValue:!1},code:"",FId:"",Fname:"",IDCard:"",Phone:"",appDate:"",appNo:"",appType:"",appStatus:"",paySatus:""}},onLoad:function(t){this.code=t.code,this.FId=t.FId,this.Fname=t.Fname,this.IDCard=t.IDCard,this.Phone=t.Phone,this.appDate=t.appDate,this.appNo=t.appNo,this.appType=t.appType,this.appStatus=t.appStatus,this.paySatus=t.paySatus,console.log("==options====",t)},methods:{submit:function(){t.navigateTo({url:"./pay1"})},getAppoints:function(){var n=this,e=t.getStorageSync("openid"),o={openId:e,FLAG:"R"};i.default.post(a.AppointServlet,o).then((function(t){for(var e=0;e<t.length;e++)n.appNo==t[e].appNo&&(n.appStatus=t[e].appStatus)})).catch((function(t){}))},canceil:function(){var n=t.getStorageSync("openid"),e=this,o={openId:n,appNo:this.appNo,type:"cancel",FLAG:"U"};i.default.post(a.AppointServlet,o).then((function(n){console.log("====res====",n);var o=n.split(",")[0],a=n.split(",")[1];"200"==o?(t.showLoading({title:"加载中"}),setTimeout((function(){t.hideLoading(),e.getAppoints(),t.showToast({title:a,icon:"none",duration:2e3})}),2e3)):t.showToast({title:a,icon:"none",duration:2e3})})).catch((function(t){}))}}};n.default=c}).call(this,e(2)["default"])},322:function(t,n,e){"use strict";e.r(n);var o=e(323),a=e.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=a.a},323:function(t,n,e){}},[[316,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesA/nucleicAcid/recordDetail.js.map