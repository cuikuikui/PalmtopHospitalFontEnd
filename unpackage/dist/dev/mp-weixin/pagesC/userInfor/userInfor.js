(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesC/userInfor/userInfor"],{555:function(e,n,t){"use strict";(function(e,n){var o=t(4);t(26),t(27);o(t(25));var r=o(t(556));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t(1)["default"],t(2)["createPage"])},556:function(e,n,t){"use strict";t.r(n);var o=t(557),r=t(559);for(var u in r)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t(561);var a,i=t(44),s=Object(i["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],a);s.options.__file="pagesC/userInfor/userInfor.vue",n["default"]=s.exports},557:function(e,n,t){"use strict";t.r(n);var o=t(558);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},558:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return a})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));var r=function(){var e=this,n=e.$createElement;e._self._c},u=!1,a=[];r._withStripped=!0},559:function(e,n,t){"use strict";t.r(n);var o=t(560),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},560:function(e,n,t){"use strict";(function(e){var o=t(4);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(189),u=o(t(190)),a=function(){t.e("pagesC/components/uni-poster/uni-poster").then(function(){return resolve(t(729))}.bind(null,t)).catch(t.oe)},i={data:function(){return{u_Name:"",u_Img:"",u_Phone:"",deliveryFlag:!1,posterBgFlag:!0,simpleFlag:!1,WeChatUserInfo:""}},components:{uniPoster:a},onLoad:function(n){this.u_Name=n.u_Name,this.u_Img=n.u_Img,this.u_Phone=n.u_Phone,console.log(e.getStorageSync("WeChatUserInfo"))},onShow:function(){this.WeChatUserInfo=e.getStorageSync("WeChatUserInfo")},methods:{chooseImage:function(){this.active=!1;var n=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){var o=t.tempFilePaths[0];n.u_Img=o,e.uploadFile({url:getApp().globalData.host+"/uploadFiles",filePath:n.u_Img,name:"file",formData:{user:"test"},success:function(e){var t=e.data;n.u_Img=t;var o="uImage",r=n.u_Img,u="头像修改成功";n.updateUser(o,r,u),n.queryUsreInfo()}})}})},updateUser:function(n,t,o){var a={openId:e.getStorageSync("openid"),inforType:n,inforMation:t,FLAG:"U"};u.default.post(r.userServlet,a).then((function(n){e.showToast({title:o,duration:2e3})})).catch((function(e){console.log(e)}))},queryUsreInfo:function(){var n="MP-WEIXIN";console.log(e.getStorageSync("openid"));var t={openId:e.getStorageSync("openid"),uEnvirn:n,FLAG:"R"};u.default.post(r.userServlet,t).then((function(n){e.removeStorageSync("WeChatUserInfo"),e.setStorageSync("WeChatUserInfo",n),e.redirectTo({url:"../userInfor"})})).catch((function(e){}))},modify:function(n){var t="";t=1==n?this.WeChatUserInfo.open_Id:2==n?this.WeChatUserInfo.u_Phone:this.WeChatUserInfo.u_Password,e.navigateTo({url:"modifyUser/modifyUser?modifyFlag="+n+"&infor="+t})},exitLogin:function(n){e.showModal({title:"提示",content:"确定要退出登录吗?",success:function(n){n.confirm&&(e.removeStorageSync("WeChatUserInfo"),e.removeStorageSync("LoginIndex"),e.removeStorageSync("openid"),e.switchTab({url:"/pages/index/index"}))}})},handleShowPoster:function(){this.$refs.uniPoster.posterShow(),this.deliveryFlag=!1},shareEvn:function(){this.simpleFlag=!1,this.deliveryFlag=!0},closeShareEvn:function(){this.deliveryFlag=!1},canvasCancel:function(e){}}};n.default=i}).call(this,t(2)["default"])},561:function(e,n,t){"use strict";t.r(n);var o=t(562),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},562:function(e,n,t){}},[[555,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pagesC/userInfor/userInfor.js.map