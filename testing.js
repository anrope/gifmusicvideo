var my_test_object =
{
    'project_id': 'my remix of gangnam style',
    'soundcloud_id': 243134, // song on soundcloud
    'gifs': [
        {
            'user': 'anrope',
            'gif': '/path/to/gif.gif', // path on server
            'timestamp': 134, // seconds
        },
        {
            'user': 'ted',
            'gif': '/path/gif2.gif',
            'timestamp': 235,
        }
    ]
};

rds.set('sng::gangnam-style', JSON.stringify(my_test_object))
