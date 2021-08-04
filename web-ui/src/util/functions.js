

export const getChannelId = (channelString) => {
  const channelIndex = channelString.indexOf('channel')
  return channelString.slice(channelIndex, channelString.length)
}
