---
title: Operate
path: component/Operate
group:
  title: 通用
  order: 9999
---

# Operate

封装表格操作列按钮，基于[AutoLoadingButton](https://wont-org.github.io/biz-ui/components/auto-loading-button)，默认增加了垂直分割线

## 单独使用

<code src="./demo/Basic.tsx"></code>

## 指定展示个数

- `showCount={0}`全部收起
- `dropDownProps`透传所有属性，除`menu`以及`DropDown.Button`
- 以下使用`click`

<code src="./demo/ShowCount0.tsx"></code>

## 指定展示个数

- `showCount={-1}`全部展开

<code src="./demo/ShowCount-1.tsx"></code>

## 表格场景

<code src="./demo/Table.tsx"></code>
