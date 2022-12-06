const db = require('../../../database/models');

const Product = db.Product;
const Order = db.Order;

const apiController = {
    product: async function (req, res) {
      let product = await Product.findByPk(req.params.id);
      return res.json(product);
    },

    checkout: async function (req, res) {
      // return res.send({ ...req.body, userId: req.session.userLogged.id });
      let order = await Order.create(
        { ...req.body, userId: req.session.userLogged.id },
        {
          include: Order.OrderItems,
        }
      );
      res.json({ ok: true, status: 200, order: order });
    },
};

module.exports = apiController;
