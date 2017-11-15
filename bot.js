
var Discord = require('discord.io');
var logger = require('winston');
var config = require('./config.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: config.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            // Just add any case commands if you want to..
            case 'test-your-might':
                bot.sendMessage({
                    to: channelID,
                    message: "MORTAL KOMBAT!"
                });
                break;
            case 'fight':
                
                let fightMessage = '<@'+userID+'> has declared a fight with ';
                for (let mention of evt.d.mentions) {
                    if (mention.bot) {
                        bot.sendMessage({
                            to: channelID,
                            message: "You can't fight with a bot, idiot."
                        });
                        break;
                    }
                    fightMessage += '<@' + mention.id + '>';
                }

                
                // to: config.fight-channel,

                bot.sendMessage({
                    to: channelID,
                    message: fightMessage
                }, function (error, response) {
                    bot.pinMessage({
                        channelID: channelID,
                        messageID: response.id
                    })
                });

                break;
        }
    }
});

bot.on('messageDelete', function (event) {
});