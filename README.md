# music-collection
music collection app

## building docker containeres
```bash
docker-compose up -d
```

> this will up 3 containers docker:
> * moat-webserver with NGINX
> * moat-tools for PHP and NPM
> * moat-database for MySQL

### setting up database
* create database tables
```base
docker exec -it moat-tools php ./backend/artisan migrate
```

* create first admin user
```base
docker exec -it moat-tools php ./backend/artisan db:seed --class=UserSeeder
```

### running frontend dev
```base
docker exec -it moat-tools npm start --prefix ./frontend
```
