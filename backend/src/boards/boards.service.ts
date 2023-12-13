import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardModel } from './entities/board.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/common/const/role.enum';
import { TagModel } from './entities/tag.entity';
import { UserModel } from 'src/users/entities/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(BoardModel)
    private readonly boardRepository: Repository<BoardModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  // CMMT: - Create Board
  async create(createBoardDto: CreateBoardDto, userId: number) {
    const { tags } = createBoardDto;
    const tagList = tags ? this.getTags(tags) : [];

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const board = await this.boardRepository.save({
      ...createBoardDto,
      tags: tagList,
      user,
    });

    return board;
  }

  // CMMT: - Find Board
  async findOne(id: number) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        comments: true,
        user: true,
        tags: true,
      },
    });
    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    return board;
  }

  // CMMT: - Update Board
  async update(
    id: number,
    updateBoardDto: UpdateBoardDto,
    userId: number,
    role: Role,
  ) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
        tags: true,
      },
    });
    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    // TODO: - UpdateBoardDto 내용 확인

    const { tags } = updateBoardDto;
    let tagList = [];
    if (tags) {
      tagList = this.getTags(tags);
    }
    if (board.user.id === userId || role === Role.ADMIN) {
      const updatedBoard = await this.boardRepository.save({
        id,
        ...updateBoardDto,
        tags: tagList,
      });
      return updatedBoard;
    }

    throw new UnauthorizedException('수정 권한이 없습니다.');
  }

  // CMMT: - Delete Board
  async remove(id: number, userId: number, role: Role) {
    const board = await this.boardRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    if (!board) {
      throw new BadRequestException('존재하지 않는 글입니다.');
    }

    if (board.user.id === userId || role === Role.ADMIN) {
      return this.boardRepository.delete(id);
    }

    throw new UnauthorizedException('삭제 권한이 없습니다.');
  }

  // CMMT: - Make Tag List
  getTags(tagList: string): TagModel[] {
    const result = [];
    tagList
      .replace(/#/g, '')
      .split(' ')
      .forEach(async (tag) =>
        result.push(await this.tagRepository.save({ tag })),
      );
    return result;
  }
}
