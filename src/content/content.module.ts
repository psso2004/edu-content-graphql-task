import { Module } from '@nestjs/common';
import { EducationalContentModule } from './modules/educational-content/educational-content.module';

@Module({
  imports: [EducationalContentModule],
})
export class ContentModule {}
