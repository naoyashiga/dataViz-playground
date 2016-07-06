import config from '../config';
import Circle from './Circle';

export default class Visualization {
  constructor(cb) {
    const _this = this;

    this.margin = {top: 50, right: 0, bottom: 0, left: 200};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.tree = d3.tree()
    .size([this.height, this.width - 400]);

    this.root;

    this.svg = this.createViz();

    this.createTree((v) => {
      this.link = this.createLink();
      this.node = this.createNode();
      this.circle = this.createCircle();
      this.text = this.createText();

    });
    
    cb();
  }

  createTree(callback) {
    d3.json("datasets/data.json", (error, data) => {

      this.root = d3.hierarchy(data);
      this.tree(this.root);

      callback();
    });
  }

  createLink() {

    return this.svg.selectAll(".link")
    .data(this.root.descendants().slice(1))
    .enter().append("path")
    .attr("class", "link")
    .attr("d", function(d) {
      return "M" + d.y + "," + d.x
      + "C" + (d.y + d.parent.y) / 2 + "," + d.x
      + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
      + " " + d.parent.y + "," + d.parent.x;
    });

  }

  createNode() {
    return this.svg.selectAll(".node")
    .data(this.root.descendants())
    .enter().append("g")
    .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
  }

  createCircle() {
    return this.node.append("circle")
    .attr("r", 2.5);
  }

  createText() {
    return this.node.append("text")
    .attr("dy", 3)
    .attr("x", function(d) { return d.children ? -8 : 8; })
    .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
    .text(function(d) { return d.data.name; });
  }

  createViz() {
    return d3.select('body')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ")");
  }
}
