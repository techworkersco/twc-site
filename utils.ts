import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";

export const nmap = <X, R>(
   x: X | undefined | null,
   f: (x: X) => R,
): R | undefined => {
   if (x == null) return;
   return f(x);
};

export const htmlToText = (x: string) => {
   const ast = fromHtml(x);
   return toText(ast);
};
