# Running the application locally

### React
1. Run the following command to install all dependencies.
```
npm install
```
1. Run the following command to start the app locally.
```
npm start
```

# Running the application on AWS

### Buildspec.yml
1. These are the instructions for AWS CodeBuild to build the project

### S3 Bucket Configuration
1. Create an S3 bucket
2. Allow public access
3. Configure security groups



### Pipeline
    Go to elastic beanstalk

    Choose S3 for platform

    Codepipeline in searchbar

    Create a pipeline

    Github version 2 for provider

    Connect to github, name it whatever

    Then install new app

    Click rev org then install then connect then choose your repository name then branch main then next

    Build provider is aws code build

    Then create project and name

    Restrict conccurrent builds to one

    Change OS to ubunut

    Change image to 5

    Put group name and stream name then configure then next

    Deploy elastiv beanstalk

    Create pipeline
    
  ### Failed Builds
  1. Utilize the logs to see where the build failed
