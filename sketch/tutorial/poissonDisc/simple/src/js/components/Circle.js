export default class Circle {
  constructor(parentNode) {
    this.element = parentNode.append("circle")
    .attr("r", 8);
  }
}
