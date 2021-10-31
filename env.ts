import dotenv from 'dotenv';

dotenv.config();

if (
    !process.env.NOTION_TOKEN
    || !process.env.NOTION_TASK_DB
    || !process.env.TELEGRAM_BOT_TOKEN
    || !process.env.TELEGRAM_OWNER_ID
) {
    throw new Error('env parameter error');
}

let envs = {
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_TASK_DB: process.env.NOTION_TASK_DB,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_OWNER_ID: Number(process.env.TELEGRAM_OWNER_ID),
    TELEGRAM_ALLOW_IDS: process.env.TELEGRAM_ALLOW_IDS ? process.env.TELEGRAM_ALLOW_IDS.split(',').map(e => Number(e)) : []
};

export default envs;
