# Default target
.DEFAULT_GOAL := help

# Colors for pretty output
YELLOW := \033[1;33m
RESET := \033[0m

help:
	@echo "$(YELLOW)Available commands:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

#dev

dev-up: 
	docker compose --profile dev up --build

dev-down:
	docker compose down

dev-re: dev-down 
	docker compose --profile dev up --build

#prod:

prod-up: 
	docker compose --profile prod up --build

prod-down: 
	docker compose down

prod-re: prod-down 
	docker compose --profile prod up --build

#utils: 

logs:
	docker compose logs -f

clean-all:
	docker compose down -v --remove-orphans
