export default class Circle {
  constructor(parentNode, data, xRange, yRange) {

    var parseTime = d3.timeParse("%B %d, %Y");

    this.element = parentNode.selectAll(".node")
    .data(data)
    .enter().append("g")
    .append("circle")
    .attr("cx", "0")
    // .attr("cx", (d) => xRange(d.record))
    .attr("cy", (d) => {
      console.log(yRange(parseTime(d.date)));
      return -yRange(parseTime(d.date));
    })
    .style("fill", (d) => "#000")
    .attr("r", 2);

    this.element.transition()
    .ease(d3.easeLinear)
    .duration((d, i) => d.record * 1000)
    .attr("cx", (d) => xRange(d.record));
  }
}
