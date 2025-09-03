export const numberRange = {
  // 验证消息
  validation: {
    minRangeStart: {
      enUS: 'The start value of the first range cannot be less than {min}',
      zhCN: '第一个区间的起始值不能小于{min}',
    },
    maxRangeEnd: {
      enUS: 'The end value of the last range cannot be greater than {max}',
      zhCN: '最后一个区间的结束值不能大于{max}',
    },
    startGreaterThanEnd: {
      enUS: 'Start value cannot be greater than end value',
      zhCN: '起始值不能大于结束值',
    },
    rangeNotContinuous: {
      enUS: 'Ranges are not continuous',
      zhCN: '区间不连续',
    },
    rangeRequired: {
      enUS: 'Please complete the range',
      zhCN: '请补全区间',
    },
  },

  // UI文案
  ui: {
    delete: {
      enUS: 'Delete',
      zhCN: '删除',
    },
    addRange: {
      enUS: 'Add Range',
      zhCN: '添加区间',
    },
  },
};
