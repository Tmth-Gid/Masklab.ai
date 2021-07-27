.PHONY: activate
activate: ## activate the virtualenv associate with this project
	pipenv shell

.PHONY: build
build: ## build the webserver for development
	docker-compose build

# @see http://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.DEFAULT_GOAL := help
.PHONY: help
help: ## provides cli help for this makefile (default)
	@grep -E '^[a-zA-Z_0-9-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: lint_api
lint_api: ## run pylint
	cd services/hub_server; $(MAKE) lint_api

.PHONY: lint_input
lint_input: ## run pylint
	cd services/hub_server; $(MAKE) lint_input

.PHONY: tests
tests: ## run pylint
	cd services/hub_server; $(MAKE) tests

.PHONY: install_requirements_dev
install_requirements_dev: ## install pip requirements for development
	pipenv install --dev


.PHONY: update
update: ## update the project dependencies based on setup.py declaration
	pipenv update

.PHONY: install
install: ## install all dependencies
	$(warning LAUNCH DOCKER BEFORE STARTING THE INSTALLATION)
	@echo "Docker is started? [y/N] " && read ans && [ $${ans:-N} = y ]
	docker-compose build mongo_db
	pipenv install --dev --skip-lock
	cd services/hub_server/hub_output && npm install

.PHONY: run_api
run_api: ## Run flask server
	cd services/hub_server; $(MAKE) run_api

.PHONY: run_web
run_web: ## Run react web
	cd services/hub_server; $(MAKE) run_web

.PHONY: run_mongo
run_mongo: ## Run server mongodb
	docker-compose up mongo_db

.PHONY: run_camera
run_camera: ## Run application opencv
	pipenv run python services/hub_server/hub_input/app.py

.PHONY: start
start: run_api run_web run_mongo