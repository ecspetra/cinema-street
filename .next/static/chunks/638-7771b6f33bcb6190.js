"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[638],{2062:function(e,t,s){var a=s(5893),l=s(4193),n=s(4184),r=s.n(n);t.Z=e=>{let{value:t,label:s,onClick:n,closeList:c,className:i}=e;return(0,a.jsx)(l.Z,{context:"listItem",onClick:()=>{n&&n(t,s),c&&c()},className:r()("w-full z-10 text-left",i),children:s})}},50:function(e,t,s){var a=s(5893),l=s(7294),n=s(4184),r=s.n(n),c=s(2318),i=s(9417),o=s(9603),m=s(4193);t.Z=e=>{let{children:t,label:s,onChange:n,defaultValue:d,name:u,className:x}=e,h=(0,l.useRef)(null),[f,p]=(0,l.useState)(d),{isOpen:j,onToggleContainer:g,onCloseContainer:b}=(0,c.m)(h),y=(e,t)=>{u?n(u,e):n(e),p(t)},N=l.Children.map(t,e=>(0,l.isValidElement)(e)?(0,l.cloneElement)(e,{onClick:y,closeList:b}):e);return(0,l.useEffect)(()=>{d&&p(d)},[d]),(0,a.jsxs)("div",{ref:h,className:r()("relative w-full h-16",x),children:[(0,a.jsxs)(m.Z,{context:"field",onClick:g,children:[(0,a.jsx)("span",{className:"text-xs text-gray-500 font-semibold absolute top-2 left-3 z-10",children:s}),(0,a.jsxs)("span",{className:"absolute top-7 left-3 w-[calc(100%-22px)] flex justify-between items-center",children:[(0,a.jsx)("span",{className:"truncate leading-5",children:f}),(0,a.jsx)(o.G,{icon:i.ptq})]})]}),j&&(0,a.jsx)("div",{className:"w-full absolute top-full flex flex-col items-center flex-none h-60 border border-gray-500 overflow-y-auto scrollbar-hide bg-gray-950 shadow-[0_35px_60px_15px_rgba(3,7,18,1)] z-20",children:N})]})}},5633:function(e,t,s){s.d(t,{Z:function(){return u}});var a=s(5893),l=s(9603),n=s(9417),r=s(381),c=s.n(r);let i=function(e){let t,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"date",l="No info yet";switch(s){case"date":return e?c()(e).format("Do MMM YYYY"):l;case"array":return Array.isArray(e)&&e.length>0?e.map((t,s)=>(0,a.jsx)("span",{className:"mr-1",children:s===e.length-1?t.name:t.name+","},t.name)):l;case"text":t=e||l}return t};var o=e=>{let{item:t}=e,{type:s,title:r,text:c}=t;return(0,a.jsx)("div",{className:"flex items-center flex-wrap text-sm mb-1",children:(()=>{switch(s){case"release_date":case"first_air_date":return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:n.Ry6}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r}),i(c)]});case"production_countries":case"production_companies":return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:"production_companies"===s?n.BDt:n.RrC}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r}),i(c,"array")]});case"place_of_birth":case"user_country":return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:n.RrC}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r}),i(c,"text")]});case"birthday":if("string"!=typeof r&&"string"!=typeof c){let e=i(c.birthday),t=c.deathday&&i(c.deathday);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:n.Ry6}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r.birthday}),(0,a.jsx)("span",{children:e}),c.deathday&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("span",{className:"mr-1.5 font-semibold",children:["\xa0","— ".concat(r.deathday," ")]}),(0,a.jsx)("span",{children:t})]})]})}case"user_email":return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:n.IBq}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r}),i(c,"text")]});case"gender":return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:n.ILF}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r}),i(c,"text")]});case"user_date_of_birth":return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.G,{className:"mr-1.5",icon:n.Ry6}),(0,a.jsx)("span",{className:"mr-1.5 font-semibold",children:r}),i(c)]})}})()})},m=s(4184),d=s.n(m),u=e=>{let{itemsList:t,className:s}=e;return(0,a.jsx)("div",{className:d()("mb-5",s),children:t.map(e=>(0,a.jsx)(o,{item:e},e.title))})}},752:function(e,t,s){s.d(t,{Z:function(){return y}});var a=s(5893),l=s(9608),n=s(3028),r=s(4193),c=s(1654),i=s(9417),o=s(9603),m=s(7294),d=(e,t)=>{let[s,a]=(0,m.useState)(t);return{currentImageIdx:s,showNextImage:()=>{a(t=>t===e.length-1?0:t+1)},showPrevImage:()=>{a(t=>0===t?e.length-1:t-1)}}},u=s(1084),x=e=>{let{images:t,initialSliderImageIdx:s,isPersonImages:c}=e,{currentImageIdx:m,showNextImage:x,showPrevImage:h}=d(t,s),f=t[m].file_path?u.qX.replace("{imageSrc}",t[m].file_path):"";return(0,a.jsxs)("div",{children:[(0,a.jsx)(l.Z,{className:c?"aspect-[2/3]":"aspect-[215/121]",src:f,defaultImage:n.Z}),(0,a.jsx)(r.Z,{context:"icon",className:"!absolute inset-y-1/2 -translate-y-1/2 right-4",onClick:x,children:(0,a.jsx)(o.G,{icon:i._tD,className:"w-6 h-6"})}),(0,a.jsx)(r.Z,{context:"icon",className:"!absolute inset-y-1/2 -translate-y-1/2 left-4",onClick:h,children:(0,a.jsx)(o.G,{icon:i.A35,className:"w-6 h-6"})})]})},h=s(7245),f=s(4184),p=s.n(f),j=s(4033),g=s(3851),b=s(1199),y=e=>{let{images:t,isPersonImages:s=!1,className:i}=e,{showModal:o}=(0,h.d)(),{itemsToShow:m,getItemsToShow:d,isShowMoreButton:f,buttonText:y,listRef:N}=(0,g.Z)(t,12),v=e=>{o({id:(0,b.k$)(),modalTitle:"",modalText:"",modalClassName:s?"!p-0":"!max-w-7xl !p-0",modalContent:(0,a.jsx)(x,{images:t,initialSliderImageIdx:e,isPersonImages:s}),alertInfo:null})};return t.length?(0,a.jsxs)("div",{ref:N,className:p()("mb-16",i),children:[(0,a.jsx)(c.Z,{children:"Images"}),(0,a.jsx)("div",{className:"grid grid-cols-[repeat(auto-fill,calc((100vw-24px)/3))] md:grid-cols-[repeat(auto-fill,calc((100vw-416px)/3))] xl:grid-cols-[repeat(auto-fill,calc(864px/3))] gap-1 justify-start",children:m.map((e,t)=>(0,a.jsx)(r.Z,{context:"image",onClick:()=>v(t),children:(0,a.jsx)(l.Z,{className:s?"aspect-[2/3]":"aspect-[215/121]",src:e.file_path?u.yI.replace("{imageSrc}",e.file_path):"",defaultImage:n.Z})},t))}),f&&(0,a.jsx)(r.Z,{className:"mx-auto mt-8",context:"empty",onClick:d,children:y})]}):(0,a.jsx)(j.Z,{title:"Images"})}},5410:function(e,t,s){s.d(t,{Z:function(){return y}});var a=s(5893),l=s(1654),n=s(4033),r=s(1590),c=s(2062),i=s(50),o=e=>{let{onChange:t,defaultSortValue:s}=e,l=Object.keys(r.IE).find(e=>r.IE[e]===s);return(0,a.jsx)(i.Z,{label:"Sort by",onChange:e=>t(e),defaultValue:l,className:"!w-48 ml-auto",children:Object.values(r.IE).map((e,t)=>(0,a.jsx)(c.Z,{value:e,className:"text-sm !font-light",label:Object.keys(r.IE)[t]},e))})},m=s(1207),d=s(4193),u=s(4628),x=s(7245),h=s(7294),f=s(5037),p=s(2624),j=(e,t)=>{let{onEmptyList:s,urlToFetchItems:a,isMoreDataAvailable:l,isFilterable:n}=t,{showModal:r}=(0,x.d)(),[c,i]=(0,h.useState)(!1),[o,m]=(0,h.useState)(1),[d,u]=(0,h.useState)([]),[j,g]=(0,h.useState)(l),b=e=>{i(!0),(0,f.Z)(a,e).then(e=>{let t=[];e.items.length||s(!0),e.items.map(e=>{let s=d.find(t=>t.id===e.id);s||t.push(e)}),0!==t.length?u(e=>[...e,...t]):u(e=>[...e,...d]),g(e.isMoreDataAvailable)}).catch(()=>{(0,p.s9)(r,"An error has occurred"),s(!0)}).finally(()=>{i(!1)})},y=()=>{u([]),m(1),g(!n&&l),b(1)};return(0,h.useEffect)(()=>{o>1&&b(o)},[o]),(0,h.useEffect)(()=>{y()},[e,a]),{itemsToShow:d,isLoading:c,isShowMoreButton:j,showMore:()=>{m(e=>e+1)}}},g=e=>{let{itemsList:t,collectionType:s,isMoreDataAvailable:l,urlToFetchItems:n,onEmptyList:r,isFilterable:c=!1}=e,{itemsToShow:i,isLoading:o,isShowMoreButton:x,showMore:h}=j(t,{onEmptyList:r,urlToFetchItems:n,isMoreDataAvailable:l,isFilterable:c});return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center",children:i.map(e=>(0,a.jsx)(m.Z,{item:e,collectionType:s},e.id))}),o&&(0,a.jsx)(u.Z,{type:"static",className:"mb-4"}),x&&(0,a.jsx)(d.Z,{className:"mx-auto",context:"empty",onClick:h,children:"Show more"})]})},b=(e,t)=>{let{urlToFetchItems:s,isSortable:a}=t,[l,n]=(0,h.useState)(!0),[r,c]=(0,h.useState)(s),[i,o]=(0,h.useState)(!e.length),m=a?new URLSearchParams(s).get("sort_by"):void 0;return(0,h.useEffect)(()=>{c(s),l?n(!1):o(!1)},[s]),{defaultSortValue:m,urlToFetch:r,isShowEmptyList:i,handleSortChange:e=>{let t=r.replace(/(sort_by=)[^&]*/,"$1".concat(e));c(t)},setIsShowEmptyList:o}},y=e=>{let{itemsList:t,collectionType:s,isMoreDataAvailable:r,urlToFetchItems:c,title:i,isFilterable:m=!1,isSortable:d=!1}=e,{defaultSortValue:u,urlToFetch:x,isShowEmptyList:h,handleSortChange:f,setIsShowEmptyList:p}=b(t,{urlToFetchItems:c,isSortable:d});return h?(0,a.jsx)(n.Z,{title:i}):(0,a.jsxs)("div",{className:"mb-16",children:[(0,a.jsxs)("div",{className:"flex justify-between items-start mb-4",children:[i&&(0,a.jsx)(l.Z,{className:"!mb-0",children:i}),d&&(0,a.jsx)(o,{onChange:f,defaultSortValue:u})]}),(0,a.jsx)(g,{itemsList:t,collectionType:s,isMoreDataAvailable:r,urlToFetchItems:x,isFilterable:m,onEmptyList:p})]})}},5037:function(e,t,s){s.d(t,{Z:function(){return l}});var a=s(3863);let l=async function(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;try{let l=await fetch(e.replace("{currentPage}",t.toString()),s?{signal:s}:{}),n=await fetch(e.replace("{currentPage}",(t+1).toString()));if(!l.ok)throw"Failed to fetch";let r=await l.json(),c=await n.json();try{let e=await (0,a.v)(r.results);return{items:e,isMoreDataAvailable:!!c.results.length}}catch(e){throw e}}catch(e){throw e}}},2318:function(e,t,s){s.d(t,{m:function(){return l}});var a=s(7294);let l=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],[s,l]=(0,a.useState)(t),n=()=>{l(!1)};return(0,a.useEffect)(()=>{let t=t=>{e.current&&!e.current.contains(t.target)&&n()};return document.addEventListener("click",t),()=>{document.removeEventListener("click",t)}},[e]),{isOpen:s,onToggleContainer:()=>{l(!s)},onOpenContainer:()=>{l(!0)},onCloseContainer:n}}}}]);