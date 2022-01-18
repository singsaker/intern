## Setup

1. Clone from git
2. Build Docker images

```
docker compose build
```

3. Run project

```
docker compose up
docker compose exec backend python manage.py migrate
```

4. Load initial data

```
docker compose exec backend python manage.py loaddata initial_data
```

This command pushes initial data from fixtures and default superuser:

| Username | Password |
| -------- | :------: |
| admin    | password |

## Clean volumes (Windows Powershell)

```
docker compose down
docker volume rm $(docker volume ls -q)
docker compose up -d
```
