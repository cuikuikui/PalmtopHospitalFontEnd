(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesC/register/register"],{547:function(t,e,o){"use strict";(function(t,e){var n=o(4);o(26),o(27);n(o(25));var r=n(o(548));t.__webpack_require_UNI_MP_PLUGIN__=o,e(r.default)}).call(this,o(1)["default"],o(2)["createPage"])},548:function(t,e,o){"use strict";o.r(e);var n=o(549),r=o(551);for(var i in r)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return r[t]}))}(i);o(553);var s,a=o(44),c=Object(a["default"])(r["default"],n["render"],n["staticRenderFns"],!1,null,"02ab8d8d",null,!1,n["components"],s);c.options.__file="pagesC/register/register.vue",e["default"]=c.exports},549:function(t,e,o){"use strict";o.r(e);var n=o(550);o.d(e,"render",(function(){return n["render"]})),o.d(e,"staticRenderFns",(function(){return n["staticRenderFns"]})),o.d(e,"recyclableRender",(function(){return n["recyclableRender"]})),o.d(e,"components",(function(){return n["components"]}))},550:function(t,e,o){"use strict";var n;o.r(e),o.d(e,"render",(function(){return r})),o.d(e,"staticRenderFns",(function(){return s})),o.d(e,"recyclableRender",(function(){return i})),o.d(e,"components",(function(){return n}));var r=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.isPassword=!t.isPassword})},i=!1,s=[];r._withStripped=!0},551:function(t,e,o){"use strict";o.r(e);var n=o(552),r=o.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},552:function(t,e,o){"use strict";(function(t){var n=o(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(o(13)),i=o(263),s=o(189),a=n(o(190)),c=o(191),u=(o(265),{data:function(){return{isPassword:!1,isRegister:!1,markPhone:!1,markCode:!1,markPassword:!1,Password:"",phoneNumber:"",code:"",iscode:"",avatarUrl:"../../static/images/logo.png",mark:!1,Dfault_color:"",Lcolor:"",Mcolor:"",Hcolor:""}},methods:{onLogin:function(){t.redirectTo({url:"/pagesA/login/login"})},chooseImage:function(){this.active=!1;var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(o){var n=o.tempFilePaths[0];e.avatarUrl=n,t.uploadFile({url:"http://47.102.124.213/MTWMPro/uploadFiles",filePath:e.avatarUrl,name:"file",formData:{user:"test"},success:function(t){var o=t.data;e.avatarUrl=o}})}})},CharMode:function(t){return t>=48&&t<=57?1:t>=65&&t<=90?2:t>=97&&t<=122?4:8},bitTotal:function(t){for(var e=0,o=0;o<4;o++)t&&e++,t>>>=1;return e},checkStrong:function(t){if(t.length<6)return 0;for(var e=0,o=0;o<t.length;o++)e|=this.CharMode(t.charCodeAt(o));return this.bitTotal(e)},pwStrength:function(t){var e="#9D9D9D",o="#FF0000",n="#FF9900",r="#33CC00";if(null==t||""==t)this.Lcolor=this.Mcolor=this.Hcolor=e;else{var i=this.checkStrong(t);switch(i){case 0:this.Lcolor=this.Mcolor=this.Hcolor=e;break;case 1:this.Lcolor=o,this.Mcolor=e,this.Hcolor=e;break;case 2:this.Lcolor=o,this.Mcolor=n,this.Hcolor=e;break;case 3:this.Lcolor=o,this.Mcolor=n,this.Hcolor=r;break;default:console.log("xxxxxxxxxxxxxxxxx"),this.Lcolor=o,this.Mcolor=n,this.Hcolor=r}}},inputPassword:function(t){var e=t.detail.value;this.Password=e,""!=e&&e.length>=6?(this.pwStrength(e),this.Password=e,this.markPassword=!0):this.markPassword=!1},inputCode:function(t){var e=t.detail.value;this.code=e,""!=e&&e.length>=4?(this.code=e,this.markCode=!0):this.markCode=!1},getNumber:function(t){var e=t.detail.value;this.phoneNumber=e,""!=e&&e.length>=11?this.markPhone=!0:this.markPhone=!1},getCode:function(e){var o=this,n=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/,r=this.phoneNumber;if(""==r)t.showToast({title:"手机号不能为空",icon:"none",duration:1e3});else if(n.test(r)){for(var i="",s=0;s<6;s++)i+=Math.floor(10*Math.random());this.isCode=i,console.log(this.isCode),o.timer()}else t.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3})},timer:function(){if(this.c2&&this.c2.interval)return!1;this.c2=new i.$wuxCountDown({date:+new Date+1e4,onEnd:function(){this.setData({c2:"重新发送"})},render:function(t){var e=this.leadingZeros(t.sec,2)+" 秒 ";0!==t.sec&&this.setData({c2:e})}})},check:function(){var e=/^[a-zA-Z]\w{5,17}$/,o=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;return""==this.phoneNumber?(t.showToast({title:"手机号不能为空",icon:"none",duration:2e3}),!1):o.test(this.phoneNumber)?""==this.code?(t.showToast({title:"验证码不能为空",icon:"none",duration:2e3}),!1):this.code!=this.isCode?(t.showToast({title:"验证码输入错误",icon:"none",duration:2e3}),!1):""==this.Password?(t.showToast({title:"密码不能为空",icon:"none",duration:2e3}),!1):!!e.test(this.Password)||(t.showToast({title:"密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线",icon:"none",duration:2e3}),!1):(t.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3}),!1)},register:function(e){var o="MP-WEIXIN",n="weixin",i=(0,c.getClientNowSystemTime)("yyyy-MM-dd HH:mm:ss"),u={FLAG:"C",openId:this.phoneNumber,u_Password:this.Password,u_Name:this.phoneNumber,u_Img:this.avatarUrl,uRegisterTime:i,uEnvirn:o,uFlag:n,phone:this.phoneNumber};this.check()&&a.default.post(s.userServlet,u).then((function(e){console.log((0,r.default)(e)),console.log(0==e),0==e&&t.showToast({title:"存在该用户",icon:"none",duration:2e3}),1==e&&(t.showToast({title:"用户注册成功",icon:"success",duration:2e3}),setTimeout((function(){t.navigateTo({url:"/pagesC/login/login"})}),2e3))})).catch((function(t){console.log(t)}))}}});e.default=u}).call(this,o(2)["default"])},553:function(t,e,o){"use strict";o.r(e);var n=o(554),r=o.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=r.a},554:function(t,e,o){}},[[547,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesC/register/register.js.map