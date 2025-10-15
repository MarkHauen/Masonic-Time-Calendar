# 🔺 Masonic Time Portal

<div align="center">

A beautiful web application that displays the current time in six different Masonic calendar formats with an elegant, symbolically-rich interface.

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API](#-api-endpoints)

</div>

---

Actual Human who deserves credit for building backend, the rest of this is AI generated:
https://github.com/mapineda/masonic-time


## ✨ Features

- 🕐 **Real-time Clock Display** - Live updating time in Gregorian and Masonic formats
- 📅 **Six Masonic Calendars** with historical significance:
  - **Anno Lucis (A.L.)** - "Year of Light" - Dating from creation (+4000)
  - **Anno Mundi (A.M.)** - "Year of the World" - Hebrew calendar (+3760)
  - **Anno Inventionis (A.I.)** - "Year of Discovery" - Recovery of the lost word (+530)
  - **Anno Depositionis (A.Dep.)** - "Year of the Deposit" - Foundation stone laying (+1000)
  - **Anno Ordinis (A.O.)** - "Year of the Order" - Knights Templar founding (1118 CE)
  - **Anno Benefacio (A.B.)** - "Year of the Blessing" - Scottish Rite calendar (+1911)
- 🎨 **Beautiful Masonic Theme** - Dark aesthetic with golden accents, Square & Compass, All-Seeing Eye
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Real-time Updates** - Automatic synchronization every second
- � **RESTful API** - JSON endpoints for integration with other applications
- ⌨️ **Keyboard Shortcuts** - Quick access features (Ctrl+R to refresh, Ctrl+L for theme toggle)

## �️ Demo

The portal features:
- Animated Masonic symbols with glowing effects
- Individual cards for each calendar system with descriptions
- Smooth transitions and elegant typography
- Ancient-meets-modern design aesthetic

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/masonic-time-portal.git
   cd masonic-time-portal
   ```

2. **Start with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Access the portal**:
   - Open your browser to: http://localhost:5005

### Manual Installation

1. **Prerequisites**:
   - Node.js 18+ 
   - npm or yarn

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Access**:
   - Open your browser to: http://localhost:5005

4. **Access**:
   - Open your browser to: http://localhost:5005

## � Documentation

### Configuration

#### Environment Variables

You can customize the service using environment variables:

```bash
PORT=5005              # Port to run the service on (default: 5005)
NODE_ENV=production    # Environment mode
```

#### Custom Port

To run on a different port:

**Docker Compose**:
```yaml
services:
  masonic-time:
    ports:
      - "8080:5005"  # Change 8080 to your desired port
    environment:
      - PORT=5005    # Keep internal port as 5005
```

**Manual Installation**:
```bash
PORT=8080 npm start
```

### Reverse Proxy Setup

#### Nginx Example

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
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Apache Example

```apache
<VirtualHost *:80>
    ServerName masonic.yourdomain.com
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:5005/
    ProxyPassReverse / http://localhost:5005/
</VirtualHost>
```

## 🔌 API Endpoints

### GET `/api/times`

Returns current time in all calendar formats.

**Response**:
```json
{
  "gregorian": {
    "date": "Wednesday, October 15, 2025",
    "time": "04:57:34 PM",
    "year": 2025
  },
  "masonic": {
    "AL": {
      "name": "Anno Lucis",
      "abbreviation": "A.L.",
      "description": "In the Year of Light - Dating from the creation of the world according to Masonic tradition",
      "symbol": "☀️",
      "offset": 4000,
      "year": 6025,
      "date": "10/15/6025"
    },
    "AM": { ... },
    "AI": { ... },
    "ADep": { ... },
    "AO": { ... },
    "AB": { ... }
  }
}
```

### GET `/api/health`

Health check endpoint.

**Response**:
```json
{
  "status": "ok",
  "service": "Masonic Time Service"
}
```

## 🎨 Customization

### Theme Colors

Edit `public/styles.css` to customize colors:

```css
:root {
    --gold: #d4af37;         /* Primary accent color */
    --dark-gold: #8b7500;    /* Darker accent */
    --black: #0a0a0a;        /* Background */
    --dark-gray: #1a1a1a;    /* Card backgrounds */
    --white: #f5f5f5;        /* Text color */
}
```

### Calendar Descriptions

Edit `server.js` to modify calendar descriptions:

```javascript
const calendarDescriptions = {
  AL: {
    name: 'Anno Lucis',
    description: 'Your custom description here',
    // ...
  }
}
```

## 🛠️ Development

### Project Structure

```
masonic-time-portal/
├── public/              # Frontend files
│   ├── index.html      # Main HTML
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Express backend
├── package.json        # Dependencies
├── Dockerfile          # Docker build
├── docker-compose.yml  # Docker orchestration
└── README.md          # This file
```

### Running in Development Mode

```bash
npm install
npm run dev  # Uses nodemon for auto-reload
```

### Building Docker Image

```bash
docker build -t masonic-time-portal .
docker run -p 5005:5005 masonic-time-portal
```

## 📋 Masonic Calendar Reference

| Calendar | Abbreviation | Offset | Base Year | Significance |
|----------|-------------|--------|-----------|--------------|
| Anno Lucis | A.L. | +4000 | 4000 BCE | Creation of the world (Masonic tradition) |
| Anno Mundi | A.M. | +3760 | 3760 BCE | Hebrew calendar from creation |
| Anno Inventionis | A.I. | +530 | 530 CE | Recovery of the lost word |
| Anno Depositionis | A.Dep. | +1000 | 1000 BCE | Foundation stone laying |
| Anno Ordinis | A.O. | -1118 | 1118 CE | Knights Templar founding |
| Anno Benefacio | A.B. | +1911 | 1911 BCE | Scottish Rite calendar |

## ⌨️ Keyboard Shortcuts

- **Ctrl + R**: Manually refresh time data
- **Ctrl + L**: Toggle light/dark mode (easter egg)

## 🐳 Docker

### Docker Hub

```bash
docker pull yourusername/masonic-time-portal
docker run -p 5005:5005 yourusername/masonic-time-portal
```

### Docker Compose

```yaml
version: '3.8'

services:
  masonic-time:
    image: yourusername/masonic-time-portal
    container_name: masonic-time
    restart: unless-stopped
    ports:
      - "5005:5005"
    environment:
      - NODE_ENV=production
```

## 🔐 Security

- The service has no authentication by default
- It's informational only (displays public calendar data)
- For production use, consider:
  - Running behind a reverse proxy with SSL
  - Rate limiting
  - CORS configuration if integrating with other apps

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Masonic traditions and symbolism
- Calendar calculations based on standard Masonic dating systems
- Design influenced by classical Masonic aesthetics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

If you have questions or need help:
- Open an issue on GitHub
- Check existing issues for solutions
- Read the documentation carefully

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

**Made with ∴ for the Craft**

**So Mote It Be!** 🔺

## 🎨 Customization

### Port Configuration
Edit `docker-compose.yml` to change the port:
```yaml
ports:
  - "YOUR_PORT:5005"
```

### Theme Colors
Edit `public/styles.css` to customize colors:
```css
:root {
    --gold: #d4af37;
    --black: #0a0a0a;
    ...
}
```

## 🔐 Nginx Proxy Manager Setup

1. Create new Proxy Host in NPM
2. **Domain Names**: `masonic.yourdomain.com`
3. **Scheme**: `http`
4. **Forward Hostname/IP**: `192.168.1.102`
5. **Forward Port**: `5005`
6. Enable SSL with Let's Encrypt
7. Enable WebSockets (optional)

## 📊 Monitoring

### View Logs
```bash
docker logs masonic-time -f
```

### Container Stats
```bash
docker stats masonic-time
```

### Restart Service
```bash
docker-compose restart
```

## 🛠️ Development

### Local Development
```bash
npm install
npm run dev
```

### Run Tests
```bash
npm test
```

## 🔄 Updates

### Update Container
```bash
cd /opt/masonic-time
docker-compose pull
docker-compose up -d --build
```

## 📝 Masonic Calendar Reference

| Calendar | Abbreviation | Offset | Significance |
|----------|-------------|--------|--------------|
| Anno Lucis | A.L. | +4000 | Creation of the world (Masonic tradition) |
| Anno Mundi | A.M. | +3760 | Hebrew calendar from creation |
| Anno Inventionis | A.I. | +530 | Recovery of the lost word |
| Anno Depositionis | A.Dep. | +1000 | Foundation stone laying |
| Anno Ordinis | A.O. | -1118 | Knights Templar founding (1118 CE) |
| Anno Benefacio | A.B. | +1911 | Scottish Rite calendar |

## 🎯 Keyboard Shortcuts

- `Ctrl + R`: Refresh time data
- `Ctrl + L`: Toggle light/dark mode (easter egg)

## 📞 Support

For issues or questions, check the container logs or API health endpoint.

## 🏷️ Labels & Tags

- **Service Type**: Web Application
- **Category**: Utility, Educational
- **Container**: 102 (Docker Host)
- **Port**: 5005
- **Network**: homelab

---

**So Mote It Be** ∴
