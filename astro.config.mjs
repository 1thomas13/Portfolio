// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// In dev, the old editions (public/v1/, /v2/, /v3/) 404 at /v1/ because Astro's dev server doesn't
// serve index.html from public folders. Vercel does: this mimics it, dev only
const publicDir = fileURLToPath(new URL("./public", import.meta.url));
const publicFolderIndex = {
  name: "public-folder-index",
  apply: /** @type {const} */ ("serve"),
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const [path, query] = (req.url ?? "").split("?");
      if (path.endsWith("/") && path !== "/" && existsSync(publicDir + decodeURIComponent(path) + "index.html")) {
        req.url = path + "index.html" + (query ? "?" + query : "");
      }
      next();
    });
  },
};

// Diary reminder at 22:00 Argentina time (01:00 UTC). The adapter ignores crons in vercel.json, so they're
// added to the config.json it generates. On the Hobby plan, Vercel runs it sometime within that hour
const diaryCron = {
  name: "diary-cron",
  hooks: {
    "astro:build:done": () => {
      const file = fileURLToPath(new URL("./.vercel/output/config.json", import.meta.url));
      if (!existsSync(file)) return;
      const config = JSON.parse(readFileSync(file, "utf8"));
      config.crons = [{ path: "/api/remind", schedule: "0 1 * * *" }];
      writeFileSync(file, JSON.stringify(config, null, 2));
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: "https://thomasbarreto.vercel.app",
  // Everything is static except routes with prerender = false (diary, /api/remind, /v0)
  adapter: vercel(),
  integrations: [diaryCron],
  // With the adapter, Vercel ignores vercel.json: redirects go here (the /v0 one lives in src/pages/v0)
  redirects: {
    "/v1": { status: 302, destination: "/v1/" },
    "/v2": { status: 302, destination: "/v2/" },
    "/v3": { status: 302, destination: "/v3/" },
  },
  env: {
    schema: {
      DIARY_PASSWORD: envField.string({ context: "server", access: "secret", optional: true }),
      DIARY_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
      DIARY_GITHUB_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      // "owner/repo", private
      DIARY_GITHUB_REPO: envField.string({ context: "server", access: "secret", optional: true }),
      // 32 bytes in base64: encrypts everything stored in the repo. Without it nothing can be read
      DIARY_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      DIARY_GITHUB_BRANCH: envField.string({ context: "server", access: "secret", default: "main" }),
      DIARY_TZ: envField.string({ context: "server", access: "public", default: "America/Argentina/Buenos_Aires" }),
      // Phone reminders: keys from npx web-push generate-vapid-keys. Vercel sends CRON_SECRET to the cron
      DIARY_VAPID_PUBLIC: envField.string({ context: "server", access: "public", optional: true }),
      DIARY_VAPID_PRIVATE: envField.string({ context: "server", access: "secret", optional: true }),
      CRON_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss(), publicFolderIndex],
  },
});
