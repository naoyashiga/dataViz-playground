export default class Screen {
  constructor(width, height, margin) {
    this.element = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    this.xRange = d3.scaleLinear()
    .domain([10, 9.4])
    .range([0, width]);

    var xAxis = d3.axisBottom(this.xRange).ticks(10);

    this.graph = this.element.append("g")
    .attr("class", "x axis myGraph")
    .attr("transform", "translate(" + margin.left + "," + (height / 2) + ")")
    .call(xAxis);
  }
}
