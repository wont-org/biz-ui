"use strict";(self.webpackChunkdumi_test=self.webpackChunkdumi_test||[]).push([[860],{1860:function(oe,en,c){c.r(en),c.d(en,{AutoLoadingButton:function(){return zn},PuzzleCaptcha:function(){return Nn},smoothScroll:function(){return Un}});var xn=c(57213),f=c.n(xn),bn=c(54306),B=c.n(bn),yn=c(12342),wn=c.n(yn),Mn=c(58338),M=c(85170),v=c(43010),Tn=["children","onClick"],zn=function(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=a.children,e=a.onClick,o=wn()(a,Tn),n=(0,M.useState)(!1),g=B()(n,2),p=g[0],b=g[1],y=function(T){return!!(T&&T.then)},C=function(){if(typeof e=="function"){var T=e();T&&y(T)&&(b(!0),T.then(function(){b(!1)},function(V){return b(!1),Promise.reject(V)}))}};return(0,v.jsx)(Mn.ZP,f()(f()({},o),{},{loading:p,onClick:C,children:r}))},jn=c(25359),S=c.n(jn),An=c(49811),X=c.n(An),Sn=c(84875),W=c.n(Sn),an=function(r){return new Promise(function(e){setTimeout(function(){e(!0)},r)})},Cn=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,d=function(r,e){return Math.ceil(Math.random()*(e-r)+r)},On=function(r,e){var o=document.createElement("canvas"),n=o.getContext("2d");if(!n)return"";o.width=r,o.height=e,n.fillStyle=`rgb(
    `.concat(d(100,255),`,
    `).concat(d(100,255),`,
    `).concat(d(100,255),`
  )`),n.fillRect(0,0,r,e);for(var g=0;g<12;g++)if(n.fillStyle=`rgb(
      `.concat(d(100,255),`,
      `).concat(d(100,255),`,
      `).concat(d(100,255),`
    )`),n.strokeStyle=`rgb(
      `.concat(d(100,255),`,
      `).concat(d(100,255),`,
      `).concat(d(100,255),`
    )`),d(0,2)>1)n.save(),n.rotate(d(-90,90)*Math.PI/180),n.fillRect(d(-20,o.width-20),d(-20,o.height-20),d(10,o.width/2+10),d(10,o.height/2+10)),n.restore();else{n.beginPath();var p=d(-Math.PI,Math.PI);n.arc(d(0,o.width),d(0,o.height),d(10,o.height/2+10),p,p+Math.PI*1.5),n.closePath(),n.fill()}return o.toDataURL("image/png")},Rn=function(r,e,o){return{x:d(o+20,r-o-20),y:d(20,e-o-20)}},D=function(r,e,o){if(r){var n=o/4,g=n/2;r.beginPath(),r.moveTo(e.x,e.y),r.lineTo(e.x+n,e.y),r.arcTo(e.x+n,e.y-g,e.x+n+g,e.y-g,g),r.arcTo(e.x+n+n,e.y-n/2,e.x+n+n,e.y,n/2),r.lineTo(e.x+n+n+n,e.y),r.lineTo(e.x+n+n+n,e.y+n),r.arcTo(e.x+n+n+n+n/2,e.y+n,e.x+n+n+n+n/2,e.y+n+n/2,n/2),r.arcTo(e.x+n+n+n+n/2,e.y+n+n,e.x+n+n+n,e.y+n+n,n/2),r.lineTo(e.x+n+n+n,e.y+n+n+n),r.lineTo(e.x,e.y+n+n+n),r.lineTo(e.x,e.y+n+n),r.arcTo(e.x+n/2,e.y+n+n,e.x+n/2,e.y+n+n/2,n/2),r.arcTo(e.x+n/2,e.y+n,e.x,e.y+n,n/2),r.lineTo(e.x,e.y),r.closePath()}},Yn=c(92935),En=c.n(Yn),Gn=c(75177),tn,Pn=Gn.zo.section(tn||(tn=En()([`
  .puzzle-captcha-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .puzzle-captcha-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    pointer-events: none;
    user-select: none;
    transition: opacity 200ms;
    z-index: 999;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .puzzle-captcha-body {
    width: fit-content;
    height: fit-content;
    user-select: none;
    background-color: #fff;
    padding: 16px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.06);

    .title-wrap {
      z-index: 1002;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .title {
        margin: 0;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.85);
        letter-spacing: 0.5px;
        font-weight: 500;
      }

      > .reset {
        width: 23px;
        height: 20px;
        position: absolute;
        right: 0;
        cursor: pointer;
        font-size: 18px;
        color: #1890ff;
        font-weight: bold;
        /* transform: rotateY(180deg); */
      }
    }

    .canvas-wrap {
      position: relative;
      overflow: hidden;

      .loading {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: #e6e6e6;
        z-index: 1001;
      }

      .bg {
        position: absolute;
      }

      .gap {
        position: absolute;
      }

      .result-tip {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 24px;
        z-index: 1001;
        position: absolute;
        bottom: 0;
        color: #fff;
        font-size: 12px;
        line-height: 24px;
        text-align: center;
        opacity: 0;
        transform: translateY(24px);
        transition: transform 200ms;

        &.result-visible {
          opacity: 0.95;
          transform: translateY(0);
        }

        &.success-tip {
          background-color: #60b25e;
        }

        &.fail-tip {
          background-color: #dd725b;
        }
      }
    }

    .slider-wrap {
      margin-top: 12px;
      height: 28px;
      background-color: #eaebf0;
      box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.16);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .slider {
        position: absolute;
        left: 0;
        border-radius: 19px;
        background: linear-gradient(
          360deg,
          #f4f4f4 0%,
          #fefefe 50%,
          #f4f4f4 100%
        );
        border: 1px solid rgba(0, 0, 0, 0.1);
        width: 50px;
        height: 36px;
        cursor: pointer;
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          .slider-icon {
            color: #1890ff !important;
          }
        }
      }

      .slider-path {
        z-index: 1001;
        position: absolute;
        left: 0;
        height: 32px;
        background: #adc6ff;
        box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.16);
        border-radius: 16px;
      }

      .slider-tip {
        font-weight: 400;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
`]))),Xn="data:image/png;base64,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",rn=c(8032),Wn=c(10427),kn=c(63833),Ln="puzzle-captcha",Nn=function(a){var r=a.width,e=r===void 0?320:r,o=a.height,n=o===void 0?180:o,g=a.useMask,p=g===void 0?!1:g,b=a.visible,y=b===void 0?!1:b,C=a.title,G=C===void 0?"\u5B89\u5168\u9A8C\u8BC1":C,T=a.sliderTip,V=T===void 0?"\u6ED1\u52A8\u5B8C\u6210\u62FC\u56FE":T,on=a.successMsg,Fn=on===void 0?"\u9A8C\u8BC1\u901A\u8FC7":on,un=a.failMsg,Hn=un===void 0?"\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":un,K=a.onSuccess,J=a.onFail,Qn=a.onClose,cn=a.useFetch,k=cn===void 0?!1:cn,U=a.fetchData,z=58,F=50,H=3,Q=(e-z)/(e-F),L=(0,M.useRef)(null),fn=(0,M.useRef)(null),t=null,R=null,$=!1,O=(0,M.useRef)({x:0,y:0}),Y={bgImg:"",gapImg:"",y:0},dn=(0,M.useRef)({x:0}),$n=(0,M.useState)({x:0}),vn=B()($n,2),P=vn[0],gn=vn[1],qn=(0,M.useState)({valid:!1,resultMsg:"",isMoving:!1,loading:!1}),hn=B()(qn,2),j=hn[0],w=hn[1],pn=(0,rn.Z)(j),q=(0,rn.Z)(P),_n=function(s){if(R&&t&&L.current){O.current=Rn(e,n,z),D(t,O.current,z),Cn?(t.clip(),t.save(),t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowColor="#000",t.shadowBlur=H,t.fill()):(t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowColor="#000",t.shadowBlur=H,t.fill(),t.clip()),t.drawImage(s,0,0,e,n),t.restore();var l=t.getImageData(0,0,e,n);R.putImageData(l,e,n),R.drawImage(L.current,0-O.current.x+H,0,e,n),t.restore(),t.clearRect(0,0,e,n),t.save(),D(t,O.current,z),t.globalAlpha=.8,t.fillStyle="#fff",t.fill(),t.restore(),t.save(),t.globalCompositeOperation="source-atop",D(t,O.current,z),t.arc(O.current.x+z/2,O.current.y+z/2,z*2,0,Math.PI*2,!0),t.shadowColor="#000",t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowBlur=z/3,t.fill(),t.restore(),t.save(),t.globalCompositeOperation="destination-over",t.drawImage(s,0,0,e,n),t.restore()}},ne=function(){var s,l,h,i;t=((s=L.current)===null||s===void 0?void 0:s.getContext("2d"))||null,(l=t)===null||l===void 0||l.clearRect(0,0,e,n),R=((h=fn.current)===null||h===void 0?void 0:h.getContext("2d"))||null,(i=R)===null||i===void 0||i.clearRect(0,0,e,n);var u=new Image(e,n);u.src=Y.bgImg,u.onload=function(){var A;if((A=t)===null||A===void 0||A.save(),!k)_n(u),w(function(le){return f()(f()({},le),{},{loading:!1})});else{var nn;(nn=t)===null||nn===void 0||nn.drawImage(u,0,0,e,n)}}},ee=function(){if(k){var s=new Image(e,n);s.crossOrigin="anonymous",s.src=Y.gapImg,s.onload=function(){var l;(l=R)===null||l===void 0||l.drawImage(s,0,Y.y)}}},ae=function(){var x=X()(S()().mark(function s(){var l;return S()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(w(function(u){return f()(f()({},u),{},{loading:!0})}),!k){i.next=12;break}return i.next=4,U==null?void 0:U();case 4:if(i.t0=i.sent,i.t0){i.next=7;break}i.t0=Y;case 7:Y=i.t0,w(function(u){return f()(f()({},u),{},{loading:!1})}),ee(),i.next=14;break;case 12:l=On(e,n),Y.bgImg=l;case 14:ne();case 15:case"end":return i.stop()}},s)}));return function(){return x.apply(this,arguments)}}(),E=function(){var x=X()(S()().mark(function s(){return S()().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:return w(function(i){return f()(f()({},i),{},{resultMsg:"",loading:!1})}),h.next=3,ae();case 3:w(function(i){return f()(f()({},i),{},{isMoving:!1})}),$=!1,gn({x:0});case 6:case"end":return h.stop()}},s)}));return function(){return x.apply(this,arguments)}}(),mn=function(s){var l;s.stopPropagation(),!$&&(w(f()(f()({},j),{},{isMoving:!0})),dn.current={x:s.clientX||((l=s.touches)===null||l===void 0?void 0:l[0].clientX)||0})},N=function(s){var l,h;if(pn.current.isMoving){var i={x:(s.clientX||((l=s.touches)===null||l===void 0||(h=l[0])===null||h===void 0?void 0:h.clientX)||0)-dn.current.x},u=e-F;i.x>u&&(i.x=u),i.x<0&&(i.x=0),gn(i)}},te=function(){var s=q.current.x*Q;return Math.abs(O.current.x-s)<10},_=function(){var x=X()(S()().mark(function s(){var l,h;return S()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:if(l=!1,k){u.next=5;break}l=te(),u.next=8;break;case 5:return u.next=7,(h=a.validator)===null||h===void 0?void 0:h.call(a,{x:Math.ceil(q.current.x*Q)});case 7:l=u.sent;case 8:if(w(function(A){return f()(f()({},A),{},{valid:l})}),$=!0,!l){u.next=17;break}return w(function(A){return f()(f()({},A),{},{resultMsg:Fn})}),u.next=14,an(800);case 14:K==null||K(),u.next=22;break;case 17:return w(function(A){return f()(f()({},A),{},{resultMsg:Hn})}),u.next=20,an(800);case 20:J==null||J(),E();case 22:case"end":return u.stop()}},s)}));return function(){return x.apply(this,arguments)}}(),I=function(){var x=X()(S()().mark(function s(l){return S()().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:if(l.stopPropagation(),pn.current.isMoving){i.next=3;break}return i.abrupt("return");case 3:if(w(function(u){return f()(f()({},u),{},{isMoving:!1})}),!(q.current.x<=0)){i.next=6;break}return i.abrupt("return");case 6:return i.next=8,_==null?void 0:_();case 8:case"end":return i.stop()}},s)}));return function(l){return x.apply(this,arguments)}}();(0,M.useEffect)(function(){y&&(E==null||E())},[y]),(0,M.useEffect)(function(){return p||E(),document.addEventListener("mousemove",N),document.addEventListener("mouseup",I),document.addEventListener("touchmove",N),document.addEventListener("touchend",I),function(){document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",I),document.removeEventListener("touchmove",N),document.removeEventListener("touchend",I)}},[]);var re=W()("".concat(Ln),{}),ie=W()("puzzle-captcha-mask",{visible:p&&y}),se=W()("puzzle-captcha-body",{"puzzle-captcha-center":p});return(0,v.jsxs)(Pn,{className:re,style:{display:p&&y||!p?"block":"none"},children:[(0,v.jsx)("div",{className:ie,onClick:Qn}),(0,v.jsxs)("div",{className:se,children:[(0,v.jsxs)("div",{className:"title-wrap",children:[(0,v.jsx)("h1",{className:"title",children:G}),(0,v.jsx)("img",{src:Xn,onClick:E,className:"reset"})]}),(0,v.jsxs)("div",{className:"canvas-wrap",style:{width:"".concat(e,"px"),height:"".concat(n,"px")},children:[(0,v.jsx)("div",{style:{display:j.loading?"block":"none"},className:"loading",children:(0,v.jsx)(Wn.Z,{style:{fontSize:"26px",color:"#1890ff"}})}),(0,v.jsx)("canvas",{ref:L,className:"bg",width:e,height:n}),(0,v.jsx)("canvas",{ref:fn,className:"gap",width:e,height:n,style:{transform:"translateX(".concat(P.x*Q,"px)")}}),(0,v.jsx)("p",{className:W()("result-tip",{"result-visible":j.resultMsg,"success-tip":j.valid,"fail-tip":!j.valid}),children:j.resultMsg})]}),(0,v.jsxs)("div",{className:"slider-wrap",children:[(0,v.jsx)("div",{className:"slider",style:{transform:"translateX(".concat(P.x,"px)")},onMouseDown:mn,onTouchStart:mn,children:(0,v.jsx)(kn.Z,{className:"slider-icon",style:{color:j.isMoving||j.resultMsg?"#1890ff":"rgba(0,0,0,0.65)"}})}),(0,v.jsx)("div",{className:"slider-path",style:{width:"".concat(P.x+F,"px")}}),(0,v.jsx)("span",{style:{display:P.x<=0?"block":"none"},className:"slider-tip",children:V})]})]})]})},Z=!!(typeof window!="undefined"&&window),In=250,m=Z?window:{},Bn=Z?document:{},Dn=m.scroll||m.scrollTo,sn=m.performance&&m.performance.now?m.performance.now.bind(m.performance):Date.now;function Zn(a,r){this.scrollLeft=a,this.scrollTop=r}function Vn(a){return .5*(1-Math.cos(Math.PI*a))}function ln(a,r){var e=sn(),o=(e-a.startTime)/a.duration;o=o>1?1:o;var n=Vn(o),g=a.startX+(a.x-a.startX)*n,p=a.startY+(a.y-a.startY)*n;a.method.call(a.scrollable,g,p),g!==a.x||p!==a.y?requestAnimationFrame(ln.bind(m,a,r)):r()}function Kn(a,r,e){var o=arguments.length>3&&arguments[3]!==void 0?arguments[3]:In;return new Promise(function(n,g){Z||g();var p,b,y,C,G=sn();a===Bn.body||a===m?(p=m,b=m.scrollX||m.pageXOffset,y=m.scrollY||m.pageYOffset,C=Dn):(p=a,b=a.scrollLeft,y=a.scrollTop,C=Zn),ln({duration:o,scrollable:p,method:C,startTime:G,startX:b,startY:y,x:r,y:e},n)})}var Jn=Kn,Un=Jn}}]);
