const expect = require("chai").expect
const dayjs = require("dayjs")
const Promise = require("bluebird")

const at = require("..")

/////////////////////////////////////////////////////////////////////////

describe("the function 'at'", function () {
   this.timeout(10000)

   it("should call a callback at a specific time", async function () {
      const time = dayjs().add(5, "s").toDate()
      let ranAt = false
      at(time, function () {
         ranAt = new Date()
      })
      await Promise.delay(5100)

      expect(ranAt).to.not.equal(false)

      let delta = Math.abs(ranAt.getTime() - time.getTime())
      expect(delta).to.be.lessThan(50)
   })

   it("should resolve a promise at a specific time", function () {
      const time = dayjs().add(5, "s").toDate()
      const p = at(time)
      expect(p.isFulfilled()).to.be.false
      expect(p.then).to.be.a("function")

      return p
         .then(function () {
            let delta = Math.abs(new Date().getTime() - time.getTime())
            expect(delta).to.be.lessThan(50)
         })
         .catch(console.error)
   })

})
