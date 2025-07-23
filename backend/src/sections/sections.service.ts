import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './schemas/section.schema';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<SectionDocument> {
    // Generate mock sections for now
    const sections = [
      'Hero Section',
      'About Us',
      'Services',
      'Testimonials',
      'Contact',
    ];

    const createdSection = new this.sectionModel({
      ...createSectionDto,
      sections,
    });

    return createdSection.save();
  }

  async findById(id: string): Promise<SectionDocument> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) {
      throw new NotFoundException('Section not found');
    }
    return section;
  }
}
