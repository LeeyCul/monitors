import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    dva: {
        immer: true,
        hmr: false,
    },
    routes,
    proxy: {
        '/v1': {
            target: 'http://hwy.feelbang.com:8080',
            pathRewrite: { '^/v1': '' },
            changeOrigin: true
        }
    }
});
