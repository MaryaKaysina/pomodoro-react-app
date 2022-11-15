import { assoc } from "../js/assoc";

export const generateRandomString = () => Math.random().toString(36).substring(2, 15);

// generateRandomString вызывается 1 раз
export const assignId = () => assoc('id', generateRandomString());

// generateRandomString вызывается каждый раз, когда вызывается ф-ия
export const generateId = <O extends object>(obj: O) => assoc('id', generateRandomString())(obj);
