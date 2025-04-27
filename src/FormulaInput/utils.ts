import { isInvalidValue } from '../utils/commom';
import { OP_LIST } from './constant';
import { FormulaInputProps } from './type';

export const validator = (
  val: FormulaInputProps['value'],
  options?: FormulaInputProps,
): {
  validateStatus?: 'error' | 'success' | 'warning' | 'validating';
  message?: string;
} => {
  const { nameInputProps = {} } = options || {};
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
      message: '名称不能为空',
    };
  }
  if (!val?.formula || val?.formula.length === 0) {
    return {
      validateStatus: 'error',
      message: '公式不能为空',
    };
  }

  // 步骤1: 检查基本语法规则

  // 检查表达式是否以运算符开头
  const first = val.formula[0];
  if (typeof first === 'string' && OP_LIST.includes(first)) {
    return {
      validateStatus: 'error',
      message: '公式不能以运算符开头',
    };
  }

  // 检查表达式是否以运算符结尾
  const last = val.formula?.[val.formula.length - 1];
  if (typeof last === 'string' && OP_LIST.includes(last)) {
    return {
      validateStatus: 'error',
      message: '公式末尾不能为运算符',
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
            message: '括号必须成对出现且正确嵌套',
          };
        }
      }
    }
  }

  if (bracketStack.length > 0) {
    return {
      validateStatus: 'error',
      message: '括号必须成对出现且正确嵌套',
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
          message: '运算符前必须是操作数或右括号',
        };
      }

      if (!next || (typeof next === 'string' && OP_LIST.includes(next))) {
        return {
          validateStatus: 'error',
          message: '运算符不能连续',
        };
      }

      if (next === ')') {
        return {
          validateStatus: 'error',
          message: '运算符后不能直接跟右括号',
        };
      }

      hasOperandOrCloseBracket = false;
    }
    // 检查左括号位置规则
    else if (current === '(') {
      if (next === ')') {
        return {
          validateStatus: 'error',
          message: '括号内必须包含合法子表达式',
        };
      }

      if (next && typeof next === 'string' && OP_LIST.includes(next)) {
        return {
          validateStatus: 'error',
          message: '左括号后不能直接跟运算符',
        };
      }

      hasOperandOrCloseBracket = false;
    }
    // 检查右括号位置规则
    else if (current === ')') {
      if (!hasOperandOrCloseBracket) {
        return {
          validateStatus: 'error',
          message: '右括号前必须是操作数或右括号',
        };
      }

      hasOperandOrCloseBracket = true;
    }
    // 操作数
    else if (typeof current === 'object' && next && typeof next === 'object') {
      // 检查连续的操作数之间是否缺少运算符
      return {
        validateStatus: 'error',
        message: '操作数之间必须有运算符',
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
      message: '公式必须包含至少一个操作数',
    };
  }

  // 步骤3: 检查操作数为空值
  if (
    val.formula?.some(
      (e) => typeof e === 'object' && (isInvalidValue(e.value) || isInvalidValue(e.type)),
    )
  ) {
    return {
      validateStatus: 'error',
      message: '公式每项不能为空',
    };
  }

  return {
    validateStatus: undefined,
    message: undefined,
  };
};
