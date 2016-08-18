#! /usr/bin/env sh

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)

git init

git config user.name "Robot"
git config user.email "robot@phodal.com"

pwd

git remote add upstream "https://$GH_TOKEN@github.com/phodal/growth-web.git"
git fetch upstream
git reset upstream/gh-pages

rm -rf growth/www/assets/.git

pwd

cp -R growth/www/ growth-web/

cd growth-web

pwd

ls -alh

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages
