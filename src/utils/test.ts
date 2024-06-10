const userMock = {
  findMany: jest.fn(),
  findUnique: jest.fn(),
  create: jest.fn(),
};

const prismaMock = {
  user: userMock,
};

export default prismaMock;