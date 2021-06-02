const { Telegraf } = require('telegraf')
const nConnector = require('../notion/connector')

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async (ctx) => {
  console.log(process.env.TELEGRAM_OWNER_ID, ctx.message.from.id)
  if (ctx.message.from.id != process.env.TELEGRAM_OWNER_ID) {
    ctx.reply('nope')
  } else {
    const result = await nConnector.createTask(ctx.message.text)
    ctx.reply('Task created - ' + result.id)
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
