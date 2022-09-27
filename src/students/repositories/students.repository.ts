import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from '../dto/update-student.dto';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsRepository {

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
        this.tableName = process.env.STUDENTS_TABLE_NAME;
    }

    async create(student: CreateStudentDto): Promise<boolean> {
        try {
            const data = {
                id: uuid(),
                name: student.name,                
                age: student.age,
                phone: student.phone,
                address: student.address,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const result = await this.dataBase.put({
                TableName: this.tableName,
                Item: data
            }).promise();

            return result.$response.error !== null && result.$response.error !== undefined;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<Student[]> {
        try {

            const result = await this.dataBase.query({
                TableName: this.tableName
            }).promise();

            const results = result.Items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    birth_date: item.birth_date,
                    age: item.age,
                    phone: item.phone,
                    address: item.address,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                };
            });

            return results;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: string): Promise<Student> {
        try {

            const result = await this.dataBase.get({
                TableName: this.tableName,
                Key: { id }
            }).promise();

            if (result.Item === null || result.Item === undefined)
                throw new Error("Student not found");

            return {
                id: id,
                name: result.Item.name,
                birth_date: result.Item.birth_date,
                age: result.Item.age,
                phone: result.Item.phone,
                address: result.Item.address,
                createdAt: result.Item.createdAt,
                updatedAt: result.Item.updatedAt
            };

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async update(id: string, student: UpdateStudentDto): Promise<boolean> {
        try {

            let studentInfo = await this.findOne(id);
            if (student.name !== '' && student.name !== undefined && student.name !== null)
                studentInfo.name = student.name;            

            if (student.age !== '' && student.age !== undefined && student.age !== null)
                studentInfo.age = student.age;

            if (student.phone !== '' && student.phone !== undefined && student.phone !== null)
                studentInfo.phone = student.phone;

            if (student.address !== '' && student.address !== undefined && student.address !== null)
                studentInfo.address = student.address;

            const result = await this.dataBase.update({
                TableName: this.tableName,
                Key: { id },
                UpdateExpression: 'set name=:name, birth_date=:birth_date, age=:age, phone=:phone, address=:address, updatedAt=:updatedAt',
                ExpressionAttributeValues: {
                    ':name': studentInfo.name,
                    ':birth_date': studentInfo.birth_date,
                    ':age': studentInfo.age,
                    ':phone': studentInfo.phone,
                    ':address': studentInfo.address,
                    ':updatedAt': new Date().toISOString(),
                },
                ReturnValues: 'ALL_NEW'
            }).promise();

            return result.$response.error !== null && result.$response.error !== undefined;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async delete(id: string): Promise<boolean> {
        try {

            const result = await this.dataBase.delete({
                TableName: this.tableName,
                Key: { id }
            }).promise();

            return result.$response.error !== null && result.$response.error !== undefined;

        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}