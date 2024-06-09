/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

import { aspectRatioOptions } from "../constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// handleError

export const handleError = (err: any) => {
  if (err instanceof Error) {
    console.error(err.message);
    throw new Error(`ERROR: ${err.message}`);
  } else if (typeof err === "string") {
    console.error(err);
    throw new Error(`ERROR: ${err}`);
  } else {
    console.error(err);
    throw new Error(`ERROR: ${JSON.stringify(err)}`);
  }
};

export const formUrlQuery=({
  searchParams,
  key,
  value
}:FormUrlQueryParams)=>{
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
}

export function removeKeys({
  searchParams,
  keysToRemove
}:RemoveUrlQueryParams){
  const currUrl=qs.parse(searchParams)
  keysToRemove.forEach(key=>delete currUrl[key])

  Object.keys(currUrl).forEach(key=>currUrl[key]==null && delete currUrl[key])

  return `${window.location.pathname}?${qs.stringify(currUrl)}`;
}