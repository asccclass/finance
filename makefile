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
