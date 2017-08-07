#!/bin/bash

DOCKER_REPOSITORY="rolfkoenders/gitpoint-api-trending-scraper"
DOCKER_TAG="develop"	# default tag

if [ "$TRAVIS_BRANCH" == "master" ]
then
	$DOCKER_TAG="master"
fi

echo "Docker login"
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

echo "Building $DOCKER_REPOSITORY image with tag $DOCKER_TAG"
docker build -t "$DOCKER_REPOSITORY:$DOCKER_TAG" ./

docker push "$DOCKER_REPOSITORY:$DOCKER_TAG"
echo "Image: $DOCKER_REPOSITORY:$DOCKER_TAG pushed successfully"

