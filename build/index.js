(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{4:function(e,t,n){},6:function(e,t,n){},8:function(e,t,n){}}]),function(e){function t(t){for(var o,i,s=t[0],l=t[1],u=t[2],p=0,f=[];p<s.length;p++)i=s[p],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&f.push(c[i][0]),c[i]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(a&&a(t);f.length;)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,s=1;s<n.length;s++){var l=n[s];0!==c[l]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},c={0:0},r=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window.webpackJsonp=window.webpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var a=l;r.push([3,1]),n()}([function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.blocks}()},function(e,t,n){n(10),n(11),e.exports=n(12)},,function(e,t,n){},,function(e,t,n){},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(2),c=n(0),r=(n(4),n(1));n(5),wp.element.createElement;Object(o.registerBlockType)("create-block/todo-list",{title:Object(c.__)("Todo List","todo-list"),description:Object(c.__)("Description de votre bloc custom","todo-list"),category:"widgets",icon:{background:"#f03",foreground:"#fff",src:"text-page"},keywords:[Object(c.__)("list","todo-list"),Object(c.__)("organise","todo-list")],supports:{html:!1},edit:function(e){var t=e.className;return Object(r.createElement)("p",{className:t},"This is the new test edit function in custom start script")},save:function(){return el("p",null,"this is the save function")}})},function(e,t,n){"use strict";n.r(t);var o=n(1),c=n(2),r=n(0);n(6),n(7),wp.element.createElement;wp.element.createElement;Object(c.registerBlockType)("create-block/cover-block",{title:Object(r.__)("Cover block","cover-block"),description:Object(r.__)("Description de votre bloc custom","cover-block"),category:"widgets",icon:Object(o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24"},Object(o.createElement)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(o.createElement)("path",{d:"M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"})),keywords:[Object(r.__)("list","cover-block"),Object(r.__)("organise","cover-block")],supports:{html:!1},edit:function(e){var t=e.className;return Object(o.createElement)("p",{className:t},"This is the new test edit function of the cover block")},save:function(){return Object(o.createElement)("p",null,"this is the save function of the cover block")}})},function(e,t,n){"use strict";n.r(t);var o=n(1),c=n(2),r=n(0);n(8),n(9),wp.element.createElement;var i=wp.element.createElement;Object(c.registerBlockType)("create-block/menu-block",{title:Object(r.__)("menu block","menu-block"),description:Object(r.__)("Description de votre bloc custom","menu-block"),category:"widgets",icon:Object(o.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24"},Object(o.createElement)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(o.createElement)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"})),keywords:[Object(r.__)("list","menu-block"),Object(r.__)("organise","menu-block")],supports:{html:!1},edit:function(e){var t=e.className;return Object(o.createElement)("p",{className:t},'"This is the new test edit function of the menu block ')},save:function(){return i("p",null,"this is the save function of the menu block")}})}]);