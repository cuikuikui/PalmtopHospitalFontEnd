const getMainPage1 = '/WechatUserAdd' // 获取首页资源
const getMainPage2 = '/WechatUserQuery' 
const GetHospitalByCity='/GetHospitalByCity'
const GetOfficeByHospitalId='/GetOfficeByHospitalId'
const userServlet ='/userServlet'
const GetRoomsByOfficeId='/GetRoomsByOfficeId'
const scheduleList='/scheduleList'
const GetDoctorsByRoomId='/GetDoctorsByRoomId'
const GetDoctorsByDay='/GetDoctorsByDay'
const AskerServlet='/AskerServlet'  //
const OfficeServlet ='/OfficeServlet'
const GuaHaoInsert='/GuaHaoInsert'
const GetGuaHaoInfoByOpenId='/GetGuaHaoInfoByOpenId'
const AddScheduleNum='/AddScheduleNum'
const PayGuaHaoOK='/PayGuaHaoOK'
const GetHospitalByName='/GetHospitalByName'
const InsertCollection='/InsertCollection'
const DeleteCollection='/DeleteCollection'
const GetCollectHospitalByOpenid='/GetCollectHospitalByOpenid'
const GetCollectDoctorByOpenid='/GetCollectDoctorByOpenid'
const GetNoticeByHospitalId='/GetNoticeByHospitalId'
const GetAllDoctorList='/GetAllDoctorList'
const GetDoctorsByNamePercent='/GetDoctorsByNamePercent'
const GetGuaHaoHospitals='/GetGuaHaoHospitals'
const EvaluateAdd='/EvaluateAdd'
const Questions_List_Json='/Questions_List_Json'
const WechatUserUpdate='/WechatUserUpdate'
const HospitalServlet ='/HospitalServlet'
const NoticeServlet ='/NoticeServlet'
const DoctorOfficeRoomDaoServlet = '/DoctorOfficeRoomDaoServlet'
const RoomServlet = '/RoomServlet'
const DoctorServlet ='/DoctorServlet'
const ScheduleServlet ='/ScheduleServlet'
const CollectionServlet ='/CollectionServlet'
const GuaHaoServlet ='/GuaHaoServlet'
//抛出getMainPage这个常量
module.exports = {
  getMainPage1,
  getMainPage2,
  GetHospitalByCity,
  GetOfficeByHospitalId,
  userServlet,
  GetRoomsByOfficeId,
  scheduleList,
  GetDoctorsByRoomId,
  GetDoctorsByDay,
  AskerServlet,
  GuaHaoInsert,
  GetGuaHaoInfoByOpenId,
  AddScheduleNum,
  PayGuaHaoOK,
  GetHospitalByName,
  InsertCollection,
  DeleteCollection,
  GetCollectHospitalByOpenid,
  GetCollectDoctorByOpenid,
  GetNoticeByHospitalId,
  GetAllDoctorList,
  GetDoctorsByNamePercent,
  GetGuaHaoHospitals,
  EvaluateAdd,
  Questions_List_Json,
  HospitalServlet,
  NoticeServlet,
  DoctorOfficeRoomDaoServlet,
  OfficeServlet,
  RoomServlet,
  DoctorServlet,
  ScheduleServlet,
  CollectionServlet,
  GuaHaoServlet,
}