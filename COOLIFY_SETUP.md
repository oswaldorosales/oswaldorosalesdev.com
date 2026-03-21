# Coolify Deployment Guide for 2GB VPS

This project is optimized for deployment on resource-constrained VPS (2GB RAM + 4GB Swap).

## 🚀 Coolify Configuration

### Resource Limits

Set these in your Coolify service configuration:

```yaml
Resources:
  Memory Limit: 1900MB
  Memory Swap: 4GB
  CPU Limit: 2 cores
```

### Build Arguments

Add these environment variables in Coolify's build settings:

```bash
DOCKER_BUILDKIT=1
BUILDKIT_STEP_LOG_MAX_SIZE=10485760
BUILDKIT_PROGRESS=plain
```

### Build Command Override (Optional)

If default build fails, override with:

```bash
docker build \
  --memory=1.9g \
  --memory-swap=4g \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --progress=plain \
  -t $IMAGE_NAME .
```

## 🧹 Cache Management

### Pre-Build Script (Recommended)

Add this as a Pre-Build hook in Coolify to prevent corrupted cache issues:

```bash
#!/bin/bash
# Clean potentially corrupted Docker cache
docker system prune -af --filter "until=24h"
docker builder prune -af
```

### Post-Build Cleanup (Optional)

```bash
#!/bin/bash
# Clean up after successful build
docker image prune -af --filter "dangling=true"
```

## 📊 Expected Build Metrics

| Metric | Value |
|--------|-------|
| Build Time | 5-8 minutes |
| Peak Memory | ~1.3GB |
| Final Image Size | ~150MB |
| Runtime Memory | ~200-400MB |

## 🔍 Troubleshooting

### Build Still Fails with OOM

1. **Check swap is enabled:**
   ```bash
   ssh user@vps
   swapon --show
   ```

2. **Increase swap temporarily:**
   ```bash
   sudo swapoff -a
   sudo dd if=/dev/zero of=/swapfile bs=1M count=6144
   sudo mkswap /swapfile
   sudo swapon /swapfile
   ```

3. **Monitor build process:**
   ```bash
   docker stats
   ```

### Build Succeeds but App Crashes

Check logs:
```bash
# In Coolify console or SSH
docker logs <container-id>
```

Common issues:
- Missing environment variables
- Health check endpoint failing
- Port already in use

## ✅ Success Indicators

Build logs should show:
```
✓ Creating an optimized production build
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

Runtime logs should show:
```
Ready in Xms
Listening on 0.0.0.0:3000
```

## 🔗 Health Check

Verify deployment:
```bash
curl https://your-domain.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-20T..."
}
```

## 📝 Notes

- This Dockerfile uses a **4-stage build** to minimize memory spikes
- Production and dev dependencies are installed separately
- Webpack parallelism is disabled to conserve RAM
- Build cache is disabled (not beneficial in Docker context)
- SWC minifier is used instead of Terser (50% less RAM)
