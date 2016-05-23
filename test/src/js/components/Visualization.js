import config from '../config';
import Circle from './Circle';

export default class Visualization {
  constructor(cb) {
    const _this = this;

    this.margin = {top: 50, right: 0, bottom: 0, left: 50};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;
    this.svg = this.createViz();
    this.scatterPlot();

    // Callback onLoaded
    cb();
  }

  scatterPlot() {

    var x = d3.scale.linear()
        .domain([0, 120])
        .range([0, this.width - 30]);

    var y = d3.scale.linear()
        .domain([0, 120])
        .range([this.height - 100, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    d3.json("datasets/data.json", (error, data) => {
      console.log(data);

      // data.result.actress.forEach(function(d) {
      //   d.sepalLength = +d.sepalLength;
      //   d.sepalWidth = +d.sepalWidth;
      // });
      //
      // x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
      // y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();


      var xAxisTranslate = this.height - this.margin.bottom - 100;
      this.svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + xAxisTranslate + ")")
              // .attr("transform", "translate(0," + -this.margin.bottom + ")")
              .call(xAxis)
            .append("text")
              .attr("class", "label")
              .attr("x", this.width - 50)
              .attr("y", -6)
              .style("text-anchor", "end")
              .text("Bust (cm)");

      this.svg.append("g")
              .attr("class", "y axis")
              // .attr("transform", "translate(0," + -this.margin.bottom + ")")
              .call(yAxis)
            .append("text")
              .attr("class", "label")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Hip (cm)")

      this.svg.selectAll(".dot")
              .data(data.result.actress)
            .enter().append("circle")
              .attr("class", "dot")
              .attr("r", 3.5)
              .attr("cx", function(d) {
                console.log(x(d.bust));
                return x(d.bust); })
              .attr("cy", function(d) { return y(d.hip); });
    });


  }

  createViz() {
    return d3.select('body')
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append("g")
        // .attr("transform", "translate(" + this.margin.left + ",0)");
        .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ")");
  }
}
