import React from 'react';
import { useTranslation } from '../BizProvider';
import { ValueOfConstWithType } from '../utils/types';
import { RELATION } from './constant';
import { StyledRelation } from './styled';

export interface RelationProps {
  children: React.ReactNode;
  value: ValueOfConstWithType<typeof RELATION, 'value'>;
  showRelation?: boolean;
  disabled?: boolean;
  onChange: (value: RelationProps['value']) => void;
}

export default function Relation({
  children,
  value,
  disabled,
  showRelation = true,
  onChange,
}: RelationProps) {
  const { t } = useTranslation();
  const renderRelation = () => {
    return Object.values(RELATION).map((item) => (
      <div
        className={`radioItem ${item.value}`}
        key={item.value}
        onClick={() => !disabled && onChange(item.value)}
      >
        {t(`filterList.relation.${item.value}`)}
      </div>
    ));
  };
  return (
    <StyledRelation $radio={value}>
      {showRelation && renderRelation()}
      {children}
    </StyledRelation>
  );
}
