#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy: github pages'

# if you are deploying to https://vue-aw-components.github.io
# git push -f git@github.com:<USERNAME>/vue-aw-components.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:enyosolutions-team/vue-awesome-components.git master:gh-pages

cd -
