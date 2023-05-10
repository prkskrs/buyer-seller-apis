import { Controller, Post, Param, Delete, NotFoundException } from '@nestjs/common';
import { Catalogue } from 'src/catalogue/catalogue.entity';
import { User } from 'src/users/users.entity';
import { CatalogueAccessRequestService } from './catalogue-access-request.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("catalogue-access-requests")
@Controller('catalogue-access-requests')
export class CatalogueAccessRequestController {
    constructor(private readonly catalogueAccessRequestService: CatalogueAccessRequestService) { }

    @Post(':buyerId/:catalogueId')
    async create(@Param('buyerId') buyerId: User, @Param('catalogueId') catalogueId: Catalogue) {
        const createdAccessRequest = await this.catalogueAccessRequestService.create(buyerId, catalogueId);
        return { message: 'Catalogue access request created', accessRequest: createdAccessRequest };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.catalogueAccessRequestService.delete(id);
    }

    @Post(':id/approve')
    async approve(@Param('id') id: number) {
        const approvedAccessRequest = await this.catalogueAccessRequestService.approveRequest(id);
        if (!approvedAccessRequest) {
            throw new NotFoundException(`Catalogue access request with id ${id} not found`);
        }
        return { message: 'Catalogue access request approved', accessRequest: approvedAccessRequest };
    }
}
