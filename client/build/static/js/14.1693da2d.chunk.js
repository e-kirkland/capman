(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[14],{633:function(e,t,r){e.exports=r(386)},634:function(e,t,r){"use strict";function n(e,t,r,n,a,c,o){try{var u=e[c](o),s=u.value}catch(i){return void r(i)}u.done?t(s):Promise.resolve(s).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,c){var o=e.apply(t,r);function u(e){n(o,a,c,u,s,"next",e)}function s(e){n(o,a,c,u,s,"throw",e)}u(void 0)}))}}r.d(t,"a",(function(){return a}))},635:function(e,t,r){"use strict";function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function a(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,a=!1,c=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(s){a=!0,c=s}finally{try{n||null==u.return||u.return()}finally{if(a)throw c}}return r}}(e,t)||function(e,t){if(e){if("string"===typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(t,"a",(function(){return a}))},679:function(e,t,r){"use strict";r.r(t);var n=r(633),a=r.n(n),c=r(634),o=r(635),u=r(1),s=r(632),i=r(21),l=Object(u.lazy)((function(){return Promise.all([r.e(0),r.e(1)]).then(r.bind(null,637))})),f=function(e){switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},p=["display_name","player","position","team","salary"];t.default=function(){var e=Object(u.useState)([]),t=Object(o.a)(e,2),r=t[0],n=t[1],b=Object(u.useState)(0),h=Object(o.a)(b,2),j=h[0],d=h[1],y=Object(u.useState)(0),m=Object(o.a)(y,2),O=m[0],v=m[1],A=Object(u.useState)(0),S=Object(o.a)(A,2),x=S[0],g=S[1],w=Object(u.useState)(0),R=Object(o.a)(w,2),_=R[0],C=R[1],I=function(){var e=Object(c.a)(a.a.mark((function e(){var t,r,c,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="https://capmanbot.herokuapp.com/api//getPlayers",console.log("URL: ",t),e.next=4,fetch(t).then((function(e){return e.json()}));case 4:return r=e.sent,c=Object.values(r),o=c.filter((function(e){return"jeffreywolfeherbst"===e.display_name})),console.log("ACWORTH SUMMARY ARRAY: ",o),n(o),e.abrupt("return",o);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){var e=Object(c.a)(a.a.mark((function e(){var t,r,n,c,o,u,s,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="https://capmanbot.herokuapp.com/api//capStatus",console.log("URL: ",t),e.next=4,fetch(t).then((function(e){return e.json()}));case 4:return r=e.sent,n=Object.values(r),console.log("SUMMARY ARRAY: ",n),c=n[0],o=[],u=[],c.forEach((function(e){var t=e.current_salary,r=e.current_players;u.push(r),o.push(t)})),s=c.find((function(e){return"jeffreywolfeherbst"===e.display_name})),v(s.current_salary),console.log("SALARY ARRAY: ",s),i=n[1],console.log("SETTINGS JSON: ",i),g(s.current_players),d(parseInt(i.salary_cap)),C(parseInt(i.roster_max)),e.abrupt("return",r);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(u.useEffect)((function(){I(),P()}),[]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(l,{withCharts:!0,teamCap:O,teamCount:x,salaryCap:j,rosterMax:_}),Object(i.jsx)(s.H,{children:Object(i.jsx)(s.j,{children:Object(i.jsxs)(s.e,{children:[Object(i.jsx)(s.i,{children:"ACWORTH EAGLES"}),Object(i.jsx)(s.f,{children:Object(i.jsx)(s.m,{items:r,fields:p,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:100,scopedSlots:{status:function(e){return Object(i.jsx)("td",{children:Object(i.jsx)(s.a,{color:f(e.status),children:e.status})})}}})})]})})})]})}}}]);
//# sourceMappingURL=14.1693da2d.chunk.js.map