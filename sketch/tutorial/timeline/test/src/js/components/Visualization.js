import Screen from './Screen';

export default class Visualization {
  constructor(cb) {
    console.log("aaa");

    this.margin = {top: 10, right: 10, bottom: 0, left: 0};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.svg = this.createViz();

    this.record = null;

    this.circle = null;

    this.loadJSON(() => {

      console.log(this.record);

      // this.circle = this.createCircle();

    });



    cb();
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin);
  }

  createCircle() {
    return new Circle(this.svg.graph, this.record);
  }

  loadJSON(callback) {
    let url = './datasets/data.json';

    d3.json(url, (error, data) => {
      if (error) throw error;

      this.record = data["record"];
      console.log(this.record);

      callback();
    });

  }
}
