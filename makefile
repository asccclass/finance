dt := $(shell date "+%G-%m-%d %H:%M:%S")

s:
	git add data/curassets.json
	git commit -m "<docs>Update data at ${dt}" 
	git push -u origin main
