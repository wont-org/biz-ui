import { CheckOutlined, DownOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { isEqual, pick } from 'lodash';
import React, {
  CSSProperties,
  FC,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getLinearGradientStyle } from '../DataBar/demo/utils';
import {
  StyledBarItem,
  StyledBarWrapper,
  StyledCustomOption,
  StyledIconWrapper,
  StyledSelectTemplate,
} from './styled';
import { SelectTemplateProps, TemplateOption } from './types';
import { findIconByValue, reverseIconTemplateOptions } from './utils';

const equalWith = ({
  a,
  b,
  compareKeys,
}: {
  a: TemplateOption;
  b?: TemplateOption;
  compareKeys: (keyof TemplateOption)[];
}) => {
  return compareKeys.every((key) => {
    const aValue = a[key];
    const bValue = b?.[key];
    if (typeof aValue === 'object' && typeof bValue === 'object') {
      return isEqual(aValue, bValue);
    }
    return aValue === bValue;
  });
};

const getSize = (size: SelectTemplateProps['size'] = 'middle') => {
  switch (size) {
    case 'small':
      return {
        height: '24px',
        fontSize: '14px',
        padding: '0 7px',
      };
    case 'middle':
      return {
        height: '32px',
        fontSize: '14px',
        padding: '0 11px',
      };
    case 'large':
      return {
        height: '40px',
        fontSize: '16px',
        padding: '0 11px',
      };
  }
};
const renderOptionLabel = (option: TemplateOption) => {
  if (!option.label) {
    return null;
  }
  if (typeof option.label === 'string') {
    return <img src={option.label} />;
  }
  if (Array.isArray(option.label) && option.label.length > 0) {
    return <StyledIconWrapper>{option.label}</StyledIconWrapper>;
  }
  return option.label;
};
const SelectTemplate: FC<SelectTemplateProps> = (props) => {
  const {
    value,
    onChange,
    rowWrapCount = 3,
    size = 'middle',
    showOptionLabel = true,
    showSelectedOptionLabel = true,
    placeholder = '请选择',
    options = [],
    compareKeys = ['value'],
    selectedTemplate,
    readOnly,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TemplateOption | null>(null);
  const [useCustomOption, setUseCustomOption] = useState<boolean>(false);

  const memoizedOptions = useMemo(() => {
    return value?.isReverse ? reverseIconTemplateOptions(options) : options;
  }, [options, value]);
  // 获取所有选项的平铺数组，便于搜索
  const allOptions = useMemo(() => {
    return memoizedOptions.flatMap((category) => category.options as unknown as TemplateOption[]);
  }, [memoizedOptions]);

  // 根据外部传入的value更新当前选中项
  useEffect(() => {
    if (!value) {
      return;
    }
    const presetOption = allOptions.find((opt) =>
      equalWith({
        a: opt,
        b: value,
        compareKeys,
      }),
    );
    const isCustom = !Boolean(presetOption);
    if (presetOption) {
      setSelectedOption(presetOption);
    } else if (isCustom) {
      setSelectedOption(value);
    }
    setUseCustomOption(isCustom);
  }, [value, allOptions, compareKeys]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: TemplateOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    const changedVal = pick(option, compareKeys);
    onChange?.({
      ...changedVal,
      isReverse: value?.isReverse,
    });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  // 点击外部区域关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const selectedTemplateRender = (_selectedTemplate: SelectTemplateProps['selectedTemplate']) => {
    if (isValidElement(_selectedTemplate)) {
      return _selectedTemplate;
    }
    if (Array.isArray(_selectedTemplate) && _selectedTemplate.length > 0) {
      return (
        <StyledBarWrapper>
          {_selectedTemplate.map((item, index) => {
            const style: CSSProperties = value?.isGrading
              ? getLinearGradientStyle({
                  colors: [item, '#fff'],
                  direction: index !== 0 ? 'to right' : 'to left',
                })
              : {
                  background: item,
                };
            return (
              <StyledBarItem $background={style.background} $border={style.border} key={index} />
            );
          })}
        </StyledBarWrapper>
      );
    }
    return null;
  };
  const selectedRender = (_selectedOption: TemplateOption) => {
    // 自定义渲染
    if (Array.isArray(selectedTemplate)) {
      return selectedTemplateRender(selectedTemplate);
    }
    // 内置渲染，不需要label
    if (!_selectedOption.label) {
      if (
        Object.prototype.hasOwnProperty.call(_selectedOption, 'isReverse') &&
        Array.isArray(_selectedOption.value)
      ) {
        const iconList = _selectedOption.value.map((item) =>
          findIconByValue(item, memoizedOptions),
        );
        return <StyledIconWrapper>{iconList}</StyledIconWrapper>;
      }
      if (useCustomOption) {
        return <span>自定义</span>;
      }
      return selectedTemplateRender(_selectedOption.value);
    }
    // render select options
    return (
      <>
        {renderOptionLabel(_selectedOption)}
        {showSelectedOptionLabel && <span>{_selectedOption.extraLabel}</span>}
      </>
    );
  };
  const renderCustomOption = () => {
    if (!useCustomOption) {
      return null;
    }
    return (
      <StyledCustomOption>
        <Typography.Link>自定义</Typography.Link>
        <Typography.Link>
          <CheckOutlined />
        </Typography.Link>
      </StyledCustomOption>
    );
  };
  if (readOnly && value) {
    return selectedRender(value);
  }
  if (readOnly && selectedTemplate) {
    return selectedTemplateRender(selectedTemplate);
  }

  return (
    <StyledSelectTemplate ref={containerRef} $rowWrapCount={rowWrapCount} $size={getSize(size)}>
      <div className="template-selector-header" onClick={handleToggleDropdown}>
        {selectedOption ? (
          <div className="selected-template">{selectedRender(selectedOption)}</div>
        ) : (
          <div className="placeholder">{placeholder}</div>
        )}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <DownOutlined />
        </span>
      </div>

      {isOpen && (
        <div className="template-dropdown">
          {memoizedOptions.map((category, categoryIndex) => (
            <div key={categoryIndex} className="template-category">
              <div className="category-label">{category.label}</div>
              <div className="options-grid">
                {(category.options as unknown as TemplateOption[]).map((option, optionIndex) => {
                  const optionExtraLabel = 'extraLabel' in option ? option.extraLabel : undefined;
                  return (
                    <div
                      key={optionIndex}
                      className={`template-option ${
                        equalWith({
                          a: option,
                          b: value,
                          compareKeys,
                        })
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleSelectOption(option as TemplateOption)}
                    >
                      {renderOptionLabel(option)}
                      {showOptionLabel && optionExtraLabel && (
                        <span className="option-label">{optionExtraLabel}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {renderCustomOption()}
        </div>
      )}
    </StyledSelectTemplate>
  );
};

export default SelectTemplate;
