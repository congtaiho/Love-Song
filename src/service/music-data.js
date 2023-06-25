const Discogs = require('disconnect').Client

export default class MusicData {
    constructor (userToken) {
        this.discogs = new Discogs({ userToken })

        this.database = this.discogs.database()
    }

    search (params, resultCallback) {
        this.database.search(params.query, { type: 'master', per_page: params.perPage }, function (error, data) {
            console.log(error, data)
            resultCallback(data)
        })
    }

    getMaster (id, resultCallback) {
        this.database.getMaster(id, function (err, master) {
            console.log(err, master)

            resultCallback(master)
        })
    }
}
