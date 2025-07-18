// @ts-check
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
    vite: {
        plugins: [
            {
                name: "fix-null-path-windows",
                // se ejecuta antes de que Vite pida stat() del archivo
                enforce: "pre",
                resolveId(id) {
                    if (
                        id.startsWith("\0astro-entry:") &&
                        id.endsWith("tsconfig.json")
                    ) {
                        return { id, external: true }; // lo marca externo y evita fs.stat
                    }
                },
            },
        ],
    },
});
