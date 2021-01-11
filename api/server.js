const User = require('./user-model')
const express = require('express')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.json({ message: 'hello world' })
})

server.get('/api/users', (req, res) => {
  User.findAll()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ message: 'The users information could not be retrieved.' })
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({ message: `The user with the specified ID does not exist.` })
      } else {
        res.status(200).json(user)
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'The user information could not be retrieved.' })
    })
})

server.post('/api/users', async (req, res) => {
  const user = req.body
  if (!user.name || !user.bio) {
    res.status(400).json({ message: 'Please provide name and bio for the user.' })
  } else {
    try {
      const newlyCreated = await User.create(user)
      res.status(201).json(newlyCreated)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
})

server.put('/api/users/:id', async (req, res) => {
  const id = req.params.id
  const changes = req.body
  if (!changes.name || !changes.bio) {
    res.status(400).json({ message: 'Please provide name and bio for the user.' })
  } else {
    try {
      const updated = await User.update(id, changes)
      if (!updated) {
        res.status(404).json({ message: `The user with the specified ID does not exist.` })
      } else {
        res.status(200).json(updated)
      }
    } catch (error) {
      res.status(500).json({ message: 'The user information could not be modified.' })
    }
  }
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  User.delete(id)
    .then(deleted => {
      if (!deleted) {
        res.status(404).json({ message: `The user with the specified ID does not exist.` })
      } else {
        res.status(200).json(deleted)
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" })
    })
})

module.exports = server