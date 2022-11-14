
import Moment from 'moment';
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function reload(){
	// 页面重载
	const pages = getCurrentPages()
	console.log("===pages===",pages);
	// 声明一个pages使用getCurrentPages方法
	const curPage = pages[pages.length - 1]
	console.log("===curPage===",curPage);
	// 声明一个当前页面
	curPage.onLoad(curPage.options) // 传入参数
	curPage.onShow()
	curPage.onReady()
	// 执行刷新
}
function randomNum(prefix,number){
	console.log("===prefix===",prefix)
	console.log("===number===",number)
	let num = ""
	for(let i = 0;i<number;i++){
		num += Math.floor(Math.random()*10)
	}
	return prefix+""+ num
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getClientNowSystemTime(format,time) {
    let date = '';
    if(time){
      date=new Date(time)
    }else{
      date=new Date()
    }
    let year = date.getFullYear(); //当前年
    let month = date.getMonth() + 1; //当前月
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    let day = date.getDate(); //当前天
    if (day >= 1 && day <= 9) {
      day = "0" + day;
    }
    let hour = date.getHours(); //当前小时
    if (hour >= 1 && hour <= 9) {
      hour = "0" + hour;
    }
    let minute = date.getMinutes(); //当前分钟
    if (minute >= 1 && minute <= 9) {
      minute = "0" + minute;
    }
    let second = date.getSeconds(); //当前秒
    if (second >= 1 && second <= 9) {
      second = "0" + second;
    }
    let ms = date.getMilliseconds(); //当前毫秒
    if (ms >= 1 && ms <= 9) {
      ms = "00" + ms;
    }
    if (ms >= 10 && ms <= 99) {
      ms = "0" + ms;
    }
    if (!format) {
      console.debug(
        "timeutils-getClientNowSystemTime",
        "日期格式为空，返回默认日期格式yyyyMMdd"
      );
      return year + "" + month + "" + day;
    }
    let result = format;
    if (result.indexOf("y") != -1) {
      result = result.replace("yyyy", year);
    }
    if (result.indexOf("M") != -1) {
      result = result.replace("MM", month);
    }
    if (result.indexOf("d") != -1) {
      result = result.replace("dd", day);
    }
    if (result.indexOf("H") != -1) {
      result = result.replace("HH", hour);
    }
    if (result.indexOf("m") != -1) {
      result = result.replace("mm", minute);
    }
    if (result.indexOf("s") != -1) {
      result = result.replace("ss", second);
    }
    if (result.indexOf("S") != -1) {
      result = result.replace("SSS", ms);
    }
    return result;
}
module.exports = {
  formatTime: formatTime,
  randomNum:randomNum,
  getClientNowSystemTime:getClientNowSystemTime,
  reload:reload,
}
