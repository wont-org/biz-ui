import { InputNumber, message, Select, SelectProps } from 'antd';
import isEqual from 'lodash/isEqual';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ValueOfConst } from '../utils/types';
import { FORMULA } from './constant';
import './index.less';

interface ValueItem {
  value?: string | number | null;
  type: ValueOfConst<typeof FORMULA, 'value'>;
}
export interface FormulaInputProps {
  value?: (ValueItem | any)[];
  onChange?: (val: FormulaInputProps['value']) => void;
  options: SelectProps['options'];
}

export const validator = (rule, val: FormulaInputProps['value']) => {
  // console.log('val :>> ', val);
  if (val?.some((e) => typeof e === 'object' && !e.value)) {
    return Promise.reject('公式每项不能为空');
  }
  return Promise.resolve('');
};
const FormulaInput = (props: FormulaInputProps) => {
  const { value = [], options = [], onChange } = props;
  // console.log('props :>> ', props);
  const [divValue, setDivValue] = useState<Required<FormulaInputProps>['value']>([
    { value: undefined, type: FORMULA.text.value },
  ]);
  const [cursorIndex, setCursorIndex] = useState<undefined | number>(undefined);
  const formulaInputRef = useRef<HTMLInputElement>(null);
  const afterFirstLoadRef = useRef(false);

  useEffect(() => {
    if (!value || value.length === 0) {
      setDivValue([{ value: undefined, type: 'text' }]);
      return;
    }
    if (afterFirstLoadRef.current) {
      return;
    }
    setDivValue(
      value.map((e) => {
        if (typeof e === 'object') {
          return {
            type: e.type || 'text',
            value: e.value,
          };
        }
        return e;
      }),
    );
    afterFirstLoadRef.current = true;
  }, [value]);

  useEffect(() => {
    // console.log('divValue :>> ', divValue);
    if (isEqual(value, divValue)) {
      return;
    }
    onChange?.(divValue);
  }, [value, divValue, onChange]);

  const allowInputs = ['+', '-', '*', '/', '(', ')'];

  const focusInput = () => {
    setCursorIndex(divValue.length);
    formulaInputRef.current?.focus();
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    if (!data) {
      return;
    }
    if (typeof cursorIndex !== 'number') {
      return;
    }
    if (!allowInputs.includes(data)) {
      message.warning('只能输入“+”，“-”，“*”，“/” 以及 英文括号');
      return;
    }
    if (['(', ')'].includes(data)) {
      const newValue = [...divValue];
      newValue.splice(cursorIndex, 0, data);
      setDivValue(newValue);
      setCursorIndex(cursorIndex + 1);
    } else {
      setDivValue((preDivValue) => {
        return [...preDivValue, data, { value: undefined, type: 'text' }];
      });
      setCursorIndex(cursorIndex + 2);
    }
    // update();
  };

  const setCursorPosition = (index: number) => {
    formulaInputRef.current?.focus();
    setCursorIndex(index);
  };

  const cursorLeft = () => {
    if (typeof cursorIndex !== 'number') {
      return;
    }
    if (cursorIndex > 0) {
      setCursorIndex(cursorIndex - 1);
    }
  };

  const cursorRight = () => {
    if (typeof cursorIndex !== 'number') {
      return;
    }
    if (cursorIndex < divValue.length) {
      setCursorIndex(cursorIndex + 1);
    }
  };

  const backspace = () => {
    if (typeof cursorIndex !== 'number') {
      return;
    }
    if (cursorIndex > 0) {
      if (
        divValue.filter((e) => typeof e === 'object').length <= 1 &&
        typeof divValue[cursorIndex - 1] === 'object'
      ) {
        message.warning('至少保留一个公式');
        return;
      }
      const newValue = [...divValue];
      newValue.splice(cursorIndex - 1, 1);
      setDivValue(newValue);
      setCursorIndex(cursorIndex - 1);
    }
  };

  return (
    <div className="formulaInputComponent">
      <div className="showBox" onClick={focusInput}>
        {divValue.map((item, index) => (
          <div key={index} className="showBox__Item" onClick={(e) => e.stopPropagation()}>
            <div
              className={`blank ${cursorIndex === index ? 'ing' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCursorPosition(index);
              }}
            />
            {typeof item === 'object' ? (
              <div className="tagGroup">
                <div className="tag type">
                  <Select
                    value={item.type}
                    options={Object.values(FORMULA)}
                    onChange={(val) => {
                      setDivValue((pre) => {
                        return pre.map((i, idx) => {
                          if (index === idx) {
                            return {
                              ...i,
                              type: val,
                              value: undefined,
                            };
                          }
                          return i;
                        });
                      });
                    }}
                    placeholder="类型"
                  />
                </div>
                <div>.</div>
                <div className="tag">
                  <div className="out">
                    {item.type === FORMULA.text.value && (
                      <Select
                        style={{
                          width: 140,
                        }}
                        value={item.value}
                        onChange={(_value) => {
                          setDivValue((pre) => {
                            return pre.map((i, idx) => {
                              if (index === idx) {
                                return {
                                  ...i,
                                  value: _value,
                                };
                              }
                              return i;
                            });
                          });
                        }}
                        options={options}
                        placeholder="请选择"
                        showSearch
                      />
                    )}
                    {item.type === FORMULA.number.value && (
                      <InputNumber
                        value={item.value}
                        precision={4}
                        min={0}
                        placeholder="请输入数字"
                        style={{
                          width: 140,
                        }}
                        onChange={(_value) => {
                          setDivValue((pre) => {
                            return pre.map((i, idx) => {
                              if (index === idx) {
                                return {
                                  ...i,
                                  value: _value,
                                };
                              }
                              return i;
                            });
                          });
                        }}
                        onBlur={() => onChange?.(divValue)}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="symbol">{item}</div>
            )}
          </div>
        ))}
        <div className="showBox__Item">
          <div className={`blank ${cursorIndex === divValue.length ? 'ing' : ''}`} />
        </div>
      </div>

      <input
        ref={formulaInputRef}
        className="hiddenInput"
        onInput={handleInput}
        onBlur={() => setCursorIndex(undefined)}
        onKeyUp={(e) => {
          if (e.key === 'ArrowLeft') {
            cursorLeft();
          }
          if (e.key === 'ArrowRight') {
            cursorRight();
          }
          if (e.key === 'Backspace') {
            backspace();
          }
        }}
      />
    </div>
  );
};

export default FormulaInput;
