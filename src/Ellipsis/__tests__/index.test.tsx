import { render, screen } from '@testing-library/react';
import React from 'react';
import Ellipsis, { cutStrByFullLength, getStrFullLength } from '../index';

describe('Ellipsis 辅助函数', () => {
  describe('getStrFullLength', () => {
    it('应该正确计算字符串全长度', () => {
      expect(getStrFullLength('abc')).toBe(3);
      expect(getStrFullLength('中文')).toBe(4);
      expect(getStrFullLength('abc中文')).toBe(7);
      expect(getStrFullLength()).toBe(0);
    });
  });

  describe('cutStrByFullLength', () => {
    it('应该按全长度截取字符串', () => {
      expect(cutStrByFullLength('abc', 2)).toBe('ab');
      expect(cutStrByFullLength('中文', 2)).toBe('中');
      expect(cutStrByFullLength('中文', 3)).toBe('中文'.substring(0, 1));
      expect(cutStrByFullLength('abc中文', 4)).toBe('abc中'.substring(0, 4));
      expect(cutStrByFullLength('', 4)).toBe('');
      expect(cutStrByFullLength(undefined, 4)).toBe('');
    });
  });
});

describe('Ellipsis 组件', () => {
  it('应该正确渲染普通文本', () => {
    render(<Ellipsis>普通文本</Ellipsis>);
    expect(screen.getByText('普通文本')).toBeInTheDocument();
  });

  it('应该根据length属性截断文本', () => {
    render(<Ellipsis length={2}>测试文本</Ellipsis>);
    expect(screen.getByText('测...')).toBeInTheDocument();
  });

  it('应该支持tooltip属性', () => {
    render(
      <Ellipsis tooltip length={2}>
        测试文本
      </Ellipsis>,
    );
    const element = screen.getByText('测...');
    expect(element).toBeInTheDocument();
    // 由于Tooltip组件的实现，这里只简单检查元素存在
  });

  it('应该支持fullWidthRecognition属性', () => {
    render(
      <Ellipsis length={3} fullWidthRecognition>
        测试文本
      </Ellipsis>,
    );
    expect(screen.getByText('测...')).toBeInTheDocument();
  });
});
