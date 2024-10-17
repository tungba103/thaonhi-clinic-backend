import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { makePaginationResponse } from 'src/utils/common.utils';
import { FilterCustomerDto } from './dto/filter-customer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private prismaService: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const findByParentPhone = await this.prismaService.customer.findUnique({
      where: { parentPhone: createCustomerDto.parentPhone },
    });

    if (findByParentPhone) {
      throw new ConflictException(
        `Customer with parent phone ${createCustomerDto.parentPhone} existed found`,
      );
    }

    const newCustomer = await this.prismaService.customer.create({
      data: {
        name: createCustomerDto.name,
        gender: createCustomerDto.gender,
        birthDate: createCustomerDto.birthDate
          ? new Date(createCustomerDto.birthDate)
          : null,
        parentName: createCustomerDto.parentName,
        parentPhone: createCustomerDto.parentPhone,
        address: createCustomerDto.address,
      },
    });
    return newCustomer;
  }

  async getListCustomers(filter: FilterCustomerDto) {
    const [customers, total] = await Promise.all([
      this.findAll(filter),
      this.count(filter),
    ]);

    return makePaginationResponse(
      customers,
      filter.page,
      filter.pageSize,
      total,
    );
  }

  async findOne(id: number) {
    const customer = await this.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const updatedCustomer = await this.prismaService.customer.update({
      where: { id },
      data: {
        name: updateCustomerDto.name,
        gender: updateCustomerDto.gender,
        birthDate: updateCustomerDto.birthDate
          ? new Date(updateCustomerDto.birthDate)
          : null,
        parentName: updateCustomerDto.parentName,
        parentPhone: updateCustomerDto.parentPhone,
        address: updateCustomerDto.address,
        isActive: updateCustomerDto.isActive,
      },
    });
    return updatedCustomer;
  }

  async remove(id: number) {
    const customer = await this.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    const deletedCustomer = await this.prismaService.customer.delete({
      where: { id },
    });
    return deletedCustomer;
  }

  // Repository method
  async findById(id: number) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
    });
    return customer;
  }

  async findByParentPhone(parentPhone: string) {
    const customer = await this.prismaService.customer.findFirst({
      where: { parentPhone },
    });
    return customer;
  }

  private whereCondition(filter: FilterCustomerDto): Prisma.CustomerWhereInput {
    const { search } = filter;
    return {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          parentPhone: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ],
    };
  }

  async findAll(filter: FilterCustomerDto) {
    const { page, pageSize } = filter;
    const whereCondition = this.whereCondition(filter);

    const customers = await this.prismaService.customer.findMany({
      where: whereCondition,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return customers;
  }

  async count(filter: FilterCustomerDto) {
    const whereCondition = this.whereCondition(filter);
    const count = await this.prismaService.customer.count({
      where: whereCondition,
    });
    return count;
  }
}
