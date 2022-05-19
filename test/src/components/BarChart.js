/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';



function BarChart() {
 const svgHeight = 250;
  const svgWidth = 400;
  const paddingLeft = 10;
  const paddingRight = 30;
  const paddingBottom = 20;
  const initialData = [35, 5, 15, 60, 20, 40, 10, 75, 60, 32];
  const randomData = [...Array(10)].map(() => (Math.random()*125));
  const [dataSet, setData] = useState(initialData);
  const svgRef = useRef();


  useEffect(() => {
    const maxValue = Math.max(...initialData);
    const highestYValue = svgHeight - maxValue+paddingBottom;
    const svg = d3.select(svgRef.current);
   
    const xScale = d3.scaleBand()
      .domain(dataSet.map((element, index) => index))
      .range([paddingLeft, svgWidth-paddingRight])
      .padding(0.2);
     
    const colorScale = d3.scaleLinear()
                    .domain([30,~~(highestYValue/2),highestYValue])
                    .range(["#33adff","#dde3ea","#ff0000"])
                    .clamp(true);

    const yScale = d3.scaleLinear()
                    .domain([0,highestYValue])
                    .range([svgHeight-paddingBottom, 0]);  

   
    const xAxis = d3.axisBottom(xScale).ticks(dataSet.length);
    svg.select(".x-axis")
        .style('transform',` translateY(${svgHeight-paddingBottom}px)` )
        .style("font-size", "10px")
        .attr("color", "#525a6a")
        .call(xAxis);

   const yAxis = d3.axisRight(yScale);
   svg.select(".y-axis")
            .style('transform',` translateX(${svgWidth-paddingRight}px)` )
            .style("font-size", "10px")
            .attr("color", "#525a6a")
            .call(yAxis);
  
  svg.attr( 'preserveAspectRatio',"xMinYMin meet")
  .attr("viewBox", "0 0 400 250")
  .attr('width', '55%');

  svg.selectAll(".bar")
      .data(dataSet)
        .join('rect')
          .attr('class','bar')
          .attr('transform','scale(1, -1)')
          .attr('x', (value,index) => xScale(index))
          .attr('y', -svgHeight+paddingBottom)
          .attr('width', xScale.bandwidth())
          .transition()
          .attr('fill',colorScale)  
          .attr('height',value => svgHeight - yScale(value) - paddingBottom);  

  },[dataSet,initialData,randomData]);

  const navigate = useNavigate();

   const handleNavigation = () => {
    navigate('/');
  }

  return (
    <section className="bar">
       <div className="bar-container">
        <h2 className='heading-secondary'> Randomized Bars </h2>
        <p className="text-paragraph-16">Click the buttons provided below to generate random charts.</p>
        <div className="bar-btn">
            <button className="btn btn-primary" onClick={() => setData(randomData)}>Random </button>
            <span>&nbsp;</span>
            <button className="btn btn-primary" onClick={() => setData(initialData.map(value => value ))}>Reset </button>
        </div>
        <br />
        <svg ref={svgRef}>
          <g className="x-axis"/>
          <g className="y-axis"/>
        </svg>
        <br />
        <button className="btn btn-primary" onClick={handleNavigation} style={{alignSelf: "flex-start", margin: "20px"}}>Back Home</button>
       </div>
      </section>
      );
}



export default BarChart;