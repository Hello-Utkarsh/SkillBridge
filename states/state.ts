import { atom } from "recoil";

export const localBranch = atom({
    key: 'remoteBranch', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });