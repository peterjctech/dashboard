const Path = require("path");
const vuePlugin = require("@vitejs/plugin-vue");

const { defineConfig } = require("vite");

const config = defineConfig({
    root: Path.join(__dirname, "..", "src", "renderer"),
    publicDir: "public",
    server: {
        port: 8080,
    },
    open: false,
    build: {
        outDir: Path.join(__dirname, "..", "build", "renderer"),
        emptyOutDir: true,
    },
    plugins: [vuePlugin()],
    resolve: {
        alias: {
            "@assets": Path.join(__dirname, "..", "src", "renderer", "assets"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/renderer/styles/index.scss";`,
            },
        },
    },
});

module.exports = config;
