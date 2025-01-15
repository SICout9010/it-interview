import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// serializeNonPOJOs for Pocketbase
export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
}

