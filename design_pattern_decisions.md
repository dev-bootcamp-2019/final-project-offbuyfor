
# Design Pattern Decisions

## Circuit Breaker - Emergency stops and contract state (Active vs Closed)
I implemented a circuit breaker with the emergency stop function. modifiers OnGoing and stopInEmergency are used to ensure the current status of the fund. To disable critical contract functionality during emergency using OpenZeppelin's Pausable contract.
```
/** @dev  payable function that allows users to contribute to a fund
    * @param _fundId unique id to identify the fund in the mapping funds 
    * whenNotPaused modifier from Pausable contract for implementing emergency stop pattern
    * emits an event with the new balance
  **/
  function contributeToFund(uint _fundId) public payable onGoing(_fundId) paidEnough(msg.value) stopInEmergency
      
```
The below toggle function can only be called by the fund creator to stop the contribution to a certain fund in case of emergency 
```
/** @dev  Circuit breaker function to stop contribution to a  fund , can only be called by the 
            fund creator , sets the stopped flag to true and changes funds state to Closed
    * @param _fundId  unique identifier for the fund
  **/
  function toggleContributionActive(uint _fundId) isFundCreator(_fundId) public {
    stopped = !stopped;
    funds[_fundId].state = State.Closed;

  }

```
## Fail Early and Fail Loud
Access restrictions by using modifiers to restrict access to contract functionality/

Used require statements in various methods as required to fail early and fail loud.

## Future Improvements
- Refund excess fund sent to contribute to the msg.sender, by taking only the amount required to meet the fund goal.
