import { InputNumber, InputNumberProps, message, Select, SelectProps } from 'antd';
import { isEqual, omit } from 'lodash';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ValueOfConst } from '../utils/types';
import { BRACKETS, FORMULA, OP_LIST } from './constant';
import './index.less';

export const validator = (rule: any, val: FormulaInputProps['value']) => {
  const last = val?.[val.length - 1];
  if (typeof last === 'string' && OP_LIST.includes(last)) {
    return Promise.reject('公式末尾不能为运算符');
  }
  if (val?.some((e) => typeof e === 'object' && !e.value)) {
    return Promise.reject('公式每项不能为空');
  }
  return Promise.resolve('');
};
interface ValueItem extends Record<string, any> {
  value?: string | number | null;
  valueType: ValueOfConst<typeof FORMULA, 'valueType'>;
  type?: string | number | null;
}
export interface FormulaInputProps {
  value?: (ValueItem | string)[];
  onChange?: (val: FormulaInputProps['value']) => void;
  typeSelectProps?: SelectProps;
  valueSelectProps?: SelectProps;
  inputNumberProps?: InputNumberProps;
  // fieldNames?: {
  //   value?: string;
  //   valueType?: ValueItem['valueType'];
  //   type?: string;
  // };
}
const FormulaInput = (props: FormulaInputProps) => {
  const {
    value = [],
    valueSelectProps = {},
    typeSelectProps = {},
    onChange,
    inputNumberProps = {},
    // fieldNames = {
    //   value: 'value',
    //   valueType: 'valueType',
    //   type: 'type',
    // },
  } = props;
  const { options: valueOptions = [], ...restValueSelectProps } = valueSelectProps;
  const { options: typeOptions = Object.values(FORMULA), ...restTypeSelectProps } = typeSelectProps;
  // console.log('props :>> ', props);
  const [divValue, setDivValue] = useState<Required<FormulaInputProps>['value']>([
    { value: undefined, valueType: FORMULA.text.valueType },
  ]);
  const [cursorIndex, setCursorIndex] = useState<undefined | number>(undefined);
  const formulaInputRef = useRef<HTMLInputElement>(null);
  const afterFirstLoadRef = useRef(false);

  useEffect(() => {
    if (!value || value.length === 0) {
      setDivValue([{ value: undefined, valueType: 'text' }]);
      return;
    }
    if (afterFirstLoadRef.current) {
      return;
    }
    setDivValue(
      value.map((e) => {
        if (typeof e === 'object') {
          return {
            valueType: e.valueType || FORMULA.text.valueType,
            value: e.value,
          };
        }
        return e;
      }),
    );
    afterFirstLoadRef.current = true;
  }, [value]);

  useEffect(() => {
    if (isEqual(value, divValue)) {
      return;
    }
    onChange?.(divValue);
  }, [value, divValue, onChange]);

  const allowInputs = [...OP_LIST, ...BRACKETS];

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
      message.warning(`只能输入${OP_LIST.map((op) => `"${op}"`).join('，')} 以及 英文括号`);
      return;
    }
    if (BRACKETS.includes(data)) {
      const newValue = [...divValue];
      newValue.splice(cursorIndex, 0, data);
      setDivValue(newValue);
      setCursorIndex(cursorIndex + 1);
    } else {
      setDivValue((preDivValue) => {
        return [...preDivValue, data, { value: undefined, valueType: 'text' }];
      });
      setCursorIndex(cursorIndex + 2);
    }
    e.target.value = '';
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
                    placeholder="类型"
                    style={{
                      width: 100,
                    }}
                    {...restTypeSelectProps}
                    options={typeOptions}
                    value={item.type}
                    onChange={(val, option) => {
                      setDivValue((pre) => {
                        return pre.map((i, idx) => {
                          if (index === idx && typeof i === 'object') {
                            return {
                              ...i,
                              ...omit(option, ['value', 'label']),
                              type: val,
                              // value: undefined,
                            };
                          }
                          return i;
                        });
                      });
                    }}
                  />
                </div>
                <div>.</div>
                <div className="tag">
                  <div className="out">
                    {item.valueType === FORMULA.text.valueType && (
                      <Select
                        style={{
                          width: 140,
                        }}
                        placeholder="请选择"
                        showSearch
                        {...restValueSelectProps}
                        options={valueOptions}
                        value={item.value}
                        onChange={(_value, option) => {
                          setDivValue((pre) => {
                            return pre.map((i, idx) => {
                              if (index === idx && typeof i === 'object') {
                                return {
                                  ...i,
                                  ...omit(option, ['value', 'label']),
                                  value: _value,
                                };
                              }
                              return i;
                            });
                          });
                        }}
                      />
                    )}
                    {item.valueType === FORMULA.number.valueType && (
                      <InputNumber
                        precision={4}
                        min={0}
                        placeholder="请输入数字"
                        style={{
                          width: 140,
                        }}
                        {...inputNumberProps}
                        value={item.value}
                        onChange={(_value) => {
                          setDivValue((pre) => {
                            return pre.map((i, idx) => {
                              if (index === idx && typeof i === 'object') {
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
          if (e.key === 'Backspace') {
            backspace();
          }
          if (e.key === 'ArrowLeft') {
            cursorLeft();
          }
          if (e.key === 'ArrowRight') {
            cursorRight();
          }
        }}
      />
    </div>
  );
};

export default FormulaInput;
