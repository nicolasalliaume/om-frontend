echo "Building project.."
npm run build
echo "Commiting new changes.."
git add . 
git commit -m "Building and pushing to heroku"
echo "Pushing to origin.."
git push origin
echo "Pushing to heroku dev:master.."
git push heroku dev:master
echo "Done!"