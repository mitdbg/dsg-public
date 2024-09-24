"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[139],{8620:function(e,n,t){t.r(n),t.d(n,{Head:function(){return w},default:function(){return C}});var a=t(8453),r=t(6540),i=t(307),o=t(4506);var s=e=>{let{items:n}=e;const t=function(e){const n=(0,o.A)(e);for(let t=n.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1)),a=n[t];n[t]=n[e],n[e]=a}return n}(n);return r.createElement(r.Fragment,null,t.join(", "))};function l(e){const n=Object.assign({h1:"h1",p:"p",h3:"h3"},(0,a.RP)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h1,null,"BRAD: Simplifying Cloud Data Processing with Learned Automated Data Meshes"),"\n",r.createElement(n.p,null,"The last decade of database research has led to the prevalence of specialized\nsystems for different workloads. Consequently, organizations often rely on a\ncombination of specialized systems, organized in a Data Mesh. Data meshes\npresent significant challenges for system administrators, including picking the\nright system for each workload, moving data between systems, maintaining\nconsistency, and correctly configuring each system. Many non-expert end users\n(e.g., data analysts or app developers) either cannot solve their business\nproblems, or suffer from sub-optimal performance or cost due to this complexity.\nWe envision BRAD, a cloud system that automatically integrates and manages data\nand systems into an instance-optimized data mesh, allowing users to efficiently\nstore and query data under a unified data model (i.e., relational tables)\nwithout knowledge of underlying system details. With machine learning, BRAD\nautomatically deduces the strengths and weaknesses of each engine through a\ncombination of offline training and online probing. Then, BRAD uses these\ninsights to route queries to the most suitable (combination of) system(s) for\nefficient execution. Furthermore, BRAD automates configuration tuning, resource\nscaling, and data migration across component systems, and makes recommendations\nfor more impactful decisions, such as adding or removing systems. As such, BRAD\nexemplifies a new class of systems that utilize machine learning and the cloud\nto make complex data processing more accessible to end users, raising numerous\nnew problems in database systems, machine learning, and the cloud."),"\n",r.createElement(n.p,null,r.createElement("a",{href:"https://doi.org/10.14778/3681954.3682026",target:"_blank"},"Read the Paper (VLDB 2024)"),"\n|\n",r.createElement("a",{href:"https://doi.org/10.48550/arxiv.2407.15363",target:"_blank"},"Read the Extended Version (arXiv)"),"\n|\n",r.createElement(i.A,{withToggle:!0},"@article{brad-yu24,\n  author = {Yu, Geoffrey X. and Wu, Ziniu and Kossmann, Ferdi and Li, Tianyu \n    and Markakis, Markos and Ngom, Amadou and Madden, Samuel and Kraska, Tim},\n  doi = {10.14778/3681954.3682026},\n  journal = {{Proceedings of the VLDB Endowment}},\n  month = {8},\n  number = {11},\n  pages = {3629–-3643},\n  title = {{Blueprinting the Cloud: Unifying and Automatically Optimizing \n    Cloud Data Infrastructures with BRAD}},\n  volume = {17},\n  year = {2024},\n}")),"\n",r.createElement(n.p,null,r.createElement("a",{href:"https://doi.org/10.14778/3611479.3611526",target:"_blank"},"Read the Vision Paper (VLDB 2023)"),"\n|\n",r.createElement(i.A,{withToggle:!0},"@article{brad-kraska23,\n  author = {Kraska, Tim and Li, Tianyu and Madden, Samuel and Markakis, Markos\n    and Ngom, Amadou and Wu, Ziniu and Yu, Geoffrey X.},\n  doi = {10.14778/3611479.3611526},\n  journal = {{Proceedings of the VLDB Endowment}},\n  month = {8},\n  number = {11},\n  pages = {3293--3301},\n  title = {{Check Out the Big Brain on BRAD: Simplifying Cloud Data Processing\n    with Learned Automated Data Meshes}},\n  volume = {16},\n  year = {2023},\n}")),"\n",r.createElement("a",{href:"https://github.com/mitdbg/brad/",target:"_blank"},"Check out the Code"),"\n",r.createElement("p"),"\n",r.createElement(n.h3,null,"Project Participants"),"\n",r.createElement("p",null,r.createElement(s,{items:["Ferdinand Kossmann","Tim Kraska","Tianyu Li","Samuel Madden","Markos Markakis","Amadou Ngom","Ziniu Wu","Geoffrey Yu"]})),"\n",r.createElement("p",null,"(Participant order is randomized.)"))}var c=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.RP)(),e.components);return n?r.createElement(n,e,r.createElement(l,e)):l(e)},d=(t(4794),t(7440)),m=t(2532),u=t(5365),h=t(2568),g=t(5238),f=t(7528),p=t(113),y=t(1144);const b=h.default.h2.withConfig({displayName:"project__ProjectTitle",componentId:"sc-49rh51-0"})([""," color:white;padding-left:1rem;"],p.nH),k=(0,h.default)(d.A).withConfig({displayName:"project__StyledBg",componentId:"sc-49rh51-1"})(["&::before,&::after{filter:brightness(40%);}display:flex;align-items:center;"]),E=e=>{let{data:n,children:t}=e;const{mdx:{frontmatter:{image:i,title:o}}}=n,s=(0,u.f0)((0,m.c)(i));return r.createElement(g.A,null,r.createElement(k,Object.assign({Tag:"div"},s,{style:{height:"400px"},className:"align-middle",backgroundColor:"#ebeef2"}),r.createElement(b,null,o)),r.createElement(y.mO,null,r.createElement(a.xA,null,t)))},w=()=>r.createElement(f.A,{title:"Project"});function C(e){return r.createElement(E,e,r.createElement(c,e))}},307:function(e,n,t){var a=t(6540);const r=e=>{let{children:n,handleCopyClick:t}=e;return a.createElement("div",{className:"bibtex",style:{position:"relative",backgroundColor:"#f5f5f5",padding:"15px",borderRadius:"3px",margin:"15px 0"}},a.createElement("pre",{style:{margin:0,fontSize:"0.9em"}},n),a.createElement("button",{className:"bibtex-copy",onClick:t,style:{position:"absolute",top:"10px",right:"10px",cursor:"pointer",backgroundColor:"#aaa",color:"#fff",border:"0",borderRadius:"3px",padding:"5px",outline:"none",fontSize:"0.8em",fontFamily:"sans-serif"}},"Copy"))};n.A=e=>{let{children:n,withToggle:t}=e;const{0:i,1:o}=(0,a.useState)(!1),s=e=>{o(!i),e.preventDefault()},l=()=>{navigator.clipboard.writeText(n)};return t?i?a.createElement(a.Fragment,null,a.createElement("a",{href:"#",onClick:s},"Hide BibTeX"),a.createElement(r,{handleCopyClick:l},n)):a.createElement(a.Fragment,null,a.createElement("a",{href:"#",onClick:s},"View BibTeX")):a.createElement(r,{handleCopyClick:l},n)}}}]);
//# sourceMappingURL=component---src-templates-project-js-content-file-path-src-markdowns-projects-brad-mdx-a7ca3d35f11ccab5aaa2.js.map