#!/bin/bash

DOCKER_REPOSITORY="rolfkoenders/gitpoint-api-trending-scraper"
DOCKER_TAG="develop"

echo "Building $DOCKER_REPOSITORY image with tag $DOCKER_TAG"

docker build -t "$DOCKER_REPOSITORY:$DOCKER_TAG" ./
docker push "$DOCKER_REPOSITORY:$DOCKER_TAG"
docker rmi "$DOCKER_REPOSITORY:$DOCKER_TAG"

echo "Image: $DOCKER_REPOSITORY:$DOCKER_TAG pushed successfully"
