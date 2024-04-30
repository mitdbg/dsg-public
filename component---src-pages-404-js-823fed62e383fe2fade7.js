"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[125],{5238:function(e,t,n){n.d(t,{A:function(){return u}});var a=n(6540),r=n(4794),i=n(2568);var l=n(1144);const o=i.default.text.withConfig({displayName:"navbar__NavText",componentId:"sc-peym1u-0"})(["font-size:110%;font-family:'Libre Franklin',sans-serif;color:#283033;transition:0.3s;:hover{color:#B5B4B4;transition:0.3s;}"]),s=i.default.nav.withConfig({displayName:"navbar__NavbarWrapper",componentId:"sc-peym1u-1"})(["z-index:1;"]),c=i.default.img.withConfig({displayName:"navbar__Image",componentId:"sc-peym1u-2"})(["max-height:80px;@media (max-width:768px){max-height:30px;}"]),m=i.default.ul.withConfig({displayName:"navbar__RightUL",componentId:"sc-peym1u-3"})(["margin-left:1rem;@media (max-width:768px){margin-left:0;}"]);var d=e=>{let{dsail:t}=e;const n=t?"/images/dsail-logo.png":"/images/dsg-logo.png";return a.createElement(s,{className:"navbar sticky-top navbar-expand-lg",style:{fontFamily:"Libre Franklin",backgroundColor:"#FFFFFF",boxShadow:"0px 5px 6px #00000029",opacity:1,padding:"0 5rem"}},a.createElement("div",{className:"my-2 order-0 order-md-1 position-relative",style:{textAlign:"center"}},a.createElement(l.ah,{to:"/"},a.createElement(c,{src:n,className:"img-fluid"})),a.createElement("button",{className:"navbar-toggler collapsed",type:"button","data-toggle":"collapse","data-target":".dual-collapse2","aria-expanded":"false"},a.createElement("span",{className:"navbar-toggler-icon"},a.createElement("img",{src:"/images/menu.svg",style:{transform:"translate(0, 0.2rem)"}})))),a.createElement("div",{className:"navbar-collapse w-100 dual-collapse2 order-2 order-md-2 collapse"},a.createElement(m,{className:"navbar-nav ml-auto text-center"},a.createElement("li",{className:"nav-item active"},a.createElement(r.Link,{className:"nav-link",to:"/"},a.createElement(o,null," Home "))),a.createElement("li",{className:"nav-item"},a.createElement(r.Link,{className:"nav-link",to:"/projects"},a.createElement(o,null," Projects "))),a.createElement("li",{className:"nav-item"},a.createElement(r.Link,{className:"nav-link",to:"/people"},a.createElement(o,null," People "))),a.createElement("li",{className:"nav-item"},a.createElement(r.Link,{className:"nav-link",to:"/publications"},a.createElement(o,null," Publications "))),a.createElement("li",{className:"nav-item"},a.createElement(r.Link,{className:"nav-link",to:"/dsail"},a.createElement(o,null," DSAIL "))))))};const p=i.default.div.withConfig({displayName:"layout__Footer",componentId:"sc-2gkh1u-0"})(["margin-top:2rem;background-color:",";color:",";font-family:'Roboto',sans-serif;text-align:center;padding:1rem;font-size:80%;a{color:"," !important;}"],(e=>{let{dsail:t}=e;return t?"rgba(177,0,28,0.8)":"rgba(233,210,73,1)"}),(e=>{let{dsail:t}=e;return t?"#FFFFFF":"#000000"}),(e=>{let{dsail:t}=e;return t?"#FFFFFF":"#000000"}));var u=e=>{let{children:t,dsail:n=!1}=e;(0,r.useStaticQuery)("3649515864");return a.createElement(a.Fragment,null,a.createElement(d,{dsail:n}),a.createElement("div",{style:{margin:"0 auto",maxWidth:"var(--size-content)",padding:"var(--size-gutter)"}},a.createElement("main",null,t),a.createElement(p,{dsail:n},"© ",(new Date).getFullYear()," · Built with 💖 by DSG @ MIT."," ",a.createElement("a",{href:"https://accessibility.mit.edu/"},"Accessibility"),".")))}},7528:function(e,t,n){var a=n(6540),r=n(4794);t.A=function(e){var t,n;let{description:i,title:l,children:o}=e;const{site:s}=(0,r.useStaticQuery)("465186600"),c=i||s.siteMetadata.description,m=null===(t=s.siteMetadata)||void 0===t?void 0:t.title,{ogImage:d,ogTitle:p}=s.siteMetadata,[u,g]=a.useState(!1);return a.createElement(a.Fragment,null,a.createElement("title",null,m?l+" | "+m:l),a.createElement("meta",{name:"description",content:c}),a.createElement("meta",{property:"og:title",content:p}),a.createElement("meta",{property:"og:description",content:c}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:image",content:d}),a.createElement("meta",{name:"twitter:card",content:"summary"}),a.createElement("meta",{name:"twitter:creator",content:(null===(n=s.siteMetadata)||void 0===n?void 0:n.author)||""}),a.createElement("meta",{name:"twitter:title",content:p}),a.createElement("meta",{name:"twitter:description",content:c}),a.createElement("meta",{property:"twitter:image",content:d}),a.createElement(r.Script,{src:"https://cdn.jsdelivr.net/npm/swiper@9/swiper-element-bundle.min.js"}),a.createElement(r.Script,{src:"https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js",integrity:"sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj",crossorigin:"anonymous",onLoad:()=>g(!0)}),a.createElement(r.Script,{src:"https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",integrity:"sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN",crossorigin:"anonymous"}),u&&a.createElement(r.Script,{src:"https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js",integrity:"sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct",crossorigin:"anonymous"}),o)}},1144:function(e,t,n){n.d(t,{Hv:function(){return p},LG:function(){return s},Ox:function(){return m},Qd:function(){return d},ah:function(){return c},hE:function(){return l},mO:function(){return o}});var a=n(2568),r=n(4794),i=n(113);const l=a.default.div.withConfig({displayName:"shared__Title",componentId:"sc-1pzwdb1-0"})([""," padding:0rem 1rem;text-align:left;font-size:30px;"," letter-spacing:0px;color:#283033;opacity:1;"],(e=>{let{noBorder:t}=e;return t?"":"border-left: 12px solid #D12D4A;"}),i.bl),o=a.default.div.withConfig({displayName:"shared__Wrapper",componentId:"sc-1pzwdb1-1"})([""," padding:4rem 10rem;padding-bottom:1rem;text-align:justify;@media (max-width:768px){padding:1rem;}"],(e=>{let{font:t=i.cJ}=e;return t})),s=a.default.a.withConfig({displayName:"shared__StyledAnchor",componentId:"sc-1pzwdb1-2"})(["color:#000000 !important;text-decoration:none !important;"]),c=(0,a.default)(r.Link).withConfig({displayName:"shared__StyledLink",componentId:"sc-1pzwdb1-3"})(["color:#000000 !important;text-decoration:none !important;"]),m=a.default.div.withConfig({displayName:"shared__CardWrapper",componentId:"sc-1pzwdb1-4"})(["background-color:",";border-radius:24px;box-shadow:0px 0px 15px rgba(0,0,0,0.06);padding:2rem 1rem;margin-top:2rem;display:flex;flex-wrap:wrap;margin-right:1rem;:hover{transform:scale(1.01);}transition:all 0.3s;overflow:hidden;@media screen and (max-width:768px){padding:2rem 0;margin:1rem 0.5rem;}"],"#FFFFFF"),d=a.default.h6.withConfig({displayName:"shared__NoLinkTitle",componentId:"sc-1pzwdb1-5"})([""," color:#464242;"],i.nH),p=a.default.h6.withConfig({displayName:"shared__LinkTitle",componentId:"sc-1pzwdb1-6"})([""," color:#464242;transition:0.3s;:hover{color:#B5B4B4;transition:0.3s;}"],i.nH)},3331:function(e,t,n){n.r(t),n.d(t,{Head:function(){return l}});var a=n(6540),r=n(5238),i=n(7528);const l=()=>a.createElement(i.A,{title:"404: Not Found"});t.default=()=>a.createElement(r.A,null,a.createElement("h1",null,"404: Not Found"),a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},113:function(e,t,n){n.d(t,{bl:function(){return i},cJ:function(){return a},nH:function(){return r}});const a="font-family: 'Georgia', serif;",r="\n  font-family: 'Libre Franklin', sans-serif;\n  font-weight: 700;\n",i="\n  font-family: 'Libre Franklin', sans-serif;\n  font-weight: 900;\n"}}]);
//# sourceMappingURL=component---src-pages-404-js-823fed62e383fe2fade7.js.map