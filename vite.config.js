const { resolve } = require("path");

module.exports = {
    build: {
        input: {
            main: resolve(__dirname, "index.html"),
            nested: resolve(__dirname, "about/about.html")
        }
    }
}