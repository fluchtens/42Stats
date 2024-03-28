# 42Stats

### What's this about?
Web application in Next.js that retrieves data from the 42 api to display statistics.

### Installation :
- Clone the repository.

### Configuration:
- Create an .env file at the root of the directory and add the following content to it.
- Configure variables for url, api keys, database information, etc.
```env
POSTGRES_DB=42stats
POSTGRES_USER=fluchten
POSTGRES_PASSWORD=19
DATABASE_URL=postgresql://fluchten:19@42stats-db:5432/42stats
FORTY_TWO_UID=
FORTY_TWO_SECRET=
AUTH_SECRET=
AUTH_URL=http://localhost/api/auth
```

### Usage:
- Run ```make``` to start the application with docker.

### Screenshots:
![1](https://fluchtens.com/projects/42Stats/42Stats_1.png)
