const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
    // entry: "./src/index.tsx",
    entry: {
        popup: path.join(__dirname, "src", "index.tsx"),
        contentScript: path.join(__dirname, "src", "contentScript.ts"),
    },
    // output: {
    //     filename: "bundle.js",
    //     path: path.resolve(__dirname, "dist"),
    // },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: "public/manifest.json", to: "." },
                { from: "public/index.html", to: "." },
                { from: "public/icon_16.png", to: "." },
                { from: "public/icon_48.png", to: "." },
                { from: "public/icon_128.png", to: "." },
            ],
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 9000,
    },
};
