import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogueController } from './catalogue.controller';
import { Catalogue } from './catalogue.entity';
import { CatalogueService } from './catalogue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Catalogue])],
  controllers: [CatalogueController],
  providers: [CatalogueService],
  exports: [CatalogueService]
})
export class CatalogueModule { }
