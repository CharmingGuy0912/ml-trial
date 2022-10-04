import fs from 'fs/promises'
import glob from 'glob'
import {inspect} from 'util'
import {transformFileAsync} from '@babel/core'

const collectMessages = async file => {
  const messages = []

  await transformFileAsync(file, {
    plugins: [
      [
        'formatjs',
        {onMsgExtracted: (_, msgs) => messages.push(...msgs)}
      ]
    ]
  })

  return messages
}

const messagesToCode = messages => `import {defineMessages} from 'react-intl'

export default defineMessages(${inspect(messages, {depth: null})})`

await (async () => {
  try {
    const common = glob.sync('app/components/common-messages.js')
    const files = [...common, ...glob.sync('app/**/messages.js')]

    const extracted = await Promise.all(files.map(collectMessages))
    const messages = Object.fromEntries(extracted.flat().map(message => [message.id, message]))

    await fs.writeFile('app/translations/tmp-messages.js', messagesToCode(messages))
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', 'Something went wrong while creating the temporary messages file', error)
  }

  console.log('\x1b[32m%s\x1b[0m', 'Created temporary messages file [app/translations/tmp-messages.js].')
})()
