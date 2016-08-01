export default class Circle {
  constructor(parentNode, data, xRange) {
    const colorMap = d3.interpolateRgb(
      d3.rgb('#d6e685'),
      d3.rgb('#1e6823')
    );

    this.element = parentNode.selectAll(".node")
    .data(data)
    .enter().append("g")
    .append("circle")
    .attr("cx", (d) => xRange(d.end))
    .attr("cy", "-50")
    .style("fill", (d) => "#000")
    .attr("r", 2);
  }
}
