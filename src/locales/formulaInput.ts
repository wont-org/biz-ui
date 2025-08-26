export const formulaInput = {
  // 常量类型
  formula: {
    object: {
      enUS: 'Object',
      zhCN: '对象',
    },
    constant: {
      enUS: 'Constant',
      zhCN: '常数',
    },
  },

  // 小数位数
  decimalPlaces: {
    integer: {
      enUS: 'Integer',
      zhCN: '整数',
    },
    four: {
      enUS: '4 Decimal Places',
      zhCN: '四位小数',
    },
    percent: {
      enUS: 'Percentage',
      zhCN: '百分数',
    },
  },

  // UI文案
  ui: {
    // 占位符
    selectPlaceholder: {
      enUS: 'Please select',
      zhCN: '请选择',
    },
    inputPlaceholder: {
      enUS: 'Please input',
      zhCN: '请输入',
    },
    inputNumberPlaceholder: {
      enUS: 'Please enter a number',
      zhCN: '请输入数字',
    },
    typePlaceholder: {
      enUS: 'Type',
      zhCN: '类型',
    },

    // 按钮文案
    submit: {
      enUS: 'Submit',
      zhCN: '提交',
    },
    reset: {
      enUS: 'Reset',
      zhCN: '重置',
    },
  },

  // 验证消息
  validation: {
    nameRequired: {
      enUS: 'Name cannot be empty',
      zhCN: '名称不能为空',
    },
    formulaRequired: {
      enUS: 'Formula cannot be empty',
      zhCN: '公式不能为空',
    },
    invalidCharacters: {
      enUS: 'Only {operators} and English parentheses are allowed',
      zhCN: '只能输入{operators} 以及 英文括号',
    },
    cannotStartWithOperator: {
      enUS: 'Formula cannot start with an operator',
      zhCN: '公式不能以运算符开头',
    },
    cannotEndWithOperator: {
      enUS: 'Formula cannot end with an operator',
      zhCN: '公式末尾不能为运算符',
    },
    consecutiveOperators: {
      enUS: 'Operators cannot be consecutive',
      zhCN: '运算符不能连续',
    },
    maxItemsExceeded: {
      enUS: 'Maximum {maxItem} formulas allowed',
      zhCN: '最多输入{maxItem}个公式',
    },
    minItemsRequired: {
      enUS: 'At least {minItem} formulas required',
      zhCN: '至少保留{minItem}个公式',
    },
    bracketMismatch: {
      enUS: 'Brackets must be paired and properly nested',
      zhCN: '括号必须成对出现且正确嵌套',
    },
    operatorPosition: {
      enUS: 'Operators must be between operands or brackets',
      zhCN: '运算符前必须是操作数或右括号',
    },
    missingOperator: {
      enUS: 'Operators must be between operands',
      zhCN: '操作数之间必须有运算符',
    },
    emptyExpression: {
      enUS: 'Formula must contain at least one operand',
      zhCN: '公式必须包含至少一个操作数',
    },
    emptyOperand: {
      enUS: 'Each formula item cannot be empty',
      zhCN: '公式每项不能为空',
    },
    bracketContent: {
      enUS: 'Brackets must contain valid sub-expressions',
      zhCN: '括号内必须包含合法子表达式',
    },
    operatorAfterLeftBracket: {
      enUS: 'Left bracket cannot be directly followed by an operator',
      zhCN: '左括号后不能直接跟运算符',
    },
    operatorBeforeRightBracket: {
      enUS: 'Operators cannot be directly followed by right bracket',
      zhCN: '运算符后不能直接跟右括号',
    },
    bracketBeforeOperand: {
      enUS: 'Right bracket must be preceded by operand or right bracket',
      zhCN: '右括号前必须是操作数或右括号',
    },
  },
};
