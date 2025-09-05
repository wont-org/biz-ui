export const SPACE_UNIT = 4;
export const SPACE_TIMES = (multiple?: number) => `${SPACE_UNIT * (multiple || 1)}px`;
export const SPACE = SPACE_TIMES(1);
export const SPACE_XS = SPACE_TIMES(2);

export const PRESET_COLORS = [
  // 第一行：原色
  {
    value: '#FFFFFF',
    labelKey: 'colorPicker.colors.white',
  },
  {
    value: '#4E83FD',
    labelKey: 'colorPicker.colors.blue',
  },
  {
    value: '#14C0FF',
    labelKey: 'colorPicker.colors.skyBlue',
  },
  {
    value: '#00D6B9',
    labelKey: 'colorPicker.colors.cyan',
  },
  {
    value: '#34C724',
    labelKey: 'colorPicker.colors.green',
  },
  {
    value: '#B3D600',
    labelKey: 'colorPicker.colors.limeGreen',
  },
  {
    value: '#FFF258',
    labelKey: 'colorPicker.colors.yellow',
  },
  {
    value: '#FF8800',
    labelKey: 'colorPicker.colors.orange',
  },
  {
    value: '#F54A45',
    labelKey: 'colorPicker.colors.red',
  },
  {
    value: '#F14BA9',
    labelKey: 'colorPicker.colors.pink',
  },
  {
    value: '#7F3BF5',
    labelKey: 'colorPicker.colors.purple',
  },

  // 第二行：浅色调
  {
    value: '#F8F9FA',
    labelKey: 'colorPicker.colors.lightGray1',
  },
  {
    value: '#E1EAFF',
    labelKey: 'colorPicker.colors.lightBlue1',
  },
  {
    value: '#D9F3FD',
    labelKey: 'colorPicker.colors.lightSkyBlue1',
  },
  {
    value: '#D5F6F2',
    labelKey: 'colorPicker.colors.lightCyan1',
  },
  {
    value: '#D9F5D6',
    labelKey: 'colorPicker.colors.lightGreen1',
  },
  {
    value: '#EEF6C6',
    labelKey: 'colorPicker.colors.lightLimeGreen1',
  },
  {
    value: '#FAF1D1',
    labelKey: 'colorPicker.colors.lightYellow1',
  },
  {
    value: '#FED4A4',
    labelKey: 'colorPicker.colors.lightOrange1',
  },
  {
    value: '#FBBFBC',
    labelKey: 'colorPicker.colors.lightRed1',
  },
  {
    value: '#FDDEEF',
    labelKey: 'colorPicker.colors.lightPink1',
  },
  {
    value: '#ECE2FE',
    labelKey: 'colorPicker.colors.lightPurple1',
  },

  // 第三行：中等色调
  {
    value: '#DEE0E3',
    labelKey: 'colorPicker.colors.lightGray2',
  },
  {
    value: '#BACEFD',
    labelKey: 'colorPicker.colors.lightBlue2',
  },
  {
    value: '#7EDAFB',
    labelKey: 'colorPicker.colors.lightSkyBlue2',
  },
  {
    value: '#64E8D6',
    labelKey: 'colorPicker.colors.lightCyan2',
  },
  {
    value: '#8EE085',
    labelKey: 'colorPicker.colors.lightGreen2',
  },
  {
    value: '#C3DD40',
    labelKey: 'colorPicker.colors.lightLimeGreen2',
  },
  {
    value: '#FAD355',
    labelKey: 'colorPicker.colors.lightYellow2',
  },
  {
    value: '#FFBA6B',
    labelKey: 'colorPicker.colors.lightOrange2',
  },
  {
    value: '#F76964',
    labelKey: 'colorPicker.colors.lightRed2',
  },
  {
    value: '#F57AC0',
    labelKey: 'colorPicker.colors.lightPink2',
  },
  {
    value: '#AD82F7',
    labelKey: 'colorPicker.colors.lightPurple2',
  },

  // 第四行：深色调
  {
    value: '#8F959E',
    labelKey: 'colorPicker.colors.mediumGray',
  },
  {
    value: '#3370FF',
    labelKey: 'colorPicker.colors.mediumBlue',
  },
  {
    value: '#049FD7',
    labelKey: 'colorPicker.colors.mediumSkyBlue',
  },
  {
    value: '#04B49C',
    labelKey: 'colorPicker.colors.mediumCyan',
  },
  {
    value: '#2EA121',
    labelKey: 'colorPicker.colors.mediumGreen',
  },
  {
    value: '#8FAC02',
    labelKey: 'colorPicker.colors.mediumLimeGreen',
  },
  {
    value: '#FFC60A',
    labelKey: 'colorPicker.colors.mediumYellow',
  },
  {
    value: '#DE7802',
    labelKey: 'colorPicker.colors.mediumOrange',
  },
  {
    value: '#D83931',
    labelKey: 'colorPicker.colors.mediumRed',
  },
  {
    value: '#F01D94',
    labelKey: 'colorPicker.colors.mediumPink',
  },
  {
    value: '#6425D0',
    labelKey: 'colorPicker.colors.mediumPurple',
  },

  // 第五行：更深色调
  {
    value: '#373C43',
    labelKey: 'colorPicker.colors.darkGray1',
  },
  {
    value: '#245BDB',
    labelKey: 'colorPicker.colors.darkBlue1',
  },
  {
    value: '#037EAA',
    labelKey: 'colorPicker.colors.darkSkyBlue1',
  },
  {
    value: '#036356',
    labelKey: 'colorPicker.colors.darkCyan1',
  },
  {
    value: '#186010',
    labelKey: 'colorPicker.colors.darkGreen1',
  },
  {
    value: '#667901',
    labelKey: 'colorPicker.colors.darkLimeGreen1',
  },
  {
    value: '#DC9B04',
    labelKey: 'colorPicker.colors.darkYellow1',
  },
  {
    value: '#8F4F04',
    labelKey: 'colorPicker.colors.darkOrange1',
  },
  {
    value: '#812520',
    labelKey: 'colorPicker.colors.darkRed1',
  },
  {
    value: '#9E1361',
    labelKey: 'colorPicker.colors.darkPink1',
  },
  {
    value: '#380D82',
    labelKey: 'colorPicker.colors.darkPurple1',
  },

  // 第六行：最深色调
  {
    value: '#1F2329',
    labelKey: 'colorPicker.colors.darkGray2',
  },
  {
    value: '#133C9A',
    labelKey: 'colorPicker.colors.darkBlue2',
  },
  {
    value: '#006185',
    labelKey: 'colorPicker.colors.darkSkyBlue2',
  },
  {
    value: '#024B41',
    labelKey: 'colorPicker.colors.darkCyan2',
  },
  {
    value: '#124B0C',
    labelKey: 'colorPicker.colors.darkGreen2',
  },
  {
    value: '#495700',
    labelKey: 'colorPicker.colors.darkLimeGreen2',
  },
  {
    value: '#795101',
    labelKey: 'colorPicker.colors.darkYellow2',
  },
  {
    value: '#6B3900',
    labelKey: 'colorPicker.colors.darkOrange2',
  },
  {
    value: '#621C18',
    labelKey: 'colorPicker.colors.darkRed2',
  },
  {
    value: '#7A0F4B',
    labelKey: 'colorPicker.colors.darkPink2',
  },
  {
    value: '#270561',
    labelKey: 'colorPicker.colors.darkPurple2',
  },
];
