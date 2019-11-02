# Distribution Algorithm for Digital Assets 

This project has as main goal exploring an Ethereum Application to execute multiple in-series accounting/statement processes simultaneously across trustless networks, while maintaining privacy for users. The system is conceived as a ledger of transactions that1 retrieves payments distributed by Smart Contracts. 

HYPERLEDGER COMPOSER was the implemented official framework for development over the HYPERLEDGER FABRIC. 
More information: https://hyperledger.github.io/composer/index.html. Hyperledger uses the chaincode, retrieved by an SDK of NodeJs that HYPERLEDGER COMPOSER HAS to use languages like javascript and speed up the development. All the versions of the chaincode, BND, queries and other components are stored in the inmutable logs of the docker instances(peers of the blockchain). See more information: (https://hyperledger-fabric.readthedocs.io/en/release/). 

For developer guidance, the project has the main following development important files:

-The Business Network definition(BND) which shows all the data modeling of the business model: assets, participants , smart contracts. This file can be imported or exported to interact with other Hyperledger business networks(folder: ).

-The server to connect the endpoints(a bridge of communication between the front end and the endpoints that communicate directly with the blockchain Hyperledger Fabric)(Folder: ).

-The chaincode(smart contracts) are files that define several actions over the blockchain. For example: the distribution of the shares each participant gets,the creation of assets, participants, and transactions, complex logic processes such as queries for audit searches(Folder: ).

-The front end developed in Ionic Framework based on Angular2 for hybrid mobile and web development


# Structure of the Project
D3-react: This fodler is a small app in React for showing the distribution tree diagrams with d3 in react environment
fabric-dev-dev-servers: this folders contains an instance of a hyperledger fabric blokchain to initialize
ionic-front-end: this folder contains a front end developed for a company that reuqired the system and it uses ionic framework from angular
hyperledger-composer-node-server-hyperstate: this folder 
ethereum-node-server: this is the replication of the algorithm of hyperledger composer research but more simple and in ethereum

