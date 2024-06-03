import { BlockHeader } from '@wont/biz-ui';
import React from 'react';

export default class Simple extends React.Component {
  render() {
    return (
      <div>
        <BlockHeader title="标题" tooltip={<span>test</span>} placement="top" />
        <BlockHeader
          className="test-class"
          title="标题"
          placement="top"
          leftContent={
            <a className="link" href="/">
              left content
            </a>
          }
        />
        <BlockHeader
          title="标题"
          tooltip={<span>test</span>}
          placement="top"
          rightContent={
            <a className="link" href="/">
              right content
            </a>
          }
        />
        <BlockHeader
          className="test-class"
          title="标题"
          tooltip={<span>test</span>}
          placement="top"
          leftContent={
            <a className="link" href="/">
              left content
            </a>
          }
          rightContent={
            <a className="link" href="/">
              right content
            </a>
          }
        />
        <BlockHeader title="ribbon (默认)" />
        <BlockHeader type="minimum" title="minimum" />
      </div>
    );
  }
}
