import { esbuildPlugin } from "@web/dev-server-esbuild";
import { legacyPlugin } from "@web/dev-server-legacy";
import { jasmineTestRunnerConfig } from "web-test-runner-jasmine";
import { browserstackLauncher } from "@web/test-runner-browserstack";

if (
  process.env.BROWSERSTACK_USERNAME === undefined ||
  process.env.BROWSERSTACK_ACCESS_KEY === undefined
) {
  throw new Error(
    "The environment variables BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY are required to run tests on browserstack.",
  );
}

// options shared between all browsers
const sharedCapabilities = {
  "browserstack.user": process.env.BROWSERSTACK_USERNAME,
  "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,

  concurrentBrowsers: 2,

  project: "connect-web",
  name: "browserstack-tests",

  build: `build ${process.env.GITHUB_RUN_NUMBER || "unknown"}`,
  video: false,
  interactiveDebugging: true,
};

export default {
  ...jasmineTestRunnerConfig(),
  files: ["./browserstack/*.ts"],
  testsStartTimeout: 120000,
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: "auto",
      tsconfig: "./tsconfig.json",
    }),
    legacyPlugin(),
  ],
  concurrentBrowsers: 1,
  concurrency: 1,
  browsers: [
    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Safari",
        device: "iPhone 11",
        os: "ios",
        osVersion: "13",
      },
    }),

    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Safari",
        browser_version: "11.1",
        os: "OS X",
        os_version: "High Sierra",
        resolution: "1024x768",
      },
    }),

    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Chrome",
        browser: "chrome",
        browser_version: "60.0",
        os: "Windows",
        os_version: "10",
        resolution: "1024x768",
      },
    }),

    browserstackLauncher({
      capabilities: {
        ...sharedCapabilities,
        browserName: "Firefox",
        browser: "firefox",
        browser_version: "67.0",
        os: "Windows",
        os_version: "10",
        resolution: "1024x768",
      },
    }),
  ],
};
