(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-poster/uni-poster"],{603:function(t,e,i){"use strict";i.r(e);var s=i(604),n=i(606);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i(608);var r,o=i(40),c=Object(o["default"])(n["default"],s["render"],s["staticRenderFns"],!1,null,null,null,!1,s["components"],r);c.options.__file="components/uni-poster/uni-poster.vue",e["default"]=c.exports},604:function(t,e,i){"use strict";i.r(e);var s=i(605);i.d(e,"render",(function(){return s["render"]})),i.d(e,"staticRenderFns",(function(){return s["staticRenderFns"]})),i.d(e,"recyclableRender",(function(){return s["recyclableRender"]})),i.d(e,"components",(function(){return s["components"]}))},605:function(t,e,i){"use strict";var s;i.r(e),i.d(e,"render",(function(){return n})),i.d(e,"staticRenderFns",(function(){return r})),i.d(e,"recyclableRender",(function(){return a})),i.d(e,"components",(function(){return s}));var n=function(){var t=this,e=t.$createElement;t._self._c},a=!1,r=[];n._withStripped=!0},606:function(t,e,i){"use strict";i.r(e);var s=i(607),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},607:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{canvasShow:!1,attrs:{marginLR:40,marginTB:40,radius:.03,fillColor:"#ffffff",innerLR:20,innerTB:20,posterRatio:1.3,posterImgUrl:"http://47.102.124.213/images/guaHao/logo.png",title:"今日上新水果，牛奶草莓，颗粒饱满，每盒 200g",titleFontSize:16,titleLineHeight:25,posterCodeUrl:"http://47.102.124.213/images/guaHao/erweima.png",codeWidth:.3,codeRatio:1,codeRadius:0,codeMT:20,codeName:"记忆之王",codeNameMT:20,tips:"长按/扫描识别查看商品",posterBgUrl:"http://47.102.124.213/images/guaHao/codeBg.jpg",codeML:140,desTextMT:70,desTextML:240}}},props:{posterBgFlag:{type:Boolean,default:!1},simpleFlag:{type:Boolean,default:!1}},mounted:function(){this.system=this.getSystem()},methods:{posterShow:function(){this.canvasShow=!0,Object.assign(this.attrs,this.canvasAttr),this.attrs={marginLR:this.attrs.marginLR*this.systemScale,marginTB:this.attrs.marginTB*this.systemScale,innerLR:this.attrs.innerLR*this.systemScale,innerTB:this.attrs.innerTB*this.systemScale,radius:this.attrs.radius,fillColor:this.attrs.fillColor,posterRatio:this.attrs.posterRatio,posterImgUrl:this.attrs.posterImgUrl,title:this.attrs.title,titleFontSize:this.attrs.titleFontSize*this.systemScale,titleLineHeight:this.attrs.titleLineHeight*this.systemScale,posterCodeUrl:this.attrs.posterCodeUrl,codeWidth:this.attrs.codeWidth*this.systemScale,codeRatio:this.attrs.codeRatio,codeRadius:this.attrs.codeRadius,codeMT:this.attrs.codeMT*this.systemScale,codeName:this.attrs.codeName,codeNameMT:this.attrs.codeNameMT*this.systemScale,tips:this.attrs.tips,posterBgUrl:this.attrs.posterBgUrl,codeML:this.attrs.codeML*this.systemScale,desTextMT:this.attrs.desTextMT*this.systemScale,desTextML:this.attrs.desTextML*this.systemScale},this.simpleFlag?this.creatSimplePoster(this.attrs):this.creatPoster(this.attrs)},creatPoster:async function(t){wx.showLoading({title:"生成海报中..."});var e=wx.createCanvasContext("myCanvas",this);e.draw(),this.roundRect(e,t.marginLR,t.marginTB,this.system.w-2*t.marginLR,this.scale*this.system.w-2*t.marginTB-100,(this.system.w-2*t.marginLR)*t.radius,t.fillColor),this.posterBgFlag&&await this.creatBgImg(e,t);await this.creatImg(e,t);var i=this.creatTitle(e,t);this.creatCode(e,t,i),this.creatCodeText(e,t,t.codeName,i,16,"#2f1709"),this.creatCodeText(e,t,t.tips,i+30,14,"#2f1709"),wx.hideLoading()},creatSimplePoster:async function(t){wx.showLoading({title:"生成海报中..."});var e=wx.createCanvasContext("myCanvas",this);e.draw(),this.roundRect(e,t.marginLR,t.marginTB,this.system.w-2*t.marginLR,this.scale*this.system.w-2*t.marginTB-100,(this.system.w-2*t.marginLR)*t.radius,t.fillColor),this.posterBgFlag&&await this.creatBgImg(e,t),this.creatSimpleCode(e,t,t.marginTB),this.creatVerticalTitle(e,t),wx.hideLoading()},roundRect:function(t,e,i,s,n,a){t.save(),t.beginPath(),t.arc(e+a,i+a,a,Math.PI,1.5*Math.PI),t.lineTo(e+s-a,i),t.arc(e+s-a,i+a,a,1.5*Math.PI,2*Math.PI),t.lineTo(e+s,i+n-a),t.arc(e+s-a,i+n-a,a,0,.5*Math.PI),t.arc(e+a,i+n-a,a,.5*Math.PI,Math.PI),t.lineTo(e,i+a),t.setFillStyle("#ffffff"),t.fill(),t.clip()},getSystem:function(){var t=wx.getSystemInfoSync();return this.scale=667/375,this.systemScale=t.windowWidth/375,{w:t.windowWidth,h:t.windowHeight}},creatBgImg:function(e,i){var s=this;return new Promise((function(n,a){wx.getImageInfo({src:i.posterBgUrl,success:function(t){t.width,s.system.w,i.marginLR;e.drawImage(t.path,i.marginLR,i.marginTB,s.system.w-2*i.marginLR,s.scale*s.system.w-2*i.marginTB-100),e.restore(),e.draw(!0),n()},fail:function(e){console.log("fail -> res",e),t.showToast({title:"海报背景图下载异常",duration:2e3,icon:"none"})}})}))},creatImg:function(e,i){var s=this;return new Promise((function(n,a){wx.getImageInfo({src:i.posterImgUrl,success:function(t){e.restore(),e.draw(!0);var a=t,r=t.width/(s.system.w-2*i.marginLR-2*i.innerLR);s.roundRect(e,i.marginLR+i.innerLR,i.marginTB+i.innerLR,s.system.w-2*i.marginLR-2*i.innerLR,(s.system.w-2*i.marginLR-2*i.innerLR)/i.posterRatio,(s.system.w-2*i.marginLR)*i.radius),e.drawImage(t.path,i.marginLR+i.innerLR,i.marginTB+i.innerLR,s.system.w-2*i.marginLR-2*i.innerLR,(s.system.w-2*i.marginLR-2*i.innerLR)/i.posterRatio),e.restore(),e.draw(!0),n({imgAttr:a,sale:r})},fail:function(e){console.log("fail -> res",e),t.showToast({title:"海报主图下载异常",duration:2e3,icon:"none"})}})}))},creatTitle:function(t,e){t.restore(),t.save(),t.setFontSize(e.titleFontSize);var i=this.drawText(t,e.title,e.marginLR+e.innerLR,(this.system.w-2*e.marginLR-2*e.innerLR)/e.posterRatio+2*e.innerLR+e.marginTB,this.system.w-2*e.marginLR-2*e.innerLR,e.titleLineHeight);return t.draw(!0),i},creatVerticalTitle:function(t,e){var i=this;t.restore(),t.save(),t.setFontSize(e.titleFontSize),e.title.forEach((function(s,n){i.drawText(t,s,e.marginTB+e.desTextML+20*n,e.marginLR+e.desTextMT,15,e.titleLineHeight)})),t.draw(!0)},drawText:function(t,e,i,s){for(var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:375,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:30,r=(t.canvas,e.split("")),o="",c=0;c<r.length;c++){var d=o+r[c],h=t.measureText(d),l=h.width;l>n&&c>0?(t.fillText(o,i,s),o=r[c],s+=a):o=d}return t.fillText(o,i,s),s},creatCodeText:function(t,e,i,s){var n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:14,a=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"#2f1709";t.setFontSize(n),t.setFillStyle(a);var r=t.measureText(i),o=r.width;t.fillText(i,(this.system.w-o)/2,s+e.codeMT+this.system.w*e.codeWidth+e.codeNameMT+10)},creatTextLine:function(){},creatCode:function(e,i,s){var n=this;wx.getImageInfo({src:i.posterCodeUrl,success:function(t){e.restore(),e.draw(!0),n.roundRect(e,(n.system.w-n.system.w*i.codeWidth)/2,s+i.codeMT,n.system.w*i.codeWidth,n.system.w*i.codeWidth*i.codeRatio,n.system.w*i.codeWidth*i.codeRatio*i.codeRadius),e.drawImage(t.path,(n.system.w-n.system.w*i.codeWidth)/2,s+i.codeMT,n.system.w*i.codeWidth,n.system.w*i.codeWidth*i.codeRatio),e.restore(),e.draw(!0)},fail:function(){t.showToast({title:"海报生成失败",duration:2e3,icon:"none"})}})},creatSimpleCode:function(e,i){var s=this;wx.getImageInfo({src:i.posterCodeUrl,success:function(t){e.restore(),e.draw(!0),s.roundRect(e,i.marginLR+i.codeML,i.marginTB+i.codeMT,s.system.w*i.codeWidth,s.system.w*i.codeWidth*i.codeRatio,s.system.w*i.codeWidth*i.codeRatio*i.codeRadius),e.drawImage(t.path,i.marginLR+i.codeML,i.marginTB+i.codeMT,s.system.w*i.codeWidth,s.system.w*i.codeWidth*i.codeRatio),e.restore(),e.draw(!0)},fail:function(){t.showToast({title:"海报生成失败",duration:2e3,icon:"none"})}})},handleSaveCanvasImage:function(){var e=this.attrs;wx.showLoading({title:"保存中..."});var i=this;t.canvasToTempFilePath({x:e.marginLR,y:e.marginTB,width:this.system.w-2*e.marginLR,height:this.scale*this.system.w-2*e.marginTB-100,destWidth:5*(this.system.w-2*e.marginLR),destHeight:5*(this.scale*this.system.w-2*e.marginTB-100),canvasId:"myCanvas",success:function(e){t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(e){wx.hideLoading(),t.showToast({title:"图片保存成功，可以去分享啦~",duration:2e3,icon:"none"}),i.handleCanvasCancel()},fail:function(){t.showToast({title:"保存失败，稍后再试",duration:2e3,icon:"none"}),wx.hideLoading()}})},fail:function(e){console.log("fail -> res",e),t.showToast({title:"保存失败，稍后再试",duration:2e3,icon:"none"}),wx.hideLoading()}},this)},handleCanvasCancel:function(){this.canvasShow=!1,this.$emit("cancel",!0)}}};e.default=i}).call(this,i(1)["default"])},608:function(t,e,i){"use strict";i.r(e);var s=i(609),n=i.n(s);for(var a in s)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(a);e["default"]=n.a},609:function(t,e,i){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-poster/uni-poster.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-poster/uni-poster-create-component',
    {
        'components/uni-poster/uni-poster-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(603))
        })
    },
    [['components/uni-poster/uni-poster-create-component']]
]);
