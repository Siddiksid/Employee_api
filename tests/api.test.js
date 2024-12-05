const request = require('supertest');
const { app } = require('../index.js');
const { getAllEmployees, getEmployeeById } = require('../controllers');
const http = require('http');
const { beforeEach } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller functions test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return All Employees', () => {
    let mockEmployess = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployees.mockReturnValue(mockEmployess);
    let result = getAllEmployees();
    expect(result).toEqual(mockEmployess);
    expect(result.length).toBe(3);
  });

  it('should return employee by id', () => {
    let mockEmployee = {
      employeeId: 3,
      name: 'Ankit Verma',
      email: 'ankit.verma@example.com',
      departmentId: 1,
      roleId: 3,
    };
    getEmployeeById.mockReturnValue(mockEmployee);
    let result = getEmployeeById(3);
    expect(result).toEqual(mockEmployee);
  });
});

describe('Api Endpoints test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('/employees should return all Employees', async () => {
    let res = await request(server).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body.employees.length).toBe(3);
    expect(res.body).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul Sharma',
          email: 'rahul.sharma@example.com',
          departmentId: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Priya Singh',
          email: 'priya.singh@example.com',
          departmentId: 2,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Ankit Verma',
          email: 'ankit.verma@example.com',
          departmentId: 1,
          roleId: 3,
        },
      ],
    });
  });

  it('should return particular employee by Id', async () => {
    let res = await request(server).get('/employees/details/3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    });
  });
});
