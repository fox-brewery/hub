.PHONY: build
build:
	pnpm build

.PHONY: install
install:
	cp -f ./hub.service ~/.local/share/systemd/user/hub.service
	systemctl --user daemon-reload
	systemctl --user restart hub

.PHONY: root-install
root-install:
	cp -f ./Caddyfile /etc/caddy/Caddyfile
	cp -f ./caddy.service /etc/systemd/system/caddy.service
	systemctl daemon-reload
	sudo /home/edwin/.bin/caddy reload --config /etc/caddy/Caddyfile
