export default class Screen {
  constructor(width, height, margin) {
    this.element = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    this.xRange = d3.scaleLinear()
    .domain([10, 9.4])
    .range([0, width]);

    this.yRange = d3.scaleTime()
    .domain([new Date(2016, 8, 15), new Date(2005, 1, 1)])
    .range([0, height - margin.top - margin.bottom]);

    const xAxis = d3.axisBottom(this.xRange).ticks(10);
    const yAxis = d3.axisLeft(this.yRange).ticks(10);

    this.graph = this.element.append("g")
    .attr("class", "x axis myGraph")
    .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
    .call(xAxis);

    this.element.append("g")
    .attr("class", "y axis myGraph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(yAxis)
  }
}
