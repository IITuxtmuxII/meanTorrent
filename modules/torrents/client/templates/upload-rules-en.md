1. If this is a private torrents management system, the torrent file announce URL will auto set as: `%(announceConfig.url)s`.
1. In your torrent create tools, your announce url should be `%(announceConfig.url)s/%(user.passkey)s`, Do not share this address with other users to avoid disclosing your passkey, each user has its own passkey.
1. If you selected resource type with `Movie` or `TVSerial`, the torrent TMDB_ID must be `TheMovieDB` resources ID, you can [find the ID from here](%(tmdbConfig.tmdbHome)s), then the resources detail info can be autoload, if everything looks good, hit submit.
1. Select one or more tags that match the resources, which will play a significant role in your search results.
1. After the submission of documents, may be approved by the management, the rules do not meet the seeds will be deleted directly.
1. For additional assistance, please contact our administrator: [%(announceConfig.admin)s](mailto:%(announceConfig.admin)s).