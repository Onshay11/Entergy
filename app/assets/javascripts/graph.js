var SEL_source = "http://www.energobit.com/USR_uploads/ContentCMS/produse/MT/protectii_SEL/Echipamente/trasp_energie/SEL-351/SEL-351_big.jpg";
var MU_source = "http://w3.siemens.com/smartgrid/global/en/products-systems-solutions/Protection/digital-substation/PublishingImages/IC_SG_Siprotec5_7SC805_W6_sRGB.png";



var nodes = [
    {name: "Siprotech (1)", icon: SEL_source},
    {name: "MU (1)", icon: MU_source, type:"signals"},
    {name: "MU (2)", icon: MU_source, type:"signal"},
    {name: "MU (3)", icon: MU_source, type:"signal"},
    {name: "Switch", icon: MU_source, type:"switch"}
    ];
    
var links = [
  {source: 0, target: 1,id:"test"},
  {source: 0, target: 2,id:"test"},
  {source: 0, target: 3,id:"test"},
  {source: 4, target: 1,id:"test"},
  {source: 4, target: 2,id:"test"},
  {source: 4, target: 3,id:"test"}
];

var width = 960,
    height = 800;

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([width, height])
    .linkDistance(180)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link")
    .data(force.links())
    .enter().append("line")
    .attr("class", function (d) {
        var myClass = (d.target.type == "signal" ? "test" : "link");
        return myClass;
    });

var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag);

node.append("circle")
    .attr("r", 8);

node.append("image")
      .attr("xlink:href", function(d) { return d.icon; })
      .attr("x", "-12px")
      .attr("y", "-12px")
      .attr("width", "24px")
      .attr("height", "24px");

node.append("a")
    .attr("xlink:href", function(d) {return "http://entergy.com"})
    .append("circle")
      .attr("cx", 24 )
      .attr("cy", 0 )
      .attr("r", 4)
      .style("fill", "blue")
      .style("opacity", 0.5);

node.append("text")
    .attr("x", 32)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
}

function mouseout() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
}