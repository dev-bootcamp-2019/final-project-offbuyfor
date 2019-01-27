/*
This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.
*/

var FundFactory = artifacts.require('FundFactory');

contract('FundFactory', function(accounts) {

    const senderAddress = accounts[0]
    const emptyAddress = '0x0000000000000000000000000000000000000000'
    const benefitiaryAddress = accounts[1];
    const name = 'manmohan'
    var fundId
    var amountReceived
    const hardCap = "1000"
    const contributionAmount= "100";
    let fundFactory
    beforeEach(async() => {
    fundFactory = await FundFactory.deployed()

    })

    it("calling create a new fund , should emit an event and return fundId", async() => {
        var eventEmitted = false

	    const tx = await fundFactory.createNewFund(name,hardCap,benefitiaryAddress)
        
        if (tx.logs[0].event === "fundCreation") {
		fundId = tx.logs[0].args.fundId.toString(10)
		eventEmitted = true
        }
        assert.equal(fundId, '0', 'first fundid is equal to 0 ')

        assert.equal(eventEmitted, true, 'creating a new fund should emit a Editable event')

            
    })
    it("calling fetchFundDetails, should return fund parameters", async() => {
        const result = await fundFactory.fetchFundDetails.call(0)

        assert.equal(result[0], name, 'the fund name is not set properly')
        assert.equal(result[1], hardCap, 'the fund hardcap is not set properly')
        assert.equal(result[2], 0, 'the fund balance is not set as 0')
        assert.equal(result[3].toString(10), benefitiaryAddress, 'benefitiary address not set properly')


            
    })
    it("check if the fundHard cap has reached", async() => {
        const result = await fundFactory.checkHardCapReached.call(0)

        assert.equal(result, false, 'Fund balance should be less than hardCap')
    })
    it("call contribute function to contribute to a fund", async() => {
        const tx = await fundFactory.contributeToFund(0,{from:senderAddress,value:contributionAmount})
        if(tx.logs[0].event === "fundContribution") {
            amountReceived = tx.logs[0].args.messageReceived.toString(10)
            }
         assert.equal(amountReceived, contributionAmount, 'amount sent doesnt match amount received')
     })

    
});