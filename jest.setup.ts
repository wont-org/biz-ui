import '@testing-library/jest-dom';

// 全局模拟对象
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

// 静默控制台错误
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
      args[0].includes('Warning: React does not recognize the') ||
      args[0].includes('Warning: The tag <') ||
      args[0].includes('Warning: Invalid DOM property'))
  ) {
    return;
  }
  originalConsoleError(...args);
};
