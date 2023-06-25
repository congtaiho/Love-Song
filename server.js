'use strict'

const express = require('express')
const dao = require('./src/server/dao')
const app = express()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())
app.use(express.static('dist'))

const PORT = 8080
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    response.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Credentials', 'false')
    next()
})

app.get('/playlists', function (request, response) {
    dao.connect()
    dao.query('SELECT * FROM playlist', [], (result) => {
        const testObjectString = JSON.stringify(result.rows, null, 4)
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
        response.end(testObjectString)
        dao.disconnect()
    })
})
app.get('/tracks/:playlistId', function (request, response) {
    console.log('playlistId :' + request.params.playlistId)
    dao.connect()
    dao.query('SELECT * FROM track WHERE playlist_id = $1', [request.params.playlistId], (result) => {
        const testObjectString = JSON.stringify(result.rows, null, 4)
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
        response.end(testObjectString)
        dao.disconnect()
    })
})

app.post('/playlists', function (request, response) {
    const element = request.body
    console.log(element)
    dao.connect()
    dao.query('INSERT INTO track (playlist_id, title, uri,master_id) VALUES ($1,$2,$3, $4)', [element.playlist_id, element.title, element.uri, element.masterId], (result, error) => {
        console.log(error, result)
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
    })
})
app.get('/tracks/:playlistId', function (request, response) {
    dao.connect()
    dao.query('SELECT * FROM track WHERE playlist_id = $1', [request.params.playlistId], (result) => {
        const testObjectString = JSON.stringify(result.rows, null, 4)
        response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
        response.end(testObjectString)
        dao.disconnect()
    })
})
// app.get('/nodepgs/:id', function (request, response) {
//     dao.query('SELECT * FROM nodepg WHERE id = $1', [request.params.id], (result) => {
//         const testObjectString = JSON.stringify(result.rows, null, 4)
//         response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
//         response.end(testObjectString)
//     })
// })
// app.post('/', function (request, response) {
//     const element = request.body
//     dao.query('INSERT INTO nodepg (stringField, numberField, booleanField) VALUES ($1,$2,$3)', [element.stringField, element.numberField, element.booleanField], (result, error) => {
//         response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
//         response.end()
//     })
// })
// app.put('/', function (request, response) {
//     const element = request.body
//     dao.query('UPDATE nodepg SET stringField = $1 WHERE id = $2', [element.stringField, element.id], (result, error) => {
//         response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
//         response.end()
//     })
// })
// app.delete('/', function (request, response) {
//     const element = request.body
//     dao.query('DELETE FROM nodepg  WHERE id = $1', [element.id], (result, error) => {
//         response.writeHead(HTTP_OK, { 'Content-Type': CONTENT_TYPE_JSON })
//         response.end()
//     })
// })
app.listen(PORT, function () {
    console.log('Server listening on: http://localhost:%s', PORT)
})
