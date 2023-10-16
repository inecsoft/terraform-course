install:
	npm install

build:
	npm run build

artifacts:	
	# Copy artifacts for deployment
	cp -r .next/* $(ARTIFACTS_DIR)
	cp run.sh $(ARTIFACTS_DIR)

build-NextFunction: install build artifacts