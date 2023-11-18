export interface FetchInitData {
  bgImg: string
  gapImg: string
  y: number
}
export type VoidFn = () => void

export type PromiseBoolFn = ({ x: number }) => Promise<boolean>
export type PromiseFetchDataFn = () => Promise<FetchInitData | undefined>

export interface PuzzleCaptchaProps {
  // 320
  width?: number
  // 180
  height?: number
  // false
  useMask?: boolean
  // false
  visible?: boolean
  // 安全验证
  title?: string
  // 滑动完成拼图
  sliderTip?: string
  // 验证通过
  successMsg?: string
  // 验证失败，请重试
  failMsg?: string
  onSuccess?: VoidFn
  onFail?: VoidFn
  onClose?: VoidFn
  // false
  useFetch?: boolean
  fetchData?: PromiseFetchDataFn
  validator?: PromiseBoolFn
}
