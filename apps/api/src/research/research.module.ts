import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchController } from './research.controller';
import { ResearchService } from './research.service';
import { Research } from './research.entity';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { BillingModule } from 'src/billing/billing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Research]), ApiKeyModule, BillingModule],
  controllers: [ResearchController],
  providers: [ResearchService],
  exports: [ResearchService],
})
export class ResearchModule {}
