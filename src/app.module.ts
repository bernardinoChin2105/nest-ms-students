import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [StudentsModule, AuthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('students');
  }
}
