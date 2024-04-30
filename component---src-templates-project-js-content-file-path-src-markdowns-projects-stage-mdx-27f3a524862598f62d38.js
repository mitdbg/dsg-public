"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[930],{2712:function(e,t,a){a.r(t),a.d(t,{Head:function(){return b},default:function(){return w}});var n=a(8453),r=a(6540);function i(e){const t=Object.assign({p:"p",a:"a",h2:"h2"},(0,n.RP)(),e.components);return r.createElement(r.Fragment,null,r.createElement(t.p,null,"Query performance (e.g., execution time) prediction is a critical component of modern DBMSes. As a pioneering cloud data warehouse, Amazon Redshift relies on an accurate execution time prediction for many downstream tasks, ranging from high-level optimizations, such as automatically creating materialized views, to low-level tasks on the critical path of query execution, such as admission, scheduling, and execution resource control. Unfortunately, many existing execution time prediction techniques, including those used in Redshift, suffer from cold start issues, inaccurate estimation, and are not robust against workload/data changes.\nIn this paper, we propose a novel hierarchical execution time predictor: the Stage predictor. The Stage predictor is designed to leverage the unique characteristics and challenges faced by Redshift. The Stage predictor consists of three model states: an execution time cache, a lightweight local model optimized for a specific DB instance with uncertainty measurement, and a complex global model that is transferable across all instances in Redshift. We design a systematic approach to use these models that best leverages optimality (cache), instance-optimization (local model), and transferable knowledge about Redshift (global model). Experimentally, we show that the Stage predictor makes more accurate and robust predictions while maintaining a practical inference latency and memory overhead. Overall, the Stage predictor can improve the average query execution latency by 20% on these instances compared to the prior query performance predictor in Redshift."),"\n",r.createElement(t.p,null,"For more details, please refer to our ",r.createElement(t.a,{href:"https://arxiv.org/pdf/2403.02286.pdf"},"SIGMOD 2024 paper"),"."),"\n",r.createElement(t.h2,null,"Participants"),"\n",r.createElement(t.p,null,"Ziniu Wu, Parimarjan Negi, Tim Kraska from DSG and many others from AWS"))}var o=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.RP)(),e.components);return t?r.createElement(t,e,r.createElement(i,e)):i(e)},c=(a(4794),a(7440)),l=a(2532),s=a(5365),m=a(2568),d=a(5238),u=a(7528),h=a(113),p=a(1144);const f=m.default.h2.withConfig({displayName:"project__ProjectTitle",componentId:"sc-49rh51-0"})([""," color:white;padding-left:1rem;"],h.nH),g=(0,m.default)(c.A).withConfig({displayName:"project__StyledBg",componentId:"sc-49rh51-1"})(["&::before,&::after{filter:brightness(40%);}display:flex;align-items:center;"]),y=e=>{let{data:t,children:a}=e;const{mdx:{frontmatter:{image:i,title:o}}}=t,c=(0,s.f0)((0,l.c)(i));return r.createElement(d.A,null,r.createElement(g,Object.assign({Tag:"div"},c,{style:{height:"400px"},className:"align-middle",backgroundColor:"#ebeef2"}),r.createElement(f,null,o)),r.createElement(p.mO,null,r.createElement(n.xA,null,a)))},b=()=>r.createElement(u.A,{title:"Project"});function w(e){return r.createElement(y,e,r.createElement(o,e))}}}]);
//# sourceMappingURL=component---src-templates-project-js-content-file-path-src-markdowns-projects-stage-mdx-27f3a524862598f62d38.js.map