import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto {

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    age: string;

    @ApiProperty({ type: String })
    phone: string;

    @ApiProperty({ type: String })
    address: string;
}