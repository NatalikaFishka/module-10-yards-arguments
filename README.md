### Install all dependencies
npm i

### Run Selenium Hub
npm run start.hub

#### Run Node with Chrome
npm run start.node

### Run e2e tests with one Chrome instance
npm run test

#### Following options could be specified

* Use `--browser` flag with `chrome` or `MicrosoftEdge` options to speciry single browser (environment). Default is `chrome`.
```
npm run test -- --browser MicrosoftEdge
```

* Use `--multi` flag to run `chrome` and `MicrosoftEdge` browsers together.
```
npm run test -- --multi
```

* Use `--instance` flag to specify number of parallel browser's instances. Default is `1`.
```
npm run test -- --instance 2
```

* Use `--set` flag with `header`, `footer`, `login_logout` or `trainings` options to specify test suite to run. All sets run by default.
```
npm run test -- --set header
```

* Chain some options
```
npm run test -- --browser MicrosoftEdge --instances 2
```