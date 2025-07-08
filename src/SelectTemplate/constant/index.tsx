import React from 'react';
import { IconTemplate } from '../IconTemplate';
import { SelectTemplateProps } from '../types';
import { GRADING_COLOR, PURE_COLOR } from './bar';
import { GRADING2_COLOR, GRADING3_COLOR } from './grading';

export const BAR_TEMPLATE_OPTIONS = [
  {
    label: 'pureFill',
    options: Object.values(PURE_COLOR).map((item) => ({
      ...item,
      isGrading: false,
    })),
  },
  {
    label: 'gradingFill',
    options: Object.values(GRADING_COLOR).map((item) => ({
      ...item,
      isGrading: true,
    })),
  },
] as const;
export const GRADING_TEMPLATE_OPTIONS = [
  {
    label: '二阶渐变',
    options: Object.values(GRADING2_COLOR),
  },
  {
    label: '三阶渐变',
    options: Object.values(GRADING3_COLOR),
  },
] as const;

export const ICON_TEMPLATE_OPTIONS: NonNullable<SelectTemplateProps['options']> = [
  {
    label: '方向',
    options: [
      {
        value: ['topGreen', 'rightYellow', 'bottomRed'],
        label: [
          <IconTemplate key="topGreen" name="top" color="green" />,
          <IconTemplate key="rightYellow" name="right" color="yellow" />,
          <IconTemplate key="bottomRed" name="bottom" color="red" />,
        ],
      },
      {
        value: ['topGray', 'rightGray', 'bottomGray'],
        label: [
          <IconTemplate key="topGray" name="top" color="gray" />,
          <IconTemplate key="rightGray" name="right" color="gray" />,
          <IconTemplate key="bottomGray" name="bottom" color="gray" />,
        ],
      },
      {
        value: ['topGreen', 'rightYellow', 'bottomRightYellow', 'bottomRed'],
        label: [
          <IconTemplate key="topGreen" name="top" color="green" />,
          <IconTemplate key="rightYellow" name="right" color="yellow" />,
          <IconTemplate key="bottomRightYellow" name="bottomRight" color="yellow" />,
          <IconTemplate key="bottomRed" name="bottom" color="red" />,
        ],
      },
      {
        value: ['topGray', 'topRightGray', 'rightGray', 'bottomRightGray', 'bottomGray'],
        label: [
          <IconTemplate key="topGray" name="top" color="gray" />,
          <IconTemplate key="topRightGray" name="topRight" color="gray" />,
          <IconTemplate key="rightGray" name="right" color="gray" />,
          <IconTemplate key="bottomRightGray" name="bottomRight" color="gray" />,
          <IconTemplate key="bottomGray" name="bottom" color="gray" />,
        ],
      },
      {
        value: ['topGreen', 'topRightYellow', 'rightYellow', 'bottomRightYellow', 'bottomRed'],
        label: [
          <IconTemplate key="topGreen" name="top" color="green" />,
          <IconTemplate key="topRightYellow" name="topRight" color="yellow" />,
          <IconTemplate key="rightYellow" name="right" color="yellow" />,
          <IconTemplate key="bottomRightYellow" name="bottomRight" color="yellow" />,
          <IconTemplate key="bottomRed" name="bottom" color="red" />,
        ],
      },
    ],
  },
  {
    label: '形状',
    options: [
      {
        value: ['circleSolidGreen', 'circleSolidYellow', 'circleSolidRed'],
        label: [
          <IconTemplate key="circleSolidGreen" name="circleSolid" color="green" />,
          <IconTemplate key="circleSolidYellow" name="circleSolid" color="yellow" />,
          <IconTemplate key="circleSolidRed" name="circleSolid" color="red" />,
        ],
      },
      {
        value: ['circleSolidGreen', 'triangleYellow', 'prismaticRed'],
        label: [
          <IconTemplate key="circleSolidGreen" name="circleSolid" color="green" />,
          <IconTemplate key="triangleYellow" name="triangle" color="yellow" />,
          <IconTemplate key="prismaticRed" name="prismatic" color="red" />,
        ],
      },
      {
        value: ['circleSolidGreen', 'circleSolidYellow', 'circleSolidRed', 'circleSolidGray'],
        label: [
          <IconTemplate key="circleSolidGreen" name="circleSolid" color="green" />,
          <IconTemplate key="circleSolidYellow" name="circleSolid" color="yellow" />,
          <IconTemplate key="circleSolidRed" name="circleSolid" color="red" />,
          <IconTemplate key="circleSolidGray" name="circleSolid" color="gray" />,
        ],
      },
      {
        value: [
          'circleSolidGreen',
          'circleSolidYellow',
          'circleSolidRed',
          'circleSolidGray',
          'circleSolidBlack',
        ],
        label: [
          <IconTemplate key="circleSolidGreen" name="circleSolid" color="green" />,
          <IconTemplate key="circleSolidYellow" name="circleSolid" color="yellow" />,
          <IconTemplate key="circleSolidRed" name="circleSolid" color="red" />,
          <IconTemplate key="circleSolidGray" name="circleSolid" color="gray" />,
          <IconTemplate key="circleSolidBlack" name="circleSolid" color="black" />,
        ],
      },
    ],
  },
  {
    label: '标记',
    options: [
      {
        value: ['yesGreen', 'noRed'],
        label: [
          <IconTemplate key="yesGreen" name="yes" color="green" />,
          <IconTemplate key="noRed" name="no" color="red" />,
        ],
      },
      {
        value: ['yesGreen', 'warnYellow', 'noRed'],
        label: [
          <IconTemplate key="yesGreen" name="yes" color="green" />,
          <IconTemplate key="warnYellow" name="warn" color="yellow" />,
          <IconTemplate key="noRed" name="no" color="red" />,
        ],
      },
      {
        value: ['goodGreen', 'badRed'],
        label: [
          <IconTemplate key="goodGreen" name="good" color="green" />,
          <IconTemplate key="badRed" name="bad" color="red" />,
        ],
      },
      {
        value: ['flagGreen', 'flagYellow', 'flagRed'],
        label: [
          <IconTemplate key="flagGreen" name="flag" color="green" />,
          <IconTemplate key="flagYellow" name="flag" color="yellow" />,
          <IconTemplate key="flagRed" name="flag" color="red" />,
        ],
      },
    ],
  },
  {
    label: '等级',
    options: [
      {
        value: ['star0Gray', 'star50Yellow', 'star100Yellow'],
        label: [
          <IconTemplate key="star0Gray" name="star0" color="gray" />,
          <IconTemplate key="star50Yellow" name="star50" color="yellow" />,
          <IconTemplate key="star100Yellow" name="star100" color="yellow" />,
        ],
      },
      {
        value: ['heart100', 'heart50', 'heart0'],
        label: [
          <IconTemplate key="heart100" name="heart100" />,
          <IconTemplate key="heart50" name="heart50" />,
          <IconTemplate key="heart0" name="heart0" />,
        ],
      },
      {
        value: ['mood100Yellow', 'mood50Yellow', 'mood0Yellow'],
        label: [
          <IconTemplate key="mood100Yellow" name="mood100" />,
          <IconTemplate key="mood50Yellow" name="mood50" />,
          <IconTemplate key="mood0Yellow" name="mood0" />,
        ],
      },
      {
        value: ['circle100', 'circle75', 'circle50', 'circle25', 'circle0'],
        label: [
          <IconTemplate key="circle100" name="circle100" />,
          <IconTemplate key="circle75" name="circle75" />,
          <IconTemplate key="circle50" name="circle50" />,
          <IconTemplate key="circle25" name="circle25" />,
          <IconTemplate key="circle0" name="circle0" />,
        ],
      },
    ],
  },
] as const;
