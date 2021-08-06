import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const __dirname = path.resolve();
const mode = process.env.NODE_ENV || 'development'; // 기본값을 development로 설정

export default () => {
  return {
    mode: mode,
    entry: './src/App.ts',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
          use: {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]?[hash]',
            },
          },
        },
        {
          test: /\.(js|ts)$/, // .js, .ts 확장자로 끝나는 모든 파일
          use: {
            loader: 'babel-loader', // babel-loader 적용
          },
          exclude: /(node_modules)/,
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            mode !== 'production'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader, // style-loader : 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더, min~~로더 : 파일 쪼개기
            'css-loader', // CSS 파일을 모듈처럼 불러와 사용할 수 있게 도와줌
            'sass-loader', // sass 사용
          ],
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/public/images/favicon.ico',
      }), // HTML 파일을 후처리하는데 사용, 빌드 타임의 값을 넣거나 코드를 압축
      new CleanWebpackPlugin(), // 빌드 이전 결과물을 제거하는 플러그인
      new MiniCssExtractPlugin({
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        filename: '[name].css',
      }),
    ],
    optimization: {
      minimizer:
        mode === 'production'
          ? [
              new CssMinimizerPlugin(),
              new TerserPlugin({
                //  자바스크립트 코드를 난독화하고 debugger 구문을 제거
                terserOptions: {
                  compress: {
                    drop_console: true, // 콘솔 로그를 제거한다
                  },
                },
              }),
            ]
          : [],
    },
    devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.resolve(__dirname + '/dist'),
      index: 'index.html',
      port: 9000,
      writeToDisk: true,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/api/': {
          // /api/로 시작하는 url은 아래의 전체 도메인을 추가하고, 옵션을 적용
          target: 'http://localhost:3000', // 클라이언트에서 api로 보내는 요청은 주소를 3000으로 변경
          changeOrigin: true, // cross origin 허용 설정
        },
      },
    },
  };
};
