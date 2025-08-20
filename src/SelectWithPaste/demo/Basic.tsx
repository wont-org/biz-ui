import { SelectWithPaste } from '@wont/biz-ui';
import { Divider, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title, Text } = Typography;

export default () => {
  const [value1, setValue1] = useState<string[]>(['opt1', 'opt2']);
  const [value2, setValue2] = useState<string[]>();
  const [value3, setValue3] = useState<string[]>([]);

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Title level={4}>基础用法</Title>
        <Text type="secondary">支持手动输入、下拉选择和批量粘贴，使用英文逗号或回车分割多个值</Text>
        <div style={{ marginTop: 16 }}>
          <SelectWithPaste
            value={value1}
            onChange={(val) => setValue1(val || [])}
            selectProps={{
              style: { width: 400 },
              options: [
                { label: '选项1', value: 'opt1' },
                { label: '选项2', value: 'opt2' },
                { label: '选项3', value: 'opt3' },
                { label: '选项4', value: 'opt4' },
                { label: '选项5', value: 'opt5' },
              ],
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Text>当前值: {JSON.stringify(value1)}</Text>
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={4}>邮箱批量录入</Title>
        <Text type="secondary">常用于邮箱地址的批量录入，支持从Excel复制粘贴</Text>
        <div style={{ marginTop: 16 }}>
          <SelectWithPaste
            value={value2}
            onChange={(val) => setValue2(val || [])}
            selectProps={{
              style: { width: 500 },
              placeholder: '请输入邮箱地址，支持批量粘贴',
              options: [
                { label: 'admin@example.com', value: 'admin@example.com' },
                { label: 'user@example.com', value: 'user@example.com' },
                { label: 'test@example.com', value: 'test@example.com' },
              ],
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Text>邮箱列表: {value2?.join(', ')}</Text>
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={4}>ID批量录入</Title>
        <Text type="secondary">适用于用户ID、商品ID等数字类型的批量录入</Text>
        <div style={{ marginTop: 16 }}>
          <SelectWithPaste
            value={value3}
            onChange={(val) => setValue3(val || [])}
            selectProps={{
              style: { width: 450 },
              placeholder: '请输入ID，支持批量录入',
              options: [
                { label: 'ID: 100001', value: '100001' },
                { label: 'ID: 100002', value: '100002' },
                { label: 'ID: 100003', value: '100003' },
              ],
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Text>ID数量: {value3.length} 个</Text>
            {value3.length > 0 && (
              <div style={{ marginTop: 4 }}>
                <Text code>{value3.join(', ')}</Text>
              </div>
            )}
          </div>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={4}>使用说明</Title>
        <ul>
          <li>
            <Text>支持手动输入：直接在输入框中输入，使用逗号或回车分割多个值</Text>
          </li>
          <li>
            <Text>支持下拉选择：点击下拉箭头选择预设选项</Text>
          </li>
          <li>
            <Text>支持批量粘贴：点击编辑按钮，在弹窗中粘贴Excel或文本内容</Text>
          </li>
          <li>
            <Text>自动去重：重复的值会被自动过滤</Text>
          </li>
          <li>
            <Text>自动过滤：空值和纯空格会被自动过滤</Text>
          </li>
        </ul>
      </div>
    </Space>
  );
};
