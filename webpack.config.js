// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var theModule = {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015','react']
            }
        }
    ]
};

var sourceTemplate = 'react-causality-redux';
var source = sourceTemplate + ".js";
var minFileName = sourceTemplate + ".min.js";

var externalsTest = {
    "causality-redux": "require('causality-redux')",
    "react-redux": "require('react-redux')",
    "react": "require('react')",
    "react-dom": "require('react-dom')",
    "redux": "require('redux')",
}

var externals = {
    "causality-redux": "CausalityRedux",
    "react-redux": 'ReactRedux',
    "react": 'React',
    "react-dom": 'ReactDOM',
    "redux": 'Redux',
}

var externalsLib = {
    "causality-redux": "causality-redux",
    "react-redux": 'react-redux',
    "react": 'react',
    "react-dom": 'react-dom',
    "redux": 'redux',
}

var configDistCausalityReduxReact = {
        entry: path.join(__dirname, 'src/' + source),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: source,
        },
        externals: externals,
        module: theModule
}

var configTestCausalityReduxReact = {
        entry: path.join(__dirname, 'test/' + "react-test.js"),
        output: {
            path: path.join(__dirname, 'test'),
            filename: "react-test-es5.js",
        },
        externals: externalsTest,
        module: theModule
}

var configLibCausalityReduxReact = {
    entry: path.join(__dirname, 'src/' + source),
    output: {
        path: path.join(__dirname, 'lib'),
        filename: source,
        libraryTarget: 'commonjs2',
    },
    externals: externalsLib,
    module: theModule
}

var configDistCausalityReduxReactMin = {
        entry: path.join(__dirname, 'dist/' + source),
        output: {
            path: path.join(__dirname, 'dist'),
            filename: minFileName
        },

        plugins: [
           new ClosureCompilerPlugin({
              compiler: {
                language_in: "ECMASCRIPT5",
                language_out: "ECMASCRIPT5",
                compilation_level: "SIMPLE"
              },
            })
        ]
}

if ( process.env.NODE_ENV != 'min' ) {
    module.exports = [
        configDistCausalityReduxReact,
        configLibCausalityReduxReact,
        configTestCausalityReduxReact
    ];
} else {
    module.exports = [
        configDistCausalityReduxReactMin
    ];
}

