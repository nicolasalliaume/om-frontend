echo "==> [STEP] Setting Heroku account to personal.."
heroku accounts:set personal
echo "==> [STEP] Building project.."
npm run build
echo "==> [STEP] Commiting new changes.."
git add . 
git commit -m "Building and pushing to heroku"
echo "==> [STEP] Pushing to origin.."
git push origin
echo "==> [STEP] Pushing to heroku dev:master.."
git push heroku dev:master
echo "==> [STEP] Done!"