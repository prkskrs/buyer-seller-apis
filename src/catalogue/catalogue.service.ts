import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogueDto } from './catalogue.dto';
import { Catalogue } from './catalogue.entity';

interface CatalogueResponse {
    message: string;
    data?: any;
}

@Injectable()
export class CatalogueService {
    constructor(
        @InjectRepository(Catalogue) private cataloguesRepository: Repository<Catalogue>,
    ) { }

    async createCatalogue(postData: CreateCatalogueDto, files: any[]) {
        console.log(files);
        const catalogue = this.cataloguesRepository.create({
            ...postData,
            pdfUrls: files.map(file => file.originalname)
        });
        await this.cataloguesRepository.save(catalogue);
        return {
            message: "Catalogue Created Successfully",
            data: {
                catalogue
            }
        }
    }

    async updateCatalogue(id: number, attrs: Partial<Catalogue>): Promise<CatalogueResponse> {
        const catalogue = await this.cataloguesRepository.findOne({ where: { id } });
        if (!catalogue) {
            throw new Error('Catalogue Not Found');
        }
        Object.assign(catalogue, attrs);
        await this.cataloguesRepository.save(catalogue);
        return {
            message: "Updated Catalogue",
            data: catalogue
        }
    }

    async deleteCatalogue(id: number) {
        const catalogue = await this.cataloguesRepository.findOne({ where: { id } });
        if (!catalogue) {
            throw new Error('Catalogue Not Found');
        }
        return this.cataloguesRepository.remove(catalogue);
    }


    async getCatalogueById(id: number): Promise<CatalogueResponse> {
        const catalogue = await this.cataloguesRepository.findOne({
            where: { id }
        });
        if (!catalogue) {
            throw new NotFoundException('Catalogue not found');
        }
        return {
            message: `Found Catalogue with this  id : ${id}`,
            data: {
                catalogue
            }
        };
    }

    async getCataloguesBySellerId(sellerId: number): Promise<CatalogueResponse> {
        const catalogue = await this.cataloguesRepository.findOne({
            where: { sellerId: sellerId }
        });
        console.log(catalogue);

        if (!catalogue) {
            throw new NotFoundException(`Catalogue not found with this seller id: ${sellerId}`);
        }
        return {
            message: `Found Catalogue with this seller id : ${sellerId}`,
            data: {
                catalogue
            }
        };
    }

    async getCataloguesForBuyer(): Promise<CatalogueResponse> {
        const catalogue = await this.cataloguesRepository.find({
            where: {
                isPrivate: false
            }
        });
        return {
            message: `Catalogue For Buyes`,
            data: {
                catalogue
            }
        };
    }

    async listCatalogue(): Promise<CatalogueResponse> {
        const catalogue = await this.cataloguesRepository.find({});
        return {
            message: "All Catalogues",
            data: {
                catalogue
            }
        };
    }
}


