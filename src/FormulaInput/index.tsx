import { InputNumber, InputNumberProps, message, Select, SelectProps } from 'antd';
import { omit } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { isInvalidValue } from '../utils/commom';
import { ValueOfConst } from '../utils/types';
import { BRACKETS, FORMULA, OP_LIST } from './constant';
import './index.less';

export const validator = (val: FormulaInputProps['value']) => {
  if (!val || val.length === 0) {
    return {
      validateStatus: 'error',
      message: '公式不能为空',
    };
  }

  // 步骤1: 检查基本语法规则

  // 检查表达式是否以运算符开头
  const first = val[0];
  if (typeof first === 'string' && OP_LIST.includes(first)) {
    return {
      validateStatus: 'error',
      message: '公式不能以运算符开头',
    };
  }

  // 检查表达式是否以运算符结尾
  const last = val?.[val.length - 1];
  if (typeof last === 'string' && OP_LIST.includes(last)) {
    return {
      validateStatus: 'error',
      message: '公式末尾不能为运算符',
    };
  }

  // 检查括号是否成对出现且正确嵌套
  const bracketStack: string[] = [];
  for (const item of val) {
    if (typeof item === 'string') {
      if (item === '(') {
        bracketStack.push(item);
      } else if (item === ')') {
        if (bracketStack.length === 0 || bracketStack.pop() !== '(') {
          return {
            validateStatus: 'error',
            message: '括号必须成对出现且正确嵌套',
          };
        }
      }
    }
  }

  if (bracketStack.length > 0) {
    return {
      validateStatus: 'error',
      message: '括号必须成对出现且正确嵌套',
    };
  }

  // 步骤2: 检查运算符与操作数、括号的位置关系
  let hasOperandOrCloseBracket = false; // 跟踪前一个元素是否为操作数或右括号
  let hasOperandOrBracket = false; // 跟踪是否至少有一个操作数或括号

  for (let i = 0; i < val.length; i++) {
    const current = val[i];
    const next = i < val.length - 1 ? val[i + 1] : null;

    // 检查运算符是否位于两个操作数之间
    if (typeof current === 'string' && OP_LIST.includes(current)) {
      if (!hasOperandOrCloseBracket) {
        return {
          validateStatus: 'error',
          message: '运算符前必须是操作数或右括号',
        };
      }

      if (!next || (typeof next === 'string' && OP_LIST.includes(next))) {
        return {
          validateStatus: 'error',
          message: '运算符不能连续',
        };
      }

      if (next === ')') {
        return {
          validateStatus: 'error',
          message: '运算符后不能直接跟右括号',
        };
      }

      hasOperandOrCloseBracket = false;
    }
    // 检查左括号位置规则
    else if (current === '(') {
      if (next === ')') {
        return {
          validateStatus: 'error',
          message: '括号内必须包含合法子表达式',
        };
      }

      if (next && typeof next === 'string' && OP_LIST.includes(next)) {
        return {
          validateStatus: 'error',
          message: '左括号后不能直接跟运算符',
        };
      }

      hasOperandOrCloseBracket = false;
    }
    // 检查右括号位置规则
    else if (current === ')') {
      if (!hasOperandOrCloseBracket) {
        return {
          validateStatus: 'error',
          message: '右括号前必须是操作数或右括号',
        };
      }

      hasOperandOrCloseBracket = true;
    }
    // 操作数
    else if (typeof current === 'object' && next && typeof next === 'object') {
      // 检查连续的操作数之间是否缺少运算符
      return {
        validateStatus: 'error',
        message: '操作数之间必须有运算符',
      };
    } else {
      hasOperandOrCloseBracket = true;
      hasOperandOrBracket = true;
    }
  }

  // 检查表达式中是否至少有一个操作数
  if (!hasOperandOrBracket) {
    return {
      validateStatus: 'error',
      message: '公式必须包含至少一个操作数',
    };
  }

  // 步骤3: 检查操作数为空值
  if (
    val?.some((e) => typeof e === 'object' && (isInvalidValue(e.value) || isInvalidValue(e.type)))
  ) {
    return {
      validateStatus: 'error',
      message: '公式每项不能为空',
    };
  }

  return {
    validateStatus: undefined,
    message: undefined,
  };
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
  valueSelectProps?:
    | SelectProps
    | ((type?: string | number | null) => SelectProps | Promise<SelectProps>);
  inputNumberProps?: InputNumberProps;
  maxItem?: number;
  minItem?: number;
  // fieldNames?: {
  //   value?: string;
  //   valueType?: ValueItem['valueType'];
  //   type?: string;
  // };
}
const FormulaInput = (props: FormulaInputProps) => {
  const {
    maxItem = 5,
    minItem = 1,
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
  const [cursorIndex, setCursorIndex] = useState<undefined | number>(undefined);
  const [valueOptions, setValueOptions] = useState<Record<number, SelectProps['options']>>({});
  const [optionsLoading, setOptionsLoading] = useState<Record<number, boolean>>({});
  const formulaInputRef = useRef<HTMLInputElement>(null);

  // 获取指定类型对应的valueOptions
  const getValueOptions = async (index: number, type?: string | number | null) => {
    if (typeof valueSelectProps === 'function') {
      try {
        setOptionsLoading((prev) => ({ ...prev, [index]: true }));
        const result = await valueSelectProps(type);

        // 更新特定索引的选项
        setValueOptions((prevOptions) => {
          // 创建一个新的对象来存储所有索引的选项
          const newOptionsMap = { ...prevOptions };
          // 为特定索引设置选项
          newOptionsMap[index] = result.options || [];
          return newOptionsMap;
        });

        setOptionsLoading((prev) => ({ ...prev, [index]: false }));
      } catch (error) {
        console.error('获取选项失败', error);
        setOptionsLoading((prev) => ({ ...prev, [index]: false }));
      }
    } else {
      // 对于非函数类型的valueSelectProps，直接设置所有索引的选项
      setValueOptions((prevOptions) => {
        const newOptionsMap = { ...prevOptions };
        newOptionsMap[index] = valueSelectProps.options || [];
        return newOptionsMap;
      });
    }
  };

  // 处理初始值和空值情况
  useEffect(() => {
    // 如果value为空且需要默认项，则通知外部
    if ((!value || value.length === 0) && minItem >= 1 && onChange) {
      onChange([{ value: undefined, valueType: FORMULA.text.valueType }]);
    }
  }, [value, minItem, onChange]);

  // 初始化时预加载所有类型的选项
  useEffect(() => {
    // 收集所有不同的类型
    const typeSet = new Set<string | number | null>();
    value.forEach((item) => {
      if (typeof item === 'object' && item.type) {
        typeSet.add(item.type);
      }
    });

    // 为每种类型加载选项
    const loadOptions = async () => {
      // 保存当前选中项目的索引和类型，用于更新状态
      const currentItemIndex = value.findIndex(
        (item) =>
          typeof item === 'object' && item.valueType === FORMULA.text.valueType && item.value,
      );

      if (currentItemIndex >= 0) {
        const currentItem = value[currentItemIndex] as ValueItem;
        // 为当前选中项加载选项
        await getValueOptions(currentItemIndex, currentItem.type);
      }

      // 为所有其他类型预加载选项
      Array.from(typeSet).forEach(async (type) => {
        const typeIndex = value.findIndex((item) => typeof item === 'object' && item.type === type);
        if (typeIndex >= 0 && typeIndex !== currentItemIndex) {
          await getValueOptions(typeIndex, type);
        }
      });
    };

    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 仅在组件挂载时执行一次

  const { options: typeOptions = Object.values(FORMULA), ...restTypeSelectProps } = typeSelectProps;
  const restValueSelectProps =
    typeof valueSelectProps === 'function' ? {} : omit(valueSelectProps, ['options']);

  const allowInputs = [...OP_LIST, ...BRACKETS];

  const focusInput = () => {
    setCursorIndex(value.length);
    formulaInputRef.current?.focus();
  };

  const handleInput = (data: string) => {
    if (!data || !onChange) {
      return;
    }
    if (typeof cursorIndex !== 'number') {
      return;
    }
    if (!allowInputs.includes(data)) {
      message.error(`只能输入${OP_LIST.map((op) => `"${op}"`).join('，')} 以及 英文括号`);
      return;
    }

    const itemLength = value.filter((i) => typeof i === 'object').length;
    if (itemLength >= maxItem) {
      message.error(`最多输入${maxItem}个公式`);
      return;
    }

    // 当光标不在最后时，在当前位置插入字符
    if (cursorIndex !== value.length) {
      const newValue = [...value];
      newValue.splice(cursorIndex, 0, data);
      onChange(newValue);
      setCursorIndex(cursorIndex + 1);
      return;
    }

    if (BRACKETS.includes(data)) {
      const newValue = [...value];
      newValue.splice(cursorIndex, 0, data);
      onChange(newValue);
      setCursorIndex(cursorIndex + 1);
    } else {
      onChange([...value, data, { value: undefined, valueType: FORMULA.text.valueType }]);
      setCursorIndex(cursorIndex + 2);
    }
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
    if (cursorIndex < value.length) {
      setCursorIndex(cursorIndex + 1);
    }
  };

  const backspace = () => {
    if (typeof cursorIndex !== 'number' || !onChange) {
      return;
    }
    if (cursorIndex > 0) {
      if (
        value.filter((e) => typeof e === 'object').length <= minItem &&
        typeof value[cursorIndex - 1] === 'object'
      ) {
        message.error(`至少保留${minItem}个公式`);
        return;
      }
      const newValue = [...value];
      newValue.splice(cursorIndex - 1, 1);
      onChange(newValue);
      setCursorIndex(cursorIndex - 1);
    }
  };

  return (
    <div className="formulaInputComponent">
      <div className="showBox" onClick={focusInput}>
        {value.map((item, index) => (
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
                      width: 140,
                    }}
                    allowClear
                    {...restTypeSelectProps}
                    options={typeOptions}
                    value={item.type}
                    onChange={(val, option) => {
                      if (!onChange) {
                        return;
                      }

                      // 处理类型变更
                      const newValue = [...value];
                      newValue[index] = {
                        ...item,
                        ...omit(option, ['value', 'label']),
                        type: val,
                        value: val !== FORMULA.number.valueType ? undefined : item.value,
                      };
                      onChange(newValue);

                      // 加载对应类型的选项
                      getValueOptions(index, val);
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
                        allowClear
                        showSearch
                        {...restValueSelectProps}
                        loading={optionsLoading[index]}
                        options={valueOptions[index] || []}
                        value={item.value}
                        onChange={(_value, option) => {
                          if (!onChange) {
                            return;
                          }

                          const newValue = [...value];
                          newValue[index] = {
                            ...item,
                            ...omit(option, ['value', 'label']),
                            value: _value,
                          };
                          onChange(newValue);
                        }}
                        onFocus={() => {
                          getValueOptions(index, item.type);
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
                          if (!onChange) {
                            return;
                          }

                          const newValue = [...value];
                          newValue[index] = {
                            ...item,
                            value: _value,
                          };
                          onChange(newValue);
                        }}
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
          <div className={`blank ${cursorIndex === value.length ? 'ing' : ''}`} />
        </div>
      </div>

      <input
        ref={formulaInputRef}
        className="hiddenInput"
        onBlur={() => setCursorIndex(undefined)}
        onKeyUp={(e) => {
          if (e.key === 'Backspace') {
            backspace();
            return;
          }
          if (e.key === 'ArrowLeft') {
            cursorLeft();
            return;
          }
          if (e.key === 'ArrowRight') {
            cursorRight();
            return;
          }
          if (allowInputs.includes(e.key)) {
            handleInput(e.key);
            return;
          }
        }}
      />
    </div>
  );
};

export default FormulaInput;
