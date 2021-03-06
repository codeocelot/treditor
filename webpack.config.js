var webpack = require('webpack')
module.exports = {
	devtool:'eval',
	entry: [
			'./js/index.js',
			'./style/style.scss',
			'./node_modules/font-awesome/scss/font-awesome.scss',
			'./node_modules/skeleton-scss/scss/skeleton.scss'
			// './node_modules/bootstrap/less/mixins/grid-framework.less',
			// './node_modules/bootstrap/less/grid.less'
	],
	output:{
		filename:'bundle.js',
		path:__dirname + '/dist',
		publicPath: 'dist/'
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
			{
				test:/\.js$/,
				loader:"eslint-loader",
				exclude:"/node_modules/"
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css", "sass"]
			},
			// {
			// 	test: /\.less$/,
			// 	loaders: ["style", "css", "less"]
			// },
			// USE THIS IF YOU'RE USING VANILLA CSS
			// {
			// 	test:/\.css$/,
			// 	loaders:["style","css"]
			// },
			{test   : /\.(ttf|eot|svg|woff(2)?).*$/,
				loader : 'file-loader'
			}
		]
	}
}
