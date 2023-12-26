"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[496],{4072:function(e,t,a){a.r(t),a.d(t,{Head:function(){return b},default:function(){return E}});var n=a(1151),i=a(7294);function r(e){const t=Object.assign({p:"p",a:"a",h2:"h2"},(0,n.ah)(),e.components);return i.createElement(i.Fragment,null,i.createElement(t.p,null,"Cardinality estimation is one of the most fundamental and challenging problems in query optimization. Neither classical nor learning-based methods yield satisfactory performance when estimating the cardinality of the join queries. They either rely on simplified assumptions leading to ineffective cardinality estimates or build large models to understand the data distributions, leading to long planning times and a lack of generalizability across queries.\nWe propose a new framework FactorJoin for estimating join queries. FactorJoin combines the idea behind the classical join-histogram method to efficiently handle joins with the learning-based methods to accurately capture attribute correlation. Specifically, FactorJoin scans every table in a DB and builds single-table conditional distributions during an offline preparation phase. When a join query comes, FactorJoin translates it into a factor graph model over the learned distributions to effectively and efficiently estimate its cardinality. Unlike existing learning-based methods, FactorJoin does not need to de-normalize joins upfront or require executed query workloads to train the model. Since it only relies on single-table statistics, FactorJoin has small space overhead and is extremely easy to train and maintain. In our evaluation, FactorJoin can produce more effective estimates than the previous state-of-the- art learning-based methods, with 40x less estimation latency, 100x smaller model size, and 100x faster training speed at comparable or better accuracy. In addition, FactorJoin can estimate 10,000 sub-plan queries within one second to optimize the query plan, which is very close to the traditional cardinality estimators in commercial DBMS."),"\n",i.createElement(t.p,null,"For more details, please refer to our ",i.createElement(t.a,{href:"https://dl.acm.org/doi/pdf/10.1145/3588721"},"SIGMOD 2023 paper"),"."),"\n",i.createElement(t.h2,null,"Participants"),"\n",i.createElement(t.p,null,"Ziniu Wu, Parimarjan Negi, Mohammad Alizadeh, Tim Kraska, Samuel Madden"))}var o=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.ah)(),e.components);return t?i.createElement(t,e,i.createElement(r,e)):r(e)},l=(a(1883),a(8738)),s=a(8032),c=a(5624),d=a(2788),m=a(3544),u=a(9357),h=a(7341),p=a(637);const f=d.default.h2.withConfig({displayName:"project__ProjectTitle",componentId:"sc-49rh51-0"})([""," color:white;padding-left:1rem;"],h.n_),g=(0,d.default)(l.Z).withConfig({displayName:"project__StyledBg",componentId:"sc-49rh51-1"})(["&::before,&::after{filter:brightness(40%);}display:flex;align-items:center;"]),y=e=>{let{data:t,children:a}=e;const{mdx:{frontmatter:{image:r,title:o}}}=t,l=(0,c.to)((0,s.c)(r));return i.createElement(m.Z,null,i.createElement(g,Object.assign({Tag:"div"},l,{style:{height:"400px"},className:"align-middle",backgroundColor:"#ebeef2"}),i.createElement(f,null,o)),i.createElement(p.im,null,i.createElement(n.Zo,null,a)))},b=()=>i.createElement(u.Z,{title:"Project"});function E(e){return i.createElement(y,e,i.createElement(o,e))}}}]);
//# sourceMappingURL=component---src-templates-project-js-content-file-path-src-markdowns-projects-factorjoin-mdx-21761657a7e6f24fb32c.js.map