(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesC/userInfor/modifyUser/modifyUser"],{563:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26),t(27);o(t(25));var i=o(t(564));e.__webpack_require_UNI_MP_PLUGIN__=t,n(i.default)}).call(this,t(1)["default"],t(2)["createPage"])},564:function(e,n,t){"use strict";t.r(n);var o=t(565),i=t(567);for(var r in i)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t(569);var a,s=t(44),c=Object(s["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);c.options.__file="pagesC/userInfor/modifyUser/modifyUser.vue",n["default"]=c.exports},565:function(e,n,t){"use strict";t.r(n);var o=t(566);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},566:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return i})),t.d(n,"staticRenderFns",(function(){return a})),t.d(n,"recyclableRender",(function(){return r})),t.d(n,"components",(function(){return o}));var i=function(){var e=this,n=e.$createElement;e._self._c},r=!1,a=[];i._withStripped=!0},567:function(e,n,t){"use strict";t.r(n);var o=t(568),i=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},568:function(e,n,t){"use strict";(function(e){var o=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=o(t(28)),r=o(t(30)),a=t(189),s=o(t(190)),c=t(263),u=(t(265),{data:function(){return{userName:"",modifyFlag:1,codeCheck:!1,passwordCheck:!0,newModifyFlag:!1,infor:"",markPhone:!1,markCode:!1,markName:"",newPhone:"",code:"",iscode:""}},onLoad:function(e){this.modifyFlag=e.modifyFlag,this.infor=e.infor,console.log(e.infor)},onShow:function(){},methods:{inputName:function(e){this.userName=e.detail.value,""==e.detail.value&&0==e.detail.value.length?this.markName=!1:this.markName=!0},conformName:function(){var n="uName",t=this.userName,o="用户名修改成功";""!=this.userName?this.updateUser(n,t,o):e.showToast({title:"请输入用户名",icon:"none",duration:1e3})},codeInput:function(e){var n=e.detail.value;""!=n?(this.code=n,this.markCode=!0):this.markCode=!1},sendCode:function(e){var n=this;return(0,r.default)(i.default.mark((function t(){return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:console.log("xxxxxx",e),n.timer();case 2:case"end":return t.stop()}}),t)})))()},applyCode:function(){var n=this,t={uEnvirn:"MP-WEIXIN",openId:e.getStorageSync("openid"),FLAG:"applyCode"};console.log("======",t),s.default.post(a.userServlet,t).then(function(){var t=(0,r.default)(i.default.mark((function t(o){var r,a,s;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(console.log("==验证码===",o),r=o.split(",")[0],a=o.split(",")[1],s=o.split(",")[2],console.log("==status==",r),console.log("==code==",a),console.log("==message==",s),"200"!=r){t.next=14;break}return n.iscode=a,t.next=11,n.sendCode(a);case 11:e.showToast({title:s,icon:"none",duration:2e3}),t.next=15;break;case 14:"201"==r||"202"==r||"203"==r?e.showToast({title:s,icon:"none",duration:2e3}):e.showToast({title:"系统异常",icon:"none",duration:2e3});case 15:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(n){e.showToast({title:"系统异常",icon:"none",duration:1e3})}))},getCode:function(){var n=this;return(0,r.default)(i.default.mark((function t(){var o,r,a;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(o=n,r=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/,a=n.infor,""!=a){t.next=7;break}e.showToast({title:"手机号不能为空",icon:"none",duration:1e3}),t.next=13;break;case 7:if(r.test(a)){t.next=11;break}e.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3}),t.next=13;break;case 11:return t.next=13,o.applyCode();case 13:case"end":return t.stop()}}),t)})))()},timer:function(){if(this.c2&&this.c2.interval)return!1;this.c2=new c.$wuxCountDown({date:+new Date+1e4,onEnd:function(){this.setData({c2:"重新发送"})},render:function(e){var n=this.leadingZeros(e.sec,2)+" 秒 ";0!==e.sec&&this.setData({c2:n})}})},check:function(){var n=/^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;return""==this.phone?(e.showToast({title:"手机号不能为空",icon:"none",duration:2e3}),!1):n.test(this.phone)?""==this.password&&1==this.loginMode?(e.showToast({title:"密码不能为空",icon:"none",duration:2e3}),!1):""!=this.code||2!=this.loginMode||(e.showToast({title:"验证码不能为空",icon:"none",duration:2e3}),!1):(e.showToast({title:"请输入正确的手机号",icon:"none",duration:1e3}),!1)},conformCode:function(){var n=this,t={uEnvirn:"MP-WEIXIN",openId:e.getStorageSync("openid"),code:this.code,FLAG:"validateCode"};console.log("===rrr===",t),s.default.post(a.userServlet,t).then((function(t){console.log("===res===",t);var o=t.split("*")[0],i=t.split("*")[1];console.log("==status==",o),console.log("==message==",i),"200"==o?(n.newModifyFlag=!0,e.showToast({title:i,icon:"none",dubration:2e3})):(n.newModifyFlag=!1,e.showToast({title:i,icon:"none",duration:2e3}))})).catch((function(e){}))},newPhoneInput:function(e){var n=e.detail.value;""!=n?(this.newPhone=n,this.markPhone=!0):this.markPhone=!1},conformPhone:function(){var n="uPhone",t=this.newPhone,o="手机号修改成功";this.updateUser(n,t,o),e.redirectTo({url:"../userInfor?u_Phone="+this.newPhone})},checkPwd:function(n){n==this.infor||e.showToast({title:"旧密码输入错误,请重新输入",duration:2e3})},oldPwdChange:function(e){this.oldPwd=e.detail.value},newPwdChange:function(e){this.checkPwd(this.oldPwd),this.newPwd=e.detail.value},conformPwdChange:function(e){this.conformPwd=e.detail.value,""!=e.detail.value?this.passwordCheck=!0:this.passwordCheck=!1},checkPwds:function(e,n){return e==n},conformPwds:function(){var n="uPassword",t=this.newPwd,o="密码修改成功";this.checkPwds(this.newPwd,this.conformPwd)?this.updateUser(n,t,o):e.showToast({title:"两次密码输入不一致，请重新输入",duration:2e3})},updateUser:function(n,t,o){var i=this,r={openId:e.getStorageSync("openid"),inforType:n,inforMation:t,FLAG:"U"};s.default.post(a.userServlet,r).then((function(n){e.showToast({title:o,duration:2e3}),i.queryUsreInfo()})).catch((function(e){console.log(e)}))},queryUsreInfo:function(){var n="MP-WEIXIN";console.log(e.getStorageSync("openid"));var t={openId:e.getStorageSync("openid"),uEnvirn:n,FLAG:"R"};s.default.post(a.userServlet,t).then((function(n){e.removeStorageSync("WeChatUserInfo"),e.setStorageSync("WeChatUserInfo",n),e.navigateBack({delta:1})})).catch((function(e){}))}}});n.default=u}).call(this,t(2)["default"])},569:function(e,n,t){"use strict";t.r(n);var o=t(570),i=t.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},570:function(e,n,t){}},[[563,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pagesC/userInfor/modifyUser/modifyUser.js.map