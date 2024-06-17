import { esbuildPlugin } from "@web/dev-server-esbuild";
import { jasmineTestRunnerConfig } from "web-test-runner-jasmine";

export default {
  ...jasmineTestRunnerConfig(),
  files: ["./browserstack/*.ts"],
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: "auto",
      tsconfig: "./tsconfig.json",
    }),
  ],
};

// import { playwrightLauncher } from '@web/test-runner-playwright';
// import { esbuildPlugin } from '@web/dev-server-esbuild';

// export default ({
//     testFramework: {
//           config: {
//                   timeout: 10000
//                 },
//         },
//     nodeResolve: true,
//     files: ['./src/*.spec.ts'],
//     browsers: [playwrightLauncher({ product: 'chromium' })],
//     plugins: [esbuildPlugin({ ts: true,son: true, target: 'auto', sourceMap: true })]
// });
