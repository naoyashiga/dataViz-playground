export default class Screen {
  constructor(width, height, margin) {
    this.element = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    this.xRange = d3.scaleLinear()
    .domain([10.0, 9.4])
    .range([0, width]);

    this.yRange = d3.scaleTime()
    .domain([
      new Date(2020, 8, 15),
      new Date(2009, 1, 1),
      new Date(1983, 1, 1),
      new Date(1965, 1, 1)
    ])
    .range([
      0,
      80,
      height - margin.top - margin.bottom - 50,
      height - margin.top - margin.bottom
    ]);

    const xAxis = d3.axisBottom(this.xRange).ticks(20);

    let year1 = d3.timeYears(new Date(1982, 1, 1), new Date(2009, 1, 1), 1);

    let year2 = d3.timeYears(new Date(2015, 1, 1), new Date(2016, 1, 1), 1);

    let year3 = d3.timeYears(new Date(1967, 1, 1), new Date(1968, 1, 1), 1);

    let myYears = d3.merge([year1, year2, year3]);
    console.log(myYears);

    const yAxis = d3.axisLeft(this.yRange).tickValues(myYears);

    this.element.append("g")
    .attr("class", "xaxis myGraph")
    .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
    .call(xAxis)

    this.graph = this.element.append("g")
    .attr("class", "yaxis myGraph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(yAxis)
  }
}
