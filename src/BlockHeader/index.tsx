import React, { Component } from 'react';
import cx from 'classnames';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import './index.css';
import type { IBlockHeaderProps } from './types';

export default class BlockHeader extends Component<IBlockHeaderProps> {
  static defaultProps = {
    className: '',
    placement: 'topLeft',
    type: 'ribbon',
  };

  static renderRequired() {
    return <div className="block-header__required">*</div>;
  }

  renderTitle() {
    const { title, type } = this.props;
    return (
      <div
        className={cx('block-header__title', {
          'block-header__title-ribbon': type === 'ribbon',
        })}
      >
        <h3>{title}</h3>
      </div>
    );
  }

  renderTooltip() {
    const { tooltip, placement } = this.props;
    return (
      <div className="block-header__pop">
        <Tooltip trigger="hover" title={tooltip} placement={placement}>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
    );
  }

  renderLeftContent() {
    const { leftContent } = this.props;
    return (
      <div className={cx('block-header__content', 'block-header__content-left')}>{leftContent}</div>
    );
  }

  renderRightContent() {
    const { rightContent } = this.props;
    return (
      <div className={cx('block-header__content', 'block-header__content-right')}>
        {rightContent}
      </div>
    );
  }

  render() {
    const {
      leftContent,
      rightContent,
      tooltip,
      className,
      type,
      required,
      style = {},
    } = this.props;
    return (
      <div
        className={cx('block-header', className, {
          'block-header-ribbon': type === 'ribbon',
          'block-header-minimum': type === 'minimum',
        })}
        style={style}
      >
        {this.renderTitle()}
        {tooltip && this.renderTooltip()}
        {required && BlockHeader.renderRequired()}
        {leftContent && this.renderLeftContent()}
        {rightContent && this.renderRightContent()}
      </div>
    );
  }
}
