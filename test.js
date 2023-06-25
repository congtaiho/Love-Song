
'use strict'

const MusicData = require('./src/service/music-data').default

const mD = new MusicData('wfVaYgaubINbSGlFDRFeHBcaCrgmjwfpGoEJcYgx')
const params = {
    query: 'Pink Floyd',
    perPage: 10
}

mD.search(params, (data) => {
    console.log(data)
})
