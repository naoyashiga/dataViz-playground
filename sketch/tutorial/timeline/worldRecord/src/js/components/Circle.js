export default class Circle {
  constructor(parentNode, data, xRange) {
    console.log(data);

    this.element = parentNode.selectAll(".node")
    .data(data)
    .enter().append("g")
    .append("circle")
    .attr("cx", (d) => {
      console.log(d);
      return xRange(d.record);
    })
    .attr("cy", "-50")
    .style("fill", (d) => "#000")
    .attr("r", 2);
  }
}
