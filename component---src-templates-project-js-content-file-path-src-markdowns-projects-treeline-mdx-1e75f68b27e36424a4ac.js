"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[330],{573:function(e,n,t){t.r(n),t.d(n,{Head:function(){return k},default:function(){return y}});var a=t(8453),r=t(6540),i=t(307);function s(e){const n=Object.assign({h2:"h2",p:"p",span:"span",a:"a"},(0,a.RP)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.h2,null,"LSMs and Modern NVMe SSDs: Still the Best Combination?"),"\n",r.createElement(n.p,null,"Many modern key-value stores, such as RocksDB and LevelDB, rely on\nlog-structured merge trees (LSMs). Originally designed for spinning disks, LSMs\noptimize for write performance by only making sequential writes. But this\noptimization comes at the cost of reads: LSMs must rely on expensive compaction\njobs and Bloom filters—all to maintain reasonable read performance. For\ntraditional disks (e.g., HDDs and SATA SSDs), this write versus read performance\ntrade-off has been the preferred choice. Random writes on traditional disks are\nprohibitively expensive, and so any design that minimizes the amount of random\nwrites outshines the competition. But is this trade-off still the right one for\nmodern storage devices?"),"\n",r.createElement(n.p,null,"We observe that NVMe SSDs no longer suffer the same significant random write\ndrawback as traditional disks. With enough request parallelism, NVMe SSDs can\nachieve their peak sequential write throughput through random writes. This\nnaturally leads us to a research question: how should a persistent key-value\nstore’s design change for NVMe SSDs where random writes are comparable to\nsequential writes in performance?"),"\n",r.createElement(n.h2,null,"Revisit Update-in-Place?"),"\n",r.createElement(n.p,null,"We believe that update-in-place designs can be the answer for larger-than-memory\nworkloads that are (i) read-heavy, or (ii) skewed write-heavy. Update-in-place\ndesigns, such as a classical disk-based B+ tree, offer excellent read\nperformance because each record is stored in a single location on disk—requiring\nonly one I/O to read (when inner nodes are cached in memory). High read\nperformance is desirable because read-heavy workloads such as caching or\nanalytics are common in practice."),"\n",r.createElement(n.p,null,"However, classical disk-based B+ trees also suffer from their own challenges.\nFirst, updating a single record on a page requires reading and writing the\nentire page, which leads to write amplification. Second, scans can lead to\nrandom reads because logically consecutive leaf pages are not necessarily stored\nsequentially on disk; on NVMe SSDs, we observe that random reads still\nunderperform sequential reads. Third, inserts also cause write amplification\nbecause of the need to “make space” in the on-disk structure to hold the new\nrecords."),"\n",r.createElement(n.h2,null,"TreeLine to the Rescue!"),"\n",r.createElement("p",{align:"center",width:"100%"},r.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 833px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/94d927582edb121b9b568797f6d1b3c6/5205c/architecture.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 65.66666666666667%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABcRAAAXEQHKJvM/AAADWklEQVR42mPw69RVT57q9LB4ftjDnNm+H6L6zfMYgMB+vz0LAwIwMagwsDPwMwgCSQUgyc8gz8DBUA8Uh4L//xkYQZhh/v5QiaXHk7u3XqrpXneucMrCY1EuIAX19fVAxSDMAMPMQMwKxIJAzAblMyLJwwEjVBIkyMkpyyCl6MstrhEoIskgw8AJkpO35xeQ9ROW4nZlEOPVZFPltGCQFnHnklTzkRQByrN4eKiw+8fLK4Smq0ozqPtLWVmWK//zbjX/H9hp9w+I/7s0GPzxaTP/P3FZVy7IxsJpqWecm/T++7fb/PVttQTRfzzbTP6bFyseBcm3rvbQW3U26+/kTVH/GeRsRSRNC+SiHSp0oh2L9ROts7RyLHPVk6yy1TNC0/20QBrCGz2crUrUE5yr9aMdy/XiXCsNY2zLtRJM8xXcQfJtC52FFxxITOtcFpDBIGQmxGeapaxtmiWrrREtaSTjwOeu4iFir+Qi7MypwikD0qCfLiRtkC6tb5Arp6URIGapGiOqb5wto2uWoqbIgA40wkSMrCvVfnu3mP/3a7P+591i8T+ww+6vQ4P2f9MsOWeQGusy9UWh/Y5gr/oA5YM67f8E9dj9tylXPwSLwHpgqkibaczKIGfDL2hVqOwI9IqTS7WejXm2soNJqoq9caa0o348vwBIg12+qqZrvZGTe72+g3utrq1btYGVbbmmnXmJoh4iyfwHYxCfA8nBLDExxdzxJaESfn6lvAzcDOJAMW54WoQAZg+VXPZcj23s0OQDApxQeR4Qh7djrZ/3lNW+2uFtpgtTJ3l8Dqh3npMxzetzaJPJjMRic8/UevOI8FwD/7xmh/jG6aVL06d4/M6Z6fPfv1ovt2upn4t/uo5XUY99QHSBcTzY9NUX0q8tO506c/mZlOWrz6ffAAmuvpBxf/np1FmrzqetWXUhc9eik/FT11/OvbziSGHT5ps5/7fczv0/bUd4+ZpLOTcXHk1s23Qzb9+UzdE3wd6cuTtm9ZSt4VXTdkS2zdkXuxokOHd//IYZuyKrZuyK7py5K3LK5G2h5XP2xS2dsDE4Zva+2MtzD8Zd6ljmGw/Uu65nbWDuwkNJM+pm+G6DhQ0sPLiAmA/K54KGDScqW5wbmv1AEcYPxKKgYIOxAdvBIOO26lOHAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="A figure showing TreeLine&#39;s design."\n        title=""\n        src="/static/94d927582edb121b9b568797f6d1b3c6/5205c/architecture.png"\n        srcset="/static/94d927582edb121b9b568797f6d1b3c6/5a46d/architecture.png 300w,\n/static/94d927582edb121b9b568797f6d1b3c6/0a47e/architecture.png 600w,\n/static/94d927582edb121b9b568797f6d1b3c6/5205c/architecture.png 833w"\n        sizes="(max-width: 833px) 100vw, 833px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),r.createElement("br"),r.createElement(n.p,null,r.createElement("strong",null,"Figure 1:")," TreeLine's design, highlighting our key ideas. See\nSections 3 and 4 in ",r.createElement("a",{href:"https://www.vldb.org/pvldb/vol16/p99-yu.pdf"},"our\npaper")," for more details.")),"\n",r.createElement(n.p,null,"In this project, we develop a new design for NVMe SSDs that has the read\nbenefits of a classical update-in-place design while also mitigating its\ntraditional write drawbacks. In other words, observing that the fast random I/O\nof NVMe SSDs would be favorable for an update-in-place design, we propose\ntechniques to make such a design competitive across the board. Our new design\nleverages three complementary techniques: (A) record caching to reduce\nread/write amplification in skewed workloads, (B) page grouping to translate\nscans into sequential reads, and (C) insert forecasting to reduce the I/O needed\nto “make space” for new records. We implement these techniques in TreeLine, a\nnew update-in-place key-value store designed for NVMe SSDs."),"\n",r.createElement(n.p,null,"TreeLine buffers all writes in its record cache (key idea A), allowing it to (i)\nkeep hot records in memory for as long as possible, and (ii) batch writes that\ngo to the same on-disk page to amortize the I/O costs for updating a page.\nInstead of laying out pages randomly on disk, TreeLine uses linear models to\ngroup pages storing adjacent key ranges so that they are stored contiguously on\ndisk (key idea B). Doing so lets TreeLine (i) make long physical reads\n(benefitting scans), while (ii) still allowing it to access data at page\ngranularity for point reads. Linear models help TreeLine realize these benefits\nwith a small in-memory index as it only needs to index the page group boundaries\n(instead of every page boundary). Finally, to reduce the cost of inserts in an\nupdate-in-place design, TreeLine exploits the repetitiveness in skewed insert\nworkloads to forecast the location and volume of inserts it expects to receive\n(key idea C). It uses the forecast to leave appropriate space in its on-disk\npages to reduce how frequently it needs to reorganize its on-disk pages to\naccommodate the new records. TreeLine tracks the inserts observed across\ndifferent parts of the key space and extrapolates these trends forward."),"\n",r.createElement(n.p,null,"We evaluate TreeLine on YCSB using synthetic and real-world datasets. We compare\nTreeLine against (i) RocksDB, a widely-used LSM key-value store, and (ii)\nLeanStore, a state- of-the-art update-in-place key-value store. Across our point\nYCSB workloads with 1024 byte records, TreeLine outperforms RocksDB and\nLeanStore by 2.20x and 2.07x respectively on average. Although TreeLine makes\nrandom reads from disk, we find that it still outperforms RocksDB and LeanStore\nby 2.50x and 2.80x respectively with 16 threads on uniform scan-heavy workloads."),"\n",r.createElement(n.h2,null,"Read the Paper"),"\n",r.createElement(n.p,null,r.createElement(n.a,{href:"https://www.vldb.org/pvldb/vol16/p99-yu.pdf"},"Geoffrey X. Yu*, Markos Markakis*, Andreas Kipf*, Per-Åke Larson, Umar Farooq\nMinhas, Tim Kraska. TreeLine: An Update-In-Place Key-Value Store for Modern\nStorage. PVLDB Volume 16 Issue 1, 2022.")),"\n",r.createElement(n.p,null,"* Denotes equal contribution."),"\n",r.createElement(i.A,null,"@article{treeline-yu-markakis-kipf23,\n  author = {Yu, Geoffrey X. and Markakis, Markos and Kipf, Andreas and\n    Larson, Per-Åke and Minhas, Umar Farooq and Kraska, Tim},\n  doi = {10.14778/3561261.3561270},\n  journal = {{Proceedings of the VLDB Endowment}},\n  month = {9},\n  number = {1},\n  pages = {99--112},\n  title = {{TreeLine: An Update-In-Place Key-Value Store for Modern Storage}},\n  volume = {16},\n  year = {2022},\n}"),"\n",r.createElement(n.h2,null,"Project Participants"),"\n",r.createElement(n.p,null,"Andreas Kipf, Tim Kraska, Markos Markakis, Geoffrey Yu"))}var o=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.RP)(),e.components);return n?r.createElement(n,e,r.createElement(s,e)):s(e)},l=(t(4794),t(7440)),c=t(2532),d=t(5365),p=t(2568),u=t(5238),m=t(7528),h=t(113),g=t(1144);const f=p.default.h2.withConfig({displayName:"project__ProjectTitle",componentId:"sc-49rh51-0"})([""," color:white;padding-left:1rem;"],h.nH),b=(0,p.default)(l.A).withConfig({displayName:"project__StyledBg",componentId:"sc-49rh51-1"})(["&::before,&::after{filter:brightness(40%);}display:flex;align-items:center;"]),w=e=>{let{data:n,children:t}=e;const{mdx:{frontmatter:{image:i,title:s}}}=n,o=(0,d.f0)((0,c.c)(i));return r.createElement(u.A,null,r.createElement(b,Object.assign({Tag:"div"},o,{style:{height:"400px"},className:"align-middle",backgroundColor:"#ebeef2"}),r.createElement(f,null,s)),r.createElement(g.mO,null,r.createElement(a.xA,null,t)))},k=()=>r.createElement(m.A,{title:"Project"});function y(e){return r.createElement(w,e,r.createElement(o,e))}},307:function(e,n,t){var a=t(6540);const r=e=>{let{children:n,handleCopyClick:t}=e;return a.createElement("div",{className:"bibtex",style:{position:"relative",backgroundColor:"#f5f5f5",padding:"15px",borderRadius:"3px",margin:"15px 0"}},a.createElement("pre",{style:{margin:0,fontSize:"0.9em"}},n),a.createElement("button",{className:"bibtex-copy",onClick:t,style:{position:"absolute",top:"10px",right:"10px",cursor:"pointer",backgroundColor:"#aaa",color:"#fff",border:"0",borderRadius:"3px",padding:"5px",outline:"none",fontSize:"0.8em",fontFamily:"sans-serif"}},"Copy"))};n.A=e=>{let{children:n,withToggle:t}=e;const{0:i,1:s}=(0,a.useState)(!1),o=e=>{s(!i),e.preventDefault()},l=()=>{navigator.clipboard.writeText(n)};return t?i?a.createElement(a.Fragment,null,a.createElement("a",{href:"#",onClick:o},"Hide BibTeX"),a.createElement(r,{handleCopyClick:l},n)):a.createElement(a.Fragment,null,a.createElement("a",{href:"#",onClick:o},"View BibTeX")):a.createElement(r,{handleCopyClick:l},n)}}}]);
//# sourceMappingURL=component---src-templates-project-js-content-file-path-src-markdowns-projects-treeline-mdx-1e75f68b27e36424a4ac.js.map