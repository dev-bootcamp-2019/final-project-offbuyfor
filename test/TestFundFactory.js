/*
This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "trufffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.
*/

var FundFactory = artifacts.require('FundFactory');

contract('FundFactory', function(accounts) {

    const targetAddress = accounts[0]
    const emptyAddress = '0x0000000000000000000000000000000000000000'
    const name = 'dummyfundname'
    var sku
    const hardCap = "1000"

    it("should create a new fund", async() => {
        const fundFactory = await FundFactory.deployed()

        var eventEmitted = false

	const tx = await fundFactory.createNewFund(name,hardCap,emptyAddress)
	if (tx.logs[0].event === "Editable") {
		sku = tx.logs[0].args.sku.toString(10)
		eventEmitted = true
	}
        
        const result = await fundFactory.fundinstance.getPoolInfo()

        assert.equal(result[1], 0, 'the fund balance is not set as 0')
        assert.equal(result[0].toString(10), emptyAddress, 'target address not set properly')
          assert.equal(eventEmitted, true, 'creating a new fund should emit a Editable event')
    })

});