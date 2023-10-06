import {MyResponse} from "./myResponse";

export interface MyLoginResponse extends MyResponse{
  userId: number,
  token: string
}
