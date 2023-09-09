dt := $(shell date "+%G-%m-%d %H:%M:%S")

parents:
	git add data/parents.json
	git commit -m "<docs>更新孝親費檔 at ${dt}"
assets:
	git add data/curassets.json
	git commit -m "<docs>更新資料檔 at ${dt}" 
curmonth:
	git add data/mcycle.json
	git commit -m "<docs>更新財務狀況一覽表資料檔 at ${dt}" 

all: assets s parents


s:
	git push -u origin main
