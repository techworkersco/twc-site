import { readFile } from "node:fs/promises";

export const inlineSvg = async (filename) => ({
  type: "raw",
  value: (await readFile(`_includes/inline-svgs/${filename}.svg`)).toString(),
});

// todo(maximsmol): add .icon to these? seems like they are purely decorative
// and the .icon-lines ones don't need it
export const PAIcon = async (icon: string) => ({
  type: "raw",
  value: (
    await readFile(`node_modules/pixelarticons/svg/${icon}.svg`)
  ).toString(),
});
