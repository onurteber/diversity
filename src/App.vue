<template>
<div class="wrapper">
  <nav class="navbar navbar-dark bg-primarys">
    <p class="navbar-brand h1">Diversity at Buffer</p>
  </nav>

  <body style="min-width: 100;">
    <SemiCircleCard :recordTotalCount="recordTotalCount" :recordKeyValue="recordKeyValue" />
    <RectangleCard :recordTotalCount="recordTotalCount" :test="test" />
  </body>
</div>
</template>

<script>
import SemiCircleCard from "./components/SemiCircleCard.vue";
import RectangleCard from "./components/RectangleCard.vue";

export default {
  name: "App",
  components: {
    SemiCircleCard,
    RectangleCard
  },
  data() {
    return {
      recordTotalCount: 0,
      recordKeyValue: {},
      test: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await fetch("http://localhost:3000/getSemiCircleProp")
        .then(response => response.json())
        .then(response => {
          this.recordTotalCount = response.recordTotalCount;
          this.recordKeyValue = response.recordKeyValue;
          this.test = response.test;
          console.log(response);
          //this.createReac(data.genderType, data.genderTypeTotalCount);
        });
    },
    create() {},
    createReac() {}
  }
};
</script>

<style>
@media (max-width: 680px) {
  .navbar-brand {
    float: initial !important;
    margin-top: 15px !important;
    font-size: 24px !important;
  }
  .navbar {
    text-align: center;
    position: relative;
    min-height: 50px;
    margin-bottom: 0px !important;
    border: 1px solid transparent;
  }
}
.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0 !important;
}
.header {
  height: 40px;
  color: #555;
  line-height: 55px;
  font-weight: 400;
  font-size: 18px;
  padding-left: 10px;
}

.navbar-brand {
  float: left;
  height: 30px;
  padding: 0px;
  padding-left: 20px;
  font-size: 18px;
  line-height: 20px;
}

.bg-primarys {
  color: #fff !important;
  background-color: #337ab7 !important;
}

.navbar {
  position: relative;
  min-height: 50px;
  margin-bottom: 0px !important;
  border: 1px solid transparent;
}
.wrapper {
  background-color: #ecf0f5;
  min-height: 100%;
  z-index: 800;
}
@media (min-width: 1200px) {
  .container {
    width: 95%;
  }
}

@media (min-width: 992px) {
  .container {
    width: 95%;
  }
}
@media (min-width: 768px) {
  .container {
    width: 95%;
  }
}
</style>
