import SVG_GREEN_WHITE from '../img/grading2/green-white.svg';
import SVG_GREEN_YELLOW from '../img/grading2/green-yellow.svg';
import SVG_RED_WHITE from '../img/grading2/red-white.svg';
import SVG_WHITE_GREEN from '../img/grading2/white-green.svg';
import SVG_WHITE_RED from '../img/grading2/white-red.svg';
import SVG_WHITE_YELLOW from '../img/grading2/white-yellow.svg';
import SVG_YELLOW_GREEN from '../img/grading2/yellow-green.svg';
import SVG_YELLOW_WHITE from '../img/grading2/yellow-white.svg';
import SVG_GREEN_WHITE_RED from '../img/grading3/green-white-red.svg';
import SVG_GREEN_YELLOW_RED from '../img/grading3/green-yellow-red.svg';
import SVG_RED_WHITE_GREEN from '../img/grading3/red-white-green.svg';
import SVG_RED_YELLOW_GREEN from '../img/grading3/red-yellow-green.svg';

export const GRADING_COLOR = {
  red: '#ED7B77',
  yellow: '#FAEA61',
  green: '#6CBF63',
  white: '#fff',
} as const;

export const GRADING2_COLOR = {
  greenWhite: {
    value: [GRADING_COLOR.green, GRADING_COLOR.white],
    label: SVG_GREEN_WHITE,
    isGrading: true,
    extraLabel: '绿 - 白',
  },
  whiteGreen: {
    value: [GRADING_COLOR.white, GRADING_COLOR.green],
    label: SVG_WHITE_GREEN,
    isGrading: true,
    extraLabel: '白 - 绿',
  },
  redWhite: {
    value: [GRADING_COLOR.red, GRADING_COLOR.white],
    label: SVG_RED_WHITE,
    isGrading: true,
    extraLabel: '红 - 白',
  },
  whiteRed: {
    value: [GRADING_COLOR.white, GRADING_COLOR.red],
    label: SVG_WHITE_RED,
    isGrading: true,
    extraLabel: '白 - 红',
  },
  yellowWhite: {
    value: [GRADING_COLOR.yellow, GRADING_COLOR.white],
    label: SVG_YELLOW_WHITE,
    isGrading: true,
    extraLabel: '黄 - 白',
  },
  whiteYellow: {
    value: [GRADING_COLOR.white, GRADING_COLOR.yellow],
    label: SVG_WHITE_YELLOW,
    isGrading: true,
    extraLabel: '白 - 黄',
  },
  greenYellow: {
    value: [GRADING_COLOR.green, GRADING_COLOR.yellow],
    label: SVG_GREEN_YELLOW,
    isGrading: true,
    extraLabel: '绿 - 黄',
  },
  yellowGreen: {
    value: [GRADING_COLOR.yellow, GRADING_COLOR.green],
    label: SVG_YELLOW_GREEN,
    isGrading: true,
    extraLabel: '黄 - 绿',
  },
};
export const GRADING3_COLOR = {
  greenWhiteRed: {
    value: [GRADING_COLOR.green, GRADING_COLOR.white, GRADING_COLOR.red],
    label: SVG_GREEN_WHITE_RED,
    isGrading: true,
    extraLabel: '绿 - 白 - 红',
  },
  redWhiteGreen: {
    value: [GRADING_COLOR.red, GRADING_COLOR.white, GRADING_COLOR.green],
    label: SVG_RED_WHITE_GREEN,
    isGrading: true,
    extraLabel: '红 - 白 - 绿',
  },
  greenYellowRed: {
    value: [GRADING_COLOR.green, GRADING_COLOR.yellow, GRADING_COLOR.red],
    label: SVG_GREEN_YELLOW_RED,
    isGrading: true,
    extraLabel: '绿 - 黄 - 红',
  },
  redYellowGreen: {
    value: [GRADING_COLOR.red, GRADING_COLOR.yellow, GRADING_COLOR.green],
    label: SVG_RED_YELLOW_GREEN,
    isGrading: true,
    extraLabel: '红 - 黄 - 绿',
  },
};
