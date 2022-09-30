import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';

@Injectable()
export class AuthService {
    private tableName: string;
    private dataBase: DocumentClient;

    constructor() {
        if (process.env.IS_OFFLINE === 'true') {
            this.dataBase = new AWS.DynamoDB.DocumentClient({
                region: 'localhost',
                endpoint: process.env.DYNAMODB_ENDPOINT
            });
        }
        else {
            this.dataBase = new AWS.DynamoDB.DocumentClient();
        }
        this.tableName = process.env.CONFIGURATION_TABLE_NAME;
    }

    async validateApiKey(apiKey: string) {
                
        const result = await this.dataBase.scan({
            TableName: this.tableName
        }).promise();
        
        return result.Items && result.Items.some(x => x.id === apiKey);
    }
}
