  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees) * Math.PI / 180.0;
  
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }
  
  function describeArc(x, y, radius, startAngle, endAngle){
  
      //polarToCartesian e poentru a ne da seama unde sunt situate punctele pe raza cercului
      var start = polarToCartesian(x, y, radius, endAngle);
      var end = polarToCartesian(x, y, radius, startAngle);
  
      var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
      console.log(arcSweep);
  
      var d = [
          "M", start.x, start.y, 
          "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
          "L", x,y,
          "L", start.x, start.y,
      ].join(" ");
      
      //console.log(d);
      
      return d;       
  }
  
  var arc = describeArc(100, 100, 100, 0, 72.99);
  // 180 = 50
  // 1 = x
  // x = 50/180
  // x = 5/18 = 0.27
  
  // document.getElementById("arc1").setAttribute("d", arc);
  let svgEl = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svgEl.setAttribute('width',200);
  svgEl.setAttribute('height','' + 200);
  let pth = document.createElementNS('http://www.w3.org/2000/svg','path');
  pth.setAttribute('d',arc);
  pth.setAttribute('fill','indigo');
  svgEl.appendChild(pth);
  document.body.appendChild(svgEl);
  //document.getElementById("path").innerHTML = arc;