import React, { Component } from "react";
import FundFactoryContract from "./contracts/FundFactory.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {

  
  state = { name:'',createdFundId:'',fundId:0,fundHardCap:0,
  getFundname:'',getFundBalance:0,getFundHardCap:'',getFundBenefitiaryAddress:0,
  benefitiaryAddress:null,noOfFunds: '',fundBalance:0, 
  listSelectionFundId:0,contributionAmount:0,
  fundGoal: 0, web3: null, accounts: null, contract: null };
 
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundFactoryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        FundFactoryContract.abi,
      '0xE2FfCDB3c018794435179217bE7C8feEDc53dE8A'
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance },this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    } 
  };
 
  runExample = async () => {
   const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    // await contract.methods.getAllFundsIds().send({ from: accounts[0] });
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getAllFundsIds().call();
    // Update state with the result.
    this.setState({ noOfFunds: response[0] });
  };
 
  
 
    handleClickNewFund = async(event) => {
  event.preventDefault();
      console.log(this.state.name);
      console.log(this.state.fundHardCap);
      console.log(this.state.benefitiaryAddress);

    
      const { accounts, contract } = this.state;
      // Stores a given value, 5 by default.
      const response = await contract.methods.createNewFund(this.state.name, this.state.fundHardCap,
        this.state.benefitiaryAddress).send({ from: accounts[0],value :1000000000000000});
      // Get the value from the contract to prove it worked.
      // Update state with the result.
      this.setState({ createdFundId: response[0] });
      
    
    
    /*
     console.log('this is create new campaign');
     const contract = this.state.contract 
     const account = this.state.contract
     var value = 3 

     contract.set(value,{from:account})
     .then(result => {
       return contract.methods.fetchFundDetails(0).call();

     }).then(result => {
       return this.setState(storageValue: results.c[0])
     })
     */
     
   }
   handleClickContribute =  async(event) =>   {
    event.preventDefault();
    console.log('this is contribute button');
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    const response = await contract.methods.contributeToFund(this.state.fundId).send({ from: accounts[0],value: 1000000000000000000});
    // Get the value from the contract to prove it worked.
    // Update state with the result.
   // this.setState({ getFundname: response[0], getFundHardCap:response[1],getFundBalance:response[2],getFundBenefitiaryAddress:response[4] });

  }
 /* handleClickRefreshList(event){
    event.preventDefault();

    this.state.listOfFunds.push('option99');
    

  }*/
  handleClickGetFundDetails =  async(event) => {
    event.preventDefault();
    console.log(this.state.fundId);

    const { accounts, contract } = this.state;
    // Stores a given value, 5 by default.
    const response = await contract.methods.fetchFundDetails(this.state.fundId).call();
    // Get the value from the contract to prove it worked.
    // Update state with the result.
    console.log(response[0]);
    console.log(response[1]);
    

    this.setState({ getFundname: response[0], getFundHardCap:response[1],getFundBalance:response[2],getFundBenefitiaryAddress:response[4] });

  }
   handleChangeListOfFunds(event){

   }
   handleChangeName(event)  {
    this.setState({name:event.target.value});
  }
  handleChangeHardCap(event)  {
    this.setState({fundHardCap:event.target.value});
  }
  handleChangeBenefitiaryAddress(event)  {
    this.setState({benefitiaryAddress:event.target.value});
  }
  handleChangeContributeFundId(event)  {
    this.setState({fundId:event.target.value});
  }
  handleChangeContributeAmount(event)  {
    this.setState({contributionAmount:event.target.value});
  }
  handleChangefundId(event){
    this.setState({fundId:event.target.value})
  }
  
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    var listItems = this.state.listOfFunds,
    MakeItem = function(X){
      return <option>{X}</option>;
    };
    return (
      <div className="App">
        <h1>Create new Fund</h1>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text"  value={this.state.value} onChange={this.handleChangeName.bind(this)} />
        </label>
        <label>
          Fund HardCap:
          <input type="number" value={this.state.value} onChange={this.handleChangeHardCap.bind(this)} />
        </label>
        <label>
          Benefitiary Address:
          <input type="text" value={this.state.value} onChange={this.handleChangeBenefitiaryAddress.bind(this)} />
        </label>
        <button onClick={this.handleClickNewFund.bind(this)}>Create New Fund</button> 

      </form>
     


        <p>Click create new fund to call Contract</p>
        <div>Fund created with Id :  {this.state.createdFundId}</div>
        <h2>Get Fund details</h2>
        <p>
          If you know your fund id , go ahead and contrbribute!! 
          or Get your fund Id using the button below

        </p>
        <form onSubmit={this.handleSubmit}>
        <label>
         
          <div>  Enter a fundId less than or equal to this number see details: {this.state.noOfFunds}</div>
          <input type="text" value={this.state.value} onChange={this.handleChangefundId.bind(this)} />

          <button onClick={this.handleClickGetFundDetails.bind(this)}>Get fund details </button> 

        </label>
        <div>Fund Name :  {this.state.getFundname}</div>
        <div>Fund HardCap :  {this.state.getFundHardCap}</div>
        <div>Fund Balance :  {this.state.getFundBalance}</div>
        <div>Fund Benefitiary :  {this.state.getFundBenefitiaryAddress}</div>

        <label>
          Enter an amount to contribute :
          <input type="number" value={this.state.value} onChange={this.handleChangeContributeAmount.bind(this)} />
          Enter a fund Id:
          <input type="text" value={this.state.value} onChange={this.handleChangeContributeFundId.bind(this)} />
      
        </label>   
        <button onClick={this.handleClickContribute.bind(this)}>Contribute </button> 

         </form>
  
        
      </div>
    );
  }
  
}

export default App;
