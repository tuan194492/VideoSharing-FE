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

export const playlistService = {
    getPlaylistListByUser
}