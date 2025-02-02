import csso from 'postcss-csso';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import {LogLevel, RollupOptions} from 'rollup';
import postcss from 'rollup-plugin-postcss';

const isProduction = process.env.NODE_ENV === 'production';
const folder = isProduction ? 'prod' : 'dev';

const cssEntry = (input: string, output: string) => ({
    input,
    logLevel: 'warn' as LogLevel,
    plugins: [
        postcss({
            extract: true,
            sourceMap: !isProduction,
            plugins: [
                postcssImport({
                    plugins: [
                        postcssNested(),
                        csso({comments: false, restructure: false}),
                    ],
                }),
            ],
        }),
    ],
    output: [
        {
            file: output,
            sourcemap: !isProduction,
            strict: true,
        },
    ],
});

const packageConfig: () => Promise<RollupOptions[]> = async () => ([
    cssEntry('./src/nada/main.css', `../../../dist/${folder}/themes/nada.css`),
    cssEntry('./src/fest/main.css', `../../../dist/${folder}/themes/fest.css`),
    cssEntry('./src/luna/main.css', `../../../dist/${folder}/themes/luna.css`),
    cssEntry('./src/nova/main.css', `../../../dist/${folder}/themes/nova.css`),
]);

export default packageConfig;
