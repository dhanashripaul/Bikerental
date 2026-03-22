#!/bin/bash

# BikeRental - Quick Setup Script for Linux/Mac

set -e

echo ""
echo "========================================"
echo "BikeRental - Full Stack Setup"
echo "========================================"
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "[!] Docker is not installed"
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    echo ""
    read -p "Would you like to continue without Docker (y/n)? " USE_DOCKER
    if [[ ! $USE_DOCKER =~ ^[Yy]$ ]]; then
        exit 1
    fi
    DOCKER_AVAILABLE=0
else
    echo "[+] Docker found"
    DOCKER_AVAILABLE=1
fi

echo ""
echo "========================================"
echo "Select Setup Type:"
echo "========================================"
echo "1. Docker Compose (All in one - Recommended)"
echo "2. Local Development (Manual setup)"
echo "3. Backend Only"
echo "4. Frontend Only"
echo ""
read -p "Enter choice (1-4): " SETUP_TYPE

case $SETUP_TYPE in
    1) docker_setup ;;
    2) local_setup ;;
    3) backend_only ;;
    4) frontend_only ;;
    *) echo "[!] Invalid choice. Exiting." && exit 1 ;;
esac

function docker_setup() {
    if [ $DOCKER_AVAILABLE -eq 0 ]; then
        echo "[!] Docker is required for this option"
        exit 1
    fi
    
    echo ""
    echo "[*] Starting Docker Compose setup..."
    echo ""
    
    cd "$(dirname "$0")"
    docker-compose down || true
    docker-compose up -d
    
    echo ""
    echo "[+] Setup complete!"
    echo ""
    echo "Access your application:"
    echo "   Frontend:  http://localhost:3000"
    echo "   Backend:   http://localhost:8080/api"
    echo "   Database:  localhost:3306"
    echo ""
    echo "To stop: docker-compose down"
    echo "To view logs: docker-compose logs -f"
}

function local_setup() {
    echo ""
    echo "[*] Local Development Setup"
    echo ""
    echo "Prerequisites required:"
    echo "   - Java 17+"
    echo "   - Maven 3.8+"
    echo "   - Node.js 16+"
    echo "   - MySQL 8.0"
    echo ""
    read -p "Press Enter to continue..."
    
    echo ""
    echo "[*] Setting up Backend..."
    cd "$(dirname "$0")/bikerental-java-backend"
    mvn clean install || { echo "[!] Backend build failed"; exit 1; }
    
    echo ""
    echo "[*] Setting up Frontend..."
    cd "$(dirname "$0")/bikerental-react-frontend"
    npm install || { echo "[!] Frontend setup failed"; exit 1; }
    
    echo ""
    echo "[+] Setup complete!"
    echo ""
    echo "Next steps:"
    echo ""
    echo "1. Start Backend (Terminal 1):"
    echo "   cd bikerental-java-backend"
    echo "   mvn spring-boot:run"
    echo ""
    echo "2. Start Frontend (Terminal 2):"
    echo "   cd bikerental-react-frontend"
    echo "   npm start"
    echo ""
    echo "3. Access: http://localhost:3000"
}

function backend_only() {
    echo ""
    echo "[*] Backend Only Setup"
    echo ""
    
    cd "$(dirname "$0")/bikerental-java-backend"
    mvn clean install || { echo "[!] Backend build failed"; exit 1; }
    
    echo ""
    echo "[+] Backend setup complete!"
    echo ""
    echo "To start:"
    echo "   cd bikerental-java-backend"
    echo "   mvn spring-boot:run"
    echo ""
    echo "Backend will run on: http://localhost:8080/api"
}

function frontend_only() {
    echo ""
    echo "[*] Frontend Only Setup"
    echo ""
    
    cd "$(dirname "$0")/bikerental-react-frontend"
    npm install || { echo "[!] Frontend setup failed"; exit 1; }
    
    echo ""
    echo "[+] Frontend setup complete!"
    echo ""
    echo "To start:"
    echo "   cd bikerental-react-frontend"
    echo "   npm start"
    echo ""
    echo "Frontend will run on: http://localhost:3000"
}

echo ""
