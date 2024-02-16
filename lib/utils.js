import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getLocalStorage = () => {
  const defaultLocalStorage = {
    getItem: () => null,
    setItem: () => null
  }
  try{
    if (window === undefined)
      return defaultLocalStorage
    return localStorage
  } catch (e) {
    return defaultLocalStorage
  }
}

