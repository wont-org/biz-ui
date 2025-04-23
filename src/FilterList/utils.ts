export type CustomOp = { value: string; label: string };

export function updateOperatorsByFilterMap<
  T extends Record<string, CustomOp>,
  M extends Record<string, Array<CustomOp & { component?: any }>>,
>(operators: T, filterMap: M): T {
  // 先浅复制一份，免得改到原对象
  const newOps = { ...operators };

  // 拿到所有字段里的操作符项
  const items = Object.values(filterMap).flat();

  // 去重，避免多次改同一个
  const seen = new Set<string>();

  for (const item of items) {
    if (seen.has(item.label)) {
      continue;
    }
    seen.add(item.label);

    // 在原始 OPERATORS 里找到 label 一致的 key
    const opKey = (Object.keys(operators) as Array<keyof T>).find(
      (k) => operators[k].label === item.label,
    );

    if (opKey) {
      // 替换 value，label 保持不变
      newOps[opKey] = {
        ...newOps[opKey],
        value: item.value,
      };
    }
  }

  return newOps;
}
