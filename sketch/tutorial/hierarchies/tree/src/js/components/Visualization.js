import config from '../config';
import Circle from './Circle';

export default class Visualization {
  constructor(cb) {
    const _this = this;

    this.margin = {top: 50, right: 0, bottom: 0, left: 50};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;
    this.svg = this.createViz();

    // Callback onLoaded
    cb();
  }

  createViz() {
    return d3.select('body')
      .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
      .append("g")
        // .attr("transform", "translate(" + this.margin.left + ",0)");
        .attr("transform", "translate(" + this.margin.left + "," + (this.margin.top) + ")");
  }
}
