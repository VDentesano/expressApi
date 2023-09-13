const express = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
      "id": 1,
      "titulo": "Nota 1",
      "contenido": "Esta es la primera nota.",
      "fecha_creacion": "2023-09-12T10:00:00Z"
    },
    {
      "id": 2,
      "titulo": "Nota 2",
      "contenido": "Esta es la segunda nota.",
      "fecha_creacion": "2023-09-12T12:30:00Z"
    },
    {
      "id": 3,
      "titulo": "Nota 3",
      "contenido": "Esta es la tercera nota.",
      "fecha_creacion": "2023-09-12T15:15:00Z"
    }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find( note => note.id === id)
  if (note) {
    response.json(note) 
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id != id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  response.json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on pot ${PORT}`)
})
