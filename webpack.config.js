//https://webpack.js.org/guides/getting-started/#using-a-configuration

// El archivo de configuración nos va ayudar a poder establecer la configuración y elementos que vamos a utilizar
// Para poder crear el archivo de configuración en la raíz del proyecto creamos un archivo llamado webpack.config.js
// En el mismo debemos decir
// El punto de entrada
// Hacia a donde a enviar la configuración de nuestro proyecto
// Las extensiones que vamos usar

const path = require('path');
const HtmlWebpackPlugin=require("html-webpack-plugin")
const MiniCssExtractPlugin=require("mini-css-extract-plugin")
const CopyPlugin=require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/index.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
    assetModuleFilename:"assets/images/[hash][ext][query]"
  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
    extensions: [".js"]
  },
  module:{
    rules:[
    {
      test:/\.m?js$/, //incluir
      exclude:/node_modules/,//no utilices nada de node modules
      use:{
        loader:"babel-loader"//el loader que utilizara para transformar los archivos
      }
    },
    {
    test:/\.css|.styl$/i,
    use:[
      MiniCssExtractPlugin.loader,"css-loader","stylus-loader"

    ],
  },
  {
    test:/\.png/,
    type:"asset/resource"
  },
  {
    test:/\.(woff|woff2)$/,
    use:{
      loader:"url-loader",
      options:{
        limit:10000,
        mimetype:"aplicatio/fotn-woff",
        name:"[name].[contenthash].[ext]",
        outputPath:"./assets/fonts/",
        publicPath:"./assets/fonts/",
        esModule:false,

      }
    }
  }
  ]
},
  plugins:[
    new HtmlWebpackPlugin({
      inject:true,
      template:"./public/index.html",
      filename:"./index.html"
    }),
    new MiniCssExtractPlugin({
      filename:"assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns:[{
        from:path.resolve(__dirname,"src","assets/images"),
        to:"assets/images"
      }]
    })
  ],
  optimization:{
    minimize:true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
}
