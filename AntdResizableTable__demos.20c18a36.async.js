"use strict";(self.webpackChunk_wont_biz_ui=self.webpackChunk_wont_biz_ui||[]).push([[480,309],{65829:function(M,c,t){t.r(c),t.d(c,{default:function(){return b}});var f=t(26068),i=t.n(f),h=t(48305),p=t.n(h),r=t(61346),S=t(69504),j=t(34393),v=t(75271),g=t(461),s=t(38886),e=t(52676),l=[{title:"\u81EA\u52A8\u8BA1\u7B97",dataIndex:"name1",width:320,ellipsis:!0,fixed:"left",render:function(){return(0,e.jsx)(r.MultiExpand,{data:l.map(function(n){return{label:n.title}})})}},{title:"\u81EA\u52A8\u8BA1\u7B97 mode Text",dataIndex:"name2",width:320,fixed:"left",ellipsis:!0,render:function(){return(0,e.jsx)(r.MultiExpand,{data:l.map(function(n){return{label:n.title}}),mode:g.I.text})}},{title:"\u521A\u597D\u4E24\u4E2A",dataIndex:"name3",width:320,ellipsis:!0,align:"right",render:function(){return(0,e.jsx)(r.MultiExpand,{data:[{label:"111"},{label:"222"}]})}},{title:"\u521A\u597D\u4E24\u4E2A, \u81EA\u5B9A\u4E49render",dataIndex:"name4",width:320,ellipsis:!0,align:"right",render:function(){return(0,e.jsx)(r.MultiExpand,{data:[{label:"111"},{label:"222"}],moreRender:(0,e.jsx)(s.Z.Link,{children:"\u66F4\u591A>"})})}},{title:"maxSize 0, \u81EA\u5B9A\u4E49render",dataIndex:"name5",width:320,ellipsis:!0,render:function(){return(0,e.jsx)(r.MultiExpand,{maxSize:0,data:[{label:"111"},{label:"222"}],moreRender:(0,e.jsx)(s.Z.Link,{children:"\u66F4\u591A>"})})}},{title:"\u5C0F\u4E8EmaxSize\u65E0\u66F4\u591A",dataIndex:"maxSize",width:160,ellipsis:!0,render:function(){return(0,e.jsx)(r.MultiExpand,{data:[l[0]].map(function(n){return{label:n.title}})})}},{title:"\u5730\u65B9\u5F88\u5927\uFF0C\u4F46\u53EA\u5C55\u793A\u4E00\u4E2A",dataIndex:"age",width:300,ellipsis:!0,render:function(){return(0,e.jsx)(r.MultiExpand,{data:l.map(function(n){return{label:n.title}}),maxSize:1})}},{title:"\u81EA\u5B9A\u4E49\u89E6\u53D1\u5668",dataIndex:"moreRender",width:160,ellipsis:!0,render:function(){return(0,e.jsx)(r.MultiExpand,{data:l.map(function(n){return{label:n.title}}),maxSize:1,moreRender:(0,e.jsx)(s.Z.Link,{children:"\u66F4\u591A>"})})}},{title:"\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F\u5F88\u957F",dataIndex:"address",width:200,ellipsis:!0}],z=[{id:"1",key:"1",name:"\u80E1\u5F66\u658C",age:32,address:"\u897F\u6E56\u533A\u6E56\u5E95\u516C\u56ED1\u53F7",maxSize:"maxSize",moreRender:"moreRender"}],b=function(){var a=(0,v.useState)(!1),n=p()(a,2),u=n[0],y=n[1],C=function(){if(u)return l.map(function(d,x){return i()(i()({},d),{},{width:l.length-1===x?void 0:d.width})});var o=l.slice(0,3);return console.log("shortCols :>> ",o),o.map(function(d,x){return i()(i()({},d),{},{width:o.length-1===x?void 0:d.width})})},m=C();return console.log("_columns :>> ",m),(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(S.Z,{children:(0,e.jsx)(j.ZP,{onClick:function(){return y(!u)},children:u?"\u5217\u53D8\u5C11":"\u5217\u53D8\u591A"})}),(0,e.jsx)(r.AntdResizableTable,{rowKey:"key",resizeColumnsState:{persistenceType:"sessionStorage",persistenceKey:"resizeColumnsState"},tableType:"ProTable",columns:m,dataSource:z})]})}}}]);
