import { JSX } from "hastscript/jsx-runtime";
import * as siRaw from "simple-icons";

export default Object.fromEntries(
  Object.entries(siRaw).map(([name, value]) => [
    name,
    { type: "raw", value: value.svg.replaceAll("<svg", '<svg class="icon"') },
  ]),
) as { [K in keyof typeof siRaw]: JSX.Element };
