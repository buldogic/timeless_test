const URL: string = "https://randomuser.me/";

const USERCOUNT: number = 500;

export const getUserUlr = (url: string = URL): string => {
  return `${url}api/?results=${USERCOUNT}`;
};
