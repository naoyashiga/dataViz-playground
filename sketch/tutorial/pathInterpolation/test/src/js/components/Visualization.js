import config from '../config';
import Screen from './Screen';
import Link from './Link';
import MyNode from './MyNode';
import Text from './Text';
import Circle from './Circle';
import Tree from './Tree';

export default class Visualization {
  constructor(cb) {

    this.margin = {top: 50, right: 0, bottom: 0, left: 200};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.tree = new Tree(this.width, this.height);

    this.root = null;

    this.svg = this.createViz();

    var points = [
      [480, 200],
      [580, 400],
      [680, 100],
      [780, 300],
      [180, 300],
      [280, 100],
      [380, 400]
    ];

    this.path = this.svg.append("path")
    .data([points])
    .attr("class", "myPath")
    .attr("d", d3.line().curve(d3.curveCardinalClosed.tension(0.5)));
    // .attr("d", d3.line().curve(d3.curveCardinal.tension(0.5)));

    this.svg.selectAll(".point")
    .data(points)
    .enter().append("circle")
    .attr("r", 4)
    .attr("transform", function(d) { return "translate(" + d + ")"; });

    this.circle = this.svg.selectAll(".point")
    .data(d3.range(points.length))
    .enter().append("circle")
    .attr("r", 13)
    .attr("transform", (d, i) => {
      return "translate(" + points[i] + ")";
    });

    this.transition();

    cb();
  }

  transition() {
    this.circle.transition()
    .duration(3000)
    .delay(function(d, i) { return i * 50; })
    .attrTween("transform", this.translateAlong(this.path.node()))
    .on("end", () => {
      this.transition();
    });

  }

  translateAlong(path) {
    // console.log(path.getTotalLength());
    var l = path.getTotalLength();
    return function(d, i, a) {
      // console.log(d);
      // console.log(i);
      // console.log(a);

      let offset = Math.floor(l / a.length);
      return function(t) {
        var p = path.getPointAtLength(t * l);
        return "translate(" + p.x + "," + p.y + ")";
      };
    };
  }

  createLink() {
    return new Link(this.svg, this.root).element;
  }

  createNode() {
    return new MyNode(this.svg, this.root).element;
  }

  createCircle() {
    return new Circle(this.node).element;
  }

  createText() {
    return new Text(this.node).element;
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }
}
