# Singsaker Studenterhjem Internal Dashboard

## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on deploying the project on a live system.

### Installing

Clone the repository to your local machine

```
git clone https://github.com/singsaker/intern.git
```

Create /backend/.env

```
SECRET_KEY=<INSERT_DJANGO_SECRET_KEY>
```

Build Docker images

```
docker compose build
```

Run project

```
docker compose up
docker compose exec backend python manage.py migrate
```

Load initial data

```
docker compose exec backend python manage.py loaddata initial_data
```

This command pushes initial data from fixtures and default superuser:

| Username | Password |
| -------- | :------: |
| admin    | password |

Backend admin is accessed at ```127.0.0.1:8000/admin``` with graphQL endpoint ```127.0.0.1:8000/graphql```. Frontend runs on ```127.0.0.1:3000```

## Clean volumes (Windows Powershell)

```
docker compose down
docker volume rm $(docker volume ls -q)
docker compose up -d
```
