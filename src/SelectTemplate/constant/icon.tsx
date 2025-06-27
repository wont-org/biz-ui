// arrow
import SVG_ARROW_BOTTOM from '../img/arrow/ArrowBottom';
import SVG_ARROW_BOTTOM_RIGHT from '../img/arrow/ArrowBottomRight';
import SVG_ARROW_RIGHT from '../img/arrow/ArrowRight';
import SVG_ARROW_TOP from '../img/arrow/ArrowTop';
import SVG_ARROW_TOP_RIGHT from '../img/arrow/ArrowTopRight';

// shape
import SVG_CIRCLE_SOLID from '../img/shape/CircleSolid';
import SVG_PRISMATIC from '../img/shape/Prismatic';
import SVG_TRIANGLE from '../img/shape/Triangle';

// sign
import SVG_BAD from '../img/sign/Bad';
import SVG_FLAG from '../img/sign/Flag';
import SVG_GOOD from '../img/sign/Good';
import SVG_NO from '../img/sign/No';
import SVG_WARN from '../img/sign/Warn';
import SVG_YES from '../img/sign/Yes';

// grade
import SVG_CIRCLE_0 from '../img/grade/Circle0';
import SVG_CIRCLE_100 from '../img/grade/Circle100';
import SVG_CIRCLE_25 from '../img/grade/Circle25';
import SVG_CIRCLE_50 from '../img/grade/Circle50';
import SVG_CIRCLE_75 from '../img/grade/Circle75';
import SVG_HEART_0 from '../img/grade/Heart0';
import SVG_HEART_100 from '../img/grade/Heart100';
import SVG_HEART_50 from '../img/grade/Heart50';
import SVG_MOOD_0 from '../img/grade/Mood0';
import SVG_MOOD_100 from '../img/grade/Mood100';
import SVG_MOOD_50 from '../img/grade/Mood50';
import SVG_STAR_0 from '../img/grade/Star0';
import SVG_STAR_100 from '../img/grade/Star100';
import SVG_STAR_50 from '../img/grade/Star50';

const ARROW_ICON = {
  top: SVG_ARROW_TOP,
  topRight: SVG_ARROW_TOP_RIGHT,
  bottom: SVG_ARROW_BOTTOM,
  bottomRight: SVG_ARROW_BOTTOM_RIGHT,
  right: SVG_ARROW_RIGHT,
} as const;

const SHAPE_ICON = {
  circleSolid: SVG_CIRCLE_SOLID,
  prismatic: SVG_PRISMATIC,
  triangle: SVG_TRIANGLE,
} as const;

const SIGN_ICON = {
  bad: SVG_BAD,
  good: SVG_GOOD,
  yes: SVG_YES,
  no: SVG_NO,
  flag: SVG_FLAG,
  warn: SVG_WARN,
} as const;

const GRADE_ICON = {
  star100: SVG_STAR_100,
  star50: SVG_STAR_50,
  star0: SVG_STAR_0,
  heart100: SVG_HEART_100,
  heart50: SVG_HEART_50,
  heart0: SVG_HEART_0,
  mood100: SVG_MOOD_100,
  mood50: SVG_MOOD_50,
  mood0: SVG_MOOD_0,
  circle100: SVG_CIRCLE_100,
  circle75: SVG_CIRCLE_75,
  circle50: SVG_CIRCLE_50,
  circle25: SVG_CIRCLE_25,
  circle0: SVG_CIRCLE_0,
} as const;

export const SVG_ICON = {
  ...ARROW_ICON,
  ...SHAPE_ICON,
  ...SIGN_ICON,
  ...GRADE_ICON,
} as const;

export const ICON_COLOR = {
  green: '#62d256',
  red: '#F76962',
  yellow: '#fad355',
  gray: '#8f959e',
  black: '#373c43',
} as const;
