# Singsaker Studenterhjem Internal Dashboard

<p float="left">
<img width="300" alt="Screenshot 2022-04-06 at 17 20 16" src="https://user-images.githubusercontent.com/18050179/162010743-332b32d7-bdb2-4be7-843f-61eaddf31164.png">
<img width="300" alt="Screenshot 2022-04-06 at 17 21 55" src="https://user-images.githubusercontent.com/18050179/162010866-eb23388b-9038-4d4a-807f-b19346bb475a.png">
<img width="300" alt="Screenshot 2022-04-06 at 17 21 21" src="https://user-images.githubusercontent.com/18050179/162010775-6915bbc0-433a-4157-b184-38d15648fcf0.png">
<img width="300" alt="Screenshot 2022-04-06 at 17 21 39" src="https://user-images.githubusercontent.com/18050179/162010853-5014920e-9ee3-49e6-a2d5-fb629b9bc886.png">

</p>


## Getting Started

These instructions will give you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on deploying the project on a live system.

### Installing

Clone the repository to your local machine

```
git clone https://github.com/singsaker/intern.git
```

Create /backend/.env.development

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
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

Load initial data

```
docker compose exec backend python manage.py loaddata initial_data
docker compose exec backend python manage.py loaddata members
```

This command pushes initial data from fixtures and default superuser:

| Username | Password |
| -------- | :------: |
| admin    | password |

Backend admin is accessed at ```localhost:8000/admin``` with graphQL endpoint ```localhost:8000/graphql```. Frontend runs on ```localhost:3000```
