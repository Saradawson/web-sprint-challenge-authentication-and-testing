const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

beforeEach(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /register', () => {
  const andy = { username: 'andy', password: '1234' }
  test('responds with 201 created', async () => {
    const res = await request(server).post('/api/auth/register').send(andy)
    expect(res.status).toBe(201)
  })
  test('responds with newly created user', async () => {
    const res = await request(server).post('/api/auth/register').send(andy)
    expect(res.body).toMatchObject({ username: 'andy' })
  })
})
describe('[POST] /login', () => {
  const andy = { username: 'andy', password: '1234' }
  test('responds with 200 ok', async () => {
    await request(server).post('/api/auth/register').send(andy)
    const res = await request(server).post('/api/auth/login').send(andy)
    expect(res.status).toBe(200)
  })
  test('responds with welcome message', async () => {
    await request(server).post('/api/auth/register').send(andy)
    const res = await request(server).post('/api/auth/login').send(andy)
    expect(res.body.message).toBe('welcome, andy')
  })
})
describe('[GET] /jokes', () => {
  const andy = { username: 'andy', password: '1234' }
  test('responds with jokes when authorized', async () => {
    await request(server).post('/api/auth/register').send(andy)
    const res = await request(server).post('/api/auth/login').send(andy)
    const jokes = await request(server).get('/api/jokes').set('authorization', res.body.token)
    expect(jokes.body).toHaveLength(3)
  })
  test('responds with 200 ok', async () => {
    await request(server).post('/api/auth/register').send(andy)
    const res = await request(server).post('/api/auth/login').send(andy)
    const jokes = await request(server).get('/api/jokes').set('authorization', res.body.token)
    expect(jokes.status).toBe(200)
  })
})
