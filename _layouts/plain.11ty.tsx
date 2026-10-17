import { DateTime } from "luxon";

import { Page } from "../types.ts";

export const data = { layout: "default.11ty.tsx" };

export const render = ({ content }: { content: string }) => (
  <main class="plain">{{ type: "raw", value: content }}</main>
);
