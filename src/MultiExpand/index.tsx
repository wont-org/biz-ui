import { useLatest, usePrevious } from 'ahooks';
import { Popover, Tag } from 'antd';
import classNames from 'classnames';
import { isEmpty, throttle } from 'lodash';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Ellipsis from '../Ellipsis';
import ImgPreload from '../ImgPreload';
import { MODE } from './constant';
import './index.less';
import type { IMultiExpandContentProps, IMultiExpandProps } from './types';
import './wrapContent.less';

const OUT_MAX_LENGTH = 20;
const INNER_MAX_LENGTH = 30;
const DEFAULT_TOOLTIP = {
  arrow: true,
};

const Content = (props: IMultiExpandContentProps) => {
  const {
    data = [],
    mode,
    onClickItem,
    tagProps = {},
    style,
    tooltip = DEFAULT_TOOLTIP,
    className: contentCls = '',
    maxLength = INNER_MAX_LENGTH,
  } = props;
  const { className = '', ...restTagProps } = tagProps;
  return (
    <section style={style} className={`wrap-content ${contentCls}`}>
      {data.map((item, index) => {
        const isTag = mode === MODE.tag;
        if (isTag) {
          const contentTag = classNames('contentTag', {
            cp: item.canClick,
            [className]: !!className,
          });
          return (
            <Tag
              color="blue"
              key={item.label}
              className={contentTag}
              {...restTagProps}
              onClick={() => {
                onClickItem?.[0]?.(item, index);
                onClickItem?.[1]?.();
              }}
            >
              <ImgPreload src={item.icon} className="multi-expand-icon" />
              <Ellipsis
                fullWidthRecognition
                style={{
                  display: 'inline-flex',
                }}
                length={maxLength}
                tooltip={tooltip}
              >
                {item.label}
              </Ellipsis>
            </Tag>
          );
        }
        const contentItem = classNames('contentItem p4', {
          cp: item.canClick,
        });
        return (
          <div className="contentItem p4" key={item.label}>
            <ImgPreload src={item.icon} className="multi-expand-icon" />
            <Ellipsis
              className={contentItem}
              onClick={() => {
                onClickItem?.[0]?.(item, index);
                onClickItem?.[1]?.();
              }}
              fullWidthRecognition
              length={maxLength}
              tooltip={tooltip}
            >
              {item.label}
            </Ellipsis>
          </div>
        );
      })}
    </section>
  );
};
const ContentWrap = (props: IMultiExpandContentProps) => {
  const { data = [] } = props;
  const groupData = {};
  let needClassify = true;
  for (const item of data) {
    const { tagType, tagTypeLabel } = item || {};
    if (!(tagType || tagTypeLabel)) {
      needClassify = false;
      break;
    }
    if (!groupData[tagType]) {
      groupData[tagType] = {};
      groupData[tagType].optionList = [];
    }
    groupData[tagType].label = tagTypeLabel;
    groupData[tagType].optionList.push(item);
  }
  // console.log('groupData :>> ', groupData);
  if (needClassify) {
    return Object.values(groupData).map((item) => (
      <section key={item.label}>
        <div className="group-tittle">{item.label}</div>
        <Content {...props} data={item.optionList || []} />
      </section>
    ));
  }
  return <Content {...props} />;
};

const MultiExpand = (props: IMultiExpandProps) => {
  const {
    data = [],
    title = '',
    trigger = 'hover',
    // mode,
    mode = MODE.tag,
    empty = '-',
    // func
    onClickItem,
    tagProps = {},
    moreTagProps = {},
    tooltip = DEFAULT_TOOLTIP,
    style,
    className = '',
    maxSize,
    outMaxLength = OUT_MAX_LENGTH,
    moreRender,
  } = props;
  const [open, setOpen] = useState(false);
  const isTag = mode === MODE.tag;
  const tagsRef = useRef<HTMLElement[]>([]);
  const moreTagRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);
  const lastVisibleIndexRef = useLatest(lastVisibleIndex);
  const preData = usePrevious(data) || [];

  const getLastVisibleIndex = () => {
    const container = containerRef.current;
    const containerRect = container?.getBoundingClientRect();
    // let index = lastVisibleIndexRef.current;
    let index = data.length;
    let idx = 0;
    if (
      !containerRect?.width ||
      !moreTagRef.current ||
      !container ||
      tagsRef.current.length <= 0 ||
      data.length <= 0
    ) {
      return index;
    }
    let eleWidth = 0;
    for (const ele of tagsRef.current) {
      const eleRect = ele.getBoundingClientRect();
      const moreRect = moreTagRef.current.getBoundingClientRect();
      const { marginRight = '' } = getComputedStyle(ele);
      // const { paddingRight = '', paddingLeft } = getComputedStyle(container);
      eleWidth = eleWidth + eleRect.width;
      // const isOverflowing =
      //   eleRect?.left < containerRect?.left ||
      //   eleRect?.right + moreRect?.width + parseFloat(marginRight)* (idx + 2) > containerRect?.right;
      if (
        // isOverflowing
        eleWidth + parseFloat(marginRight) * (idx + 2) + moreRect.width >
        // +
        // parseFloat(paddingRight) +
        // parseFloat(paddingLeft)
        containerRect.width
      ) {
        // console.log('idx :>> ', idx);
        index = idx;
        break;
      }
      idx += 1;
    }
    // console.log('index :>> ', index);
    return index || 1;
  };

  useLayoutEffect(() => {
    if (typeof maxSize === 'number') {
      setLastVisibleIndex(maxSize);
      return;
    }
    if (!lastVisibleIndexRef.current) {
      setLastVisibleIndex(data.length);
    }
    if (preData.length === data.length || !data) {
      return;
    }
    if (!containerRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(
      throttle((entries) => {
        for (const entry of entries) {
          if (entry.target === containerRef.current) {
            const _index = getLastVisibleIndex();
            setLastVisibleIndex(_index);
          }
        }
      }, 50),
    );
    resizeObserver.observe(containerRef.current);
    () => {
      resizeObserver.disconnect();
    };
  }, [data]);

  const getFirst = () => {
    const { className = '', ...restTagProps } = tagProps;
    const firstCls = (idx: number) =>
      classNames('contentItem', {
        cp: data[0]?.canClick,
        mr8: !isTag,
        [className]: !!className,
        contentItemHidden: idx >= lastVisibleIndexRef.current,
      });
    if (typeof maxSize === 'number' && maxSize <= 0) {
      return null;
    }

    return data.map((item, index) => {
      // const isOneMore = lastVisibleIndex === 0;
      if (isTag) {
        return (
          <Tag
            ref={(el) => {
              el && (tagsRef.current[index] = el);
            }}
            key={item.label}
            className={firstCls(index)}
            color="blue"
            {...restTagProps}
            onClick={() => onClickItem?.(item, index)}
          >
            <ImgPreload src={item.icon} className="multi-expand-icon" />
            <Ellipsis fullWidthRecognition tooltip={tooltip} length={outMaxLength}>
              {item.label}
            </Ellipsis>
          </Tag>
        );
      }
      return (
        <span
          ref={(el) => {
            el && (tagsRef.current[index] = el);
          }}
          key={item.label}
          className={firstCls(index)}
          onClick={() => onClickItem?.(item, index)}
        >
          <ImgPreload src={item.icon} className="multi-expand-icon" />
          <Ellipsis fullWidthRecognition tooltip={tooltip} length={outMaxLength}>
            {item.label}
          </Ellipsis>
        </span>
      );
    });
  };

  if (isEmpty(data)) {
    return empty;
  }

  const cls = classNames('multi-expand-container', {
    [className]: !!className,
  });
  return (
    <section ref={containerRef} style={style} className={cls}>
      {getFirst()}
      <>
        <Popover
          placement="rightTop"
          overlayClassName="popoverReset"
          trigger={trigger}
          title={title}
          open={open}
          onOpenChange={setOpen}
          content={
            <ContentWrap
              tagProps={tagProps}
              data={data}
              onClickItem={[onClickItem, () => open && setOpen(false)]}
              mode={mode}
            />
          }
        >
          <Tag
            style={{
              visibility:
                !moreRender && data.length > 1 && lastVisibleIndex !== data.length
                  ? 'visible'
                  : 'hidden',
              position:
                moreRender ||
                lastVisibleIndex === data.length ||
                (maxSize && maxSize === data.length) ||
                data.length <= 1
                  ? 'fixed'
                  : 'unset',
              right:
                moreRender ||
                lastVisibleIndex === data.length ||
                (maxSize && maxSize === data.length) ||
                data.length <= 1
                  ? '-999999px'
                  : 'unset',
            }}
            ref={moreTagRef}
            className="cp"
            color={isTag ? undefined : 'blue'}
            {...moreTagProps}
          >
            {isTag ? `+${data.length - lastVisibleIndex}` : data.length}
          </Tag>
          <div
            style={{
              visibility:
                moreRender && (lastVisibleIndex !== data.length || !maxSize) ? 'visible' : 'hidden',
              position:
                !moreRender || lastVisibleIndex === data.length || maxSize ? 'fixed' : 'unset',
              right:
                !moreRender || lastVisibleIndex === data.length || maxSize ? '-999999px' : 'unset',
            }}
          >
            {moreRender}
          </div>
        </Popover>
      </>
    </section>
  );
};
MultiExpand.ContentWrap = ContentWrap;

export default MultiExpand;
