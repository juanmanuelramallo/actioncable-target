import ActionCable from 'actioncable'

const connect = (ticket) => (
  ActionCable.createConsumer(`https://jm-target-mvd.herokuapp.com/cable?ticket=${ticket}`)
)

export default connect;
