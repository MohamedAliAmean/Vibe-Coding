import { Controller, Post, Get, Body, Param, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { SectionResponseDto } from './dto/section-response.dto';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createSectionDto: CreateSectionDto,
  ): Promise<SectionResponseDto> {
    try {
      const section = await this.sectionsService.create(createSectionDto);
      return {
        id: (section._id as any).toString(),
        idea: section.idea,
        sections: section.sections,
        createdAt: section.createdAt.toISOString(),
      };
    } catch {
      throw new HttpException(
        'Failed to create section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SectionResponseDto> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    try {
      const section = await this.sectionsService.findById(id);
      return {
        id: (section._id as any).toString(),
        idea: section.idea,
        sections: section.sections,
        createdAt: section.createdAt.toISOString(),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to fetch section',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
