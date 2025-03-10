export const PREFIX = {
  global: {
    value: 'global',
    label: '全局',
    getValue: (val: string) => `%${val}%`,
  },
  prefix: {
    value: 'prefix',
    label: '前缀',
    getValue: (val: string) => `${val}%`,
  },
  posfix: {
    value: 'posfix',
    label: '后缀',
    getValue: (val: string) => `%${val}`,
  },
} as const;
