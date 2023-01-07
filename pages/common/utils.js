// 定义一个函数
import {ref,reactive,mounted} from 'vue'

function randomNum(prefix,number){
	// console.log("===prefix===",prefix)
	// console.log("===number===",number)
	let num = ""
	for(let i = 0;i<number;i++){
		num += Math.floor(Math.random()*10)
	}
	return prefix+""+ num
}

//实时监听鼠标的动态
function MouseMovement(){
	// 定义默认的宽高
	const movement = reactive({w:window.pageXOffset,h:window.pageYOffset});
	mounted(()=>{
		// 当窗口发生变化时候更新宽高
		window.addEventListener("mousemove",function(){
			movement.w = event.pageX;
			movement.h = event.pageY;
		})
	})
	// 返回size
	return movement;
}
//获取当前日期函数yy-mm-dd
function getNowFormatDate() {
  let date = new Date(),
    year = date.getFullYear(), //获取完整的年份(4位)
    month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
    strDate = date.getDate() // 获取当前日(1-31)
  if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
  if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0
 
  return `${year}-${month}-${strDate}`
}

//获取当前日期函数hh:mm:ss
function getNowFormatTime() {
  let date = new Date(),
    obj = {
      hour: date.getHours(), //获取当前小时(0 ~ 23)
      minute: date.getMinutes(), //获取当前分钟(0 ~ 59)
      second: date.getSeconds() //获取当前秒数(0 ~ 59)
    }
 
  Object.keys(obj).forEach(key => {
    if (obj[key] < 10) obj[key] = `0${obj[key]}`
    // console.log(obj[key])
  })
 
  return `${obj.hour}:${obj.minute}:${obj.second}`
}
export {randomNum,MouseMovement,getNowFormatDate,getNowFormatTime}



