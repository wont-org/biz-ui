export const sleep = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

export const isFirefox =
    navigator.userAgent.indexOf('Firefox') >= 0 &&
    navigator.userAgent.indexOf('Windows') >= 0

export const getRandom = (min: number, max: number) => {
  return Math.ceil(Math.random() * (max - min) + min)
}

export const getImg = (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if(!ctx) {
    return ''
  }
  canvas.width = width
  canvas.height = height
  ctx.fillStyle = `rgb(
    ${getRandom(100, 255)},
    ${getRandom(100, 255)},
    ${getRandom(100, 255)}
  )`
  ctx.fillRect(0, 0, width, height)
  // 随机画10个图形
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = `rgb(
      ${getRandom(100, 255)},
      ${getRandom(100, 255)},
      ${getRandom(100, 255)}
    )`
    ctx.strokeStyle = `rgb(
      ${getRandom(100, 255)},
      ${getRandom(100, 255)},
      ${getRandom(100, 255)}
    )`

    if (getRandom(0, 2) > 1) {
      // 矩形
      ctx.save()
      ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
      ctx.fillRect(
        getRandom(-20, canvas.width - 20),
        getRandom(-20, canvas.height - 20),
        getRandom(10, canvas.width / 2 + 10),
        getRandom(10, canvas.height / 2 + 10)
      )
      ctx.restore()
    } else {
      // 圆
      ctx.beginPath()
      const ran = getRandom(-Math.PI, Math.PI)
      ctx.arc(
        getRandom(0, canvas.width),
        getRandom(0, canvas.height),
        getRandom(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5
      )
      ctx.closePath()
      ctx.fill()
    }
  }
  return canvas.toDataURL('image/png')
}

export interface Coord {
  x: number
  y: number
}
/**
 * @param width canvas width
 * @param height
 * @param gapWidth
 * @returns
 */
export const genRandomXY = (width: number, height: number, gapWidth: number) => {
  return {
    x: getRandom(gapWidth + 20, width - gapWidth - 20),
    y: getRandom(20, height - gapWidth - 20),
  };
};
/**
 * @desc 画缺口路径
 * @param ctx canvas context
 * @param coord 随机x y位置
 * @param gapWidth 缺口宽度
 * @returns
 */
export const drawGap = (ctx: CanvasRenderingContext2D | null, coord: Coord, gapWidth: number) => {
  if (!ctx) {
    return;
  }
  const gapOneThirdWidth = gapWidth / 4;
  const r = gapOneThirdWidth / 2;
  // 从左上角开始画
  ctx.beginPath();
  ctx.moveTo(coord.x, coord.y);
  ctx.lineTo(coord.x + gapOneThirdWidth, coord.y);
  ctx.arcTo(
    coord.x + gapOneThirdWidth,
    coord.y - r,
    coord.x + gapOneThirdWidth + r,
    coord.y - r,
    r,
  );
  ctx.arcTo(
    coord.x + gapOneThirdWidth + gapOneThirdWidth,
    coord.y - gapOneThirdWidth / 2,
    coord.x + gapOneThirdWidth + gapOneThirdWidth,
    coord.y,
    gapOneThirdWidth / 2,
  );
  ctx.lineTo(
    coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
    coord.y,
  );
  // 右上
  ctx.lineTo(
    coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
    coord.y + gapOneThirdWidth,
  );
  ctx.arcTo(
    coord.x +
      gapOneThirdWidth +
      gapOneThirdWidth +
      gapOneThirdWidth +
      gapOneThirdWidth / 2,
    coord.y + gapOneThirdWidth,
    coord.x +
      gapOneThirdWidth +
      gapOneThirdWidth +
      gapOneThirdWidth +
      gapOneThirdWidth / 2,
    coord.y + gapOneThirdWidth + gapOneThirdWidth / 2,
    gapOneThirdWidth / 2,
  );
  ctx.arcTo(
    coord.x +
      gapOneThirdWidth +
      gapOneThirdWidth +
      gapOneThirdWidth +
      gapOneThirdWidth / 2,
    coord.y + gapOneThirdWidth + gapOneThirdWidth,
    coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
    coord.y + gapOneThirdWidth + gapOneThirdWidth,
    gapOneThirdWidth / 2,
  );
  ctx.lineTo(
    coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
    coord.y + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
  );
  // 右下
  ctx.lineTo(
    coord.x,
    coord.y + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
  );
  ctx.lineTo(coord.x, coord.y + gapOneThirdWidth + gapOneThirdWidth);

  ctx.arcTo(
    coord.x + gapOneThirdWidth / 2,
    coord.y + gapOneThirdWidth + gapOneThirdWidth,
    coord.x + gapOneThirdWidth / 2,
    coord.y + gapOneThirdWidth + gapOneThirdWidth / 2,
    gapOneThirdWidth / 2,
  );
  ctx.arcTo(
    coord.x + gapOneThirdWidth / 2,
    coord.y + gapOneThirdWidth,
    coord.x,
    coord.y + gapOneThirdWidth,
    gapOneThirdWidth / 2,
  );
  ctx.lineTo(coord.x, coord.y);
  // 左下 闭合
  ctx.closePath();
};
