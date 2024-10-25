/** @type {import('next').NextConfig} */
// const nextConfig = {
//     experimental: {
//     esmExternals: "loose", // <-- add this
//     serverComponentsExternalPackages: ["mongoose"] // <-- and this
//   },
//   // and the following to enable top-level await support for Webpack
//   webpack: (config) => {
//     config.experiments = {
//       topLevelAwait: true
//     };
//     return config;
//   },
// };

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
