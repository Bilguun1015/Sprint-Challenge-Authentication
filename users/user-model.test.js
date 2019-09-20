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
            const [id] = await Users.add({username: 'John', password: 'pass'});
            const [id2] = await Users.add({username: 'Dave', password: 'pass'});

            let user1 = await db('users').where({id}).first();
            let user2 = await db('users').where({id : id2}).first();

            expect(user1.name).toBe('John');
            expect(user2.name).toBe('Dave');
        });
    });
});