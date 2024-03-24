import { genSaltSync, hashSync } from 'bcrypt';

const salt = genSaltSync(10); // Generate a salt for password hashing

const usersSeed = [
    {
        email: 'demo@demo.com',
        password_hash: hashSync('demo', salt),
        password_salt: salt,
        first_name: 'Stan',
        last_name: 'Gold',
        avatar: 'https://i.imgur.com/7V9tqy6.png'
    }, 
    {
        email: 'borjomi@gmail.com',
        password_hash: hashSync('borjomi', salt),
        password_salt: salt,
        first_name: 'Taras',
        last_name: 'Motuga',
        avatar: 'https://i.imgur.com/3KHckHc.png'
    }
];

export { usersSeed };