(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7],{7308:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/person",function(){return s(8928)}])},8960:function(e,t,s){"use strict";var r=s(5893),n=s(1654),l=s(9603),a=s(9417);t.Z=e=>{let{title:t,text:s}=e;return(0,r.jsxs)("div",{className:"w-full h-full flex flex-col justify-center items-center flex-1 text-center",children:[(0,r.jsx)(l.G,{icon:a.QLU,className:"text-rose-600 text-2xl mb-4"}),(0,r.jsx)(n.Z,{variant:"h3",children:t}),(0,r.jsx)("p",{className:"text-sm text-gray-500",children:s})]})}},7396:function(e,t,s){"use strict";var r=s(7294),n=s(2624),l=s(7245),a=s(5037);t.Z=(e,t)=>{let{showModal:s}=(0,l.d)(),[c,i]=(0,r.useState)(!0),[o,u]=(0,r.useState)(null);return(0,r.useEffect)(()=>{i(!0),e?u(e):(0,a.Z)(t,1).then(e=>{u(e)}).catch(()=>{(0,n.s9)(s,"An error has occurred")}).finally(()=>{i(!1)})},[e]),{items:o,isLoading:c}}},8928:function(e,t,s){"use strict";s.r(t),s.d(t,{__N_SSP:function(){return p}});var r=s(5893),n=s(2226),l=s(7294),a=s(4628),c=s(3155),i=s(5410),o=s(5221),u=s(1084),h=s(1654),x=s(1590),f=s(7396),d=s(8960),p=!0;t.default=e=>{let{personListFromProps:t}=e,s=n.Zh.replace("{fieldName}",x.zS.person),[p,m]=(0,l.useState)(n.$D),S=p.includes(n.$D),{items:_,isLoading:N}=(0,f.Z)(t,p);return _?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{imageSrc:u.mM}),(0,r.jsx)(h.Z,{className:"text-3xl md:text-7xl after:hidden pb-0",children:"Persons"}),(0,r.jsx)(o.Z,{collectionType:x.zS.person,name:"personSearch",label:"Search person",urlToFetch:s,defaultUrlToFetch:n.$D,onSearch:m,isSearchApplied:!S,isSearchFieldWrapped:!0}),(0,r.jsx)(i.Z,{itemsList:_.items,collectionType:x.zS.person,isMoreDataAvailable:_.isMoreDataAvailable,urlToFetchItems:p,isFilterable:!0})]}):N?(0,r.jsx)(a.Z,{className:"bg-transparent"}):(0,r.jsx)(d.Z,{title:"Something went wrong",text:"No data found"})}}},function(e){e.O(0,[885,347,342,188,774,888,179],function(){return e(e.s=7308)}),_N_E=e.O()}]);