
<template>
  <div>
    <b>SmartContract Issuer </b> <br />
    <b>institutionName: </b>{{ institutionName }} <br />
  </div>
</template>

<script>
import Web3 from "web3";

export default {
  name: "testPage",
  data() {
    // eslint-disable-next-line @typescript-eslint/camelcase
    return { ownerPA_name: "", institutionName: "" };
  },

  async created() {
    try {
      const jsonInterface = [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "_from",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "_oldWhitepaperHash",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string",
              name: "_newWhitepaperHash",
              type: "string",
            },
          ],
          name: "UpdatedWhitepaper",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_tokenName",
              type: "string",
            },
            {
              internalType: "address",
              name: "_tokenDAPP",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_initialAmount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_tokenSymbol",
              type: "string",
            },
            {
              internalType: "enum ERC1960Issuer.crypto_type",
              name: "_ctype",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "_whitePaperHash",
              type: "string",
            },
            {
              internalType: "bool",
              name: "_EUcurrency",
              type: "bool",
            },
          ],
          name: "addCryptoAssetInfo",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_claimedCA",
              type: "string",
            },
            {
              internalType: "string",
              name: "_userPK",
              type: "string",
            },
            {
              internalType: "string",
              name: "_details",
              type: "string",
            },
          ],
          name: "addNewClaim",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_claimedWR",
              type: "string",
            },
            {
              internalType: "string",
              name: "_userPK",
              type: "string",
            },
            {
              internalType: "string",
              name: "_details",
              type: "string",
            },
          ],
          name: "addNewWithdrawalRequest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_tokenDAPP",
              type: "address",
            },
          ],
          name: "delCryptoAssetInfo",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_userPK",
              type: "string",
            },
          ],
          name: "deleteClaim",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_userPK",
              type: "string",
            },
          ],
          name: "deleteWithdrawalRequest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_userPK",
              type: "string",
            },
            {
              internalType: "bool",
              name: "newStatus",
              type: "bool",
            },
          ],
          name: "updateClaim",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_userPK",
              type: "string",
            },
            {
              internalType: "bool",
              name: "newStatus",
              type: "bool",
            },
          ],
          name: "updateWithdrawalRequest",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "newWhitePaperHash",
              type: "string",
            },
            {
              internalType: "address",
              name: "_tokenDAPP",
              type: "address",
            },
          ],
          name: "updatewWhitepaperHash",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_issuer",
              type: "address",
            },
            {
              internalType: "string",
              name: "_issuer_PK",
              type: "string",
            },
            {
              internalType: "string",
              name: "_institutionName",
              type: "string",
            },
            {
              internalType: "string",
              name: "_institutionID",
              type: "string",
            },
            {
              internalType: "string",
              name: "_institutionCountry",
              type: "string",
            },
            {
              internalType: "string",
              name: "_institutionLEI",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "claims",
          outputs: [
            {
              internalType: "string",
              name: "claimedCA",
              type: "string",
            },
            {
              internalType: "string",
              name: "userPK",
              type: "string",
            },
            {
              internalType: "bool",
              name: "active",
              type: "bool",
            },
            {
              internalType: "string",
              name: "details",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "creator",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "institutionCountry",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "institutionID",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "institutionLEI",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "institutionName",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "issuer",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "issuer_PK",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "tokensIssued",
          outputs: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "enum ERC1960Issuer.crypto_type",
              name: "token_type",
              type: "uint8",
            },
            {
              internalType: "string",
              name: "symbol",
              type: "string",
            },
            {
              internalType: "bool",
              name: "active",
              type: "bool",
            },
            {
              internalType: "string",
              name: "whitePaperHash",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "totalSupply",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "EUcurrency",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalTokens",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "trackClaims",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "trackWDR",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "wRequests",
          outputs: [
            {
              internalType: "string",
              name: "claimedWR",
              type: "string",
            },
            {
              internalType: "string",
              name: "userPK",
              type: "string",
            },
            {
              internalType: "bool",
              name: "active",
              type: "bool",
            },
            {
              internalType: "string",
              name: "details",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "timestamp",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];
      console.log("created");
      const web3 = new Web3("http://51.38.226.91:8545");
      const myContract = new web3.eth.Contract(
        jsonInterface,
        "0xd830b9D8e890D290be7e7365fE3D7bbDD94cF7f9"
        // "0x9fB0f7088b660d289c7404cb27Ff140999384D36"
        // "0xd830b9D8e890D290be7e7365fE3D7bbDD94cF7f9"
      ); // const owner = myContract.owner.call();
      // this.owner = owner;
      console.log("MyContract: ", myContract);
      this.institutionName = await myContract.methods.institutionName().call();
      console.log(this.institutionName);
    } catch (ex) {
      console.log(ex);
    }
  },

  /*
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
      this.ownerPA_PK = await myContract.methods.ownerPA_PK().call();
      this.issuingInstitution = await myContract.methods.issuingInstitution("0x3d7201049aa892B89aDF9b492eEd0680148b3ca9").call();
      console.log(this.ownerPA_name);
      console.log(this.ownerPA_PK);
      console.log(this.issuingInstitution);
    } catch (ex) {
      console.log(ex);
    }
  },*/
};
</script>

