import Users from '../models/User';

export default {
  render(user: Users) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.create_at
    }
  },

  renderMany(users: Users[]) {
    return users.map(user => this.render(user));
  }
}