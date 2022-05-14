const webpack = require('webpack');
console.log('\n运行了我的自定义webpack设置');


const packageName = require('./package.json').name;

//  const logContent = require('./logo.json');
// console.log(logContent);


module.exports = {
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    }

    // "plugins": [
    //     ["prismjs", {
    //         "languages": ["javascript"],
    //         "plugins": ["line-numbers"],
    //         "theme": "twilight",
    //         "css": true
    //     }]
    // ]
};