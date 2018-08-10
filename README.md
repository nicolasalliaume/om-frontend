# OM - Frontend module
This is the frontend module of OM, a custom-built startup management tool on NodeJS and React. OM helps startups manage the tasks and objectives of the team, as well as billing and alarms. 
This module supports the web interface of the project, and calls the REST APIs from the [Services Module](https://github.com/nicolasalliaume/om-services).

Note: No database is required for this module.

# The full stack
This is one part of a tree-part app.
   * [Services Module](https://github.com/nicolasalliaume/om-services)
   * [Integrations Module](https://github.com/nicolasalliaume/om-integrations)
   
Note: for this module to work you need to install the [Services Module](https://github.com/nicolasalliaume/om-services).

# Inspiration and history

At [ON Lab](http://on-lab.com) we were struggling to get more peace-of-mind about our billing and our tasks. Some of our founders use the [bullet journal](http://bulletjournal.com) method on notebooks, and we thought we could scale that and adopt it company-wide. That's how the first version of OM was born: just as a tool to keep track of the tasks at hand in a bullet journal kinda style.

At the same time, we were using a small app we wrote to track the hours worked for our different projects. So we decided to move the hour-tracking system into OM, and have it all in one place.

So we started adding some tasks into the system, but reality kicked in: most of our clients would send us tasks through email and teamwork. And moving the tasks manually into OM (and potencially forgetting about one) is not what we call peace-of-mind. So we integrated Teamwork, Email and, why not, Slack, the comm tool we use internally. We don't intend to make OM a task management tool though. Many exist and are more than enough for that. But just having them all in one place, where everyone can see them, assign, and track time, just in ***one*** place no matter the client.

Then our "numbers guys" wanted to see how we were doing in a glance. You know, to add another layer of peace-of-mind. We had the hours worked, the invoices we were sending, and we knew whether or not they're paid. So we combined all that to create an overview of the company, with a yearly and a monthly view. Now our numbers guy has so much more peace of mind and feels in control.

Sometimes we hire people for specific projects, under a freelancing contract. And when we do this is very important to keep a close watch at the ours they work because if they reach a certain point we start loosing money. So we needed another layer of peace of mind for this. And so the alarms were born. Now we can create an alarm that goes off if certain user records more than X amount of hours in a certain project. The freelancers can also go into OM and send us an invoice, which is already pre-filled with the hours they've executed. And when we accept it, it goes straight into the project's expenses. This way we know exactly how much profit we get for each project.

This, and a few more things, is OM. OM is peace... of... mind 🙌. Namaste. 🙏.

# Tech description

This module is built on React + Redux + React Router.

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
