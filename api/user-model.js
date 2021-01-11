const shortid = require('shortid')

let users = [
  { id: shortid.generate(), name: 'Rees', bio: 'hallo' },
  { id: shortid.generate(), name: 'Chaz', bio: 'hola' }
]

module.exports = {
  findAll() {
    return Promise.resolve(users)
  }, 

  findById(id) {
    const user = users.find(u => u.id === id)
    return Promise.resolve(user)
  },

  create({ name, bio }) {
    const newUser = { id: shortid.generate(), name, bio }
    dogs.push(newUser)
    return Promise.resolve(newUser)
  },

  update(id, changes) {
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    const updatedUser = { ...changes, id }
    users = users.map(u => (u.id === id) ? updatedUser : d)
    return Promise.resolve(updatedUser)
  },

  delete(id) {
    const user = users.find(user => user.id === id)
    if (!user) return Promise.resolve(null)

    users = users.filter(u => u.id !== id)
    return Promise.resolve(user)
  }
}
