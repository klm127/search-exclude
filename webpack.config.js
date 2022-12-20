const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    devtool: 'source-map',
    mode:"production",
    entry: {
        popup: "./js/popup/popup_entry.js",
        google: "./js/contentScripts/google.js",
        duckduckgo: "./js/contentScripts/duckduckgo.js",
        tester: "./js/tests/testEntry.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "[name].js",
        clean: true 
    },
    plugins: [
        new CopyPlugin({ 
            patterns: [
                {from: "assets"}
            ]
        })
    ]
}
