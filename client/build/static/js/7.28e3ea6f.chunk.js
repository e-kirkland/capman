(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[7],{634:function(t,r,n){t.exports=n(386)},635:function(t,r,n){"use strict";function e(t,r,n,e,o,i,c){try{var a=t[i](c),u=a.value}catch(s){return void n(s)}a.done?r(u):Promise.resolve(u).then(e,o)}function o(t){return function(){var r=this,n=arguments;return new Promise((function(o,i){var c=t.apply(r,n);function a(t){e(c,o,i,a,u,"next",t)}function u(t){e(c,o,i,a,u,"throw",t)}a(void 0)}))}}n.d(r,"a",(function(){return o}))},636:function(t,r,n){"use strict";function e(t,r){(null==r||r>t.length)&&(r=t.length);for(var n=0,e=new Array(r);n<r;n++)e[n]=t[n];return e}function o(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],e=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(e=(c=a.next()).done)&&(n.push(c.value),!r||n.length!==r);e=!0);}catch(u){o=!0,i=u}finally{try{e||null==a.return||a.return()}finally{if(o)throw i}}return n}}(t,r)||function(t,r){if(t){if("string"===typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}n.d(r,"a",(function(){return o}))},637:function(t,r,n){(function(r){var e=n(638),o=n(639);function i(t){console.log("[dotenv][DEBUG] ".concat(t))}var c=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,a=/\\n/g,u=/\n|\r|\r\n/;function s(t,r){var n=Boolean(r&&r.debug),e={};return t.toString().split(u).forEach((function(t,r){var o=t.match(c);if(null!=o){var u=o[1],s=o[2]||"",l=s.length-1,f='"'===s[0]&&'"'===s[l];"'"===s[0]&&"'"===s[l]||f?(s=s.substring(1,l),f&&(s=s.replace(a,"\n"))):s=s.trim(),e[u]=s}else n&&i("did not match key and value when parsing line ".concat(r+1,": ").concat(t))})),e}t.exports.config=function(t){var n=o.resolve(r.cwd(),".env"),c="utf8",a=!1;t&&(null!=t.path&&(n=t.path),null!=t.encoding&&(c=t.encoding),null!=t.debug&&(a=!0));try{var u=s(e.readFileSync(n,{encoding:c}),{debug:a});return Object.keys(u).forEach((function(t){Object.prototype.hasOwnProperty.call(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://capmanbot.herokuapp.com/api/"}),t)?a&&i('"'.concat(t,'" is already defined in `process.env` and will not be overwritten')):Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://capmanbot.herokuapp.com/api/"})[t]=u[t]})),{parsed:u}}catch(l){return{error:l}}},t.exports.parse=s}).call(this,n(633))},638:function(t,r){},639:function(t,r,n){(function(t){function n(t,r){for(var n=0,e=t.length-1;e>=0;e--){var o=t[e];"."===o?t.splice(e,1):".."===o?(t.splice(e,1),n++):n&&(t.splice(e,1),n--)}if(r)for(;n--;n)t.unshift("..");return t}function e(t,r){if(t.filter)return t.filter(r);for(var n=[],e=0;e<t.length;e++)r(t[e],e,t)&&n.push(t[e]);return n}r.resolve=function(){for(var r="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var c=i>=0?arguments[i]:t.cwd();if("string"!==typeof c)throw new TypeError("Arguments to path.resolve must be strings");c&&(r=c+"/"+r,o="/"===c.charAt(0))}return(o?"/":"")+(r=n(e(r.split("/"),(function(t){return!!t})),!o).join("/"))||"."},r.normalize=function(t){var i=r.isAbsolute(t),c="/"===o(t,-1);return(t=n(e(t.split("/"),(function(t){return!!t})),!i).join("/"))||i||(t="."),t&&c&&(t+="/"),(i?"/":"")+t},r.isAbsolute=function(t){return"/"===t.charAt(0)},r.join=function(){var t=Array.prototype.slice.call(arguments,0);return r.normalize(e(t,(function(t,r){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},r.relative=function(t,n){function e(t){for(var r=0;r<t.length&&""===t[r];r++);for(var n=t.length-1;n>=0&&""===t[n];n--);return r>n?[]:t.slice(r,n-r+1)}t=r.resolve(t).substr(1),n=r.resolve(n).substr(1);for(var o=e(t.split("/")),i=e(n.split("/")),c=Math.min(o.length,i.length),a=c,u=0;u<c;u++)if(o[u]!==i[u]){a=u;break}var s=[];for(u=a;u<o.length;u++)s.push("..");return(s=s.concat(i.slice(a))).join("/")},r.sep="/",r.delimiter=":",r.dirname=function(t){if("string"!==typeof t&&(t+=""),0===t.length)return".";for(var r=t.charCodeAt(0),n=47===r,e=-1,o=!0,i=t.length-1;i>=1;--i)if(47===(r=t.charCodeAt(i))){if(!o){e=i;break}}else o=!1;return-1===e?n?"/":".":n&&1===e?"/":t.slice(0,e)},r.basename=function(t,r){var n=function(t){"string"!==typeof t&&(t+="");var r,n=0,e=-1,o=!0;for(r=t.length-1;r>=0;--r)if(47===t.charCodeAt(r)){if(!o){n=r+1;break}}else-1===e&&(o=!1,e=r+1);return-1===e?"":t.slice(n,e)}(t);return r&&n.substr(-1*r.length)===r&&(n=n.substr(0,n.length-r.length)),n},r.extname=function(t){"string"!==typeof t&&(t+="");for(var r=-1,n=0,e=-1,o=!0,i=0,c=t.length-1;c>=0;--c){var a=t.charCodeAt(c);if(47!==a)-1===e&&(o=!1,e=c+1),46===a?-1===r?r=c:1!==i&&(i=1):-1!==r&&(i=-1);else if(!o){n=c+1;break}}return-1===r||-1===e||0===i||1===i&&r===e-1&&r===n+1?"":t.slice(r,e)};var o="b"==="ab".substr(-1)?function(t,r,n){return t.substr(r,n)}:function(t,r,n){return r<0&&(r=t.length+r),t.substr(r,n)}}).call(this,n(633))},667:function(t,r,n){"use strict";n.r(r);var e=n(634),o=n.n(e),i=n(635),c=n(636),a=n(1),u=n(632),s=n(21);n(637).config();var l=function(t){switch(t){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},f=["display_name","player","position","team","salary"];r.default=function(){var t=Object(a.useState)([]),r=Object(c.a)(t,2),n=r[0],e=r[1],p=function(){var t=Object(i.a)(o.a.mark((function t(){var r,n,i,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="https://capmanbot.herokuapp.com/api//getPlayers",console.log("URL: ",r),t.next=4,fetch(r).then((function(t){return t.json()}));case 4:return n=t.sent,i=Object.values(n),c=i.filter((function(t){return"Willfortanbary"===t.display_name})),console.log("SUMMARY ARRAY: ",c),e(c),t.abrupt("return",c);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){p()}),[]),Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(u.H,{children:Object(s.jsx)(u.j,{children:Object(s.jsxs)(u.e,{children:[Object(s.jsx)(u.i,{children:"ESSENDON BOMBERS"}),Object(s.jsx)(u.f,{children:Object(s.jsx)(u.m,{items:n,fields:f,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:100,scopedSlots:{status:function(t){return Object(s.jsx)("td",{children:Object(s.jsx)(u.a,{color:l(t.status),children:t.status})})}}})})]})})})})}}}]);
//# sourceMappingURL=7.28e3ea6f.chunk.js.map