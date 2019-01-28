/*
    This exercise has been updated to use Solidity version 0.5
    Breaking changes from 0.4 to 0.5 can be found here: 
    https://solidity.readthedocs.io/en/v0.5.0/050-breaking-changes.html
*/

pragma solidity ^0.5.0;

import "./SafeMath.sol";
import "../client/node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
//import  "../client/node_modules/web3" as web3;
    

contract FundFactory is Pausable {


  /* variable called noOfFunds to track the most total list of funds # */
  address owner;
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
        uint256 balance;
        address payable benfitiaryAddress;
        State state;
        address owner;
    }
    //events below fired for each function call that change contract state
    event fundCreation(uint fundId);
    event fundContribution(uint256 messageReceived);
    event OnGoing(uint fundId);
    event Closed(uint fundId);
    
    //modifier to check if the msg.value is greater than 0
    modifier paidEnough(uint _price) { require(_price>0); _;}

    //modifier to check if the fund state is OnGoing
    modifier onGoing(uint _fundId) {
      require(funds[_fundId].state ==State.onGoing);
          _;
      }
    //modifier to check if the fund state is closed
    modifier closed(uint _fundId) {
          require(funds[_fundId].state == State.Closed);
          _;
      }
      /**
    @dev Modifier to check if the sender is the owner of the fund 
     */
    modifier onlyOwner(uint _fundId){
       Fund memory f = funds[_fundId];  
        require(f.owner == msg.sender);
        _;
    }

 
  /** @dev  function creates a new fund
    * @param _name name of the fund
    * @param _fundHardCap hard cap upper limit for the fund
    * @param _benfitiaryAddress benefitiary address of the fund
    * emits an event with fundId
  **/
   function createNewFund(string memory _name, uint _fundHardCap,address payable  _benfitiaryAddress) public 
   {
    noOfFunds = SafeMath.add(noOfFunds,1);
    uint fundId = noOfFunds;
    uint256 balance = 0;
    funds[fundId] = Fund(_name, _fundHardCap, balance, _benfitiaryAddress, State.onGoing,msg.sender);
    emit fundCreation((fundId));

  }

  /** @dev  payable function that allows users to contribute to a fund
    * @param _fundId unique id to identify the fund in the mapping funds 
    * whenNotPaused modifier from Pausable contract for implementing emergency stop pattern
    * emits an event with the new balance
  **/
  function contributeToFund(uint _fundId) public payable onGoing(_fundId) paidEnough(msg.value)
       
 {
    Fund memory f = funds[_fundId];
    uint thisfundHardCap = f.fundHardCap;
    uint256 thisbalance = f.balance;
    if(thisbalance<thisfundHardCap){
      f.balance = SafeMath.add(thisbalance , msg.value);
      f.benfitiaryAddress.transfer(msg.value);
      emit fundContribution(f.balance);
   } 
   else{
     f.state = State.Closed;
     
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
    * @return  balance, hard cap upper limit for the fund
    * @return fundHardCap, current balance fo the fund
    * @return benfitiaryAddress benefitiary address of the fund
  **/
  function fetchFundDetails(uint _fundId) public view returns (string memory, uint , uint256 , address, State) {
    Fund storage f  = funds[_fundId];
    string memory name = f.name;
    uint fundHardCap = f.fundHardCap;
    State state = f.state;
    address benfitiaryAddress = f.benfitiaryAddress;
    return (name, fundHardCap, f.balance, benfitiaryAddress, state);
  }

  

 
   
}