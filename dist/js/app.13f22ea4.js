(function(e){function n(n){for(var a,u,h=n[0],o=n[1],f=n[2],d=0,i=[];d<h.length;d++)u=h[d],Object.prototype.hasOwnProperty.call(t,u)&&t[u]&&i.push(t[u][0]),t[u]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);s&&s(n);while(i.length)i.shift()();return r.push.apply(r,f||[]),c()}function c(){for(var e,n=0;n<r.length;n++){for(var c=r[n],a=!0,u=1;u<c.length;u++){var h=c[u];0!==t[h]&&(a=!1)}a&&(r.splice(n--,1),e=o(o.s=c[0]))}return e}var a={},u={app:0},t={app:0},r=[];function h(e){return o.p+"js/"+({}[e]||e)+"."+{"chunk-0f879e9e":"80675915","chunk-2d221495":"614c14e2","chunk-48c112a4":"d80ab41c","chunk-8bd915fa":"9c3f253e","chunk-682f610d":"8cc1647a","chunk-15786adc":"879a4d60","chunk-1f5bed82":"88301a2c","chunk-317162e0":"0e977475","chunk-3e11ec0a":"666d2f01","chunk-51a97abe":"48fbb4fd","chunk-5adbb816":"d7090dca","chunk-6ade0620":"81530630","chunk-77ce8511":"27872671","chunk-7fb966b8":"163d1e9d","chunk-9ead4c48":"4a804689","chunk-b5020c68":"393c7d84","chunk-c22b3aae":"8a471b54","chunk-cf0f7a58":"2064bd7b","chunk-e6685b02":"07a37b83","chunk-f4396f7c":"5441c85c","chunk-70bcc4ec":"3581f170","chunk-9eb6805c":"2002772c","chunk-05781f3a":"0a2b51d0","chunk-0fc8bf0a":"30a3d5fc","chunk-10660ed8":"c4794589","chunk-2d215fa4":"85061bab","chunk-73cfeffc":"c2f69dc6","chunk-2d216214":"cece44c1","chunk-2d216257":"1caeb235","chunk-fff0f504":"7a1c8739"}[e]+".js"}function o(n){if(a[n])return a[n].exports;var c=a[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.e=function(e){var n=[],c={"chunk-0f879e9e":1,"chunk-8bd915fa":1,"chunk-15786adc":1,"chunk-1f5bed82":1,"chunk-317162e0":1,"chunk-3e11ec0a":1,"chunk-51a97abe":1,"chunk-5adbb816":1,"chunk-6ade0620":1,"chunk-77ce8511":1,"chunk-7fb966b8":1,"chunk-9ead4c48":1,"chunk-b5020c68":1,"chunk-c22b3aae":1,"chunk-cf0f7a58":1,"chunk-e6685b02":1,"chunk-f4396f7c":1,"chunk-70bcc4ec":1,"chunk-05781f3a":1,"chunk-0fc8bf0a":1,"chunk-10660ed8":1,"chunk-73cfeffc":1};u[e]?n.push(u[e]):0!==u[e]&&c[e]&&n.push(u[e]=new Promise((function(n,c){for(var a="css/"+({}[e]||e)+"."+{"chunk-0f879e9e":"12e4eec3","chunk-2d221495":"31d6cfe0","chunk-48c112a4":"31d6cfe0","chunk-8bd915fa":"edfc5209","chunk-682f610d":"31d6cfe0","chunk-15786adc":"084f94ff","chunk-1f5bed82":"c3b0926c","chunk-317162e0":"062a9446","chunk-3e11ec0a":"a4a54ddf","chunk-51a97abe":"515b38bc","chunk-5adbb816":"6867f598","chunk-6ade0620":"dfbde0a6","chunk-77ce8511":"1cb84046","chunk-7fb966b8":"56f28a12","chunk-9ead4c48":"26a2d3da","chunk-b5020c68":"060a9c94","chunk-c22b3aae":"dc677706","chunk-cf0f7a58":"1c5e10e2","chunk-e6685b02":"2ae7c07f","chunk-f4396f7c":"d1bc191d","chunk-70bcc4ec":"af694eb3","chunk-9eb6805c":"31d6cfe0","chunk-05781f3a":"2dcf9e0e","chunk-0fc8bf0a":"3337a975","chunk-10660ed8":"f6ede16a","chunk-2d215fa4":"31d6cfe0","chunk-73cfeffc":"66a36263","chunk-2d216214":"31d6cfe0","chunk-2d216257":"31d6cfe0","chunk-fff0f504":"31d6cfe0"}[e]+".css",t=o.p+a,r=document.getElementsByTagName("link"),h=0;h<r.length;h++){var f=r[h],d=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(d===a||d===t))return n()}var i=document.getElementsByTagName("style");for(h=0;h<i.length;h++){f=i[h],d=f.getAttribute("data-href");if(d===a||d===t)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var a=n&&n.target&&n.target.src||t,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete u[e],s.parentNode.removeChild(s),c(r)},s.href=t;var l=document.getElementsByTagName("head")[0];l.appendChild(s)})).then((function(){u[e]=0})));var a=t[e];if(0!==a)if(a)n.push(a[2]);else{var r=new Promise((function(n,c){a=t[e]=[n,c]}));n.push(a[2]=r);var f,d=document.createElement("script");d.charset="utf-8",d.timeout=120,o.nc&&d.setAttribute("nonce",o.nc),d.src=h(e);var i=new Error;f=function(n){d.onerror=d.onload=null,clearTimeout(s);var c=t[e];if(0!==c){if(c){var a=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.src;i.message="Loading chunk "+e+" failed.\n("+a+": "+u+")",i.name="ChunkLoadError",i.type=a,i.request=u,c[1](i)}t[e]=void 0}};var s=setTimeout((function(){f({type:"timeout",target:d})}),12e4);d.onerror=d.onload=f,document.head.appendChild(d)}return Promise.all(n)},o.m=e,o.c=a,o.d=function(e,n,c){o.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:c})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,n){if(1&n&&(e=o(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(o.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)o.d(c,a,function(n){return e[n]}.bind(null,a));return c},o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,"a",n),n},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},o.p="/",o.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],d=f.push.bind(f);f.push=n,f=f.slice();for(var i=0;i<f.length;i++)n(f[i]);var s=d;r.push([0,"chunk-vendors"]),c()})({0:function(e,n,c){e.exports=c("56d7")},"034f":function(e,n,c){"use strict";c("85ec")},"56d7":function(e,n,c){"use strict";c.r(n);c("e260"),c("e6cf"),c("cca6"),c("a79d");var a=c("2b0e"),u=function(){var e=this,n=e.$createElement,c=e._self._c||n;return c("v-app",{attrs:{id:"inspire"}},[c("v-main",{staticStyle:{background:"#F7F7F7"}},[c("v-container",{staticClass:"py-8 px-6",attrs:{fluid:""}},[c("router-view")],1)],1)],1)},t=[],r={name:"App",data:function(){return{cards:["Today","Yesterday"]}},methods:{}},h=r,o=(c("034f"),c("2877")),f=c("6544"),d=c.n(f),i=c("7496"),s=c("a523"),l=c("f6c4"),k=Object(o["a"])(h,u,t,!1,null,null,null),b=k.exports;d()(k,{VApp:i["a"],VContainer:s["a"],VMain:l["a"]});c("5363");var p=c("f309");a["a"].use(p["a"]);var m=new p["a"]({icons:{iconfont:"mdi"}}),v=(c("d3b7"),c("3ca3"),c("ddb0"),c("8c4f"));a["a"].use(v["a"]);var y=[{title:"Login Page",path:"/",name:"login",component:function(){return Promise.all([c.e("chunk-48c112a4"),c.e("chunk-9eb6805c"),c.e("chunk-73cfeffc")]).then(c.bind(null,"a55b"))}},{path:"/dashboard",name:"dashboard",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-9eb6805c"),c.e("chunk-0fc8bf0a")]).then(c.bind(null,"7277"))}},{path:"/assets/all",name:"assets",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-15786adc")]).then(c.bind(null,"082f"))}},{path:"/assets/deployed",name:"assets-deployed",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-1f5bed82")]).then(c.bind(null,"33c3"))}},{path:"/assets/RTD",name:"assets-RTD",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-3e11ec0a")]).then(c.bind(null,"1d9c"))}},{path:"/assets/archived",name:"assets-archived",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-77ce8511")]).then(c.bind(null,"f3db"))}},{path:"/accessories/all",name:"accessories",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-317162e0")]).then(c.bind(null,"1e66"))}},{path:"/accessories/deployed",name:"accessories-deployed",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-5adbb816")]).then(c.bind(null,"ac76"))}},{path:"/accessories/archived",name:"accessories-archived",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-51a97abe")]).then(c.bind(null,"6661"))}},{path:"/licenses/all",name:"licenses",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-cf0f7a58")]).then(c.bind(null,"0518"))}},{path:"/licenses/deployed",name:"licenses-deployed",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-c22b3aae")]).then(c.bind(null,"879e"))}},{path:"/licenses/returned",name:"licenses-returned",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-9ead4c48")]).then(c.bind(null,"caa0"))}},{path:"/licenses/archived",name:"licenses-archived",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-b5020c68")]).then(c.bind(null,"d927"))}},{path:"/users/employees",name:"users-employees",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-f4396f7c")]).then(c.bind(null,"435c"))}},{path:"/users-employees/archived",name:"employees-archived",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-e6685b02")]).then(c.bind(null,"889d"))}},{path:"/admin-profile",name:"admin-profile",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-9eb6805c"),c.e("chunk-05781f3a")]).then(c.bind(null,"a9f0"))}},{path:"/manage-admins",name:"manage-admins",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-9eb6805c"),c.e("chunk-10660ed8")]).then(c.bind(null,"a9cb"))}},{path:"/admin-settings",name:"admin-settings",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-2d221495")]).then(c.bind(null,"ca67"))}},{path:"/reports/assets",name:"reports-assets",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-6ade0620")]).then(c.bind(null,"7b8e"))}},{path:"/reports/accessories",name:"reports-accessories",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-682f610d"),c.e("chunk-7fb966b8")]).then(c.bind(null,"fc87"))}},{path:"/reports/licenses",name:"reports-licenses",component:function(){return Promise.all([c.e("chunk-0f879e9e"),c.e("chunk-48c112a4"),c.e("chunk-8bd915fa"),c.e("chunk-70bcc4ec")]).then(c.bind(null,"b2c5"))}},{path:"/logout",name:"logout",component:function(){return c.e("chunk-2d215fa4").then(c.bind(null,"c100"))}}],g=new v["a"]({mode:"history",base:"/",routes:y}),P=g,w=c("7207"),O=c.n(w);a["a"].use(O.a),a["a"].config.productionTip=!1,new a["a"]({vuetify:m,router:P,render:function(e){return e(b)}}).$mount("#app")},"85ec":function(e,n,c){}});
//# sourceMappingURL=app.13f22ea4.js.map