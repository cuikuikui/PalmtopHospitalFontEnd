(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/userInfor/userInfor"],{412:function(e,n,t){"use strict";(function(e){var n=t(3);t(25),t(26);n(t(24));var o=n(t(413));wx.__webpack_require_UNI_MP_PLUGIN__=t,e(o.default)}).call(this,t(1)["createPage"])},413:function(e,n,t){"use strict";t.r(n);var o=t(414),r=t(416);for(var u in r)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t(418);var i,a=t(40),s=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);s.options.__file="pages/userInfor/userInfor.vue",n["default"]=s.exports},414:function(e,n,t){"use strict";t.r(n);var o=t(415);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},415:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));var r=function(){var e=this,n=e.$createElement;e._self._c},u=!1,i=[];r._withStripped=!0},416:function(e,n,t){"use strict";t.r(n);var o=t(417),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},417:function(e,n,t){"use strict";(function(e){var o=t(3);Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=t(185),u=o(t(186)),i=function(){t.e("components/uni-poster/uni-poster").then(function(){return resolve(t(603))}.bind(null,t)).catch(t.oe)},a={data:function(){return{u_Name:"",u_Img:"",u_Phone:"",deliveryFlag:!1,posterBgFlag:!0,simpleFlag:!1,WeChatUserInfo:""}},components:{uniPoster:i},onLoad:function(n){this.u_Name=n.u_Name,this.u_Img=n.u_Img,this.u_Phone=n.u_Phone,console.log(e.getStorageSync("WeChatUserInfo"))},onShow:function(){this.WeChatUserInfo=e.getStorageSync("WeChatUserInfo")},methods:{chooseImage:function(){this.active=!1;var n=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){var o=t.tempFilePaths[0];n.u_Img=o,e.uploadFile({url:getApp().globalData.host+"/uploadFiles",filePath:n.u_Img,name:"file",formData:{user:"test"},success:function(e){var t=e.data;n.u_Img=t;var o="uImage",r=n.u_Img,u="头像修改成功";n.updateUser(o,r,u),n.queryUsreInfo()}})}})},updateUser:function(n,t,o){var i={openId:e.getStorageSync("openid"),inforType:n,inforMation:t,FLAG:"U"};u.default.post(r.userServlet,i).then((function(n){e.showToast({title:o,duration:2e3})})).catch((function(e){console.log(e)}))},queryUsreInfo:function(){var n="MP-WEIXIN";console.log(e.getStorageSync("openid"));var t={openId:e.getStorageSync("openid"),uEnvirn:n,FLAG:"R"};u.default.post(r.userServlet,t).then((function(n){e.removeStorageSync("WeChatUserInfo"),e.setStorageSync("WeChatUserInfo",n),e.redirectTo({url:"../userInfor"})})).catch((function(e){}))},modify:function(n){var t="";t=1==n?this.WeChatUserInfo.open_Id:2==n?this.WeChatUserInfo.u_Phone:this.WeChatUserInfo.u_Password,e.navigateTo({url:"modifyUser/modifyUser?modifyFlag="+n+"&infor="+t})},exitLogin:function(n){e.showModal({title:"提示",content:"确定要退出登录吗?",success:function(n){n.confirm&&(e.removeStorageSync("WeChatUserInfo"),e.removeStorageSync("LoginIndex"),e.removeStorageSync("openid"),e.switchTab({url:"../index/index"}))}})},handleShowPoster:function(){this.$refs.uniPoster.posterShow(),this.deliveryFlag=!1},shareEvn:function(){this.simpleFlag=!1,this.deliveryFlag=!0},closeShareEvn:function(){this.deliveryFlag=!1},canvasCancel:function(e){}}};n.default=a}).call(this,t(1)["default"])},418:function(e,n,t){"use strict";t.r(n);var o=t(419),r=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},419:function(e,n,t){}},[[412,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userInfor/userInfor.js.map