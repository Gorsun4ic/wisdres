/// <reference types="vitest" />

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vite config with Vitest setup
export default defineConfig({
	plugins: [react()],
	// base: process.env.VITE_BASE_PATH || "/wisdres",
	test: {
		globals: true, // Enables global test functions like describe, it, etc.
		environment: "jsdom", // Sets the environment for React testing (jsdom)
		include: ["**/*.test.tsx", "**/test.tsx"], // Pattern to include test files
	},
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "src"),
			"@components": path.resolve(__dirname, "src/components"),
			"@features": path.resolve(__dirname, "src/features"),
			"@custom-types": path.resolve(__dirname, "src/types"),
			"@hooks": path.resolve(__dirname, "src/hooks"),
			"@pages": path.resolve(__dirname, "src/pages"),
			"@styles": path.resolve(__dirname, "src/styles"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@api": path.resolve(__dirname, "src/api"),
			"@store": path.resolve(__dirname, "src/store"),
			"@reducers": path.resolve(__dirname, "src/reducers"),
			"@actions": path.resolve(__dirname, "src/actions"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@server": path.resolve(__dirname, "src/server"),
		},
	},
});
