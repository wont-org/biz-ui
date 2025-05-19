export interface DataItem extends Record<string, any> {
  key: number;
  colA: string;
  colB: string;
  colC: string;
  other: string;
}

export const initialData: DataItem[] = [
  { key: 1, colA: 'A', colB: 'B', colC: 'C', other: '指标1', '2025-01-01': 1 },
  { key: 2, colA: 'A', colB: 'B', colC: 'C', other: '指标2', '2025-01-01': 2 },
  { key: 3, colA: 'A', colB: 'B', colC: 'C', other: '指标3', '2025-01-01': 3 },
  { key: 4, colA: 'A1', colB: 'B1', colC: 'C1', other: '指标4', '2025-01-01': 4 },
  { key: 5, colA: 'A1', colB: 'B1', colC: 'C1', other: '指标5', '2025-01-01': 5 },
  { key: 6, colA: 'A2', colB: 'B2', colC: 'C2', other: '指标6', '2025-01-01': 6 },
  { key: 7, colA: 'A2', colB: 'B2', colC: 'C2', other: '指标7', '2025-01-01': 7 },
  { key: 8, colA: 'A3', colB: 'B3', colC: 'C3', other: '指标8', '2025-01-01': 8 },
  { key: 9, colA: 'A3', colB: 'B3', colC: 'C3', other: '指标9', '2025-01-01': 9 },
  { key: 10, colA: 'A4', colB: 'B4', colC: 'C4', other: '指标10', '2025-01-01': 10 },
  { key: 11, colA: 'A4', colB: 'B4', colC: 'C4', other: '指标11', '2025-01-01': 11 },
  { key: 12, colA: 'A5', colB: 'B5', colC: 'C5', other: '指标12', '2025-01-01': 12 },
  { key: 13, colA: 'A5', colB: 'B5', colC: 'C5', other: '指标13', '2025-01-01': 13 },
  { key: 14, colA: 'A6', colB: 'B6', colC: 'C6', other: '指标14', '2025-01-01': 14 },
  { key: 15, colA: 'A6', colB: 'B6', colC: 'C6', other: '指标15', '2025-01-01': 15 },
];
