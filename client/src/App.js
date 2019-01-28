import React, {
	Component
} from "react";
import FundFactoryContract from "./contracts/FundFactory.json";
import getWeb3 from "./utils/getWeb3";
import "./App.css";

class App extends Component {
	state = {
		name: '',
		createdFundId: '',
		fundId: 0,
		fundHardCap: 0,
		getFundname: '',
		getFundBalance: '',
		getFundHardCap: '',
		getFundBenefitiaryAddress: null,
		benefitiaryAddress: null,
		noOfFunds: 0,
    fundBalance: 0,
    fundState:'',
		listSelectionFundId: 0,
		contributionAmount: 0,
		items: [],
		fundGoal: 0,
		web3: null,
		accounts: null,
		contract: null
	};


	componentDidMount = async() => {
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
				deployedNetwork.address
			);

      /* Set web3, accounts, and contract to the state, and then proceed to get current number of funds 
       by interacting with the contract's methods.*/
			this.setState({
				web3,
				accounts,
				contract: instance
			}, this.runFundCount);
		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};
  /** @dev function to load the total number of funds in the blockchain
   *sets the state variable noOfFunds 
   **/
	runFundCount = async() => {
		//console.log("runFundCount called");
		const {
			accounts,
			contract
		} = this.state;
	
		const response = await contract.methods.getNoOfFunds().call();
		this.setState({
			noOfFunds: response[0]
		})
	};

  /** @dev on button click call the contract function createNewFund to create a new fund
   *resets the state variable noOfFunds 
   **/
	handleClickNewFund = async(event) => {
		event.preventDefault();
		console.log(this.state.name);
		console.log(this.state.fundHardCap);
		console.log(this.state.benefitiaryAddress);
		const {
			accounts,
			contract
		} = this.state;
		// calls the function createNewFund.
		await contract.methods.createNewFund(this.state.name, this.state.fundHardCap,
			this.state.benefitiaryAddress).send({
			from: accounts[0]
		});
		this.runFundCount();//reset the state variable noOfFunds
	}
  /** @dev on button click call the contract function contribute to contribute a fund
   **/
  handleClickContribute = async(event) => {
		event.preventDefault();
		console.log('this is contribute button');
		const {
			accounts,
			contract
		} = this.state;

		// function call 
		await contract.methods.contributeToFund(this.state.fundId).send({
			from: accounts[0],
			value: (this.state.contributionAmount * 1000000000000000000)
		});
  }
  /** @dev on button click call the contract function getFunddetails
   **/
	handleClickGetFundDetails = async(event) => {
		event.preventDefault();
		console.log(this.state.fundId);
		const {
			accounts,
			contract
		} = this.state;
		const response = await contract.methods.fetchFundDetails(this.state.fundId).call();
  	console.log(response[0]);
		console.log(response[2]);
  	this.setState({
			getFundname: response[0],
			getFundHardCap: response[1],
			getFundBalance: response[2],
     	    getFundBenefitiaryAddress: response[3]      		});

	}
  /** @dev onChange function for input box name
   **/
	handleChangeName(event) {
		this.setState({
			name: event.target.value
		});
  }
  /** @dev onChange function for input box hardcap limit
   **/
	handleChangeHardCap(event) {
		this.setState({
			fundHardCap: event.target.value
		});
  }
  /** @dev onChange function for input box Benefitiary address
   **/
	handleChangeBenefitiaryAddress(event) {
		this.setState({
			benefitiaryAddress: event.target.value
		});
  }
  /** @dev onChange function for input box fundId
   **/
	handleChangeContributeFundId(event) {
		this.setState({
			fundId: event.target.value
		});
  }
  /** @dev onChange function for input box Contribute Amount
   **/
	handleChangeContributeAmount(event) {
		this.setState({
			contributionAmount: event.target.value
		});
  }
  /** @dev onChange function for reseting state variable fundId
   **/
	handleChangefundId(event) {
		this.setState({
			fundId: event.target.value
		})
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
      <h1>Task 1: Create  a new Fund</h1>
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
      <div>  No of Funds available: {this.state.noOfFunds}</div>

      <h1>Task 2: Get Fund details</h1>
      <p>
         If you know your fund id , go ahead and contribute!! 
         or Confirm your fund id using the button below
      </p>
      <form onSubmit={this.handleSubmit}>
         <label>
            <p>
               Enter a fundId greater than 0 but less than No of funds :{this.state.noOfFunds} (if 0 , please create atleast one fund) to get more details details
            </p>
            <input type="number" value={this.state.value} onChange={this.handleChangefundId.bind(this)} />
            <button onClick={this.handleClickGetFundDetails.bind(this)}>Get fund details </button> 
         </label>
         <div>Fund Name :  {this.state.getFundname}</div>
         <div>Fund HardCap :  {this.state.getFundHardCap}</div>
         <div>Fund Benefitiary :  {this.state.getFundBenefitiaryAddress}</div>
         <h1>Task 3: Contribute to a fund</h1>

         <label>
         Enter a fund Id:
         <input type="number" value={this.state.value} onChange={this.handleChangeContributeFundId.bind(this)} />
       Enter the number of ethers you want to contribute:
         <input type="number" value={this.state.value} onChange={this.handleChangeContributeAmount.bind(this)} />
            </label>   
         <button onClick={this.handleClickContribute.bind(this)}>Contribute </button> 
      </form>
      
   </div>
    );
  }
  
}

export default App;
