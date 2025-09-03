export const customOperatorsDemoLang = {
  demo: {
    label: {
      enUS: 'Filter Conditions',
      zhCN: '筛选条件',
    },
    title: {
      enUS: 'Current Filter Conditions',
      zhCN: '当前筛选条件',
    },
    pageTitle: {
      enUS: 'Custom Operators Example',
      zhCN: '自定义操作符示例',
    },
    description: {
      enUS: 'This example demonstrates how to customize operator values to adapt to different backend API requirements. By passing in a custom operators object, you can change the actual values of operators, such as changing "equal" from "equal" to "eq", "range" from "range" to "between", while keeping the user interface labels unchanged.',
      zhCN: '本示例展示了如何自定义操作符的值以适应不同的后端API需求。通过传入自定义的operators对象，可以改变操作符的实际值，如将"等于"的值从"equal"改为"eq"，"范围"从"range"改为"between"等，同时保持用户界面的标签不变。',
    },
    customMappingTitle: {
      enUS: 'Custom operator mappings:',
      zhCN: '自定义的操作符映射：',
    },
    // 操作符映射列表
    operatorMappings: {
      equal: {
        enUS: 'Equal: equal → eq',
        zhCN: '等于: equal → eq',
      },
      notEqual: {
        enUS: 'Not Equal: notEqual → neq',
        zhCN: '不等于: notEqual → neq',
      },
      greaterThan: {
        enUS: 'Greater Than: greaterThan → gt',
        zhCN: '大于: greaterThan → gt',
      },
      lessThan: {
        enUS: 'Less Than: lessThan → lt',
        zhCN: '小于: lessThan → lt',
      },
      greaterThanOrEqual: {
        enUS: 'Greater Than or Equal: greaterThanOrEqual → gte',
        zhCN: '大于等于: greaterThanOrEqual → gte',
      },
      lessThanOrEqual: {
        enUS: 'Less Than or Equal: lessThanOrEqual → lte',
        zhCN: '小于等于: lessThanOrEqual → lte',
      },
      range: {
        enUS: 'Range: range → between',
        zhCN: '范围: range → between',
      },
      contains: {
        enUS: 'Contains: contains → includes',
        zhCN: '包含: contains → includes',
      },
      hasValue: {
        enUS: 'Has Value: hasValue → notEmpty',
        zhCN: '有值: hasValue → notEmpty',
      },
      noValue: {
        enUS: 'No Value: noValue → empty',
        zhCN: '无值: noValue → empty',
      },
      isTrue: {
        enUS: 'Is True: isTrue → truly',
        zhCN: '为真: isTrue → truly',
      },
      isFalse: {
        enUS: 'Is False: isFalse → falsely',
        zhCN: '为假: isFalse → falsely',
      },
    },
    // 消息
    messages: {
      incompleteConditions: {
        enUS: 'Please complete the filter conditions',
        zhCN: '请补全筛选条件',
      },
      submitSuccess: {
        enUS: 'Form submitted successfully',
        zhCN: '提交的表单值',
      },
      validateSuccess: {
        enUS: 'Validation passed',
        zhCN: '校验通过',
      },
      validateFailed: {
        enUS: 'Validation failed',
        zhCN: '校验失败',
      },
    },
  },
};
