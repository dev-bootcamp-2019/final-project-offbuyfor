# final-project-offbuyfor

Please do not evaluate the project before Sunday Jan 27th end of the day EST time. As the project deadline has been extended by Course administration until then. 

I am going to be working and making changes until then.

# Fundraiser
A simple decentralised app simulating a crowd fundraiser. Funds can be created with name, target goal, balance/status management and define the beneifitiary address to which funds should be credited. The total number of funds available are shown in the user interface and users can enter a unique fund Id to get more details about that fund. If the user knows the unique fund Id they are interested in , they can contribute to the fund in ether. Successful reaching of target goal would change the fund status to closed after which the the user wont be able to contribute to that particular fund Id.

# Installation and Setup

### Truffle
Install truffle on your device as per the docs here: http://truffleframework.com/docs. This project requires truffle v5.0.0 or above.

### Ganache
Install and run Ganache. More information on installation found [here](npm install -g ganache-cli).
The project has been created and tested using ganache desktop app on port 7545. To change this port (i.e. if you are using ganache-cli) please go to ```truffle.js``` in the root folder and change the port number at ```port: 7545 ```. Make sure your Ganache accounts are up an running with available ETH balances.

### Metamask
Install the Metamask Google Chrome Browser extension from [here](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en) and follow instructions to set up accounts. Ensure accounts on Metamask are linked to the accounts running on Ganache and connected on the correct network.

### Test Dapp!
1. In your terminal window, navigate to project root folder and run ```truffle compile```.
2.  Once compilation is successful, run ```truffle migrate```.
3. Once migration is successful, run ```truffle test```.

### Launch Dapp!
Ensure Google Chrome is open and that your are signed into metamask, with your accounts matching your ganache accounts.(using the mnemoic)
1. In your terminal window, navigate to project root folder and run ```truffle compile```.
2.  Once compilation is successful, run ```truffle migrate```.
3. In the root folder, navigate to /client. From here on your command line, run ```npm install```. Then ```npm run start```. A new tab should open and you should see the following page running on ```localhost:3000```:


# Interacting with the Dapp

Once page is running on ```localhost:3000```. You would see a simple user interface. 
### Task 1: Create New Fund

1. If you are running it for the first time, You will have to create a new fund. Go to the User Interface area for "Create New fund". Enter 'Name', Fund hardcap, and Benefitiary Address ( in this case just paste one of the test accounts address, except your own account. 
2. Click Create New Fund button 
3. Metamask will be fired to confirm the transaction to create a new fund.
4. No of funds available will be updated
Once the transaction has successfully gone through and your bounty has been created, you can view it on your block/transaction log of your development blockchain.

### Task 2: Get Fund details
1. On line 2, it would show the number of funds available. You can enter any number from 0 to one less than total number of funds to get more details about that fund. If you just created a fund, you just need to enter 0(starting of fundId) and click "Get Fund Details" button.  The details will be shown below.

### Task 3: Contribute to a fund
1. If you know your fund id , enter it along with the amount in ether you want to contribute. 
2. Click contribute button 
3. clicking this will trigger another metamask modal, asking to confirm the transaction. Once the transaction succeeds, the contribution  amount will be transferred from your account to the benefitiary's account (determined during creation).

If metamask is having issues recognising your address, refresh the browser page.

## Future features
### List all the available funds in the user interface 
List all the available funds along with fund Id and name in a tabular form so that it is easy for the user to choose the id
