
# Design Pattern Decisions

## Circuit Breaker
I implemented a circuit breaker with the emergency stop function. To disable critical contract functionality during emergency using OpenZeppelin's Pausable contract.
'''/** @dev  payable function that allows users to contribute to a fund
   * @param _fundId unique id to identify the fund in the mapping funds
   * whenNotPaused modifier from Pausable contract for implementing emergency stop pattern
   * emits an event with the new balance
 **/
function contributeToFund(uint _fundId) public payable onGoing(_fundId) paidEnough(msg.value) onlyOwner(_fundId) whenNotPaused'''

## Fail Early and Fail Loud
Access restrictions by using modifiers to restrict access to contract functionality/

Used require statements in various methods as required to fail early and fail loud.

## Future Improvements
- Refund excess fund sent to contribute to the msg.sender, by taking only the amount required to meet the fund goal.
