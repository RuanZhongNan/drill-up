import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",

	publicDir: "drill-project",

	server: {
		port: 8080,
		open: true,
	},

	plugins: [
		vue(),
		createHtmlPlugin({
			minify: false,
			entry: "src/main.ts",
			template: "drill-project/index.html",

			/**
			 * 需要注入 index.html ejs 模版的数据
			 */
			inject: {
				data: {
					// 出现在模版中的 <%- title %>
					title: "插件集合示例",

					// 出现在模版中的<%- injectScript %>
					injectScript: `<script type="module" src="../src/main.ts"></script>`,
				},

				tags: [
					{
						injectTo: "body-prepend",
						tag: "div",
						attrs: {
							id: "tag",
						},
					},
				],
			},
		}),
	],
});
