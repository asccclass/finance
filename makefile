APP?=app
ImageName?=sherry/finance
ContainerName?=finance
PORT?=11015
DBServer?=MySQLx
poolPath?=filepool
MKFILE := $(abspath $(lastword $(MAKEFILE_LIST)))
CURDIR := $(dir $(MKFILE))
STATUS?=master
GOMODULE?=off

init:
	GO111MODULE=on go mod download

build: clean
	clear
	GOOS=linux GOARCH=amd64 GO111MODULE=${GOMODULE} go build -tags netgo \
	-o ${APP}

docker: build
	docker build -t ${ImageName} .
	rm -f ${APP}
	docker images

run: docker
	docker run -d --name ${ContainerName} \
	-v /etc/localtime:/etc/localtime:ro \
	-v /etc/ssl/certs:/etc/ssl/certs \
	-v /etc/pki/ca-trust/extracted/pem:/etc/pki/ca-trust/extracted/pem \
	-v /etc/pki/ca-trust/extracted/openssl:/etc/pki/ca-trust/extracted/openssl \
	-v ${CURDIR}www:/app/www  \
	-v ${CURDIR}tmp:/app/tmp  \
	-v ${CURDIR}envfile:/app/envfile  \
	-p ${PORT}:80 \
	-p ${HTTPS}:443 \
	--env-file ${CURDIR}envfile \
	--restart=always \
	${ImageName}
	sh clean.sh
	clear
	make log	

rm:
	docker rm ${ContainerName}

stop:
	docker stop ${ContainerName}

log:
	docker logs -f -t --tail 20 ${ContainerName}
re: stop rm run

clean:
	go clean
push:
	git push -u origin ${STATUS}

dt := $(shell date "+%G-%m-%d %H:%M:%S")

annual:
	git add data/annualfund.json
	git commit -m "<docs>更新年度費用檔at ${dt}"
parents:
	git add data/parents.json
	git commit -m "<docs>更新孝親費檔 at ${dt}"
assets:
	git add data/curassets.json
	git commit -m "<docs>更新目前資產狀態檔 at ${dt}" 
curmonth:
	git add data/mcycle.json
	git commit -m "<docs>更新財務狀況一覽表資料檔 at ${dt}" 

s:
	git push -u origin main

all: assets parents annual s
