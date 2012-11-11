GIF music video

home page:
djg.jit.su

song pages:
djg.jit.su/gangnam-style/
djg.jit.su/bangarang/

api endpoints:
djg.jit.su/1/fetchgifs
djg.jit.su/1/dropgif/<song_name>/
djg.jit.su/1/song/<song_name>/

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


gif path on S3:
http://alizweb.s3.amazonaws.com/gifmusicvideo/
