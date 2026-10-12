FROM php:8.4-cli

# Instalar extensiones PHP necesarias y Node.js
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    libzip-dev \
    libsqlite3-dev \
    libonig-dev \
    && docker-php-ext-install pdo pdo_sqlite zip iconv mbstring bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Node.js 20 LTS
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Copiar archivos de dependencias primero (cache de Docker layers)
COPY composer.json composer.lock* ./
RUN composer install --no-scripts --no-autoloader --no-interaction

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile || pnpm install

# Copiar el resto del proyecto
COPY . .

# Finalizar instalación de Composer con autoload
RUN composer dump-autoload --optimize

# Crear base de datos SQLite si no existe
RUN mkdir -p database && touch database/database.sqlite

# Exponer puertos (Laravel dev server + Vite HMR)
EXPOSE 8000 5173
