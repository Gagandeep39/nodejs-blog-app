/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 13:06:54
 * @modify date 2020-10-19 13:06:54
 * @desc Moderate comments
 */

const axios = require('axios');

exports.moderateComments = (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case `CommentCreated`:
      const { id, postId, content } = data;
      const status = data.content.inclues('orange') ? 'rejected' : 'approved';
      axios
        .post('http://localhost:7000', {
          type: 'CommentModerated',
          data: {
            id,
            postId,
            content,
            status,
          },
        })
        .then(() => res.send({ status: 'OK' }));
      break;
  }
};
