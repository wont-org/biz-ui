---
title: smoothScroll
path: component/smoothScroll
group:
  title: Dom
---

# smoothScroll

Smooth scroll utility. Smoothly scroll a DOM element to a specified position, avoiding jarring long-distance page jumps.

## API

```ts
function smoothScroll(
  element: HTMLElement | Window,
  x: number,
  y: number,
  duration: number = 250,
): void;
```

Scroll `element` to position `(x, y)` with animation duration of `duration`.

## Basic Usage

<code src="./demo/Basic.tsx"></code>
