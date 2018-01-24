var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/users/:id', (req, res) => {
  	console.log("get user (id)");
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

 app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.post('/users', (req, res) => {
    const user = { userName: req.body.userName, wordList: req.body.wordList };
    db.collection('users').insert(user, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log("put user (id)" + req.body);
    const details = { '_id': new ObjectID(id) };
    const user = { userName: req.body.userName, wordList: req.body.wordList };
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(user);
      } 
    });
  });
};