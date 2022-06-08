<template>
  <b>Age: </b>{{ age }} <br />
  <b>Height: </b>{{ height }} <br />
  <b>Weight: </b>{{ weight }}
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import Web3 from "web3";

export default {
  data() {
    return { age: "", height: "", weight: "" };
  },

  async created() {
    const jsonInterface = [
      {
        inputs: [],
        name: "getAge",
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
        inputs: [],
        name: "getHeight",
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
        inputs: [],
        name: "getWeight",
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
            name: "x",
            type: "uint256",
          },
        ],
        name: "setAge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "y",
            type: "uint256",
          },
        ],
        name: "setHeight",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "z",
            type: "uint256",
          },
        ],
        name: "setWeight",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];

    const web3 = new Web3("http://5.28.41.146:9545");
    const myContract = new web3.eth.Contract(
      jsonInterface,
      "0x92ad979f7Fd9aff973b242A907D2e1f49AF50117"
    );

    // const owner = myContract.owner.call();
    // this.owner = owner;
    console.log("MyContract: ", myContract);
    this.age = await myContract.methods.getAge().call();
    this.height = await myContract.methods.getHeight().call();
    this.weight = await myContract.methods.getWeight().call();
    console.log(this.age);
    console.log(this.weight);
    console.log(this.height);
  },
};
</script>

<style>
</style>
