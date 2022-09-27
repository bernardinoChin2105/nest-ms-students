import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { StudentsConstants } from './students.constants';

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

    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {

      const result = await this.dataBase.scan({
        TableName: this.tableName
      }).promise();

      return result.Items;

    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {

      const result = await this.dataBase.get({
        TableName: this.tableName,
        Key: { id }
      }).promise();

      if (!result.Item)
        throw new Error(StudentsConstants.RECORD_RETRIEVED_NOT_FOUND);

      return result.Item;

    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    try {

      let studentInfo = await this.findOne(id);

      if (!updateStudentDto.name)
        studentInfo.name = updateStudentDto.name;

      if (!updateStudentDto.age)
        studentInfo.age = updateStudentDto.age;

      if (!updateStudentDto.phone)
        studentInfo.phone = updateStudentDto.phone;

      if (!updateStudentDto.address)
        studentInfo.address = updateStudentDto.address;

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

    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {

      let studentInfo = await this.findOne(id);
      if (studentInfo.status == HttpStatus.NOT_FOUND)
        return studentInfo;

      await this.dataBase.delete({
        TableName: this.tableName,
        Key: { id }
      }).promise();

    } catch (error) {
      throw error;
    }
  }

}
