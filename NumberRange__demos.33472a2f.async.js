"use strict";(self.webpackChunk_wont_biz_ui=self.webpackChunk_wont_biz_ui||[]).push([[18,228],{7224:function(p,v,a){a.r(v),a.d(v,{default:function(){return B}});var x=a(26068),g=a.n(x),m=a(44168),r=a(26452),j=a(47364),f=a(10246),b=a(62414),C=a(66043),I=a(75271),A=a(5730),i={count:{value:"count",label:"\u533A\u95F4\u6570\u91CF"},step:{value:"step",label:"\u533A\u95F4\u6B65\u957F"}},e=a(52676),d=303582079,F=0,B=function(){var R=function(n){console.log("Success:",n)},N=function(n){console.log("Failed:",n)},o=function(n,u){var l=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{min:F,max:d};if(!u)return Promise.reject("\u8BF7\u8865\u5168\u533A\u95F4");var s=(0,A.Gu)(g()(g()({},l),{},{ranges:u})),h=s.message,c=s.isValid;return c?Promise.resolve():Promise.reject(h)};return(0,e.jsxs)(r.Z,{labelCol:{span:4},wrapperCol:{span:20},initialValues:{numberRange1:[],numberRange2:[],numberRange3:[{min:-5,max:0},{min:0,max:5}],numberRange4:[],numberRange5:[],rangeNum:5,rangeUnit:i.step.value},onFinish:R,onFinishFailed:N,children:[(0,e.jsx)(r.Z.Item,{label:"\u533A\u95F4",children:(0,e.jsxs)(j.Z,{children:[(0,e.jsxs)(r.Z.Item,{children:[(0,e.jsxs)("span",{children:["\u6700\u5927\u503C\uFF1A",d]}),(0,e.jsxs)("span",{children:["\u6700\u5C0F\u503C:",F]})]}),(0,e.jsx)(r.Z.Item,{name:"rangeUnit",children:(0,e.jsx)(f.default,{options:Object.values(i)})}),(0,e.jsx)(r.Z.Item,{name:"rangeNum",children:(0,e.jsx)(b.Z,{})})]})}),(0,e.jsx)(r.Z.Item,{shouldUpdate:function(n,u){return n.rangeNum!==u.rangeNum||n.rangeUnit!==u.rangeUnit},children:function(n){var u=n.getFieldValue,l=u("rangeUnit"),s=u("rangeNum");return(0,e.jsx)(r.Z.Item,{label:i[l].label,extra:"\u5927\u6570\u636E\u91CF\u65F6\uFF0C\u901A\u8FC7rangeLimit\u8BBE\u7F6E\u6700\u5927\u503C\uFF0C\u9ED8\u8BA41000\uFF0C\u907F\u514D\u8BA1\u7B97\u592A\u591A\u5BFC\u81F4\u6D4F\u89C8\u5668\u5361\u6B7B\u3002\u9ED8\u8BA4\u5F00\u542F\u865A\u62DF\u6EDA\u52A8",name:"numberRange1",rules:[{required:!0,validator:function(c,Z){return o(c,Z)}}],children:(0,e.jsx)(m.NumberRange,{showAddButton:!0,showDelButton:!0,max:d,min:F,rangeNum:l===i.count.value?s:void 0,step:l!==i.count.value?s:void 0})})}}),(0,e.jsx)(r.Z.Item,{label:"\u4F20\u5165\u5177\u4F53\u533A\u95F4",name:"numberRange3",rules:[{required:!0,validator:function(n,u){return o(n,u,{max:5,min:-5})}}],children:(0,e.jsx)(m.NumberRange,{showDelButton:!0})}),(0,e.jsx)(r.Z.Item,{label:"\u5F02\u5E38\u60C5\u51B5\uFF0Cmax===min",name:"numberRange4",rules:[{required:!0,validator:function(n,u){return o(n,u,{max:1,min:1})}}],children:(0,e.jsx)(m.NumberRange,{max:1,min:1,step:111})}),(0,e.jsx)(r.Z.Item,{label:"\u5F02\u5E38\u60C5\u51B5\uFF0Cmax<min",name:"numberRange5",rules:[{required:!0,validator:function(n,u){return o(n,u,{max:0,min:1})}}],children:(0,e.jsx)(m.NumberRange,{max:0,min:1,step:111})}),(0,e.jsx)(r.Z.Item,{label:" ",colon:!1,children:(0,e.jsx)(C.ZP,{type:"primary",htmlType:"submit",children:"Submit"})})]})}}}]);
