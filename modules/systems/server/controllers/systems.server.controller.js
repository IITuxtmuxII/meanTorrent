'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  config = require(path.resolve('./config/config')),
  mongoose = require('mongoose'),
  common = require(path.resolve('./config/lib/common')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  moment = require('moment'),
  User = mongoose.model('User'),
  shell = require('shelljs'),
  async = require('async'),
  traceLogCreate = require(path.resolve('./config/lib/tracelog')).create;

var traceConfig = config.meanTorrentConfig.trace;
var mtDebug = require(path.resolve('./config/lib/debug'));
var serverMessage = require(path.resolve('./config/lib/server-message'));
var serverNoticeConfig = config.meanTorrentConfig.serverNotice;
var announceConfig = config.meanTorrentConfig.announce;

/**
 * getSystemEnvConfigFiles
 * @param req
 * @param res
 */
exports.getSystemEnvConfigFiles = function (req, res) {
  var files = shell.ls('./config/env/*.js');

  if (req.user.isAdmin) {
    res.json({
      files: files
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * getSystemAssetsConfigFiles
 * @param req
 * @param res
 */
exports.getSystemAssetsConfigFiles = function (req, res) {
  var files = shell.ls('./config/assets/*.js');

  if (req.user.isAdmin) {
    res.json({
      files: files
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * getSystemTransConfigFiles
 * @param req
 * @param res
 */
exports.getSystemTransConfigFiles = function (req, res) {
  var files = shell.ls('./modules/core/client/app/trans*.js');

  if (req.user.isAdmin) {
    res.json({
      files: files
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * getSystemTemplateFrontConfigFiles
 * @param req
 * @param res
 */
exports.getSystemTemplateFrontConfigFiles = function (req, res) {
  var files = shell.ls('./modules/*/client/templates/*.md');

  if (req.user.isAdmin) {
    res.json({
      files: files
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * getSystemTemplateBackConfigFiles
 * @param req
 * @param res
 */
exports.getSystemTemplateBackConfigFiles = function (req, res) {
  var files = shell.ls('./modules/*/server/templates/*');

  if (req.user.isAdmin) {
    res.json({
      files: files
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * getSystemConfigContent
 * @param req
 * @param res
 */
exports.getSystemConfigContent = function (req, res) {
  var config = shell.cat(path.resolve(req.query.filename));

  if (req.user.isAdmin) {
    res.json({
      configContent: config
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * setSystemConfigContent
 * @param req
 * @param res
 */
exports.setSystemConfigContent = function (req, res) {
  // eslint-disable-next-line new-cap
  var cc = shell.ShellString(req.body.content);

  if (req.user.isAdmin) {
    cc.to(path.resolve(req.body.filename));
    res.json({
      message: 'SERVER.SYSTEM_CONFIG_SAVE_SUCCESSFULLY'
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * shellCommand
 * @param req
 * @param res
 */
exports.shellCommand = function (req, res) {
  if (req.user.isAdmin) {
    shell.exec(req.body.command, function (code, stdout, stderr) {
      res.json({
        code: code,
        stdout: stdout,
        stderr: stderr
      });
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * initExaminationData
 * @param req
 * @param res
 */
exports.initExaminationData = function (req, res) {
  if (req.user.isAdmin) {
    var exami = {
      uploaded: 0,
      downloaded: 0,
      score: 0,
      isFinished: false,
      finishedTime: null
    };

    User.update({}, {examinationData: undefined}, {multi: true},
      function (err, num) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          User.update(
            {
              created: {
                $lt: Date.now() - announceConfig.downloadCheck.checkAfterSignupDays * 60 * 60 * 1000 * 24
              },
              isVip: false,
              isOper: false,
              isAdmin: false,
              status: {$ne: 'inactive'}
            }, {examinationData: exami}, {multi: true}, function (err, num) {
              if (err) {
                return res.status(422).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                res.json({
                  num: num
                });
              }
            }
          );
        }
      }
    );
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * getExaminationStatus
 * @param req
 * @param res
 */
exports.getExaminationStatus = function (req, res) {
  if (req.user.isAdmin) {
    var countFinished = function (callback) {
      User.count({
        'examinationData.isFinished': true
      }, function (err, count) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, count);
        }
      });
    };

    var countUnfinished = function (callback) {
      User.count({
        'examinationData.isFinished': false
      }, function (err, count) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, count);
        }
      });
    };

    async.parallel([countFinished, countUnfinished], function (err, results) {
      if (err) {
        return res.status(422).send(err);
      } else {
        res.json({
          countFinished: results[0],
          countUnfinished: results[1],
          countAll: results[0] + results[1]
        });
      }
    });

  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};

/**
 * listFinishedUsers
 * @param req
 * @param res
 */
exports.listFinishedUsers = function (req, res) {
  var skip = 0;
  var limit = 0;

  if (req.query.skip !== undefined) {
    skip = parseInt(req.query.skip, 10);
  }
  if (req.query.limit !== undefined) {
    limit = parseInt(req.query.limit, 10);
  }

  var countQuery = function (callback) {
    User.count({'examinationData.isFinished': true}, function (err, count) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, count);
      }
    });
  };

  var findQuery = function (callback) {
    User.find({'examinationData.isFinished': true})
      .sort('-examinationData.finishedTime')
      .skip(skip)
      .limit(limit)
      .exec(function (err, users) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, users);
        }
      });
  };

  async.parallel([countQuery, findQuery], function (err, results) {
    if (err) {
      mtDebug.debugRed(err);
      return res.status(422).send(err);
    } else {
      res.json({rows: results[1], total: results[0]});
    }
  });
};

/**
 * listUnfinishedUsers
 * @param req
 * @param res
 */
exports.listUnfinishedUsers = function (req, res) {
  var skip = 0;
  var limit = 0;

  if (req.query.skip !== undefined) {
    skip = parseInt(req.query.skip, 10);
  }
  if (req.query.limit !== undefined) {
    limit = parseInt(req.query.limit, 10);
  }

  var countQuery = function (callback) {
    User.count({'examinationData.isFinished': false}, function (err, count) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, count);
      }
    });
  };

  var findQuery = function (callback) {
    User.find({'examinationData.isFinished': false})
      .skip(skip)
      .limit(limit)
      .exec(function (err, users) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, users);
        }
      });
  };

  async.parallel([countQuery, findQuery], function (err, results) {
    if (err) {
      mtDebug.debugRed(err);
      return res.status(422).send(err);
    } else {
      res.json({rows: results[1], total: results[0]});
    }
  });
};

/**
 * banAllUnfinishedUser
 * @param req
 * @param res
 */
exports.banAllUnfinishedUser = function (req, res) {
  if (req.user.isAdmin) {
    var user = req.model;

    User.update({'examinationData.isFinished': false}, {$set: {status: 'banned'}}, {multi: true}, function (err, num) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json({
          num: num
        });

        //create trace log
        traceLogCreate(req, traceConfig.action.AdminBanAllExaminationUnfinishedUsers, {
          user: user._id,
          num: num
        });
      }
    });
  } else {
    return res.status(403).json({
      message: 'SERVER.USER_IS_NOT_AUTHORIZED'
    });
  }
};
