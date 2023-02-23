export default (req, res) => {
  res.status(200).json({ name: process.env.SAN_NEXT_PUBLIC_TOKEN });
};
