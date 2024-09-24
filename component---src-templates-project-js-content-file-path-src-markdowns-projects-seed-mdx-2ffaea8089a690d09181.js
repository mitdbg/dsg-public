"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[979],{7513:function(e,t,a){a.r(t),a.d(t,{Head:function(){return v},default:function(){return w}});var n=a(8453),i=a(6540);function o(e){const t=Object.assign({p:"p",a:"a",h3:"h3"},(0,n.RP)(),e.components);return i.createElement(i.Fragment,null,i.createElement(t.p,null,'Data curation tasks that discover, extract, transform, clean, and integrate data are critical for a wide variety of organizations. Despite significant efforts from the data management community, many sources still report that data scientists still spend over 80% of their time on these tasks. A key reason for this is that applications in different domains have diverse requirements, with no one-size-fits-all solution existing even for single data curation tasks.\nFor example, for the task of data extraction, extracting monetary amounts can be effectively done by a regular expression such as that searches for a dollar sign followed by digits separated by commas and periods, i.e., "$\\d[\\d|,|.]", while extracting human names requires a totally different method such as searching for capitalized words near salutations like "Mr." or "Ms.".\nBecause of cases like this, generic off-the-shelf tools are rarely sufficient.\nInstead, data scientists often have to develop application-specific solutions that are tailored to both the dataset and the problem domain, such as domain-specific code (like the regex above) or machine learning models trained on a large number of annotated examples to perform these types of tasks.\nAs a result, devising a data curation solution for a particular scenario is time-consuming, with multiple rounds of requirement generation, training data collection, model/algorithm development, and testing with both data scientists and domain experts, and rarely reusable from one deployment to the next.\nThis can be quite costly for enterprises -- for example, Citadel employs over 50 data management experts to deliver high-quality cleaned data to their analysts -- costing them tens of millions each year.'),"\n",i.createElement(t.p,null,"Our Approach: SEED\nIn this work, we propose SEED, an LLM-as-compiler approach which, allows users to describe a data curation task via a natural language specification, along with an input data. SEED automatically compiles this specification into an instance-optimized solution tailored for the data and application at hand."),"\n",i.createElement(t.p,null,"The key insight is that LLMs -- with their impressive ability to generate code, perform reasoning, understand the semantics of data, and encode common knowledge -- will lead to a paradigm shift in data curation research and make it possible to automatically construct data curation solutions on the fly. Indeed, prior work has shown that LLMs can be remarkably effective at addressing specific data curation tasks.\nUnlike these prior works, which rely directly on LLMs for processing every record in a data curation task, SEED instead aims to use LLMs to generate domain-specific modules for different data curation tasks, some of which may involve direct invocation of LLMs and some of which are LLM-generated but do not use the LLM once they have been produced."),"\n",i.createElement(t.p,null,"Specifically, the SEED compiler generates an execution pipeline composed of code, small machine learning models, as well as direct invocations of the LLM itself on (some) individual data records. In this execution pipeline, modules use LLMs in a variety of ways. For example, code is synthesized by the LLM to provide a domain-specific solution (e.g., a regular expression for extracting monetary amounts) and small models are trained on labels generated by the LLM. If these modules are not confident about the results on some records, SEED will forward them to the LLM module, which, although expensive, is often able to perform complex, human-like reasoning tasks on data items. For each request, the LLM module may further employ tools that retrieve relevant information from a database or other user-supplied data to assist the LLM in solving the task. Here, SEED leverages the reasoning ability of LLMs to determine on a case-by-case basis what additional information and tools will be helpful in solving the specific task."),"\n",i.createElement(t.p,null,"In this way, SEED leverages LLMs' synthesis, reasoning, semantics understanding abilities as well as the encoded common knowledge to construct a domain-specific solution.\nIdeally, users do not need to manually code modules or annotate a large number of training examples.\nMoreover, unlike prior work on using LLMs for data curation tasks, SEED does not require expensive LLM invocations on every data record, which suffers from scalability, efficiency, and cost issues when handling large datasets."),"\n",i.createElement(t.p,null,"For more details, please refer to our ",i.createElement(t.a,{href:"https://anonymous.4open.science/r/SEED/paper.pdf"},"paper"),"."),"\n",i.createElement(t.h3,null,"Participants"),"\n",i.createElement(t.p,null,"Zui Chen, Lei Cao, Sam Madden, Tim Kraska, Zeyuan Shang, Ju Fan, Nan Tang, Zihui Gu, Chunwei Liu, Michael Cafarella"))}var s=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,n.RP)(),e.components);return t?i.createElement(t,e,i.createElement(o,e)):o(e)},r=(a(4794),a(7440)),l=a(2532),c=a(5365),d=a(2568),m=a(5238),h=a(7528),u=a(113),f=a(1144);const p=d.default.h2.withConfig({displayName:"project__ProjectTitle",componentId:"sc-49rh51-0"})([""," color:white;padding-left:1rem;"],u.nH),g=(0,d.default)(r.A).withConfig({displayName:"project__StyledBg",componentId:"sc-49rh51-1"})(["&::before,&::after{filter:brightness(40%);}display:flex;align-items:center;"]),y=e=>{let{data:t,children:a}=e;const{mdx:{frontmatter:{image:o,title:s}}}=t,r=(0,c.f0)((0,l.c)(o));return i.createElement(m.A,null,i.createElement(g,Object.assign({Tag:"div"},r,{style:{height:"400px"},className:"align-middle",backgroundColor:"#ebeef2"}),i.createElement(p,null,s)),i.createElement(f.mO,null,i.createElement(n.xA,null,a)))},v=()=>i.createElement(h.A,{title:"Project"});function w(e){return i.createElement(y,e,i.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-templates-project-js-content-file-path-src-markdowns-projects-seed-mdx-2ffaea8089a690d09181.js.map