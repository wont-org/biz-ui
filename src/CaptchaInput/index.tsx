import React, { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { StyleVerificationInputBox, StyleVerificationInputWrapper } from './style';

export interface VerificationInputProps {
  value?: string;
  step?: number;
  autofocus?: boolean;
  disabled?: boolean;
  inputFormatter?: (value: string) => string;
  onEnter?: () => void;
  onChange?: (value: string) => void;
}

export default (props: VerificationInputProps) => {
  const {
    value,
    step = 6,
    autofocus = false,
    disabled = false,
    inputFormatter = (t) => t.replace(/[^a-z0-9A-Z]/g, '').toUpperCase(),
    onEnter,
    onChange,
  } = props;
  const [inputValue, setInputValue] = useState<string[]>(new Array(step).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!value) {
      setInputValue(new Array(step).fill(''));
    }
  }, [value, step]);

  const handleChange = (_value: string, index: number) => {
    const formattedValue = inputFormatter(_value);

    if (formattedValue === '') {
      const newInputValue = [...inputValue];
      newInputValue[index] = formattedValue;
      setInputValue(newInputValue);

      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = formattedValue;
      }

      onChange?.(newInputValue.join(''));
      return;
    }

    const newInputValue = [...inputValue];
    newInputValue[index] =
      formattedValue.length === 1
        ? formattedValue
        : formattedValue.replace(inputValue[index], '')[0];

    setInputValue(newInputValue);

    if (inputRefs.current[index]) {
      inputRefs.current[index]!.value = newInputValue[index];
    }

    const nextIndex = Math.min(index + 1, step - 1);
    inputRefs.current[nextIndex]?.focus();

    onChange?.(newInputValue.join(''));
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>, index: number) => {
    const _value = event.clipboardData?.getData('Text') || '';
    const valueArr = inputFormatter(_value).split('');

    if (valueArr.length === 0) {
      return;
    }

    const newInputValue = [...inputValue];
    for (let i = 0; i < valueArr.length; i++) {
      if (newInputValue[index + i] === undefined) {
        break;
      }
      newInputValue[index + i] = valueArr[i];
    }

    setInputValue(newInputValue);

    const nextIndex = Math.min(index + valueArr.length, step - 1);
    inputRefs.current[nextIndex]?.focus();

    onChange?.(newInputValue.join(''));
  };

  const handleBackspace = (index: number) => {
    const newInputValue = [...inputValue];
    if (newInputValue[index] !== '') {
      newInputValue[index] = '';
      setInputValue(newInputValue);
      onChange?.(newInputValue.join(''));
      return;
    }

    if (index === 0) {
      return;
    }

    inputRefs.current[index - 1]?.focus();
  };

  const handleArrayLeft = (index: number) => {
    if (index === 0) {
      return;
    }

    inputRefs.current[index - 1]?.focus();
  };

  const handleArrayRight = (index: number) => {
    if (index === step - 1) {
      return;
    }

    inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    switch (e.key) {
      case 'ArrowLeft':
        handleArrayLeft(index);
        break;
      case 'ArrowRight':
        handleArrayRight(index);
        break;
      case 'Backspace':
        handleBackspace(index);
        break;
      case 'Enter':
        onEnter?.();
        break;
      default:
        break;
    }
  };

  return (
    <StyleVerificationInputWrapper>
      {Array.from({ length: step }, (_, i) => (
        <StyleVerificationInputBox
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          autoFocus={autofocus && i === 0}
          value={inputValue[i]}
          readOnly={disabled}
          disabled={disabled}
          maxLength={2}
          onPaste={(e) => {
            e.preventDefault();
            handlePaste(e, i);
          }}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onInput={(e) => {
            e.preventDefault();
            handleChange(e.currentTarget.value, i);
          }}
        />
      ))}
    </StyleVerificationInputWrapper>
  );
};
