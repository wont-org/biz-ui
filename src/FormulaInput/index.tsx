import { Input, InputNumber, message, Select, SelectProps, Space } from 'antd';
import { omit } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { BRACKETS, DECIMAL_PLACES, FORMULA, OP_LIST } from './constant';
import { StyledFormulaInput } from './styled';
import { FormulaInputProps, ValueItem } from './type';
import { validator } from './utils';

const defaultValue = {
  formula: [],
  name: '',
  precision: 0,
};
const FormulaInput = (props: FormulaInputProps) => {
  const {
    maxItem = 5,
    minItem = 1,
    value,
    nameInputProps = {},
    valueSelectProps = {},
    typeSelectProps = {},
    precisionSelectProps = {
      options: Object.values(DECIMAL_PLACES),
    },
    onChange,
    inputNumberProps = {},
    useValue = true,
  } = props;
  const { useName = true } = nameInputProps;
  const [showValidation, setShowValidation] = useState(false);
  const [cursorIndex, setCursorIndex] = useState<undefined | number>(undefined);
  const [valueOptions, setValueOptions] = useState<Record<number, SelectProps['options']>>([]);
  const [optionsLoading, setOptionsLoading] = useState<Record<number, boolean>>({});
  const formulaInputRef = useRef<HTMLInputElement>(null);

  const formulaValue = value?.formula || defaultValue.formula;
  const formulaName = value?.name || defaultValue.name;
  const formulaPrecision = value?.precision ?? defaultValue.precision;

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
    // 如果value未定义或formula为空且需要默认项，则通知外部
    if ((!value?.formula || value?.formula.length === 0) && minItem >= 1 && onChange) {
      onChange({
        formula: [{ value: undefined, valueType: FORMULA.text.valueType }],
        name: formulaName,
        precision: formulaPrecision,
      });
      setShowValidation(false);
    }
  }, [value, minItem, onChange, formulaName, formulaPrecision, valueOptions]);

  // 初始化时预加载所有类型的选项
  useEffect(() => {
    // 收集所有不同的类型
    const typeSet = new Set<string | number | null>();
    formulaValue.forEach((item) => {
      if (typeof item === 'object' && item.type) {
        typeSet.add(item.type);
      }
    });

    // 为每种类型加载选项
    const loadOptions = async () => {
      // 保存当前选中项目的索引和类型，用于更新状态
      const currentItemIndex = formulaValue.findIndex(
        (item) =>
          typeof item === 'object' && item.valueType === FORMULA.text.valueType && item.value,
      );

      if (currentItemIndex >= 0) {
        const currentItem = formulaValue[currentItemIndex] as ValueItem;
        // 为当前选中项加载选项
        await getValueOptions(currentItemIndex, currentItem.type);
      }

      // 为所有其他类型预加载选项
      Array.from(typeSet).forEach(async (type) => {
        const typeIndex = formulaValue.findIndex(
          (item) => typeof item === 'object' && item.type === type,
        );
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
    setCursorIndex(formulaValue.length);
    formulaInputRef.current?.focus();
  };

  const handleInput = (data: string) => {
    if (!data || typeof onChange !== 'function') {
      return;
    }
    if (typeof cursorIndex !== 'number') {
      return;
    }
    if (!allowInputs.includes(data)) {
      message.error(`只能输入${OP_LIST.map((op) => `"${op}"`).join('，')} 以及 英文括号`);
      return;
    }

    const itemLength = formulaValue.filter((i) => typeof i === 'object').length;
    if (itemLength >= maxItem && OP_LIST.includes(data)) {
      message.error(`最多输入${maxItem}个公式`);
      return;
    }

    // 当光标不在最后时，在当前位置插入
    if (cursorIndex !== formulaValue.length) {
      const newFormula = [...formulaValue];
      const insertArr: NonNullable<FormulaInputProps['value']>['formula'] = [data].filter(Boolean);
      if (OP_LIST.includes(data)) {
        insertArr.push({ value: undefined, valueType: FORMULA.text.valueType });
      }
      newFormula.splice(cursorIndex, 0, ...insertArr);
      onChange({
        formula: newFormula,
        name: formulaName,
        precision: formulaPrecision,
      });
      setShowValidation(true);
      setCursorIndex(cursorIndex + insertArr.length);
      return;
    }

    if (BRACKETS.includes(data)) {
      const newFormula = [...formulaValue];
      newFormula.splice(cursorIndex, 0, data);
      onChange({
        formula: newFormula,
        name: formulaName,
        precision: formulaPrecision,
      });
      setShowValidation(true);
      setCursorIndex(cursorIndex + 1);
      return;
    }
    onChange({
      formula: [...formulaValue, data, { value: undefined, valueType: FORMULA.text.valueType }],
      name: formulaName,
      precision: formulaPrecision,
    });
    setShowValidation(true);
    setCursorIndex(cursorIndex + 2);
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
    if (cursorIndex < formulaValue.length) {
      setCursorIndex(cursorIndex + 1);
    }
  };

  const backspace = () => {
    if (typeof cursorIndex !== 'number' || !onChange) {
      return;
    }
    if (cursorIndex > 0) {
      if (
        formulaValue.filter((e) => typeof e === 'object').length <= minItem &&
        typeof formulaValue[cursorIndex - 1] === 'object'
      ) {
        message.error(`至少保留${minItem}个公式`);
        return;
      }
      const newFormula = [...formulaValue];
      newFormula.splice(cursorIndex - 1, 1);
      onChange({
        formula: newFormula,
        name: formulaName,
        precision: formulaPrecision,
      });
      setShowValidation(true);
      setCursorIndex(cursorIndex - 1);
    }
  };

  const updateName = (name: string) => {
    if (onChange) {
      onChange({
        formula: formulaValue,
        name,
        precision: formulaPrecision,
      });
      setShowValidation(true);
    }
  };

  const updatePrecision = (precision: number) => {
    if (onChange) {
      onChange({
        formula: formulaValue,
        name: formulaName,
        precision,
      });
      setShowValidation(true);
    }
  };

  // 使用validator的结果来确定验证状态
  const _showValidation =
    showValidation && validator(value, { ...props, useValue }).validateStatus === 'error';

  const renderValue = (item: ValueItem, index: number) => {
    if (useValue && item.valueType === FORMULA.text.valueType) {
      return (
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

            const newFormula = [...formulaValue];
            newFormula[index] = {
              ...item,
              ...omit(option, ['value', 'label']),
              value: _value,
            };
            onChange({
              formula: newFormula,
              name: formulaName,
              precision: formulaPrecision,
            });
            setShowValidation(true);
          }}
          onFocus={() => {
            getValueOptions(index, item.type);
          }}
        />
      );
    }
    if (item.valueType === FORMULA.number.valueType) {
      return (
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

            const newFormula = [...formulaValue];
            newFormula[index] = {
              ...item,
              value: _value,
            };
            onChange({
              formula: newFormula,
              name: formulaName,
              precision: formulaPrecision,
            });
            setShowValidation(true);
          }}
        />
      );
    }
    return null;
  };

  return (
    <StyledFormulaInput $validateStatus={_showValidation}>
      <Space className="space-reset">
        {useName && (
          <Input
            placeholder="请输入"
            allowClear
            showCount={typeof nameInputProps.maxLength === 'number' ? true : false}
            {...omit(nameInputProps, ['validator', 'useName'])}
            value={formulaName}
            onChange={(e) => updateName(e.target.value)}
          />
        )}
        <Select
          style={{ width: 110 }}
          placeholder="请选择"
          {...precisionSelectProps}
          value={formulaPrecision}
          onChange={(_value) => updatePrecision(_value as number)}
        />
      </Space>
      <div className="showBox" onClick={focusInput}>
        {formulaValue.map((item, index) => (
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
                      const newFormula = [...formulaValue];
                      newFormula[index] = {
                        ...item,
                        ...omit(option, ['value', 'label']),
                        type: val,
                        value: val !== FORMULA.number.valueType ? undefined : item.value,
                      };
                      onChange({
                        formula: newFormula,
                        name: formulaName,
                        precision: formulaPrecision,
                      });
                      setShowValidation(true);

                      // 加载对应类型的选项
                      getValueOptions(index, val);
                    }}
                  />
                </div>
                <>
                  {useValue ||
                    (item.valueType === FORMULA.number.valueType && <div className="tag">.</div>)}
                  {((useValue && item.valueType === FORMULA.text.valueType) ||
                    item.valueType === FORMULA.number.valueType) && (
                    <div className="tag">
                      <div className="out">{renderValue(item, index)}</div>
                    </div>
                  )}
                </>
              </div>
            ) : (
              <div className="symbol">{item}</div>
            )}
          </div>
        ))}
        <div className="showBox__Item">
          <div className={`blank ${cursorIndex === formulaValue.length ? 'ing' : ''}`} />
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
    </StyledFormulaInput>
  );
};

export default FormulaInput;
export type { FormulaInputProps };
