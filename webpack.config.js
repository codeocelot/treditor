var webpack = require('webpack')
module.exports = {
	devtool:'eval',
	entry: [
		// app:
			// [
				'./js/index.js',
				'./style/style.scss'
			// ]
	],
	output:{
		filename:'bundle.js',
		path:__dirname + '/dist',
		publicPath: 'http://localhost:8080/dist/'
		// filename:'./dist/index.js',
	},
	plugins: [
		// kills the compilation upon an error.
		// this keeps the outputed bundle **always** valid
		new webpack.NoErrorsPlugin(),

	],
	module:{
		loaders:[
			{
				test:/\.js?$/,
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets:['react','es2015'/*Enable for ES7*/,'stage-0']
				}
			},
//			{
//				test:/\.js$/,
//				loader:"eslint-loader",
//				exclude:"/node_modules/"
//			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			// USE THIS IF YOU'RE USING VANILLA CSS
			// {
			// 	test:/\.css$/,
			// 	loaders:["style","css"]
			// },
			{test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader : 'file-loader'
			}
		]
	}
}
