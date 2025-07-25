init:
	docker swarm leave --force
	docker swarm init

run-local:
	docker stack deploy -c ./infra/swarm/portainer/portainer.local.yaml portainer

stop:
	docker stack rm portainer
