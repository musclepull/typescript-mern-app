backend:
	docker-compose -f docker-compose.yaml up --build

# To test oauth using Github
#https://github.com/login/oauth/authorize?client_id=5ef1ea991f055ab133d3&redirect_uri=http://localhost:3001/github?scope=user:email
#https://github.com/login/oauth/authorize?client_id=5ef1ea991f055ab133d3&redirect_uri=http://localhost:3001/github?scope=user:email 