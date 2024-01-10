"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[342],{3028:function(e,t){t.Z={src:"/_next/static/media/default-movie-image.34e2a289.svg",height:318,width:212,blurWidth:0,blurHeight:0}},6584:function(e,t,n){var a=n(5893),r=n(4193),i=n(4628),l=n(9417),s=n(9603);t.Z=e=>{let{isLoadingCollection:t,isCollectionItem:n,onClick:o,className:c,collectionType:d="collection"}=e;return(0,a.jsx)(r.Z,{context:n?"collection":"filled",className:c,onClick:o,children:t?(0,a.jsx)(i.Z,{type:"static"}):(0,a.jsxs)("span",{children:[(0,a.jsx)(s.G,{icon:l.m6i,className:"mr-2"}),n?"Remove from ".concat(d):"Add to ".concat(d)]})})}},4033:function(e,t,n){var a=n(5893),r=n(1654),i=n(4184),l=n.n(i);t.Z=e=>{let{title:t,text:n="No items yet",variant:i="h1",className:s}=e;return(0,a.jsxs)("div",{className:l()("mb-16",s),children:[t&&(0,a.jsx)(r.Z,{variant:i,children:t}),(0,a.jsx)("p",{children:n})]})}},1207:function(e,t,n){n.d(t,{Z:function(){return S}});var a=n(5893),r=n(3028),i=n(3087),l=n(1664),s=n.n(l),o=n(9608),c=n(1654),d=n(3635),A=n(6584),u=n(5177),m=n(7294),f=n(9417),h=n(9603),x=n(8642),p=n(4184),g=n.n(p),v=n(8240),j=e=>{let{markedItemId:t,collectionType:n,className:r}=e,[i,l]=(0,m.useState)(null),{isLoggedIn:s,userId:o}=(0,x.a)();return((0,m.useEffect)(()=>{s&&(0,v.M)(o,{markedItemId:t,collectionType:n}).then(e=>{e&&l(e)})},[]),i)?(0,a.jsxs)("div",{className:g()("flex justify-center items-center bg-white rounded-full w-14 h-14 z-10 text-rose-500",r),children:[(0,a.jsx)(h.G,{icon:f.Tab}),(0,a.jsx)("span",{className:"ml-1 font-semibold",children:null==i?void 0:i.data.markValue})]}):null},w=n(381),b=n.n(w),y=n(6701),C=n(1084),N=n(1590),S=e=>{var t;let{item:n,collectionType:l,isShowButton:m=!0,isCollectionListItem:f=!1,isShowRole:h=!1}=e,{id:x,media_type:p,genres:g,poster_path:v,profile_path:w,first_air_date:S,release_date:k,title:I,name:_,job:E,character:Z}=n,{isMounted:B,isLoadingCollection:Q,isCollectionItem:D,handleSetCollectionItem:P,openConfirmationPopup:U}=(0,u.b)(n,null!==(t=p||l)&&void 0!==t?t:l),L=g&&g.length>0,T=null!=p?p:l,Y=T===N.zS.movie||T===N.zS.tv,M=null!=v?v:w,F=M?C.hm.replace("{imageSrc}",M):"",z=(0,a.jsxs)("div",{className:"flex flex-col w-full max-w-[232px] mb-8 mr-auto",children:[(0,a.jsxs)(s(),{href:"/".concat(T,"/").concat(x),as:"/".concat(T,"/").concat(x),className:"group relative",children:[Y&&(0,a.jsx)(j,{markedItemId:x,collectionType:l,className:"absolute -right-3 -top-3"}),(0,a.jsx)(o.Z,{className:"duration-300 mb-4 group-hover:border-rose-600 border-4",src:F,defaultImage:T!==N.zS.person?r.Z:i.Z}),(0,a.jsxs)(c.Z,{variant:"h3",children:[null!=I?I:_,(k||S)&&(0,a.jsxs)("span",{className:"ml-1",children:["(",b()(k||S).format("YYYY"),")"]})]}),h&&(0,a.jsx)("p",{className:"text-xs",children:null!=Z?Z:E})]}),L&&(0,a.jsx)("div",{className:"flex flex-wrap mb-2 relative",children:g.map((e,t)=>(0,a.jsx)(d.Z,{tag:e},t))}),m&&(0,a.jsx)(A.Z,{className:"mt-auto w-full md:w-full",isLoadingCollection:Q,isCollectionItem:D,onClick:D?U:P})]});return(0,a.jsx)(a.Fragment,{children:f?(0,a.jsx)(y.Z,{in:B,timeout:500,classNames:"collection-card",unmountOnExit:!0,children:z}):z})}},3635:function(e,t,n){var a=n(5893),r=n(7294),i=n(9417),l=n(9603),s=n(4184),o=n.n(s),c=n(4193);t.Z=e=>{let{tag:t,isEdit:n=!1,isSelected:s=!1,onToggle:d,onRemove:A}=e,[u,m]=(0,r.useState)(s);return(0,r.useEffect)(()=>{m(s)},[s]),(0,a.jsx)(a.Fragment,{children:n?(0,a.jsxs)(c.Z,{context:"tag",onClick:()=>{d?(d(t,u),m(!u)):A&&A(t)},className:o()(u&&"!bg-rose-900/30 text-rose-500",n&&"hover:bg-rose-900/30"),children:[u&&(0,a.jsx)(l.G,{icon:i.LEp,className:"w-3 h-3 mr-1"}),t.name,A&&(0,a.jsx)(l.G,{icon:i.g82,className:"w-3 h-3 ml-2"})]}):(0,a.jsx)("span",{className:"bg-gray-800 rounded flex text-xs leading-none px-2 py-1 my-0 mr-1 mb-1 last:mr-0",children:t.name})})}},3155:function(e,t,n){n.d(t,{Z:function(){return A}});var a=n(5893),r={src:"/_next/static/media/default-movie-bg.7bc16b89.jpg",height:1600,width:2400,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAUACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAAv/aAAwDAQACEAMQAAAAnoD/AP/EAB4QAAIBAwUAAAAAAAAAAAAAAAERAwACBBITISIx/9oACAEBAAE/AI8q8QmJdde4jyGl5X//xAAYEQACAwAAAAAAAAAAAAAAAAABAgADMf/aAAgBAgEBPwA1o2qDP//EABgRAAIDAAAAAAAAAAAAAAAAAAECAAMx/9oACAEDAQE/ABY4xp//2Q==",blurWidth:8,blurHeight:5},i=n(9608),l=n(4184),s=n.n(l),o=n(1084),c=n(7294),d=e=>{let[t,n]=(0,c.useState)(0);return(0,c.useEffect)(()=>{let e=()=>{n(window.scrollY)};return window.addEventListener("scroll",e),()=>{window.removeEventListener("scroll",e)}},[]),{translateY:.5*t}},A=e=>{let{imageSrc:t,className:n}=e,{translateY:l}=d(t),c=t?o.qX.replace("{imageSrc}",t):"",A=t||"default",u=(0,a.jsx)(i.Z,{className:"aspect-[215/121] inset-x-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4",src:c,defaultImage:r,loaderClassName:"bg-transparent"},A);return(0,a.jsx)("div",{className:s()("w-screen h-[40vw] md:h-[25vw] -z-10 -mb-40 relative inset-x-1/2 -translate-x-1/2 after:w-full after:absolute after:bottom-0 after:h-4/5 after:bg-gradient-to-t from-gray-950 overflow-hidden",n),children:(0,a.jsx)("div",{style:{transform:"translateY(".concat(l,"px)")},children:u})})}},1084:function(e,t,n){n.d(t,{Ie:function(){return r},OP:function(){return i},TX:function(){return l},dK:function(){return a},hm:function(){return c},mM:function(){return s},qX:function(){return o},yI:function(){return d}});let a="/b1Y8SUb12gPHCSSSNlbX4nB3IKy.jpg",r="/vXpeJJs1z8OKC88CNJX9O9QOhtr.jpg",i="/8GnWDLn2AhnmkQ7hlQ9NJUYobSS.jpg",l="/SqAZjEqqBAYvyu3KSrWq1d0QLB.jpg",s="/l8v3gJDlASN0lNn51gR8zQJsu5O.jpg",o="https://image.tmdb.org/t/p/original{imageSrc}",c="https://image.tmdb.org/t/p/w440_and_h660_face{imageSrc}",d="https://image.tmdb.org/t/p/w500{imageSrc}"},8240:function(e,t,n){n.d(t,{M:function(){return i}});var a=n(9105),r=n(8218);let i=(e,t)=>{let{markedItemId:n,collectionType:i}=t,l="users/".concat(e,"/collection/marks/").concat(i),s=(0,a.iH)(r.F,l);return new Promise(async e=>{(0,a.U2)(s).then(t=>{let a;t.forEach(e=>{let t={key:e.key,data:e.val()};t.data.markedItemId===n&&(a=t)}),e(a)})})}},3863:function(e,t,n){n.d(t,{v:function(){return r}});var a=n(5287);let r=e=>new Promise(async(t,n)=>{try{let n=await (0,a.K)("all"),r=[];e.map(e=>{var t;let a;let i=null!==(t=e.genre_ids)&&void 0!==t?t:e.genres,l=[];i&&i.map(e=>{let t;(t="number"==typeof e?n.find(t=>t.id===e):n.find(t=>t.id===e.id))&&l.push(t)}),a={id:e.id,...void 0!==e.media_type&&{media_type:e.media_type},...void 0!==e.gender&&{gender:e.gender},...void 0!==e.poster_path&&{poster_path:e.poster_path},...void 0!==e.profile_path&&{profile_path:e.profile_path},...void 0!==e.release_date&&{release_date:e.release_date},...void 0!==e.first_air_date&&{first_air_date:e.first_air_date},...void 0!==e.title&&{title:e.title},...void 0!==e.name&&{name:e.name},...void 0!==i&&{genres:l.filter(Boolean)},...void 0!==e.known_for_department&&{known_for_department:e.known_for_department},...void 0!==e.character&&{character:e.character},...void 0!==e.job&&{job:e.job}},r.push(a)}),t(r)}catch(e){n(e)}})},5287:function(e,t,n){n.d(t,{K:function(){return i}});var a=n(2226),r=n(1590);let i=async e=>{let t=async e=>{let t=await fetch(a.IS.replace("{queryParam}",e)),n=await t.json();return n.genres};switch(e){case"movie":return await t(r.zS.movie);case"tv":return await t(r.zS.tv);case"all":let n=await t(r.zS.movie),i=await t(r.zS.tv),l=[...n,...i.filter(e=>!n.some(t=>e.id===t.id))];return l.map(e=>JSON.parse(JSON.stringify(e)))}}},2624:function(e,t,n){n.d(t,{G6:function(){return A},LX:function(){return u},MB:function(){return c},Mo:function(){return o},kS:function(){return d},s9:function(){return m}});var a=n(5893),r=n(9347),i=n(4193),l=n(1199),s=n(3917);let o=e=>{let t=(0,l.k$)();e({id:t,modalContent:(0,a.jsx)(r.Z,{})})},c=(e,t,n)=>{let r=(0,l.k$)();e({id:r,modalTitle:"Friends",modalContent:(0,a.jsx)(a.Fragment,{children:t.map(e=>(0,a.jsxs)("div",{className:"flex justify-between items-center gap-4 w-full mb-4 last:mb-0",children:[(0,a.jsxs)("div",{className:"flex justify-between items-center",children:[(0,a.jsx)(s.Z,{userId:e.info.id,photoURL:e.info.photoURL,isLinkToProfile:!0}),(0,a.jsx)("span",{className:"font-semibold",children:e.info.displayName})]}),(0,a.jsx)(i.Z,{context:"icon-text",onClick:()=>n(e.info,r),children:"Remove"})]},e.info.id))})})},d=(e,t,n,r,s)=>{let o=(0,l.k$)();e({id:o,modalTitle:"Are you sure you want to remove ".concat(r," from your friends?"),modalContent:(0,a.jsxs)("div",{className:"flex justify-between items-center gap-4",children:[(0,a.jsx)(i.Z,{onClick:()=>n(s,o),children:"Confirm"}),(0,a.jsx)(i.Z,{context:"filledDark",onClick:()=>t(o),children:"Cancel"})]})})},A=(e,t,n,r)=>{let s=(0,l.k$)();e({id:s,modalTitle:"Are you sure you want to remove ".concat(r," from your collection?"),modalContent:(0,a.jsxs)("div",{className:"flex justify-between items-center gap-4",children:[(0,a.jsx)(i.Z,{onClick:()=>n(s),children:"Confirm"}),(0,a.jsx)(i.Z,{context:"filledDark",onClick:()=>t(s),children:"Cancel"})]})})},u=(e,t)=>{let n=(0,l.k$)();e({id:n,modalText:t,alertInfo:{isAlert:!0,type:"success"}})},m=(e,t)=>{let n=(0,l.k$)();e({id:n,modalText:t,alertInfo:{isAlert:!0,type:"error"}})}},5177:function(e,t,n){n.d(t,{b:function(){return u}});var a=n(7294),r=n(8642),i=n(7245),l=n(2624),s=n(9105),o=n(8218);let c=(e,t)=>{let n=o.I.currentUser,a=null==n?void 0:n.uid,r="users/".concat(a,"/collection/").concat(t,"/").concat(e),i=(0,s.iH)(o.F,r);return new Promise(async e=>{let t=!1;(0,s.Od)(i).then(()=>{t=!0}),e(t)})},d=(e,t)=>{let n=o.I.currentUser,a=null==n?void 0:n.uid,r="users/".concat(a,"/collection/").concat(t,"/").concat(e),i=(0,s.iH)(o.F,r);return new Promise(async e=>{let t=!1;(0,s.U2)(i).then(n=>{n.exists()&&(t=!0),e(t)})})},A=async(e,t)=>{let n=o.I.currentUser,a=null==n?void 0:n.uid,r="users/".concat(a,"/collection/").concat(t,"/").concat(e),i=(0,s.iH)(o.F,r);await (0,s.t8)(i,{id:e})},u=(e,t)=>{let[n,s]=(0,a.useState)(!1),[o,u]=(0,a.useState)(!1),[m,f]=(0,a.useState)(!0),{isLoggedIn:h}=(0,r.a)(),{showModal:x,hideModal:p}=(0,i.d)(),g=n=>{p(n),f(!0),s(!1),setTimeout(()=>{c(e.id,t).then(()=>{u(!1),(0,l.LX)(x,"The item was successfully removed")}).catch(()=>{(0,l.s9)(x,"An error has occurred")}).finally(()=>{f(!1)})},500)};return(0,a.useEffect)(()=>{h?(f(!0),d(e.id,t).then(e=>{u(e)}).finally(()=>{f(!1),s(!0)})):f(!1)},[h,e]),{isMounted:n,isLoadingCollection:m,isCollectionItem:o,handleSetCollectionItem:()=>{h?(f(!0),A(e.id,t).then(()=>{d(e.id,t).then(e=>{u(e),(0,l.LX)(x,"The item was successfully added")}).catch(()=>{(0,l.s9)(x,"An error has occurred")}).finally(()=>{f(!1)})})):(0,l.Mo)(x)},openConfirmationPopup:()=>{var t,n;let a=null!==(n=null!==(t=e.title)&&void 0!==t?t:e.name)&&void 0!==n?n:"this item";(0,l.G6)(x,p,g,a)}}}}}]);