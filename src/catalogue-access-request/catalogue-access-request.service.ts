import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { CatalogueAccessRequest } from './catalogue-access-request.enitity';

interface CatalogueAccessRequestResponse {
    message: string;
    data?: any;
}

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
        return this.catalogueAccessRequestRepository
            .createQueryBuilder('accessRequest')
            .leftJoinAndSelect('accessRequest.buyer', 'buyer')
            .leftJoinAndSelect('accessRequest.catalogue', 'catalogue')
            .where('accessRequest.id = :id', { id })
            .getOne();
    }

    async getAll(): Promise<CatalogueAccessRequest[]> {
        return this.catalogueAccessRequestRepository
            .createQueryBuilder('accessRequest')
            .leftJoinAndSelect('accessRequest.buyer', 'buyer')
            .leftJoinAndSelect('accessRequest.catalogue', 'catalogue')
            .getMany();
    }

    async approveRequest(id: number): Promise<CatalogueAccessRequest> {
        return this.catalogueAccessRequestRepository
            .createQueryBuilder('accessRequest')
            .update(CatalogueAccessRequest)
            .set({ approved: true })
            .where('id = :id', { id })
            .returning('*')
            .execute()
            .then(result => result.raw[0]);
    }

    async delete(id: number): Promise<CatalogueAccessRequestResponse> {
        await this.catalogueAccessRequestRepository.delete(id);
        return {
            message: `Deleted Request with ${id}`
        }
    }
}