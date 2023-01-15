pull:
	docker pull alekstar79/colors
run:
	docker run -d -p 80:80 --rm --name colors alekstar79/colors
stop:
	docker stop colors
