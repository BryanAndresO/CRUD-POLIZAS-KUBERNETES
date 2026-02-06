# Sistema Distribuido de Emisión de Pólizas

Este proyecto es un sistema distribuido completo que incluye Backend (Microservicios con Spring Boot), Frontend (React), Bases de Datos (PostgreSQL y MySQL), conteneirización con Docker y orquestación con Kubernetes.

## Arquitectura

El sistema consta de los siguientes componentes:

1.  **Clients Service (Backend)**: Microservicio para gestión de clientes. Usa PostgreSQL. Puerto 8081.
2.  **Plans Service (Backend)**: Microservicio para gestión de planes de seguro. Usa PostgreSQL. Puerto 8082.
3.  **Policies Service (Backend)**: Microservicio para emisión de pólizas. Usa MySQL. Consume los servicios de Clientes y Planes. Puerto 8080.
4.  **Frontend**: Aplicación React para la interfaz de usuario. Puerto 3000 (Expuesto en K8s via NodePort 30000).
5.  **Bases de Datos**:
    -   PostgreSQL: Para Clientes y Planes.
    -   MySQL: Para Pólizas.

## Requisitos

-   Docker Desktop (con Kubernetes habilitado)
-   Java 17
-   Node.js

## Instrucciones de Despliegue (Kubernetes)

### 1. Construir las imágenes Docker

Ejecute los siguientes comandos desde la raíz del proyecto para construir las imágenes locales:

```bash
# Construir Clients Service
docker build -t clients-service:latest ./clients-service

# Construir Plans Service
docker build -t plans-service:latest ./plans-service

# Construir Policies Service
docker build -t polizas-service:latest ./Polizas

# Construir Frontend
docker build -t frontend:latest ./FrontEnd
```

### 2. Desplegar en Kubernetes

Se aplicaron los manifiestos ubicados en la carpeta `k8s`:

```bash
kubectl apply -f k8s/
```

### 3. Verificar el despliegue

Se verificó que todos los pods estén corriendo:

```bash
kubectl get pods
```

Se verificó que los pods de base de datos (`postgres-db`, `mysql-db`) y los servicios estén en estado `Running`.

### 4. Acceder a la Aplicación

La aplicación Frontend estará disponible en:
http://localhost:30000

## Endpoints de API

-   **Clientes**: `http://localhost:8081/api/clientes` (Acceso interno en ClusterIP)
-   **Planes**: `http://localhost:8082/api/planes` (Acceso interno en ClusterIP)
-   **Pólizas**: `http://localhost:8080/api/polizas` (Acceso interno en ClusterIP)

## Estructura del Proyecto

-   `/clients-service`: Código fuente del microservicio de Clientes.
-   `/plans-service`: Código fuente del microservicio de Planes.
-   `/Polizas`: Código fuente del microservicio de Pólizas.
-   `/FrontEnd`: Código fuente de la aplicación React.
-   `/k8s`: Manifiestos de Kubernetes.
