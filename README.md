# Sistema de Gestión de Citas

Este proyecto implementa un sistema completo de gestión de citas con una API REST en PHP, un proceso ETL en Python y un frontend en React.

## Estructura del Proyecto

```
proyecto/
├── api/                    # API REST en PHP
├── etl/                    # Proceso ETL en Python
├── src/                    # Frontend en React
└── database/              # Scripts SQL
```

## Requisitos Previos

- PHP 7.4 o superior
- MySQL 5.7 o superior
- Python 3.8 o superior
- Node.js 14 o superior
- Composer
- npm

## Instalación

1. **Base de Datos**:
   ```bash
   mysql -u root -p < database/quotes.sql
   ```

2. **API (PHP)**:
   ```bash
   cd api
   composer install
   ```

3. **Frontend (React)**:
   ```bash
   npm install
   ```

4. **ETL (Python)**:
   ```bash
   cd etl
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

## Ejecución

1. **API**:
   ```bash
   cd api
   php -S localhost:8000
   ```

2. **Frontend**:
   ```bash
   npm run dev
   ```

3. **ETL**:
   ```bash
   cd etl
   python etl_process.py
   ```

## Características

- CRUD completo de citas
- Puntuación de 0 a 5 estrellas
- Proceso ETL automatizado cada 15 minutos
- Caché para optimizar rendimiento
- Interfaz de usuario moderna y responsive

## API Endpoints

- GET /api/quotes - Obtener todas las citas
- GET /api/quotes/{id} - Obtener una cita específica
- POST /api/quotes - Crear nueva cita

## Contribuir

1. Fork el repositorio
2. Crea tu rama de características
3. Commit tus cambios
4. Push a la rama
5. Crea un Pull Request