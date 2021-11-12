import { v4 as uuidv4 } from 'uuid';

const randomUuidv4 = uuidv4();


const showRandomString = () => {

  const now = new Date();
  const timestampNow = now.toISOString();
  console.log(`${timestampNow}: ${randomUuidv4}`);

  setTimeout(showRandomString, 5000);
}

showRandomString();
