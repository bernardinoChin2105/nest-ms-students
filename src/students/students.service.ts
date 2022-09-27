import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { StudentsConstants } from './students.constants';
import { RestoreTableFromBackupInputFilterSensitiveLog } from '@aws-sdk/client-dynamodb';

@Injectable()
export class StudentsService {
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

  async create(createStudentDto: CreateStudentDto) {
    try {
      const data = {
        id: uuid(),
        name: createStudentDto.name,
        age: createStudentDto.age,
        phone: createStudentDto.phone,
        address: createStudentDto.address
      };

      await this.dataBase.put({
        TableName: this.tableName,
        Item: data
      }).promise();

      return {
        statusCode: HttpStatus.CREATED,
        message: StudentsConstants.RECORD_CREATED_SUCCESS
      }

    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: StudentsConstants.RECORD_CREATED_ERROR
      }
    }
  }

  async findAll() {
    try {

      const result = await this.dataBase.scan({
        TableName: this.tableName
      }).promise();

      return {
        statusCode: HttpStatus.OK,
        message: StudentsConstants.RECORD_RETRIEVED_SUCCESS,
        data: result.Items
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: StudentsConstants.RECORD_RETRIEVED_ERROR
      }
    }
  }

  async findOne(id: string) {
    try {

      const result = await this.dataBase.get({
        TableName: this.tableName,
        Key: { id }
      }).promise();

      if (!result.Item)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND
        };

      return {
        statusCode: HttpStatus.OK,
        message: StudentsConstants.RECORD_RETRIEVED_SUCCESS,
        data: result.Item
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: StudentsConstants.RECORD_RETRIEVED_ERROR
      }
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    try {

      let studentInfo = await this.findOne(id);
      if (!studentInfo.data)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND
        };

      if (updateStudentDto.name)
        studentInfo.data.name = updateStudentDto.name;

      if (updateStudentDto.age)
        studentInfo.data.age = updateStudentDto.age;

      if (updateStudentDto.phone)
        studentInfo.data.phone = updateStudentDto.phone;

      if (updateStudentDto.address)
        studentInfo.data.address = updateStudentDto.address;

      await this.dataBase.update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: 'set #nm=:name, age=:age, phone=:phone, address=:address',
        ExpressionAttributeValues: {
          ':name': studentInfo.data.name,
          ':age': studentInfo.data.age,
          ':phone': studentInfo.data.phone,
          ':address': studentInfo.data.address
        },
        ExpressionAttributeNames: {
          '#nm': 'name'
        },
        ReturnValues: 'ALL_NEW'
      }).promise();

      return {
        statusCode: HttpStatus.OK,
        message: StudentsConstants.RECORD_UPDATED_SUCCESS
      }

    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: StudentsConstants.RECORD_UPDATED_ERROR
      }
    }
  }

  async remove(id: string) {
    try {
      let studentInfo = await this.findOne(id);
      if (!studentInfo.data)
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND
        };

      await this.dataBase.delete({
        TableName: this.tableName,
        Key: { id }
      }).promise();

      return {
        statusCode: HttpStatus.OK,
        message: StudentsConstants.RECORD_DELETED_SUCCESS
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: StudentsConstants.RECORD_DELETED_ERROR
      }
    }
  }
}
