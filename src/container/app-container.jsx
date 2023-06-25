import React, { Component } from 'react'
import '../css/styles.css'
import PlaylistSelectComponent from '../component/playlist-select-component'
import MusicData from '../service/music-data'
import SearchInputComponent from '../component/search-input-component'
import AlbumComponent from '../component/album-component'
import TitleComponent from '../component/title-component'
import Youtube from 'react-youtube'
import ListComponent from '../component/list-component'
import CurrentPlaylistTitleComponent from '../component/current-playlist-title-component'

class AppContainer extends Component {
    musicData
    constructor () {
        super()
        this.state = {
            playlist: [],
            playlistTitles: [],
            currentPlaylistId: 1,
            albums: [],
            titles: [],
            albumSearchResults: [],
            showAlbums: true,
            showTitles: false,
            showYoutubeCanvas: true,
            currentVideoId: '',
            currentMasterId: 0,
            currentVideoIndex: 0,
            titleState: []
        }
        this.musicData = new MusicData('wfVaYgaubINbSGlFDRFeHBcaCrgmjwfpGoEJcYgx')
        this.handlePlayNextVideo = this.handlePlayNextVideo.bind(this)
        this.handleCurrentPlaylist = this.handleCurrentPlaylist.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.renderResult = this.renderResult.bind(this)
        this.renderOutput = this.renderOutput.bind(this)
        this.getTitles = this.getTitles.bind(this)
        this.renderTitleResult = this.renderTitleResult.bind(this)
        this.handleAddTitleToDataBase = this.handleAddTitleToDataBase.bind(this)
        this.handlePlayVideo = this.handlePlayVideo.bind(this)
        this.handlePlayPrevVideo = this.handlePlayPrevVideo.bind(this)
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlists')
            .then(response => response.json())
            .then(response => {
                this.setState({ playlist: response })
            })
    }

    handleCurrentPlaylist (event) {
        this.setState({ currentPlaylistId: event.currentTarget.value })
        fetch('http://localhost:8080/tracks/' + event.currentTarget.value, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlistTitles: response })
            })
    }

    handleSearch (event) {
        this.setState({ showAlbums: true, showTitles: false, showYoutubeCanvas: false })
        const params = {
            query: event.target.value,
            perPage: 10
        }
        this.musicData.search(params, this.renderResult)
    }

    getTitles = (masterId) => (event) => {
        this.musicData.getMaster(masterId, this.renderTitleResult)
        this.setState({ showAlbums: false, showTitles: true, currentMasterId: masterId })
    }

    renderTitleResult (data) {
        const tState = new Array(data.length).fill(false)
        this.setState({ titles: data.videos, titleState: tState })
    }

    renderResult (data) {
        this.setState({ albumSearchResults: data.results })
    }

    renderOutput () {
        let retour = null
        if (this.state.showAlbums) {
            retour = this.state.albumSearchResults.map((album, index) => (<AlbumComponent key={index} coverImage={album.cover_image} format={album.format} title={album.title} onClick={this.getTitles(album.master_id)} />))
        } else if (this.state.showTitles) {
            retour = this.state.titles.map((titre, index) => (<TitleComponent key={index} title={titre.title} description={titre.description} onClick={this.handleAddTitleToDataBase(titre, index)} isTitleAdded={this.state.titleState[index] ? 'uil uil-check' : 'uil uil-plus'} />))
        }
        return retour
    }

    renderYoutubeCanvas (opts) {
        if (this.state.showYoutubeCanvas) {
            return (
                <div>
                    <Youtube videoId={this.state.currentVideoId} opts={opts} onEnd={this.handlePlayNextVideo.bind(this)} />
                    <button onClick={this.handlePlayPrevVideo} type='button' class='btn btn-outline-success btn-rounded' data-mdb-ripple-color='dark'><i class='uil uil-previous' /></button>

                    <button onClick={this.handlePlayNextVideo} type='button' class='btn btn-outline-success btn-rounded' data-mdb-ripple-color='dark'><i class='uil uil-step-forward' /></button>

                </div>
            )
        }
    }

    handleAddTitleToDataBase = (music, index) => (event) => {
        const { titleState } = this.state
        titleState[index] = !titleState[index]
        this.setState({ titleState, showAlbums: false, showTitles: false, showYoutubeCanvas: true })
        const data = {
            playlist_id: this.state.currentPlaylistId,
            title: music.title,
            uri: music.uri,
            masterId: this.state.currentMasterId
        }
        console.log(data)
        fetch('http://localhost:8080/playlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json(data))
            .then(response => {
                this.setState({ users: response })
            })
    }

    // je viens d'ajouter ici
    handleItemListClick = (event) => {
        this.musicData.getMaster(event.target.id, this.handleItemListMaster(event))
    }

    // je viens d'ajouter ici mais Je n'ai toujours pas pu afficher la liste à côté de la vidéo youtube. Peut-tu me guider, merci mon ami?
    handleItemListMaster = (event) => (master) => {
        this.setState({ videoId: master.videos[0].uri.substring(master.videos[0].uri.indexOf('v=') + 2, master.videos[0].uri.length) })
    }

    handlePlayVideo = (url, index) => (event) => {
        const urlObject = new URL(url)
        const videoId = urlObject.searchParams.get('v')
        console.log(url)
        console.log(videoId)
        this.setState({ currentVideoId: videoId, currentVideoIndex: index })
    }

    handlePlayNextVideo () {
        const { playlistTitles, currentVideoIndex } = this.state
        const nextIndex = (currentVideoIndex + 1) % playlistTitles.length
        const nextVideo = playlistTitles[nextIndex]

        if (nextVideo) {
            this.handlePlayVideo(nextVideo.uri, nextIndex)()
        }
    }

    handlePlayPrevVideo () {
        const { playlistTitles, currentVideoIndex } = this.state
        const prevIndex = (currentVideoIndex - 1) % playlistTitles.length
        const prevVideo = playlistTitles[prevIndex]

        if (prevVideo) {
            this.handlePlayVideo(prevVideo.uri, prevIndex)()
        }
    }

    render () {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1
            }

        }
        return (

            <div>
                <header>
                    <nav>
                        <div className='row'>
                            <div className='col-md-3'>
                                <h1>Music</h1>

                            </div>
                            <div className='col-md-3'>
                                <PlaylistSelectComponent id='select_playlist_id' name='playlist' options={this.state.playlist} onChange={this.handleCurrentPlaylist} />

                            </div>
                            <div className='col-md-3'>
                                <SearchInputComponent search='search' id='searchbar_id' name='searchbar' placeholder='search...' onChange={this.handleSearch} />

                            </div>

                        </div>

                    </nav>
                </header>
                <main>
                    <div>

                        <div className='resultContainer' style={{ display: 'flex', flexDirection: 'row', gap: '10px', flexWrap: 'wrap', margin: 'auto' }}>

                            {this.renderOutput()}

                        </div>
                        <div style={{ marginLeft: '350px' }}>
                            {this.renderYoutubeCanvas(opts)}
                        </div>
                        <div>
                            <h3>Tracks: </h3>
                            {this.state.playlistTitles.map((titre, index) => (<CurrentPlaylistTitleComponent key={index} title={titre.title} onClick={this.handlePlayVideo(titre.uri, index)} />))}
                        </div>
                        <div className='row justify-content-around '>
                            <div className='col-md-6'>
                                <ListComponent items={this.state.playlistTitles} />

                            </div>
                        </div>
                    </div>
                </main>
            </div>

        )
    }
}

export default AppContainer
