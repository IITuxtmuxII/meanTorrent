'use strict';

var commonEnvConfig = require('./comm-variable');

module.exports = {

  /**------------------------------------------------------------------------------------------------
   * !IMPORTANT
   * MEANTORRENT CONFIG START
   * PLEASE DO NOT MODIFY THE ABOVE LINES ！！！
   --------------------------------------------------------------------------------------------------*/

  meanTorrentConfig: {
    /**
     * @app
     *
     * App & site settings
     * NOTE: you can change these value at anytime if you understand it
     *
     * @domain:                 site domain
     * @mailTicketService:      settings mailTicketService status, true is enable, false is disable
     * @showDemoWarningPopup:   if is demo site, show warning popup whene home is opened for the first time.
     * @cronTimeZone:           timezone of cron
     * @showDebugLog:           if true, will console.log all debug info at server side and client side. when your site is prod env, please change this
     *                          value to false, then console.log info is not output
     */
    app: {
      name: commonEnvConfig.variable.site.site_name,
      domain: commonEnvConfig.variable.site.site_domain,
      mailTicketService: commonEnvConfig.variable.settings.mailTicketService || false,
      showDemoWarningPopup: true,
      cronTimeZone: 'Asia/Shanghai',
      showDebugLog: commonEnvConfig.variable.settings.console_debug_info || true
    },

    /**
     * @backup
     *
     * @enable:     if true, meanTorrent will backup mongo db database data with a named '/module/core/client/backup/*.tar'
     *              at midnight every day.
     * @dir:        backup files path
     */
    backup: {
      enable: true,
      dir: './modules/backup/client/backup/'
    },

    /**
     * @language
     *
     * Multilingual support settings
     *
     * @name:   language name
     * @index:  list index in menu
     * @class:  flag icon class, can find flag icon at '/public/lib/flag-icon-css/flags'
     * @title:  language title show in menu item
     *
     */
    language: [
      {name: 'zh', index: 0, class: 'flag-icon-cn', title: '中文'},
      {name: 'en', index: 1, class: 'flag-icon-gb', title: 'English'}
    ],

    /**
     * @announce
     *
     * tracker server announce settings
     * NOTE: you can change these value at anytime if you understand it
     *
     * @url:                                  announce url, download client will request this url to report uploads and downloads data
     * @comment:                              used in admin tools, auto replace torrent make group info with this setting
     * @announceInterval:                     interval of twice announce request
     * @announceInterval_str:                 string desc of @announceInterval
     * @announcePrefix:                       prefix of torrent file name, is will auto add when user download the torrent files
     * @admin:                                site admin mail address
     * @clientBlackListUrl:                   forbidden download client list url, user can view this list to check forbidden client software
     * @seedingInFinishedCheck:               settings to check whether can seeding an un-download finished torrent
     * @downloadCheck:                        announce download(leech) settings
     *      @ratio:                           if less than this value, can not download(leech)
     *      @checkAfterSignupDays:            all users download check start {value} days after signup, so the newest register user has {value} days to upgrade his ratio value,
     *                                        after {value} days, if less then setting of here, can not download(leech) any things, but can continue seed, unit of day
     * @announceCheck:                        announce seed/leech numbers settings
     *      @maxLeechNumberPerUserPerTorrent: settings the max leech numbers of same user on same torrent
     *      @maxSeedNumberPerUserPerTorrent:  settings the max seed numbers of same user on same torrent
     * @peersCheck:                           send peers list of downloading announce request settings
     *      @peersSendListIncludeOwnSeed:     settings whether include own seed peer in download announce request
     *                                        NOTE: the best value is false, In order to prevent cheating, user can not download data from own seeding.
     * @ghostCheck:
     *      @ghostPeersIdleTime:              setting idle time more than this value is a ghost peer(died), remove it
     *      @ghostPeersIdleTime_str:          string desc of @ghostPeersIdleTime
     * @warningCheck:
     *      @userHnrWarningCheckInterval:     setting check users H&R warning interval time, default to 2 hours
     *      @userHnrWarningCheckInterval_str: string desc of @userHnrWarningCheckInterval
     */
    announce: {
      url: commonEnvConfig.variable.site.site_domain + '/announce',
      comment: commonEnvConfig.variable.site.site_name + ' GROUP',
      announceInterval: 60 * 1000 * 5,
      announceInterval_str: '5m',
      announcePrefix: '{' + commonEnvConfig.variable.site.site_namekey + '}.',
      sourceInfo: '{' + commonEnvConfig.variable.site.site_name + '}' + ' Present by meanTorrent.',
      admin: commonEnvConfig.variable.site.site_admin_mail,
      clientBlackListUrl: '/about/black',
      seedingInFinishedCheck: true,
      downloadCheck: {
        ratio: 1,
        checkAfterSignupDays: 30
      },
      announceCheck: {
        maxLeechNumberPerUserPerTorrent: 1,
        maxSeedNumberPerUserPerTorrent: 3
      },
      peersCheck: {
        peersSendListIncludeOwnSeed: true
      },
      ghostCheck: {
        ghostPeersIdleTime: 60 * 60 * 1000 * 24,
        ghostPeersIdleTime_str: '24h'
      },
      warningCheck: {
        userHnrWarningCheckInterval: 60 * 60 * 1000 * 2,
        userHnrWarningCheckInterval_str: '2h'
      }
    },

    /**
     * @rss
     *
     * rss field value settings
     *
     * @title:              setting title info of rss document
     * @description:        setting description info of rss document
     * @copyright:          setting copyright info of rss document
     * @managingEditor:     setting managingEditor info of rss document
     * @webMaster:          setting webMaster info of rss document
     * @generator:          setting generator info of rss document
     * @ttl:                setting ttl info of rss document, unit of seconds
     * @image_url:          setting image_url info of rss document
     */
    rss: {
      title: '[%s] - RSS torrents',
      description: 'Latest torrents from [%s]',
      copyright: 'Copyright (c) [%s] 2012-2017, all rights reserved',
      managingEditor: commonEnvConfig.variable.site.site_admin_mail + ' (%s Admin)',
      webMaster: commonEnvConfig.variable.site.site_webmaster_mail + ' (%s Webmaster)',
      generator: commonEnvConfig.variable.site.site_name + ' RSS Generator by meanTorrent',
      ttl: 60,
      image_url: '/modules/core/client/img/rss.jpeg'
    },

    /**
     * @ircAnnounce
     *
     * IRC announce server settings
     * NOTE: you can change these value at anytime if you understand it
     *
     * @enable:             enable irc announce
     * @debug:              debug mode, more info will log out by console
     * @server:             IRC server address
     * @port:               IRC server port
     * @nick:               IRC announce user nick name, needed with IRC protocol
     * @userName:           IRC announce user username, needed with IRC protocol
     * @realName:           IRC announce user realName, needed with IRC protocol
     * @channel:            IRC announce channel name, the message will send to the appointed channel
     * @defaultMsgFormat:   the default announce message format
     * @tvserialMsgFormat:  the custom announce message format of tv serial type torrent
     * @showErrors:         log and show error info when some error happened
     * @autoRejoin:         auto rejoin into the channel when some event happened cause user part the announce channel
     * @autoConnect:        auto connect & reconnect to IRC server when disconnect from IRC server
     * @retryCount:         reconnect retry times
     * @retryDelay:         reconnect retry delay time, unit in millisecond
     * @encoding:           IRC announce message encoding, default to 'UTF-8'
     */
    ircAnnounce: {
      enable: true,
      debug: false,
      server: 'irc.mean.im',
      port: 16667,
      nick: commonEnvConfig.variable.site.site_namekey.toLowerCase() + 'Announcer',
      userName: 'meanTorrent',
      realName: 'IRC announce client',
      channel: '#' + commonEnvConfig.variable.site.site_namekey.toLowerCase() + 'Announce',
      defaultMsgFormat: '%s uploaded - torrent: %s, type: %s, size: %d, sale: %s, url: %s, at %s',
      tvserialMsgFormat: '%s uploaded - torrent: %s, type: %s, size: %d, seasons: %d, episodes: %s, sale: %s, url: %s, at %s',
      showErrors: true,
      autoRejoin: true,
      autoConnect: true,
      retryCount: 86400,
      retryDelay: 5000,
      encoding: 'UTF-8'
    },

    /**
     * @sign
     *
     * user register settings
     * NOTE: you can change these value at anytime if you understand it
     *
     * @openSignup:                   set whether open the signup, if true, the user can signup(register) by herself,
     *                                if you create a private web site, and only accept invite to join, please set it to false.
     * @signUpActiveTokenExpires:     sign up account active expires time setting.
     * @signUpActiveTokenExpires_str: string desc of @signUpActiveTokenExpires
     * @allowSocialSignin:            meanTorrent can accept social account to signin, like google, twitter, facebook etc.
     *                                if you do not want them to login, please set it to false
     * @showMenuHeaderForGuest:       set whether show menu header for guest user(not sign in)
     * @showFooterCountInfoForGuest:  set whether show count info at home footer for guest user(not sign in)
     * @showDemoSignMessage:          if true, will show demo sign in message in sign in page, if your site is not demo site, please set it to false
     * @accountIdleForTime:           setting for how many time not login then change account status to idle
     * @accountIdleForTime_str:       string desc of @accountIdleForTime
     * @activeIdleAccountScore:       user active idle account need score numbers
     */
    sign: {
      openSignup: true,
      signUpActiveTokenExpires: 60 * 60 * 1000 * 24,
      signUpActiveTokenExpires_str: '24h',
      allowSocialSignin: false,
      showMenuHeaderForGuest: true,
      showFooterCountInfoForGuest: true,
      showDemoSignMessage: true,
      accountIdleForTime: 60 * 60 * 1000 * 24 * 30, //30 days
      accountIdleForTime_str: '30d',
      activeIdleAccountScore: 50000
    },

    /**
     * @password
     *
     * password setting
     *
     * @resetTokenExpires:      reset password token expires time, default 1 hour
     * @resetTokenExpires_str:  string desc of @resetTokenExpires
     * @resetTimeInterval:      reset password time interval, default 24 hours, means only can do once in 24 hours.
     * @resetTimeInterval_str:  string desc of @resetTimeInterval
     */
    password: {
      resetTokenExpires: 60 * 60 * 1000 * 1,
      resetTokenExpires_str: '1h',
      resetTimeInterval: 60 * 60 * 1000 * 24,
      resetTimeInterval_str: '24h'
    },

    /**
     * @invite
     *
     * invite settings when sign.openSignup is false
     * NOTE: you can change these value at anytime if you understand it
     *
     * @openInvite:     if true, then any user can invite friends to join us, if false, only admin/oper can send invite mail
     * @scoreExchange:  if any user can send invite mail, the user must used score number to exchange an invite send qualifications, if the user has no
     *                  enough score, then can not send invite mail too.
     * @expires:        if user exchange an invite send qualifications, then must send it out within the expiration time
     *                  if user received an invite mail, must signin(register) within the expiration time
     *                  if exceed the expiration time, the invite send qualifications will invalid and user also can not signin(register).
     * @expires_str:    string desc of @expires
     */
    invite: {
      openInvite: true,
      scoreExchange: 10000,
      expires: 60 * 60 * 1000 * 24,
      expires_str: '24h'
    },

    /**
     * @requests
     *
     * requests settings
     *
     * @scoreForAddRequest:       score numbers for add one request, system deduct automatic, this score is not rewards for final accepted user
     * @rewardsFormDefaultValue:  setting default rewards value of request post form input control
     * @requestExpires:           request expires time setting, default 7 days
     * @requestExpires_str:       string desc of @requestExpires
     */
    requests: {
      scoreForAddRequest: 100,
      rewardsFormDefaultValue: 1000,
      requestExpires: 60 * 60 * 1000 * 24 * 7,
      requestExpires_str: '7d'
    },

    /**
     * @score
     *
     * score system settings
     *
     * @levelStep:        value of each level step, default 500
     * @action:           score change action list
     *        @name:      action name
     *        @value:     action score value
     *        @enable:    action enable status, if false, system will not change user`s score at this action
     *                    NOTE: ENABLE VALUE OF DEFAULTACTION MUST BE TRUE
     */
    score: {
      levelStep: 1000,
      action: {
        defaultAction: {name: 'defaultAction', value: 0, enable: true},

        checkInEveryDay: {name: 'checkInEveryDay', value: 10, enable: true},
        checkInConsDay: {name: 'checkInConsDay', value: 2, enable: true},
        uploadTorrent: {name: 'uploadTorrent', value: 50, enable: true},
        uploadTorrentBeDeleted: {name: 'uploadTorrentBeDeleted', value: -50, enable: true},
        uploadTorrentBeRecommend: {name: 'uploadTorrentBeRecommend', value: 10, enable: true},
        uploadSubtitle: {name: 'uploadSubtitle', value: 20, enable: true},
        uploadSubtitleBeDeleted: {name: 'uploadSubtitleBeDeleted', value: -20, enable: true},

        thumbsUpScoreOfTorrentFrom: {name: 'thumbsUpScoreOfTorrentFrom', value: -10, enable: true},
        thumbsUpScoreOfTorrentTo: {name: 'thumbsUpScoreOfTorrentTo', value: 10, enable: true},
        thumbsUpScoreOfTopicFrom: {name: 'thumbsUpScoreOfTopicFrom', value: -10, enable: true},
        thumbsUpScoreOfTopicTo: {name: 'thumbsUpScoreOfTopicTo', value: 10, enable: true},

        postRequest: {name: 'postRequest', value: 0, enable: true}, //value used requests.scoreForAddRequest
        scoreExchangeInvitation: {name: 'scoreExchangeInvitation', value: 0, enable: true}, //value used invite.scoreExchange
        scoreToRemoveWarning: {name: 'scoreToRemoveWarning', value: 0, enable: true}, //value used hitAndRun.scoreToRemoveWarning
        activeIdleAccount: {name: 'activeIdleAccountScore', value: 0, enable: true}, //value used sign.activeIdleAccountScore

        seedUpDownload: {
          name: 'seedUpDownload',
          additionSize: 1024 * 1024 * 1024 * 10,  //10G
          additionSize_str: '10G',
          perlSize: 1024 * 1024 * 1024,   //1G
          perlSize_str: '1G',

          uploadValue: 2,
          uploadEnable: true,
          downloadValue: 1,
          downloadEnable: true,
          vipRatio: 1.5,

          enable: true
        },

        seedTimed: {
          name: 'seedTimed',
          additionTime: 60 * 60 * 1000,
          additionTime_str: '1h',
          timedValue: 1,
          vipRatio: 1.5,

          enable: true
        },

        seedSeederAndLife: {
          seederBasicRatio: 1,
          seederCoefficient: 0.5,
          seederCount: 10,
          lifeBasicRatio: 1,
          lifeCoefficientOfDay: 0.005,
          lifeMaxRatio: 5,

          enable: true
        }
      }
    },

    /**
     * @messages
     *
     * site message settings
     *
     * @type:                     messages type
     *        @name:              name of messages type, used in $translate
     *        @value:             messages type value list
     *                @name:      type name
     *                @value:     type value
     * @checkUnreadInterval:      set check unread message interval, default 2 minutes
     * @checkUnreadInterval_str:  string desc of @checkUnreadInterval
     * @serverMessageLimitCount:  limit server notice message count in messagebox
     *
     * NOTE: the first value 'user' cannot be deleted
     */
    messages: {
      type: {
        name: 'TYPE',
        value: [
          {name: 'USER', value: 'user', role: 'user'},
          {name: 'SERVER', value: 'server', role: 'server'},
          {name: 'SYSTEM', value: 'system', role: 'admin'},
          {name: 'ADVERT', value: 'advert', role: 'admin'},
          {name: 'NOTICE', value: 'notice', role: 'admin'}
        ]
      },
      checkUnreadInterval: 60 * 1000 * 2,
      checkUnreadInterval_str: '2m',
      serverMessageLimitCount: 100
    },

    /**
     *  @inputLength
     *
     *  input string length limit settings
     *
     *  @userSignatureLength:         user signature of forum string length limit
     *  @chatMessageMaxLength:        chat room send message string length limit
     *  @messageBoxContentLength:     user message send content length limit
     *  @messageBoxReplyLength:       user message send reply content length limit
     *  @torrentCommentLength:        torrent comment send content length limit
     *  @forumTopicTitleLength:       forum topic title length limit
     *  @forumTopicContentLength:     forum topic content length limit
     *  @forumReplyContentLength:     forum reply content length limit
     *  @makerGroupDescLength:        maker group desc content length limit
     *  @collectionsOverviewLength:   movie collections overview content length limit
     */
    inputLength: {
      userSignatureLength: 512,
      chatMessageMaxLength: 512,

      messageBoxContentLength: 1024,
      messageBoxReplyLength: 512,

      torrentCommentLength: 512,

      forumTopicTitleLength: 128,
      forumTopicContentLength: 4096,
      forumReplyContentLength: 2048,

      makerGroupDescLength: 2048,
      collectionsOverviewLength: 2048,

      requestDescLength: 1024,
      requestCommentLength: 512
    },

    /**
     * @serverNotice
     *
     * server auto notice settings
     *
     * @action:       notice actions
     *      @title:   notice title in translate string of SERVER_MESSAGE
     *      @content: notice content in translate string of SERVER_MESSAGE
     *      @enable:  enable switch
     */
    serverNotice: {
      action: {
        makerCreated: {title: 'TITLE_MAKER_CREATED', content: 'CONTENT_MAKER_CREATED', enable: true},
        makerDeleted: {title: 'TITLE_MAKER_DELETED', content: 'CONTENT_MAKER_DELETED', enable: true},
        makerUploadAccessChanged: {title: 'TITLE_MAKER_UPLOAD_ACCESS_CHANGED', content: 'CONTENT_MAKER_UPLOAD_ACCESS_CHANGED', enable: true},
        makerAddMember: {title: 'TITLE_MAKER_ADD_MEMBER', content: 'CONTENT_MAKER_ADD_MEMBER', enable: true},
        makerRemoveMember: {title: 'TITLE_MAKER_REMOVE_MEMBER', content: 'CONTENT_MAKER_REMOVE_MEMBER', enable: true},

        userVipStatusChanged: {title: 'TITLE_USER_VIP_CHANGED_ADD', content: 'CONTENT_USER_VIP_CHANGED_ADD', enable: true},
        userRoleChanged: {title: 'TITLE_USER_ROLE_CHANGED', content: 'CONTENT_USER_ROLE_CHANGED', enable: true},
        userUploadAccessChanged: {title: 'TITLE_USER_UPLOAD_ACCESS_CHANGED', content: 'CONTENT_USER_UPLOAD_ACCESS_CHANGED', enable: true},

        hnrWarningAddByAnnounce: {title: 'TITLE_HNR_WARNING_ADD', content: 'CONTENT_HNR_WARNING_ADD', enable: true},
        hnrWarningRemoveByAnnounce: {title: 'TITLE_HNR_WARNING_REMOVE', content: 'CONTENT_HNR_WARNING_REMOVE', enable: true},

        forumTopicNewReply: {title: 'TITLE_FORUM_NEW_TOPIC_REPLY', content: 'CONTENT_FORUM_NEW_TOPIC_REPLY', enable: true},
        forumTopicThumbsUp: {title: 'TITLE_FORUM_TOPIC_THUMBS_UP', content: 'CONTENT_FORUM_TOPIC_THUMBS_UP', enable: true},
        forumReplyThumbsUp: {title: 'TITLE_FORUM_REPLY_THUMBS_UP', content: 'CONTENT_FORUM_REPLY_THUMBS_UP', enable: true},
        forumTopicDeleted: {title: 'TITLE_FORUM_TOPIC_DELETED', content: 'CONTENT_FORUM_TOPIC_DELETED', enable: true},
        forumReplyDeleted: {title: 'TITLE_FORUM_REPLY_DELETED', content: 'CONTENT_FORUM_REPLY_DELETED', enable: true},
        forumBecomeModerator: {title: 'TITLE_FORUM_BECOME_MODERATOR', content: 'CONTENT_FORUM_BECOME_MODERATOR', enable: true},

        torrentNewComment: {title: 'TITLE_TORRENT_NEW_COMMENT', content: 'CONTENT_TORRENT_NEW_COMMENT', enable: true},
        torrentCommentDeleted: {title: 'TITLE_TORRENT_COMMENT_DELETED', content: 'CONTENT_TORRENT_COMMENT_DELETED', enable: true},
        torrentThumbsUp: {title: 'TITLE_TORRENT_THUMBS_UP', content: 'CONTENT_TORRENT_THUMBS_UP', enable: true},
        torrentReviewed: {title: 'TITLE_TORRENT_REVIEWED', content: 'CONTENT_TORRENT_REVIEWED', enable: true},
        torrentVipChanged: {title: 'TITLE_TORRENT_VIP_CHANGED', content: 'CONTENT_TORRENT_VIP_CHANGED', enable: true},
        torrentHnRChanged: {title: 'TITLE_TORRENT_HNR_CHANGED', content: 'CONTENT_TORRENT_HNR_CHANGED', enable: true},
        torrentSaleChanged: {title: 'TITLE_TORRENT_SALE_CHANGED', content: 'CONTENT_TORRENT_SALE_CHANGED', enable: true},
        torrentDeleted: {title: 'TITLE_TORRENT_DELETED', content: 'CONTENT_TORRENT_DELETED', enable: true},
        torrentSubtitleNew: {title: 'TITLE_TORRENT_SUBTITLE_NEW', content: 'CONTENT_TORRENT_SUBTITLE_NEW', enable: true},
        torrentSubtitleDeleted: {title: 'TITLE_TORRENT_SUBTITLE_DELETED', content: 'CONTENT_TORRENT_SUBTITLE_DELETED', enable: true},

        requestTorrentUpload: {title: 'TITLE_REQUEST_TORRENT_UPLOAD', content: 'CONTENT_REQUEST_TORRENT_UPLOAD', enable: true},
        requestTorrentRespond: {title: 'TITLE_REQUEST_TORRENT_RESPOND', content: 'CONTENT_REQUEST_TORRENT_RESPOND', enable: true},
        requestNewComment: {title: 'TITLE_REQUEST_NEW_COMMENT', content: 'CONTENT_REQUEST_NEW_COMMENT', enable: true},
        requestCommentDeleted: {title: 'TITLE_REQUEST_COMMENT_DELETED', content: 'CONTENT_REQUEST_COMMENT_DELETED', enable: true}
      }
    },

    /**
     * @trace
     *
     * system trace logs settings
     *
     * @action:         trace action list
     *        @name:    action name
     *        @enable:  action enable status, if false, system will not to trace log this action
     *
     * !IMPORTANT NOTE:
     * @userAnnounceData AND @userScoreChange MAKE LARGEST NUMBER DATA RECORD, IF YOU RUNNING MEANTORRENT AT PROD MODE, MUST SET IT TO FALSE
     */
    trace: {
      action: {
        AdminUpdateUserRole: {name: 'AdminUpdateUserRole', enable: true},
        AdminUpdateUserStatus: {name: 'AdminUpdateUserStatus', enable: true},
        AdminUpdateUserScore: {name: 'AdminUpdateUserScore', enable: true},
        AdminUpdateUserUploaded: {name: 'AdminUpdateUserUploaded', enable: true},
        AdminUpdateUserDownloaded: {name: 'AdminUpdateUserDownloaded', enable: true},
        AdminUpdateUserVIPData: {name: 'AdminUpdateUserVIPData', enable: true},
        AdminUserDelete: {name: 'AdminUserDelete', enable: true},
        AdminUserEdit: {name: 'AdminUserEdit', enable: true},
        AdminBanAllExaminationUnfinishedUsers: {name: 'AdminBanAllExaminationUnfinishedUsers', enable: true},

        userPasswordReset: {name: 'userPasswordReset', enable: true},
        userSignUp: {name: 'userSignUp', enable: true},
        userActiveAccount: {name: 'userActiveAccount', enable: true},
        userUnIdle: {name: 'userUnIdle', enable: true},

        AdminTorrentDelete: {name: 'AdminTorrentDelete', enable: true},
        AdminTorrentSetSaleType: {name: 'AdminTorrentSetSaleType', enable: true},
        AdminTorrentSetRecommendLevel: {name: 'AdminTorrentSetRecommendLevel', enable: true},
        AdminCollectionSetRecommendLevel: {name: 'AdminCollectionSetRecommendLevel', enable: true},
        AdminTorrentSetReviewedStatus: {name: 'AdminTorrentSetReviewedStatus', enable: true},
        OperCreateMakerGroup: {name: 'OperCreateMakerGroup', enable: true},
        OperCreateCollection: {name: 'OperCreateCollection', enable: true},
        OperDeleteBackupFiles: {name: 'OperDeleteBackupFiles', enable: true},

        userInvitationExchange: {name: 'userInvitationExchange', enable: true},
        adminRemoveHnrWarning: {name: 'adminRemoveHnrWarning', enable: true},
        userRemoveHnrWarning: {name: 'userRemoveHnrWarning', enable: true},
        userSendInvitation: {name: 'userSendInvitation', enable: true},
        adminSendOfficialInvitation: {name: 'adminSendOfficialInvitation', enable: true},

        userAnnounceData: {name: 'userAnnounceData', enable: true},
        userAnnounceFinished: {name: 'userAnnounceFinished', enable: true},
        userScoreChange: {name: 'userScoreChange', enable: true},

        forumDeleteTopic: {name: 'forumDeleteTopic', enable: true},
        forumDeleteReply: {name: 'forumDeleteReply', enable: true}
      }
    },

    /**
     * @torrentType
     *
     * torrent type settings
     * if you need more torrent type, please add at here and config it, the system will add new type everywhere automatic
     * NOTE: don`t change these value if you can not understand it
     *
     * @name:   TYPE, do not change it
     * @value:  configure settings value of torrent type
     *
     *        @enable:            enable this type
     *        @name:              name of type, used by $translate at TORRENT_TYPE_LABEL, will show translate result as torrent tag in torrent list
     *        @value:             value of type, torrent type value in model, will write this value into mongodb and query torrents by this value
     *        @title:             title of type, used by $translate at MENU_TORRENTS_SUB, will show translate result in header submenu item
     *        @role:              role of type, limit none access users join
     *        @faIcon:            fontawesome icon front of menu item
     *        @faClass:           fontawesome icon class
     *        @divider:           divider status of submenu item
     *        @position:          position of submenu item(ordered index)
     *        @state:             angular state of torrent type, this state value used in module route config
     *        @url:               window location url of type
     *        @pageTitle:         the page title string, used by translate at PAGETITLE
     *        @uploadTemplateID:  view templateID in upload torrent page, when selected type is changed, then include the template by this id,
     *                            all the template html is in file: modules/torrents/client/views/uploads-torrents.client.view.html
     *        @showTopListInHome: setting whether show the TOP list in site home page, if false, don`t show
     *                            the 'other' type torrent always not show in home page
     *
     * if you add a config json item, please add translate string:
     *        MENU_TORRENTS_SUB
     *        TORRENT_TYPE_LABEL
     *        PAGETITLE.*
     */
    torrentType: {
      name: 'TYPE',
      value: [
        {
          enable: true,
          name: 'MOVIE',
          value: 'movie',
          title: 'MENU_TORRENTS_SUB.MOVIE',
          role: 'user',
          faIcon: 'fa-film',
          faClass: 'text-mt',
          divider: false,
          position: 1,
          state: 'torrents.movie',
          url: '/movie',
          pageTitle: 'MOVIE_LIST',
          uploadTemplateID: 'movie',
          showTopListInHome: true
        },
        {
          enable: true,
          name: 'TVSERIAL',
          value: 'tvserial',
          title: 'MENU_TORRENTS_SUB.TVSERIAL',
          role: 'user',
          faIcon: 'fa-tv',
          faClass: 'text-mt',
          divider: false,
          position: 2,
          state: 'torrents.tvserial',
          url: '/tv',
          pageTitle: 'TV_LIST',
          uploadTemplateID: 'tvserial',
          showTopListInHome: true
        },
        {
          enable: true,
          name: 'MUSIC',
          value: 'music',
          title: 'MENU_TORRENTS_SUB.MUSIC',
          role: 'user',
          faIcon: 'fa-music',
          faClass: 'text-mt',
          divider: true,
          position: 3,
          state: 'torrents.music',
          url: '/music',
          pageTitle: 'MUSIC_LIST',
          uploadTemplateID: 'music',
          showTopListInHome: true
        },
        {
          enable: true,
          name: 'SPORTS',
          value: 'sports',
          title: 'MENU_TORRENTS_SUB.SPORTS',
          role: 'user',
          faIcon: 'fa-futbol-o',
          faClass: 'text-mt',
          divider: false,
          position: 4,
          state: 'torrents.sports',
          url: '/sports',
          pageTitle: 'SPORTS_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'VARIETY',
          value: 'variety',
          title: 'MENU_TORRENTS_SUB.VARIETY',
          role: 'user',
          faIcon: 'fa-video-camera',
          faClass: 'text-mt',
          divider: false,
          position: 5,
          state: 'torrents.variety',
          url: '/variety',
          pageTitle: 'VARIETY_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'PICTURE',
          value: 'picture',
          title: 'MENU_TORRENTS_SUB.PICTURE',
          role: 'user',
          faIcon: 'fa-photo',
          faClass: 'text-mt',
          divider: false,
          position: 6,
          state: 'torrents.picture',
          url: '/picture',
          pageTitle: 'PICTURE_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'GAME',
          value: 'game',
          title: 'MENU_TORRENTS_SUB.GAME',
          role: 'user',
          faIcon: 'fa-gamepad',
          faClass: 'text-mt',
          divider: true,
          position: 7,
          state: 'torrents.game',
          url: '/game',
          pageTitle: 'GAME_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'SOFTWARE',
          value: 'software',
          title: 'MENU_TORRENTS_SUB.SOFTWARE',
          role: 'user',
          faIcon: 'fa-hdd-o',
          faClass: 'text-mt',
          divider: false,
          position: 8,
          state: 'torrents.software',
          url: '/software',
          pageTitle: 'SOFTWARE_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'EBOOK',
          value: 'ebook',
          title: 'MENU_TORRENTS_SUB.EBOOK',
          role: 'user',
          faIcon: 'fa-book',
          faClass: 'text-mt',
          divider: false,
          position: 9,
          state: 'torrents.ebook',
          url: '/ebook',
          pageTitle: 'EBOOK_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'OTHER',
          value: 'other',
          title: 'MENU_TORRENTS_SUB.OTHER',
          role: 'user',
          faIcon: null,
          faClass: null,
          divider: true,
          position: 10,
          state: 'torrents.other',
          url: '/other',
          pageTitle: 'OTHER_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        },
        {
          enable: true,
          name: 'ADULT',
          value: 'adult',
          title: 'MENU_TORRENTS_SUB.ADULT',
          role: 'vip',
          faIcon: null,
          faClass: null,
          divider: true,
          position: 11,
          state: 'torrents.adult',
          url: '/adult',
          pageTitle: 'ADULT_LIST',
          uploadTemplateID: 'default',
          showTopListInHome: false
        }
      ]
    },

    /**
     * @torrentStatus
     *
     * the torrent status settings
     * NOTE: don`t change these value if you can not understand it
     *
     * @name:   do not change it
     * @value:  value of status
     *
     *        @name:  name of status level, used by $translate at TORRENT_RECOMMEND_LEVEL_ITEM, will show translate result in torrent admin list
     *        @value: value of status level, will write this value into mongodb and query(search) torrents by this value
     */
    torrentStatus: {
      name: 'STATUS',
      value: [
        {name: 'NEW', value: 'new'},
        {name: 'REVIEWED', value: 'reviewed'},
        {name: 'DELETED', value: 'deleted'}
      ]
    },

    /**
     * @torrentRecommendLevel
     *
     * the torrent recommend level settings
     * NOTE: don`t change these value if you can not understand it
     *
     * @name:   do not change it
     * @value:  value of recommend level
     *
     *        @name:  name of recommend level, used by $translate at TORRENT_RECOMMEND_LEVEL_ITEM, will show translate result as torrent tag in torrent list
     *        @value: value of recommend level, will write this value into mongodb and query(search) torrents by this value
     */
    torrentRecommendLevel: {
      name: 'RECOMMENDLEVEL',
      value: [
        {name: 'LEVEL0', value: 'none'},
        {name: 'LEVEL1', value: 'level1'},
        {name: 'LEVEL2', value: 'level2'},
        {name: 'LEVEL3', value: 'level3'}
      ]
    },

    /**
     * @hitAndRun
     *
     * settings of Hit & Run system, system will auto update the warning status and number of user when client announce to tracker server
     * when admin/oper changed the torrent h&r prop to false, system will auto remove all warning and number of user
     * when admin/oper to delete a h&r torrent, system will auto remove all warning and number of user
     * NOTE: you can change these value at anytime if you understand it
     *
     * @condition:                          the condition of HnR warning, user must meet one of them before you receive the warning
     *        @seedTime:                    torrent seed time, unit of day, default to 7 days
     *        @seedTime_str:                string desc of @seedTime
     *        @ratio:                       seed ratio, default to 1.5
     * @forbiddenDownloadMinWarningNumber:  when user get this number of warning, then can not to download any torrents, but can continue download the warning status torrent
     * @scoreToRemoveWarning:               if user has any warning, user can remove one warning by score number, if the user has not enough score, user still can remove these
     *                                      warning by donate the VIP class.
     * @checkWaringInterval:                set check warning number interval, default 2 minutes
     * @checkWaringInterval_str:            string desc of @checkWaringInterval
     */
    hitAndRun: {
      condition: {
        seedTime: 60 * 60 * 1000 * 24 * 7,
        seedTime_str: '7d',
        ratio: 1.5
      },
      forbiddenDownloadMinWarningNumber: 3,
      scoreToRemoveWarning: 10000,
      checkWaringInterval: 60 * 1000 * 2,
      checkWaringInterval_str: '2m'
    },

    /**
     * @userStatus
     *
     * user account status setting
     * NOTE: don`t change these value if you can not understand it

     * @name:         name of status, used in $translate
     * @value:        values of user status
     *      @name:    status name
     *      @value:   status value
     *
     * @normal:       normal user
     * @banned:       user is banned from server, can not sign in, can not download and announce
     * @idle:         not sign in for long time, can resign in, but can not download and announce, need reactive for score numbers
     * @inactive:     user can not sign in, need active from email verify link
     */
    userStatus: {
      name: 'STATUS',
      value: [
        {name: 'NORMAL', value: 'normal'},
        {name: 'BANNED', value: 'banned'},
        {name: 'IDLE', value: 'idle'},
        {name: 'INACTIVE', value: 'inactive'}
      ]
    },

    /**
     * @userRoles
     *
     * user roles settings
     * NOTE: don`t change these value if you can not understand it
     *
     * user:  normal user role
     * oper:  operator user role
     * admin: admin user role, admin include oper
     */
    userRoles: ['user', 'oper', 'admin'],

    /**
     * @clientBlackList
     *
     * download client black list
     * all the list client can not announce or get any data
     *
     * @name:  client software name
     */
    clientBlackList: [
      {name: 'Mozilla', type: 'browser'},
      {name: 'AppleWebKit', type: 'browser'},
      {name: 'Safari', type: 'browser'},
      {name: 'Chrome', type: 'browser'},
      {name: 'Lynx', type: 'browser'},
      {name: 'Opera', type: 'browser'},
      {name: 'Transmission/2.93', type: 'client'}
    ],

    /**
     * @torrentSalesType
     *
     * torrent sale type setting
     *
     * @name:         name of torrent sale type, used in $translate
     * @value:        sale type value list
     *        @name:  sale item name
     *        @desc:  sale item desc
     * @expires:      sales expires time setting, this time is calc by torrent size, like: each GBit size add expires time one hour,
     *                if torrent size is 40G, then the sales expires time is set to 40 hours automatic
     */
    torrentSalesType: {
      name: 'SALESTYPE',
      value: [
        {name: 'U1/FREE', desc: 'Upload * 1, Download Free'},
        {name: 'U1/D.3', desc: 'Upload * 1, Download * 0.3'},
        {name: 'U1/D.5', desc: 'Upload * 1, Download * 0.5'},
        {name: 'U1/D.8', desc: 'Upload * 1, Download * 0.8'},
        {name: 'U1/D1', desc: 'Upload * 1, Download * 1'},
        {name: 'U2/FREE', desc: 'Upload * 2, Download Free'},
        {name: 'U2/D.3', desc: 'Upload * 2, Download * 0.3'},
        {name: 'U2/D.5', desc: 'Upload * 2, Download * 0.5'},
        {name: 'U2/D.8', desc: 'Upload * 2, Download * 0.8'},
        {name: 'U2/D1', desc: 'Upload * 2, Download * 1'},
        {name: 'U3/FREE', desc: 'Upload * 3, Download Free'},
        {name: 'U3/D.3', desc: 'Upload * 3, Download * 0.3'},
        {name: 'U3/D.5', desc: 'Upload * 3, Download * 0.5'},
        {name: 'U3/D.8', desc: 'Upload * 3, Download * 0.8'},
        {name: 'U3/D1', desc: 'Upload * 3, Download * 1'}
      ],
      expires: {
        size: 1024 * 1024 * 1024,
        size_str: '1G',
        time: 60 * 60 * 1000,
        time_str: '1h'
      }
    },

    /**
     * @torrentGlobalSales
     *
     * Global torrent sales settings
     *
     * @global:             global sale settings
     *      @value:         number value of @torrentSalesType, like 'U2/Free' etc, this value priority torrent @torrentSalesType
     *      @startAt:       sale start time
     *      @expires:       sale expires time
     *      @expires_str:   string desc of @expires
     *      @noticeMsg:     notice translate string show at top of home
     *      @noticeShowAt:  notice begin time to show
     *      @timeFormats:   time string format
     * @vip:                vip sale settings
     *      @value:         upload and download ratio
     *          @Ur:        upload ratio, like 1.5 is upload scaling plus 50%
     *          @Dr:        download ratio
     * @uploader:           sale settings for torrent uploader
     *      @value:         upload and download ratio
     *          @Ur:        upload ratio
     *          @Dr:        download ratio
     */
    torrentGlobalSales: {
      global: {
        value: 'U3/FREE',
        startAt: '2018-01-29 00:00:00',
        expires: 60 * 60 * 1000 * 24 * 3,
        expires_str: '3d',
        noticeMsg: 'SITE_NOTICE.GLOBAL_SALES_NOTICE',
        noticeShowAt: '2018-01-22 00:00:00',
        timeFormats: 'YYYY-MM-DD HH:mm:ss'
      },
      vip: {
        value: {Ur: 1.5, Dr: 0}
      },
      uploader: {
        value: {Ur: 1.5, Dr: 1}
      }
    },

    /**
     * @examination
     *
     * examination system settings
     *
     * @incrementData:      examination requirements data settings
     *      @upload:        increment uploaded data size
     *      @upload_str:    string desc of @upload
     *      @download:      increment downloaded data size
     *      @download_str:  string desc of @download
     *      @score:         increment score number
     * @timeSet:            examination time settings
     *      @startAt:       examination start time
     *      @endAt:         examination end time
     *      @noticeMsg:     notice translate string show at top of home
     *      @noticeShowAt:  notice begin time to show
     *      @timeFormats:   time string format
     * @detailUrl:          detail info of examination, maybe a forum link url
     * ------------------------------------------------------------------------------
     *  !IMPORTANT NOTE:
     *  IF YOU START A NEW EXAMINATION, PLEASE SETTING THESE CONFIGURE ITEMS,
     *  AND INIT ALL USER ACCOUNT`S EXAMINATION INFO BEFORE THE EXAMINATION STARTING
     * ------------------------------------------------------------------------------
     */
    examination: {
      incrementData: {
        upload: 1024 * 1024 * 1024 * 500,   //500G
        upload_str: '500G',
        download: 1024 * 1024 * 1024 * 300, //300G
        download_str: '300G',
        score: 20000
      },
      timeSet: {
        startAt: '2018-02-01 00:00:00',
        endAt: '2018-03-01 00:00:00',
        noticeMsg: 'SITE_NOTICE.EXAMINATION_NOTICE',
        noticeShowAt: '2018-01-28 00:00:00',
        timeFormats: 'YYYY-MM-DD HH:mm:ss'
      },
      detailUrl: '/forums/595c4491d5706705f67d93cf/59684780f928f42a9c79c613'
    },

    /**
     * @chat
     *
     * chat settings
     * NOTE: you can change these value at anytime if you understand it
     *
     * @ban:               banned user settings
     *        @expires:    banned expires time setting, in this time, user cannot connect chat server
     */
    chat: {
      ban: {
        expires: 60 * 60 * 1000 * 1,
        expires_str: '1h'
      }
    },

    /**
     * @tmdbConfig
     *
     * movie info web www.themoviedb.com settings
     *
     * @key:                      access key fro TMDB, when u first install and runing this system, please register a key from TMDB and replace here
     * @tmdbHome:                 TMDB website home link url
     * @tmdbMovieLinkUrl:         linked url, link to movie detail info page, system get movie detail info from here
     * @tmdbTvserialLinkUrl:      linked url, link to tv serial detail info page, system get tv serial detail info from here
     * @backdropImgBaseUrl:       image link url
     * @backdropImgBaseUrl_300:   image link url
     * @backdropImgBaseUrl_780:   image link url
     * @posterImgBaseUrl:         image link url
     * @posterListBaseUrl:        image link url
     * @castImgBaseUrl:           image link url
     */
    tmdbConfig: {
      key: commonEnvConfig.variable.tmdb.key,
      tmdbHome: 'https://www.themoviedb.org',
      tmdbMovieLinkUrl: 'https://www.themoviedb.org/movie/',
      tmdbTvserialLinkUrl: 'https://www.themoviedb.org/tv/',
      backdropImgBaseUrl: 'https://image.tmdb.org/t/p/w1280',
      backdropImgBaseUrl_300: 'https://image.tmdb.org/t/p/w300',
      backdropImgBaseUrl_780: 'https://image.tmdb.org/t/p/w780',
      posterImgBaseUrl: 'https://image.tmdb.org/t/p/w500',
      posterListBaseUrl: 'https://image.tmdb.org/t/p/w92',
      castImgBaseUrl: 'https://image.tmdb.org/t/p/w132_and_h132_bestv2'
    },

    /**
     * @imdbConfig
     *
     * movie info web www.imdb.com settings
     *
     * @imdbLinkUrl: linked url, will nav to imdb website
     */
    imdbConfig: {
      imdbLinkUrl: 'https://www.imdb.com/title/'
    },

    /**
     * @voteTitle
     *
     * vote title string settings
     *
     * @imdb:   imdb vote label string
     * @mt:     meanTorrent system vote label string
     */
    voteTitle: {
      imdb: 'IMDB',
      mt: commonEnvConfig.variable.site.site_namekey
    },

    /**
     * @forumsConfig
     *
     * forums configure settings
     * here is only configure the forum category, if you want to add some sub discussion area, please into admin menu -> forums configure
     * NOTE: you can change these value at anytime if you understand it
     *
     * @category:               forums category
     *        @name:            name of forum category, for a new item, please add a translate string at 'FORUMS->CATEGORY'
     *        @value:           value of forum category
     *        @index:           list order index of forum category
     *        @roles:           limit access for user type
     *        @isVip:           set whether is only for VIP user
     * @showThumbsUpUserList:   if true, will show thumbs up users list at eof of topic content or reply content
     * @showUserSignature:      if true, will show user signature info in forum
     *
     * @rulesForumID:           if you create a forum for user rules and helpers, here is the forumID, it will link to from home help items more
     */
    forumsConfig: {
      category: [
        {name: 'AFFAIRS', value: 'affairs', index: 0, isOper: false, isVip: false},
        {name: 'DISCUSS', value: 'discuss', index: 1, isOper: false, isVip: false},
        {name: 'BUSINESS', value: 'business', index: 2, isOper: false, isVip: false},
        {name: 'VIP', value: 'vip', index: 3, isOper: false, isVip: true},
        {name: 'ADMINISTRATION', value: 'Administration', index: 4, isOper: true, isVip: false}
      ],
      showThumbsUpUserList: true,
      showUserSignature: true,

      rulesForumID: '595b0c31235c3405a290d737'
    },

    /**
     * @itemsPerPage
     *
     * items number in per list page settings
     * NOTE: you can change these value at anytime if you understand it
     *
     * @topicsPerPage:            forum topic list page settings
     * @repliesPerPage:           forum topic replies list page settings
     * @topicsSearchPerPage:      forum topic search list page settings
     * @torrentsPerPage:          torrents list page settings
     * @torrentsCommentsPerPage:  torrent comments list settings
     * @makeGroupTorrentsPerPage: torrent of make group list page settings
     * @tracesPerPage:            system traces log list page settings
     * @adminUserListPerPage:     admin manage users list page settings
     * @collectionsListPerPage:   movie collections list page settings
     * @backupFilesListPerPage:   system backup files list page settings
     * @torrentPeersListPerPage:  torrent detail seeder & leecher users list page settings
     *
     * @uploaderUserListPerPage:  admin management uploader access list page settings
     * @messageBoxListPerPage:    message box list page settings
     * @followListPerPage:        users follow list page settings
     *
     * @requestListPerPage:       request list page settings
     * @requestCommentsPerPage:   request comments list settings
     *
     * @homeOrderTorrentListPerType:    every type of torrent showed in home settings
     * @homeNewestTorrentListPerType:   every type of torrent of newest showed in home settings
     * @homeHelpListLimit:        help items number of home settings
     * @homeNoticeListLimit:      notice items number of home settings
     * @homeNewTopicListLimit:    new topic items number of home settings
     */
    itemsPerPage: {
      topicsPerPage: 10,
      repliesPerPage: 10,
      topicsSearchPerPage: 10,
      torrentsPerPage: 15,
      torrentsCommentsPerPage: 10,
      makeGroupTorrentsPerPage: 10,
      tracesPerPage: 30,
      adminUserListPerPage: 15,
      collectionsListPerPage: 6,
      backupFilesListPerPage: 15,
      torrentPeersListPerPage: 15,

      uploaderUserListPerPage: 15,
      messageBoxListPerPage: 10,
      followListPerPage: 30,

      requestListPerPage: 15,
      requestCommentsPerPage: 10,

      homeOrderTorrentListPerType: 9,
      homeNewestTorrentListPerType: 14,
      homeHelpListLimit: 10,
      homeNoticeListLimit: 10,
      homeNewTopicListLimit: 10,
      homeNewestTorrentsListLimit: 10,

      examinationUserListPerPage: 20
    },

    /**
     * @shellCommand
     *
     * online shell command execute settings
     *
     * @cmd:        command name
     * @eid:        element id, will append command stdout message to it
     * @desc:       command desc
     */
    shellCommand: [
      {command: 'git pull', eid: 'git-pull', desc: 'COMMAND.GIT_PULL'},
      {command: 'npm install', eid: 'npm-install', desc: 'COMMAND.NPM_INSTALL'},
      {command: 'bower install', eid: 'bower-install', desc: 'COMMAND.BOWER_INSTALL'},
      {command: 'gulp build', eid: 'gulp-build', desc: 'COMMAND.GULP_BUILD'},
      {command: './restart.sh', eid: 'restart', desc: 'COMMAND.RESTART'}
    ],

    /**
     * @resourcesTags
     *
     * resources search tags settings, can configure more tags of torrentType at here
     *
     * @radio:                single selection tags
     * @checkbox:             multiple selection tags
     *        @name:          tag type name, used in $translate -> RESOURCESTAGS
     *        @cats:          value of @torrentType, torrents filter(search) will used by this value
     *        @value:         sub tags value list
     *                @name:  sub tag name
     *                @icon:  sub tag icon file path
     */
    resourcesTags: {
      radio: [
        {
          name: 'MUSIC_SUB_CAT',
          cats: ['music'],
          value: [
            {name: 'CD', icon: ''},
            {name: 'MTV', icon: ''}
          ]
        },
        {
          name: 'TYPE',
          cats: ['movie', 'tvserial', 'adult'],
          value: [
            {name: 'BLU_RAY', icon: ''},
            {name: 'REMUX', icon: ''},
            {name: 'WEB_DL', icon: ''},
            {name: 'ENCODE', icon: ''}
          ]
        },
        {
          name: 'RESOLUTION',
          cats: ['movie', 'tvserial', 'music', 'sports', 'variety', 'adult'],
          value: [
            {name: 'S4K', icon: ''},
            {name: 'S1080P', icon: ''},
            {name: 'S1080I', icon: ''},
            {name: 'S720P', icon: ''}
          ]
        },
        {
          name: 'VIDEO',
          cats: ['movie', 'tvserial', 'music', 'sports', 'variety', 'adult'],
          value: [
            {name: 'AVC', icon: ''},
            {name: 'X265', icon: ''},
            {name: 'X264', icon: ''}
          ]
        },
        {
          name: 'AUDIO',
          cats: ['movie', 'tvserial', 'music', 'sports', 'variety', 'adult'],
          value: [
            {name: 'AAC', icon: ''},
            {name: 'AC3', icon: ''},
            {name: 'LPCM', icon: ''},
            {name: 'DTS', icon: ''},
            {name: 'DTS_HD', icon: ''},
            {name: 'ATMOS_TRUEHD', icon: ''}
          ]
        },
        {
          name: 'AUDIOFORMATS',
          cats: ['music'],
          value: [
            {name: 'WAV', icon: ''},
            {name: 'FLAC', icon: ''},
            {name: 'APE', icon: ''}
          ]
        },
        {
          name: 'CHANNEL',
          cats: ['movie', 'tvserial', 'music', 'sports', 'variety', 'adult'],
          value: [
            {name: 'C20', icon: ''},
            {name: 'C51', icon: ''},
            {name: 'C71', icon: ''}
          ]
        },
        {
          name: 'THREED',
          cats: ['movie', 'adult'],
          value: [
            {name: 'T3D', icon: ''},
            {name: 'T2D', icon: ''},
            {name: 'T2D_3D', icon: ''}
          ]
        },
        {
          name: 'MOVIE_SUB_CAT',
          cats: ['movie', 'tvserial'],
          value: [
            {name: 'CARTOON', icon: ''},
            {name: 'DOCUMENTARY', icon: ''}
          ]
        },
        {
          name: 'SPORTS_SUB_CAT',
          cats: ['sports'],
          value: [
            {name: 'FOOTBALL', icon: ''},
            {name: 'BASKETBALL', icon: ''},
            {name: 'RUGBY', icon: ''},
            {name: 'TENNIS', icon: ''},
            {name: 'BOXING', icon: ''},
            {name: 'SNOOKER', icon: ''},
            {name: 'F1', icon: ''}
          ]
        },
        {
          name: 'REGION',
          cats: ['movie', 'tvserial', 'music', 'sports', 'variety', 'adult'],
          value: [
            {name: 'USA', icon: ''},
            {name: 'CHINA', icon: ''},
            {name: 'JAPAN', icon: ''},
            {name: 'KOREA', icon: ''},
            {name: 'INDIA', icon: ''},
            {name: 'ARAB', icon: ''}
          ]
        },
        {
          name: 'PLATFORM',
          cats: ['software', 'game'],
          value: [
            {name: 'WINDOWS', icon: ''},
            {name: 'MACOS', icon: ''},
            {name: 'LINUX', icon: ''},
            {name: 'IOS', icon: ''},
            {name: 'ANDROID', icon: ''},
            {name: 'CAR', icon: ''}
          ]
        },
        {
          name: 'SOFT_SUB_CAT',
          cats: ['software'],
          value: [
            {name: 'OS', icon: ''},
            {name: 'OFFICE', icon: ''},
            {name: 'TOOLS', icon: ''},
            {name: 'MEDIA', icon: ''},
            {name: 'DEVELOPMENT_IDE', icon: ''},
            {name: 'MAP', icon: ''}
          ]
        },
        {
          name: 'PICTURE_SUB_CAT',
          cats: ['picture'],
          value: [
            {name: 'SCENERY', icon: ''},
            {name: 'FASHION', icon: ''},
            {name: 'SPORTS', icon: ''},
            {name: 'ART_PORTRAIT', icon: ''}
          ]
        },
        {
          name: 'EBOOK_FORMAT',
          cats: ['ebook'],
          value: [
            {name: 'PDF', icon: ''},
            {name: 'WDL', icon: ''},
            {name: 'ABM', icon: ''},
            {name: 'CEB', icon: ''},
            {name: 'PDG', icon: ''},
            {name: 'CHM', icon: ''},
            {name: 'TXT', icon: ''}
          ]
        },
        {
          name: 'EBOOK_SUB_CAT',
          cats: ['ebook'],
          value: [
            {name: 'PROGRAMMING', icon: ''},
            {name: 'COMPUTER', icon: ''},
            {name: 'MAGAZINE', icon: ''},
            {name: 'STORY', icon: ''},
            {name: 'BIOGRAPHY', icon: ''}
          ]
        }
      ],
      checkbox: [
        {
          name: 'MODIFY',
          cats: ['movie', 'tvserial', 'sports', 'variety', 'adult'],
          value: [
            {name: 'DIY', icon: ''},
            {name: 'GUOPEI', icon: ''},
            {name: 'ZHONGZI', icon: ''}
          ]
        },
        {
          name: 'RANKING',
          cats: ['movie', 'tvserial'],
          value: [
            {name: 'IMDB_TOP100', icon: ''},
            {name: 'IMDB_TOP250', icon: ''}
          ]
        }
      ]
    }
  }

  /**------------------------------------------------------------------------------------------------
   * !IMPORTANT
   * MEANTORRENT CONFIG END
   * PLEASE DO NOT MODIFY THE FOLLOWING LINES ！！！
   --------------------------------------------------------------------------------------------------*/
};
