import { PrismaClient, User } from "@prisma/client";

export class UserService {
  private prisma = new PrismaClient();

  async getUser(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUsers(ids: string[]): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async searchUsers({
    offset,
    limit,
    keywords,
  }: {
    offset: number;
    limit: number;
    keywords: string;
  }): Promise<{
    results: User[];
    total: number;
  }> {
    const users = await this.prisma.user.findMany({
      where: {
        ...(keywords
          ? {
              OR: [
                {
                  firstName: keywords,
                },
                {
                  lastName: keywords,
                },
                {
                  email: keywords,
                },
                {
                  phoneNumber: keywords,
                },
              ],
            }
          : null),
      },
      take: limit,
      skip: offset,
      orderBy: {
        lastName: "desc",
        firstName: "desc",
      },
    });

    return {
      results: users,
      total: users.length,
    };
  }

  async createUser({
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    profileImageUri,
    favoriteStarWarsCharacterSwapiId,
  }: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    profileImageUri?: string;
    favoriteStarWarsCharacterSwapiId?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        profileImageUri,
        ...(favoriteStarWarsCharacterSwapiId
          ? {
              UserSettings: {
                create: {
                  favoriteStarWarsCharacterSwapiId,
                },
              },
            }
          : null),
      },
    });
  }

  async updateUser({
    id,
    firstName,
    lastName,
    phoneNumber,
    profileImageUri,
  }: {
    id: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profileImageUri?: string;
  }): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...(firstName ? { firstName } : null),
        ...(lastName ? { lastName } : null),
        ...(phoneNumber ? { phoneNumber } : null),
        ...(profileImageUri ? { profileImageUri } : null),
      },
    });
  }
}
