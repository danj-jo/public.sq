// remix-env.d.ts
import type { VitePluginConfig } from "@remix-run/dev";

declare module "@remix-run/dev" {
  interface VitePluginConfig {
    unstable?: {
      hmr?: boolean;
    };
  }
}