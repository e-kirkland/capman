(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[18],{641:function(e,t,o){"use strict";var a=o(43),r=o(164),n=(o(1),o(638)),s=o(639),l=o(21),c=["borderColor","backgroundColor","pointHoverBackgroundColor","dataPoints","label","pointed"],i=function(e){var t=e.borderColor,o=e.backgroundColor,i=e.pointHoverBackgroundColor,d=e.dataPoints,b=e.label,u=e.pointed,p=Object(r.a)(e,c),g=i||("transparent"!==o?o:t),j=[{data:d,borderColor:Object(n.getColor)(t),backgroundColor:Object(n.getColor)(o),pointBackgroundColor:Object(n.getColor)(g),pointHoverBackgroundColor:Object(n.getColor)(g),label:b}],C={scales:{xAxes:[{offset:!0,gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,d)-5,max:Math.max.apply(Math,d)+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}},h={scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}},O=function(){var e=u?C:h;return Object.assign({},e,{maintainAspectRatio:!1,legend:{display:!1}})}(),f=Object(n.deepObjectsMerge)(j,p.datasets||{}),x=Object(n.deepObjectsMerge)(O,p.options||{});return Object(l.jsx)(s.b,Object(a.a)(Object(a.a)({},p),{},{datasets:f,options:x,labels:b}))};i.defaultProps={borderColor:"rgba(255,255,255,.55)",backgroundColor:"transparent",dataPoints:[10,22,34,46,58,70,46,23,45,78,34,12],label:"Sales"},t.a=i},642:function(e,t,o){"use strict";var a=o(43),r=o(164),n=(o(1),o(638)),s=o(639),l=o(21),c=["backgroundColor","pointHoverBackgroundColor","dataPoints","label","pointed"],i=function(e){var t=e.backgroundColor,o=e.pointHoverBackgroundColor,i=e.dataPoints,d=e.label,b=(e.pointed,Object(r.a)(e,c)),u=[{data:i,backgroundColor:Object(n.getColor)(t),pointHoverBackgroundColor:Object(n.getColor)(o),label:d,barPercentage:.5,categoryPercentage:1}],p={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}};return Object(l.jsx)(s.a,Object(a.a)(Object(a.a)({},b),{},{datasets:u,options:p,labels:d}))};i.defaultProps={backgroundColor:"rgba(0,0,0,.2)",dataPoints:[10,22,34,46,58,70,46,23,45,78,34,12],label:"Sales"},t.a=i},684:function(e,t,o){"use strict";o.r(t);var a=o(1),r=o(632),n=o(636),s=o(641),l=o(642),c=o(21);t.default=function(e,t){t.withCharts;console.log("PROPS: ",e);var o=function(){return"$".concat(e.salaryCap)},i=function(){return"$".concat(e.avgSpend)},d=function(){return"".concat(e.rosterMin)},b=function(){return"".concat(e.rosterMax)};Object(a.useEffect)((function(){o(),i(),d(),b()}),[e]);return Object(c.jsxs)(r.H,{alignHorizontal:"center",children:[Object(c.jsx)(r.j,{sm:"6",lg:"3",children:Object(c.jsxs)(r.R,{color:"facebook",rightHeader:o(),rightFooter:"Current Cap",leftHeader:i(),leftFooter:"Avg Spend",children:[Object(c.jsx)(n.a,{name:"cil-dollar",height:"52",className:"my-4"}),Object(c.jsx)(s.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[65,59,84,84,51,55,40],label:"",labels:""})]})}),Object(c.jsx)(r.j,{sm:"6",lg:"3",children:Object(c.jsxs)(r.R,{color:"twitter",rightHeader:d(),rightFooter:"Roster Min",leftHeader:b(),leftFooter:"Roster Max",children:[Object(c.jsx)(n.a,{name:"cil-people",height:"52",className:"my-4"}),Object(c.jsx)(l.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[1,13,9,17,34,41,38],label:"",labels:""})]})})]})}}}]);
//# sourceMappingURL=18.c8b92409.chunk.js.map