import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateCatalogueDto, UpdateCatalogueDto } from './catalogue.dto';
import { CatalogueService } from './catalogue.service';
import { ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
interface CatalogueResponse {
    message: string;
    data?: any;
}

@ApiTags('catalogue')
@Controller('catalogue')
export class CatalogueController {
    constructor(private catalogueServices: CatalogueService) { }

    @Post('/create')
    @UseInterceptors(FilesInterceptor('pdfUrls'))
    async createCatalogue(@Body() body: CreateCatalogueDto, @UploadedFiles() files) {
        console.log(1);
        return this.catalogueServices.createCatalogue(body, files);
    }


    @Patch('/update/:id')
    async updateCatalogue(@Param('id') id: number, @Body() body: UpdateCatalogueDto): Promise<CatalogueResponse> {
        return this.catalogueServices.updateCatalogue(id, body);
    }

    @Delete('/delete/:id')
    deleteCatalogue(@Param('id') id: number) {
        return this.catalogueServices.deleteCatalogue(id);
    }

    @Get('/buyer')
    getCataloguesForBuyer(): Promise<CatalogueResponse> {
        return this.catalogueServices.getCataloguesForBuyer();
    }

    @Get('/')
    listCatalogue(): Promise<CatalogueResponse> {
        return this.catalogueServices.listCatalogue();
    }

    @Get('/seller/:sellerId')
    getCataloguesBySellerId(@Param('sellerId') sellerId: number): Promise<CatalogueResponse> {
        return this.catalogueServices.getCataloguesBySellerId(sellerId);
    }

    @Get('/:id')
    getCatalogueById(@Param('id') id: number): Promise<CatalogueResponse> {
        return this.catalogueServices.getCatalogueById(id);
    }


}
