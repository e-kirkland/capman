/*! For license information please see 7.9fe98b2e.chunk.js.LICENSE.txt */
(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[7],{685:function(t,r,e){"use strict";e.d(r,"a",(function(){return o}));var n=e(187);function o(){o=function(){return t};var t={},r=Object.prototype,e=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag";function s(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{s({},"")}catch(A){s=function(t,r,e){return t[r]=e}}function l(t,r,e,n){var o=r&&r.prototype instanceof p?r:p,i=Object.create(o.prototype),a=new _(n||[]);return i._invoke=function(t,r,e){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return S()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=O(a,e);if(c){if(c===h)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var u=f(t,r,e);if("normal"===u.type){if(n=e.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n="completed",e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function f(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(A){return{type:"throw",arg:A}}}t.wrap=l;var h={};function p(){}function v(){}function d(){}var y={};s(y,a,(function(){return this}));var g=Object.getPrototypeOf,m=g&&g(g(L([])));m&&m!==r&&e.call(m,a)&&(y=m);var b=d.prototype=p.prototype=Object.create(y);function w(t){["next","throw","return"].forEach((function(r){s(t,r,(function(t){return this._invoke(r,t)}))}))}function j(t,r){function o(i,a,c,u){var s=f(t[i],t,a);if("throw"!==s.type){var l=s.arg,h=l.value;return h&&"object"==Object(n.a)(h)&&e.call(h,"__await")?r.resolve(h.__await).then((function(t){o("next",t,c,u)}),(function(t){o("throw",t,c,u)})):r.resolve(h).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,u)}))}u(s.arg)}var i;this._invoke=function(t,e){function n(){return new r((function(r,n){o(t,e,r,n)}))}return i=i?i.then(n,n):n()}}function O(t,r){var e=t.iterator[r.method];if(void 0===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=void 0,O(t,r),"throw"===r.method))return h;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=f(e,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,h;var o=n.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,h):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,h)}function E(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function x(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function L(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return v.prototype=d,s(b,"constructor",d),s(d,"constructor",v),v.displayName=s(d,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===v||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,s(t,u,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},w(j.prototype),s(j.prototype,c,(function(){return this})),t.AsyncIterator=j,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new j(l(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(b),s(b,u,"Generator"),s(b,a,(function(){return this})),s(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=L,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return a.type="throw",a.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=e.call(i,"catchLoc"),u=e.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),h},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),x(e),h}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;x(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:L(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),h}},t}},686:function(t,r,e){"use strict";function n(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void e(s)}c.done?r(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var r=this,e=arguments;return new Promise((function(o,i){var a=t.apply(r,e);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}e.d(r,"a",(function(){return o}))},687:function(t,r,e){"use strict";function n(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function o(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=e){var n,o,i=[],a=!0,c=!1;try{for(e=e.call(t);!(a=(n=e.next()).done)&&(i.push(n.value),!r||i.length!==r);a=!0);}catch(u){c=!0,o=u}finally{try{a||null==e.return||e.return()}finally{if(c)throw o}}return i}}(t,r)||function(t,r){if(t){if("string"===typeof t)return n(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,r):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.d(r,"a",(function(){return o}))},698:function(t,r,e){(function(r){var n=e(699),o=e(700);function i(t){console.log("[dotenv][DEBUG] ".concat(t))}var a=/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,c=/\\n/g,u=/\n|\r|\r\n/;function s(t,r){var e=Boolean(r&&r.debug),n={};return t.toString().split(u).forEach((function(t,r){var o=t.match(a);if(null!=o){var u=o[1],s=o[2]||"",l=s.length-1,f='"'===s[0]&&'"'===s[l];"'"===s[0]&&"'"===s[l]||f?(s=s.substring(1,l),f&&(s=s.replace(c,"\n"))):s=s.trim(),n[u]=s}else e&&i("did not match key and value when parsing line ".concat(r+1,": ").concat(t))})),n}t.exports.config=function(t){var e=o.resolve(r.cwd(),".env"),a="utf8",c=!1;t&&(null!=t.path&&(e=t.path),null!=t.encoding&&(a=t.encoding),null!=t.debug&&(c=!0));try{var u=s(n.readFileSync(e,{encoding:a}),{debug:c});return Object.keys(u).forEach((function(t){Object.prototype.hasOwnProperty.call(Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://capmanbot.herokuapp.com/api/"}),t)?c&&i('"'.concat(t,'" is already defined in `process.env` and will not be overwritten')):Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API:"https://capmanbot.herokuapp.com/api/"})[t]=u[t]})),{parsed:u}}catch(l){return{error:l}}},t.exports.parse=s}).call(this,e(692))},699:function(t,r){},700:function(t,r,e){(function(t){function e(t,r){for(var e=0,n=t.length-1;n>=0;n--){var o=t[n];"."===o?t.splice(n,1):".."===o?(t.splice(n,1),e++):e&&(t.splice(n,1),e--)}if(r)for(;e--;e)t.unshift("..");return t}function n(t,r){if(t.filter)return t.filter(r);for(var e=[],n=0;n<t.length;n++)r(t[n],n,t)&&e.push(t[n]);return e}r.resolve=function(){for(var r="",o=!1,i=arguments.length-1;i>=-1&&!o;i--){var a=i>=0?arguments[i]:t.cwd();if("string"!==typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(r=a+"/"+r,o="/"===a.charAt(0))}return(o?"/":"")+(r=e(n(r.split("/"),(function(t){return!!t})),!o).join("/"))||"."},r.normalize=function(t){var i=r.isAbsolute(t),a="/"===o(t,-1);return(t=e(n(t.split("/"),(function(t){return!!t})),!i).join("/"))||i||(t="."),t&&a&&(t+="/"),(i?"/":"")+t},r.isAbsolute=function(t){return"/"===t.charAt(0)},r.join=function(){var t=Array.prototype.slice.call(arguments,0);return r.normalize(n(t,(function(t,r){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},r.relative=function(t,e){function n(t){for(var r=0;r<t.length&&""===t[r];r++);for(var e=t.length-1;e>=0&&""===t[e];e--);return r>e?[]:t.slice(r,e-r+1)}t=r.resolve(t).substr(1),e=r.resolve(e).substr(1);for(var o=n(t.split("/")),i=n(e.split("/")),a=Math.min(o.length,i.length),c=a,u=0;u<a;u++)if(o[u]!==i[u]){c=u;break}var s=[];for(u=c;u<o.length;u++)s.push("..");return(s=s.concat(i.slice(c))).join("/")},r.sep="/",r.delimiter=":",r.dirname=function(t){if("string"!==typeof t&&(t+=""),0===t.length)return".";for(var r=t.charCodeAt(0),e=47===r,n=-1,o=!0,i=t.length-1;i>=1;--i)if(47===(r=t.charCodeAt(i))){if(!o){n=i;break}}else o=!1;return-1===n?e?"/":".":e&&1===n?"/":t.slice(0,n)},r.basename=function(t,r){var e=function(t){"string"!==typeof t&&(t+="");var r,e=0,n=-1,o=!0;for(r=t.length-1;r>=0;--r)if(47===t.charCodeAt(r)){if(!o){e=r+1;break}}else-1===n&&(o=!1,n=r+1);return-1===n?"":t.slice(e,n)}(t);return r&&e.substr(-1*r.length)===r&&(e=e.substr(0,e.length-r.length)),e},r.extname=function(t){"string"!==typeof t&&(t+="");for(var r=-1,e=0,n=-1,o=!0,i=0,a=t.length-1;a>=0;--a){var c=t.charCodeAt(a);if(47!==c)-1===n&&(o=!1,n=a+1),46===c?-1===r?r=a:1!==i&&(i=1):-1!==r&&(i=-1);else if(!o){e=a+1;break}}return-1===r||-1===n||0===i||1===i&&r===n-1&&r===e+1?"":t.slice(r,n)};var o="b"==="ab".substr(-1)?function(t,r,e){return t.substr(r,e)}:function(t,r,e){return r<0&&(r=t.length+r),t.substr(r,e)}}).call(this,e(692))},740:function(t,r,e){"use strict";e.r(r);var n=e(685),o=e(686),i=e(687),a=e(1),c=e(684),u=(e(39),e(188),e(24));e(698).config();var s=function(t){switch(t){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},l=["display_name","player","position","team","salary","war","value"];r.default=function(){var t=Object(a.useState)([]),r=Object(i.a)(t,2),e=r[0],f=r[1],h=function(){var t=Object(o.a)(Object(n.a)().mark((function t(){var r,e,o;return Object(n.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r="https://capmanbot.herokuapp.com/api//getPlayers",console.log("URL: ",r),t.next=4,fetch(r).then((function(t){return t.json()}));case 4:return e=t.sent,o=Object.values(e),console.log("SUMMARY ARRAY: ",o),f(o),t.abrupt("return",e);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){h()}),[]),Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(c.H,{children:Object(u.jsx)(c.j,{children:Object(u.jsxs)(c.e,{children:[Object(u.jsx)(c.i,{children:"ALL PLAYERS"}),Object(u.jsx)(c.f,{children:Object(u.jsx)(c.m,{items:e,fields:l,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:100,scopedSlots:{status:function(t){return Object(u.jsx)("td",{children:Object(u.jsx)(c.a,{color:s(t.status),children:t.status})})}}})})]})})})})}}}]);
//# sourceMappingURL=7.9fe98b2e.chunk.js.map