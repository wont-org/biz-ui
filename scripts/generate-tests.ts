import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取入口文件
const entryFile = fs.readFileSync(path.join(__dirname, '../src/index.tsx'), 'utf-8');

// 使用正则表达式找出所有导出的组件
const exportRegex = /export\s*{\s*default\s+as\s+([^}]+)\s*}\s*from\s*['"]([^'"]+)['"]/g;

let match;
const components: { name: string; path: string }[] = [];

while ((match = exportRegex.exec(entryFile)) !== null) {
  components.push({
    name: match[1],
    path: match[2],
  });
}

// 创建测试模板
const createTestTemplate = (componentName: string) => `import React from 'react';
import { render, screen } from '@testing-library/react';
import ${componentName} from '../index';

describe('${componentName}', () => {
  it('应该正确渲染组件', () => {
    render(<${componentName} />);
    // 这里添加断言
  });

  // 添加更多测试用例
});
`;

// 为每个组件创建测试文件
components.forEach((component) => {
  const testDir = path.join(__dirname, '../src', component.path, '__tests__');
  const testFile = path.join(testDir, 'index.test.tsx');

  // 检查测试目录是否存在，如果不存在则创建
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // 检查测试文件是否已经存在，如果不存在才创建
  if (!fs.existsSync(testFile)) {
    fs.writeFileSync(testFile, createTestTemplate(component.name));
    console.log(`Created test file for ${component.name} at ${testFile}`);
  } else {
    console.log(`Test file for ${component.name} already exists at ${testFile}`);
  }
});

console.log('Test files generation completed.');
