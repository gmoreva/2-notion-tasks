require('dotenv').config()

if (
    !process.env.NOTION_TOKEN
    || !process.env.NOTION_TASK_DB
    || !process.env.TELEGRAM_BOT_TOKEN
    || !process.env.TELEGRAM_OWNER_ID
    || !process.env.TELEGRAM_ALLOW_IDS
    || !process.env.RUN_CRON
) {
    throw new Error('env parameter error')
}

let newVar = {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_TASK_DB: process.env.NOTION_TASK_DB,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_OWNER_ID: process.env.TELEGRAM_OWNER_ID,
    TELEGRAM_ALLOW_IDS: process.env.TELEGRAM_ALLOW_IDS,
    RUN_CRON: process.env.RUN_CRON
    }

export default newVar
