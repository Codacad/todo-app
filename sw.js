if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const t=e=>n(e,o),l={module:{uri:o},exports:c,require:t};i[o]=Promise.all(s.map((e=>l[e]||t(e)))).then((e=>(r(...e),c)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-0gCKH0Xo.css",revision:null},{url:"assets/index-Bjanje_F.js",revision:null},{url:"index.html",revision:"895463d68ebae58d332473dc122b370a"},{url:"registerSW.js",revision:"808ec51dd8da9a83a1f6f81072b384ac"},{url:"android-chrome-192x192.png",revision:"9e160ef8fc89eb3ab2645776c9fbfa2e"},{url:"android-chrome-512x512.png",revision:"b3af5c54bcc869221c28caece95f1941"},{url:"apple-touch-icon.png",revision:"ba63f2785392f295b1f0f23e1b325710"},{url:"maskable_icon.png",revision:"3276aa7d52e257490a9469ae07909f74"},{url:"manifest.webmanifest",revision:"2eafcbee04a48636b4e75e85ade8d1b6"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
