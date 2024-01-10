(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[192],{3471:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile/[id]",function(){return a(7615)}])},9377:function(e,t,a){"use strict";a.d(t,{Z:function(){return x}});var r=a(5893),s=a(1654),l=a(4033),n=a(4914),i=a(4193),o=a(8878),c=a(3851),d=e=>{let{items:t}=e,{itemsToShow:a,getItemsToShow:s,isShowMoreButton:l,buttonText:n,listRef:d}=(0,c.Z)(t,8,180);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{ref:d,className:"grid grid-cols-[repeat(auto-fill,141px)] gap-4 justify-center mb-8",children:a.map((e,t)=>(0,r.jsx)(o.Z,{itemId:e.markedItemId,mark:e.markValue,collectionType:e.collectionType,isLinkToMovie:!0},t))}),l&&(0,r.jsx)(i.Z,{className:"mx-auto mt-8",context:"empty",onClick:s,children:n})]})},u=a(1664),m=a.n(u),f=a(8642),h=a(1207),v=e=>{let{items:t,collectionType:a}=e,{userId:s}=(0,f.a)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"grid grid-cols-[repeat(auto-fill,232px)] gap-x-5 justify-center",children:t.map((e,t)=>{if(t<=4)return(0,r.jsx)(h.Z,{item:e,collectionType:a,isShowButton:!1},t)})}),(0,r.jsx)(m(),{href:"/collection/[type]?uid=".concat(s,"&type=").concat(a),as:"/collection/".concat(a,"?uid=").concat(s,"&type=").concat(a),className:"w-full md:w-72 border-2 border-rose-600 duration-300 font-semibold leading-none text-rose-600 rounded-3xl hover:border-transparent hover:w-full hover:text-rose-500 p-3 flex justify-center items-center mx-auto mt-8",children:"View ".concat(a," collection")})]})},p=a(1590),w=e=>{let{title:t,collectionType:a,items:i,isCurrentUserCollection:o,collectionOwnerId:c}=e,u=a!==p.zS.reviews;return i.length?(0,r.jsxs)("div",{className:"my-16 first:mt-0 last:mb-0",children:[u&&(0,r.jsx)(s.Z,{children:t}),(()=>{switch(a){case"reviews":return(0,r.jsx)(n.Z,{reviews:i,className:"!mb-0",collectionOwnerId:c,isCollectionList:!0});case"marks":return(0,r.jsx)(d,{items:i});case"movie":case"tv":case"person":return(0,r.jsx)(v,{items:i,collectionType:a})}})()]}):(0,r.jsx)(l.Z,{title:t,text:o?(()=>{switch(a){case"movie":case"person":return"Please add some ".concat(a," to your collection before you can see it here");case"tv":return"Please add some TV show to your collection before you can see it here";case"marks":return"Please rate something before you can see it here";case"reviews":return"Please write a review before you can see it here"}})():void 0,className:"border border-gray-500 mb-4 p-4 last:mb-0"})},x=e=>{let{movies:t,tvShows:a,persons:s,marks:l,reviews:n,isCurrentUserCollection:i=!0,collectionOwnerId:o}=e;return(0,r.jsxs)("div",{className:"mt-24 md:mt-0",children:[(0,r.jsx)(w,{title:"Movies",collectionType:p.zS.movie,items:null!=t?t:[],isCurrentUserCollection:i}),(0,r.jsx)(w,{title:"TV shows",collectionType:p.zS.tv,items:null!=a?a:[],isCurrentUserCollection:i}),(0,r.jsx)(w,{title:"Persons",collectionType:p.zS.person,items:null!=s?s:[],isCurrentUserCollection:i}),(0,r.jsx)(w,{title:"Marks",collectionType:p.zS.marks,items:null!=l?l:[],isCurrentUserCollection:i}),(0,r.jsx)(w,{title:"Reviews",collectionType:p.zS.reviews,items:null!=n?n:[],isCurrentUserCollection:i,collectionOwnerId:o})]})}},5633:function(e,t,a){"use strict";a.d(t,{Z:function(){return m}});var r=a(5893),s=a(9603),l=a(9417),n=a(381),i=a.n(n);let o=function(e){let t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"date",s="No info yet";switch(a){case"date":return e?i()(e).format("Do MMM YYYY"):s;case"array":return Array.isArray(e)&&e.length>0?e.map((t,a)=>(0,r.jsx)("span",{className:"mr-1",children:a===e.length-1?t.name:t.name+","},t.name)):s;case"text":t=e||s}return t};var c=e=>{let{item:t}=e,{type:a,title:n,text:i}=t;return(0,r.jsx)("div",{className:"flex items-center flex-wrap text-sm mb-1",children:(()=>{switch(a){case"release_date":case"first_air_date":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:l.Ry6}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n}),o(i)]});case"production_countries":case"production_companies":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:"production_companies"===a?l.BDt:l.RrC}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n}),o(i,"array")]});case"place_of_birth":case"user_country":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:l.RrC}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n}),o(i,"text")]});case"birthday":if("string"!=typeof n&&"string"!=typeof i){let e=o(i.birthday),t=i.deathday&&o(i.deathday);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:l.Ry6}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n.birthday}),(0,r.jsx)("span",{children:e}),i.deathday&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{className:"mr-1.5 font-semibold",children:["\xa0","— ".concat(n.deathday," ")]}),(0,r.jsx)("span",{children:t})]})]})}case"user_email":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:l.IBq}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n}),o(i,"text")]});case"gender":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:l.ILF}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n}),o(i,"text")]});case"user_date_of_birth":return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.G,{className:"mr-1.5",icon:l.Ry6}),(0,r.jsx)("span",{className:"mr-1.5 font-semibold",children:n}),o(i)]})}})()})},d=a(4184),u=a.n(d),m=e=>{let{itemsList:t,className:a}=e;return(0,r.jsx)("div",{className:u()("mb-5",a),children:t.map(e=>(0,r.jsx)(c,{item:e},e.title))})}},7071:function(e,t,a){"use strict";a.d(t,{Z:function(){return p}});var r=a(5893),s=a(3635),l=a(1654),n=a(4033),i=a(4193),o=a(7294),c=a(7245),d=a(8218),u=a(2056);let m=async e=>{let t=d.I.currentUser,a=null==t?void 0:t.uid;await (0,u.c)({favoriteGenres:e},a)};var f=a(2624),h=a(5287),v=(e,t)=>{let{onFormClose:a,isEditTags:r}=t,[s,l]=(0,o.useState)([]),[n,i]=(0,o.useState)(e),{showModal:d}=(0,c.d)(),u=()=>{a&&a(!1)},v=async()=>{await m(n).then(()=>{u(),(0,f.LX)(d,"Your profile was successfully updated")})};return(0,o.useEffect)(()=>{if(r){let e=async()=>{let e=await (0,h.K)("all");l(e)};e()}else l(e)},[r]),{itemsList:s,toggleTag:(e,t)=>{t?i(t=>t.filter(t=>t.name!==e.name)):i(t=>[...t,e])},saveChanges:v,closeEditTagsForm:u,checkIfTagIsSelected:t=>{if(e&&e.find(e=>e.name===t))return!0}}},p=e=>{let{tags:t,title:a="",className:o,isEditTags:c=!1,onFormClose:d}=e,{itemsList:u,toggleTag:m,saveChanges:f,closeEditTagsForm:h,checkIfTagIsSelected:p}=v(t,{onFormClose:d,isEditTags:c});return u.length?(0,r.jsxs)("div",{className:o,children:[a&&(0,r.jsx)(l.Z,{variant:"h3",children:a}),(0,r.jsx)("div",{className:"flex flex-wrap justify-start items-start",children:u.map(e=>(0,r.jsx)(s.Z,{tag:e,isEdit:c,isSelected:p(e.name),onToggle:m},e.name))}),c&&(0,r.jsxs)("div",{className:"w-full flex justify-start items-center gap-2 mt-5",children:[(0,r.jsx)(i.Z,{onClick:f,children:"Save"}),(0,r.jsx)(i.Z,{context:"filledDark",onClick:h,children:"Cancel"})]})]}):(0,r.jsx)(n.Z,{title:a,variant:"h3",text:"No genres yet",className:o})}},2056:function(e,t,a){"use strict";a.d(t,{c:function(){return l}});var r=a(9105),s=a(8218);let l=async(e,t)=>{let a=(0,r.iH)(s.F,"users/".concat(t,"/info")),l=(await (0,r.U2)(a)).val(),n={...l,...e};await (0,r.t8)(a,n)}},7221:function(e,t,a){"use strict";a.d(t,{n:function(){return d}});var r=a(9105),s=a(8218),l=a(9810),n=a(3863),i=a(1590);let o=async e=>{try{let t=async t=>{let a=[],l="users/".concat(e,"/collection/marks/").concat(t),n=(0,r.iH)(s.F,l),i=await (0,r.U2)(n);return i.exists()&&i.forEach(e=>{let t=e.val();a.push(t)}),a},a=await t(i.zS.movie),l=await t(i.zS.tv);return[...a,...l]}catch(e){throw e}},c=async(e,t)=>{let a=t.type;try{switch(a){case"movie":case"tv":case"person":let s=await Promise.all(e.map(async e=>{let a=await (0,l.R)(t.type,e,"");return a})),i=(0,n.v)(s);return i;case"reviews":case"replies":return await Promise.all(e.map(async e=>{let a=await (0,r.U2)((0,r.iU)(t.ref,e));return a.val()}));case"marks":return await o(t.userId)}}catch(e){throw e}},d=async function(e,t,a){let l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:void 0;try{let n;let i=(0,r.iH)(s.F,"users/".concat(e,"/")),o=await (0,r.U2)(i);if(!o.exists())throw"Failed to fetch";let d="users/".concat(e,"/collection/").concat(t,"/"),u=(0,r.iH)(s.F,d);n=l?null!==a?(0,r.IO)(u,(0,r.R)(),(0,r.TQ)(l),(0,r.Kk)(a+1)):(0,r.IO)(u,(0,r.R)(),(0,r.TQ)(l)):null!==a?(0,r.IO)(u,(0,r.R)(),(0,r.Kk)(a+1)):(0,r.IO)(u,(0,r.R)());let m=await (0,r.U2)(n),f=m.val()||{},h=Object.keys(f),v=!1;if(null!==a&&h.length>a&&(v=!0,h.pop()),!h.length)return{isMoreDataAvailable:v,items:[]};let p=await c(h,{type:t,ref:u,userId:e});return{isMoreDataAvailable:v,items:p}}catch(e){throw e}}},3196:function(e,t,a){"use strict";a.d(t,{J:function(){return u}});var r=a(8218),s=a(9810),l=a(1590),n=a(9105);let i=async(e,t,a)=>{let s="users/".concat(e,"/collection/reviews/").concat(a,"/").concat(t),l=(0,n.iH)(r.F,s);try{let e=await (0,n.U2)(l);if(!e.exists())return;{let t=e.val();return t}}catch(e){return null}},o=(e,t)=>new Promise(async a=>{let r=t.filter(e=>void 0!==e.reviewedItemId&&void 0!==e.reviewId),n=new Set,o=async(e,t,a)=>{let r=await (0,s.R)(a,e,"/reviews"),l=r.results.find(e=>e.id===t);if(!n.has(t)&&l){let r={...l,reviewedItemId:e,reviewedItemCollectionType:a};return n.add(t),r}return null},c=r.map(t=>{let a=!t.reviewAuthorId,r=t.reviewAuthorId===e,s=t.reviewedItemCollectionType===l.zS.movie;if(s&&!r)return a?o(t.reviewedItemId,t.reviewId,l.zS.movie):i(t.reviewAuthorId,t.reviewId,l.zS.movie)}),d=r.map(t=>{let a=!t.reviewAuthorId,r=t.reviewAuthorId===e,s=t.reviewedItemCollectionType===l.zS.tv;if(s&&!r)return a?o(t.reviewedItemId,t.reviewId,l.zS.tv):i(t.reviewAuthorId,t.reviewId,l.zS.tv)}),u=await Promise.all(c),m=await Promise.all(d),f=u.filter(e=>null!=e),h=m.filter(e=>null!=e);a([...f,...h].filter(e=>void 0!==e))});var c=a(7221);let d=async(e,t)=>{try{let a="users/".concat(e,"/collection/").concat(t,"/"),s=(0,n.iH)(r.F,a),l=(0,n.IO)(s,(0,n.R)()),i=await (0,n.U2)(l),o=i.val()||{},c=[];for(let e in o){let t=o[e];for(let e in t){let a=t[e];c.push(a)}}return c}catch(e){throw e}},u=async e=>{try{let t=await (0,c.n)(e,l.zS.movie,5),a=await (0,c.n)(e,l.zS.tv,5),r=await (0,c.n)(e,l.zS.person,5),s=await (0,c.n)(e,l.zS.marks,null),n=await d(e,l.zS.reviews),i=await d(e,l.zS.replies),u=await o(e,i),m=[...n.filter(e=>void 0!==e.reviewedItemId&&void 0!==e.id),...u];return{collectionMovies:t.items,collectionTVShows:a.items,collectionPersons:r.items,allCollectionReviews:m,collectionMarks:s.items}}catch(e){throw e}}},7615:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSP:function(){return ey},default:function(){return ej}});var r=a(5893),s=a(7294),l=a(1163),n=a(4628),i=a(1654),o=a(5633),c=e=>{let{userInfo:t}=e,[a,l]=(0,s.useState)(null),n=[{type:"user_email",title:"Email:",text:null==a?void 0:a.email},{type:"user_date_of_birth",title:"Date of birth:",text:null==a?void 0:a.dateOfBirth},{type:"user_country",title:"Country:",text:null==a?void 0:a.country}];return(0,s.useEffect)(()=>{l(t)},[t]),(0,r.jsx)("div",{className:"flex flex-col justify-start items-center",children:(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsx)(i.Z,{className:"text-3xl md:text-7xl after:hidden pb-0",children:null==a?void 0:a.displayName}),(0,r.jsx)(o.Z,{itemsList:n,className:"!mb-8"}),(0,r.jsxs)("div",{className:"mb-8",children:[(0,r.jsx)(i.Z,{variant:"h3",children:"About"}),(null==a?void 0:a.about)?null==a?void 0:a.about:"No info yet"]})]})})},d=a(6406),u=a(4193),m=a(4579),f=a(9417),h=a(9544),v=a(2096),p=a(381),w=a.n(p),x=e=>{let{initialDateValue:t,label:a,onChange:l,required:n}=e,[i,o]=(0,s.useState)({startDate:w()(t,"YYYY-MM-DD").toDate(),endDate:w()(t,"YYYY-MM-DD").toDate()});return(0,r.jsxs)("div",{className:"relative w-full bg-transparent text-base border border-gray-500 hover:border-white focus-within:border-white duration-300 block text-white",children:[(0,r.jsx)("span",{className:"text-xs text-gray-500 font-semibold absolute top-3 left-3",children:"".concat(a).concat(n?" *":"")}),(0,r.jsx)(v.Z,{readOnly:!0,primaryColor:"rose",toggleClassName:e=>"".concat(e," pt-4"),inputClassName:e=>"".concat(e," w-full !bg-transparent !rounded-none focus:!ring-0 focus:!border-0 focus-visible:!outline-0 !border-0 !font-light !text-base !text-white pl-3 pt-7 pb-2 pr-3"),useRange:!1,asSingle:!0,value:i,onChange:(e,t)=>{if(e){let a={startDate:e.startDate,endDate:e.endDate};l(a,t),o(e)}},minDate:new Date("1940-01-01"),maxDate:new Date})]})};let y=e=>({isLoading:!1,isTouched:!1,formData:{name:{value:e.displayName,error:""},country:{value:e.country||"",error:""},dateOfBirth:{value:e.dateOfBirth||"",error:""},about:{value:e.about||"",error:""},formError:{error:""}}}),j=(e,t,a)=>{switch(t.type){case"SET_FORM_DATA":return{...e,formData:t.payload};case"SET_LOADING":return{...e,isLoading:t.payload};case"SET_TOUCHED":return{...e,isTouched:!0};case"CLEAR_FORM":return y(a);default:return e}};var g=e=>(0,s.useReducer)((t,a)=>j(t,a,e),y(e)),D=a(7245),N=a(9299),S=a(2624),b=a(8218),I=a(316),E=a(2056);let _=async e=>{let t=b.I.currentUser,a=e.name.value,r=null==t?void 0:t.uid,s=null==t?void 0:t.photoURL,l={displayName:e.name.value,country:e.country.value,dateOfBirth:e.dateOfBirth.value,about:e.about.value};await (0,I.ck)(t,{displayName:a,photoURL:s}),await (0,E.c)(l,r)};var C=(e,t)=>{let[a,r]=g(e),{showModal:s}=(0,D.d)(),l=a.formData.name.value.length>0,n=(e,t,s)=>{r({type:"SET_FORM_DATA",payload:{...a.formData,[e]:{...a.formData[e],value:t,error:s}}}),a.isTouched||r({type:"SET_TOUCHED",payload:!0})},i=e=>{r({type:"SET_FORM_DATA",payload:{...a.formData,formError:{error:e}}})},o=()=>{r({type:"CLEAR_FORM"})},c=async e=>{if(e.preventDefault(),r({type:"SET_LOADING",payload:!0}),l&&a.isTouched)try{await _(a.formData),t(!1),i(""),o(),(0,S.LX)(s,"Your profile was successfully updated")}catch(e){i(e.toString())}finally{r({type:"SET_LOADING",payload:!1})}else r({type:"SET_FORM_DATA",payload:{...a.formData,name:{...a.formData.name,error:l?"":N.R.REQUIRED_FIELD}}}),r({type:"SET_LOADING",payload:!1})};return{state:a,handleNameChange:e=>{let t=""===e.target.value?N.R.REQUIRED_FIELD:"";n("name",e.target.value,t)},handleCountryChange:e=>{n("country",e.target.value,"")},handleDateOfBirthChange:e=>{n("dateOfBirth",e?e.startDate:"","")},handleTextareaChange:e=>{n("about",e,"")},handleSubmit:c}},T=e=>{let{profileInfo:t,onFormClose:a}=e,{state:s,handleNameChange:l,handleCountryChange:i,handleDateOfBirthChange:o,handleTextareaChange:c,handleSubmit:v}=C(t,a);return(0,r.jsxs)("form",{onSubmit:v,className:"flex flex-col justify-start items-start gap-4 mb-16",children:[(0,r.jsx)(m.Z,{id:"userName",label:"Name",value:s.formData.name.value,error:s.formData.name.error,onChange:l,icon:f.ILF,required:!0,placeholder:"Name"}),(0,r.jsx)(m.Z,{id:"country",label:"Country",value:s.formData.country.value,onChange:i,icon:f.Ry6,placeholder:"Country"}),(0,r.jsx)(x,{initialDateValue:s.formData.dateOfBirth.value,onChange:e=>o(e),label:"Date of birth"}),(0,r.jsx)(d.Z,{onChange:c,value:s.formData.about.value}),s.formData.formError.error&&(0,r.jsx)(h.Z,{className:"px-4 py-2 bg-rose-600/20 w-full rounded-md",error:s.formData.formError.error}),(0,r.jsxs)("div",{className:"w-full mt-8 flex justify-start items-center",children:[(0,r.jsx)(u.Z,{type:"submit",children:s.isLoading?(0,r.jsx)(n.Z,{isShowText:!0,type:"static"}):"Update"}),(0,r.jsx)(u.Z,{context:"filledDark",className:"ml-2",onClick:()=>a(!1),children:"Cancel"})]})]})},R=a(1084),F=a(3155),O=a(9608),P=a(3087),Z=a(4184),A=a.n(Z),L=a(9603),U=e=>{let{id:t,onChange:a,error:s,className:l}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("label",{htmlFor:t,className:A()("w-full min-h-[48px] bg-gray-700 rounded-3xl hover:bg-gray-600 font-semibold p-3 flex justify-center items-center duration-300 cursor-pointer",l),children:[(0,r.jsx)(L.G,{icon:f.PQh,className:"mr-2"}),"Upload image",(0,r.jsx)("input",{onChange:a,type:"file",id:t,accept:"image/*",className:"hidden"})]}),s&&(0,r.jsx)(h.Z,{className:"text-center",error:s})]})},k=e=>{let{progress:t}=e;return(0,r.jsx)("div",{style:{width:"".concat(t,"%")},className:"h-1 bg-rose-600 mt-2"})},M=a(6650);let z=async e=>{let t=b.I.currentUser,a=null==t?void 0:t.displayName,r=null==t?void 0:t.uid;await (0,I.ck)(t,{displayName:a,photoURL:e}),await (0,E.c)({photoURL:e},r)};var G=e=>{let[t,a]=(0,s.useState)({value:e,error:""}),[r,l]=(0,s.useState)(0),n=(0,M.cF)(),{showModal:i}=(0,D.d)(),o=t&&!t.error&&100===r,c=(e,t)=>{let r=0!==t.length?t:"";a({value:e,error:r})},d=async e=>{let a=e.target.files&&e.target.files[0];if(a){if(a.size>1048576){c(t.value,"The file size should not exceed 1MB");return}try{let e=await u(a,l);200===e.status&&c(e.data,"")}catch(e){c(t.value,e.toString())}}},u=async(e,t)=>{let a=(0,M.iH)(n,"images/".concat(e.name)),r=(0,M.B0)(a,e);r.on("state_changed",e=>{let a=e.bytesTransferred/e.totalBytes*100;t(a)});try{await r;let e=await (0,M.Jt)(a);return{status:200,data:e}}catch(e){return{status:500,data:"Error uploading image"}}};return(0,s.useEffect)(()=>{a({value:e,error:""})},[e]),{image:t,uploadProgress:r,isShowProgressBar:r>0&&r<100,isShowSaveButton:o,changeProfileImage:d,saveProfileImage:()=>{z(t.value).then(()=>{l(0),(0,S.LX)(i,"Your profile was successfully updated")})}}},H=e=>{let{photoURL:t,isCurrentUserProfile:a}=e,{image:s,uploadProgress:l,isShowProgressBar:n,isShowSaveButton:i,changeProfileImage:o,saveProfileImage:c}=G(t);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.Z,{className:"!w-[232px] h-[232px] rounded-full mb-4",src:s.value,defaultImage:P.Z}),a&&(0,r.jsxs)(r.Fragment,{children:[i?(0,r.jsx)(u.Z,{className:"w-full",onClick:c,children:"Save changes"}):(0,r.jsx)(U,{id:"profileImage",error:s.error,onChange:o}),n&&(0,r.jsx)(k,{progress:l})]})]})},B=a(7071),Y=a(8642),V=a(4240),Q=a(9989),q=a(4033),X=a(3917),W=e=>{let{friends:t,onRemove:a}=e,{showModal:l}=(0,D.d)(),[n,o]=(0,s.useState)([]),c=t.length>3;return((0,s.useEffect)(()=>{o(t)},[t]),n.length)?(0,r.jsxs)("div",{className:"mb-16",children:[(0,r.jsx)(i.Z,{children:"Friends"}),(0,r.jsxs)("div",{className:"flex justify-start items-center",children:[(0,r.jsx)("div",{className:"flex justify-start items-center",children:n.map((e,t)=>{if(t<3)return(0,r.jsx)(X.Z,{userId:e.info.id,photoURL:e.info.photoURL,isLinkToProfile:!0},e.info.id)})}),c&&(0,r.jsx)(u.Z,{context:"text",onClick:()=>(0,S.MB)(l,n,a),children:"Show all"})]})]}):(0,r.jsx)(q.Z,{title:"Friends",text:"No friends yet"})};let J={isLoading:!1,isTouched:!1,formData:{email:{value:"",error:""},oldPassword:{value:"",error:""},newPassword:{value:"",error:""},formError:{error:""}}},K=(e,t)=>{switch(t.type){case"SET_FORM_DATA":return{...e,formData:t.payload};case"SET_LOADING":return{...e,isLoading:t.payload};case"SET_TOUCHED":return{...e,isTouched:!0};case"CLEAR_FORM":return J;default:return e}};var $=()=>(0,s.useReducer)(K,J);let ee=async e=>{let t=b.I.currentUser,a=null==t?void 0:t.uid,r=null==t?void 0:t.email,s={email:e.email.value},l=I.w9.credential(r,e.oldPassword.value);await (0,I.aF)(t,l).then(async()=>{await (0,I.s)(t,e.email.value),await (0,I.gQ)(t,e.newPassword.value),await (0,E.c)(s,a)})};var et=e=>{let[t,a]=$(),{showModal:r}=(0,D.d)(),s=/\S+@\S+\.\S+/.test(t.formData.email.value),l=t.formData.oldPassword.value.length>0,n=t.formData.newPassword.value.length>6,i=t.formData.newPassword.value===t.formData.oldPassword.value,o=function(e,r){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";a({type:"SET_FORM_DATA",payload:{...t.formData,[e]:{...t.formData[e],value:r,error:s}}}),t.isTouched||a({type:"SET_TOUCHED",payload:!0})},c=e=>{a({type:"SET_FORM_DATA",payload:{...t.formData,formError:{error:e}}})},d=()=>{a({type:"CLEAR_FORM"})},u=async o=>{if(o.preventDefault(),a({type:"SET_LOADING",payload:!0}),s&&l&&n&&!i&&t.isTouched)try{await ee(t.formData),e(!1),c(""),d(),(0,S.LX)(r,"Your profile was successfully updated")}catch(e){c(e.toString())}finally{a({type:"SET_LOADING",payload:!1})}else a({type:"SET_FORM_DATA",payload:{...t.formData,email:{...t.formData.email,error:s?"":N.R.REQUIRED_FIELD},oldPassword:{...t.formData.oldPassword,error:l?"":N.R.REQUIRED_FIELD},newPassword:{...t.formData.newPassword,error:n?i?N.R.SAME_PASSWORDS:"":N.R.INVALID_PASSWORD}}}),a({type:"SET_LOADING",payload:!1})};return{state:t,handleEmailChange:e=>{let t=""===e.target.value?N.R.INVALID_EMAIL:"";o("email",e.target.value,t)},handleOldPasswordChange:e=>{let t=""===e.target.value?N.R.INVALID_PASSWORD:"";o("oldPassword",e.target.value,t)},handleNewPasswordChange:e=>{let t=""===e.target.value?N.R.INVALID_PASSWORD:"";o("newPassword",e.target.value,t)},handleSubmit:u}},ea=e=>{let{onFormClose:t}=e,{state:a,handleEmailChange:s,handleOldPasswordChange:l,handleNewPasswordChange:i,handleSubmit:o}=et(t);return(0,r.jsxs)("form",{onSubmit:o,className:"flex flex-col justify-start items-start gap-4 mb-16",children:[(0,r.jsx)(m.Z,{id:"userEmail",label:"Email",value:a.formData.email.value,error:a.formData.email.error,onChange:s,icon:f.IBq,required:!0,placeholder:"Email"}),(0,r.jsx)(m.Z,{id:"userOldPassword",label:"Old password",value:a.formData.oldPassword.value,error:a.formData.oldPassword.error,onChange:l,icon:f.DD4,required:!0,type:"password",placeholder:"Old password"}),(0,r.jsx)(m.Z,{id:"userNewPassword",label:"New password",value:a.formData.newPassword.value,error:a.formData.newPassword.error,onChange:i,icon:f.DD4,required:!0,type:"password",placeholder:"New password"}),a.formData.formError.error&&(0,r.jsx)(h.Z,{className:"px-4 py-2 bg-rose-600/20 w-full rounded-md",error:a.formData.formError.error}),(0,r.jsxs)("div",{className:"w-full mt-8 flex justify-start items-center",children:[(0,r.jsx)(u.Z,{type:"submit",children:a.isLoading?(0,r.jsx)(n.Z,{isShowText:!0,type:"static"}):"Update"}),(0,r.jsx)(u.Z,{context:"filledDark",className:"ml-2",onClick:()=>t(!1),children:"Cancel"})]})]})},er=a(9105);let es=async e=>{let t=b.I.currentUser,a=null==t?void 0:t.uid,r="users/".concat(a,"/friends/").concat(e,"/"),s="users/".concat(e,"/friends/").concat(a,"/"),l=(0,er.iH)(b.F,r),n=(0,er.iH)(b.F,s);await (0,er.t8)(l,e),await (0,er.t8)(n,a)},el=e=>{let t=b.I.currentUser,a=null==t?void 0:t.uid,r="users/".concat(a,"/friends/").concat(e),s="users/".concat(e,"/friends/").concat(a),l=(0,er.iH)(b.F,r),n=(0,er.iH)(b.F,s);return new Promise(async e=>{let t=!1;(0,er.Od)(l).then(()=>{(0,er.Od)(n).then(()=>{t=!0})}),e(t)})},en=e=>{let t=b.I.currentUser,a=null==t?void 0:t.uid,r="users/".concat(a,"/friends/").concat(e),s=(0,er.iH)(b.F,r);return new Promise(async e=>{let t=!1;(0,er.U2)(s).then(a=>{a.exists()&&(t=!0),e(t)})})},ei=e=>{let[t,a]=(0,s.useState)(!1),[r,l]=(0,s.useState)(!0),{showModal:n,hideModal:i}=(0,D.d)(),{isLoggedIn:o}=(0,Y.a)(),c=null==e?void 0:e.id,d=(e,t)=>{i(t),l(!0),setTimeout(()=>{el(e).then(()=>{a(!1)}).then(()=>{(0,S.LX)(n,"User was removed from friends")}).catch(()=>{(0,S.s9)(n,"An error has occurred")}).finally(()=>{l(!1)})},500)};return(0,s.useEffect)(()=>{o?(l(!0),c&&en(null==e?void 0:e.id).then(e=>{a(e)}).finally(()=>{l(!1)})):l(!1)},[o,e]),{isLoadingFriends:r,isFriend:t,handleSetNewFriend:()=>{o?(l(!0),c&&es(null==e?void 0:e.id).then(()=>{en(null==e?void 0:e.id).then(e=>{a(e),(0,S.LX)(n,"User added as friend")}).catch(()=>{(0,S.s9)(n,"An error has occurred")}).finally(()=>{l(!1)})})):(0,S.Mo)(n)},openConfirmationPopup:function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;t&&i(t),(0,S.kS)(n,i,d,null==e?void 0:e.displayName,null==e?void 0:e.id)}}};var eo=a(6584),ec=a(9377),ed=a(1590),eu=a(3196),em=a(7338);let ef=e=>new Promise(async t=>{let a=[],r=Object.keys(e).map(async e=>{let t=await (0,em.s)(e);a.push(t)});await Promise.all(r),t(a)}),eh=async e=>{try{let t=[],a=await (0,em.s)(e),r=await (0,eu.J)(e);return a.friends&&(t=await ef(a.friends)),{info:a.info,friends:t,collection:r}}catch(e){throw e}};var ev=a(8960);let ep=(e,t)=>{let{oldFriendList:a,setFriends:r}=t,s=(0,er.iH)(b.F,"users/".concat(e,"/friends")),l=async e=>{let t=e.val(),s=0===a.length,l=a.some(e=>e.info.id===t);if(s||!l){let e=await (0,em.s)(t);r(t=>[e,...t])}},n=(0,er.yv)(s,l),i=(0,er.MQ)(s,e=>{let t=e.val();r(e=>e.filter(e=>e.info.id!==t))});return()=>{n(),i()}};var ew=a(5276);let ex=(e,t)=>{let a=(0,er.iH)(b.F,"users/".concat(e,"/info")),r=(0,ew.jM)(a,e=>{let a=e.val();t(a)});return()=>{r()}};var ey=!0,ej=e=>{var t,a,i,o,d,u;let{profilePageProps:m}=e,[h,v]=(0,s.useState)(!0),[p,w]=(0,s.useState)(null),[x,y]=(0,s.useState)([]),[j,g]=(0,s.useState)(null),[N,b]=(0,s.useState)(!1),[I,E]=(0,s.useState)(!1),[_,C]=(0,s.useState)(!1),{showModal:O}=(0,D.d)(),P=(0,l.useRouter)(),{userId:Z}=(0,Y.a)(),A=Z===(null==p?void 0:p.id),{isLoadingFriends:L,isFriend:U,handleSetNewFriend:k,openConfirmationPopup:M}=ei(p),z=()=>{b(!1),E(!1),C(!1)},G=e=>{z(),e(!0)};return((0,s.useEffect)(()=>{let e=async()=>{let e=P.query.id;v(!0),w(null),eh(e).then(e=>{w(e.info),y(e.friends),g(e.collection)}).catch(()=>{(0,S.s9)(O,"An error has occurred")}).finally(()=>{v(!1)})};m?(w(m.info),y(m.friends),g(m.collection)):e()},[m,P.query.id]),(0,s.useEffect)(()=>{if(A){let e=ex(Z,w);return()=>{e()}}},[A]),(0,s.useEffect)(()=>{if(p){let e=ep(p.id,{oldFriendList:x,setFriends:y});return()=>{e()}}},[p,x]),p)?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(F.Z,{imageSrc:R.Ie}),(0,r.jsxs)("div",{className:"flex justify-start items-start gap-14 flex-wrap md:flex-nowrap",children:[(0,r.jsxs)("div",{className:"mb-0 mt-24 md:mb-16 md:mt-0 relative mx-auto",children:[(0,r.jsx)(H,{photoURL:p.photoURL,isCurrentUserProfile:A}),!A&&(0,r.jsx)(eo.Z,{className:"md:w-full",isLoadingCollection:L,isCollectionItem:U,onClick:U?()=>M(p):k,collectionType:ed.zS.friends}),A&&(0,r.jsxs)(Q.Z,{icon:"settings",className:"!top-0 !right-0",children:[(0,r.jsx)(V.Z,{label:"Edit info",icon:f.Yai,onClick:()=>G(b)}),(0,r.jsx)(V.Z,{label:"Edit genres",icon:f.Ljc,onClick:()=>G(E)}),(0,r.jsx)(V.Z,{label:"Edit email/password",icon:f.DD4,onClick:()=>G(C)})]})]}),(0,r.jsxs)("div",{className:"w-full",children:[N?(0,r.jsx)(T,{profileInfo:p,onFormClose:b}):_?(0,r.jsx)(ea,{onFormClose:C}):(0,r.jsx)(c,{userInfo:p}),(0,r.jsx)(B.Z,{tags:null!==(t=p.favoriteGenres)&&void 0!==t?t:[],title:"Favorite genres",className:"mb-8",isEditTags:I,onFormClose:E}),(0,r.jsx)(W,{friends:x||[],onRemove:M})]})]}),!A&&(0,r.jsx)(ec.Z,{movies:null!==(a=null==j?void 0:j.collectionMovies)&&void 0!==a?a:[],tvShows:null!==(i=null==j?void 0:j.collectionTVShows)&&void 0!==i?i:[],persons:null!==(o=null==j?void 0:j.collectionPersons)&&void 0!==o?o:[],marks:null!==(d=null==j?void 0:j.collectionMarks)&&void 0!==d?d:[],reviews:null!==(u=null==j?void 0:j.allCollectionReviews)&&void 0!==u?u:[],isCurrentUserCollection:A,collectionOwnerId:null==p?void 0:p.id})]}):h?(0,r.jsx)(n.Z,{className:"bg-transparent"}):(0,r.jsx)(ev.Z,{title:"Something went wrong",text:"No data found"})}}},function(e){e.O(0,[885,739,319,347,342,951,774,888,179],function(){return e(e.s=3471)}),_N_E=e.O()}]);