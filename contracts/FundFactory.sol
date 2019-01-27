/*
    This exercise has been updated to use Solidity version 0.5
    Breaking changes from 0.4 to 0.5 can be found here: 
    https://solidity.readthedocs.io/en/v0.5.0/050-breaking-changes.html
*/

pragma solidity ^0.5.0;
import "./SafeMath.sol";

contract FundFactory {


  /* variable called noOfFunds to track the most total list of funds # */
  
  uint public noOfFunds;
  /* funds creates a public mapping that maps the fundId (a number) to a Fund.
  */
  mapping (uint => Fund) public funds;

  /* reflect  the state of a fund using State enum*/
  enum State  {onGoing, Closed}
  /**  struct used to strore list of funds, created one for each new fund
    * name, name of the fund
    * fundHardCap, hard cap upper limit for the fund
    * balance, current balance fo the fund
    *benfitiaryAddress benefitiary address of the fund
  **/
    struct Fund {
        string name;
        uint fundHardCap;
        uint balance;
        address payable benfitiaryAddress;
    }
    //events below fired for each function call that change contract state
    event fundCreation(uint fundId);
    event fundContribution(uint messageReceived);
    event OnGoing(string name, uint balance,string status);
    event Closed(string name, uint balance, State state);
    
  //modifier to check if the msg.value is greater than 0
  modifier paidEnough(uint _price) { require(_price>0); _;}

  //modifier to check if the fund state is OnGoing
  /*modifier onGoing(uint _fundId) {
    require(funds[_fundId].state ==State.onGoing);
        _;
    }
  modifier closed(uint _fundId) {
        require(funds[_fundId].state == State.Closed);
        _;
    }
*/
 
  /** @dev  function creates a new fund
    * @param _name name of the fund
    * @param _fundHardCap hard cap upper limit for the fund
    * @param _benfitiaryAddress benefitiary address of the fund
    * emits an event with fundId
  **/
   function createNewFund(string memory _name, uint _fundHardCap,address payable  _benfitiaryAddress) public 
   {
    uint fundId = noOfFunds++;
    funds[fundId] = Fund(_name, _fundHardCap, 0, _benfitiaryAddress);
    emit fundCreation((fundId));

  }

  /** @dev  payable function that allows users to contribute to a fund
    * @param _fundId unique id to identify the fund in the mapping funds 
    * emits an event with the new balance
  **/
  function contributeToFund(uint _fundId) public payable paidEnough(msg.value) checkAndLimitHardCap(_fundId) 
 {
    Fund memory f = funds[_fundId];
    if(f.balance<f.fundHardCap){
      f.benfitiaryAddress.transfer(msg.value);
      f.balance = SafeMath.add(f.balance , msg.value);
     emit fundContribution(f.balance);
   } 
   else{
     //f.state = State.Closed;
      emit fundContribution(0);
    }
   
    }
  /** @dev  get the name of the fund by using unique fundId
    * @param _fundId unique id to identify the fund in the mapping funds 
    * @return fund name  
  **/
   function fundIdToName(uint _fundId) public view returns(string memory) 
  {
    Fund memory f = funds[_fundId];
    return(f.name);
   } 

   /** @dev get number of funds 
    * @return noOfFunds  
  **/
  function getNoOfFunds() public view returns (uint ) {
    return(noOfFunds);
  }
  
   /** @dev  view function to get fund details using unqiue _fundId
    * @param _fundId  unique identifier for the fund
    * @return name , name of the fund
    * @return  fundHardCap, hard cap upper limit for the fund
    * @return balance, current balance fo the fund
    * @return benfitiaryAddress benefitiary address of the fund
  **/
  function fetchFundDetails(uint _fundId) public view returns (string memory, uint , uint , address ) {
    Fund memory f  = funds[_fundId];
    string memory name = f.name;
    uint balance = f.balance;
    uint fundHardCap = f.fundHardCap;
    //state = f.state;
    address benfitiaryAddress = f.benfitiaryAddress;
    return (name, fundHardCap, balance, benfitiaryAddress);
  }
  
  
  /** @dev  modifer to check if the hardcap of the fund is reached
    * @param _fundId  unique identifier for the fund
    * @return refund the amount that exceeds the hardcap to to the sender
  **/
  modifier checkAndLimitHardCap(uint _fundId) {
         _;
        Fund memory f  = funds[_fundId];
        uint fundHardCap = f.fundHardCap;
        uint balance = f.balance;
        uint amountToHardCap = SafeMath.sub(fundHardCap,balance);
        uint amountToRefund = SafeMath.sub(msg.value , amountToHardCap) ; 
       if(amountToRefund>0)
        msg.sender.transfer(amountToRefund);
       /* uint amount = f.balance;
        f.balance = 0;
        f.targetAddress.transfer(amount);
        return true; */
    }
}