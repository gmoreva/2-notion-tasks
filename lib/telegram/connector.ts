import { Telegraf, Context } from 'telegraf';
import { createTask } from '../notion/connector';
import env from '../../env';
if (
    !env.TELEGRAM_BOT_TOKEN
    || !env.TELEGRAM_OWNER_ID
    || !env.TELEGRAM_ALLOW_IDS
    ) {
    throw new Error('env parameter error')
}
const bot = new Telegraf(env!.TELEGRAM_BOT_TOKEN)
const telegramownerid = Number(env!.TELEGRAM_OWNER_ID)
const allowTelegramIds = env!.TELEGRAM_ALLOW_IDS.split(',').map(e => Number(e))
console.log({
    allowTelegramIds,
    telegramownerid
})
bot.start((ctx) => ctx.reply('Welcome'))
bot.on('message', async function (ctx: Context) {
    console.log('newMessage from ' + ctx.message?.from.id)
    if (ctx.message?.from.id != telegramownerid
        && allowTelegramIds.findIndex(e => e === ctx.message?.from.id) === -1) {
        await ctx.reply('nope')
    } else {
        if ((ctx.message && 'text' in ctx.message)) {
            if (
                !ctx.message.from.username
            ) {
                throw new Error('empty message')
            }
            const result = await createTask(ctx.message.text, ctx.message.from.username)
            let replace = result.id.replace(/-/g, '')
            let args = 'Task created - [' + ctx.message.text + '](https://www.notion.so/' + replace + ')'
            await ctx.reply(args, {
                parse_mode: "Markdown"
            })
            if (ctx.message.from.id !== telegramownerid) {
                await bot.telegram.sendMessage(
                    telegramownerid,
                    'Task created.\n' + ctx.message.text + '\nFrom: @' + ctx.message.from.username,
                    {
                        parse_mode: "Markdown"
                    })
            }
        } else {
            await ctx.reply('nope')
        }
    }
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

export function tConnectorRun () {
    return bot.launch().then(() => {
        console.log('bot started')
    })
}
