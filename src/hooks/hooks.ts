import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";
import { DependencyList, useEffect } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useDebounceEffect = (
  fn: () => void,
  waitTime: number,
  deps?: DependencyList
) => {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
};
