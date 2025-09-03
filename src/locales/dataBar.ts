export const dataBar = {
  // 填充类型
  fillType: {
    pure: {
      enUS: 'Solid',
      zhCN: '纯色',
    },
    gradient: {
      enUS: 'Gradient',
      zhCN: '渐变',
    },
  },
  // 表单标签
  form: {
    dataBar: {
      enUS: 'Data Bar',
      zhCN: '数据条',
    },
    fillMethod: {
      enUS: 'Fill Method',
      zhCN: '填充方式',
    },
    colorConfig: {
      enUS: 'Color Configuration',
      zhCN: '颜色配置',
    },
    negativeValue: {
      enUS: 'Negative Value',
      zhCN: '负值',
    },
    positiveValue: {
      enUS: 'Positive Value',
      zhCN: '正值',
    },
    // DataGrading 相关
    colorScale: {
      enUS: 'Color Scale',
      zhCN: '色阶',
    },
    // DataIcon 相关
    iconSet: {
      enUS: 'Icon Set',
      zhCN: '图标集',
    },
    reverseIcon: {
      enUS: 'Reverse Icon',
      zhCN: '反转图标',
    },
  },
  // 按钮文本
  button: {
    submit: {
      enUS: 'Submit',
      zhCN: '提交',
    },
    reset: {
      enUS: 'Reset',
      zhCN: '重置',
    },
    randomTable: {
      enUS: 'Random Table',
      zhCN: '表格随机',
    },
    positiveNumbers: {
      enUS: 'Positive Numbers',
      zhCN: '正数',
    },
    negativeNumbers: {
      enUS: 'Negative Numbers',
      zhCN: '负数',
    },
    setCustomTemplate: {
      enUS: 'Set Custom Template',
      zhCN: '设置自定义模板',
    },
    validate: {
      enUS: 'Validate',
      zhCN: '验证',
    },
  },
  // 消息提示
  message: {
    submitSuccess: {
      enUS: 'Submit successful',
      zhCN: '提交成功',
    },
    submitFailed: {
      enUS: 'Submit failed, please check the form',
      zhCN: '提交失败，请检查表单',
    },
    validationPassed: {
      enUS: 'Validation passed',
      zhCN: '验证通过',
    },
    validationFailed: {
      enUS: 'Validation failed',
      zhCN: '验证失败',
    },
  },
  // 表格列标题
  table: {
    fixedRange: {
      enUS: 'Fixed Range -10~10',
      zhCN: '-10~10写死',
    },
    mixedByConfig: {
      enUS: 'Mixed Values - By Configuration',
      zhCN: '正负混合-根据配置',
    },
    fixedNegativePure: {
      enUS: 'Fixed Negative -1~-10 - Solid Color',
      zhCN: '-1~-10-写死-纯色',
    },
    positiveGradientByConfig: {
      enUS: 'Positive Gradient (By Configuration)',
      zhCN: '正数渐变（根据配置）',
    },
  },
  // Basic demo 标题
  demo: {
    greenWhite: {
      enUS: 'Green White',
      zhCN: '绿白',
    },
    twoColorGradientRedWhite: {
      enUS: 'Two-color Gradient Red White',
      zhCN: '二色渐变 红白',
    },
  },
  // 模板相关
  template: {
    solidGreen: {
      enUS: 'Solid - Green',
      zhCN: '纯色-绿色',
    },
  },
};

// DataGrading 相关的国际化
export const dataGrading = {
  // 继承 dataBar 的部分内容
  form: {
    colorScale: {
      enUS: 'Color Scale',
      zhCN: '色阶',
    },
  },
  // 表格列标题
  table: {
    indexGradient: {
      enUS: 'Index Continuous Gradient',
      zhCN: '下标连续渐变',
    },
    randomGradient: {
      enUS: 'Random Gradient',
      zhCN: '随机渐变',
    },
  },
  message: dataBar.message,
  button: dataBar.button,
};

// DataIcon 相关的国际化
export const dataIcon = {
  form: {
    iconSet: {
      enUS: 'Icon Set',
      zhCN: '图标集',
    },
    reverseIcon: {
      enUS: 'Reverse Icon',
      zhCN: '反转图标',
    },
  },
  // 表格列标题
  table: {
    indexIcon: {
      enUS: 'Index Icon',
      zhCN: '下标图标',
    },
    randomIcon: {
      enUS: 'Random Icon',
      zhCN: '随机图标',
    },
  },
  message: dataBar.message,
  button: dataBar.button,
};
