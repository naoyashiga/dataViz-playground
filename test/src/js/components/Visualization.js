import config from '../config';
import Circle from './Circle';

export default class Visualization {
  constructor(cb) {
    const _this = this;
    this.svg = this.createViz();
    this.objects = [];
    this.svg.on('mousedown', function () {
      const mouseCoordinates = d3.mouse(this);
      // _this.addCircle(mouseCoordinates);
    });

    this.scatterPlot();

    // Callback onLoaded
    cb();
  }

  scatterPlot() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var x = d3.scale.linear()
        .domain([70, 120])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([70, 120])
        .range([height, 0]);

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


      this.svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
            .append("text")
              .attr("class", "label")
              .attr("x", width)
              .attr("y", -6)
              .style("text-anchor", "end")
              .text("Bust (cm)");

      this.svg.append("g")
              .attr("class", "y axis")
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
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight);
  }
}
