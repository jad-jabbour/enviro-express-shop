const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const logsPath = path.join(__dirname, '..', 'logs');
  try {
    if (!fs.existsSync(logsPath)) await fsPromises.mkdir(logsPath);
    await fsPromises.appendFile(path.join(logsPath, logName), logItem);
  } catch (err) { console.error(err); }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin || 'local'}\t${req.url}`, 'reqLog.log');
  next();
};
module.exports = { logger, logEvents };
