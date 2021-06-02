const { Client } = require('@notionhq/client')
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const taskDB = process.env.NOTION_TASK_DB
module.exports = {
  createTask (title) {
    return notion.pages.create({
      parent: {
        'database_id': taskDB
      },
      properties: {
        'Name': {
          'title': [
            {
              'text': {
                'content': title
              }
            }
          ]
        },
        'Status': {
          'select': {
            'name': 'Backlog'
          }
        },
        'Source': {
          'select': {
            'name': 'Telegram'
          }
        }
      }

    })

  }
}
