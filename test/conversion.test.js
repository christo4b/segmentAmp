const convertAmp = require('../src/conversion.js')
const assert = require('assert')
const { expect } = require('chai')

describe("Conversion to Amplitude Format", function(){

  describe("convertAmp", function (){
    it("is a function", function(done){
      expect(convertAmp).to.be.a('function')
      done()
    })
  })
})