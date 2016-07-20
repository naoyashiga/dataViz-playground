import Screen from './Screen';

export default class Visualization {
  constructor(cb) {

    this.margin = {top: 10, right: 10, bottom: 0, left: 0};

    this.width = window.innerWidth - this.margin.left - this.margin.right,
    this.height = window.innerHeight - this.margin.top - this.margin.bottom;

    this.svg = this.createViz();

    this.sample = this.poissonDiscSampler(this.width, this.height, 20);

    var myTransition = d3.transition()
    .duration(3000);
    // .ease(d3.easeBounce);
    // .ease(d3.easeCircleInOut);

    this.timer = d3.interval(() => {
      for (var i = 0; i < 1; ++i) {
        var s = this.sample();
        // console.log(s);
        if (!s) {
          // console.log("owari");
          this.timer.stop();
          return true;
        }
        this.svg.append("circle")
        .attr("cx", s[0])
        .attr("cy", s[1])
        .attr("r", 0)
        .transition()
        // .duration(500)
        .attr("r", 5);

        // this.svg.append("text")
        // .attr("x", s[0])
        // .attr("y", s[1])
        // .attr("class", "typo")
        // .text("草")
        // .style("font-size", "0")
        // .style("opacity", "0")
        // .transition()
        // // .delay(1000)
        // .style("opacity", "1")
        // .style("font-size", "30px");
      }
    }, 30);

    cb();
  }

  poissonDiscSampler(width, height, radius) {
    var k = 10,
    radius2 = radius * radius,
    R = 3 * radius2,
    cellSize = radius * Math.SQRT1_2,
    gridWidth = Math.ceil(width / cellSize),
    gridHeight = Math.ceil(height / cellSize),
    grid = new Array(gridWidth * gridHeight),
    queue = [],
    queueSize = 0,
    sampleSize = 0;

    return () => {
      if(!sampleSize) return sample(Math.random() * width, Math.random() * height);
      console.log(queueSize);

      while (queueSize) {
        var i = Math.random() * queueSize | 0,
        s = queue[i];

        // Make a new candidate between [radius, 2 * radius] from the existing sample.
        for (var j = 0; j < k; ++j) {
          var a = 2 * Math.PI * Math.random(),
          r = Math.sqrt(Math.random() * R + radius2),
          x = s[0] + r * Math.cos(a),
          y = s[1] + r * Math.sin(a);

          if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
            return sample(x, y);
          }
        }

        queue[i] = queue[--queueSize];
        queue.length = queueSize;
      }
    };

    function far(x, y) {
      var i = x / cellSize | 0,
      j = y / cellSize | 0,
      i0 = Math.max(i - 2, 0),
      j0 = Math.max(j - 2, 0),
      i1 = Math.min(i + 3, gridWidth),
      j1 = Math.min(j + 3, gridHeight);

      for(j = j0; j < j1; ++j) {
        var o = j * gridWidth;

        for(i = i0; i < i1; ++i) {
          if(s = grid[o + i]) {
            var s,
            dx = s[0] - x,
            dy = s[1] - y;

            if(dx * dx + dy * dy < radius2) return false;
          }
        }
      }
      return true;
    }

    function sample(x, y) {
      var s = [x, y];
      queue.push(s);
      grid[gridWidth * (y / cellSize | 0) + (x / cellSize | 0)] = s;
      ++sampleSize;
      ++queueSize;

      return s;
    }
  }

  createViz() {
    return new Screen(this.width, this.height, this.margin).element;
  }
}
