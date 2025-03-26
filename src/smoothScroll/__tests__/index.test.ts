import smoothScroll from '../index';

describe('smoothScroll', () => {
  // 保存原始实现
  const originalRequestAnimationFrame = global.requestAnimationFrame;

  beforeEach(() => {
    // 模拟requestAnimationFrame，立即执行回调
    global.requestAnimationFrame = jest.fn().mockImplementation((cb) => cb());

    // 模拟window和HTMLElement
    Object.defineProperty(global, 'window', {
      value: {
        scrollX: 0,
        scrollY: 0,
        scroll: jest.fn(),
        performance: {
          now: jest.fn().mockReturnValue(0),
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    // 恢复原始实现
    global.requestAnimationFrame = originalRequestAnimationFrame;
    jest.clearAllMocks();
  });

  it('应该调用window.scroll方法', async () => {
    const el = window;
    await smoothScroll(el, 100, 200);

    // 验证scroll被调用
    expect(window.scroll).toHaveBeenCalled();
  });

  it('应该处理HTMLElement滚动', async () => {
    const el = {
      scrollLeft: 0,
      scrollTop: 0,
    } as HTMLElement;

    await smoothScroll(el, 100, 200);

    // 验证元素的scrollLeft和scrollTop被设置
    expect(el.scrollLeft).toBe(100);
    expect(el.scrollTop).toBe(200);
  });

  it('应该使用自定义持续时间', async () => {
    const el = {
      scrollLeft: 0,
      scrollTop: 0,
    } as HTMLElement;

    await smoothScroll(el, 100, 200, 500); // 500ms

    // 由于我们模拟了requestAnimationFrame立即执行
    // 所以这里只能验证最终结果
    expect(el.scrollLeft).toBe(100);
    expect(el.scrollTop).toBe(200);
  });
});
