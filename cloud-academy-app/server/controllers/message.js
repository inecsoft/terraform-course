const controller = {};

controller.generateMessage = (req, res, next) => {
  const body = req.body;
  let name = 'unknown';
  console.log(body);

  if (body == null || body === '') {
    res.status(400).send('The request body must not be empty');
    return;
  }

  name = req.body;
  res.send(`Hi ${name}`);
};

export default controller;
