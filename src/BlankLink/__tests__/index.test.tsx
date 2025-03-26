import { render, screen } from '@testing-library/react';
import React from 'react';
import BlankLink from '../index';

describe('BlankLink', () => {
  it('应该正确渲染链接和内容', () => {
    render(<BlankLink href="https://example.com">测试链接</BlankLink>);

    const linkElement = screen.getByText('测试链接');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', 'https://example.com');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('应该传递其他属性', () => {
    render(
      <BlankLink href="https://example.com" className="custom-class" data-testid="test-link">
        测试链接
      </BlankLink>,
    );

    const linkElement = screen.getByTestId('test-link');
    expect(linkElement).toHaveAttribute('class', 'custom-class');
  });
});
