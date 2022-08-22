# Development
servers:
	make -j 2 django-server npm-server

django-server:
	docker-compose -f docker-compose.yaml up --build
npm-server:
	cd frontend && yarn start