/*
This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.
*/

var FundFactory = artifacts.require('FundFactory');

//test for Fund Factory Contract 
contract('FundFactory', function (accounts) {

	const senderAddress = accounts[0]
	const emptyAddress = '0x0000000000000000000000000000000000000000'
	const benefitiaryAddress = accounts[2];
	const name = 'fundname'
	var fundId
    var amountReceived
	const hardCap = "1000"
	const contributionAmount = "1000000000000000000";
    let fundFactory
    var eventEmitted = false

	beforeEach(async() => {
		fundFactory = await FundFactory.deployed()
        const tx = await fundFactory.createNewFund(name, hardCap, benefitiaryAddress)

		if (tx.logs[0].event === "fundCreation") {
			fundId = tx.logs[0].args.fundId.toString(10)
			eventEmitted = true
		}
	})
	  //test 1 - to create a new fund should emit an event fundCreation
	it("calling create a new fund , should emit an event", async() => {

		
		assert.equal(eventEmitted, true, 'creating a new fund should emit a fundCreation event')
    })
    //test 2 - create new fund should set proper values 
	it("calling fetchFundDetails, should return fund parameters", async() => {
		const result = await fundFactory.fetchFundDetails.call(fundId)

		assert.equal(result[0], name, 'the fund name is not set properly')
		assert.equal(result[1], hardCap, 'the fund hardcap is not set properly')
		assert.equal(result[2], 0, 'the fund balance is not set as 0')
        assert.equal(result[3].toString(10), benefitiaryAddress, 'benefitiary address not set properly')
        assert.equal(result[4].toString(10), 0 , 'state not properly set as OnGoing')
        
    })
  
   //test 3- to contribute to an existing fund emits a fundContribution event with amountreceived
	it("call contribute function to contribute to a fund", async() => {
        if(eventEmitted){
        const contributetx = await fundFactory.contributeToFund(fundId, {
			from: senderAddress,
			value: contributionAmount
		})
		if (contributetx.logs[0].event === "fundContribution") {
			amountReceived = contributetx.logs[0].args.messageReceived.toString(10)
		}

		
		assert.equal(amountReceived, contributionAmount, 'amount sent doesnt match amount received in contract')
		    
	}
    })
     
 
    //test 4 - to get the current total number of funds 
    it("call getNoOfFunds to know how many funds were created", async() => {
        
        if(eventEmitted){
		const result = await fundFactory.getNoOfFunds.call()

        assert.equal(result.toString(10), Number(fundId), 'total number of funds recorded doesnt match with actual funds created')
         }
    })
   
     //test 5 - to get the name of a fund using its fundId 
     it("call function fundIdToName to get the name of a particular fund using fund Id", async() => {
		
        if(eventEmitted){
        const result = await fundFactory.fundIdToName.call(fundId)

        assert.equal(result.toString(), name, 'the fund name is not set properly')
        }
    })


});