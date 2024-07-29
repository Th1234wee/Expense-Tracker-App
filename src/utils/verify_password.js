import bcrypt from 'bcrypt';
export const isPasswordValid = (password , hashedPassword) => {
    return bcrypt.compare(password , hashedPassword);
}