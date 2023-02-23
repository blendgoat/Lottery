export default {
  name: 'users',
  type: 'document',
  title: 'Users',
  fields: [
    {
      name: 'walletAddress',
      type: 'string',
      title: 'Wallet Address',
    },
    {
      name: 'gameId',
      type: 'string',
      title: 'Game ID',
    },
  ],
}
