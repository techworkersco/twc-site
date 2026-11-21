import { JSX } from "hastscript/jsx-runtime";
import * as lucideStatic from "lucide-static";

export default Object.fromEntries(
  Object.entries(lucideStatic).map(([name, value]) => [
    name,
    { type: "raw", value },
  ]),
) as { [K in keyof typeof lucideStatic]: JSX.Element };
