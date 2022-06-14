<template>
  <div>
    <b>SmartContract TrustRegistry </b> <br />
    <b>ownerPA_name: </b>{{ ownerPA_name }} <br />
    <b>ownerPA_PK: </b>{{ ownerPA_PK }} <br />
  </div>  
</template>

<script>
import Web3 from "web3";

export default {
  name: "testPage",
  data() {
    return { ownerPA_name: "" };
  },

  async created() {
    try {
      const jsonInterface = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ownerPA_PK",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_ownerPA_Name",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuerAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_issuerID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ownerPA_PK",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_competentAuth",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_offeror",
				"type": "bool"
			},
			{
				"internalType": "enum ERC1960TrustRegistry.mktInfra_type",
				"name": "_marketInfraType",
				"type": "uint8"
			}
		],
		"name": "EIP160AddIssuer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuerAddress",
				"type": "address"
			}
		],
		"name": "disableIssuer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuerAddress",
				"type": "address"
			}
		],
		"name": "enableIssuer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "issuingInstitution",
		"outputs": [
			{
				"internalType": "string",
				"name": "issuerID",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "offeror",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "issuerPK",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issuerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "competentAuth",
				"type": "string"
			},
			{
				"internalType": "enum ERC1960TrustRegistry.mktInfra_type",
				"name": "marketInfrastructureType",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerPA_Name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ownerPA_PK",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
      ];
      console.log("created");
      const web3 = new Web3("http://51.38.226.91:8545");
      const myContract = new web3.eth.Contract(
        jsonInterface,
        "0x4118dEf0C4b335f6B0acF6fE1743c0B24F48ad94"
      ); // const owner = myContract.owner.call();
      // this.owner = owner;
      console.log("MyContract: ", myContract);
      this.ownerPA_name = await myContract.methods.ownerPA_Name().call();
      this.ownerPA_PK = String(await myContract.methods.ownerPA_PK().call());
      console.log(this.ownerPA_name);
      console.log(this.ownerPA_PK);
    } catch (ex) {
      console.log(ex);
    }
  },
};
</script>

