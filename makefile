dt := $(shell date "+%G-%m-%d %H:%M:%S")

assets:
	git add data/curassets.json
	git commit -m "<docs>更新資料檔 at ${dt}" 

all: assets s


s:
	git push -u origin main
