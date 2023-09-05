/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Achievement, Match, Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { CreateMatchDto } from './dto/create-match.dto';
import { error } from 'console';
import { readdir } from 'fs';
import { parse } from 'path';
import { FileUserDto, PutUserDto } from './dto/put-user-dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany({});
  }

  async findUserById(user_id: string): Promise<User> {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: {
          id: user_id,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `This User_id:${user_id} is not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addUser(createUserDto: CreateUserDto) {
    const exist = !!(await this.prismaService.user.findFirst({
      where: {
        OR: [
          { username: createUserDto.username },
          { email: createUserDto.email },
        ],
      },
    }));
    if (exist) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `This Username or email already used`,
        },
        HttpStatus.FORBIDDEN,
        {},
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    try {
      return await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: createUserDto.password,
          achievement: {
            create: {
              accountCreationAchie: true,
            },
          },
        },
        select: {
          id: true,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteUserByUsername(user_id: string) {
    try {
      return await this.prismaService.user.delete({
        where: {
          id: user_id,
        },
        select: { id: true },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NO_CONTENT,
          error: `There is no content for ${user_id}`,
        },
        HttpStatus.NO_CONTENT,
        {},
      );
    }
  }

  async findUserName(username: string): Promise<User> {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: {
          username: username,
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `This username :${username} is not found.`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async achievementById(username: string): Promise<Achievement> {
    try {
      const user = await this.findUserName(username);
      return await this.prismaService.achievement.findUnique({
        where: {
          id: user.id,
        },
      });
    } catch (error) {}
  }

  async getMatchesByUserId(
    @Param('user_id') user_id: string,
  ): Promise<Match[]> {
    try {
      return await this.prismaService.match.findMany({
        where: {
          OR: [{ winner_id: user_id }, { loser_id: user_id }],
        },
        orderBy: {
          played_at: 'desc',
        },
      });
    } catch (error) {
      // console.log(error);
    }
  }

  async createMatch(createMatchDto: CreateMatchDto) {
    try {
      await this.prismaService.user.update({
        where: { id: createMatchDto.winner_id },
        data: {
          win: { increment: 1 },
          totalGames: { increment: 1 },
        },
      });
      await this.prismaService.user.update({
        where: { id: createMatchDto.loser_id },
        data: {
          loss: { increment: 1 },
          totalGames: { increment: 1 },
        },
      });
      return await this.prismaService.match.create({
        data: {
          winner_id: createMatchDto.winner_id,
          loser_id: createMatchDto.loser_id,
          winner_score: createMatchDto.winner_score,
          loser_score: createMatchDto.loser_score,
        },
        select: {
          id: true,
        },
      });
    } catch (error) {}
  }

  async updateUser(body, req) {
    try {
      const hashedPass = await bcrypt.hash(body.password, 10);
      return await this.prismaService.user.update({
        where: { id: req.user.id },
        data: {
          password: hashedPass,
          username: body.username,
        },
      });
    } catch (error) {
      // console.log(error);
    }
  }
  async updateAvatarorCover(
    infos: FileUserDto,
    userId: string,
    toBeUpdated: string,
  ) {
    if (toBeUpdated === 'avatar') {
      try {
        return await this.prismaService.user.update({
          where: { id: userId },
          data: {
            avatar: `http://127.0.0.1:8080/api/avatar/pictures/${infos.avatar}`,
          },
        });
      } catch (err) {
        // console.log(err);
      }
      {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Avatar image  error occured`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } else if (toBeUpdated === 'cover') {
      try {
        return await this.prismaService.user.update({
          where: { id: userId },
          data: {
            cover: `http://127.0.0.1:8080/api/cover/pictures/${infos.cover}`,
          },
        });
      } catch (err) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `Cover image  error occured`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }

  async UpdateUserName(user: PutUserDto, UserId: string) {
    try {
      return await this.prismaService.user.update({
        where: { id: UserId },
        data: {
          username: user.username,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  
  async UpdateAllInfos(user: PutUserDto, userId: string) {

    let hashedPass = null;
    if (user.password)
         hashedPass = await bcrypt.hash(user.password, 10);
    try {
      if (user.username && user.password) {
        console.log('In both!!!!');

        return await this.prismaService.user.update({
          where: { id: userId },
          data: {
            username: user.username,
            password: hashedPass,
          },
        });
      }
      else if  (user.username) {
        console.log('UserName');
        return await this.prismaService.user.update({
          where: { id: userId },
          data: {
            username: user.username,
          },
        });
      }
      else if (user.password) {
        console.log('only password');
        return await this.prismaService.user.update({
          where: { id: userId },
          data: {
            password: hashedPass,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getAllUserRank() {
    const rankedUser = await this.prismaService.user.findMany({
      orderBy:{
        xp:'desc',
      },
      select:{
        id:true,
        username:true,
        xp:true,
      }
    })
    return rankedUser;
  }

  async getUserRankById(user_id:string) {
      const user = await this.prismaService.user.findUnique({
        where:{
          id:user_id,
        }
      })
      if (!user){
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User Not Found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const rankedUsers = await this.getAllUserRank();
      let index = rankedUsers.findIndex((usr) => usr.id === user_id);
      if (index === 0)
        return 1;
      return index;
  }

  // async getFileUpload(fileTarget, category) {
  //   let userFile: any = undefined;
  //   const assets = await readdir(`./images/${category}`);
  //   // loop over the files in './uploads' and set the userFile var to the needed file
  //   for (const file of assets) {
  //     const {base} = parse(file)
  //     if (base === fileTarget) {
  //       userFile = file;
  //       break;
  //     }
  //   }
  //   if (userFile) {
  //     console.log("file found");
  //     return true
  //   }
  //   else
  //   {
  //     console.log("file not found");
  //     return false
  //   }
  // }
}
