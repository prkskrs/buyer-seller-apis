import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { CatalogueAccessRequest } from './catalogue-access-request.enitity';

@Injectable()
export class CatalogueAccessRequestService {
    constructor(
        @InjectRepository(CatalogueAccessRequest)
        private catalogueAccessRequestRepository: Repository<CatalogueAccessRequest>,
    ) { }

    async create(
        buyer: User,
        catalogue: Catalogue,
    ): Promise<CatalogueAccessRequest> {
        const accessRequest = this.catalogueAccessRequestRepository.create({
            buyer,
            catalogue,
            approved: false,
        });
        return this.catalogueAccessRequestRepository.save(accessRequest);
    }

    async getById(id: number): Promise<CatalogueAccessRequest> {
        return this.catalogueAccessRequestRepository.findOne({
            where: {
                id
            },
            relations: ['buyer', 'catalogue'],
        }
        );
    }

    async getAll(): Promise<CatalogueAccessRequest[]> {
        return this.catalogueAccessRequestRepository.find({
            relations: ['buyer', 'catalogue'],
        });
    }

    async approveRequest(id: number): Promise<CatalogueAccessRequest> {
        const accessRequest = await this.getById(id);
        accessRequest.approved = true;
        return this.catalogueAccessRequestRepository.save(accessRequest);
    }

    async delete(id: number): Promise<void> {
        const requestedCatalogue = await this.catalogueAccessRequestRepository.findOne({ where: { id } })
        await this.catalogueAccessRequestRepository.remove(requestedCatalogue);
    }
}