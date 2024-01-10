"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[751],{7287:function(e,t,s){s.d(t,{Z:function(){return z}});var a=s(5893),l=s(9608),r=s(3028),n=s(752),i=s(1654),c=s(7294),o=s(9603),m=s(9417),d=e=>{let[t,s]=(0,c.useState)([]);return(0,c.useEffect)(()=>{(()=>{let t=[];for(let s=1;s<=10;s++){let l=(10*s-Math.ceil(10*e))/10;s<=e||l<.3?t.push((0,a.jsx)(o.G,{icon:m.Tab},s)):l>=.3&&l<=.7?t.push((0,a.jsxs)("span",{className:"relative leading-none w-[18px] h-[16px]",children:[(0,a.jsx)(o.G,{className:"absolute top-0 left-0",icon:m.eJY}),(0,a.jsx)(o.G,{className:"absolute top-0 right-0 text-gray-800 -scale-x-100",icon:m.eJY})]},s)):t.push((0,a.jsx)(o.G,{className:"text-gray-800",icon:m.Tab},s))}s(t)})()},[e]),{ratingIcons:t}},x=e=>{let{rating:t,voteCount:s}=e,{ratingIcons:l}=d(t);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.Z,{variant:"h3",children:"Rating"}),(0,a.jsxs)("div",{className:"flex gap-x-1 text-white items-center mb-5",children:[l.map(e=>e),(0,a.jsx)("p",{className:"text-sm font-semibold leading-none mr-2",children:Math.ceil(10*t)/10}),(0,a.jsxs)("p",{className:"text-gray-400 text-sm leading-none mt-[2px]",children:[s," voted"]})]})]})},u=s(4193),h=s(4628),j=s(8642),f=s(7245),p=s(9105),v=s(1199),y=s(8218);let g=async(e,t)=>{let s="users/".concat(t,"/collection/marks/").concat(e.collectionType,"/").concat((0,v.k$)()),a=(0,p.iH)(y.F,s),l={markedItemId:e.markedItemId,markValue:e.markValue,collectionType:e.collectionType};await (0,p.t8)(a,l)};var N=s(8240),w=s(2624);let Z=(e,t)=>{let{markKey:s,collectionType:a}=t,l="users/".concat(e,"/collection/marks/").concat(a,"/").concat(s),r=(0,p.iH)(y.F,l);return new Promise(async e=>{let t=!1;(0,p.Od)(r).then(()=>{t=!0}),e(t)})};var b=(e,t)=>{let[s,l]=(0,c.useState)([]),[r,n]=(0,c.useState)(!1),[i,d]=(0,c.useState)(null),{userId:x,isLoggedIn:h}=(0,j.a)(),{showModal:p}=(0,f.d)(),v=i&&x,y="text-rose-900",b="text-rose-500",k=s=>{h?(n(!0),g({markedItemId:e,markValue:s,collectionType:t},x).then(()=>{(0,N.M)(x,{markedItemId:e,collectionType:t}).then(e=>{e&&d(e)}).finally(()=>{n(!1)})})):(0,w.Mo)(p)},S=(e,t)=>(0,a.jsx)(u.Z,{context:"image",className:t,onClick:()=>k(e),onMouseEnter:()=>T(e),onMouseLeave:M,children:(0,a.jsx)(o.G,{icon:m.Tab})},e),I=(e,t)=>(0,a.jsx)(o.G,{icon:m.Tab,className:t},e),T=e=>{let t=[];for(let s=1;s<=10;s++)t.push(S(s,s<=e?b:y));l(t)},C=()=>{l([]);for(let e=1;e<=10;e++)l(t=>[...t,I(e,i&&e<=i.data.markValue?b:y)])},M=()=>{l([]),l(Array.from({length:10},(e,t)=>S(t+1,y)))};return(0,c.useEffect)(()=>{h?(0,N.M)(x,{markedItemId:e,collectionType:t}).then(e=>{e&&d(e)}):M()},[x,e]),(0,c.useEffect)(()=>{i?C():M()},[i]),{mark:null==i?void 0:i.data.markValue,markIcons:s,isLoadingMark:r,isShowRemoveMarkButton:v,removeMark:()=>{n(!0);let e={markKey:null==i?void 0:i.key,collectionType:t};Z(x,e).then(()=>{d(null),M()}).finally(()=>{n(!1)})}}},k=e=>{let{markedItemId:t,collectionType:s}=e,{userId:l}=(0,j.a)(),{mark:r,markIcons:n,isLoadingMark:c,isShowRemoveMarkButton:o,removeMark:m}=b(t,s);return(0,a.jsxs)("div",{className:"mb-4 relative",children:[(0,a.jsx)(i.Z,{variant:"h3",children:"My mark"}),c?(0,a.jsx)(h.Z,{isShowText:!0,type:"static",className:"!inline-block"}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{className:"flex justify-start items-center gap-x-1",children:[(0,a.jsx)("div",{className:"flex justify-start items-center gap-x-1",children:n.map(e=>e)}),o&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("p",{className:"text-sm font-semibold leading-none mr-2",children:r}),(0,a.jsx)(u.Z,{onClick:m,context:"text",children:"Remove my mark"})]})]}),!l&&(0,a.jsx)("p",{className:"text-gray-400 text-sm leading-none mt-2",children:"Please login or register to be able to rate the movie"})]})]})},S=s(4914),I=s(5049),T=s(6584),C=s(5177),M=s(2004),R=s.n(M),E=s(381),_=s.n(E),F=s(1084),G=e=>{let{season:t}=e,{name:s,air_date:n,poster_path:c,vote_average:d,episode_count:x,overview:u}=t,h=c?F.hm.replace("{imageSrc}",c):"";return(0,a.jsxs)("div",{className:"flex justify-start items-start gap-4 mb-4 last:mb-0",children:[(0,a.jsx)(l.Z,{className:"!w-24 !h-36 flex-none duration-300 mb-4 group-hover:border-rose-600 border-4",src:h,defaultImage:r.Z}),(0,a.jsxs)("div",{children:[(0,a.jsx)(i.Z,{variant:"h3",children:s}),(0,a.jsx)("div",{className:"text-sm",children:(0,a.jsxs)("div",{className:"mb-4 flex flex-col justify-start items-start",children:[(0,a.jsxs)("span",{children:["Air date: ",_()(n).format("Do MMM YYYY")]}),(0,a.jsxs)("span",{children:["Number of episodes: ",x]}),(0,a.jsxs)("div",{className:"flex justify-center items-center text-sm",children:[(0,a.jsx)("span",{className:"mr-2",children:"Rating:"}),(0,a.jsx)(o.G,{icon:m.Tab,className:"text-white"}),(0,a.jsx)("span",{className:"ml-1 font-semibold",children:Math.ceil(10*d)/10})]})]})}),u&&(0,a.jsx)("p",{className:"text-gray-400",children:u})]})]})},Y=s(3851),L=s(4033),P=e=>{let{seasonsList:t}=e,{itemsToShow:s,getItemsToShow:l,isShowMoreButton:r,buttonText:n,listRef:c}=(0,Y.Z)(t,2);return t.length?(0,a.jsxs)("div",{ref:c,className:"mb-16",children:[(0,a.jsx)(i.Z,{children:"Seasons"}),(0,a.jsx)("div",{children:s.map((e,t)=>(0,a.jsx)(G,{season:e},t))}),r&&(0,a.jsx)(u.Z,{className:"mx-auto mt-8",context:"empty",onClick:l,children:n})]}):(0,a.jsx)(L.Z,{title:"Seasons"})},H=s(7071),K=s(5633),V=s(1590),z=e=>{let{basicInfo:t,images:s,reviews:c,video:o,collectionType:m}=e,{userId:d}=(0,j.a)(),{title:u,name:h,id:f,genres:p,overview:v,production_companies:y,tagline:g,poster_path:N,production_countries:w,release_date:Z,first_air_date:b,vote_count:M,vote_average:E,seasons:_}=t,G=m===V.zS.tv,Y=[G?b&&{type:"first_air_date",title:"First air date:",text:b}:{type:"release_date",title:"Release date:",text:Z},{type:"production_countries",title:"Production countries:",text:w},{type:"production_companies",title:"Production companies:",text:y}].filter(Boolean),{isLoadingCollection:L,isCollectionItem:z,handleSetCollectionItem:A,openConfirmationPopup:U}=(0,C.b)(t,m),B=N?F.hm.replace("{imageSrc}",N):"";return(0,a.jsxs)("div",{className:"flex gap-7 py-7 mb-16 flex-wrap md:flex-nowrap",children:[(0,a.jsx)("div",{className:"w-full max-w-[240px] md:max-w-[340px] mx-auto mt-24 md:mt-0",children:(0,a.jsx)("div",{className:"sticky top-28",children:(0,a.jsx)(l.Z,{src:B,defaultImage:r.Z,className:"border-4"})})}),(0,a.jsxs)("div",{className:"w-full",children:[(0,a.jsx)(i.Z,{className:"text-3xl md:text-7xl after:hidden pb-0",children:u||h}),g&&(0,a.jsx)(i.Z,{variant:"h2",className:"text-gray-400",children:g}),(0,a.jsx)(H.Z,{tags:p,className:"mb-5"}),(0,a.jsx)(K.Z,{itemsList:Y}),(0,a.jsx)(x,{rating:E,voteCount:M}),(0,a.jsx)(k,{markedItemId:f,collectionType:m}),(0,a.jsx)("p",{className:"mb-6",children:v}),(0,a.jsx)(T.Z,{className:"mb-12",isLoadingCollection:L,isCollectionItem:z,onClick:z?U:A}),G&&(0,a.jsx)(P,{seasonsList:_||[]}),(0,a.jsx)(n.Z,{images:s}),(0,a.jsx)(S.Z,{reviewedItemId:f,collectionType:m,reviews:c}),(0,a.jsx)(I.Z,{reviewedItemId:f,userId:d,reviewedItemCollectionType:m}),o&&(0,a.jsxs)("div",{className:"mt-16",children:[(0,a.jsx)(i.Z,{children:"Trailer"}),(0,a.jsx)(R(),{url:"https://www.youtube.com/watch?v=".concat(o),controls:!0,width:"100%",height:"auto",style:{aspectRatio:"16/9"}})]})]})]})}},721:function(e,t,s){var a=s(5893),l=s(4193),r=s(1654),n=s(4033),i=s(3851),c=s(1207),o=s(1590);t.Z=e=>{let{itemsList:t,title:s}=e,{itemsToShow:m,getItemsToShow:d,isShowMoreButton:x,buttonText:u,listRef:h}=(0,i.Z)(t,8);return m.length?(0,a.jsxs)("div",{ref:h,className:"mb-16",children:[(0,a.jsx)(r.Z,{children:s}),(0,a.jsx)("div",{className:"grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8",children:m.map((e,t)=>(0,a.jsx)(c.Z,{item:e,isShowButton:!1,collectionType:o.zS.person,isShowRole:!0},t))}),x&&(0,a.jsx)(l.Z,{className:"mx-auto",context:"empty",onClick:d,children:u})]}):(0,a.jsx)(n.Z,{title:s})}},7071:function(e,t,s){s.d(t,{Z:function(){return f}});var a=s(5893),l=s(3635),r=s(1654),n=s(4033),i=s(4193),c=s(7294),o=s(7245),m=s(8218),d=s(2056);let x=async e=>{let t=m.I.currentUser,s=null==t?void 0:t.uid;await (0,d.c)({favoriteGenres:e},s)};var u=s(2624),h=s(5287),j=(e,t)=>{let{onFormClose:s,isEditTags:a}=t,[l,r]=(0,c.useState)([]),[n,i]=(0,c.useState)(e),{showModal:m}=(0,o.d)(),d=()=>{s&&s(!1)},j=async()=>{await x(n).then(()=>{d(),(0,u.LX)(m,"Your profile was successfully updated")})};return(0,c.useEffect)(()=>{if(a){let e=async()=>{let e=await (0,h.K)("all");r(e)};e()}else r(e)},[a]),{itemsList:l,toggleTag:(e,t)=>{t?i(t=>t.filter(t=>t.name!==e.name)):i(t=>[...t,e])},saveChanges:j,closeEditTagsForm:d,checkIfTagIsSelected:t=>{if(e&&e.find(e=>e.name===t))return!0}}},f=e=>{let{tags:t,title:s="",className:c,isEditTags:o=!1,onFormClose:m}=e,{itemsList:d,toggleTag:x,saveChanges:u,closeEditTagsForm:h,checkIfTagIsSelected:f}=j(t,{onFormClose:m,isEditTags:o});return d.length?(0,a.jsxs)("div",{className:c,children:[s&&(0,a.jsx)(r.Z,{variant:"h3",children:s}),(0,a.jsx)("div",{className:"flex flex-wrap justify-start items-start",children:d.map(e=>(0,a.jsx)(l.Z,{tag:e,isEdit:o,isSelected:f(e.name),onToggle:x},e.name))}),o&&(0,a.jsxs)("div",{className:"w-full flex justify-start items-center gap-2 mt-5",children:[(0,a.jsx)(i.Z,{onClick:u,children:"Save"}),(0,a.jsx)(i.Z,{context:"filledDark",onClick:h,children:"Cancel"})]})]}):(0,a.jsx)(n.Z,{title:s,variant:"h3",text:"No genres yet",className:c})}},2056:function(e,t,s){s.d(t,{c:function(){return r}});var a=s(9105),l=s(8218);let r=async(e,t)=>{let s=(0,a.iH)(l.F,"users/".concat(t,"/info")),r=(await (0,a.U2)(s)).val(),n={...r,...e};await (0,a.t8)(s,n)}},6683:function(e,t,s){s.d(t,{Z:function(){return j}});var a=s(7294),l=s(2624),r=s(7245),n=s(2226),i=s(9810),c=s(5037),o=s(1590),m=s(3863),d=s(9105),x=s(8218);let u=async(e,t,s)=>{let a="".concat(s,"/").concat(e,"/").concat(t,"/"),l=(0,d.iH)(x.F,a);try{let e=await (0,d.U2)(l);if(!e.exists())return[];{let t=e.val(),s=Object.values(t);return s}}catch(e){return[]}},h=async(e,t)=>{try{let s=n.yK.replace("{itemId}",e).replace("{collectionType}",t),a=async()=>{let s=await u(e,o.zS.reviews,t);return s},[l,r,d,x,h,j,f]=await Promise.all([(0,i.R)(t,e,""),(0,i.R)(t,e,"/credits"),(0,i.R)(t,e,"/images"),(0,i.R)(t,e,"/reviews"),(0,i.R)(t,e,"/videos"),a(),(0,c.Z)(s,1)]),p=[...x.results,...j],v=async e=>{if(!(e.length>0))return[];{let t=await (0,m.v)(e);return t}},y=await v(r.cast),g=await v(r.crew);return{basicInfo:l,credits:{cast:y,crew:g},images:d.backdrops,video:h.results,reviewsFromAPIAndStorage:p,similarItemsList:f}}catch(e){throw e}};var j=(e,t,s)=>{let{showModal:i}=(0,r.d)(),[c,o]=(0,a.useState)(null),[m,d]=(0,a.useState)(!0),x=n.yK.replace("{itemId}",t).replace("{collectionType}",s),u=async()=>{d(!0),o(null),h(t,s).then(e=>{o(e)}).catch(()=>{(0,l.s9)(i,"An error has occurred")}).finally(()=>{d(!1)})};return(0,a.useEffect)(()=>{e?o(e):u()},[t]),{data:c,isLoading:m,urlToFetchSimilarItems:x}}}}]);