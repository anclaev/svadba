import { User, UserRole, UserStatus } from '#prisma'

export const mockUsers: User[] = [
  {
    id: '8aef09fb-d437-4819-b457-1b78142c7e15',
    // 'testpassword'
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$88jcwGfI8M/lEX4usr975A$dD0djovYthAyaaGLjpG6LxBYx1AAVS9jo02T3Dbg9iE',
    login: 'test_admin',
    isTelegramVerified: false,
    credentials: [],
    name: 'Test 1',
    role: UserRole.ADMIN,
    telegramId: null,
    status: UserStatus.ACCEPTED,
    createdAt: new Date(),
  },
  {
    id: 'add67164-71a3-44ca-90a8-337421db0b36',
    // 'testpassword'
    password:
      '$argon2id$v=19$m=65536,t=3,p=4$88jcwGfI8M/lEX4usr975A$dD0djovYthAyaaGLjpG6LxBYx1AAVS9jo02T3Dbg9iE',
    login: 'test_public',
    isTelegramVerified: false,
    credentials: [],
    name: 'Test 2',
    role: UserRole.PUBLIC,
    telegramId: null,
    status: UserStatus.CREATED,
    createdAt: new Date(),
  },
]
