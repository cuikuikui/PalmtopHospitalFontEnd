const uniID = require('uni-id')
exports.main = async function(event,context) {
    const res = await uniID.code2SessionWeixin({
    code: event.code
  })
    return res
}