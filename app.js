var $this = $(".lollipopchart");

var data = [
  {
    label: "#123456",
    value: 17,
  },
  {
    label: "#123457",
    value: 15,
  },
  {
    label: "#564789",
    value: 14,
  },
  {
    label: "#668987",
    value: 30,
  },
  {
    label: "#668997",
    value: 28,
  },
  {
    label: "#668917",
    value: 29,
  },
  {
    label: "#668991",
    value: 26,
  },
  {
    label: "#668992",
    value: 21,
  },
  {
    label: "#123548",
    value: 12,
  },
  {
    label: "#11",
    value: 26,
  },
  {
    label: "#22",
    value: 29,
  },
  {
    label: "#33",
    value: 30,
  },
  {
    label: "#44",
    value: 19,
  },
  {
    label: "#55",
    value: 23,
  },
  {
    label: "#66",
    value: 25,
  },
  {
    label: "#77",
    value: 27,
  },
  {
    label: "#88",
    value: 21,
  },
  {
    label: "#99",
    value: 30,
  },
  {
    label: "#111",
    value: 26,
  },
  {
    label: "#222",
    value: 21,
  },
  {
    label: "#333",
    value: 19,
  },
];

var width = $this.data("width"),
  height = $this.data("height");

var color = d3
  .scaleOrdinal()
  .range([
    "#eb6383",
    "#fa9191",
    "#ffe9c5",
    "#b4f2e1",
    "#000",
    "#123546",
    "#875698",
    "#785418",
    "#548759",
    "#685973",
    "#a2d857",
    "#fa9191",
    "#ffe9c5",
    "#b4f2e1",
    "#000",
    "#123546",
    "#875698",
    "#785418",
    "#548759",
    "#685973",
    "#a2d857",
  ]);

data.forEach(function (d) {
  d.total = +d.value;
});

var margin = {
    top: 20,
    right: 20,
    bottom: 85,
    left: 20,
  },
  width = width - margin.left - margin.right,
  height = height - margin.top - margin.bottom;

var x = d3.scaleBand().range([0, width]).padding(0.9);
var y = d3.scaleLinear().range([height, 0]);

x.domain(
  data.map(function (d) {
    return d.label;
  })
);
y.domain([
  0,
  d3.max(data, function (d) {
    return d.total;
  }),
]);

var svg = d3
  .select($this[0])
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("class", "lollipopchart")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var lollipop = svg.append("g").attr("class", "lollipop");

var bars = lollipop.append("g").attr("class", "bars");

bars
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("x", function (d) {
    return x(d.label);
  })
  .attr("width", x.bandwidth())
  .attr("y", function (d) {
    return y(d.value);
  })
  .attr("height", function (d) {
    return height - y(d.total);
  });

var lolliradian = 5;

var circles = lollipop.append("g").attr("class", "circles");

circles
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .transition()
  .duration(1000)
  .attr("cx", function (d) {
    return x(d.label) + x.bandwidth() / 2;
  })
  .attr("cy", function (d) {
    return y(d.value);
  })
  .attr("r", lolliradian)
  .attr("fill", function (d, i) {
    return color(i);
  });

var innercircles = lollipop.append("g").attr("class", "innercircles");

innercircles
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .transition()
  .duration(1000)
  .attr("cx", function (d) {
    return x(d.label) + x.bandwidth() / 2;
  })
  .attr("cy", function (d) {
    return y(d.value);
  })
  .attr("r", lolliradian - 5)
  .attr("fill", "#ffffff");

lollipop
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-65)");

lollipop.append("g").call(d3.axisLeft(y));
