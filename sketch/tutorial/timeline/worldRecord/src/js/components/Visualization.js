import Screen from './Screen';
import Circle from './Circle';

export default class Visualization {
  constructor(cb) {

    this.margin = {top: 10, right: 10, bottom: 0, left: 0};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.svg = this.createViz();

    this.record = null;

    this.circle = null;

    const jsonPath = './datasets/data.json';

    Promise.resolve()
    .then(() => this.loadData(jsonPath))
    .then(() => this.createElements());

    cb();
  }

  loadData(url) {
    return new Promise((resolve, rejected) => {

      d3.json(url, (error, data) => {
        if (error) throw error;

        this.record = data["results"];

        resolve();
      });
    });
  }

  createElements() {
    return new Promise((resolve, rejected) => {
      this.circle = this.createCircle();
    });
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin);
  }

  createCircle() {
    return new Circle(this.svg.graph, this.record, this.svg.xRange);
  }

}
