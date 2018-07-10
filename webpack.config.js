const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    devtools: './src/devtools/devtools.js',
    hook: './src/backend/hook.js' ,
  },
  output: {
    path: path.resolve('./build/'),
    filename: '[name].js',
    publicPath: '.'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        include: path.resolve('./src'),
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                // limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
     }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './manifest.json', to: 'manifest.json' },
      { from: './src/devtools/devtools.html', to: 'devtools.html' },
      { from: './background.js', to: 'background.js' },
      { from: './content-script.js', to: 'content-script.js' },
      { from: './src/img', to: 'img' },
    ]),
  ],
};
