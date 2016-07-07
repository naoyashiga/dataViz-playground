export default class Screen {
  constructor(w, h, margin) {
    this.element = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }
}
