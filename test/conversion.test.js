const conversion = require('../src/conversion.js')
const assert = require('assert')
const { expect } = require('chai')

describe("Conversion to Amplitude Format:", function(){

  describe("convertAmp", function (){
    it("is a function", function(done){
      expect(conversion.convertAmp).to.be.a('function')
      done()
    })
    
    it('throws an error if missing parameters', function(){
      // expect(() => conversion.convertAmp()).to.throw('Missing Required Parameters')
      expect(() => conversion.convertAmp({user: '1232'})).to.throw('Missing Required Parameters')
      expect(() => conversion.convertAmp({context: { device: { id: null }}})).to.throw('Missing Required Parameters')
    }) 

    it('does not throw an error if gets required parameters', function(){
      expect(() => conversion.convertAmp({userId: '123123'})).to.not.throw('Missing Required Parameters')
      expect(() => conversion.convertAmp({context: { device: { id: '123331' }}})).to.not.throw('Missing Required Parameters')
    }) 

    // it handles null cases

    // it takes a string or an object

    // it returns an object

      // the object it returns does not contain properties that point to null cases
      // the object may contain default values if the data wasn't provided

  })

  describe("checkNested", function(){
    it('is a function', function(){
      expect(conversion.checkNested).to.be.a('function')
    })

    it('returns false when it fails to find nested objects', function(){
      assert.equal(false, conversion.checkNested({context: "one", device: { nested: "two" }}, 'context', 'device', 'id'))
      assert.equal(false, conversion.checkNested({context: { device: { id: null }}}, 'context', 'device', 'id'))
      assert.equal(false, conversion.checkNested({context: { device: { id: undefined }}}, 'context', 'device', 'id'))
    })

    it('returns true when it successfully finds nested objects', function(){
      assert.equal(true, conversion.checkNested({context: { device: { id: "two" }}}, 'context', 'device', 'id'))
    })
  })

  describe("checkForReqs", function(){
    it('is a function', function(){
      expect(conversion.checkForReqs).to.be.a('function')
    })

    it('returns true when required arguments are passed', function(){
      assert.equal(true, conversion.checkForReqs({userId: '1092831029', platform: 'ios'}))
      assert.equal(true, conversion.checkForReqs({"username": "ofn1ix3a", "timestamp": "2017-01-07T18:16:19.769437", "userId": "da13b9b9-e1c8-49cf-a2ee-ed70e49807ea", "email": "drvcmedw@definitely_not_a_spammer.internet", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "fb2bceea-2ae5-453e-96a6-83e7425253d5", "token": "bf0d7412-4483-443d-8209-20b95380d59a", "model": "iPhone6", "type": "ios", "id": "f530174b-7d6f-4208-b54e-b5430a139ed2", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "43.234.242.52", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "9.1", "name": "iPhone OS"}, "library": {"version": 2, "name": "analytics-ios"}, "network": {"wifi": false, "carrier": "Verizon", "cellular": true, "bluetooth": false}}, "messageId": "50d5863a-d1d2-4c4d-8323-94942462a9ee", "type": "identify", "id": "da13b9b9-e1c8-49cf-a2ee-ed70e49807ea"}))
      assert.equal(true, conversion.checkForReqs({"sku": "31faa5ce-2973-45e9-a3a4-ddc057cf20d5", "category": "Widgets", "product_id": "31faa5ce-2973-45e9-a3a4-ddc057cf20d5", "timestamp": "2017-01-07T18:17:39.737758", "brand": "WidgetCo", "userId": "fda70ef2-9b3b-4c4a-8b07-801baf91cd54", "name": "Widget eclfthar", "price": 70.99, "currency": "usd", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "fce56ead-13b8-4f3f-aaa4-9c9096e63af4", "token": "25e29d16-fc24-418a-bba8-099de37374ea", "model": "iPhone6", "type": "ios", "id": "38764100-a97d-479a-b559-5d7faedd1440", "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "215.186.63.78", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "8.1.3", "name": "iPhone OS"}, "library": {"version": 3, "name": "analytics-python"}, "network": {"wifi": false, "carrier": "T-Mobile NL", "cellular": true, "bluetooth": false}}, "messageId": "583401fc-bacd-4e39-9765-b10266c8fcf3", "type": "track", "event": "Product Viewed", "quantity": 1}))
    })

    it('returns false when missing arguments', function(){
      assert.equal(false, conversion.checkForReqs({user_id: '1092831029', platform: 'ios'}))
      assert.equal(false, conversion.checkForReqs({"sku": "31faa5ce-2973-45e9-a3a4-ddc057cf20d5", "category": "Widgets", "product_id": "31faa5ce-2973-45e9-a3a4-ddc057cf20d5", "timestamp": "2017-01-07T18:17:39.737758", "brand": "WidgetCo", "name": "Widget eclfthar", "price": 70.99, "currency": "usd", "version": 2, "context": {"locale": "en-GB", "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "location": {"latitude": 40.2964197, "city": "San Francisco", "speed": 0, "longitude": -76.9411617, "country": "United States"}, "timezone": "Europe/Amsterdam", "device": {"advertisingId": "fce56ead-13b8-4f3f-aaa4-9c9096e63af4", "token": "25e29d16-fc24-418a-bba8-099de37374ea", "model": "iPhone6", "type": "ios", "id": undefined, "adTrackingEnabled": true, "manufacturer": "Apple"}, "ip": "215.186.63.78", "screen": {"width": 320, "density": 2, "height": 568}, "os": {"version": "8.1.3", "name": "iPhone OS"}, "library": {"version": 3, "name": "analytics-python"}, "network": {"wifi": false, "carrier": "T-Mobile NL", "cellular": true, "bluetooth": false}}, "messageId": "583401fc-bacd-4e39-9765-b10266c8fcf3", "type": "track", "event": "Product Viewed", "quantity": 1}))
    })

  })
})