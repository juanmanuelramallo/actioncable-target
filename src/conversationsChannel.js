export default class ConversationChannel {
  constructor(props) {
    this.props = props;
    this.conversation = null;
    this.channelName = 'ConversationsChannel'
  }

  subscribe() {
    const { cable, conversationId } = this.props;

    if (cable) {
      console.log('Subscribing');
      this.conversation = cable.subscriptions.create({ channel: this.channelName, id: conversationId });
      this.conversation.connected = () => this.connected();
      this.conversation.disconnected = () => this.disconnected();
      this.conversation.received = (data) => this.received(data);
    }
  }

  connected() {
    console.log(`Connected to conversation ${this.props.conversationId}`);
  }

  disconnected() {
    console.log('Handling disconnect');

    if (this.conversation) {
      const { cable } = this.props;
      cable.subscriptions.remove(this.conversation);
    }
  }


  received(data) {
    console.log('Handle data received');
    console.log(data);
    this.props.handleReceived(data);
  }
}
