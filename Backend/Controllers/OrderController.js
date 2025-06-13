import Order from "../model/OrderModel.js";
import Contact from "../model/Contact.js";
import { Op } from "sequelize";
// import { Login } from "./UserController.js";

export const OrderData = async (req, res) => {
  try {
    const {product_id ,items,image ,price,quantity,quantity_price } = req.body;

    const user_id = req.params.id; 

    if (!product_id || !items|| !image || !price || !quantity || !quantity_price ) {
      return res.status(400).json({
        success: false,
        message: "Please Select the items!",
      });
    }

    // today date ka start or end time set krna hai

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Delete existing same product for today's

    await Order.destroy({
      where: {
        user_id,
        product_id,
        created_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });
 
    // Insert new order
    const order = await Order.create({
      user_id : user_id,
      product_id : product_id,
      items: items,
      image: image,
      price : price,
      quantity : quantity,
      quantity_price : quantity_price,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      Order_User_id: order.user_id,
      Order_id: order.id,
      status: order.status,
      message: "has been added to your cart",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const UpdateOrderStatus = async (req, res) => {
  try {
    
    const { orderid, userid } = req.body
    console.log(orderid, userid);

    if (!orderid || !userid) {
      return res.status(400).json({
        success: false,
        message: "Order ID or User ID is missing!",
      });
    }
    const [updatedRow] = await Order.update(
      { status: "success" },
      {
        where: {
          product_id: {
            [Op.in] : orderid,
          },
          user_id: userid,
        },
      }
    );

    if (updatedRow === 0) {
      return res.status(400).json({
        success: false,
        message: "Data are not Update",
      });
    }
   return res.status(200).json({
      success: true,
      message: "Order Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update Order Internal Server Error",
    });
  }
};


export const pendingOrders = async (req, res) => {
  try {
    const userid = req.params.userid;

    const pending = await Order.findAll({
      where: {
        user_id: userid,
        status : 'pending'
      }
    })
    if (!pending) {
      return res.status(400).json({
        success: false,
        message : "pending Error !"
    })
    }
    return res.status(200).json({
      success: true,
      message : pending
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message : "pending Internal Server Error !"
    })
  }
}

export const DirectBuy = async (req, res) => {
  try {
    const { product_id, items, image, price, quantity, quantity_price } = req.body;
    const user_id = req.params.id;

    if (!product_id || !items || !image || !price || !quantity || !quantity_price) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields!",
      });
    }

     const order = await Order.create({
      user_id: user_id,
      product_id: product_id,
      items: items,
      image: image,
      price: price,
      quantity: quantity,
      quantity_price: quantity_price,
      status: "success", // Direct success
     });
    
    return res.status(200).json({
      success: true,
      Order_User_id: order.user_id,
      Order_id: order.id,
      status: order.status,
      message: "Order placed successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error during Direct Buy!",
    })
  }
}

export const DeleteOrder = async (req,res) => {
  try {
    const { orderid, userid } = req.body; 
    console.log(orderid, userid)

    if (!orderid || !userid) {
      return res.status(400).json({
        success: false,
        message : "Order ID or User ID is missing!"
      })
    }
    const deleteOrder = await Order.destroy({
      where: {
        product_id: orderid,
        user_id : userid
      }
    })

    if (!deleteOrder) {
      return res.status(400).json({
        success: false,
        message : "Pending Order Delete Failed !"
      })
    }

    return res.status(200).json({
      success: true,
      message : "Cart Item Remove Successfully !"
    })

  } catch (error) {
   return res.status(500).json({
      success: false,
      message : "Delete Order Internal Server Error!"
    })
  }
}

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill all required fields.' });
    }

    const newContact = await Contact.create({ name, email, message });
    return res.status(201).json({ message: 'Thank you for your feedback! We appreciate your response.', data: newContact });

  } catch (error) {
    console.error('Error saving contact:', error);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};
