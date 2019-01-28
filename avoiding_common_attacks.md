Please do not evaluate the project before Sunday Jan 27th end of the day EST time


### Prevention of re-entrancy
Prevented re-entrancy in the contract. Use of address.transfer() instead of address.send()
The contract makes use of ```.address.transfer()``` in the contract function ```contributeToFund``` instead of ```address.send()```. This is a safer way of implementing transactions.

### Integer overflow and underflow
Implemented SafeMath.sol from the OpenZepplin library is being used for addition and substraction operations  in ``` FundFactory``` contract

### Paid enough and Fund status modifiers
Currently, the contract is checking the balance of the fund in the ```contributeToFund``` function, a modifier has been created to verify the amount sent by the sender is greater than 0. 
Another modifier to check if the fund is Ongoing vs Closed to make sure it has not reached its fundraiser goal already before adding balance.
A future implementation would include refund of excess contribute to the msg.sender.
