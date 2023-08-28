dt := $(shell date "+%G-%m-%d %H:%M:%S")

assets:
	git add data/curassets.json
	git commit -m "<docs>Update data at ${dt}" 

all: assets s


s:
	git push -u origin main
