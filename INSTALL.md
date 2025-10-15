# Installation Guide

This guide will help you install and deploy the Masonic Time Portal in various environments.

## Table of Contents

- [Docker Installation (Recommended)](#docker-installation-recommended)
- [Manual Installation](#manual-installation)
- [Cloud Deployment](#cloud-deployment)
- [Reverse Proxy Setup](#reverse-proxy-setup)

---

## Docker Installation (Recommended)

### Prerequisites
- Docker 20.10+ 
- Docker Compose 2.0+

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/masonic-time-portal.git
   cd masonic-time-portal
   ```

2. **Start the service**:
   ```bash
   docker-compose up -d
   ```

3. **Verify it's running**:
   ```bash
   docker-compose logs -f
   curl http://localhost:5005/api/health
   ```

4. **Access the portal**:
   - Open http://localhost:5005 in your browser

### Custom Port

Edit `docker-compose.yml`:
```yaml
ports:
  - "8080:5005"  # Change 8080 to your desired external port
```

Then restart:
```bash
docker-compose down
docker-compose up -d
```

---

## Manual Installation

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm 8+ (comes with Node.js)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/masonic-time-portal.git
   cd masonic-time-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the portal**:
   - Open http://localhost:5005 in your browser

### Running as a Service (Linux)

Create a systemd service file at `/etc/systemd/system/masonic-time.service`:

```ini
[Unit]
Description=Masonic Time Portal
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/masonic-time-portal
ExecStart=/usr/bin/node server.js
Restart=on-failure
Environment=NODE_ENV=production
Environment=PORT=5005

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable masonic-time
sudo systemctl start masonic-time
sudo systemctl status masonic-time
```

---

## Cloud Deployment

### Heroku

1. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Deploy**:
   ```bash
   git push heroku main
   ```

3. **Open your app**:
   ```bash
   heroku open
   ```

### Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g railway
   ```

2. **Login and initialize**:
   ```bash
   railway login
   railway init
   ```

3. **Deploy**:
   ```bash
   railway up
   ```

### DigitalOcean App Platform

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Click "Create App"
3. Connect your GitHub repository
4. Configure:
   - **Type**: Web Service
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
   - **Port**: 5005
5. Click "Launch"

### Docker Hub

Build and push your own image:

```bash
# Build
docker build -t yourusername/masonic-time-portal:latest .

# Push
docker login
docker push yourusername/masonic-time-portal:latest

# Run on any Docker host
docker run -d -p 5005:5005 yourusername/masonic-time-portal:latest
```

---

## Reverse Proxy Setup

### Nginx

**Configuration** (`/etc/nginx/sites-available/masonic-time`):

```nginx
server {
    listen 80;
    server_name masonic.yourdomain.com;

    location / {
        proxy_pass http://localhost:5005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable and reload**:
```bash
sudo ln -s /etc/nginx/sites-available/masonic-time /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

**Add SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d masonic.yourdomain.com
```

### Apache

**Configuration** (`/etc/apache2/sites-available/masonic-time.conf`):

```apache
<VirtualHost *:80>
    ServerName masonic.yourdomain.com
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:5005/
    ProxyPassReverse / http://localhost:5005/
    
    <Proxy *>
        Order deny,allow
        Allow from all
    </Proxy>
</VirtualHost>
```

**Enable modules and site**:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2ensite masonic-time
sudo systemctl reload apache2
```

**Add SSL with Let's Encrypt**:
```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d masonic.yourdomain.com
```

### Caddy

**Caddyfile**:

```caddy
masonic.yourdomain.com {
    reverse_proxy localhost:5005
}
```

Caddy automatically handles SSL certificates!

```bash
caddy run
```

---

## Nginx Proxy Manager

If you're using Nginx Proxy Manager:

1. Access NPM admin panel (typically http://your-server:81)
2. Go to **Proxy Hosts** → **Add Proxy Host**
3. Configure:
   - **Domain Names**: `masonic.yourdomain.com`
   - **Scheme**: `http`
   - **Forward Hostname/IP**: `localhost` (or container name/IP)
   - **Forward Port**: `5005`
   - **Block Common Exploits**: ✓
   - **Websockets Support**: ✓
4. Go to **SSL** tab:
   - **SSL Certificate**: Request a new SSL Certificate
   - **Force SSL**: ✓
   - **HTTP/2 Support**: ✓
   - Enter your email
   - Agree to Let's Encrypt ToS
5. Click **Save**

---

## Troubleshooting

### Port Already in Use

```bash
# Find what's using port 5005
sudo lsof -i :5005

# Kill the process or change the port
PORT=8080 npm start
```

### Docker Issues

```bash
# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild
docker-compose up -d --build
```

### Permission Issues

```bash
# Fix file permissions
chmod -R 755 /path/to/masonic-time-portal

# Fix ownership (if needed)
sudo chown -R $USER:$USER /path/to/masonic-time-portal
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5005` | Port to run the service on |
| `NODE_ENV` | `development` | Environment mode (`production` recommended for deployment) |

Set environment variables:

**Linux/Mac**:
```bash
export PORT=8080
npm start
```

**Windows (CMD)**:
```cmd
set PORT=8080
npm start
```

**Windows (PowerShell)**:
```powershell
$env:PORT=8080
npm start
```

**Docker**:
```yaml
environment:
  - PORT=8080
  - NODE_ENV=production
```

---

## Next Steps

- Configure your domain DNS to point to your server
- Set up SSL certificates for HTTPS
- Configure firewall rules if needed
- Set up monitoring (optional)
- Configure backups (optional)

For questions or issues, please visit our [GitHub Issues](https://github.com/yourusername/masonic-time-portal/issues).

**So Mote It Be!** 🔺
