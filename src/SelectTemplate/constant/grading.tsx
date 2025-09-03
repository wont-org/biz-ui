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
    extraLabelKey: 'selectTemplate.colors.greenWhite',
  },
  whiteGreen: {
    value: [GRADING_COLOR.white, GRADING_COLOR.green],
    label: SVG_WHITE_GREEN,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.whiteGreen',
  },
  redWhite: {
    value: [GRADING_COLOR.red, GRADING_COLOR.white],
    label: SVG_RED_WHITE,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.redWhite',
  },
  whiteRed: {
    value: [GRADING_COLOR.white, GRADING_COLOR.red],
    label: SVG_WHITE_RED,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.whiteRed',
  },
  yellowWhite: {
    value: [GRADING_COLOR.yellow, GRADING_COLOR.white],
    label: SVG_YELLOW_WHITE,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.yellowWhite',
  },
  whiteYellow: {
    value: [GRADING_COLOR.white, GRADING_COLOR.yellow],
    label: SVG_WHITE_YELLOW,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.whiteYellow',
  },
  greenYellow: {
    value: [GRADING_COLOR.green, GRADING_COLOR.yellow],
    label: SVG_GREEN_YELLOW,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.greenYellow',
  },
  yellowGreen: {
    value: [GRADING_COLOR.yellow, GRADING_COLOR.green],
    label: SVG_YELLOW_GREEN,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.yellowGreen',
  },
};
export const GRADING3_COLOR = {
  greenWhiteRed: {
    value: [GRADING_COLOR.green, GRADING_COLOR.white, GRADING_COLOR.red],
    label: SVG_GREEN_WHITE_RED,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.greenWhiteRed',
  },
  redWhiteGreen: {
    value: [GRADING_COLOR.red, GRADING_COLOR.white, GRADING_COLOR.green],
    label: SVG_RED_WHITE_GREEN,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.redWhiteGreen',
  },
  greenYellowRed: {
    value: [GRADING_COLOR.green, GRADING_COLOR.yellow, GRADING_COLOR.red],
    label: SVG_GREEN_YELLOW_RED,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.greenYellowRed',
  },
  redYellowGreen: {
    value: [GRADING_COLOR.red, GRADING_COLOR.yellow, GRADING_COLOR.green],
    label: SVG_RED_YELLOW_GREEN,
    isGrading: true,
    extraLabelKey: 'selectTemplate.colors.redYellowGreen',
  },
};
