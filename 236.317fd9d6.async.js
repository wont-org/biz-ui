"use strict";(self.webpackChunkdumi_test=self.webpackChunkdumi_test||[]).push([[236],{71236:function(Qn,_,u){u.r(_),u.d(_,{AutoLoadingButton:function(){return yn},PuzzleCaptcha:function(){return kn}});var gn=u(57213),c=u.n(gn),hn=u(54306),L=u.n(hn),pn=u(12342),xn=u.n(pn),mn=u(58338),b=u(85170),v=u(43010),bn=["children","onClick"],yn=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=o.children,e=o.onClick,f=xn()(o,bn),n=(0,b.useState)(!1),h=L()(n,2),x=h[0],A=h[1],C=function(y){return!!(y&&y.then)},E=function(){if(typeof e=="function"){var y=e();y&&C(y)&&(A(!0),y.then(function(){A(!1)},function(I){return A(!1),Promise.reject(I)}))}};return(0,v.jsx)(mn.ZP,c()(c()({},f),{},{loading:x,onClick:E,children:r}))},wn=u(25359),z=u.n(wn),Mn=u(49811),P=u.n(Mn),jn=u(84875),W=u.n(jn),nn=function(r){return new Promise(function(e){setTimeout(function(){e(!0)},r)})},zn=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,d=function(r,e){return Math.ceil(Math.random()*(e-r)+r)},Tn=function(r,e){var f=document.createElement("canvas"),n=f.getContext("2d");if(!n)return"";f.width=r,f.height=e,n.fillStyle=`rgb(
    `.concat(d(100,255),`,
    `).concat(d(100,255),`,
    `).concat(d(100,255),`
  )`),n.fillRect(0,0,r,e);for(var h=0;h<12;h++)if(n.fillStyle=`rgb(
      `.concat(d(100,255),`,
      `).concat(d(100,255),`,
      `).concat(d(100,255),`
    )`),n.strokeStyle=`rgb(
      `.concat(d(100,255),`,
      `).concat(d(100,255),`,
      `).concat(d(100,255),`
    )`),d(0,2)>1)n.save(),n.rotate(d(-90,90)*Math.PI/180),n.fillRect(d(-20,f.width-20),d(-20,f.height-20),d(10,f.width/2+10),d(10,f.height/2+10)),n.restore();else{n.beginPath();var x=d(-Math.PI,Math.PI);n.arc(d(0,f.width),d(0,f.height),d(10,f.height/2+10),x,x+Math.PI*1.5),n.closePath(),n.fill()}return f.toDataURL("image/png")},An=function(r,e,f){return{x:d(f+20,r-f-20),y:d(20,e-f-20)}},Z=function(r,e,f){if(r){var n=f/4,h=n/2;r.beginPath(),r.moveTo(e.x,e.y),r.lineTo(e.x+n,e.y),r.arcTo(e.x+n,e.y-h,e.x+n+h,e.y-h,h),r.arcTo(e.x+n+n,e.y-n/2,e.x+n+n,e.y,n/2),r.lineTo(e.x+n+n+n,e.y),r.lineTo(e.x+n+n+n,e.y+n),r.arcTo(e.x+n+n+n+n/2,e.y+n,e.x+n+n+n+n/2,e.y+n+n/2,n/2),r.arcTo(e.x+n+n+n+n/2,e.y+n+n,e.x+n+n+n,e.y+n+n,n/2),r.lineTo(e.x+n+n+n,e.y+n+n+n),r.lineTo(e.x,e.y+n+n+n),r.lineTo(e.x,e.y+n+n),r.arcTo(e.x+n/2,e.y+n+n,e.x+n/2,e.y+n+n/2,n/2),r.arcTo(e.x+n/2,e.y+n,e.x,e.y+n,n/2),r.lineTo(e.x,e.y),r.closePath()}},Cn=u(92935),Sn=u.n(Cn),Rn=u(75177),en,Gn=Rn.ZP.section(en||(en=Sn()([`
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
`]))),On="data:image/png;base64,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",an=u(8032),Pn=u(10427),Wn=u(63833),En="puzzle-captcha",kn=function(o){var r=o.width,e=r===void 0?320:r,f=o.height,n=f===void 0?180:f,h=o.useMask,x=h===void 0?!1:h,A=o.visible,C=A===void 0?!1:A,E=o.title,B=E===void 0?"\u5B89\u5168\u9A8C\u8BC1":E,y=o.sliderTip,I=y===void 0?"\u6ED1\u52A8\u5B8C\u6210\u62FC\u56FE":y,tn=o.successMsg,Yn=tn===void 0?"\u9A8C\u8BC1\u901A\u8FC7":tn,rn=o.failMsg,Nn=rn===void 0?"\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":rn,D=o.onSuccess,V=o.onFail,Xn=o.onClose,sn=o.useFetch,k=sn===void 0?!1:sn,K=o.fetchData,w=58,J=50,U=3,H=(e-w)/(e-J),Y=(0,b.useRef)(null),ln=(0,b.useRef)(null),a=null,S=null,F=!1,T=(0,b.useRef)({x:0,y:0}),R={bgImg:"",gapImg:"",y:0},on=(0,b.useRef)({x:0}),Ln=(0,b.useState)({x:0}),un=L()(Ln,2),O=un[0],cn=un[1],Zn=(0,b.useState)({valid:!1,resultMsg:"",isMoving:!1,loading:!1}),fn=L()(Zn,2),M=fn[0],m=fn[1],dn=(0,an.Z)(M),Q=(0,an.Z)(O),Bn=function(i){if(S&&a&&Y.current){T.current=An(e,n,w),Z(a,T.current,w),zn?(a.clip(),a.save(),a.shadowOffsetX=0,a.shadowOffsetY=0,a.shadowColor="#000",a.shadowBlur=U,a.fill()):(a.shadowOffsetX=0,a.shadowOffsetY=0,a.shadowColor="#000",a.shadowBlur=U,a.fill(),a.clip()),a.drawImage(i,0,0,e,n),a.restore();var s=a.getImageData(0,0,e,n);S.putImageData(s,e,n),S.drawImage(Y.current,0-T.current.x+U,0,e,n),a.restore(),a.clearRect(0,0,e,n),a.save(),Z(a,T.current,w),a.globalAlpha=.8,a.fillStyle="#fff",a.fill(),a.restore(),a.save(),a.globalCompositeOperation="source-atop",Z(a,T.current,w),a.arc(T.current.x+w/2,T.current.y+w/2,w*2,0,Math.PI*2,!0),a.shadowColor="#000",a.shadowOffsetX=2,a.shadowOffsetY=2,a.shadowBlur=w/3,a.fill(),a.restore(),a.save(),a.globalCompositeOperation="destination-over",a.drawImage(i,0,0,e,n),a.restore()}},In=function(){var i,s,g,t;a=((i=Y.current)===null||i===void 0?void 0:i.getContext("2d"))||null,(s=a)===null||s===void 0||s.clearRect(0,0,e,n),S=((g=ln.current)===null||g===void 0?void 0:g.getContext("2d"))||null,(t=S)===null||t===void 0||t.clearRect(0,0,e,n);var l=new Image(e,n);l.src=R.bgImg,l.onload=function(){var j;if((j=a)===null||j===void 0||j.save(),!k)Bn(l),m(function(Fn){return c()(c()({},Fn),{},{loading:!1})});else{var q;(q=a)===null||q===void 0||q.drawImage(l,0,0,e,n)}}},Dn=function(){if(k){var i=new Image(e,n);i.crossOrigin="anonymous",i.src=R.gapImg,i.onload=function(){var s;(s=S)===null||s===void 0||s.drawImage(i,0,R.y)}}},Vn=function(){var p=P()(z()().mark(function i(){var s;return z()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(m(function(l){return c()(c()({},l),{},{loading:!0})}),!k){t.next=12;break}return t.next=4,K==null?void 0:K();case 4:if(t.t0=t.sent,t.t0){t.next=7;break}t.t0=R;case 7:R=t.t0,m(function(l){return c()(c()({},l),{},{loading:!1})}),Dn(),t.next=14;break;case 12:s=Tn(e,n),R.bgImg=s;case 14:In();case 15:case"end":return t.stop()}},i)}));return function(){return p.apply(this,arguments)}}(),G=function(){var p=P()(z()().mark(function i(){return z()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return m(function(t){return c()(c()({},t),{},{resultMsg:"",loading:!1})}),g.next=3,Vn();case 3:m(function(t){return c()(c()({},t),{},{isMoving:!1})}),F=!1,cn({x:0});case 6:case"end":return g.stop()}},i)}));return function(){return p.apply(this,arguments)}}(),vn=function(i){var s;i.stopPropagation(),!F&&(m(c()(c()({},M),{},{isMoving:!0})),on.current={x:i.clientX||((s=i.touches)===null||s===void 0?void 0:s[0].clientX)||0})},N=function(i){var s,g;if(dn.current.isMoving){var t={x:(i.clientX||((s=i.touches)===null||s===void 0||(g=s[0])===null||g===void 0?void 0:g.clientX)||0)-on.current.x},l=e-J;t.x>l&&(t.x=l),t.x<0&&(t.x=0),cn(t)}},Kn=function(){var i=Q.current.x*H;return Math.abs(T.current.x-i)<10},$=function(){var p=P()(z()().mark(function i(){var s,g;return z()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if(s=!1,k){l.next=5;break}s=Kn(),l.next=8;break;case 5:return l.next=7,(g=o.validator)===null||g===void 0?void 0:g.call(o,{x:Math.ceil(Q.current.x*H)});case 7:s=l.sent;case 8:if(m(function(j){return c()(c()({},j),{},{valid:s})}),F=!0,!s){l.next=17;break}return m(function(j){return c()(c()({},j),{},{resultMsg:Yn})}),l.next=14,nn(800);case 14:D==null||D(),l.next=22;break;case 17:return m(function(j){return c()(c()({},j),{},{resultMsg:Nn})}),l.next=20,nn(800);case 20:V==null||V(),G();case 22:case"end":return l.stop()}},i)}));return function(){return p.apply(this,arguments)}}(),X=function(){var p=P()(z()().mark(function i(s){return z()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s.stopPropagation(),dn.current.isMoving){t.next=3;break}return t.abrupt("return");case 3:if(m(function(l){return c()(c()({},l),{},{isMoving:!1})}),!(Q.current.x<=0)){t.next=6;break}return t.abrupt("return");case 6:return t.next=8,$==null?void 0:$();case 8:case"end":return t.stop()}},i)}));return function(s){return p.apply(this,arguments)}}();(0,b.useEffect)(function(){C&&(G==null||G())},[C]),(0,b.useEffect)(function(){return x||G(),document.addEventListener("mousemove",N),document.addEventListener("mouseup",X),document.addEventListener("touchmove",N),document.addEventListener("touchend",X),function(){document.removeEventListener("mousemove",N),document.removeEventListener("mouseup",X),document.removeEventListener("touchmove",N),document.removeEventListener("touchend",X)}},[]);var Jn=W()("".concat(En),{}),Un=W()("puzzle-captcha-mask",{visible:x&&C}),Hn=W()("puzzle-captcha-body",{"puzzle-captcha-center":x});return(0,v.jsxs)(Gn,{className:Jn,style:{display:x&&C||!x?"block":"none"},children:[(0,v.jsx)("div",{className:Un,onClick:Xn}),(0,v.jsxs)("div",{className:Hn,children:[(0,v.jsxs)("div",{className:"title-wrap",children:[(0,v.jsx)("h1",{className:"title",children:B}),(0,v.jsx)("img",{src:On,onClick:G,className:"reset"})]}),(0,v.jsxs)("div",{className:"canvas-wrap",style:{width:"".concat(e,"px"),height:"".concat(n,"px")},children:[(0,v.jsx)("div",{style:{display:M.loading?"block":"none"},className:"loading",children:(0,v.jsx)(Pn.Z,{style:{fontSize:"26px",color:"#1890ff"}})}),(0,v.jsx)("canvas",{ref:Y,className:"bg",width:e,height:n}),(0,v.jsx)("canvas",{ref:ln,className:"gap",width:e,height:n,style:{transform:"translateX(".concat(O.x*H,"px)")}}),(0,v.jsx)("p",{className:W()("result-tip",{"result-visible":M.resultMsg,"success-tip":M.valid,"fail-tip":!M.valid}),children:M.resultMsg})]}),(0,v.jsxs)("div",{className:"slider-wrap",children:[(0,v.jsx)("div",{className:"slider",style:{transform:"translateX(".concat(O.x,"px)")},onMouseDown:vn,onTouchStart:vn,children:(0,v.jsx)(Wn.Z,{className:"slider-icon",style:{color:M.isMoving||M.resultMsg?"#1890ff":"rgba(0,0,0,0.65)"}})}),(0,v.jsx)("div",{className:"slider-path",style:{width:"".concat(O.x+J,"px")}}),(0,v.jsx)("span",{style:{display:O.x<=0?"block":"none"},className:"slider-tip",children:I})]})]})]})}}}]);
