export default class Text {
  constructor(parentNode, root) {
    this.element = parentNode.append("text")
    .attr("dy", 6)
    .attr("x", function(d) { return d.children ? -15 : 15; })
    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
    .text(function(d) { return d.data.name; });
  }
}
