module.exports = async function ai(custom ,token, api, model, content, prompt, max_token) {
  const { ChatGPTAPI } = await import('chatgpt')
  const chatapi = new ChatGPTAPI({
    apiKey: token,
    apiBaseUrl: api || 'https://api.deepseek.com',
    completionParams: {
      model: model || 'deepseek-chat',
    },
    fetch: (async(url, options) => {
      if(!custom) options.body = options.body.slice(0, -1) + `, "key": "${token}"}`
      return fetch(url, {
        keepalive: true,
        ...options
      })
    })
  })
  const res = await chatapi.sendMessage(content, {
    systemMessage: prompt,
    maxModelTokens:Number(max_token),
  })
  return res.text
}
