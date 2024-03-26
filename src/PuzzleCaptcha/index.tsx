import classnames from 'classnames';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { getImg, sleep, genRandomXY, isFirefox, drawGap } from './utils';
import type { PuzzleCaptchaProps } from './types';
import { StyleContainer } from './style';
import { useLatest } from 'ahooks';
import { DoubleRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { ICON_TYPE, IconFont } from '../IconFont/icon';

const prefix = 'puzzle-captcha';

export default (props: PuzzleCaptchaProps) => {
  const {
    width = 320,
    height = 180,
    useMask = false,
    visible = false,
    title = '安全验证',
    sliderTip = '滑动完成拼图',
    successMsg = '验证通过',
    failMsg = '验证失败，请重试',
    onSuccess,
    onFail,
    onClose,
    useFetch = false,
    fetchData,
  } = props;
  // 缺口
  const GAP_WIDTH = 58;
  // 拖动
  const DRAG_WIDTH = 50;
  // 缺口 阴影
  const GAP_SHADOW_BLUR = 3;
  // 拼图和滑块的比例
  const ratio = (width - GAP_WIDTH) / (width - DRAG_WIDTH);

  const bgCanvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const gapCanvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  let bgCtx: CanvasRenderingContext2D | null = null;
  let gapCtx: CanvasRenderingContext2D | null = null;
  let disabled = false;
  // 随机x y左标
  const coord = useRef({
    x: 0,
    y: 0,
  });

  let initData = {
    bgImg: '',
    gapImg: '',
    y: 0,
  };
  const origin = useRef({
    x: 0,
  });
  const [trail, setTrail] = useState({
    x: 0,
  });
  const [state, setState] = useState({
    valid: false,
    resultMsg: '',
    isMoving: false,
    loading: false,
  });
  const latestStateRef = useLatest(state);
  const latestTrailRef = useLatest(trail);

  // 前端实现
  const drawBgAndGapBg = (image: CanvasImageSource) => {
    if (!(gapCtx && bgCtx && bgCanvasRef.current)) {
      return;
    }
    coord.current = genRandomXY(width, height, GAP_WIDTH);
    drawGap(bgCtx, coord.current, GAP_WIDTH);
    // 取黑色阴影
    if (!isFirefox) {
      bgCtx.shadowOffsetX = 0;
      bgCtx.shadowOffsetY = 0;
      bgCtx.shadowColor = '#000';
      bgCtx.shadowBlur = GAP_SHADOW_BLUR;
      bgCtx.fill();
      bgCtx.clip();
    } else {
      bgCtx.clip();
      bgCtx.save();
      bgCtx.shadowOffsetX = 0;
      bgCtx.shadowOffsetY = 0;
      bgCtx.shadowColor = '#000';
      bgCtx.shadowBlur = GAP_SHADOW_BLUR;
      bgCtx.fill();
    }
    // 先在背景画缺口
    bgCtx.drawImage(image, 0, 0, width, height);
    bgCtx.restore();
    const imgData = bgCtx.getImageData(0, 0, width, height);
    // 复制背景图到缺口图
    gapCtx.putImageData(imgData, width, height);
    // 填充缺口图画布
    gapCtx.drawImage(bgCanvasRef.current, 0 - coord.current.x + GAP_SHADOW_BLUR, 0, width, height);
    bgCtx.restore();

    // 重置背景
    bgCtx.clearRect(0, 0, width, height);

    // 重新画缺口
    bgCtx.save();
    drawGap(bgCtx, coord.current, GAP_WIDTH);
    bgCtx.globalAlpha = 0.8;
    bgCtx.fillStyle = '#fff';
    bgCtx.fill();
    bgCtx.restore();

    // 缺口的内白色阴影
    bgCtx.save();
    bgCtx.globalCompositeOperation = 'source-atop';
    drawGap(bgCtx, coord.current, GAP_WIDTH);
    bgCtx.arc(
      coord.current.x + GAP_WIDTH / 2,
      coord.current.y + GAP_WIDTH / 2,
      GAP_WIDTH * 2,
      0,
      Math.PI * 2,
      true,
    );
    bgCtx.shadowColor = '#000';
    bgCtx.shadowOffsetX = 2;
    bgCtx.shadowOffsetY = 2;
    bgCtx.shadowBlur = GAP_WIDTH / 3;
    bgCtx.fill();
    bgCtx.restore();

    // 原图
    bgCtx.save();
    bgCtx.globalCompositeOperation = 'destination-over';
    bgCtx.drawImage(image, 0, 0, width, height);
    bgCtx.restore();
  };

  const draw = () => {
    // 缺口背景
    bgCtx = bgCanvasRef.current?.getContext('2d') || null;
    bgCtx?.clearRect(0, 0, width, height);
    // 缺口本身
    gapCtx = gapCanvasRef.current?.getContext('2d') || null;
    gapCtx?.clearRect(0, 0, width, height);

    const image = new Image(width, height);
    image.src = initData.bgImg;
    image.onload = () => {
      bgCtx?.save();
      if (!useFetch) {
        drawBgAndGapBg(image);
        setState((pre) => ({
          ...pre,
          loading: false,
        }));
      } else {
        bgCtx?.drawImage(image, 0, 0, width, height);
      }
    };
  };
  // 后端实现
  const drawGapBgByFetch = () => {
    if (useFetch) {
      const image = new Image(width, height);
      image.crossOrigin = 'anonymous';
      image.src = initData.gapImg;
      image.onload = () => {
        gapCtx?.drawImage(image, 0, initData.y);
      };
    }
  };

  const init = async () => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    if (useFetch) {
      initData = (await fetchData?.()) || initData;
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
      drawGapBgByFetch();
    } else {
      const img = getImg(width, height);
      initData.bgImg = img;
    }
    draw();
  };

  const handleReset = async () => {
    setState((pre) => ({
      ...pre,
      resultMsg: '',
      loading: false,
    }));
    await init();
    setState((pre) => ({
      ...pre,
      isMoving: false,
    }));
    disabled = false;
    setTrail({
      x: 0,
    });
  };
  const handleMoveBegin = (e: MouseEvent & TouchEvent) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    setState({
      ...state,
      isMoving: true,
    });
    origin.current = {
      x: e.clientX || e.touches?.[0].clientX || 0,
    };
  };

  const handleMove = (e: MouseEvent & TouchEvent) => {
    if (!latestStateRef.current.isMoving) {
      return;
    }
    let move = {
      x: (e.clientX || e.touches?.[0]?.clientX || 0) - origin.current.x,
    };
    const gapMaxSlideWidth = width - DRAG_WIDTH;
    if (move.x > gapMaxSlideWidth) {
      move.x = gapMaxSlideWidth;
    }
    if (move.x < 0) {
      move.x = 0;
    }
    setTrail(move);
  };

  // 前端校验
  const validResult = () => {
    const x = latestTrailRef.current.x * ratio;
    return Math.abs(coord.current.x - x) < 10;
  };

  const validator = async () => {
    let valid = false;
    if (!useFetch) {
      valid = validResult();
    } else {
      valid = await props.validator?.({
        x: Math.ceil(latestTrailRef.current.x * ratio),
      });
    }
    setState((pre) => ({
      ...pre,
      valid,
    }));
    disabled = true;
    if (valid) {
      setState((pre) => ({
        ...pre,
        resultMsg: successMsg,
      }));
      await sleep(800);
      onSuccess?.();
    } else {
      setState((pre) => ({
        ...pre,
        resultMsg: failMsg,
      }));
      await sleep(800);
      onFail?.();
      handleReset();
    }
  };
  const handleEnd = async (e) => {
    e.stopPropagation();
    if (!latestStateRef.current.isMoving) {
      return;
    }
    setState((pre) => ({
      ...pre,
      isMoving: false,
    }));
    if (latestTrailRef.current.x <= 0) {
      return;
    }
    await validator?.();
  };

  useEffect(() => {
    visible && handleReset?.();
  }, [visible]);

  useEffect(() => {
    if (!useMask) {
      handleReset();
    }
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, []);

  const cls = classnames(`${prefix}`, {});
  const maskCls = classnames(`puzzle-captcha-mask`, {
    visible: useMask && visible,
  });
  const bodyCls = classnames(`puzzle-captcha-body`, {
    'puzzle-captcha-center': useMask,
  });

  return (
    <StyleContainer
      className={cls}
      style={{
        display: (useMask && visible) || !useMask ? 'block' : 'none',
      }}
    >
      <div className={maskCls} onClick={onClose} />
      <div className={bodyCls}>
        <div className="title-wrap">
          <h1 className="title">{title}</h1>
          <IconFont type={ICON_TYPE.refresh} onClick={handleReset} className="reset" />
        </div>
        <div
          className="canvas-wrap"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          <div
            style={{
              display: state.loading ? 'block' : 'none',
            }}
            className="loading"
          >
            <LoadingOutlined
              style={{
                fontSize: '26px',
                color: '#1890ff',
              }}
            />
          </div>
          <canvas ref={bgCanvasRef} className="bg" width={width} height={height} />
          <canvas
            ref={gapCanvasRef}
            className="gap"
            width={width}
            height={height}
            style={{
              transform: `translateX(${trail.x * ratio}px)`,
            }}
          />
          <p
            className={classnames('result-tip', {
              'result-visible': state.resultMsg,
              'success-tip': state.valid,
              'fail-tip': !state.valid,
            })}
          >
            {state.resultMsg}
          </p>
        </div>
        <div className="slider-wrap">
          <div
            className="slider"
            style={{
              transform: `translateX(${trail.x}px)`,
            }}
            onMouseDown={handleMoveBegin}
            onTouchStart={handleMoveBegin}
          >
            <DoubleRightOutlined
              className="slider-icon"
              style={{
                color: state.isMoving || state.resultMsg ? '#1890ff' : 'rgba(0,0,0,0.65)',
              }}
            />
          </div>
          <div
            className="slider-path"
            style={{
              width: `${trail.x + DRAG_WIDTH}px`,
            }}
          />
          <span
            style={{
              display: trail.x <= 0 ? 'block' : 'none',
            }}
            className="slider-tip"
          >
            {sliderTip}
          </span>
        </div>
      </div>
    </StyleContainer>
  );
};
