const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    app:'./src/index.js' 
  } ,

  output: {
    path: path.join(__dirname, "/dist"), //on peut méttre path: 'chemin absolue complet'
    publicPath: '',
    filename: "main.js"
  },

  mode: "development", //au niveau de partie developpement

  devServer: {
    static: {
              directory: path.join(__dirname, "build")
            },
            devMiddleware: {
            writeToDisk: true,
            },
            port: 1996,
          },

  module: {
    rules: [
        {
          test: /\.html$/,
          use:  [ 
            {
              loader: 'html-loader',
              options: {
                minimize: true, //pour minimiser le taille
              },
            }
          ]
        },
        
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../' 
              },
            },
            'css-loader'
            
    
          ] //obliger à "css-loader" à la fin du tab et  on trouve de probléme style-loader au niveau de version (1.2.1 c'est le plus bien)
        },

        {
          test: /\.(png|svg|jpe?g|gif)$/, // /\.(png|svg|jpg|jpeg|gif)$/i,
          use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]', //pour remplacer le le numéro qui s'affiche dans le fichier dist
                    outputPath: "images", // pour metter le fichier de resultat  dans le dossier images 
                    // limit: 8192 //pour limiter le taille max du l'image 
                  }
                },
              ]
        },

        {
          test: /\.(svg|eot|woff|woff2|ttf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: "fonts", //resultat il va étre dans le dossier fonts dans dist
                esModule: false ,
              }
            }
          ]
        },
        {

        }

    ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", 
      template: "./src/index.html"
    }),

    new MiniCssExtractPlugin({ filename: "css/style.css"}),

    new OptimizeCssAssetsPlugin({}),
  ],
}

