# Docker Security Setup Guide

This guide explains how to use Docker to run this project in a secure, isolated environment.

## Why Use Docker?

- **Security**: npm packages run inside container, cannot access your system
- **Isolation**: Each project gets its own environment
- **Consistency**: Same environment across all developers
- **Easy Cleanup**: Just delete the container when done

## Prerequisites

1. Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
2. Start Docker Desktop
3. Verify installation: `docker --version`

## Quick Start

```bash
# 1. Start the development environment
npm run docker:dev

# 2. View logs
npm run docker:logs

# 3. Stop the environment
npm run docker:down
```

## Available Docker Commands

- `npm run docker:build` - Build the Docker image
- `npm run docker:up` - Start containers
- `npm run docker:down` - Stop containers
- `npm run docker:dev` - Build and start (recommended for first run)
- `npm run docker:shell` - Access container shell
- `npm run docker:logs` - View container logs
- `npm run docker:clean` - Remove everything (full cleanup)

## How It Works

1. **Your code stays on your machine** - Docker mounts your project folder
2. **Dependencies run inside container** - npm packages cannot access your system
3. **Port 8080 is exposed** - Access the app at http://localhost:8080
4. **Hot reload works** - Changes to your code are instantly reflected

## Security Features

- ✅ Non-root user inside container
- ✅ Read-only root filesystem
- ✅ No new privileges flag
- ✅ Memory and CPU limits
- ✅ Isolated network
- ✅ No access to host system

## First Time Setup

1. Clone your project
2. Run `npm run docker:dev`
3. Wait for dependencies to install (first time only)
4. Open http://localhost:8080

## Troubleshooting

### Container won't start
```bash
# Clean everything and restart
npm run docker:clean
npm run docker:dev
```

### Permission issues
```bash
# Make sure Docker Desktop is running
# On Mac/Windows, Docker Desktop handles permissions automatically
```

### Port already in use
```bash
# Change port in docker-compose.yml
# Update ports section to "8081:8080" for example
```

## Development Workflow

1. Make code changes in your editor as normal
2. Docker container auto-reloads (via Vite HMR)
3. Use `npm run docker:shell` to run commands inside container
4. Use `npm run docker:logs` to debug issues

## Important Notes

- Node_modules are isolated inside the container
- Your source code is mounted as a volume (stays on your machine)
- Container cannot access files outside your project directory
- All npm commands run inside the container for safety