
FROM php:8.4-cli

# Dependencias PHP
RUN apt-get update && apt-get install -y \
    git unzip curl libzip-dev libsqlite3-dev libonig-dev \
    && docker-php-ext-install pdo pdo_sqlite zip iconv mbstring bcmath \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Node.js y pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Instalar dependencias
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --no-interaction

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

# Copiar proyecto
COPY . .

# Preparar directorios de Laravel
RUN mkdir -p database storage/framework/cache/data \
    storage/framework/sessions storage/framework/views \
    storage/logs bootstrap/cache \
    && touch database/database.sqlite \
    && chmod -R 775 database storage bootstrap/cache

# Generar autoload
RUN composer dump-autoload --optimize

# Compilar frontend para producción
RUN rm -f public/hot && pnpm run build

# Puerto de Render
EXPOSE 10000

# Iniciar aplicación y ejecutar migraciones pendientes
CMD ["sh", "-c", "mkdir -p database storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs && touch database/database.sqlite && php artisan migrate --force && exec php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
