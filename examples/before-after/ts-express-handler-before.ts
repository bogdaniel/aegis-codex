import express from 'express';

const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await db.getUser(req.params.id);
  res.json(user);
});

app.listen(3000);

