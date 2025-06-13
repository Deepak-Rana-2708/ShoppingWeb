import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../Database/database.js";
import User from "./UserModel.js";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "orders",
    createdAt: "created_at",
    updatedAt: false,
  }
);

Order.belongsTo(User, { foreignKey: "user_id" });

export default Order;
