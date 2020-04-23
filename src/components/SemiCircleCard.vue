<template>
  <div>
    <b-row class="b-row">
      <b-col cols="8" md="5" sm="12" class="b-col">
        <div class="card">
          <div class="card-body" style="align-items: center;">
            <h5 class="card-title">Has a Disability</h5>
            <p class="card-circle-prog" id="disability"></p>
            <p
              class="card-desc"
            >Disabilities can include chronic illness or pain, neurological disorders, or any other differing abilities.</p>
          </div>
        </div>
      </b-col>
      <b-col cols="8" md="5" sm="12" class="b-col">
        <div class="card">
          <div class="card-body" style="align-items: center;">
            <h5 class="card-title">LGBTQIA</h5>
            <p class="card-circle-prog" id="LGBTQIA"></p>
            <p
              class="card-desc"
            >The letters LGBTQIA refer to lesbian, gay, bisexual, transgender, queer or questioning, intersex, and asexual identities.</p>
          </div>
        </div>
      </b-col>
    </b-row>
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
    </b-row>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "SemiCircleCard",
  props: ["recordKeyValue", "recordTotalCount"],
  methods: {
    buildProg() {
      for (let i = 0; i < this.recordKeyValue.length; i++) {
        this.create(
          this.recordKeyValue[i][0],
          this.recordKeyValue[i][1],
          this.recordTotalCount
        );
      }

      //this.createReac(loadData.genderType, loadData.genderTypeTotalCount);
    },
    create(recordValue, recordCount, count) {
      var percent = (recordCount / count) * 100;
      var pie = d3.layout
        .pie()
        .value(function(d) {
          return d;
        })
        .sort(null);

      var w = 300,
        h = 300;

      var outerRadius = w / 2 - 50;
      var innerRadius = 55;

      var color = ["#ececec", "#7fda80", "#888888"];

      var colorOld = "#F00";
      var colorNew = "#0F0";

      var arc = d3.svg
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(Math.PI);

      var arcLine = d3.svg
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
      var svg = d3
        .select("#" + recordValue)
        .append("svg")
        .attr({
          width: w,
          height: h - 150,
          class: "circle"
        })
        .append("g")
        .attr({
          transform: "translate(" + w / 2 + "," + (h - 60) / 2 + ")"
        });

      var path = svg
        .append("path")
        .attr({
          d: arc,
          transform: "rotate(-90)"
        })
        .attr({
          "stroke-width": "1",
          stroke: "#666666"
        })
        .style({
          fill: color[0]
        });

      var pathForeground = svg
        .append("path")
        .datum({
          endAngle: 0
        })
        .style({
          fill: function(d, i) {
            return color[1];
          }
        });

      var middleCount = svg
        .append("text")
        .datum(0)
        .text(function(d) {
          return d;
        })
        .attr({
          class: "middleText",
          "text-anchor": "middle",
          dy: 0,
          dx: 5
        })
        .style({
          fill: d3.rgb("#000000"),
          "font-size": "23px",
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
          "text-anchor": "middle",
          "font-family": "Arial",
          "font-weight": "bold",
          "fill-opacity": "1"
        });

      var startWay = svg
        .append("text")
        .datum(0)
        .text(function(d) {
          return d;
        })
        .attr({
          class: "middleText",
          "text-anchor": "middle",
          dy: 20,
          dx: -78
        })
        .style({
          fill: d3.rgb("#000000"),
          "font-size": "15px",
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
          "text-anchor": "middle",
          "font-family": "Arial",
          "fill-opacity": "0.3"
        });

      var endWay = svg
        .append("text")
        .datum(0)
        .text(function(d) {
          return d;
        })
        .attr({
          class: "middleText",
          "text-anchor": "middle",
          dy: 20,
          dx: 78
        })
        .style({
          fill: d3.rgb("#000000"),
          "font-size": "15px",
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
          "text-anchor": "middle",
          "font-family": "Arial",
          "fill-opacity": "0.3"
        });

      var oldValue = 0;

      var arcTween = function(transition, newValue, oldValue) {
        transition.attrTween("d", function(d) {
          arcLine.startAngle(-Math.PI / 2);
          var interpolate = d3.interpolate(
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * (newValue / 100)
          );
          var interpolateCount = d3.interpolate(oldValue, newValue);
          return function(t) {
            d.endAngle = interpolate(t);
            middleCount.text(
              percent.toString().length > 2
                ? percent.toFixed(2) + "%"
                : percent + "%"
            );
            startWay.text("0");
            endWay.text("100");
            return arcLine(d);
          };
        });
      };

      pathForeground
        .transition()
        .duration(1000)
        .ease("cubic")
        .call(arcTween, percent, oldValue);
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
