import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.TEST_ENV_VAR);

//throw new Error('This is an error from the child process');