(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesC/components/uni-poster/uni-poster"],{625:function(t,e,i){"use strict";i.r(e);var s=i(626),n=i(628);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i(630);var r,o=i(32),c=Object(o["default"])(n["default"],s["render"],s["staticRenderFns"],!1,null,null,null,!1,s["components"],r);c.options.__file="pagesC/components/uni-poster/uni-poster.vue",e["default"]=c.exports},626:function(t,e,i){"use strict";i.r(e);var s=i(627);i.d(e,"render",(function(){return s["render"]})),i.d(e,"staticRenderFns",(function(){return s["staticRenderFns"]})),i.d(e,"recyclableRender",(function(){return s["recyclableRender"]})),i.d(e,"components",(function(){return s["components"]}))},627:function(t,e,i){"use strict";var s;i.r(e),i.d(e,"render",(function(){return n})),i.d(e,"staticRenderFns",(function(){return r})),i.d(e,"recyclableRender",(function(){return a})),i.d(e,"components",(function(){return s}));var n=function(){var t=this,e=t.$createElement;t._self._c},a=!1,r=[];n._withStripped=!0},628:function(t,e,i){"use strict";i.r(e);var s=i(629),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},629:function(t,e,i){"use strict";(function(t,s){var n=i(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i(251)),r=n(i(253)),o={data:function(){return{canvasShow:!1,attrs:{marginLR:40,marginTB:40,radius:.03,fillColor:"#ffffff",innerLR:20,innerTB:20,posterRatio:1.3,posterImgUrl:"http://47.102.124.213/images/guaHao/logo.png",title:"今日上新水果，牛奶草莓，颗粒饱满，每盒 200g",titleFontSize:16,titleLineHeight:25,posterCodeUrl:"http://47.102.124.213/images/guaHao/erweima.png",codeWidth:.3,codeRatio:1,codeRadius:0,codeMT:20,codeName:"记忆之王",codeNameMT:20,tips:"长按/扫描识别查看商品",posterBgUrl:"http://47.102.124.213/images/guaHao/codeBg.jpg",codeML:140,desTextMT:70,desTextML:240}}},props:{posterBgFlag:{type:Boolean,default:!1},simpleFlag:{type:Boolean,default:!1}},mounted:function(){this.system=this.getSystem()},methods:{posterShow:function(){this.canvasShow=!0,Object.assign(this.attrs,this.canvasAttr),this.attrs={marginLR:this.attrs.marginLR*this.systemScale,marginTB:this.attrs.marginTB*this.systemScale,innerLR:this.attrs.innerLR*this.systemScale,innerTB:this.attrs.innerTB*this.systemScale,radius:this.attrs.radius,fillColor:this.attrs.fillColor,posterRatio:this.attrs.posterRatio,posterImgUrl:this.attrs.posterImgUrl,title:this.attrs.title,titleFontSize:this.attrs.titleFontSize*this.systemScale,titleLineHeight:this.attrs.titleLineHeight*this.systemScale,posterCodeUrl:this.attrs.posterCodeUrl,codeWidth:this.attrs.codeWidth*this.systemScale,codeRatio:this.attrs.codeRatio,codeRadius:this.attrs.codeRadius,codeMT:this.attrs.codeMT*this.systemScale,codeName:this.attrs.codeName,codeNameMT:this.attrs.codeNameMT*this.systemScale,tips:this.attrs.tips,posterBgUrl:this.attrs.posterBgUrl,codeML:this.attrs.codeML*this.systemScale,desTextMT:this.attrs.desTextMT*this.systemScale,desTextML:this.attrs.desTextML*this.systemScale},this.simpleFlag?this.creatSimplePoster(this.attrs):this.creatPoster(this.attrs)},creatPoster:function(e){var i=this;return(0,r.default)(a.default.mark((function s(){var n,r;return a.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(t.showLoading({title:"生成海报中..."}),n=t.createCanvasContext("myCanvas",i),n.draw(),i.roundRect(n,e.marginLR,e.marginTB,i.system.w-2*e.marginLR,i.scale*i.system.w-2*e.marginTB-100,(i.system.w-2*e.marginLR)*e.radius,e.fillColor),!i.posterBgFlag){s.next=7;break}return s.next=7,i.creatBgImg(n,e);case 7:return s.next=9,i.creatImg(n,e);case 9:s.sent,r=i.creatTitle(n,e),i.creatCode(n,e,r),i.creatCodeText(n,e,e.codeName,r,16,"#2f1709"),i.creatCodeText(n,e,e.tips,r+30,14,"#2f1709"),t.hideLoading();case 15:case"end":return s.stop()}}),s)})))()},creatSimplePoster:function(e){var i=this;return(0,r.default)(a.default.mark((function s(){var n;return a.default.wrap((function(s){while(1)switch(s.prev=s.next){case 0:if(t.showLoading({title:"生成海报中..."}),n=t.createCanvasContext("myCanvas",i),n.draw(),i.roundRect(n,e.marginLR,e.marginTB,i.system.w-2*e.marginLR,i.scale*i.system.w-2*e.marginTB-100,(i.system.w-2*e.marginLR)*e.radius,e.fillColor),!i.posterBgFlag){s.next=7;break}return s.next=7,i.creatBgImg(n,e);case 7:i.creatSimpleCode(n,e,e.marginTB),i.creatVerticalTitle(n,e),t.hideLoading();case 10:case"end":return s.stop()}}),s)})))()},roundRect:function(t,e,i,s,n,a){t.save(),t.beginPath(),t.arc(e+a,i+a,a,Math.PI,1.5*Math.PI),t.lineTo(e+s-a,i),t.arc(e+s-a,i+a,a,1.5*Math.PI,2*Math.PI),t.lineTo(e+s,i+n-a),t.arc(e+s-a,i+n-a,a,0,.5*Math.PI),t.arc(e+a,i+n-a,a,.5*Math.PI,Math.PI),t.lineTo(e,i+a),t.setFillStyle("#ffffff"),t.fill(),t.clip()},getSystem:function(){var e=t.getSystemInfoSync();return this.scale=667/375,this.systemScale=e.windowWidth/375,{w:e.windowWidth,h:e.windowHeight}},creatBgImg:function(e,i){var n=this;return new Promise((function(a,r){t.getImageInfo({src:i.posterBgUrl,success:function(t){t.width,n.system.w,i.marginLR;e.drawImage(t.path,i.marginLR,i.marginTB,n.system.w-2*i.marginLR,n.scale*n.system.w-2*i.marginTB-100),e.restore(),e.draw(!0),a()},fail:function(t){console.log("fail -> res",t),s.showToast({title:"海报背景图下载异常",duration:2e3,icon:"none"})}})}))},creatImg:function(e,i){var n=this;return new Promise((function(a,r){t.getImageInfo({src:i.posterImgUrl,success:function(t){e.restore(),e.draw(!0);var s=t,r=t.width/(n.system.w-2*i.marginLR-2*i.innerLR);n.roundRect(e,i.marginLR+i.innerLR,i.marginTB+i.innerLR,n.system.w-2*i.marginLR-2*i.innerLR,(n.system.w-2*i.marginLR-2*i.innerLR)/i.posterRatio,(n.system.w-2*i.marginLR)*i.radius),e.drawImage(t.path,i.marginLR+i.innerLR,i.marginTB+i.innerLR,n.system.w-2*i.marginLR-2*i.innerLR,(n.system.w-2*i.marginLR-2*i.innerLR)/i.posterRatio),e.restore(),e.draw(!0),a({imgAttr:s,sale:r})},fail:function(t){console.log("fail -> res",t),s.showToast({title:"海报主图下载异常",duration:2e3,icon:"none"})}})}))},creatTitle:function(t,e){t.restore(),t.save(),t.setFontSize(e.titleFontSize);var i=this.drawText(t,e.title,e.marginLR+e.innerLR,(this.system.w-2*e.marginLR-2*e.innerLR)/e.posterRatio+2*e.innerLR+e.marginTB,this.system.w-2*e.marginLR-2*e.innerLR,e.titleLineHeight);return t.draw(!0),i},creatVerticalTitle:function(t,e){var i=this;t.restore(),t.save(),t.setFontSize(e.titleFontSize),e.title.forEach((function(s,n){i.drawText(t,s,e.marginTB+e.desTextML+20*n,e.marginLR+e.desTextMT,15,e.titleLineHeight)})),t.draw(!0)},drawText:function(t,e,i,s){for(var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:375,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:30,r=(t.canvas,e.split("")),o="",c=0;c<r.length;c++){var d=o+r[c],l=t.measureText(d),m=l.width;m>n&&c>0?(t.fillText(o,i,s),o=r[c],s+=a):o=d}return t.fillText(o,i,s),s},creatCodeText:function(t,e,i,s){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:14,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#2f1709";t.setFontSize(n),t.setFillStyle(a);var r=t.measureText(i),o=r.width;t.fillText(i,(this.system.w-o)/2,s+e.codeMT+this.system.w*e.codeWidth+e.codeNameMT+10)},creatTextLine:function(){},creatCode:function(e,i,n){var a=this;t.getImageInfo({src:i.posterCodeUrl,success:function(t){e.restore(),e.draw(!0),a.roundRect(e,(a.system.w-a.system.w*i.codeWidth)/2,n+i.codeMT,a.system.w*i.codeWidth,a.system.w*i.codeWidth*i.codeRatio,a.system.w*i.codeWidth*i.codeRatio*i.codeRadius),e.drawImage(t.path,(a.system.w-a.system.w*i.codeWidth)/2,n+i.codeMT,a.system.w*i.codeWidth,a.system.w*i.codeWidth*i.codeRatio),e.restore(),e.draw(!0)},fail:function(){s.showToast({title:"海报生成失败",duration:2e3,icon:"none"})}})},creatSimpleCode:function(e,i){var n=this;t.getImageInfo({src:i.posterCodeUrl,success:function(t){e.restore(),e.draw(!0),n.roundRect(e,i.marginLR+i.codeML,i.marginTB+i.codeMT,n.system.w*i.codeWidth,n.system.w*i.codeWidth*i.codeRatio,n.system.w*i.codeWidth*i.codeRatio*i.codeRadius),e.drawImage(t.path,i.marginLR+i.codeML,i.marginTB+i.codeMT,n.system.w*i.codeWidth,n.system.w*i.codeWidth*i.codeRatio),e.restore(),e.draw(!0)},fail:function(){s.showToast({title:"海报生成失败",duration:2e3,icon:"none"})}})},handleSaveCanvasImage:function(){var e=this.attrs;t.showLoading({title:"保存中..."});var i=this;s.canvasToTempFilePath({x:e.marginLR,y:e.marginTB,width:this.system.w-2*e.marginLR,height:this.scale*this.system.w-2*e.marginTB-100,destWidth:5*(this.system.w-2*e.marginLR),destHeight:5*(this.scale*this.system.w-2*e.marginTB-100),canvasId:"myCanvas",success:function(e){s.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){t.hideLoading(),s.showToast({title:"图片保存成功，可以去分享啦~",duration:2e3,icon:"none"}),i.handleCanvasCancel()},fail:function(){s.showToast({title:"保存失败，稍后再试",duration:2e3,icon:"none"}),t.hideLoading()}})},fail:function(e){console.log("fail -> res",e),s.showToast({title:"保存失败，稍后再试",duration:2e3,icon:"none"}),t.hideLoading()}},this)},handleCanvasCancel:function(){this.canvasShow=!1,this.$emit("cancel",!0)}}};e.default=o}).call(this,i(1)["default"],i(2)["default"])},630:function(t,e,i){"use strict";i.r(e);var s=i(631),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},631:function(t,e,i){}}]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pagesC/components/uni-poster/uni-poster.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesC/components/uni-poster/uni-poster-create-component',
    {
        'pagesC/components/uni-poster/uni-poster-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(625))
        })
    },
    [['pagesC/components/uni-poster/uni-poster-create-component']]
]);
