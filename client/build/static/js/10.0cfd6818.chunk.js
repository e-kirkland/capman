(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[10],{634:function(t,e,r){t.exports=r(386)},635:function(t,e,r){"use strict";function n(t,e,r,n,o,i,c){try{var a=t[i](c),u=a.value}catch(s){return void r(s)}a.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var c=t.apply(e,r);function a(t){n(c,o,i,a,u,"next",t)}function u(t){n(c,o,i,a,u,"throw",t)}a(void 0)}))}}r.d(e,"a",(function(){return o}))},636:function(t,e,r){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function o(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,i=void 0;try{for(var c,a=t[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!e||r.length!==e);n=!0);}catch(u){o=!0,i=u}finally{try{n||null==a.return||a.return()}finally{if(o)throw i}}return r}}(t,e)||function(t,e){if(t){if("string"===typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}r.d(e,"a",(function(){return o}))},637:function(t,e,r){(function(e){var n=r(638),o=r(639);function i(t){console.log("[dotenv][DEBUG] ".concat(t))}var c=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,a=/\\n/g,u=/\n|\r|\r\n/;function s(t,e){var r=Boolean(e&&e.debug),n={};return t.toString().split(u).forEach((function(t,e){var o=t.match(c);if(null!=o){var u=o[1],s=o[2]||"",l=s.length-1,f='"'===s[0]&&'"'===s[l];"'"===s[0]&&"'"===s[l]||f?(s=s.substring(1,l),f&&(s=s.replace(a,"\n"))):s=s.trim(),n[u]=s}else r&&i("did not match key and value when parsing line ".concat(e+1,": ").concat(t))})),n}t.exports.config=function(t){var r=o.resolve(e.cwd(),".env"),c="utf8",a=!1;t&&(null!=t.path&&(r=t.path),null!=t.encoding&&(c=t.encoding),null!=t.debug&&(a=!0));try{var u=s(n.readFileSync(r,{encoding:c}),{debug:a});return Object.keys(u).forEach((function(t){Object.prototype.hasOwnProperty.call(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://capmanbot.herokuapp.com/api/"}),t)?a&&i('"'.concat(t,'" is already defined in `process.env` and will not be overwritten')):Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://capmanbot.herokuapp.com/api/"})[t]=u[t]})),{parsed:u}}catch(l){return{error:l}}},t.exports.parse=s}).call(this,r(633))},638:function(t,e){},639:function(t,e,r){(function(t){function r(t,e){for(var r=0,n=t.length-1;n>=0;n--){var o=t[n];"."===o?t.splice(n,1):".."===o?(t.splice(n,1),r++):r&&(t.splice(n,1),r--)}if(e)for(;r--;r)t.unshift("..");return t}function n(t,e){if(t.filter)return t.filter(e);for(var r=[],n=0;n<t.length;n++)e(t[n],n,t)&&r.push(t[n]);return r}e.resolve=function(){for(var e="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var c=i>=0?arguments[i]:t.cwd();if("string"!==typeof c)throw new TypeError("Arguments to path.resolve must be strings");c&&(e=c+"/"+e,o="/"===c.charAt(0))}return(o?"/":"")+(e=r(n(e.split("/"),(function(t){return!!t})),!o).join("/"))||"."},e.normalize=function(t){var i=e.isAbsolute(t),c="/"===o(t,-1);return(t=r(n(t.split("/"),(function(t){return!!t})),!i).join("/"))||i||(t="."),t&&c&&(t+="/"),(i?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(n(t,(function(t,e){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,r){function n(t){for(var e=0;e<t.length&&""===t[e];e++);for(var r=t.length-1;r>=0&&""===t[r];r--);return e>r?[]:t.slice(e,r-e+1)}t=e.resolve(t).substr(1),r=e.resolve(r).substr(1);for(var o=n(t.split("/")),i=n(r.split("/")),c=Math.min(o.length,i.length),a=c,u=0;u<c;u++)if(o[u]!==i[u]){a=u;break}var s=[];for(u=a;u<o.length;u++)s.push("..");return(s=s.concat(i.slice(a))).join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!==typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),r=47===e,n=-1,o=!0,i=t.length-1;i>=1;--i)if(47===(e=t.charCodeAt(i))){if(!o){n=i;break}}else o=!1;return-1===n?r?"/":".":r&&1===n?"/":t.slice(0,n)},e.basename=function(t,e){var r=function(t){"string"!==typeof t&&(t+="");var e,r=0,n=-1,o=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!o){r=e+1;break}}else-1===n&&(o=!1,n=e+1);return-1===n?"":t.slice(r,n)}(t);return e&&r.substr(-1*e.length)===e&&(r=r.substr(0,r.length-e.length)),r},e.extname=function(t){"string"!==typeof t&&(t+="");for(var e=-1,r=0,n=-1,o=!0,i=0,c=t.length-1;c>=0;--c){var a=t.charCodeAt(c);if(47!==a)-1===n&&(o=!1,n=c+1),46===a?-1===e?e=c:1!==i&&(i=1):-1!==e&&(i=-1);else if(!o){r=c+1;break}}return-1===e||-1===n||0===i||1===i&&e===n-1&&e===r+1?"":t.slice(e,n)};var o="b"==="ab".substr(-1)?function(t,e,r){return t.substr(e,r)}:function(t,e,r){return e<0&&(e=t.length+e),t.substr(e,r)}}).call(this,r(633))},670:function(t,e,r){"use strict";r.r(e);var n=r(634),o=r.n(n),i=r(635),c=r(636),a=r(1),u=r(632),s=r(21);r(637).config();var l=function(t){switch(t){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},f=["display_name","player","position","team","salary"];e.default=function(){var t=Object(a.useState)([]),e=Object(c.a)(t,2),r=e[0],n=e[1],p=function(){var t=Object(i.a)(o.a.mark((function t(){var e,r,i,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e="https://capmanbot.herokuapp.com/api//getPlayers",console.log("URL: ",e),t.next=4,fetch(e).then((function(t){return t.json()}));case 4:return r=t.sent,i=Object.values(r),c=i.filter((function(t){return"jeffreywolfeherbst"===t.display_name})),console.log("SUMMARY ARRAY: ",c),n(c),t.abrupt("return",c);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){p()}),[]),Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(u.H,{children:Object(s.jsx)(u.j,{children:Object(s.jsxs)(u.e,{children:[Object(s.jsx)(u.i,{children:"KICKERS AND QBS!"}),Object(s.jsx)(u.f,{children:Object(s.jsx)(u.m,{items:r,fields:f,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:100,scopedSlots:{status:function(t){return Object(s.jsx)("td",{children:Object(s.jsx)(u.a,{color:l(t.status),children:t.status})})}}})})]})})})})}}}]);
//# sourceMappingURL=10.0cfd6818.chunk.js.map