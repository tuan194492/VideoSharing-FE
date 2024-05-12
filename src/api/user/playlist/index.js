const getPlaylistListByUser = async () => {
    return {
        success: true,
        data: [
            {
                added_to_playlist: false,
                playlist_mame: 'Watch later',
                playlist_id: 1
            },
            {
                added_to_playlist: false,
                playlist_mame: 'New playlist',
                playlist_id: 2
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