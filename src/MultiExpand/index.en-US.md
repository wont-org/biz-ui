---
title: MultiExpand
path: component/MultiExpand
group: Data Display
---

# MultiExpand

Multi-value collapse display, automatically calculates the number of tags to store.

> The **green border** in the following examples is only for **demo**, to observe the area, use it boldly

## Normal inline scenario

<code src="./demo/Inline.tsx"></code>

## Table scenario

> The table supports dragging, when dragging, the component detects width changes and automatically calculates

<code src="./demo/Table.tsx"></code>

## Special scenario: Description component without border

> Set parent element to inline-flex, for example:

<code src="./demo/Description.tsx"></code>

## Special scenario: Description bordered component

> Description bordered display area is th>span>MultiExpand, because border takes extra 2px, needs inline-block setting, see index.less for details

<code src="./demo/DescriptionBordered.tsx"></code>

## Independent use of popover overlay scenario

<code src="./demo/ContentWrap.tsx"></code>
