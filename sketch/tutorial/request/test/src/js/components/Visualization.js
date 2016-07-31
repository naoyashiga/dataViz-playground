import Screen from './Screen';

export default class Visualization {
  constructor(cb) {
    console.log("aaa");

    this.margin = {top: 10, right: 10, bottom: 0, left: 0};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.svg = this.createViz();

    // let url = 'http://beta.json-generator.com/api/json/get/Nkd1zDuPb';
    // console.log(event);

    // d3.json(url)
    // .on("beforesend", function() { console.log("beforesend"); })
    // .on("progress", function() { console.log("progress"); })
    // .on("load", function(json) { console.log("success!", json); })
    // .on("error", function(error) { console.log("failure!", error); })
    // .get();

    d3.selectAll("svg")
    .transition()
    .on("start", function repeat() {
        d3.active(this)
        .style("fill", "red");
      });

    cb();
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }
}
