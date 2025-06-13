// models/Contact.js
import { DataTypes } from 'sequelize';
import sequelize from "../Database/database.js"; 

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
  }, 
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  message: { 
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'contacts', 
  timestamps: false,  
});

export default Contact;
