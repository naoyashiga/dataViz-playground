export default class Tree {
  constructor(w, h) {
    this.element = d3.tree()
    .size([h, w - 400]);

    this.root = null;
  }

  createTree(callback) {
    d3.json("../../datasets/data.json", (error, data) => {

      this.root = d3.hierarchy(data);

      callback(this.root);
    });
  }
}
