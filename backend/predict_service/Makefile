all: dev
prod:
	export FLASK_APP=run.py ; flask run --host=0.0.0.0 --port 5001
dev:
	export FLASK_APP=run.py ; flask run --port 5001
unzip_all:
	@cd models ; unzip 'zip/*.zip'
