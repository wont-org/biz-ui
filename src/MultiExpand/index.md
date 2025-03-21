---
title: MultiExpand
path: component/block-header
group: 数据展示
---

# MultiExpand

多值折叠展示, 自动计算存放标签数量

> 以下示例**绿色边框**只有**demo**才有，为了观测区域，大胆使用

## 普通 inline 场景

<code src="./demo/Inline.tsx"></code>

## Table 场景

> 表格支持拖拽，拖拽时，组件检测宽度变化并自动计算

<code src="./demo/Table.tsx"></code>

## 特殊场景 Description 组件 无 border

> 设置父元素为 inline-flex，比如：

<code src="./demo/Description.tsx"></code>

## 特殊场景 Description bordered 组件

> Description bordered 展示区为 th>span>MultiExpand，因为 border 额外占了 2px，需要进行 inline-block 设置，详见 index.less

<code src="./demo/DescriptionBordered.tsx"></code>

## 独立使用 popover 弹出层场景

<code src="./demo/ContentWrap.tsx"></code>
