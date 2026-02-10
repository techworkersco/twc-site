export const nmap = <X, R>(
   x: X | undefined | null,
   f: (x: X) => R,
): R | undefined => {
   if (x == null) return;
   return f(x);
};
