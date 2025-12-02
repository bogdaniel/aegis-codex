FROM php:8.2-cli

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_sqlite zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock* ./

# Install dependencies (including dev for tests)
RUN composer install --optimize-autoloader

# Copy application code
COPY . .

# Create data directory
RUN mkdir -p data && chmod 777 data

# Expose port
EXPOSE 8000

# Default command (can be overridden)
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]

