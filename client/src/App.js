import React, { Component } from "react";
import FundFactoryContract from "./contracts/FundFactory.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { fundGoal: 0, web3: null, accounts: null, contract: null };

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
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
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
    await contract.methods.createNewFund("cleveland",1000,accounts[0]).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.fetchFundDetails(0).call();

    // Update state with the result.
    this.setState({ fundGoal: response[1] });
  };
  handleClick(event){

  }
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Create new Fund</h1>
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Fund HardCap:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <label>
          Benefitiary Address:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <button onClick={this.handleClick.bind(this)}>Create New Fund</button> 

      </form>
     


        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <form onSubmit={this.handleSubmit}>
        <label>
          Pick a fund to see details :
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
          <button onClick={this.handleClick.bind(this)}>Get fund details </button> 

        </label>

        <label>
          Enter an amount to contribute :
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>   
        <button onClick={this.handleClick.bind(this)}>Contribute </button> 

         </form>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        
        <div>The fund hardcap is: {this.state.fundGoal}</div>
      </div>
    );
  }
}

export default App;
