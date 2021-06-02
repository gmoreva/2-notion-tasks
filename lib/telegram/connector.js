const { Telegraf } = require('telegraf')
const nConnector = require('../notion/connector')
const allowTelegramIds = process.env.TELEGRAM_ALLOW_IDS.split(',').map(e => Number(e))
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)
const telegramownerid = Number(process.env.TELEGRAM_OWNER_ID)
console.log({
  allowTelegramIds,
  telegramownerid
})
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async function (ctx) {
  console.log('newMessage from ' + ctx.message.from.username)
  if (ctx.message.from.id != telegramownerid
    && allowTelegramIds.findIndex(e => e === ctx.message.from.id) === -1) {
    ctx.reply('nope')
  } else {
    const result = await nConnector.createTask(ctx.message.text, ctx.message.from.username)
    ctx.reply('Task created - ' + result.id)
    if (ctx.message.from.id !== telegramownerid) {
      bot.telegram.sendMessage(telegramownerid, 'Task created.\n' + ctx.message.text + '\nFrom: @' + ctx.message.from.username)
    }
  }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports = {
  run: () => {
    return bot.launch().then(() => {
      console.log('bot started')
    })
  }
}
