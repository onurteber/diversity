<template>
  <div>
    <b-row class="b-row">
      <b-col cols="8" md="5" sm="14" class="b-col">
        <div class="card">
          <div class="card-body" style="align-items: center;">
            <h5 class="card-title">Gender</h5>
            <div class="card-text">
              <p class="card-circle-prog" id="gander"></p>
            </div>
          </div>
        </div>
      </b-col>
      <b-col cols="8" md="5" sm="14" class="b-col">
        <div class="card">
          <div class="card-body" style="align-items: center;">
            <h5 class="card-title">Ethnicity</h5>
            <p class="card-circle-prog" id="ethnicity"></p>
          </div>
        </div>
      </b-col>
    </b-row>
    <!--
    <b-row class="b-row">
      <b-col cols="8" md="5" sm="12" class="b-col">
        <div class="card">
          <div class="card-body" style="align-items: center;">
            <h5 class="card-title">Non-Native English Speaker</h5>
            <p class="card-circle-prog" id="mothertongue"></p>
          </div>
        </div>
      </b-col>
      <b-col cols="8" md="5" sm="12" class="b-col">
        <div class="card">
          <div class="card-body" style="align-items: center;">
            <h5 class="card-title">Served in the Military</h5>
            <p class="card-circle-prog" id="military"></p>
          </div>
        </div>
      </b-col>
    </b-row>-->
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "RectangleCard",
  props: ["test", "recordTotalCount"],
  methods: {
    buildProg() {
      console.log(" test : " + this.test);
      for (let i = 0; i < this.test.length; i++) {
        this.createReac(this.test[i], this.recordTotalCount);
      }

      //
    },
    createReac(data2, genderTypeTotalCount) {
      console.log(data2[1]);
      var data = data2[1];
      //sort bars based on value
      data = data.sort(function(a, b) {
        return d3.ascending(a.value, b.value);
      });

      //set up svg using margin conventions - we'll need plenty of room on the left for labels
      var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 127
      };

      var width = 250,
        height = 180;
      console.log(data2[0]);
      var svg = d3
        .select("#" + data2[0])
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "svg-prog")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x = d3.scale
        .linear()
        .range([0, width])
        .domain([
          0,
          d3.max(data, function(d) {
            return d.value;
          })
        ]);

      var y = d3.scale
        .ordinal()
        .rangeRoundBands([height, 0], 0.1)
        .domain(
          data.map(function(d) {
            return d.type;
          })
        );

      //make y axis to show bar names
      var yAxis = d3.svg
        .axis()
        .scale(y)
        //no tick marks
        .tickSize(0)
        .orient("left");

      var gy = svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis);

      var bars = svg
        .selectAll(".bar")
        .data(data)
        .enter()
        .append("g");

      //append rects
      bars
        .append("rect")
        .attr("class", "bar")
        .attr("y", function(d) {
          return y(d.type);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function(d) {
          return x((d.value * 2) / 3);
        });

      //add a value label to the right of each bar
      bars
        .append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function(d) {
          return y(d.type) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function(d) {
          return (x(d.value) * 2) / 3 + 3;
        })
        .text(function(d) {
          return d.value;
        });

      bars
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`);
    }
  },
  mounted() {
    setTimeout(() => {
      this.buildProg();
    }, 1000);
  }
};
</script>

<style >
.b-row {
  padding-left: 15px;
  background-color: #ecf0f5;
}

.b-col {
  padding-top: 15px;
}

.bar {
  fill: #5f89ad;
}

.axis {
  font-size: 13px;
}

.axis path,
.axis line {
  fill: none;
  display: none;
}

.label {
  font-size: 13px;
}

.h4,
.h5,
.h6,
h4,
h5,
h6 {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-top: 10px;
}

.card {
  background-color: #fff;
}

.card-circle-prog {
  text-align: center;
  position: relative;
  min-height: 155px;
}

.card-desc {
  margin: 0 0 10px;
  padding: 5px;
}
</style>
