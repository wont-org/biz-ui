export const EMPTY_PLACEHOLDER = {
  table: '-',
  blank: '\u0020',
};
export const OPERATE_TYPE = {
  add: {
    labelKey: 'common.operation.add',
    value: 'add' as const,
  },
  edit: {
    labelKey: 'common.operation.edit',
    value: 'edit' as const,
  },
  remove: {
    labelKey: 'common.operation.delete',
    value: 'remove' as const,
  },
  view: {
    labelKey: 'common.operation.view',
    value: 'view' as const,
  },
};
export type OperateType = keyof typeof OPERATE_TYPE;
