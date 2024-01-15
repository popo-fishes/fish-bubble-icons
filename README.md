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
   import Icon, { Close as CloseIcon, createFromIconfont } from "@fish-bubble/icons";
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

   // @fish-bubble/icons自带的图标
   <CloseIcon size="20px" color="red" class="custom-class" />
 </template>

 // 自定义图标
 <p>利用 Icon 组件封装一个可复用的自定义图标。可以通过插槽传入一个 svg 组件来渲染最终的图标，以满足特定的需求。</p>
 <template>
   // size为number时不需要接上px
   <Icon :size="22" color="red">
      <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
        <path
          d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
        />
      </svg>
   </Icon>
 </template>
```
