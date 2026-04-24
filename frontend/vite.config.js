import os from "node:os";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function createHealthPayload(state, startedAt) {
  const uptime = Date.now() - startedAt;
  const memUsage = process.memoryUsage();

  return {
    status: state.isHealthy ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime / 1000),
      formatted: formatDuration(uptime),
    },
    vite: {
      state: state.state,
      isHealthy: state.isHealthy,
      hasCompiled: state.hasCompiled,
      errors: state.errorCount,
      warnings: state.warningCount,
      lastCompileTime: state.lastCompileTime,
      lastSuccessTime: state.lastSuccessTime,
      compileDuration: state.compileDuration,
      totalCompiles: state.totalCompiles,
      firstCompileTime: state.firstCompileTime,
    },
    server: {
      nodeVersion: process.version,
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      memory: {
        heapUsed: formatBytes(memUsage.heapUsed),
        heapTotal: formatBytes(memUsage.heapTotal),
        rss: formatBytes(memUsage.rss),
        external: formatBytes(memUsage.external),
      },
      systemMemory: {
        total: formatBytes(os.totalmem()),
        free: formatBytes(os.freemem()),
        used: formatBytes(os.totalmem() - os.freemem()),
      },
    },
    environment: process.env.NODE_ENV || "development",
  };
}

function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }

  return `${seconds}s`;
}

function createHealthCheckPlugin() {
  const startedAt = Date.now();
  const state = {
    state: "idle",
    isHealthy: false,
    hasCompiled: false,
    errorCount: 0,
    warningCount: 0,
    errors: [],
    warnings: [],
    lastCompileTime: null,
    lastSuccessTime: null,
    compileDuration: null,
    totalCompiles: 0,
    firstCompileTime: null,
  };

  let compileStartedAt = null;
  let settleTimer = null;
  let pendingSuccess = false;

  const markCompiling = () => {
    compileStartedAt = Date.now();
    state.state = "compiling";
    state.isHealthy = true;
    pendingSuccess = true;
  };

  const markSuccess = () => {
    const now = Date.now();
    const duration = compileStartedAt ? now - compileStartedAt : 0;

    state.state = "success";
    state.isHealthy = true;
    state.hasCompiled = true;
    state.errorCount = 0;
    state.warningCount = 0;
    state.errors = [];
    state.warnings = [];
    state.lastCompileTime = new Date(now).toISOString();
    state.lastSuccessTime = new Date(now).toISOString();
    state.compileDuration = `${duration}ms`;
    state.totalCompiles += 1;

    if (!state.firstCompileTime) {
      state.firstCompileTime = new Date(now).toISOString();
    }

    pendingSuccess = false;
  };

  const markError = (pathname, statusCode) => {
    const now = Date.now();
    const duration = compileStartedAt ? now - compileStartedAt : null;

    state.state = "error";
    state.isHealthy = false;
    state.hasCompiled = true;
    state.errorCount = 1;
    state.warningCount = 0;
    state.errors = [
      {
        message: `Vite dev server returned ${statusCode} for ${pathname}`,
        path: pathname,
        statusCode,
        timestamp: new Date(now).toISOString(),
      },
    ];
    state.warnings = [];
    state.lastCompileTime = new Date(now).toISOString();
    state.compileDuration = duration === null ? null : `${duration}ms`;

    if (!state.firstCompileTime) {
      state.firstCompileTime = new Date(now).toISOString();
    }
  };

  const scheduleSuccess = () => {
    if (settleTimer) {
      clearTimeout(settleTimer);
    }

    markCompiling();
    settleTimer = setTimeout(() => {
      settleTimer = null;
    }, 150);
  };

  return {
    name: "vite-health-check",
    configureServer(server) {
      if (process.env.ENABLE_HEALTH_CHECK !== "true") {
        return;
      }

      const onFsChange = () => scheduleSuccess();
      server.watcher.on("add", onFsChange);
      server.watcher.on("change", onFsChange);
      server.watcher.on("unlink", onFsChange);

      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";

        if (pathname.startsWith("/health")) {
          return next();
        }

        res.on("finish", () => {
          if (res.statusCode >= 500) {
            markError(pathname, res.statusCode);
            return;
          }

          if (pendingSuccess && res.statusCode < 400) {
            markSuccess();
            return;
          }

          if (!state.hasCompiled && res.statusCode < 400) {
            compileStartedAt = Date.now();
            markSuccess();
          }
        });

        next();
      });

      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";

        if (!pathname.startsWith("/health")) {
          return next();
        }

        if (pathname === "/health") {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(createHealthPayload(state, startedAt)));
          return;
        }

        if (pathname === "/health/simple") {
          const simpleStatus =
            state.state === "success"
              ? "OK"
              : state.state === "compiling"
                ? "COMPILING"
                : state.state === "idle"
                  ? "IDLE"
                  : "ERROR";
          res.statusCode = state.state === "error" ? 503 : 200;
          res.end(simpleStatus);
          return;
        }

        if (pathname === "/health/ready") {
          const ready = state.state === "success" && state.hasCompiled;
          res.statusCode = ready ? 200 : 503;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              ready,
              state: state.state,
              reason:
                ready
                  ? null
                  : state.state === "idle"
                    ? "No successful dev-server request has completed yet"
                    : state.state === "compiling"
                      ? "Compilation in progress"
                      : "Compilation failed",
            }),
          );
          return;
        }

        if (pathname === "/health/live") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              alive: true,
              timestamp: new Date().toISOString(),
            }),
          );
          return;
        }

        if (pathname === "/health/errors") {
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              errorCount: state.errorCount,
              warningCount: state.warningCount,
              errors: state.errors,
              warnings: state.warnings,
              state: state.state,
            }),
          );
          return;
        }

        if (pathname === "/health/stats") {
          const uptime = Date.now() - startedAt;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              totalCompiles: state.totalCompiles,
              averageCompileTime:
                state.totalCompiles > 0
                  ? `${Math.round(uptime / state.totalCompiles)}ms`
                  : null,
              lastCompileDuration: state.compileDuration,
              firstCompileTime: state.firstCompileTime,
              serverUptime: formatDuration(uptime),
            }),
          );
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), createHealthCheckPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  server: {
    watch: {
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/build/**",
        "**/dist/**",
        "**/coverage/**",
      ],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
  },
});
