const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    titulo: 'Nota 1',
    contenido: 'Esta es la primera nota.',
    fecha_creacion: '2023-09-12T10:00:00Z',
    important: false
  },
  {
    id: 2,
    titulo: 'Nota 2',
    contenido: 'Esta es la segunda nota.',
    fecha_creacion: '2023-09-12T12:30:00Z',
    important: true
  },
  {
    id: 3,
    titulo: 'Nota 3',
    contenido: 'Esta es la tercera nota.',
    fecha_creacion: '2023-09-12T15:15:00Z',
    important: true
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
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  console.log(note)

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    titulo: note.titulo,
    contenido: note.contenido,
    fecha_creacion: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.put('/api/notes/:id', (request, response) => {
  const idExist = notes.some(note => note.id === Number(request.params.id))
  console.log(idExist)

  if (idExist) {
    const bodyNote = request.body
    console.log(bodyNote)

    const oldNote = notes.find(note => note.id = request.params.id)
    console.log(oldNote)

    const newNote = {
      id: request.params.id,
      titulo: oldNote.titulo !== bodyNote.titulo ? bodyNote.titulo : oldNote.titulo,
      contenido: oldNote.contenido !== bodyNote.contenido ? bodyNote.contenido : oldNote.contenido,
      fecha_creacion: new Date().toISOString(),
      important:
        typeof bodyNote.important !== 'undefined' &&
        bodyNote.important === true
          ? oldNote.important !== bodyNote.important ? bodyNote.important : oldNote.important
          : false
    }
    console.log(newNote)

    notes = notes.filter((note) => note.id !== newNote.id)

    notes = [...notes, newNote]

    response.status(204).json(newNote)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on pot ${PORT}`)
})
