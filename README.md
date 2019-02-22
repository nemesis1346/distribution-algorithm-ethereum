# Distribution Algorithm for Digital Assets 

This project has as main goal exploring the application of Hyperledger to execute multiple in-series accounting/statement processes simultaneously across a trustless network, while maintaining privacy for users. The system is conceived as a ledger of transactions to retrieve payments distributed by agreements. For more information about the features of the system in the business side, look for the reference in the official documentation.

HYPERLEDGER COMPOSER was the implemented official framework for development over the HYPERLEDGER FABRIC. 
More information: https://hyperledger.github.io/composer/index.html. Hyperledger uses the chaincode, retrieved by an SDK of NodeJs that HYPERLEDGER COMPOSER HAS to use languages like javascript and speed up the development. All the versions of the chaincode, BND, queries and other components are stored in the inmutable logs of the docker instances(peers of the blockchain). See more information: (https://hyperledger-fabric.readthedocs.io/en/release/). 

For developer guidance, the project has the main following development important files:

-The Business Network definition(BND) which shows all the data modeling of the business model: assets, participants , smart contracts. This file can be imported or exported to interact with other Hyperledger business networks(folder: ).

-The server to connect the endpoints(a bridge of communication between the front end and the endpoints that communicate directly with the blockchain Hyperledger Fabric)(Folder: ).

-The chaincode(smart contracts) are files that define several actions over the blockchain. For example: the distribution of the shares each participant gets,the creation of assets, participants, and transactions, complex logic processes such as queries for audit searches(Folder: ).

-The front end developed in Ionic Framework based on Angular2 for hybrid mobile and web development


# STRUCTURE OF THE PROJECT
D3-react: This fodler is a small app in React for showing the distribution tree diagrams with d3 in react environment
fabric-dev-dev-servers: this folders contains an instance of a hyperledger fabric blokchain to initialize
ionic-front-end: this folder contains a front end developed for a company that reuqired the system and it uses ionic framework from angular
hyperledger-composer-node-server-hyperstate: this folder 
ethereum-node-server: this is the replication of the algorithm of hyperledger composer research but more simple and in ethereum

## Tutorial for the Initial Setup of Hyperstate

This tutorial Is for the purpose of the developers to show the steps to set the system up and running. We assume that a virtual machine either on Google Cloud or Amazon Services or any other provider was created. The specifications of the machine are fixed. It means that according with Hyperledger Composer Framework there are some version dependencies we must acknowledge. 

The following link gives some specific requirements of the versions of the technologies Hyperledger Composer neds:
https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html

Overall, we must mainly be careful with the version of the Linux virtual machine in our provider(Either Google, Amazon or any other provider).

We chose Google for the prices but any machine with the following specifications should work:
Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit)

For the sake of this tutorial we created a virtual machine of the following characteristics in Google Cloud: 4 vCPUs, 15 GB memory with Ubuntu 16.04. 
Once the instance in Google Cloud is created, be sure that there is an static IP associated with that instance(Those settings depend of the provider, in the case of Google, the option External IPs can help).

*Important: Be sure that the firewall rules(OPENING FIREWALL) let the virtual machine static IP to have access to incoming requests. Some detailed information can be found in this blog:
Steps: 
-Go to Firewall rules and add new rule. 
-Important: allow all ports , add tag ‘hyperstate’ and 0.0.0.0/0 as source IP ranges.
-Finally add the tag ‘hyperstate’ in the settings of the virtual machine.
https://medium.com/google-cloud/graphical-user-interface-gui-for-google-compute-engine-instance-78fccda09e5c
https://medium.com/google-cloud/linux-gui-on-the-google-cloud-platform-800719ab27c5

Now we assume the firewall is opened and the following steps must be executed after the user has successfully connected with the virtual machine instance and has a terminal to communicate with the instance in Linux commands. 

*Warning(Running Screens). Be aware that previous running screens could be still on process. The following command shows current opened screens:

screen -ls

To continue or resume a current opened screen, do the following command:

screen -R name_screen

Additionally, if we want to detached from the screen without killing the process in windows the shortcut is Ctrl + A + D

### First Step: Clone Hyperstate project in the virtual machine with linux commands assuming we all the specifications mentioned previously were met. The following command would do the job, is up to the developer choose the location of the download:

git clone https://gitlab.com/membran-canada/hyperledger-statements.git

### Second Step: Go to the folder of the project and then to the following folder: 

cd hyperledger-statements/hyperstate/commands

### Third Step: ‘commands’ folder has several bash script that can be executed in one single commands. This folder has most of the commands of the set up of the system. First of all we need to install the dependencies of third party software Hyperledger Composer needs. The following commands in the same folder  would do it(execute the next one when the previous is done):
 
sudo sh installExtraSoftware.sh
sudo ./prereqs-ubuntu.sh
sudo sh updateNpmPackages.sh

*Additional future improvements: To not run in problems of NodeJs packages, is suggested to install an specific nodejs version with the following commands:
## Using Ubuntu
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs


Although it implies that the prereqs-ubuntu.sh must be improved because currently it installs the latest nodejs version. Will be details to be updated in the future. 

### Fourth Step: We must be sure there is a session of the terminal of the virtual machines. Usually when we disconnect of the terminal when we close it, all the processes stop or are being destroyed. To prevent this from happening we must to start a terminal session with the command:

screen -S ‘name_session’

‘name_sessions’ can be anything, in our case because we are setting the server up running, we we will call it hyperstate_server so the: screen -S ‘hyperstate’

This command will keep the processes running even if the terminal is closed.
(*Warning: In case something fail, just kill the session, more information here https://stackoverflow.com/questions/1509677/kill-detached-screen-session).


### Fifth Step: Now that all the dependencies are installed we can initialize the Fabric and then the server. Some of the processes specified in this file are the reset and initialization of the network, the installation of our private Business Network Definition(Data Model) and finally the execution of the server developed by us. 

sudo ./deployCardFirstTime.sh

*Special note: In case the server suffers a timeout, or some error, its possible that the problem could be fixed by restarting the server in the folder /hyperstate/middleware, with the command node gate.js

### Sixth Step(Optional): Run unit test to store some data.

At the beginning we need at least and Administrator account and a couple of traders(optional). 
In the hyperstate/middleware/ we can use ‘node serverUnitTest.js’ to run some requests directly by inserting an admin user with admin password. This step should be executed when the server is already listening.

If all the steps were followed successfully, the blockchain should be listening through the nodejs server we created and we can make requests from the client(user interface in Ionic Framework). 

### Seventh Step: is important to mention that is recommended to open another terminal in the Google Console because the first one is already running the server, a second terminal is suggested to be opened. Also, we must be sure that this new terminal will be working after the user closes it. Therefore, as in the fourth step, we execute a new session:

screen -S ‘front_end’

## Eighth Step: Run the Front End Interface 
The user interface is on the folder:

cd hyperledger-statements/front-end

Now we need to install the node packages with the following command:
sudo npm install --unsafe-perm

To start it front end service, just execute the following command within this folder.

ionic serve

(*Warning of IP addresses: The ionic framework is pointing to an specific IP, that IP can change by editing the following file: hyperledger-statements/front-end/src/resources/constants.ts)

*Warning in Front End(Ionic) compilation: It's possible that a very recent nodejs version(that does not support Ionic latest version) could had been installed by accident. In case we get errors with node-sass and the environment, the reason could be that conflict of versions. To solve that problem, we should change nodejs version in to an stable version such as v8(See the project version dependencies at the bottom of this document).
The following commands and links can be helpful if we encounter those problems.  

-Go to front-end/ folder to start the fixation.

-Delete node_modules/ and package-lock.json with:
sudo rm -rf node_modules/
sudo rm -rf package-lock.json

-Deactivate nvm with the following command:
nvm deactivate

-Install previous version by installing and using ‘n’ package(more info in https://www.npmjs.com/package/n):
sudo npm i -g n
sudo n 8           *This command is to change the current version to a previous one(version 8 according with requirements)  

-Use yarn instead of npm(installation: https://yarnpkg.com/lang/en/docs/install/#debian-stable) for installing node packages:
sudo yarn install 

# Error Handling(This is specified in the report as well)

# Control of stable versions
Always be aware that some of the versions of the libraries must match as is showed because Hyperledger Project is in its realy stages and there are some problems when they not match because some of the Hyperledger Composer frameworks depend of specific library versions of the environment. 

Fabric Version hlfv12
NodeJs Version 8.10.4
Composer-Runtime 0.20.0
Composer-Cli 0.20.0
Npm Version 6.4.0
Node Sass 4.9.3

*NodeJs versions can be changed and handled with its commands, more information here:
https://stackoverflow.com/questions/7718313/how-to-change-to-an-older-version-of-node-js

*Tips: If getting errors of npm libraries. Install the following command either in /hyperstate or /front-end in order to install all lacking npm libraries. 

sudo npm install -unsafe-perm

From the official documentation for Hyperledger Composer(versions of frameworks):
The following are prerequisites for installing the required development tools:
Operating Systems: Ubuntu Linux 14.04 / 16.04 LTS (both 64-bit), or Mac OS 10.12
Docker Engine: Version 17.03 or higher
Docker-Compose: Version 1.8 or higher
Node: 8.9 or higher (note version 9 is not supported)
npm: v5.x
git: 2.9.x or higher
Python: 2.7.x
A code editor of your choice, we recommend VSCode.
Often there could be problems with broken libraries within nodejs, it's better to uninstall it and reinstall it. Some more info in the following link:
https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x
