/*
 * @Date: 2024-01-13 13:11:45
 * @Description: Modify here please
 */
import path from "node:path";
import type { BuildOptions, Format } from "esbuild";
import { build } from "esbuild";
import vue from "unplugin-vue/esbuild";
import { emptyDir } from "fs-extra";

import { pathOutput, pathSrc } from "./paths";

const buildBundle = () => {
  const getBuildOptions = (format: Format) => {
    const options: BuildOptions = {
      // https://esbuild.github.io/api/#entry-points
      entryPoints: [path.resolve(pathSrc, "index.ts")],
      // https://esbuild.github.io/api/#target
      target: "es2018",
      // https://esbuild.github.io/api/#platform
      platform: "neutral",
      plugins: [
        vue({
          isProduction: true,
          sourceMap: false,
          // 在 Vue 模板中，静态节点是指在组件渲染期间不需要变化内容的节点。
          // 由于这些节点的内容不会随着渲染而改变，它们可能会被 Vue 编译器优化为静态内容
          //，从而提高组件的性能。在一些情况下，静态节点的提升可能会产生意外的行为，例如跨越插槽边界的情况。
          // 此时，你可以使用 hoistStatic 选项来控制静态节点的提升行为。
          template: { compilerOptions: { hoistStatic: false } }
        })
      ],
      // https://esbuild.github.io/api/#bundle
      bundle: true,
      format,
      // minify: true,
      // https://esbuild.github.io/api/#minify
      minifySyntax: true,
      // https://esbuild.github.io/api/#external
      external: ["vue"],
      outdir: pathOutput
    };

    return options;
  };
  const doBuild = async () => {
    await Promise.all([
      build({
        ...getBuildOptions("esm"),
        // https://esbuild.github.io/api/#entry-names
        entryNames: `[name]`,
        // https://esbuild.github.io/api/#out-extension
        outExtension: { ".js": ".mjs" }
      }),
      build({
        ...getBuildOptions("cjs"),
        entryNames: `[name]`
      })
    ]);
  };

  return doBuild();
};

await emptyDir(pathOutput);

await buildBundle();
