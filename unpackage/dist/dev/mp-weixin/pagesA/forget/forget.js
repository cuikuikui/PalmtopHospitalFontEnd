require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/forget/forget"],{257:function(e,t,n){"use strict";(function(e,t){var o=n(4);n(26),n(27);o(n(25));var r=o(n(258));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},258:function(e,t,n){"use strict";n.r(t);var o=n(259),r=n(261);for(var i in r)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(266);var s,a=n(44),c=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);c.options.__file="pagesA/forget/forget.vue",t["default"]=c.exports},259:function(e,t,n){"use strict";n.r(t);var o=n(260);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},260:function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return s})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,s=[];r._withStripped=!0},261:function(e,t,n){"use strict";n.r(t);var o=n(262),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},262:function(e,t,n){"use strict";(function(e){var o=n(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n(28)),i=o(n(30)),s=n(263),a=n(189),c=o(n(190)),u=(n(265),{data:function(){return{usernameType:"text",codeBut:"获取验证码",phone:"18861815669",password:"",code:"",iscode:"",seen:!1,type_text:"text",type_password:"password"}},onLoad:function(e){this.phone=e.phone},methods:{changeSeen:function(){this.seen=!this.seen},sendCode:function(e){var t=this;return(0,i.default)(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:console.log("xxxxxx",e),t.timer();case 2:case"end":return n.stop()}}),n)})))()},applyCode:function(){var t=this,n={uEnvirn:"MP-WEIXIN",openId:this.phone,FLAG:"applyCode"};c.default.post(a.userServlet,n).then(function(){var n=(0,i.default)(r.default.mark((function n(o){var i,s,a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log("==验证码===",o),i=o.split(",")[0],s=o.split(",")[1],a=o.split(",")[2],console.log("==status==",i),console.log("==code==",s),console.log("==message==",a),"200"!=i){n.next=14;break}return t.iscode=s,n.next=11,t.sendCode(s);case 11:e.showToast({title:a,icon:"none",duration:2e3}),n.next=15;break;case 14:"201"==i||"202"==i||"203"==i?e.showToast({title:a,icon:"none",duration:2e3}):e.showToast({title:"系统异常",icon:"none",duration:2e3});case 15:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()).catch((function(t){e.showToast({title:"系统异常",icon:"none",duration:1e3})}))},getCode:function(){var t=this;return(0,i.default)(r.default.mark((function n(){var o,i,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(o=t,i=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/,s=t.phone,""!=s){n.next=7;break}e.showToast({title:"手机号不能为空",icon:"none",duration:1e3}),n.next=13;break;case 7:if(i.test(s)){n.next=11;break}e.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3}),n.next=13;break;case 11:return n.next=13,o.applyCode();case 13:case"end":return n.stop()}}),n)})))()},timer:function(){if(this.c2&&this.c2.interval)return!1;this.c2=new s.$wuxCountDown({date:+new Date+1e4,onEnd:function(){this.setData({c2:"重新发送"})},render:function(e){var t=this.leadingZeros(e.sec,2)+" 秒 ";0!==e.sec&&this.setData({c2:t})}})},check:function(){var t=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;return""==this.phone?(e.showToast({title:"手机号不能为空",icon:"none",duration:2e3}),!1):t.test(this.phone)?""==this.password&&1==this.loginMode?(e.showToast({title:"密码不能为空",icon:"none",duration:2e3}),!1):""!=this.code||2!=this.loginMode||(e.showToast({title:"验证码不能为空",icon:"none",duration:2e3}),!1):(e.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3}),!1)},validateCode:function(){var t=this,n={uEnvirn:"MP-WEIXIN",openId:this.phone,code:this.code,FLAG:"validateCode"};console.log("======",n),this.check()&&c.default.post(a.userServlet,n).then((function(n){console.log("===res===",n);var o=n.split("*")[0],r=n.split("*")[1];console.log("==status==",o),console.log("==message==",r),"200"==o?(e.showToast({title:r,icon:"none",dubration:2e3}),e.navigateTo({url:"./pasword?phone="+t.phone})):e.showToast({title:r,icon:"none",duration:2e3})})).catch((function(e){}))}}});t.default=u}).call(this,n(2)["default"])},266:function(e,t,n){"use strict";n.r(t);var o=n(267),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},267:function(e,t,n){}},[[257,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesA/forget/forget.js.map