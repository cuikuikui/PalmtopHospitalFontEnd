(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/forget/forget"],{484:function(n,e,t){"use strict";(function(n){var e=t(3);t(25),t(26);e(t(24));var o=e(t(485));wx.__webpack_require_UNI_MP_PLUGIN__=t,n(o.default)}).call(this,t(1)["createPage"])},485:function(n,e,t){"use strict";t.r(e);var o=t(486),i=t(488);for(var s in i)["default"].indexOf(s)<0&&function(n){t.d(e,n,(function(){return i[n]}))}(s);t(490);var r,a=t(40),c=Object(a["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],r);c.options.__file="pages/forget/forget.vue",e["default"]=c.exports},486:function(n,e,t){"use strict";t.r(e);var o=t(487);t.d(e,"render",(function(){return o["render"]})),t.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(e,"components",(function(){return o["components"]}))},487:function(n,e,t){"use strict";var o;t.r(e),t.d(e,"render",(function(){return i})),t.d(e,"staticRenderFns",(function(){return r})),t.d(e,"recyclableRender",(function(){return s})),t.d(e,"components",(function(){return o}));var i=function(){var n=this,e=n.$createElement;n._self._c},s=!1,r=[];i._withStripped=!0},488:function(n,e,t){"use strict";t.r(e);var o=t(489),i=t.n(o);for(var s in o)["default"].indexOf(s)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(s);e["default"]=i.a},489:function(n,e,t){"use strict";(function(n){var o=t(3);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=t(275),s=t(185),r=o(t(186)),a=(t(277),{data:function(){return{usernameType:"text",codeBut:"获取验证码",phone:"18861815669",password:"",code:"",iscode:"",seen:!1,type_text:"text",type_password:"password"}},onLoad:function(n){this.phone=n.phone},methods:{changeSeen:function(){this.seen=!this.seen},sendCode:async function(n){console.log("xxxxxx",n),this.timer()},applyCode:function(){var e=this,t={uEnvirn:"MP-WEIXIN",openId:this.phone,FLAG:"applyCode"};r.default.post(s.userServlet,t).then((async function(t){console.log("==验证码===",t);var o=t.split(",")[0],i=t.split(",")[1],s=t.split(",")[2];console.log("==status==",o),console.log("==code==",i),console.log("==message==",s),"200"==o?(e.iscode=i,await e.sendCode(i),n.showToast({title:s,icon:"none",duration:2e3})):"201"==o||"202"==o||"203"==o?n.showToast({title:s,icon:"none",duration:2e3}):n.showToast({title:"系统异常",icon:"none",duration:2e3})})).catch((function(e){n.showToast({title:"系统异常",icon:"none",duration:1e3})}))},getCode:async function(){var e=this,t=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/,o=this.phone;""==o?n.showToast({title:"手机号不能为空",icon:"none",duration:1e3}):t.test(o)?await e.applyCode():n.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3})},timer:function(){if(this.c2&&this.c2.interval)return!1;this.c2=new i.$wuxCountDown({date:+new Date+1e4,onEnd:function(){this.setData({c2:"重新发送"})},render:function(n){var e=this.leadingZeros(n.sec,2)+" 秒 ";0!==n.sec&&this.setData({c2:e})}})},check:function(){var e=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;return""==this.phone?(n.showToast({title:"手机号不能为空",icon:"none",duration:2e3}),!1):e.test(this.phone)?""==this.password&&1==this.loginMode?(n.showToast({title:"密码不能为空",icon:"none",duration:2e3}),!1):""!=this.code||2!=this.loginMode||(n.showToast({title:"验证码不能为空",icon:"none",duration:2e3}),!1):(n.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3}),!1)},validateCode:function(){var e=this,t={uEnvirn:"MP-WEIXIN",openId:this.phone,code:this.code,FLAG:"validateCode"};console.log("======",t),this.check()&&r.default.post(s.userServlet,t).then((function(t){console.log("===res===",t);var o=t.split("*")[0],i=t.split("*")[1];console.log("==status==",o),console.log("==message==",i),"200"==o?(n.showToast({title:i,icon:"none",dubration:2e3}),n.navigateTo({url:"./pasword?phone="+e.phone})):n.showToast({title:i,icon:"none",duration:2e3})})).catch((function(n){}))}}});e.default=a}).call(this,t(1)["default"])},490:function(n,e,t){"use strict";t.r(e);var o=t(491),i=t.n(o);for(var s in o)["default"].indexOf(s)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(s);e["default"]=i.a},491:function(n,e,t){}},[[484,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/forget/forget.js.map