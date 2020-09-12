"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  users = [];

  async create({
    name,
    email,
    password
  }) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)(),
      name,
      email,
      password
    });
    this.users.push(user);
    return user;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  async findById(id) {
    const user = this.users.find(userStored => userStored.id === id);
    return user;
  }

  async findByEmail(email) {
    const user = this.users.find(userStored => userStored.email === email);
    return user;
  }

  async findAllProviders({
    except_user_id
  }) {
    let {
      users
    } = this;

    if (except_user_id) {
      users = this.users.filter(usersStored => usersStored.id !== except_user_id);
    }

    return users;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;