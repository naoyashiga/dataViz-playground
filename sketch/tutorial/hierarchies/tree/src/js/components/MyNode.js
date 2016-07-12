export default class MyNode {
  constructor(parentSvg, root) {
    this.element = parentSvg.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")");

    this.addHover();
  }

  addHover() {
    this.element.on("mouseover", this.mouseovered(true))
    .on("mouseout", this.mouseovered(false));
  }

  mouseovered(active) {

    return function(d) {

      var paths = d3.selectAll("path");

      if(active) {
        let ancestors = d.ancestors();

        paths.filter((d) => ancestors.includes(d))
        .style("stroke", "#f00");

      } else {
        paths.style("stroke", "#555");
      }
    };
  }
}
