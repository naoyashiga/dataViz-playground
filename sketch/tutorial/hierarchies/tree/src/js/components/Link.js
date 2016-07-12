export default class Link {
  constructor(parentSvg, root) {
    this.element = parentSvg.selectAll(".link")
    .data(root.descendants().slice(1))
    // .data(root.descendants().slice(1).filter(function(d) {
    //   return d.depth > 1;
    // }))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", function(d) {
      return "M" + d.y + "," + d.x
      + "L" + (d.y + d.parent.y) / 2 + "," + d.x
      + " " + d.parent.y + "," + d.parent.x
      + " " + d.parent.y + "," + d.parent.x;
    })
    .on("click", this.clicked.bind(this));

    this.flag = true;
  }

  clicked() {
    var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

    d3.selectAll(".link")
    .transition()
    .duration(750)
    // .attrTween("transform", function() { return d3.interpolateString("rotate(0)", "rotate(720)"); })
    .attr("d", (d) => {

    var bezierStr = "M" + d.y + "," + d.x
    + "L" + (d.y + d.parent.y) / 2 + "," + d.x
    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
    + " " + d.parent.y + "," + d.parent.x;

    var bezierStr2 = "M" + d.y + "," + d.x
    + "L" + (d.y + d.parent.y) / 2 + "," + d.x
    + " " + d.parent.y + "," + d.parent.x
    + " " + d.parent.y + "," + d.parent.x;
    // return d3.interpolateString(bezierStr, lineStr);

      if(this.flag) {
        return bezierStr;
        // return d3.interpolateString(bezierStr, lineStr);

      } else {
        return bezierStr2;
        // return d3.interpolateString(lineStr, bezierStr);
      }

    });

      this.flag = !this.flag;
  }
}
