<!--
 * @Date: 2023-12-30 11:43:31
 * @Description: Modify here please
-->
<p align="center">
  <img width="300px" height="250px" src="https://cdn.yupaowang.com/yupao_pc/images/pl/fish-bubble-design-logo.png">
</p>

<p align="center">fish-bubble-icons - 用于存储 fish bubble 图标资源的主包</p>

### 安装

```shell
 # NPM
$ npm install @fish-bubble/icons
# Yarn
$ yarn add @fish-bubble/icons
# pnpm
$ pnpm install @fish-bubble/icons
```

### 使用方法

```shell

 <script setup lang="ts">
   import { Close, createFromIconfont } from "@fish-bubble/icons";
   // 如果你是使用 iconfont.cn
   /**
    * 对于使用 iconfont.cn 的用户，通过设置 createFromIconfont 方法参数对象中的 scriptUrl 字段，
    *  即可轻松地使用已有项目中的图标
    */
   const IconFont = createFromIconfont({
    scriptUrl: '//at.alicdn.com/t/c/font_4341410_dda0iswxhbi.js',
  });
 </script>

 <template>
   // 如果你是使用 iconfont.cn
   // 使用createFromIconfont时: SVG图标自带颜色：某些SVG图标可能已经自带颜色，这会导致您在CSS中设置的样式无效
   <IconFont type="yp-fangda" size="22px" color="red" />

   <Close size="20px" color="red" class="custom-class" />
 </template>

```
