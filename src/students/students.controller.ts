import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UnauthorizedException, InternalServerErrorException, NotFoundException, HttpException, HttpCode } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsConstants } from './students.constants';
import { ApiBody, ApiHeader, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @ApiHeader({ name: 'Authorization', description: StudentsConstants.AUTHORIZATION_HEADER })
  @ApiResponse({ status: HttpStatus.CREATED, description: StudentsConstants.RECORD_CREATED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_CREATED_ERROR })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiBody({ type: CreateStudentDto })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    this.studentsService.create(createStudentDto);
  }

  @ApiHeader({ name: 'Authorization', description: StudentsConstants.AUTHORIZATION_HEADER })
  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_RETRIEVED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_RETRIEVED_ERROR })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @Get()
  findAll() {
    try {
      return this.studentsService.findAll();
    } catch {
      return new HttpException(StudentsConstants.RECORD_RETRIEVED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiHeader({ name: 'Authorization', description: StudentsConstants.AUTHORIZATION_HEADER })
  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_RETRIEVED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_RETRIEVED_ERROR })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.studentsService.findOne(id);
    } catch {
      return new HttpException(StudentsConstants.RECORD_RETRIEVED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiHeader({ name: 'Authorization', description: StudentsConstants.AUTHORIZATION_HEADER })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND })
  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_UPDATED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_UPDATED_SUCCESS })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateStudentDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    try {
      return this.studentsService.update(id, updateStudentDto);
    } catch {
      return new HttpException(StudentsConstants.RECORD_RETRIEVED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiHeader({ name: 'Authorization', description: StudentsConstants.AUTHORIZATION_HEADER })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND })
  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_DELETED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_DELETED_ERROR })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.studentsService.remove(id);
    } catch {
      return new HttpException(StudentsConstants.RECORD_DELETED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
