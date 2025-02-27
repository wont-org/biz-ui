export const EMPTY_PLACEHOLDER = {
  table: '-',
};
export const OPERATE_TYPE = {
  add: {
    label: '新增',
    value: 'add' as const,
  },
  edit: {
    label: '编辑',
    value: 'edit' as const,
  },
  remove: {
    label: '删除',
    value: 'remove' as const,
  },
  view: {
    label: '查看',
    value: 'view' as const,
  },
};
export type OperateType = keyof typeof OPERATE_TYPE;
