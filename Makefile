all:
	make build
	make install
	sudo make root-install
.PHONY: all

build:
	pnpm build
.PHONY: build

install:
	cp -f ./config/hub.service "$${XDG_DATA_HOME:-"$$HOME/.local/share"}/systemd/user/hub.service"
	systemctl --user daemon-reload
	systemctl --user restart hub
.PHONY: install

root-install:
	sudo cp -f ./config/Caddyfile /etc/caddy/Caddyfile
	sudo systemctl reload caddy
.PHONY: root-install
