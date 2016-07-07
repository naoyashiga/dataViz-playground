export default class MyNode {
  constructor(parentSvg, root) {
    this.element = parentSvg.selectAll(".node")
    .data(root.descendants())
    // .data(root.descendants().filter(function(d) {
    //   return d.height >= 1;
    // }))
    .enter().append("g")
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  }
}
