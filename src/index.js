import "regenerator-runtime/runtime";
import configureAxios from './axios';
import connect from './connection'
import { signIn, cableTicket, conversations } from './api'
import ConversationsChannel from './conversationsChannel'

const handleNewMessage = (message) => {
  const messages = document.querySelector('#messages');
  const node = document.createElement('li');
  const text = document.createTextNode(`${message.data.attributes.text} ||| Conversation: ${message.data.relationships.conversation.data.id}`);
  node.appendChild(text);
  messages.appendChild(node);
}

async function main() {
  configureAxios()

  let state = {
    cable: null,
    conversations: []
  }

  await signIn('ramallojuanm@gmail.com', 'P@55word')
  await conversations().then(response => {
    state.conversations = response.data.data;
  })
  await cableTicket().then(response => {
    state.cable = connect(response.data.data.attributes.value)
  })
  state.conversations.forEach(conversation => {
    const channel = new ConversationsChannel({
      cable: state.cable,
      conversationId: conversation.id,
      handleReceived: handleNewMessage
    })
    channel.subscribe()
  })
}

document.addEventListener('DOMContentLoaded', () => {
  main()
})
