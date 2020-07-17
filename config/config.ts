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
});
