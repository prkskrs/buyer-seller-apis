import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { CatalogueAccessRequestService } from './catalogue-access-request.service';
import { CatalogueAccessRequestController } from './catalogue-access-request.controller';
import { CatalogueAccessRequest } from './catalogue-access-request.enitity';

@Module({
  imports: [TypeOrmModule.forFeature([CatalogueAccessRequest])],
  controllers: [CatalogueAccessRequestController],
  providers: [CatalogueAccessRequestService]
})
export class CatalogueAccessRequestModule { }
