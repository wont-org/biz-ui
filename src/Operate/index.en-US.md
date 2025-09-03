---
title: Operate
path: component/Operate
group:
  title: General
  order: 9999
---

# Operate

Encapsulates table operation column buttons, based on [AutoLoadingButton](https://wont-org.github.io/biz-ui/components/auto-loading-button), with vertical dividers added by default.

<!-- ## API

<API id="Operate"></API> -->

## Single Use

<code src="./demo/Basic.tsx"></code>

## Specify Display Count

- `showCount={0}` collapses all
- `dropDownProps` passes all properties except `menu` and `DropDown.Button`
- The following uses `click`

<code src="./demo/ShowCount0.tsx"></code>

## Specify Display Count

- `showCount={-1}` expands all

<code src="./demo/ShowCount-1.tsx"></code>

## Table Scenario

<code src="./demo/Table.tsx"></code>
