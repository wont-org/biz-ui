import { Popover, Tag } from 'antd';
import classNames from 'classnames';
import Ellipsis from '../Ellipsis';
import { PopoverStyleReset, StyleContainer } from './style';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useLatest, usePrevious } from 'ahooks';
import { sleep } from '../utils/commom';
import { isEmpty, isEqual, throttle } from 'lodash';
import type { IMultiExpandProps } from './types';
import { MODE } from './constant';

const MAX_LENGTH = 30;

const Content = ({ data = [], mode, onClickItem, tagProps = {} } = {}, showTitle) => {
  const { className, ...restTagProps } = tagProps;
  return (
    <section
      className="content"
      style={{
        maxHeight: '200px',
      }}
    >
      {data.map((item = {}, index) => {
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
                onClickItem[0]?.(item, index);
                onClickItem[1]?.();
              }}
              title={showTitle && item.label}
            >
              <Ellipsis
                fullWidthRecognition
                style={{
                  display: 'inline-flex',
                }}
                length={MAX_LENGTH}
              >
                {item.label}
              </Ellipsis>
            </Tag>
          );
        }
        const contentItem = classNames('contentItem', {
          cp: item.canClick,
        });
        return (
          <Ellipsis
            className={contentItem}
            key={item.label}
            onClick={() => onClickItem?.(item, index)}
            fullWidthRecognition
            length={MAX_LENGTH}
            title={showTitle && item.label}
          >
            {item.label}
          </Ellipsis>
        );
      })}
    </section>
  );
};
const ContentWrap = (props = {}) => {
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
        <div className="groupTitle">{item.label}</div>
        <Content {...props} data={item.optionList || []} />
      </section>
    ));
  }
  return <Content {...props} />;
};

export default (props: IMultiExpandProps) => {
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
    moreRender,
    showTitle = true,
    style,
    maxSize,
  } = props;
  const [open, setOpen] = useState(false);
  const isTag = mode === MODE.tag;
  const tagsRef = useRef<HTMLElement[]>([]);
  const moreTagRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);
  const lastVisibleIndexRef = useLatest(lastVisibleIndex);
  const preData = usePrevious(data);

  const getLastVisibleIndex = () => {
    const container = contentRef.current?.parentElement;
    const containerRect = container?.getBoundingClientRect();
    let index = lastVisibleIndexRef.current;
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
      const { paddingRight = '', paddingLeft } = getComputedStyle(container);
      eleWidth = eleWidth + eleRect.width;
      if (
        eleWidth +
          parseFloat(marginRight) * (idx + 2) +
          moreRect.width +
          parseFloat(paddingRight) +
          parseFloat(paddingLeft) >
        containerRect.width
      ) {
        index = idx;
        break;
      }
      idx += 1;
    }
    // console.log('index :>> ', index);
    return index;
  };

  useLayoutEffect(() => {
    if (typeof maxSize === 'number') {
      setLastVisibleIndex(maxSize);
      return;
    }
    if (!lastVisibleIndexRef.current) {
      setLastVisibleIndex(data.length);
    }
    if (isEqual(preData, data)) {
      return;
    }
    // console.log('tagsRef.current :>> ', tagsRef.current);
    sleep(100).then(async () => {
      await sleep(50);
      setLastVisibleIndex(getLastVisibleIndex());
      window.addEventListener(
        'resize',
        throttle(() => {
          setLastVisibleIndex(getLastVisibleIndex());
        }, 300),
      );
    });

    () => {
      window.removeEventListener('resize', () => setLastVisibleIndex(0));
    };
  }, [data]);

  const getFirst = () => {
    const { className, ...restTagProps } = tagProps;
    const firstCls = classNames('contentItem', {
      cp: data[0]?.canClick,
      mr4: !isTag,
      [className]: !!className,
    });

    if (typeof maxSize === 'number' && maxSize <= 0) {
      return null;
    }

    return data.slice(0, lastVisibleIndex || 1).map((item, index) => {
      const isOneMore = lastVisibleIndex === 0;
      if (isTag) {
        return (
          <Tag
            ref={(el) => {
              el && (tagsRef.current[index] = el);
            }}
            key={item.label}
            className={firstCls}
            color="blue"
            {...restTagProps}
            onClick={() => onClickItem?.(item, index)}
            title={showTitle && item.label}
          >
            <Ellipsis
              fullWidthRecognition
              // length={isOneMore ? 10 : undefined}
            >
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
          className={firstCls}
          onClick={() => onClickItem?.(item, index)}
          title={showTitle && item.label}
        >
          <Ellipsis fullWidthRecognition length={isOneMore ? 10 : undefined}>
            {item.label}
          </Ellipsis>
        </span>
      );
    });
  };
  if (isEmpty(data)) {
    return empty;
  }

  return (
    <StyleContainer ref={contentRef} style={style}>
      {getFirst()}
      <>
        <PopoverStyleReset />
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
                moreRender || (maxSize && maxSize === data.length) || data.length <= 1
                  ? 'fixed'
                  : 'unset',
              right:
                moreRender || (maxSize && maxSize === data.length) || data.length <= 1
                  ? '-999999px'
                  : 'unset',
            }}
            ref={moreTagRef}
            className="cp"
            color={isTag ? undefined : 'blue'}
            {...moreTagProps}
          >
            {isTag ? `+${data.length}` : data.length}
          </Tag>
          <div
            style={{
              visibility: moreRender ? 'visible' : 'hidden',
              position: !moreRender ? 'fixed' : 'unset',
              right: !moreRender ? '-999999px' : 'unset',
            }}
          >
            {moreRender}
          </div>
        </Popover>
      </>
    </StyleContainer>
  );
};
