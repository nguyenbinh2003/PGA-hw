import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../stores/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
) => useSelector<RootState, TSelected>(selector);
