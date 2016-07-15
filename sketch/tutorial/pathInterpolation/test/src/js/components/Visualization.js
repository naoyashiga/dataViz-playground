import Screen from './Screen';

export default class Visualization {
  constructor(cb) {

    this.margin = {top: 10, right: 10, bottom: 0, left: 0};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.svg = this.createViz();

    const particleLength = 4;

    const posX = d3.range(particleLength)
    .map(d3.randomUniform(0, this.width));

    const posY = d3.range(particleLength)
    .map(d3.randomUniform(this.height));

    const particles = d3.zip(posX, posY);

    this.path = this.svg.append("path")
    .data([particles])
    .attr("class", "myPath")
    .attr("d", d3.line().curve(d3.curveCardinalClosed.tension(0.5)));
    // .attr("d", d3.line().curve(d3.curveCardinal.tension(0.5)));

    this.circle = this.svg.selectAll(".point")
    .data(d3.range(30))
    .enter().append("circle")
    .attr("r", 3)
    .attr("class", "particle")
    .attr("transform", (d, i) => {
      return "translate(" + particles[0][0] + ")";
    });

    this.transition();

    cb();
  }

  transition() {
    this.circle.transition()
    .duration(10000)
    .delay(function(d, i) { return i * 50; })
    .attrTween("transform", this.translateAlong(this.path.node()))
    .on("end", () => {
      this.transition();
    });

  }

  translateAlong(path) {
    var l = path.getTotalLength();
    return function(d, i, a) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        return "translate(" + p.x + "," + p.y + ")";
      };
    };
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }
}
