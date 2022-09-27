Students API
============
This is a demo project powered by node, nestjs, and serverless framework that provides the services for creating, retrieving, updating, and deleting students from a dynamo database (AWS). 

Using the benefits of serverless framework the project is deployed with minimal effort and serverless does the magic, updating the product version in AWS S3, putting the code in AWS Lambda functions and Generating the AWS Api-Gateway for you.

You can test an online version [here](https://ji8ava28e8.execute-api.us-east-1.amazonaws.com/dev/api).

## Stack
- [Node js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [AWS DynamoDB](https://aws.amazon.com/es/dynamodb/?trk=e48fec2f-eaa4-4036-9c22-7fa1d1f49d3a&sc_channel=ps&s_kwcid=AL!4422!3!536324225757!e!!g!!dynamodb&ef_id=CjwKCAjwm8WZBhBUEiwA178UnOp6B8YjBEAt5Ii5Ayfrb50y3wsq2mHpB7vslPVxcE3q61QvFlszLRoCPasQAvD_BwE:G:s&s_kwcid=AL!4422!3!536324225757!e!!g!!dynamodb)
- [NestJs Framework](https://nestjs.com/)
- [Serverless Framework](https://www.serverless.com/)
- [AWS Lambda](https://aws.amazon.com/es/lambda/)
- [AWS S3](https://aws.amazon.com/es/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Categories=categories%23storage&trk=cb95ec94-ab1e-4e8e-b98f-10f4c919842a&sc_channel=ps&s_kwcid=AL!4422!3!536393996125!e!!g!!aws%20s3&ef_id=CjwKCAjwm8WZBhBUEiwA178UnMsIJObGmW7YErc7aUuQEFMpYTQ5hBHVCwrRvz2Rg6W8Ge0VSTynlBoCB8AQAvD_BwE:G:s&s_kwcid=AL!4422!3!536393996125!e!!g!!aws%20s3)
- [AWS Api-Gateway](https://aws.amazon.com/es/api-gateway/)

## Features
- POST /students (Create a new student)
- GET /students (Retrieve all students)
- GET /students/{id} (Retrieve one student given an id)
- PATCH /students (Update a student)
- DELETE /students (Remove a student)

![online version](https://i.imgur.com/XhanG3j.png)

## Setup

### Requirements
- nodejs installed on your computer. Download [here](https://nodejs.org/en/download/).
- nestjs installed on your computer.
```

$ npm install -g @nestjs/cli

```
- Serverless framework installed on your computer
```

$ npm install -g serverless

```

### Restore packages
Clone the repository to your computer and run the next commands to **restore the node packages and plugins**.
```

$ npm install

```

### AWS configuration
You need to **configure your AWS credentials** before you run your project for the first time. If you need help with the process of configuration you could get help from the official AWS documentation [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html). I seriously encourage you to create a user specifically for your project and you need to take into consideration adding an AdministratorAccess policy to it. 

### Serverless configuration
Open the serverless.yml file and change the following properties based on what you need:

**provider.stage**: Needed for resolving the name of the database to be created and consumed on AWS DynamoDb service.
![provider.stage](https://i.imgur.com/cQCCpPq.png)

**provider.environment.IS_OFFLINE**: Set true if you want your project to work with dynamoDB local instance. 
![provider.environment.IS_OFFLINE](https://i.imgur.com/ho7aGrI.png)

## Run
Start the project locally. The next command will initialize the local dynamoDb instance as well as an instance of your project.
```

$ serverless offline start

```
You should be able to see your instance at https://localhost:3000

## Deploy
Run the next command to deploy your project to your AWS account
```
$ serverless deploy

```
Take into consideration that you are deploying your project based on your AWS CLI configuration (AWS AccessKey, AWS SecretKey, and AWS Region). 

