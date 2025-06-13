export const SPACE_UNIT = 4;
export const SPACE_TIMES = (multiple?: number) => `${SPACE_UNIT * (multiple || 1)}px`;
export const SPACE = SPACE_TIMES(1);
export const SPACE_XS = SPACE_TIMES(2);

export const PRESET_COLORS = [
  // 第一行：原色
  {
    value: '#FFFFFF',
    label: '白色',
  },
  {
    value: '#4E83FD',
    label: '蓝色',
  },
  {
    value: '#14C0FF',
    label: '天蓝色',
  },
  {
    value: '#00D6B9',
    label: '青色',
  },
  {
    value: '#34C724',
    label: '绿色',
  },
  {
    value: '#B3D600',
    label: '柠檬绿',
  },
  {
    value: '#FFF258',
    label: '黄色',
  },
  {
    value: '#FF8800',
    label: '橙色',
  },
  {
    value: '#F54A45',
    label: '红色',
  },
  {
    value: '#F14BA9',
    label: '粉色',
  },
  {
    value: '#7F3BF5',
    label: '紫色',
  },

  // 第二行：浅色调
  {
    value: '#F8F9FA',
    label: '浅灰色1',
  },
  {
    value: '#E1EAFF',
    label: '浅蓝色1',
  },
  {
    value: '#D9F3FD',
    label: '浅天蓝色1',
  },
  {
    value: '#D5F6F2',
    label: '浅青色1',
  },
  {
    value: '#D9F5D6',
    label: '浅绿色1',
  },
  {
    value: '#EEF6C6',
    label: '浅柠檬绿1',
  },
  {
    value: '#FAF1D1',
    label: '浅黄色1',
  },
  {
    value: '#FED4A4',
    label: '浅橙色1',
  },
  {
    value: '#FBBFBC',
    label: '浅红色1',
  },
  {
    value: '#FDDEEF',
    label: '浅粉色1',
  },
  {
    value: '#ECE2FE',
    label: '浅紫色1',
  },

  // 第三行：中等色调
  {
    value: '#DEE0E3',
    label: '浅灰色2',
  },
  {
    value: '#BACEFD',
    label: '浅蓝色2',
  },
  {
    value: '#7EDAFB',
    label: '浅天蓝色2',
  },
  {
    value: '#64E8D6',
    label: '浅青色2',
  },
  {
    value: '#8EE085',
    label: '浅绿色2',
  },
  {
    value: '#C3DD40',
    label: '浅柠檬绿2',
  },
  {
    value: '#FAD355',
    label: '浅黄色2',
  },
  {
    value: '#FFBA6B',
    label: '浅橙色2',
  },
  {
    value: '#F76964',
    label: '浅红色2',
  },
  {
    value: '#F57AC0',
    label: '浅粉色2',
  },
  {
    value: '#AD82F7',
    label: '浅紫色2',
  },

  // 第四行：深色调
  {
    value: '#8F959E',
    label: '中灰色',
  },
  {
    value: '#3370FF',
    label: '中蓝色',
  },
  {
    value: '#049FD7',
    label: '中天蓝色',
  },
  {
    value: '#04B49C',
    label: '中青色',
  },
  {
    value: '#2EA121',
    label: '中绿色',
  },
  {
    value: '#8FAC02',
    label: '中柠檬绿',
  },
  {
    value: '#FFC60A',
    label: '中黄色',
  },
  {
    value: '#DE7802',
    label: '中橙色',
  },
  {
    value: '#D83931',
    label: '中红色',
  },
  {
    value: '#F01D94',
    label: '中粉色',
  },
  {
    value: '#6425D0',
    label: '中紫色',
  },

  // 第五行：更深色调
  {
    value: '#373C43',
    label: '深灰色1',
  },
  {
    value: '#245BDB',
    label: '深蓝色1',
  },
  {
    value: '#037EAA',
    label: '深天蓝色1',
  },
  {
    value: '#036356',
    label: '深青色1',
  },
  {
    value: '#186010',
    label: '深绿色1',
  },
  {
    value: '#667901',
    label: '深柠檬绿1',
  },
  {
    value: '#DC9B04',
    label: '深黄色1',
  },
  {
    value: '#8F4F04',
    label: '深橙色1',
  },
  {
    value: '#812520',
    label: '深红色1',
  },
  {
    value: '#9E1361',
    label: '深粉色1',
  },
  {
    value: '#380D82',
    label: '深紫色1',
  },

  // 第六行：最深色调
  {
    value: '#1F2329',
    label: '深灰色2',
  },
  {
    value: '#133C9A',
    label: '深蓝色2',
  },
  {
    value: '#006185',
    label: '深天蓝色2',
  },
  {
    value: '#024B41',
    label: '深青色2',
  },
  {
    value: '#124B0C',
    label: '深绿色2',
  },
  {
    value: '#495700',
    label: '深柠檬绿2',
  },
  {
    value: '#795101',
    label: '深黄色2',
  },
  {
    value: '#6B3900',
    label: '深橙色2',
  },
  {
    value: '#621C18',
    label: '深红色2',
  },
  {
    value: '#7A0F4B',
    label: '深粉色2',
  },
  {
    value: '#270561',
    label: '深紫色2',
  },
];
