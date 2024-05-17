import { PrismaClient, UserSettings } from "@prisma/client";

export class UserSettingsService {
  private prisma = new PrismaClient();

  async getUserSettings(id: string): Promise<UserSettings | null> {
    return await this.prisma.userSettings.findUnique({
      where: {
        id,
      },
    });
  }

  async updateUserSettings({
    id,
    favoriteStarWarsCharacterSwapiId,
  }: {
    id: string;
    favoriteStarWarsCharacterSwapiId: string | null;
  }): Promise<UserSettings> {
    return await this.prisma.userSettings.update({
      where: {
        id,
      },
      data: {
        favoriteStarWarsCharacterSwapiId:
          favoriteStarWarsCharacterSwapiId ?? undefined,
      },
    });
  }
}
