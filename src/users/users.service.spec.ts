import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/common/enums/roles.enum';

describe('UsersService', () => {
  let service: UsersService;
  let repository: any;

  beforeEach(async () => {

    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const repositorySpy = jest.spyOn(repository, 'find')
      .mockResolvedValue([{ id: 1, name: 'Lulú', email: 'lulu@gmail.com', role: Role.ADMIN, password: '123' }] as unknown as User[])

      expect(service.findAll()).resolves.toStrictEqual([{ id: 1, name: 'Lulú', email: 'lulu@gmail.com', role: Role.ADMIN, password: '123' }]);
      expect(repositorySpy).toHaveBeenCalledTimes(1);
    });


  })
});
