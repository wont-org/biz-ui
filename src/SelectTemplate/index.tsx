import { DownOutlined } from '@ant-design/icons';
import { isEqual } from 'lodash';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { StyledIconWrapper, StyledSelectTemplate } from './styled';

// 修改TemplateOption接口以匹配constant.tsx中定义的选项结构
interface TemplateOption {
  value: readonly string[];
  label: ReactNode | readonly ReactNode[];
  isGrading?: boolean;
  extraLabel?: ReactNode;
}

interface SelectTemplateProps {
  /**
   * @description 是否显示选项标签，extraLabel字段设置，比如绿-白-红
   * @default true
   */
  showOptionLabel?: boolean;
  /**
   * @description 是否显示选中选项的标签，extraLabel字段设置，比如绿-白-红
   * @default true
   */
  showSelectedOptionLabel?: boolean;
  /**
   * @description 超出几个换行
   * @default 3
   */
  rowWrapCount?: number;
  /**
   * @description 占位符
   * @default 请选择
   */
  placeholder?: string;
  /**
   * @description 下拉选项
   * @default []
   */
  options?: readonly {
    label: string;
    options: readonly TemplateOption[];
  }[];
  /**
   * @description 大小
   * @default middle
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * @description 选中值
   */
  value?: TemplateOption;
  /**
   * @description 选中值变更
   */
  onChange?: (option: TemplateOption) => void;
  /**
   * @description 比较key
   * @default ['value']
   */
  compareKeys?: (keyof TemplateOption)[];
}

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
const SelectTemplate: React.FC<SelectTemplateProps> = ({
  value,
  onChange,
  rowWrapCount = 3,
  size = 'middle',
  showOptionLabel = true,
  showSelectedOptionLabel = true,
  placeholder = '请选择',
  options = [],
  compareKeys = ['value'],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TemplateOption | null>(null);

  // 获取所有选项的平铺数组，便于搜索
  const allOptions = options.flatMap((category) => category.options as unknown as TemplateOption[]);

  // 根据外部传入的value更新当前选中项
  useEffect(() => {
    if (value) {
      const option = allOptions.find((opt) =>
        equalWith({
          a: opt,
          b: value,
          compareKeys,
        }),
      );
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [value, allOptions, compareKeys]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: TemplateOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option);
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

  return (
    <StyledSelectTemplate ref={containerRef} $rowWrapCount={rowWrapCount} $size={getSize(size)}>
      <div className="template-selector-header" onClick={handleToggleDropdown}>
        {selectedOption ? (
          <div className="selected-template">
            {renderOptionLabel(selectedOption)}
            {showSelectedOptionLabel && <span>{selectedOption.extraLabel}</span>}
          </div>
        ) : (
          <div className="placeholder">{placeholder}</div>
        )}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>
          <DownOutlined />
        </span>
      </div>

      {isOpen && (
        <div className="template-dropdown">
          {options.map((category, categoryIndex) => (
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
        </div>
      )}
    </StyledSelectTemplate>
  );
};

export default SelectTemplate;
