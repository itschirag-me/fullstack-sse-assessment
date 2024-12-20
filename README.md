Here’s an updated version of the `README.md` with the necessary changes, including the OpenAPI documentation URL and the GitHub repository link:

---

# Fullstack SSE Assessment

## Overview

This project consists of a **frontend**, **backend**, and **PostgreSQL database**. The frontend is served using **Nginx**, while the backend communicates with the database and exposes API endpoints. The entire project is containerized using **Docker** and orchestrated with **Docker Compose**.

This guide will walk you through configuring and starting the project using Docker Compose.

---

## Repository Link

You can access the repository here: [https://github.com/itschirag-me/fullstack-sse-assessment.git](https://github.com/itschirag-me/fullstack-sse-assessment.git)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Install Docker from [here](https://docs.docker.com/get-docker/).
- **Docker Compose**: Docker Compose is included with Docker Desktop, but if not, you can install it from [here](https://docs.docker.com/compose/install/).

---

## Configuration Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/itschirag-me/fullstack-sse-assessment.git
cd fullstack-sse-assessment
```

### 2. Configure PostgreSQL Environment Variables

You will need to specify your PostgreSQL database configuration in the `.sample.env` file and the `docker-compose.yml` file.

- **Edit the `docker-compose.yml`**:
    - Set the `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` environment variables in the `db` service section.

```yaml
db:
  image: postgres:15
  environment:
    POSTGRES_USER: # Enter your desired username here
    POSTGRES_PASSWORD: # Enter your desired password here
    POSTGRES_DB: # Enter your desired database name here
  ports:
    - '5432:5432'
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

- **Configure the `.env` file**:
    - Set the PostgreSQL database environment variables that the backend will use to connect to the database.

```env
JWT_SECRET=mysecret-key # Sample value
JWT_EXPIRATION_TIME=15m # Sample value in minutes (Eg: 15m, 1h, 1d)

JWT_REFRESH_SECRET=myrefreshsecret-key # Sample value
JWT_REFRESH_EXPIRATION_TIME=7d # Sample value in minutes (Eg: 15m, 1h, 1d)

DATABASE_HOST=postgres_db # This is the name of the service defined in the docker-compose.yml file. Don't change it.
DATABASE_PORT=5432 # Default port for PostgreSQL. Don't change it.
DATABASE_USER= # Enter the username you provided in docker-compose.yml
DATABASE_PASSWORD= # Enter the password you provided in docker-compose.yml
DATABASE_NAME= # Enter the database name you provided in docker-compose.yml
```

Make sure to rename the `.sample.env` file to `.env` after editing.

### 3. Build and Start the Application

Once your environment variables are configured, you can build and start the application using Docker Compose:

```bash
docker-compose up --build
```

This will:
- Build the Docker images for the **frontend**, **backend**, and **PostgreSQL database**.
- Start all services defined in `docker-compose.yml`.
- Expose the frontend on `http://localhost` and the backend API on `http://localhost:5000`.

### 4. Access the Application

After the services are up and running, you can access the application:

- **Frontend**: Open your browser and go to [http://localhost](http://localhost) to see the frontend served by **Nginx**.
- **Backend**: Access the backend API at [http://localhost:5000/api](http://localhost:5000/api).
- **OpenAPI Documentation**: The API documentation is available at [http://localhost:5000/api/docs](http://localhost:5000/api/docs).

### 5. Stopping the Services

To stop the Docker containers, use the following command:

```bash
docker-compose down
```

This will stop and remove all the containers, but the images and data will remain intact.

### 6. Clean Up (Optional)

To remove all images, containers, and volumes (including PostgreSQL data), use:

```bash
docker-compose down --volumes --rmi all
```

This will:
- Stop and remove containers.
- Delete volumes.
- Remove images built by Docker Compose.

---

## Troubleshooting

If you encounter any issues, here are some common problems:

- **PostgreSQL connection issues**: Ensure that the `DATABASE_*` variables in the `.env` file match the values in the `docker-compose.yml` file.
- **Frontend not connecting to the backend**: Ensure that the `VITE_API_URL` in the frontend `.env` file is set to `http://backend:5000/api`, so it points to the backend service in Docker Compose.
- **Port binding issues**: If you are unable to connect to `localhost:5000` or `localhost`, ensure no other services are already using those ports on your machine.

---

## Notes

- The PostgreSQL service uses a **Docker volume** (`postgres_data`) to persist data.
- The **frontend** is built with **Vite** and served by **Nginx**.
- You can modify the `docker-compose.yml` file to scale services or change configurations, such as ports or environment variables.