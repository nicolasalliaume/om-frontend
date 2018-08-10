# OM - Frontend module
This is the frontend module of OM, a custom-built startup management tool on NodeJS and React. OM helps startups manage the tasks and objectives of the team, as well as billing and alarms. 
This module supports the web interface of the project, and calls the REST APIs from the [Services Module](https://github.com/nicolasalliaume/om-services).

Note: No database is required for this module.

# The full stack
This is one part of a tree-part app.
   * [Services Module](https://github.com/nicolasalliaume/om-services)
   * [Integrations Module](https://github.com/nicolasalliaume/om-integrations)
   
Note: for this module to work you need to install the [Services Module](https://github.com/nicolasalliaume/om-services).

# Installation
The following installation sequence explains how to set it up on Heroku, but feel free to use any server provider you want.

1. [Create a new Heroku app](https://devcenter.heroku.com/articles/creating-apps)

2. [Set up the following environment variables on the newly created Heroku app](https://devcenter.heroku.com/articles/config-vars#managing-config-vars):
    * `REACT_APP_OM_SERVICES_URL`: URL of your installation of OM - Services module in the form `https://some-url.com:3000`
    * `REACT_APP_OM_API_VERSION`: Use `1.0`
    
3. [Add the Heroku git remote to your local repo](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)

4. [Push the code to Heroku](https://devcenter.heroku.com/articles/git#deploying-code) (Note: if your pushing from the `dev` branch, do `git push heroku dev:master`)

# Accessing the frontend

Open up a browser window and go to your app url.
If you followed the installation sequence for the [Services Module](https://github.com/nicolasalliaume/om-services) all the way through, you should have an admin user created with logins admin/admin. Add the following string at the end of your app's url: `/#/login/null/YWRtaW4=:YWRtaW4=`. That should do the trick.

# Screenshots

![Main Dashboard](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/1.png "Main Dashboard")
![Tasks list](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/2.png "Tasks list")
![Billing View](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/3.png "Billing view")
![Project Status](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/4.png "Project Status")
![Monthly Overview](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/5.png "Monthly Overview")
![Yearly Overview](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/6.png "Yearly Overview")
![Alarms Dashboard](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/7.png "Alarms Dashboard")
![Create new alarm](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/8.png "Create new alarm")
![Integrations Dashboard](https://s3-us-west-2.amazonaws.com/onlab-tmp-bucket/om-screenshots/9.png "Integrations Dashboard")

# Support
If you get stuck while installing this module or have any questions just hmu at nicolas@on-lab.com

# Thanks
This project was bootstrapped using [Create React App](https://github.com/facebookincubator/create-react-app)
