/*
 * @Date: 2024-01-13 13:11:45
 * @Description: Modify here please
 */
import { dirname, resolve } from "path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
// 根目录
export const pathRoot = resolve(dir, "..");
// srx
export const pathSrc = resolve(pathRoot, "src");
// 组件目录
export const pathComponents = resolve(pathSrc, "components");
// 输出目录
export const pathOutput = resolve(pathRoot, "dist");
