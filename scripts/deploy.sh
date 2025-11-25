#!/bin/sh

CONTAINER_NAME=$1
IMAGE=$2
PORT=$3

drop_old() {
    echo "📝 Checking if a container named '$CONTAINER_NAME' exists..."

    if [ ! "$(docker container ls -q -f name=$CONTAINER_NAME)" ]; then
        if [ "$(docker container ls -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
            echo "📍 $CONTAINER_NAME has status 'exited', deleting..."
            docker container rm $CONTAINER_NAME
        fi
    else
        echo "📍 $CONTAINER_NAME found and running, deleting..."
        docker container rm $(docker container stop $CONTAINER_NAME)
    fi
}

update_app() {
    echo "🚀 Updating $CONTAINER_NAME..."
    docker pull $IMAGE
    docker container run --name $CONTAINER_NAME \
        -p "127.0.0.1":$PORT:3000 \
        --restart unless-stopped -d \
        --env-file /tmp/.env.$CONTAINER_NAME $IMAGE
}

clean_docker() {
    echo "♻️ Cleanning..."
    docker container prune -f
    docker image prune -f
}

echo "🚧 Deploying $CONTAINER_NAME"
drop_old
update_app
clean_docker
echo "✅ $CONTAINER_NAME deployed successfully!"