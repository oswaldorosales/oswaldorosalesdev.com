# Coolify Complete Setup Guide

Complete guide for installing, configuring, and deploying applications with Coolify, from installation to production-grade CI/CD.

---

## Table of Contents

1. [Installation](#1-installation)
2. [Post-Installation Setup](#2-post-installation-setup)
3. [CI/CD with GitHub Actions](#3-cicd-with-github-actions)
4. [Advanced CI/CD](#4-advanced-cicd)
5. [Troubleshooting](#5-troubleshooting)

---

# 1. Installation

## Prerequisites

- Ubuntu 22.04 or 24.04
- Root access
- Docker not previously configured with IPv6
- Ports **80, 443, and 8000** open
- A domain pointing to the server

Recommended server specs:

```
2 CPU
4 GB RAM
40 GB storage
```

## Disable IPv6 in Docker

Many Coolify proxy errors come from Docker automatically creating IPv6 networks.

Create or edit the Docker daemon configuration:

```bash
sudo nano /etc/docker/daemon.json
```

Add the following:

```json
{
  "ipv6": false
}
```

Save and restart Docker:

```bash
sudo systemctl restart docker
sudo systemctl status docker
```

Expected output: `active (running)`

## Install Coolify

Run the official installation script:

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

This installs the core containers:
- coolify
- coolify-db
- coolify-redis
- coolify-realtime

## Verify Installation

Check that the Coolify services are running:

```bash
docker ps
```

Expected containers:
- coolify
- coolify-db
- coolify-redis
- coolify-realtime

Verify the Docker network:

```bash
docker network inspect coolify
```

Look for: `"EnableIPv6": false`

**Important**: You should NOT see anything like `fdxx:xxxx::/64`

## Access the Dashboard

Open your browser:

```
http://YOUR_SERVER_IP:8000
```

Complete the setup:
1. Root User Setup
2. Team creation
3. Server configuration

---

# 2. Post-Installation Setup

## Add Your Server

Navigate to: **Servers → Add Server**

Choose: **Localhost**

Coolify will automatically connect to the Docker daemon.

## Configure DNS

Add these DNS records in your DNS provider (Squarespace, Cloudflare, etc.):

| HOST    | TYPE  | VALUE          |
|---------|-------|----------------|
| *       | A     | YOUR_SERVER_IP |
| @       | A     | YOUR_SERVER_IP |
| coolify | A     | YOUR_SERVER_IP |
| www     | CNAME | your-domain.com |

## Configure Wildcard Domain

Navigate to: **Servers → localhost → Configuration → General**

Set **Wildcard Domain**:
```
https://*.your-domain.com
```

Click **Save**

## Start the Proxy

Navigate to: **Servers → localhost → Proxy → Start Proxy**

Wait until you see: **Proxy Running**

Verify:

```bash
docker ps
```

You should now see: `coolify-proxy`

## Configure Coolify Dashboard Domain

Navigate to: **Settings → Configuration → General**

Set **URL**:
```
coolify.your-domain.com
```

Click **Save**

## Create Your First Project

Navigate to: **Projects → Add+**

```
Name: your-project-name
Description: Your project description
```

## Deploy Your First Docker Image

Navigate to: **Add Resource → Docker Image**

```
Image Name: ghcr.io/your-user/your-image
Tag: latest
```

## Configure the Domain

Navigate to: **Projects → your-project-name → your-resource-name → Configuration → General**

**Domains**:
```
https://your-domain.com,https://www.your-domain.com
```

**Direction**: Redirect to non-www

**Network → Ports Exposes**:
```
3000
```

Click **Save**

Coolify will automatically configure routing and SSL.

## Deploy

Click **Deploy**.

Coolify will:
1. Pull the image
2. Start the container
3. Attach it to the proxy
4. Expose the domain

Your app will be available at: `https://your-domain.com`

---

# 3. CI/CD with GitHub Actions

## Deployment Flow

1. Push code to `main`
2. GitHub Actions builds Docker image
3. Image is pushed to GHCR
4. GitHub Actions triggers Coolify deploy
5. Coolify pulls image and deploys

## Coolify Configuration

### Network

Navigate to: **Projects → Your Project → Your App → Configuration → General → Network**

**Ports Exposes**: `3000`

### Healthcheck

Configure healthcheck:

```
Method: GET
Scheme: http
Host: localhost
Port: 3000
Path: /api/health
```

Recommended timing:

```
Start period: 20s
Interval: 10s
Timeout: 5s
Retries: 5
```

### Image

Set image:
```
ghcr.io/YOUR_USERNAME/YOUR_IMAGE:latest
```

Enable: **Always pull latest image**

## GitHub Secrets

Navigate to: **Settings → Secrets and variables → Actions → Repository secrets**

Create:

**COOLIFY_TOKEN**
- Get from: Coolify → Keys & Tokens → API Tokens
- Create token with read & deploy permissions

**COOLIFY_WEBHOOK**
- Get from: Coolify → Projects → your-project → your-application → Configuration → Webhooks
- Copy 'Deploy Webhook'

## GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Build, Push & Deploy

on:
  push:
    branches: [main]

jobs:
  build-push-deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    env:
      IMAGE_NAME: ghcr.io/${{ github.repository_owner }}/YOUR_IMAGE

    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ env.IMAGE_NAME }}:latest
            ${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Deploy to Coolify
        run: |
          curl -H "Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}" \
            "${{ secrets.COOLIFY_WEBHOOK }}"
```

## Dockerfile Requirements

Your Dockerfile must:
- `EXPOSE 3000`
- Include `curl` or `wget`
- Include `HEALTHCHECK`

Example:

```dockerfile
FROM node:20-alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["npm", "start"]
```

## Deployment

```bash
git push origin main
```

GitHub Actions will:
1. Build the image
2. Push to GHCR
3. Trigger Coolify deployment

---

# 4. Advanced CI/CD

## Image Versioning Strategy

Don't rely only on `latest`. Use multiple tags:

- `latest` - always points to the newest build
- `sha-{short}` - specific commit reference
- `v1.2.0` - semantic version for releases

Example tags:
```
ghcr.io/your-user/your-app:latest
ghcr.io/your-user/your-app:sha-abc1234
ghcr.io/your-user/your-app:v1.2.0
```

### Benefits

- Easy rollback
- Traceability
- Safer debugging
- Reproducible deployments

## Advanced GitHub Actions Workflow

```yaml
name: Build, Push & Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build-push-deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    env:
      IMAGE_NAME: ghcr.io/${{ github.repository_owner }}/your-app

    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract short SHA
        id: vars
        run: echo "SHORT_SHA=${GITHUB_SHA::7}" >> $GITHUB_ENV

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ env.IMAGE_NAME }}:latest
            ${{ env.IMAGE_NAME }}:sha-${{ env.SHORT_SHA }}
            ${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Deploy to Coolify
        run: |
          curl --fail --silent --show-error \
            -H "Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}" \
            "${{ secrets.COOLIFY_WEBHOOK }}"
```

## Rollback Strategy

If a deployment fails, redeploy a previous known-good tag in Coolify.

Example:
- Current broken image: `latest`
- Rollback target: `sha-a1b2c3d`

In Coolify, change the image tag to the previous working tag and redeploy.

**Best practice**: Keep at least the last 5 SHA-based images for quick rollback.

## Zero-Downtime Deployment Checklist

For near-zero downtime:

- ✅ Correct container port configured
- ✅ Working health check
- ✅ Sufficient start period
- ✅ Sufficient retries
- ✅ App starts consistently
- ✅ "Always pull latest image" enabled

## Staging and Production Environments

### Recommended Setup

**Staging**
- Domain: `staging-api.example.com`
- Branch: `develop`
- Separate Coolify application

**Production**
- Domain: `api.example.com`
- Branch: `main`
- Separate Coolify application

### Benefits

- Validate before production
- Test migrations and config
- Reduce production risk

## Multi-Environment Workflow

```yaml
name: Deploy by branch

on:
  push:
    branches:
      - develop
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3

      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Set environment values
        run: |
          if [ "${GITHUB_REF_NAME}" = "main" ]; then
            echo "APP_ENV=production" >> $GITHUB_ENV
            echo "IMAGE_NAME=ghcr.io/${GITHUB_REPOSITORY_OWNER}/your-app" >> $GITHUB_ENV
          else
            echo "APP_ENV=staging" >> $GITHUB_ENV
            echo "IMAGE_NAME=ghcr.io/${GITHUB_REPOSITORY_OWNER}/your-app-staging" >> $GITHUB_ENV
          fi

      - uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ env.IMAGE_NAME }}:latest
            ${{ env.IMAGE_NAME }}:${{ github.sha }}

      - name: Deploy
        run: |
          curl --fail --silent --show-error \
            -H "Authorization: Bearer ${{ secrets.COOLIFY_TOKEN }}" \
            "${{ secrets.COOLIFY_WEBHOOK }}"
```

## Observability Recommendations

### Minimum Stack

**Uptime Monitoring**
- Monitor health endpoints
- Alert on downtime

**Application Logs**
- Track deployment failures
- Monitor startup errors
- Track runtime exceptions

**Server Metrics**
- CPU usage
- Memory usage
- Disk space
- Container restarts

### Recommended Tools

- Uptime Kuma
- Grafana
- Prometheus
- Loki

### Alert Configuration

Recommended alerts:
- App unavailable
- Health check failures
- Repeated container restarts
- Low disk space
- High memory usage
- Failed deployments

Alert channels:
- Email
- Slack
- Discord
- Telegram

## Production Standards Checklist

### Docker Image
- ✅ Expose the correct port
- ✅ Include `curl` or `wget`
- ✅ Include `HEALTHCHECK`
- ✅ Run as non-root when possible

### Coolify
- ✅ Correct port in "Ports Exposes"
- ✅ Correct health check values
- ✅ "Always pull latest image" enabled
- ✅ Separate apps for staging and production

### GitHub Actions
- ✅ SHA tags
- ✅ Repository or environment secrets
- ✅ Deploy only after successful build
- ✅ Optional approvals for production

---

# 5. Troubleshooting

## Issue: Proxy fails with IPv6 error

**Error**: `ParseAddr("fdxx:xxxx::1/64")`

**Cause**: Docker network created with IPv6 enabled

**Fix**:

```bash
# Stop containers
docker stop $(docker ps -aq)

# Remove the network
docker network rm coolify

# Recreate the network
docker network create coolify

# Restart from dashboard
```

## Issue: Containers fail to start

Check container status:

```bash
docker ps -a
```

If containers are exited:

```bash
docker start coolify coolify-db coolify-redis coolify-realtime
```

## Issue: Docker network still shows IPv6

Check Docker configuration:

```bash
cat /etc/docker/daemon.json
```

Expected:

```json
{
  "ipv6": false
}
```

Restart Docker if needed:

```bash
sudo systemctl restart docker
```

## Issue: Ports already in use

Verify ports 80 and 443:

```bash
sudo lsof -i :80
sudo lsof -i :443
```

If nginx or apache appear:

```bash
sudo systemctl stop nginx
sudo systemctl stop apache2
```

## Issue: Health checks failing

Verify:
1. Port is correct (`3000`)
2. Health endpoint exists (`/api/health`)
3. App is listening on `0.0.0.0` not `localhost`
4. Container has `curl` or `wget`

## Issue: Image not pulling

Verify:
1. GHCR image is public or Coolify has credentials
2. "Always pull latest image" is enabled
3. Image tag exists in GHCR

---

## Final Verification Checklist

Installation is correct if:

```bash
docker ps
```

Shows:
- coolify
- coolify-db
- coolify-redis
- coolify-realtime
- coolify-proxy

And:

```bash
docker network inspect coolify
```

Shows: `"EnableIPv6": false`

And Coolify dashboard shows: **Proxy Running**

---

## Production Deployment Checklist

A production-ready setup includes:

- ✅ GHCR image publishing
- ✅ Coolify webhook deploys
- ✅ Health checks configured
- ✅ Correct port configuration
- ✅ SHA-based image tags
- ✅ Rollback procedure documented
- ✅ Staging environment
- ✅ Production environment
- ✅ Uptime monitoring
- ✅ Alerting configured
- ✅ Backup/recovery documentation
