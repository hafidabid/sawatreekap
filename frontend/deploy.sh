docker compose -f docker-compose.yml down
# docker rmi $(docker images -f "dangling=true" -q) || true

docker compose -f docker-compose.yml pull
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d --remove-orphans