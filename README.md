GIF music video

song object:
{
    'project_id': 'my remix of gangnam style',
    'soundcloud_id': 243134, // song on soundcloud
    'gifs': [
        <gif object>,
        <gif object>,
        ...,
        <gif object>
    ]
}

gif object:
{
    'user': anrope,
    'gif': /path/to/gif.gif, // path on server
    'timestamp': 134, // seconds
    'row': 1 // vertical row the gif will be in
},

full song example:
{
    'project_id': 'my remix of gangnam style',
    'soundcloud_id': 243134, // song on soundcloud
    'gifs': [
        {
            'user': anrope,
            'gif': /path/to/gif.gif, // path on server
            'timestamp': 134, // seconds
            'row': 1 // vertical row the gif will be in
        },
        {
            'user': "ted",
            'gif': "/path/gif2.gif",
            'timestamp': 235,
            'row': 3
        }
    ]
}
