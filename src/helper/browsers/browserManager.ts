// import { LaunchOptions, chromium, firefox, webkit } from "playwright-core";

// const options: LaunchOptions = {
//     headless: !true
//     // headless: true
// }
// export const invokeBrowser = () => {
    
//     const browserType = process.env.npm_config_BROWSER || "edge";
//     args: ['--ignore-certificate-errors']
//     switch (browserType) {
//         case "chrome":
//             return chromium.launch(options);
//         case "firefox":
//             return firefox.launch(options);
//         case "webkit":
//             return webkit.launch(options);
//         case "edge":
//             return webkit.launch(options);
//         default:
//             throw new Error("Please set the proper browser!")
//     }

// }


import { LaunchOptions, chromium, firefox, webkit } from "playwright-core";

const options: LaunchOptions = {
  headless: false, // set true to run headless
  // headless: true,
  args: ['--ignore-certificate-errors'],
};

export const invokeBrowser = () => {
  const browserType = (process.env.npm_config_BROWSER || "edge").toLowerCase();

  switch (browserType) {
    case "chrome":
      return chromium.launch(options);

    case "firefox":
      return firefox.launch(options);

    case "webkit":
      return webkit.launch(options);

    case "edge":
      return chromium.launch({
        ...options,
        executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", // path string is correctly escaped
      });

    default:
      throw new Error("Please set a valid browser: chrome, firefox, webkit or edge");
  }
};