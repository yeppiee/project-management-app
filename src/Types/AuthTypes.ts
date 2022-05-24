import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
export type AuthPropsType = {
  type: string,
}
export type HookFormType = {
  name: string,
  login: string,
  password: string,
}
export type AuthDataType = {
  name: string;
  login: string;
  password: string;
}
export type SignInDataType = {
  login: string;
  password: string;
}
export type ResTokenData = {
  token: string;
}
export type ResTokenType = { token: string; }
export type SignUpResType = {
  id: string;
  name: string;
  login: string;
}