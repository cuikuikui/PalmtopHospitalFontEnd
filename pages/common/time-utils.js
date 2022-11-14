import  DateFormat  from "**/页面方法/基础类/DateFormat_1.0.js"; // 交易级别日志
import  TimeFormat  from "**/页面方法/基础类/TimeFormat_1.0.js";
import  DateAdder  from "**/页面方法/基础类/DateAdder_1.0.js";
//import  DateCompare  from "**/页面方法/基础类/DateCompare_1.0.js";

export default {
  getClientNowSystemTime(format,time) {
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
  },

  /**
   * 日期比较
   * @param {String} startDay 开始时间
   * @param {String} endDay 结束时间
   */
  dateCompare(startDay, endDay) {
    // let dateCompare = new DateCompare();
    // let res = await dateCompare.executeAsync({
    //   date1: startDay,
    //   date2: endDay
    // });
    // let end = res.end;
    // if (end == "positive") {
    //   return 1;
    // } else if (end == "minus") {
    //   return -1;
    // } else {
    //   return 0;
    // }
    if (startDay > endDay) {
      return 1;
    } else if (startDay < endDay) {
      return -1;
    } else {
      return 0;
    }
  },

  /**
   * 日期增加
   * @param {String} inputDate 输入日期(yyyyMMdd)
   * @param {String} inputType 输入类型(Year|Month|Day)
   * @param {String} inputUnits 增加或减少的数值
   * @returns {String} 输出日期(yyyyMMdd)
   */
  // async dayAdd(inputDate, inputType, inputUnits) {
  //   let dateAdder = new DateAdder();
  //   let res = await dateAdder.executeAsync({
  //     inputDate: inputDate,
  //     inputType: inputType,
  //     inputUnits: inputUnits
  //   });
  //   return res.outArgs.outputDate;
  // },

  /**
   * 时间格式化
   * @param {String} timeString
   * @param {String} srcFmt
   */
  // async timeFormat(timeString, srcFmt) {
  //   let tf = new TimeFormat();
  //   let res = await tf.executeAsync({
  //     strTime: timeString,
  //     format: srcFmt
  //   });
  //   return res.outArgs.formatted;
  // },
  /**
   * 日期格式化，该方法调用请使用await调用
   * @param {String} dateString 格式为yyyyMMdd形式的日期字符串
   * @param {*} srcFmt 日期格式 如：yyyy/MM/dd
   */
  // async dateFormat(dateString, srcFmt) {
  //   if (!this.isDate(dateString)) {
  //     return new Promise((resolve, eject) => {
  //       eject("日期格式不合法");
  //     });
  //   }
  //   let df = new DateFormat();
  //   let res = await df.executeAsync({
  //     strDate: dateString,
  //     format: srcFmt
  //   });
  //   return res.outArgs.formatted;
  // },
  /**
   *
   * @param {String} date 判断日期是否为合法的日期
   */
  isDate(date) {
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
  },
   /**
   *
   * @param {String} time1 需要转换的时间戳
   */
  // 时间戳转换成yy-mm-dd格式
  async dateChange(time1) {
    if(time1){
    var time = new Date(time1);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    if(month < 10){ 
      month = '0' + month;
  }
    var date=time.getDate();
    if(date < 10){ 
      date = '0' + date;
    }
    return year + "-" + month + "-" + date;
    }
  },
};


