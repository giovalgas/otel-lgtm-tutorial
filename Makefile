init:
	docker swarm leave --force
	docker swarm init
	docker network create --scope=swarm --driver overlay --attachable dockerswarm_monitoring

run-local:
	docker stack deploy -c ./infra/swarm/portainer/portainer.local.yaml portainer

stop:
	docker stack rm portainer
