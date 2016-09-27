export default class Circle {
  constructor(parentNode, data, xRange, yRange) {

    var parseTime = d3.timeParse("%B %d, %Y");

    this.element = parentNode.selectAll(".node")
    .data(data)
    .enter().append("g")
    .append("circle")
    // .attr("cx", "0")
    .attr("cx", (d) => xRange(d.record))
    .attr("cy", (d) => yRange(parseTime(d.date)))
    .style("fill", (d) => "#000")
    .attr("r", 10);

    // this.element.transition()
    // .ease(d3.easeLinear)
    // .duration((d, i) => d.record * 1000)
    // .attr("cx", (d) => xRange(d.record));

    this.addHover();
  }

  addHover() {
    this.element.on("mouseover", this.mouseovered(true))
    .on("mouseout", this.mouseovered(false));
  }

  mouseovered(active) {

    return function(d) {

      console.log(active);
      console.log(d3.select(this));

    };
  }
}
