import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma.service';
import { user, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // CRUD / BREAD
  // Create Read Update Delete
  // Browse Read Edit Add Delete
  async getUser(id: number) {
    return this.prisma.user.findFirst({ where: { id } });

    // When using softDeletes:
    // return this.prisma.user.findFirst({
    //   where: {
    //     id,
    //     AND: [
    //       {
    //         deletedAt: null,
    //       },
    //     ],
    //   },
    // });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }
  async createUser(userData: Prisma.userCreateInput): Promise<any> {
    // Validate userData
    if (!userData) {
      throw new Error('INVALID_DATA');
    }

    // Create User in db
    return this.prisma.user.create({
      data: userData,
    });
  }
  async updateUser(id: number, userData: Prisma.userUpdateInput) {
    // Validate userData
    if (!userData) {
      throw new Error('INVALID_DATA');
    }

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: userData,
      select: {
        id: true,
      },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });

    // When using softDeletes
    // return this.prisma.user.update({
    //   where: {
    //     id: id,
    //   },
    //   data: { deletedAt: new Date() },
    // });
  }
}
