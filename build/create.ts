/*
 * @Date: 2024-01-13 13:11:45
 * @Description: Modify here please
 */
import path from "path";
import { readFile, writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import { emptyDir, ensureDir } from "fs-extra";
import camelcase from "camelcase";
import glob from "fast-glob";
import { format } from "prettier";

import { pathComponents, pathSrc } from "./paths";

function getName(file: string) {
  // 获取文件名
  const filename = path.basename(file).replace(".svg", "");
  // 驼峰命名
  const componentName = camelcase(filename, { pascalCase: true });
  return {
    filename,
    componentName
  };
}
// https://prettier.io/docs/en/options
function formatCode(code: string, parser: string = "typescript") {
  return format(code, {
    // 解析器
    parser,
    // 在语句末尾打印分号
    semi: false,
    // 使用单引号而不是双引号。
    singleQuote: true
  });
}

async function createVueComponent(file: string) {
  const content = await readFile(file, "utf-8");
  const { filename, componentName } = getName(file);

  const { document } = new JSDOM(`<!DOCTYPE html>${content}`).window as any;

  // 设置属性
  const svgElement = document.querySelector("svg");

  Array.from(svgElement.attributes).forEach((attr: any) => {
    svgElement.removeAttribute(attr.name);
  });

  svgElement.setAttribute("width", "1em");
  svgElement.setAttribute("height", "1em");
  /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
  svgElement.setAttribute("fill", "currentcolor");

  const vue = await formatCode(
    `
  <template>
  <Icon>
   ${svgElement.outerHTML}
  </Icon>
  </template>
  <script lang="ts" setup>
  import Icon from '../icon/index.vue'
  defineOptions({
    name: ${JSON.stringify(componentName)}
  })
  </script>`,
    "vue"
  );
  // console.log(vue);
  await writeFile(path.resolve(pathComponents, `${filename}.vue`), vue, "utf-8");
}

// 创建入口
async function createEntry(files: string[]) {
  const code = await formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file);
        return `export { default as ${componentName} } from './${filename}.vue'`;
      })
      .join("\n")
  );
  await writeFile(path.resolve(pathComponents, "index.ts"), code, "utf-8");
}

// https://github.com/jprichardson/node-fs-extra/blob/master/docs/ensureDir.md
await ensureDir(pathComponents);
// https://github.com/jprichardson/node-fs-extra/blob/master/docs/emptyDir.md
await emptyDir(pathComponents);

// 获取文件
const files = await glob("*.svg", { cwd: path.join(pathSrc, "svg"), absolute: true });

await Promise.all(files.map((file) => createVueComponent(file)));

await createEntry(files);
