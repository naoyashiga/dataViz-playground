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

    this.tree.createTree((root) => {
      this.root = root;
      this.tree.element(root);

      this.link = this.createLink();
      this.node = this.createNode();
      this.circle = this.createCircle();
      this.text = this.createText();

      var t = d3.transition()
      .duration(750)
      .ease(d3.easeLinear);

      d3.selectAll(".myGraph").transition(t).size([this.width / 3, this.height]);



    });

    cb();
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
