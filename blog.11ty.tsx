import { EleventyFuns } from "./types.ts";

export const render = async function (this: EleventyFuns, data: unknown) {
  return {
    type: "raw",
    value: await this.renderFile("_includes/blog.11ty.tsx", data),
  };
};
