/*
    This exercise has been updated to use Solidity version 0.5
    Breaking changes from 0.4 to 0.5 can be found here: 
    https://solidity.readthedocs.io/en/v0.5.0/050-breaking-changes.html
*/

pragma solidity ^0.5.0;

contract FundFactory {


  /* Add a variable called skuCount to track the most recent sku # */
  /* Add a line that creates a public mapping that maps the SKU (a number) to an Item.
     Call this mappings items
  */
uint public noOfFunds;

mapping (uint => Fund) public funds;

 
 enum State  {onGoing, Closed}
  /* Create a struct named Item.
    Here, add a name, sku, price, state, seller, and buyer
    We've left you to figure out what the appropriate types are,
    if you need help you can ask around :)
  */
 struct Fund {
        string name;
        uint fundHardCap;
        uint balance;
        State state;
        address payable targetAddress;
    }
    event testEvent(string message);
    event OnGoing(string name, uint balance,string status);
    //event Locked(uint amount);
    event Closed(string name, uint balance, State state);
    
/* Create a modifer that checks if the msg.sender is the owner of the contract */

  //modifier verifyCaller (address _address) { require (msg.sender == _address); _;}

  modifier paidEnough(uint _price) { require(_price>0); _;}


  /* For each of the following modifiers, use what you learned about modifiers
   to give them functionality. For example, the forSale modifier should require
   that the item with the given sku has the state ForSale. */

  
  modifier onGoing(uint _fundId) {
    require(funds[_fundId].state ==State.onGoing);
        _;
    }

    modifier closed(uint _fundId) {
        require(funds[_fundId].state == State.Closed);
        _;
    }

 
  
  
    function createNewFund(string memory _name, uint _fundHardCap,address payable _targetAddress) public returns(uint fundId)
   {
         emit testEvent(string(abi.encodePacked(_name,_fundHardCap)));

     fundId = noOfFunds++;
    
    funds[fundId] = Fund(_name, _fundHardCap, 0, State.onGoing,_targetAddress);
  }

  /* Add a keyword so the function can be paid. This function should transfer money
    to the seller, set the buyer as the person who called this transaction, and set the state
    to Sold. Be careful, this function should use 3 modifiers to check if the item is for sale,
    if the buyer paid enough, and check the value after the function is called to make sure the buyer is
    refunded any excess ether sent. Remember to call the event associated with this function!*/

  function contributeToFund(uint _fundId) public payable onGoing(_fundId) paidEnough(msg.value) 
 {
    Fund storage f = funds[_fundId];
   if(f.balance<f.fundHardCap){
      f.balance += msg.value;
   } 
   else{
     f.state = State.Closed;
        emit Closed(f.name,f.balance,State.Closed);

        
   }
   
    }
  function getAllFundsIds() public view returns (uint ) {
    return(noOfFunds);
  }

  /* We have these functions completed so we can run tests, just ignore it :) */
  function fetchFundDetails(uint _fundId) public view returns (string memory name, uint fundHardCap, uint balance, State state, address targetAddress) {
    Fund storage f  = funds[_fundId];
    name = f.name;
    balance = f.balance;
    fundHardCap = f.fundHardCap;
    state = f.state;
    targetAddress = f.targetAddress;
    return (name, fundHardCap, balance, state, targetAddress);
  }
   function checkHardCapReached(uint _fundId) public returns (bool reached) {
        Fund storage f = funds[_fundId];
        if (f.balance < f.fundHardCap)
            return false;
        uint amount = f.balance;
        f.balance = 0;
        f.targetAddress.transfer(amount);
        return true;
    }
}