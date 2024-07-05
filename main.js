const svg = d3.select("#drawing")
    .attr("width", 600)
    .attr("height", 600);

let r = 20;

function createDrawing() {
    svg.selectAll("*").remove();

    let smile = svg.append("g")
        .attr("transform", "translate(550, 50)")
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "gray");

    // лицо
    smile.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "white");

    // левый глаз 
    smile.append("rect")
        .attr("x", -30)
        .attr("y", -10)
        .attr("width", 20)
        .attr("height", 5)
        .style("stroke", "black")
        .style("stroke-width", "2"); 

    smile.append("rect")
        .attr("x", 15)
        .attr("y", -10)
        .attr("width", 20)
        .attr("height", 5)
        .style("stroke", "black")
        .style("stroke-width", "2"); 

    smile.append("rect")
        .attr("x", -5)
        .attr("y", 20)
        .attr("width", 20)
        .attr("height", 5)
        .style("stroke", "black")
        .style("stroke-width", "2"); 

    smile.append("rect")
        .attr("x", -70)
        .attr("y", 0)
        .attr("width", 20)
        .attr("height", 5)
        .style("stroke", "black")
        .style("fill", "gray")
        .style("stroke-width", "2");

    smile.append("polygon")
        .attr("points", "-70,5 -75,20 -65,20 -60,5")
        .style("fill", "brown")
        .style("stroke", "dark-brown")
        .style("stroke-width", "2");

    const pathData = [
        { x: 300, y: 50 },
        { x: 50, y: 550 },
        { x: -200, y: 50 }
    ];

    const line = d3.line()
        .x(d => d.x + 250)
        .y(d => d.y);

    svg.append("path")
        .datum(pathData)
        .attr("d", line)
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("id", "trajectory");
}

function startAnimation() {
    const duration = +d3.select("#duration").property("value");
    const scale = +d3.select("#scale").property("value");

    const path = svg.select("#trajectory");
    const group = svg.select("g");

    group.transition()
        .duration(duration)
        .attrTween("transform", translateAlong(path.node(), scale));
}

function translateAlong(path, scale) {
    const length = path.getTotalLength();
    return function(d, i, a) {
        return function(t) {
            const point = path.getPointAtLength(t * length);
            const currentScale = 1 + (scale - 1) * t; // масштаб изменяется от 1 до заданного пользователем значения
            return `translate(${point.x}, ${point.y}) scale(${currentScale})`;
        };
    };
}

d3.select("#start").on("click", startAnimation);
d3.select("#clear").on("click", createDrawing);

createDrawing();
