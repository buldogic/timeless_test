import { getUserUlr } from "./getUserUrl";

export const getUser = async (): Promise<any> => {
  const res = await fetch(getUserUlr());
  return res.json();
};
