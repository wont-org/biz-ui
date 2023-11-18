"use strict";(self.webpackChunkdumi_test=self.webpackChunkdumi_test||[]).push([[886],{80886:function(Jn,_,d){d.r(_),d.d(_,{AutoLoadingButton:function(){return wn},PuzzleCaptcha:function(){return Ln}});var gn=d(57213),u=d.n(gn),hn=d(54306),F=d.n(hn),pn=d(12342),mn=d.n(pn),xn=d(58338),y=d(85170),f=d(43010),yn=["children","onClick"],wn=function(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=o.children,e=o.onClick,c=mn()(o,yn),n=(0,y.useState)(!1),h=F()(n,2),m=h[0],R=h[1],B=function(w){return!!(w&&w.then)},X=function(){if(typeof e=="function"){var w=e();w&&B(w)&&(R(!0),w.then(function(){R(!1)},function(G){return R(!1),Promise.reject(G)}))}};return(0,f.jsx)(xn.ZP,u()(u()({},c),{},{loading:m,onClick:X,children:r}))},bn=d(25359),T=d.n(bn),Cn=d(49811),P=d.n(Cn),Tn=d(84875),L=d.n(Tn),nn=function(r){return new Promise(function(e){setTimeout(function(){e(!0)},r)})},An=navigator.userAgent.indexOf("Firefox")>=0&&navigator.userAgent.indexOf("Windows")>=0,v=function(r,e){return Math.ceil(Math.random()*(e-r)+r)},Mn=function(r,e){var c=document.createElement("canvas"),n=c.getContext("2d");if(!n)return"";c.width=r,c.height=e,n.fillStyle=`rgb(
    `.concat(v(100,255),`,
    `).concat(v(100,255),`,
    `).concat(v(100,255),`
  )`),n.fillRect(0,0,r,e);for(var h=0;h<12;h++)if(n.fillStyle=`rgb(
      `.concat(v(100,255),`,
      `).concat(v(100,255),`,
      `).concat(v(100,255),`
    )`),n.strokeStyle=`rgb(
      `.concat(v(100,255),`,
      `).concat(v(100,255),`,
      `).concat(v(100,255),`
    )`),v(0,2)>1)n.save(),n.rotate(v(-90,90)*Math.PI/180),n.fillRect(v(-20,c.width-20),v(-20,c.height-20),v(10,c.width/2+10),v(10,c.height/2+10)),n.restore();else{n.beginPath();var m=v(-Math.PI,Math.PI);n.arc(v(0,c.width),v(0,c.height),v(10,c.height/2+10),m,m+Math.PI*1.5),n.closePath(),n.fill()}return c.toDataURL("image/png")},Rn=function(r,e,c){return{x:v(c+20,r-c-20),y:v(20,e-c-20)}},O=function(r,e,c){if(r){var n=c/4,h=n/2;r.beginPath(),r.moveTo(e.x,e.y),r.lineTo(e.x+n,e.y),r.arcTo(e.x+n,e.y-h,e.x+n+h,e.y-h,h),r.arcTo(e.x+n+n,e.y-n/2,e.x+n+n,e.y,n/2),r.lineTo(e.x+n+n+n,e.y),r.lineTo(e.x+n+n+n,e.y+n),r.arcTo(e.x+n+n+n+n/2,e.y+n,e.x+n+n+n+n/2,e.y+n+n/2,n/2),r.arcTo(e.x+n+n+n+n/2,e.y+n+n,e.x+n+n+n,e.y+n+n,n/2),r.lineTo(e.x+n+n+n,e.y+n+n+n),r.lineTo(e.x,e.y+n+n+n),r.lineTo(e.x,e.y+n+n),r.arcTo(e.x+n/2,e.y+n+n,e.x+n/2,e.y+n+n/2,n/2),r.arcTo(e.x+n/2,e.y+n,e.x,e.y+n,n/2),r.lineTo(e.x,e.y),r.closePath()}},Bn=d(92935),zn=d.n(Bn),kn=d(75177),en,In=kn.ZP.section(en||(en=zn()([`
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
    padding: 9px 12px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.06);

    .title-wrap {
      z-index: 1002;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .title {
        margin: 0;
        font-size: 14px;
        color: #333;
        letter-spacing: 0.5px;
        font-weight: 500;
      }

      > .reset {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 0;
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
        font-weight: bold;
        transform: rotateY(180deg);
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

        > i {
          font-size: 16px;
          color: #377ef6;
        }
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
          background-color: #82cf5c;
        }

        &.fail-tip {
          background-color: #f77;
        }
      }
    }

    .slider-wrap {
      margin-top: 9px;
      height: 20px;
      background-color: #e9ebf0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      position: relative;

      .slider {
        position: absolute;
        left: 0;
        background: #6598ff;
        outline: 2px solid rgba(101, 152, 255, 0.6);
        border-radius: 10px;
        width: 26px;
        height: 20px;
        cursor: pointer;
        z-index: 1002;
        display: flex;
        align-items: center;
        justify-content: center;

        > i {
          color: #fff;
          font-size: 8px;
        }
      }

      .slider-path {
        z-index: 1001;
        position: absolute;
        left: 0;
        height: 20px;
        background: rgba(101, 152, 255, 0.6);
        border-radius: 10px;
      }

      .slider-tip {
        font-weight: 400;
        font-size: 12px;
        color: #999;
      }
    }
  }
`]))),jn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAELklEQVRYR+2YW2wUZRTH//9vtlCoF9IoIklT3PqgPGi326hoetuaGEhIr9SgCYkkgt2WGOQVCca+GavWdr0GjD4YhG3RB3hply1LQA1tEQIxEXapGI2pEkys9LIzx2ylYWfY6e5sF0oi+7hzzvl+3/9855xvhrjNf7zN+XAHcL4Z+n8o6JWTeYt++W25S596AIZy6TB+n3yo+Nchlk8vmIIVowdXU9c3Q1gDSilBlQwjgBAYFGDvdF58/4milqvZwDpOcXWsb5Uh8hmBqkwXFMhlCN8aX5LXNbRy/T+Z+iXsHAFWRXs3QGQPyLucLDJrK5DgUXdTsxPfjAEro8E3Ce50EtxsKxPTwCPH3U2jTmJkBJgWTnAMxDeGMEoa0xQ+LJQnCD4HYFkCyAC3RdwN3U7gMkpxRTTYrMD91sCJIgCxV5R6O1Jcfy7VwonqLoj9/CqB2kF341qncGkBvRe+ureAWpRgoalCBecMFzcdK24YymZRJz5zprgq1tsJwXYL3CVZGvdGHmwZc7JQtra2gE+f712ep2QUYP714DJhaJrXLqXZQszlZwtYdSHoB9ljVk/ePVrSZFL0ZkAlxzQBVseCT8WhZhRThtFB8plk9Zi/qCi8cv0fNxvKFrDy4oF11NXXIFy2EII4iBcG3Y03VLZT8OqRd5aFPduvOEpxRayvXolxAKB2g6NgEhobBlc1HHYKY7WvHf5wtVAPgegIlbbZ9seUZ7AyFnwewi9pGoUyDmhrB931kfnC1ZwOeKlLP8GZJi6QLSFP2yep4toXSbT3ZQAfX3O6omt8Nhd9r/aHQAUMOQywYBZo5uZD2ThQ2rbPCjlnH6yI9rUryE5DU75ctJaake46Be4DuDjF8dFBNA94/AdtiySVxIlpMlTS8td801o70vMigM9huTda2lhcKHVHPO2HZv/P6LIwX7hk/+qzPSvUJGMkrg8AQYTkroRdXMlE+HH/twsG6BsOdJHYZlaO/lBZ6weOiiSXqs3Gqj0TeAxx+T75DIpgwjC0onD51pQD4JaluPrkR/cpFT9DcoVp84LOgTL/DjtBbglgou+puHwB8lEznPxJw1XSX77VtgizBvQNBw4RMqB7xt4Lc3c8lQKJaQHoO4R8ydz0/7MWoCXk8c85MrMC9J3qaafw/WtQlwXST+F3BnAeYB4obgJ1BJIuG+YtiKAjVOZ/Pd1ZdwzoG+4uBtSPpjaRbhXLcwF3hzytb2TilgVgT5BkYybBrTYC+Rvg5nRpdTRJrIs8+VPXPQXj2i4ItxC4O2NQQUQnN4U9rRcz9nH64p4ceM2lziX5Y4s3KHCdUHwE77ecMkMEp6BwhIa2Z6DslZRvfulgHafYLuCas58WLp2aLCFUga70qxOFU6dPFL2W1feYeaU43Y5z/TxnCuYabMEuC043ckdBp4pZ7f8FE5psOI1g6fwAAAAASUVORK5CYII=",tn=d(8032),Pn="puzzle-captcha",Ln=function(o){var r=o.width,e=r===void 0?320:r,c=o.height,n=c===void 0?180:c,h=o.useMask,m=h===void 0?!1:h,R=o.visible,B=R===void 0?!1:R,X=o.title,Z=X===void 0?"\u5B89\u5168\u9A8C\u8BC1":X,w=o.sliderTip,G=w===void 0?"\u6ED1\u52A8\u5B8C\u6210\u62FC\u56FE":w,an=o.successMsg,Xn=an===void 0?"\u9A8C\u8BC1\u901A\u8FC7":an,rn=o.failMsg,Sn=rn===void 0?"\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5":rn,N=o.onSuccess,Q=o.onFail,Yn=o.onClose,sn=o.useFetch,S=sn===void 0?!1:sn,H=o.fetchData,b=50,U=26,W=3,J=(e-b)/(e-U),Y=(0,y.useRef)(null),ln=(0,y.useRef)(null),t=null,z=null,V=!1,A=(0,y.useRef)({x:0,y:0}),k={bgImg:"",gapImg:"",y:0},on=(0,y.useRef)({x:0}),Dn=(0,y.useState)({x:0}),un=F()(Dn,2),j=un[0],cn=un[1],En=(0,y.useState)({valid:!1,resultMsg:"",isMoving:!1,loading:!1}),dn=F()(En,2),M=dn[0],x=dn[1],vn=(0,tn.Z)(M),$=(0,tn.Z)(j),Fn=function(i){if(z&&t&&Y.current){A.current=Rn(e,n,b),O(t,A.current,b),An?(t.clip(),t.save(),t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowColor="#000",t.shadowBlur=W,t.fill()):(t.shadowOffsetX=0,t.shadowOffsetY=0,t.shadowColor="#000",t.shadowBlur=W,t.fill(),t.clip()),t.drawImage(i,0,0,e,n),t.restore();var s=t.getImageData(0,0,e,n);z.putImageData(s,e,n),z.drawImage(Y.current,0-A.current.x+W,0,e,n),t.restore(),t.clearRect(0,0,e,n),t.save(),O(t,A.current,b),t.globalAlpha=.8,t.fillStyle="#fff",t.fill(),t.restore(),t.save(),t.globalCompositeOperation="source-atop",O(t,A.current,b),t.arc(A.current.x+b/2,A.current.y+b/2,b*2,0,Math.PI*2,!0),t.shadowColor="#000",t.shadowOffsetX=2,t.shadowOffsetY=2,t.shadowBlur=b/3,t.fill(),t.restore(),t.save(),t.globalCompositeOperation="destination-over",t.drawImage(i,0,0,e,n),t.restore()}},On=function(){var i,s,g,a;t=((i=Y.current)===null||i===void 0?void 0:i.getContext("2d"))||null,(s=t)===null||s===void 0||s.clearRect(0,0,e,n),z=((g=ln.current)===null||g===void 0?void 0:g.getContext("2d"))||null,(a=z)===null||a===void 0||a.clearRect(0,0,e,n);var l=new Image(e,n);l.src=k.bgImg,l.onload=function(){var C;if((C=t)===null||C===void 0||C.save(),!S)Fn(l),x(function(Wn){return u()(u()({},Wn),{},{loading:!1})});else{var q;(q=t)===null||q===void 0||q.drawImage(l,0,0,e,n)}}},Zn=function(){if(S){var i=new Image(e,n);i.crossOrigin="anonymous",i.src=k.gapImg,i.onload=function(){var s;(s=z)===null||s===void 0||s.drawImage(i,0,k.y)}}},Gn=function(){var p=P()(T()().mark(function i(){var s;return T()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(x(function(l){return u()(u()({},l),{},{loading:!0})}),!S){a.next=12;break}return a.next=4,H==null?void 0:H();case 4:if(a.t0=a.sent,a.t0){a.next=7;break}a.t0=k;case 7:k=a.t0,x(function(l){return u()(u()({},l),{},{loading:!1})}),Zn(),a.next=14;break;case 12:s=Mn(e,n),k.bgImg=s;case 14:On();case 15:case"end":return a.stop()}},i)}));return function(){return p.apply(this,arguments)}}(),I=function(){var p=P()(T()().mark(function i(){return T()().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return x(function(a){return u()(u()({},a),{},{resultMsg:"",loading:!1})}),g.next=3,Gn();case 3:x(function(a){return u()(u()({},a),{},{isMoving:!1})}),V=!1,cn({x:0});case 6:case"end":return g.stop()}},i)}));return function(){return p.apply(this,arguments)}}(),fn=function(i){var s;i.stopPropagation(),!V&&(x(u()(u()({},M),{},{isMoving:!0})),on.current={x:i.clientX||((s=i.touches)===null||s===void 0?void 0:s[0].clientX)||0})},D=function(i){var s,g;if(vn.current.isMoving){var a={x:(i.clientX||((s=i.touches)===null||s===void 0||(g=s[0])===null||g===void 0?void 0:g.clientX)||0)-on.current.x},l=e-U;a.x>l&&(a.x=l),a.x<0&&(a.x=0),cn(a)}},Nn=function(){var i=$.current.x*J;return Math.abs(A.current.x-i)<10},K=function(){var p=P()(T()().mark(function i(){var s,g;return T()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if(s=!1,S){l.next=5;break}s=Nn(),l.next=8;break;case 5:return l.next=7,(g=o.validator)===null||g===void 0?void 0:g.call(o,{x:Math.ceil($.current.x*J)});case 7:s=l.sent;case 8:if(x(function(C){return u()(u()({},C),{},{valid:s})}),V=!0,!s){l.next=17;break}return x(function(C){return u()(u()({},C),{},{resultMsg:Xn})}),l.next=14,nn(800);case 14:N==null||N(),l.next=22;break;case 17:return x(function(C){return u()(u()({},C),{},{resultMsg:Sn})}),l.next=20,nn(800);case 20:Q==null||Q(),I();case 22:case"end":return l.stop()}},i)}));return function(){return p.apply(this,arguments)}}(),E=function(){var p=P()(T()().mark(function i(s){return T()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(s.stopPropagation(),vn.current.isMoving){a.next=3;break}return a.abrupt("return");case 3:if(x(function(l){return u()(u()({},l),{},{isMoving:!1})}),!($.current.x<=0)){a.next=6;break}return a.abrupt("return");case 6:return a.next=8,K==null?void 0:K();case 8:case"end":return a.stop()}},i)}));return function(s){return p.apply(this,arguments)}}();(0,y.useEffect)(function(){B&&(I==null||I())},[B]),(0,y.useEffect)(function(){return m||I(),document.addEventListener("mousemove",D),document.addEventListener("mouseup",E),document.addEventListener("touchmove",D),document.addEventListener("touchend",E),function(){document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",E),document.removeEventListener("touchmove",D),document.removeEventListener("touchend",E)}},[]);var Qn=L()("".concat(Pn),{}),Hn=L()("puzzle-captcha-mask",{visible:m&&B}),Un=L()("puzzle-captcha-body",{"puzzle-captcha-center":m});return(0,f.jsxs)(In,{className:Qn,style:{display:m&&B||!m?"block":"none"},children:[(0,f.jsx)("div",{className:Hn,onClick:Yn}),(0,f.jsxs)("div",{className:Un,children:[(0,f.jsxs)("div",{className:"title-wrap",children:[(0,f.jsx)("h1",{className:"title",children:Z}),(0,f.jsx)("img",{src:jn,onClick:I,className:"reset"})]}),(0,f.jsxs)("div",{className:"canvas-wrap",style:{width:"".concat(e,"px"),height:"".concat(n,"px")},children:[(0,f.jsx)("div",{style:{display:M.loading?"block":"none"},className:"loading",children:(0,f.jsx)("i",{className:"qax-icon-Loading"})}),(0,f.jsx)("canvas",{ref:Y,className:"bg",width:e,height:n}),(0,f.jsx)("canvas",{ref:ln,className:"gap",width:e,height:n,style:{transform:"translateX(".concat(j.x*J,"px)")}}),(0,f.jsx)("p",{className:L()("result-tip",{"result-visible":M.resultMsg,"success-tip":M.valid,"fail-tip":!M.valid}),children:M.resultMsg})]}),(0,f.jsxs)("div",{className:"slider-wrap",children:[(0,f.jsx)("div",{className:"slider",style:{transform:"translateX(".concat(j.x,"px)")},onMouseDown:fn,onTouchStart:fn,children:(0,f.jsx)("i",{className:"qax-icon-Double-angle-right"})}),(0,f.jsx)("div",{className:"slider-path",style:{width:"".concat(j.x+U,"px")}}),(0,f.jsx)("span",{style:{display:j.x<=0?"block":"none"},className:"slider-tip",children:G})]})]})]})}}}]);
