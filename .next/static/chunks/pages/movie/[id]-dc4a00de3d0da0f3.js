(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[937],{3747:function(i,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/movie/[id]",function(){return t(5964)}])},5964:function(i,e,t){"use strict";t.r(e),t.d(e,{__N_SSP:function(){return m}});var s=t(5893),l=t(721),n=t(4628),o=t(3155),r=t(5410),a=t(1590),u=t(8960),d=t(7287),v=t(6683),c=t(1163),m=!0;e.default=i=>{var e;let{moviePageProps:t}=i,m=(0,c.useRouter)(),_=m.query.id,{data:f,isLoading:w,urlToFetchSimilarItems:g}=(0,v.Z)(t,_,a.zS.movie),h=(null==f?void 0:f.video)&&f.video.length>0?f.video.find(i=>("Teaser"===i.type||"Trailer"===i.type)&&"YouTube"===i.site):null,p=(null==h?void 0:h.key)||"";return f?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.Z,{imageSrc:null==f?void 0:null===(e=f.images[0])||void 0===e?void 0:e.file_path}),(0,s.jsx)(d.Z,{basicInfo:null==f?void 0:f.basicInfo,images:null==f?void 0:f.images,reviews:null==f?void 0:f.reviewsFromAPIAndStorage,video:p,collectionType:a.zS.movie}),(0,s.jsxs)("div",{children:[(0,s.jsx)(l.Z,{itemsList:null==f?void 0:f.credits.cast,title:"Cast"}),(0,s.jsx)(l.Z,{itemsList:null==f?void 0:f.credits.crew,title:"Crew"}),(0,s.jsx)(r.Z,{itemsList:null==f?void 0:f.similarItemsList.items,collectionType:a.zS.movie,isMoreDataAvailable:null==f?void 0:f.similarItemsList.isMoreDataAvailable,urlToFetchItems:g,title:"Similar movies"})]})]}):w?(0,s.jsx)(n.Z,{className:"bg-transparent"}):(0,s.jsx)(u.Z,{title:"Something went wrong",text:"No data found"})}}},function(i){i.O(0,[885,4,347,342,951,638,751,774,888,179],function(){return i(i.s=3747)}),_N_E=i.O()}]);