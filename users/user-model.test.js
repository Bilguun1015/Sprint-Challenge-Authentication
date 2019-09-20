const Users = require('./users-model.js');
const db = require('../database/dbConfig.js');

describe('user model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('add', () => {
        it('should add user info into the db', async () => {
            await Users.add({username: 'John', password: 'pass'});
            await Users.add({username: 'Dave', password: 'pass'});
            let user = await db('users');
            expect(user).toHaveLength(2);
        });
        it('should insert user into the db', async () => {
            let user1 = await Users.add({username: 'John', password: 'pass'});
            let user2 = await Users.add({username: 'Dave', password: 'pass'});
            
            expect(user1.username).toBe('John');
            expect(user2.username).toBe('Dave');
        });
    });
    describe('find', () => {
        it('should find all the users from the db', async () => {
            await Users.add({username: 'John', password: 'pass'});
            await Users.add({username: 'Dave', password: 'pass'});
            
            const users = await db('users')
            const usersFind = await Users.find('users')
            expect(users).toEqual(usersFind)
        });
    });
    describe('findBy', () => {
        it('should find by filter from the db', async () => {
            const {username} = await Users.add({username: 'John', password: 'pass'});

            const user = await db('users').where({username}).first()
            const equalUser = await Users.findBy({username})

            expect(user).toEqual(equalUser)


        });
    })
    describe('findById', () => {
        it('should find by id from the db', async () => {
            const {id} = await Users.add({username: 'John', password: 'pass'});
            const user = await db('users').where({id}).first();
            const equalUser = await Users.findById({id})

            expect(user).toEqual(equalUser)


        });
    })
});