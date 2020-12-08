# **Quiz Maker**

### **Introduction**

#### 1.1. Purpose

The purpose of Quiz Maker is to have students take the initiative in the learning process, while making sure the knowledge they learned is preserved after each semester and easily accessible to users in a given course. The intended audience of Quiz Maker is students, faculty and staff at SUNY Oswego.

#### 1.2 Summary

To officially deploy Quiz Maker on live servers, a script would have to be downloaded and run. Since Quiz Maker will run on SUNY Oswego&#39;s pi server, the source of Quiz Maker is stored in specific directories. This script provides a quick and convenient way to sift through those directories and launch all of the components of Quiz Maker.

#### 1.3 Intended Audience

This Deployment Manual is intended to be used by users who intend to install and use Quiz Maker.

#### 1.4 References

1. [https://github.com/join?ref\_cta=Sign+up&amp;ref\_loc=header+logged+out&amp;ref\_page=%2F&amp;source=header-home](https://github.com/join?ref_cta=Sign+up&amp;ref_loc=header+logged+out&amp;ref_page=%2F&amp;source=header-home)
2. [https://github.com/CSC480-20F/quiz-maker](https://github.com/CSC480-20F/quiz-maker)
3. [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/)


### **Preparation**

Quiz Maker must be downloaded from this github repository. Git also needs to be installed on your machine.

If you don&#39;t have git, you can download it [here](https://git-scm.com/downloads).

#### 2.1. Software Requirements

Additionally, for database management, MongoDB must be installed before trying to install Quiz Maker. Both the Community Edition and Enterprise Edition for MongoDB are compatible with Quiz Maker.

To start installing MongoDB Community Edition for either Windows, Mac, or Linux, click [here](https://docs.mongodb.com/manual/administration/install-community/).

To start installing MongoDB Enterprise Edition for Windows, Mac, or Linux, click [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).

### **Installation**

The installation of Quiz Maker starts from this GitHub repository.

Installing Quiz Maker requires cloning this repository.
1. From your browser, copy the cloning link
2. From your terminal, go to the directory you want Quiz Maker to be installed in.
3. After, enter the following command: `git clone [paste the link that you copied here]`
4. Enter your user credentials if prompted to. If you weren&#39;t prompted to enter user credentials, skip to step 5.
5. Press Enter.


### **Configuration**

Once Quiz Maker is downloaded, the script file responsible for launching the web application will have to be modified. The script file travels to the different directories where Quiz Maker is located and launches each microservice from that location.

The script file will have to be modified such that the script will find which directories Quiz Maker is installed in.

The line that will have to be modified is the line below:

`cd /home/mljuljic/Csc480/quiz-maker/Frontend/` (Original)

Change &quot;home/mljuljic/Csc480&quot; to your parent directory that you installed Quiz Maker in.

`cd [Your parent directory that quiz maker is installed in]/quiz-maker/Frontend/` (Updated)

Now the script can properly find the directories that Quiz Maker is located in. 

Quiz Maker is now ready to launch! 🎉
