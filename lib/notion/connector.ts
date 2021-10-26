import {Client} from '@notionhq/client';
import {CreatePageResponse} from "@notionhq/client/build/src/api-endpoints";

require('dotenv').config();

if (
    !process.env!.NOTION_TOKEN
    || !process.env!.NOTION_TASK_DB
) {
    throw new Error('env parameter error')
}

const notion = new Client({
    auth: process.env!.NOTION_TOKEN,
})

const taskDB = process.env!.NOTION_TASK_DB

export function createTask(title: string, tgAuthor: string): Promise<CreatePageResponse> {
    return notion.pages.create({
        parent: {
            database_id: taskDB
        },
        properties: {
            Name: {
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: title
                        }
                    }
                ]
            },
            TGAuthor: {
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: tgAuthor
                        }
                    }
                ]
            },
            Status: {
                type: "select",
                select: {
                    name: 'Backlog'
                }
            },
            Source: {
                type: "select",
                select: {
                    name: 'Telegram'
                }
            }
        }

    })
}
