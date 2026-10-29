// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Serve the prerendered SPA shell as static output for Vercel.
  nitro: false,
  vite: {
    base: "/",
    environments: {
      client: {
        build: {
          outDir: "dist",
        },
      },
      ssr: {
        build: {
          outDir: ".output/server",
        },
      },
    },
  },
  tanstackStart: {
    // Use the SSR error wrapper while generating the static SPA shell.
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: {
        outputPath: "/index",
      },
    },
  },
});
