# 42Stats

### What's this about?

Web application in Java Spring Boot and React for 42 users to discover detailed information and statistics retrieved from 42 API.

### Installation :

- Clone the repository.

### Configuration:

- Create an .env file in docker/dev or docker/prod and add the following content to it.
- Configure variables for url, api keys, database information, etc.

```env
VITE_API_URL=http://localhost:8080
CLIENT_URL=http://localhost:5173

MYSQL_DATABASE=42stats
MYSQL_ROOT_PASSWORD=42
MYSQL_USER=fluchten
MYSQL_PASSWORD=19
DATABASE_URL=jdbc:mysql://42stats-db:3306/42stats

PMA_ARBITRARY=1
PMA_HOST=database

FORTY_TWO_UID=
FORTY_TWO_SECRET=

```

### Usage:

- Run `make MODE=prod` to start the application with docker.

### Screenshots:

![1](https://fluchtens.com/projects/42Stats/42Stats_1.webp)
