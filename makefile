install:
	npm install

lint:
	npx eslint .

test:
	npm run test

test-watch:
	npm run test -- --watch

test-coverage:
	npm run test -- --coverage --coverageProvider=v8