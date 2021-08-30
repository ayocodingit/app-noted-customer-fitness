# App Noted Customer Fitness

<a href="https://codeclimate.com/github/ayocodingit/app-noted-customer-fitness/maintainability"><img src="https://api.codeclimate.com/v1/badges/b30ccd451888886a9f6e/maintainability" /></a>
<a href="https://codeclimate.com/github/ayocodingit/app-noted-customer-fitness/test_coverage"><img src="https://api.codeclimate.com/v1/badges/b30ccd451888886a9f6e/test_coverage" /></a>

## Stack
- **Node.js** - [http://nodejs.org/](http://nodejs.org/)
- **Adonis Js** - [https://legacy.adonisjs.com/](https://legacy.adonisjs.com/)

## Quick Start

Clone project and install dependencies:
```bash
git clone https://github.com/ayocodingit/app-noted-customer-fitness.git
cd app-noted-customer-fitness
(cd ./src && cp .env.example .env)
```

* Run manually
```
install dependencies
$ make install
migrate
$ make migrate
seed
$ make seed
test
$ make test
```

* Run on locally with docker :

```
install
$ make docker-run-dev-install
start
$ make docker-run-dev
migrate
$ make docker-run-dev-migrate
seed
$ make docker-run-dev-seed
test
$ make docker-run-dev-test
stop
$ make docker-run-dev-stop
```

* Run on production with docker :

```
start
$ make docker-run
stop
$ make docker-stop
```

## Repo Structure
```
├── .github/
  └── workflows/
    └── ...
├── docker/
  └── ...
├── k8s/
  └── ...
├── src/
  └── Adonis Structure
├── .codeclimate.yml
├── Makefile
├── docker-compose-dev.yml
├── docker-compose.yml
└── ...
```

## Adonis Structure
```
├── app/
  └──...
├── config/
  ├── app.js
  ├── auth.js
  └── ...
├── database/
  ├── migrations/
  ├── seeds/
  └── factory.js
├── public/
├── resources/
  ├── ...
  └── views/
├── storage/
├── start/
  ├── app.js
  ├── kernel.js
  └── routes.js
├── test/
├── utils/
├── ace
├── server.js
└── package.json
```

