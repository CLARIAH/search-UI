# search-UI

## 1. Prerequisites / Getting started

- Run `yarn` to install dependencies
- If you want to autodeploy this package to docker, uncomment the `publish` job in `./.gitlab-ci.yml`, and make sure you've create a docker image on docker hub with the name `triply/search-ui`

## 2. Local development

### 2.1 Running locally

```sh
yarn run dev
```

## 3. Releasing

To mark a version as 'stable', run:

```sh
yarn run util:markStable
```
