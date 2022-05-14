/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// const webpack = require('webpack');
// const path = require('path');
// const packageName = require('./package.json').name;
// var logo = require("fs").readFileSync("./logo.txt", 'utf8').replace('$projectname', packageName);
// console.warn(`\n${logo}\n`);

// // const raw_loader = require('raw-loader');

// // console.error(raw_loader);
// //    loader: require.resolve('raw-loader'),
// module.exports = {


//   module: {
//     rules: {
//       test: /\.(txt|md)$/,
//       use: {
//         loader: 'raw-loader',
//         options: "merge",
//       }
//     }
//   }
//   // module: { rules: [{ test: /\.(txt|md)$/, use: [{ loader: require.resolve('raw-loader'), options: "merge" }] }] }
// };
// // import { AngularWebpackPlugin } from '@ngtools/webpack';
// // import { Configuration } from 'webpack';
// // export default (config: Configuration): Configuration => {
// //   const index = config.plugins.findIndex(p => p instanceof AngularWebpackPlugin);
// //   const options = (config.plugins[index] as AngularWebpackPlugin).options;
// //   options.directTemplateLoading = false;
// //   config.plugins.splice(index, 1, new AngularWebpackPlugin(options));

// //   config.module.rules.push({
// //     test: /\.pug$/,
// //     use: [
// //       { loader: require.resolve('raw-loader') },
// //       { loader: require.resolve('pug-plain-loader') },
// //     ],
// //   });
// //   return config;
// // };


import { Configuration, DefinePlugin } from 'webpack';


// /**
//  * This is where you define your additional webpack configuration items to be appended to
//  * the end of the webpack config.
//  */
// export default {

//   // rules: [{
//   //   test: /\.(txt|md)$/,
//   //   use: [{
//   //     loader: 'raw-loader',
//   //     options: "merge",
//   //   }]
//   // }],
//   module: {
//     rules: [
//       {
//         test: /\.(txt|md)$/,
//         use: [
//           {
//             loader: require.resolve('raw-loader')
//           }
//         ]
//       }]
//   }


// } as Configuration;











// import { Configuration, DefinePlugin } from 'webpack';
import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
/**
 * This is where you define a function that modifies your webpack config
 */
export default (cfg: Configuration, opts: CustomWebpackBrowserSchema, targetOptions: TargetOptions) => {


  cfg.module?.rules?.push({
    // test: /\.(txt|md)/,
    test: (file) => {
      if (file.endsWith('.txt')) {
        console.warn(file);
        return true;
      }
      return false;
    },
    type: 'javascript/auto',
    use: [{
      loader: require.resolve('raw-loader'),
      options: {
        esModule: false
      }
    }],
    // loader: ,
    // resolve: {
    //   fullySpecified: true
    // },
    enforce: "pre"
  });

  // console.warn(JSON.stringify(cfg));

  // cfg.plugins!.push(
  //   new HtmlWebpackPlugin({
  //     filename: 'footer.html',
  //     template: 'src/footer-template.html',
  //   }),
  //   new DefinePlugin({
  //     APP_VERSION: JSON.stringify(version),
  //   })
  // );

  return cfg;
};



// https://webpack.js.org/guides/asset-modules/