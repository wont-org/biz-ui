"use strict";(self.webpackChunk_wont_biz_ui=self.webpackChunk_wont_biz_ui||[]).push([[18,309],{36752:function(M,g,a){a.r(g),a.d(g,{default:function(){return D}});var R=a(26068),x=a.n(R),l=a(61346),r=a(81580),B=a(62540),N=a(47438),h=a(34393),S=a(75271),Z=a(78764),d=a(35292),m={count:{value:"count",label:"\u533A\u95F4\u6570\u91CF"},step:{value:"step",label:"\u533A\u95F4\u6B65\u957F"}},u=a(52676),D=function(){var F=7966.319861650467,c=0,j=1000.5678,b=Math.ceil(j),f=-1.5678,A=Math.floor(f),I=function(e){console.log("Success:",e)},E=function(e){console.log("Failed:",e)},i=function(e,n){var s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{min:c,max:F};if(!n)return Promise.reject("\u8BF7\u8865\u5168\u533A\u95F4");var o=(0,Z.Gu)(x()(x()({},s),{},{ranges:n})),C=o.message,v=o.isValid;return v?Promise.resolve():Promise.reject(C)};return(0,u.jsxs)(r.Z,{labelCol:{span:6},wrapperCol:{span:18},initialValues:{min:c,max:F,numberRange1:[],numberRange2:[],numberRange3:[{min:-5,max:0},{min:0,max:5}],numberRange4:[],numberRange5:[],numberRange6:[],numberRange7:[],rangeNum:1e3,rangeUnit:m.step.value},onFinish:I,onFinishFailed:E,children:[(0,u.jsx)("h1",{children:"\u8054\u52A8\u6848\u4F8B"}),(0,u.jsx)(r.Z.Item,{label:"\u6700\u5927\u503C",name:"max",children:(0,u.jsx)(d.S,{})}),(0,u.jsx)(r.Z.Item,{label:"\u6700\u5C0F\u503C",name:"min",children:(0,u.jsx)(d.S,{})}),(0,u.jsx)(r.Z.Item,{label:"\u533A\u95F4\u5355\u4F4D",name:"rangeUnit",children:(0,u.jsx)(B.default,{options:Object.values(m)})}),(0,u.jsx)(r.Z.Item,{label:"\u533A\u95F4\u503C",name:"rangeNum",children:(0,u.jsx)(d.S,{})}),(0,u.jsx)(r.Z.Item,{shouldUpdate:function(e,n){return e.rangeNum!==n.rangeNum||e.rangeUnit!==n.rangeUnit},children:function(e){var n=e.getFieldValue,s=n("rangeUnit"),o=n("rangeNum");return(0,u.jsx)(r.Z.Item,{label:m[s].label,extra:"\u5927\u6570\u636E\u91CF\u65F6\uFF0C\u901A\u8FC7rangeLimit\u8BBE\u7F6E\u6700\u5927\u503C\uFF0C\u9ED8\u8BA41000\uFF0C\u907F\u514D\u8BA1\u7B97\u592A\u591A\u5BFC\u81F4\u6D4F\u89C8\u5668\u5361\u6B7B\u3002\u9ED8\u8BA4\u5F00\u542F\u865A\u62DF\u6EDA\u52A8",name:"numberRange1",rules:[{required:!0,validator:function(v,p){return i(v,p)}}],children:(0,u.jsx)(l.NumberRange,{showAddButton:!0,showDelButton:!0,max:F,min:c,rangeNum:s===m.count.value?o:void 0,step:s!==m.count.value?o:void 0})})}}),(0,u.jsx)("h1",{children:"\u5176\u4ED6\u6848\u4F8B"}),(0,u.jsx)(r.Z.Item,{label:"\u4F20\u5165\u5177\u4F53\u533A\u95F4",name:"numberRange3",rules:[{required:!0,validator:function(e,n){return i(e,n,{max:5,min:-5})}}],children:(0,u.jsx)(l.NumberRange,{showDelButton:!0})}),(0,u.jsx)(r.Z.Item,{label:"\u5F02\u5E38\u60C5\u51B5\uFF0Cmax===min",name:"numberRange4",rules:[{required:!0,validator:function(e,n){return i(e,n,{max:1,min:1})}}],children:(0,u.jsx)(l.NumberRange,{max:1,min:1,step:111})}),(0,u.jsx)(r.Z.Item,{label:"\u5F02\u5E38\u60C5\u51B5\uFF0Cmax<min",name:"numberRange5",rules:[{required:!0,validator:function(e,n){return i(e,n,{max:0,min:1})}}],children:(0,u.jsx)(l.NumberRange,{max:0,min:1,step:111})}),(0,u.jsx)(r.Z.Item,{label:"\u6700\u5927\u503C\uFF1A".concat(j,"\uFF1B\u6700\u5C0F\u503C\uFF1A").concat(f),name:"numberRange6",rules:[{required:!0,validator:function(e,n){return i(e,n,{max:b,min:A})}}],children:(0,u.jsx)(l.NumberRange,{max:b,min:A,step:10})}),(0,u.jsx)(r.Z.Item,{label:"\u533A\u95F4\u8BA1\u7B97\u5411\u4E0A\u53D6\u6574\u6848\u4F8B\u3002\u6700\u5927\u503C\uFF1A".concat(1027,"\uFF1B\u6700\u5C0F\u503C\uFF1A",1),name:"numberRange7",rules:[{required:!0,validator:function(e,n){return i(e,n,{max:1027,min:1})}}],children:(0,u.jsx)(l.NumberRange,{max:1027,min:1,rangeNum:10})}),(0,u.jsx)(r.Z.Item,{label:" ",colon:!1,children:(0,u.jsxs)(N.Z,{children:[(0,u.jsx)(h.ZP,{type:"primary",htmlType:"submit",children:"Submit"}),(0,u.jsx)(h.ZP,{htmlType:"reset",children:"Reset"})]})})]})}}}]);
