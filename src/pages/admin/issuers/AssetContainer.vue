<template>
  <div class="container">
    <div class="card">
      <div class="imgBx">
        <!-- <img src="../../../assets/crypto_asset.png" /> -->
        <h1>{{asset.CryptoAssetSymbol}}</h1>
      </div>
      <div class="contentBx">
        <h2>{{ asset.CryptoAssetName }}</h2>
        <div class="size">
          <h3>{{ asset.CryptoAssetType }}</h3>
        </div>
        <div class="color">
          <h3>Total Assets :</h3>
          <span>{{ asset.CryptoAssetTotalSupply }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetContainer",
  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

* {
  font-family: "Poppins", sans-serif;
}

.container {
  position: relative;
}

.container .card {
  position: relative;
  width: 320px;
  height: 250px;
  background: linear-gradient(179.96deg, #144FC1 0.03%, #000000 99.97%);
  border-radius: 20px;
  overflow: hidden;
}

.container .card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  clip-path: circle(150px at 80% 20%);
  transition: 0.5s ease-in-out;
}

.container .card:hover:before {
  clip-path: circle(280px at 50% -50%);
}

.container .card:after {
  content: "Asset";
  position: absolute;
  top: 40%;
  left: -6%;
  font-size: 5em;
  font-weight: 800;
  font-style: italic;
  color: rgba(255, 255, 25, 0.05);
}

.container .card .imgBx {
  position: absolute;
  top: 50%;
  transform: translateY(-70%) rotate(45deg);
  /* z-index: 10000; */
  width: 100%;
  height: 220px;
  transition: 0.5s;
}

.container .card:hover .imgBx {
  transform: translate(-20%, -50%) rotate(0deg);
}

.container .card .imgBx h1 {
  position: absolute;
  top: 30%;
  left: 70%;
  font-size: 4em;
  transform: translate(-50%, -50%) rotate(0deg);
  width: 120px;
}


.container .card .contentBx {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  transition: 1s;
  /* z-index: 10; */
}

.container .card:hover .contentBx {
  height: 90px;
}

.container .card .contentBx h2 {
  position: relative;
  font-weight: 600;
  letter-spacing: 1px;
  color: #fff;
  margin: 0;
}

.container .card .contentBx .size,
.container .card .contentBx .color {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
  padding-top: 0;
  padding-bottom: 0;
}

.container .card:hover .contentBx .size {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

.container .card:hover .contentBx .color {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.6s;
}

.container .card .contentBx .size h3,
.container .card .contentBx .color h3 {
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-right: 10px;
}
.container .card .contentBx .color span {
  color: #fff;
}
.card {
  box-shadow: none;
}
</style>
