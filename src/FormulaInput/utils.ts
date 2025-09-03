import { isInvalidValue } from '../utils/commom';
import { FORMULA, OP_LIST } from './constant';
import { FormulaInputProps } from './type';

export const validator = (
  val: FormulaInputProps['value'],
  options?: FormulaInputProps & { t?: (key: string, params?: any) => string },
): {
  validateStatus?: 'error' | 'success' | 'warning' | 'validating';
  message?: string;
} => {
  const { nameInputProps = {}, useValue = true, t } = options || {};
  const { useName = true, validator: nameValidator } = nameInputProps;
  if (useName && typeof nameValidator === 'function') {
    const { validateStatus, message: _message } = nameValidator(val?.name);
    if (validateStatus === 'error') {
      return {
        validateStatus,
        message: _message,
      };
    }
  }
  if (useName && !val?.name) {
    return {
      validateStatus: 'error',
      message: t ? t('formulaInput.validation.nameRequired') : 'Name cannot be empty',
    };
  }
  if (!val?.formula || val?.formula.length === 0) {
    return {
      validateStatus: 'error',
      message: t ? t('formulaInput.validation.formulaRequired') : 'Formula cannot be empty',
    };
  }

  // 步骤1: 检查基本语法规则

  // 检查表达式是否以运算符开头
  const first = val.formula[0];
  if (typeof first === 'string' && OP_LIST.includes(first)) {
    return {
      validateStatus: 'error',
      message: t
        ? t('formulaInput.validation.cannotStartWithOperator')
        : 'Formula cannot start with an operator',
    };
  }

  // 检查表达式是否以运算符结尾
  const last = val.formula?.[val.formula.length - 1];
  if (typeof last === 'string' && OP_LIST.includes(last)) {
    return {
      validateStatus: 'error',
      message: t
        ? t('formulaInput.validation.cannotEndWithOperator')
        : 'Formula cannot end with an operator',
    };
  }

  // 检查括号是否成对出现且正确嵌套
  const bracketStack: string[] = [];
  for (const item of val.formula) {
    if (typeof item === 'string') {
      if (item === '(') {
        bracketStack.push(item);
      } else if (item === ')') {
        if (bracketStack.length === 0 || bracketStack.pop() !== '(') {
          return {
            validateStatus: 'error',
            message: t
              ? t('formulaInput.validation.bracketMismatch')
              : 'Brackets must be paired and properly nested',
          };
        }
      }
    }
  }

  if (bracketStack.length > 0) {
    return {
      validateStatus: 'error',
      message: t
        ? t('formulaInput.validation.bracketMismatch')
        : 'Brackets must be paired and properly nested',
    };
  }

  // 步骤2: 检查运算符与操作数、括号的位置关系
  let hasOperandOrCloseBracket = false; // 跟踪前一个元素是否为操作数或右括号
  let hasOperandOrBracket = false; // 跟踪是否至少有一个操作数或括号

  for (let i = 0; i < val.formula.length; i++) {
    const current = val.formula[i];
    const next = i < val.formula.length - 1 ? val.formula[i + 1] : null;

    // 检查运算符是否位于两个操作数之间
    if (typeof current === 'string' && OP_LIST.includes(current)) {
      if (!hasOperandOrCloseBracket) {
        return {
          validateStatus: 'error',
          message: t
            ? t('formulaInput.validation.operatorPosition')
            : 'Operators must be between operands or brackets',
        };
      }

      if (!next || (typeof next === 'string' && OP_LIST.includes(next))) {
        return {
          validateStatus: 'error',
          message: t
            ? t('formulaInput.validation.consecutiveOperators')
            : 'Operators cannot be consecutive',
        };
      }

      if (next === ')') {
        return {
          validateStatus: 'error',
          message: t
            ? t('formulaInput.validation.operatorBeforeRightBracket')
            : 'Operators cannot be directly followed by right bracket',
        };
      }

      hasOperandOrCloseBracket = false;
    }
    // 检查左括号位置规则
    else if (current === '(') {
      if (next === ')') {
        return {
          validateStatus: 'error',
          message: t
            ? t('formulaInput.validation.bracketContent')
            : 'Brackets must contain valid sub-expressions',
        };
      }

      if (next && typeof next === 'string' && OP_LIST.includes(next)) {
        return {
          validateStatus: 'error',
          message: t
            ? t('formulaInput.validation.operatorAfterLeftBracket')
            : 'Left bracket cannot be directly followed by an operator',
        };
      }

      hasOperandOrCloseBracket = false;
    }
    // 检查右括号位置规则
    else if (current === ')') {
      if (!hasOperandOrCloseBracket) {
        return {
          validateStatus: 'error',
          message: t
            ? t('formulaInput.validation.bracketBeforeOperand')
            : 'Right bracket must be preceded by operand or right bracket',
        };
      }

      hasOperandOrCloseBracket = true;
    }
    // 操作数
    else if (typeof current === 'object' && next && typeof next === 'object') {
      // 检查连续的操作数之间是否缺少运算符
      return {
        validateStatus: 'error',
        message: t
          ? t('formulaInput.validation.missingOperator')
          : 'Operators must be between operands',
      };
    } else {
      hasOperandOrCloseBracket = true;
      hasOperandOrBracket = true;
    }
  }

  // 检查表达式中是否至少有一个操作数
  if (!hasOperandOrBracket) {
    return {
      validateStatus: 'error',
      message: t
        ? t('formulaInput.validation.emptyExpression')
        : 'Formula must contain at least one operand',
    };
  }

  // 步骤3: 检查操作数为空值
  if (
    val.formula?.some((e) => {
      if (!useValue && typeof e === 'object') {
        if (e.valueType === FORMULA.number.valueType) {
          return isInvalidValue(e.value) || isInvalidValue(e.type);
        }
        return isInvalidValue(e.type);
      }
      return typeof e === 'object' && (isInvalidValue(e.value) || isInvalidValue(e.type));
    })
  ) {
    return {
      validateStatus: 'error',
      message: t ? t('formulaInput.validation.emptyOperand') : 'Each formula item cannot be empty',
    };
  }

  return {
    validateStatus: undefined,
    message: undefined,
  };
};
