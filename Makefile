build-deploy:
	npm run build && aws s3 cp ./dist s3://easy-es --recursive --acl public-read
