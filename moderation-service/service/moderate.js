/**
 * @author Gagandeep Singh
 * @email singh.gagandeep3911@gmail.com
 * @create date 2020-10-19 13:06:54
 * @modify date 2020-10-19 13:06:54
 * @desc Moderate comments
 */

const axios = require('axios');
const eventBusService = process.env.EVENT_BUS_SERVICE;

exports.moderateComments = (req, res) => {
  const { type, data } = req.body;
  switch (type) {
    case `CommentCreated`:
      const { id, postId, content } = data;
      const status = data.content.includes('orange') ? 'rejected' : 'approved';
      axios
        .post(`http://${eventBusService}:7000/events`, {
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
