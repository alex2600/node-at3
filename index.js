const Promise = require("bluebird")
const dates = {}

setInterval(check, 50)

/////////////////////////////////////////////////////////////////////////

module.exports = at

/////////////////////////////////////////////////////////////////////////

/**
 * run callback at specific date-time
 * @param {Date} date a JS Date to run at
 * @param [cb] Optional callback function
 * @return {Promise} Promise when no callback is given, nothing otherwise
 */
function at (date, cb) {
   if (!date instanceof Date) throw new Error("js Date required")
   if (!cb) {
      let re
      const p = new Promise(function (resolve) { re = resolve })
      dates[date.getTime().toString()] = re
      return p
   }
   else {
      dates[date.getTime().toString()] = cb
   }
}

function check () {
   const now = new Date().getTime()
   let keys = Object.keys(dates)
   keys = keys.filter(key => Number(key) < now)
   for (const key of keys) {
      const fn = dates[key]
      delete dates[key]
      fn()
   }
}
