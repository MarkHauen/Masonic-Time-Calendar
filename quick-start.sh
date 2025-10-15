#!/bin/bash

# Masonic Time Portal - Quick Start Script
# This script helps you quickly set up the Masonic Time Portal

set -e

echo "🔺 Masonic Time Portal - Quick Start"
echo "===================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed."
    echo "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    echo "Please install Docker Compose from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker is installed"
echo "✓ Docker Compose is installed"
echo ""

# Check if port 5005 is available
if lsof -Pi :5005 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 5005 is already in use."
    read -p "Would you like to use a different port? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter port number (e.g., 8080): " NEW_PORT
        export PORT=$NEW_PORT
        echo "Using port: $PORT"
        # Update docker-compose.yml
        sed -i.bak "s/5005:5005/$PORT:5005/g" docker-compose.yml
    else
        echo "Please stop the service using port 5005 and try again."
        exit 1
    fi
fi

echo ""
echo "📦 Building and starting the Masonic Time Portal..."
echo ""

# Start with Docker Compose
if command -v docker-compose &> /dev/null; then
    docker-compose up -d --build
else
    docker compose up -d --build
fi

# Wait for service to start
echo ""
echo "⏳ Waiting for service to start..."
sleep 5

# Get the port (default 5005 or user-specified)
PORT=${PORT:-5005}

# Health check
echo ""
echo "🏥 Performing health check..."
if curl -f http://localhost:$PORT/api/health &> /dev/null; then
    echo "✅ Service is healthy!"
else
    echo "⚠️  Health check failed. Service may still be starting..."
    echo "   Check logs with: docker-compose logs -f"
fi

echo ""
echo "===================================="
echo "✅ Masonic Time Portal is running!"
echo ""
echo "🌐 Access the portal at:"
echo "   http://localhost:$PORT"
echo ""
echo "📊 API Endpoints:"
echo "   http://localhost:$PORT/api/times"
echo "   http://localhost:$PORT/api/health"
echo ""
echo "🛠️  Management commands:"
echo "   View logs:    docker-compose logs -f"
echo "   Stop:         docker-compose down"
echo "   Restart:      docker-compose restart"
echo ""
echo "📖 For more information, see README.md"
echo ""
echo "So Mote It Be! 🔺"
