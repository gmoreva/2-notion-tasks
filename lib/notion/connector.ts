import {Client} from '@notionhq/client';
import {CreatePageResponse} from "@notionhq/client/build/src/api-endpoints";
import env from '../../env';

if (
    !env.NOTION_TOKEN
    || !env.NOTION_TASK_DB
) {
    throw new Error('env parameter error')
}

const notion = new Client({auth: env!.NOTION_TOKEN}) //Токен из Notion

const taskDB = env!.NOTION_TASK_DB // ID базы данных задач в Notion

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
