(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{"16l3":function(e,t,n){"use strict";n.r(t);var a=n("AcpX"),r=n("q1tI"),i=n.n(r),o=n("Wbzz"),l=n("qhky"),c=n("VeD8"),m=n("pQ8y"),s=n("nLfd"),d=n("20nU"),p=n("Kvkj"),f=n("g67X"),u=n("vOnD"),h=n("InJ6");function g(){var e=Object(a.a)(["grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));"]);return g=function(){return e},e}var y=h.j.colors,x=h.j.fontSizes,b=h.j.fonts,j=Object(u.c)(h.f).withConfig({displayName:"projects__StyledContainer",componentId:"qbhmfi-0"})(["",";flex-direction:column;align-items:flex-start;padding-bottom:50px;width:80vw;"],h.i.flexCenter),w=Object(u.c)(o.a).withConfig({displayName:"projects__StyledArchiveLink",componentId:"qbhmfi-1"})(["",";text-align:center;margin:0 auto;font-family:",";font-size:",";&:after{bottom:0.1em;}"],h.i.inlineLink,b.Raleway,x.sm),E=u.c.div.withConfig({displayName:"projects__StyledGrid",componentId:"qbhmfi-2"})(["margin-top:50px;.projects{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));grid-gap:15px;position:relative;",";}"],h.h.desktop(g())),_=u.c.div.withConfig({displayName:"projects__StyledProjectInner",componentId:"qbhmfi-3"})(["",";",";flex-direction:column;align-items:flex-start;position:relative;padding:2rem 1.75rem;height:100%;border-radius:",";transition:",";background-color:",";"],h.i.boxShadow,h.i.flexBetween,h.j.borderRadius,h.j.transition,y.background_secondary),v=u.c.div.withConfig({displayName:"projects__StyledProject",componentId:"qbhmfi-4"})(["transition:",";cursor:default;&:hover,&:focus{outline:0;","{transform:translateY(-5px);}}"],h.j.transition,_),k=u.c.div.withConfig({displayName:"projects__StyledProjectHeader",componentId:"qbhmfi-5"})(["",";margin-bottom:30px;"],h.i.flexBetween),S=u.c.div.withConfig({displayName:"projects__StyledFolder",componentId:"qbhmfi-6"})(["color:",";svg{width:40px;height:40px;}"],y.accent),C=u.c.div.withConfig({displayName:"projects__StyledProjectLinks",componentId:"qbhmfi-7"})(["margin-right:-10px;color:",";"],y.textSecondary),I=u.c.a.withConfig({displayName:"projects__StyledIconLink",componentId:"qbhmfi-8"})(["position:relative;top:-10px;padding:10px;svg{width:20px;height:20px;}"]),N=u.c.h5.withConfig({displayName:"projects__StyledProjectName",componentId:"qbhmfi-9"})(["margin:0 0 10px;font-size:",";color:",";"],x.xxl,y.textPrimary),q=u.c.div.withConfig({displayName:"projects__StyledProjectDescription",componentId:"qbhmfi-10"})(["font-size:17px;color:",";a{",";}"],y.textSecondary,h.i.inlineLink),O=u.c.ul.withConfig({displayName:"projects__StyledTechList",componentId:"qbhmfi-11"})(["display:flex;align-items:flex-end;flex-grow:1;flex-wrap:wrap;padding:0;margin:20px 0 0 0;list-style:none;li{font-family:",";font-size:",";color:",";line-height:1.75;margin-right:15px;&:last-of-type{margin-right:0;}}"],b.Raleway,x.xs,y.textSecondary),L=Object(u.c)(h.a).withConfig({displayName:"projects__StyledMoreButton",componentId:"qbhmfi-12"})(["margin:100px auto 0;"]);t.default=function(e){var t=e.data,n=Object(r.useState)(!1),a=n[0],o=n[1],u=Object(r.useRef)(null),g=Object(r.useRef)(null),y=Object(r.useRef)([]);Object(r.useEffect)((function(){s.a.reveal(u.current,Object(d.srConfig)()),s.a.reveal(g.current,Object(d.srConfig)()),y.current.forEach((function(e,t){return s.a.reveal(e,Object(d.srConfig)(100*t))}))}),[]);var x=t.projects.edges.filter((function(e){return e.node})),b=x.slice(0,6),P=a?x:b;return i.a.createElement(p.f,{isHome:!1,animateNav:!1,footer:!0},i.a.createElement(l.a,null,i.a.createElement("title",null,"Projects | Howard Tseng"),i.a.createElement("link",{rel:"canonical",href:"https://howardt12345.com/projects"})),i.a.createElement(j,null,i.a.createElement(h.d,null,"Projects"),i.a.createElement(w,{to:"/archive",ref:g},"view the archive"),i.a.createElement(E,null,i.a.createElement(c.a,{className:"projects"},P&&P.map((function(e,t){var n=e.node,a=n.frontmatter,r=n.html,o=a.github,l=a.external,c=a.title,s=a.tech;return i.a.createElement(m.a,{key:t,classNames:"fadeup",timeout:t>=6?300*(t-6):300,exit:!1},i.a.createElement(v,{key:t,ref:function(e){return y.current[t]=e},tabIndex:"0",style:{transitionDelay:(t>=6?100*(t-6):0)+"ms"}},i.a.createElement(_,null,i.a.createElement("header",null,i.a.createElement(k,null,i.a.createElement(S,null,i.a.createElement(f.a,{name:"Folder"})),i.a.createElement(C,null,o&&i.a.createElement(I,{href:o,target:"_blank",rel:"nofollow noopener noreferrer","aria-label":"GitHub Link"},i.a.createElement(f.a,{name:"GitHub"})),l&&i.a.createElement(I,{href:l,target:"_blank",rel:"nofollow noopener noreferrer","aria-label":"External Link"},i.a.createElement(f.a,{name:"External"})))),i.a.createElement(N,null,c),i.a.createElement(q,{dangerouslySetInnerHTML:{__html:r}})),i.a.createElement("footer",null,s&&i.a.createElement(O,null,s.map((function(e,t){return i.a.createElement("li",{key:t},e)})))))))})))),i.a.createElement(L,{onClick:function(){return o(!a)}},"Show ",a?"Less":"More")))}}}]);
//# sourceMappingURL=component---src-pages-projects-js-7badaa39dace67c408ab.js.map