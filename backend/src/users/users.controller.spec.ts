import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { usersProviders } from '../common/mock/provider/user.provider';
import { ReqEditUserDto } from './dto/req-editUser.dto';
import { ResGetLoginUserDto } from './dto/res-getLoginUser.dto';
import { ResGetUserDto } from './dto/res-getUser.dto';
import { ResEditUserDto } from './dto/res-editUser.dto';
import { MockUserRepository } from '../common/mock/repository/user.repository';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUser = new MockUserRepository();
  const [user, otherUser] = mockUser.userModels;
  const FUNCTION = 'function';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: usersProviders,
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  // GETLOGINUSER: - make, run, return
  describe('Get Login User', () => {
    const username: string = user.username;

    it('Make | getLoginUser', () => {
      expect(typeof controller.getLoginUser).toBe(FUNCTION);
    });

    it('Run | getLoginUser(username: string)', () => {
      const getLoginUser = jest.fn();
      controller.getLoginUser = getLoginUser;
      controller.getLoginUser(username);
      expect(controller.getLoginUser).toHaveBeenCalledWith(username);
    });

    it('Return | ResGetLoginUserDto', async () => {
      const result = await controller.getLoginUser(username);
      expect(result).toBeInstanceOf(ResGetLoginUserDto);
    });
  });

  // GETUSER: - make, run, return
  describe('Get User', () => {
    const id: number = user.id;

    it('Make | getUser', () => {
      expect(typeof controller.getUser).toBe(FUNCTION);
    });

    it('Run | getUser(id: number)', () => {
      const getUser = jest.fn();
      controller.getUser = getUser;
      controller.getUser(id);
      expect(controller.getUser).toHaveBeenCalledWith(id);
    });

    it('Return | ResGetUserDto', async () => {
      const result = await controller.getUser(id);
      expect(result).toBeInstanceOf(ResGetUserDto);
    });
  });

  // EDITUSER: - make, run, return
  describe('Edit User', () => {
    const id: number = user.id;
    const reqEditUserDto: ReqEditUserDto = {
      nickname: 'newNickname',
      password: 'newPassword',
      image: 'newImageLink',
    };
    const username: string = user.username;

    it('Make | editUser', () => {
      expect(typeof controller.editUser).toBe(FUNCTION);
    });

    it('Run | editUser(id: number, reqEditUserDto: ReqEditUserDto, username: string)', () => {
      const editUser = jest.fn();
      controller.editUser = editUser;
      controller.editUser(id, reqEditUserDto, username);
      expect(controller.editUser).toHaveBeenCalledWith(
        id,
        reqEditUserDto,
        username,
      );
    });

    it('Return | ResEditUserDto', async () => {
      const result = await controller.editUser(id, reqEditUserDto, username);
      expect(result).toBeInstanceOf(ResEditUserDto);
    });
  });

  // DELETEUSER: - make, run, returnx
  describe('Delete User', () => {
    const id: number = user.id;
    const username: string = user.username;

    it('Make | deleteUser', () => {
      expect(typeof controller.deleteUser).toBe(FUNCTION);
    });

    it('Run | deleteUser(id: number, username: string)', () => {
      const deleteUser = jest.fn();
      controller.deleteUser = deleteUser;
      controller.deleteUser(id, username);
      expect(controller.deleteUser).toHaveBeenCalledWith(id, username);
    });

    it.todo('Return | ResDeleteUserDto');
  });

  // GETUSERBOARDS: - makex, runx, returnx
  describe('Get User Boards', () => {
    const id: number = user.id;
    const page: number = 1;

    it.todo('Make | getUserBoards');

    it.todo('Run | getUserBoards(id: number, page: number)');

    it.todo('Return | ResGetUserBoardsDto');
  });

  // CREATEFOLLOW: - makex, runx, returnx
  describe('Create Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it.todo('Make | createFollow');

    it.todo('Run | createFollow(id: number, username: string)');

    it.todo('Return | ResCreateFollowDto');
  });

  // DELETEFOLLOW: - makex, runx, returnx
  describe('Delete Follow', () => {
    const id: number = otherUser.id;
    const username: string = user.username;

    it.todo('Make | deleteFollow');

    it.todo('Run | deleteFollow(id: number, username: string)');

    it.todo('Return | ResDeleteFollowDto');
  });
});
