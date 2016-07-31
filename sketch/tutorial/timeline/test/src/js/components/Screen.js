export default class Screen {
  constructor(width, height, margin) {
    this.element = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);


    var x = d3.scaleLinear()
    .domain([9.5, 10.0])
    .range([0, width]);

    var xAxis = d3.axisBottom(x).ticks(10);

    this.graph = this.element.append("g")
    .attr("class", "x axis myGraph")
    .attr("transform", "translate(" + margin.left + "," + (height / 2) + ")")
    .call(xAxis);
  }
}
