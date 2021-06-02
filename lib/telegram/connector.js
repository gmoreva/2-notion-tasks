const { Telegraf } = require('telegraf')
const nConnector = require('../notion/connector')
const allowTelegramIds = process.env.TELEGRAM_ALLOW_IDS.split(',')
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async (ctx) => {
  if (ctx.message.from.id != process.env.TELEGRAM_OWNER_ID && allowTelegramIds.findIndex(ctx.message.from.id) === -1) {
    ctx.reply('nope')
  } else {
    const result = await nConnector.createTask(ctx.message.text, ctx.message.from.username)
    ctx.reply('Task created - ' + result.id)
    if (ctx.message.from.id !== process.env.TELEGRAM_OWNER_ID) {
      bot.sendMessage(process.env.TELEGRAM_OWNER_ID, 'Task created.\n' + ctx.message.text + '\nFrom: @' + ctx.message.from.username)
    }
  }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = {
  run: () => {
    return bot.launch()
  }
}
