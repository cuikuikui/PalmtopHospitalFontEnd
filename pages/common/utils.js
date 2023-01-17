// 定义一个函数
import {
	ref,
	reactive,
	mounted
} from 'vue'
import CryptoJS from 'crypto-js';
import qs from 'querystring';

// 生成6位随机数
function randomNum(prefix, number) {
	let num = ""
	for (let i = 0; i < number; i++) {
		num += Math.floor(Math.random() * 10)
	}
	return prefix + "" + num
}

// 页面重载
function reload() {
	// 页面重载
	const pages = getCurrentPages()
	console.log("===pages===", pages);
	// 声明一个pages使用getCurrentPages方法
	const curPage = pages[pages.length - 1]
	console.log("===curPage===", curPage);
	// 声明一个当前页面
	curPage.onLoad(curPage.options) // 传入参数
	curPage.onShow()
	curPage.onReady()
	// 执行刷新
}
// AES-CBC解码
function decrypt(text) {
	// console.log("====text===",text);
	const key = "ax7x90.3k_10li5u"; //后端给出的密钥
	const iv = "a0.l954b_107x90l"; //后端给出的密钥偏移量
	let baseResult = CryptoJS.enc.Base64.parse(text); // Base64解密
	let ciphertext = CryptoJS.enc.Base64.stringify(baseResult); // Base64解密
	let decryptResult = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), { //  AES解密
		iv: CryptoJS.enc.Utf8.parse(iv),
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
	// console.log("====resData===",resData)
	return resData;
}

// 格式yyyy-MM-dd HH:mm:ss（格式不一定写全，也可以格式为yyyy-MM-dd）
function getClientNowSystemTime(format, time) {
	let date = '';
	if (time) {
		date = new Date(time)
	} else {
		date = new Date()
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
/**
 * 严格的身份证校验
 * @param {*} sId 
 */
function isCardID(sId) {
	if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {

		return false
	}
	//身份证城市
	var aCity = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外"
	};
	if (!aCity[parseInt(sId.substr(0, 2))]) {

		return false
	}

	// 出生日期验证
	var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g,
			"/"),
		d = new Date(sBirthday)
	if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {

		return false
	}

	// 身份证号码校验
	var sum = 0,
		weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		codes = "10X98765432"
	for (var i = 0; i < sId.length - 1; i++) {
		sum += sId[i] * weights[i];
	}
	var last = codes[sum % 11]; //计算出来的最后一位身份证号码
	if (sId[sId.length - 1] != last) {

		return false
	}

	return true
}
/**
 * 图片转Bse64
 * @param {*} tempImagePath=========>无效
 */
function getBase64(tempImagePath) {
	return new Promise(function(resolve, reject) {
		wx.getFileSystemManager().readFile({
			filePath: tempImagePath,
			encoding: "base64",
			success: function(data) {
				resolve(data)
			}
		})
	})
}
//实时监听鼠标的动态------->暂未使用
function MouseMovement() {
	// 定义默认的宽高
	const movement = reactive({
		w: window.pageXOffset,
		h: window.pageYOffset
	});
	mounted(() => {
		// 当窗口发生变化时候更新宽高
		window.addEventListener("mousemove", function() {
			movement.w = event.pageX;
			movement.h = event.pageY;
		})
	})
	// 返回size
	return movement;
}
/**
 *
 * @param {String} time1 需要转换的时间戳------->暂未使用
 */
// 时间戳转换成yy-mm-dd格式
function dateChange(time1) {
	if (time1) {
		var time = new Date(time1);
		var year = time.getFullYear();
		var month = time.getMonth() + 1;
		if (month < 10) {
			month = '0' + month;
		}
		var date = time.getDate();
		if (date < 10) {
			date = '0' + date;
		}
		return year + "-" + month + "-" + date;
	}
}
/**
 *
 * @param(yyyyMMdd) {String} date 判断日期是否为合法的日期------->暂未使用
 */
function isDate(date) {
	if (date.length < 8) {
		return false;
	}

	let Year = 0;
	let Month = 0;
	let Day = 0;
	try {
		Year = parseInt(date.substring(0, 4));
		Month = parseInt(date.substring(4, 6));
		Day = parseInt(date.substring(6));
	} catch (e) {
		return false;
	}

	if (
		Day > 31 ||
		Day < 1 ||
		Month > 12 ||
		Month < 1 ||
		((Month == 4 || Month == 6 || Month == 9 || Month == 11) && Day == 31) ||
		(Month == 2 && Day > 29)
	) {
		return false;
	}

	if (!((Year % 4 == 0 && Year % 100 != 0) || Year % 400 == 0)) {
		if (Month == 2 && Day == 29) {
			return false;
		}
	}
	return true;
}
export {
	randomNum,
	reload,
	MouseMovement,
	getClientNowSystemTime,
	decrypt,
	isDate,
	dateChange,
	isCardID,
	getBase64
}
