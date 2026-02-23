export const nmap = <X, R>(
   x: X | undefined | null,
   f: (x: X) => R,
): R | undefined => {
   if (x == null) return;
   return f(x);
};

let nextAriaId = 0;
export const makeAriaId = (prefix = ""): string => {
   const cur = nextAriaId;
   ++nextAriaId;

   if (prefix.length > 0) prefix = `-${prefix}`;

   return `aria${prefix}-${cur}`;
};
