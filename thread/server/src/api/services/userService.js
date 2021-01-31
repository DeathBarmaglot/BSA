import userRepository from '../../data/repositories/userRepository';
import { encrypt } from '../../helpers/cryptoHelper';

export const getUserById = async userId => {
  const { id, username, email, imageId, image, status } = await userRepository.getUserById(userId);
  return { id, username, email, imageId, image, status };
};

export const getUserByName = async name => {
  const user = await userRepository.getByUsername(name);
  if (user) {
    const { id, username, email, imageId, image, status } = user;
    return { id, username, email, imageId, image, status };
  }
  return { username: undefined };
};

export const getUserByEmail = async mail => {
  const user = await userRepository.getByEmail(mail);
  if (user) {
    const { id, username, email, imageId, image, status, password } = user;
    return { id, username, email, imageId, image, status, password };
  }
  return { username: undefined };
};

export const updateUser = async (userId, user) => {
  const { id, username, email, imageId, image, status } = await userRepository.updateById(userId, user);
  return { id, username, email, imageId, image, status };
};

export const updatePassword = async user => {
  const { password } = await userRepository.getUserById(user.id);
  if (user.pass !== password) {
    return {};
  }
  const { id, username, email, imageId, image, status } = await userRepository.updateById(user.id, {
    password: await encrypt(user.password)
  });
  return { id, username, email, imageId, image, status };
};
