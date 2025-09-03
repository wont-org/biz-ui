import SVG_GRADING_BLUE from '../img/bar/grading-blue.svg';
import SVG_GRADING_GREEN from '../img/bar/grading-green.svg';
import SVG_GRADING_ORANGE from '../img/bar/grading-orange.svg';
import SVG_GRADING_RED from '../img/bar/grading-red.svg';
import SVG_GRADING_SKYBLUE from '../img/bar/grading-sky-blue.svg';
import SVG_GRADING_YELLOW from '../img/bar/grading-yellow.svg';
import SVG_PURE_BLUE from '../img/bar/pure-blue.svg';
import SVG_PURE_GREEN from '../img/bar/pure-green.svg';
import SVG_PURE_ORANGE from '../img/bar/pure-orange.svg';
import SVG_PURE_RED from '../img/bar/pure-red.svg';
import SVG_PURE_SKYBLUE from '../img/bar/pure-sky-blue.svg';
import SVG_PURE_YELLOW from '../img/bar/pure-yellow.svg';

export const SVG_BLUE = {
  grading: SVG_GRADING_BLUE,
  pure: SVG_PURE_BLUE,
};

export const SVG_GREEN = {
  grading: SVG_GRADING_GREEN,
  pure: SVG_PURE_GREEN,
};

export const SVG_YELLOW = {
  grading: SVG_GRADING_YELLOW,
  pure: SVG_PURE_YELLOW,
};

export const SVG_ORANGE = {
  grading: SVG_GRADING_ORANGE,
  pure: SVG_PURE_ORANGE,
};

export const SVG_RED = {
  grading: SVG_GRADING_RED,
  pure: SVG_PURE_RED,
};

export const SVG_SKY_BLUE = {
  grading: SVG_GRADING_SKYBLUE,
  pure: SVG_PURE_SKYBLUE,
};

export const BAR_COLOR = {
  blue: '#6D98FD',
  green: '#78D96D',
  yellow: '#FFB561',
  orange: '#F7D564',
  red: '#F98A86',
  skyblue: '#66D2F9',
} as const;

export const GRADING_COLOR = {
  blue: {
    value: [BAR_COLOR.blue],
    label: SVG_BLUE.grading,
    extraLabelKey: 'selectTemplate.colors.blue',
  },
  green: {
    value: [BAR_COLOR.green],
    label: SVG_GREEN.grading,
    extraLabelKey: 'selectTemplate.colors.green',
  },
  yellow: {
    value: [BAR_COLOR.yellow],
    label: SVG_YELLOW.grading,
    extraLabelKey: 'selectTemplate.colors.yellow',
  },
  orange: {
    value: [BAR_COLOR.orange],
    label: SVG_ORANGE.grading,
    extraLabelKey: 'selectTemplate.colors.orange',
  },
  red: {
    value: [BAR_COLOR.red],
    label: SVG_RED.grading,
    extraLabelKey: 'selectTemplate.colors.red',
  },
  skyblue: {
    value: [BAR_COLOR.skyblue],
    label: SVG_SKY_BLUE.grading,
    extraLabelKey: 'selectTemplate.colors.skyblue',
  },
};
export const PURE_COLOR = {
  blue: {
    value: [BAR_COLOR.blue],
    label: SVG_BLUE.pure,
    extraLabelKey: 'selectTemplate.colors.pureBlue',
  },
  green: {
    value: [BAR_COLOR.green],
    label: SVG_GREEN.pure,
    extraLabelKey: 'selectTemplate.colors.pureGreen',
  },
  yellow: {
    value: [BAR_COLOR.yellow],
    label: SVG_YELLOW.pure,
    extraLabelKey: 'selectTemplate.colors.pureYellow',
  },
  orange: {
    value: [BAR_COLOR.orange],
    label: SVG_ORANGE.pure,
    extraLabelKey: 'selectTemplate.colors.pureOrange',
  },
  red: {
    value: [BAR_COLOR.red],
    label: SVG_RED.pure,
    extraLabelKey: 'selectTemplate.colors.pureRed',
  },
  skyblue: {
    value: [BAR_COLOR.skyblue],
    label: SVG_SKY_BLUE.pure,
    extraLabelKey: 'selectTemplate.colors.pureSkyblue',
  },
};
