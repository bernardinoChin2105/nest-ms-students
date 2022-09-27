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

  @ApiResponse({ status: HttpStatus.CREATED, description: StudentsConstants.RECORD_CREATED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_CREATED_ERROR })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiBody({ type: CreateStudentDto })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_RETRIEVED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_RETRIEVED_ERROR })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }

  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_RETRIEVED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_RETRIEVED_ERROR })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND })
  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_UPDATED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_UPDATED_SUCCESS })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateStudentDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: StudentsConstants.RECORD_RETRIEVED_NOT_FOUND })
  @ApiResponse({ status: HttpStatus.OK, description: StudentsConstants.RECORD_DELETED_SUCCESS })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: StudentsConstants.RECORD_DELETED_ERROR })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: StudentsConstants.UNAUTHORIZED_SERVICE })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }
}