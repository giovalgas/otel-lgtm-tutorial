init:
	docker swarm leave --force
	docker swarm init
	docker network create --scope=swarm --driver overlay --attachable dockerswarm_monitoring
	docker config create grafana.ini ./infra/swarm/monitoring/grafana-ui/configs/grafana.ini
	docker config create loki.yaml ./infra/swarm/monitoring/grafana-loki/configs/loki.yaml
	docker volume create minio-data

run-local:
	docker stack deploy -c ./infra/swarm/portainer/portainer.local.yaml portainer

stop:
	docker stack rm portainer
