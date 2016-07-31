export default class Circle {
  constructor(parentNode, data, xRange) {
    this.element = parentNode.selectAll(".node")
    .data(data)
    .enter().append("g")
    .append("circle")
    .attr("cx", function(d) { return xRange(d.time); })
    .attr("cy", "-50")
    .style("fill", "#000")
    .attr("r", 8);
  }
}
