/// <reference types="@testing-library/jest-dom" />

declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    toHaveAttribute(attr: string, value?: string): R;
    // 其他可能需要的匹配器
    toHaveClass(className: string): R;
    toHaveStyle(css: string | Record<string, any>): R;
    toContainElement(element: HTMLElement | null): R;
    toBeVisible(): R;
    toBeChecked(): R;
    toBeDisabled(): R;
    toBeEnabled(): R;
    toBeEmpty(): R;
    toBeEmptyDOMElement(): R;
    toBeInvalid(): R;
    toBeRequired(): R;
    toBeValid(): R;
    toContainHTML(htmlText: string): R;
    toHaveFocus(): R;
    toHaveFormValues(expectedValues: Record<string, any>): R;
    toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
    toHaveValue(value: string | string[] | number): R;
    toBePartiallyChecked(): R;
  }
}
