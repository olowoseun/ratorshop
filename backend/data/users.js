import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Olowogoke Seun',
    email: 'seun@example.com',
    password: bcrypt.hashSync('passcode', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('passcode', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('passcode', 10)
  }
]

export default users