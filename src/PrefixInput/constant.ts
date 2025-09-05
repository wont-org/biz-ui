export const PREFIX = {
  global: {
    value: 'global',
    labelKey: 'prefixInput.prefixTypes.global',
    getValue: (val: string) => `%${val}%`,
  },
  prefix: {
    value: 'prefix',
    labelKey: 'prefixInput.prefixTypes.prefix',
    getValue: (val: string) => `${val}%`,
  },
  posfix: {
    value: 'posfix',
    labelKey: 'prefixInput.prefixTypes.suffix',
    getValue: (val: string) => `%${val}`,
  },
} as const;
