export default class Circle {
  constructor(parentNode, data) {
    this.element = parentNode.append("circle")
    .attr("r", 8);
  }
}
