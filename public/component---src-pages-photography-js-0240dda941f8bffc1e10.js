(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{g60q:function(e,t,n){"use strict";n.r(t);var a=n("kD0k"),r=n.n(a),o=(n("ls82"),n("/S4K")),c=n("q1tI"),s=n.n(c),i=n("y6RJ"),l=n("vOnD"),u=n("qhky"),p=(n("Wbzz"),n("7Qib")),h=n("Kvkj"),f=n("ON6M"),m=(n("InJ6"),n("LvDl")),d=l.c.section.withConfig({displayName:"photography__StyledSection",componentId:"sc-15qr3kx-0"})(["margin:auto 0;padding:100px 0 0px;"]),b=function(e,t){var n=this;this.getUrl=function(){return"https://firebasestorage.googleapis.com/v0/b/portfolio-49b69.appspot.com/o/photo%2F"+Object(p.f)(n.name," ","%20")+"?alt=media&token=ea925040-1fca-4eda-b1e8-0eb96567ab7e"},this.date=e,this.name=t.split('"')[1],this.width=parseInt(t.split(",")[1]),this.height=parseInt(t.split(",")[2])},g=function(){var e=Object(o.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=[],e.next=3,i.a.firestore().collection("photo").doc("all").get().then((function(e){for(var n=e.data().photos,a=0,r=Object.entries(n);a<r.length;a++){var o=r[a],c=o[0],s=o[1];t.push(new b(c,s))}}));case 3:return e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();t.default=function(){var e=Object(c.useState)(!0),t=e[0],n=e[1],a=Object(c.useState)(!1),l=a[0],b=a[1],v=Object(c.useState)({}),w=v[0],y=v[1];return Object(c.useEffect)((function(){function e(){return(e=Object(o.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i.a.auth().signInAnonymously();case 3:return console.log("signed in"),e.next=6,g();case 6:t=e.sent,y(t),n(!1),i.a.auth().currentUser.delete().then((function(){console.log("anonymous account deleted")})),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0),n(!1);case 16:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}Object(p.e)(w)&&t&&!l&&(b(!0),function(){e.apply(this,arguments)}())}),[t,l,w]),s.a.createElement(h.f,{animateNav:!1,isHome:!1,footer:!0},s.a.createElement(u.a,null,s.a.createElement("title",null,"Photography | Howard Tseng"),s.a.createElement("link",{rel:"canonical",href:"https://howardt12345.com/photography"})),s.a.createElement(d,null,!t&&!m.isEmpty(w)&&!m.isEmpty(w)&&s.a.createElement(f.c,{data:null!=w?w:[]}),t&&s.a.createElement(f.a,null)))}}}]);
//# sourceMappingURL=component---src-pages-photography-js-0240dda941f8bffc1e10.js.map