const getPlaylistListByUser = async () => {
    return {
        success: true,
        data: [
            {
                added_to_playlist: false,
                playlist_mame: 'Watch later'
            },
            {
                added_to_playlist: false,
                playlist_mame: 'New playlist'
            }
        ]
    }
}

const addToPlaylist = async (videoId, playlistId, token) => {
    return {
        success: true,
        message: 'Add to playlist successful'
    }
}

export const playlistService = {
    getPlaylistListByUser,
    addToPlaylist
}