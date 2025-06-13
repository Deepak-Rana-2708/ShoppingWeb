import { DataTypes } from 'sequelize';
import sequelize from "../database/database.js"; 

const Otp = sequelize.define('Otp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false, 
    }, 
    otp: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
    }
},{
    tableName: 'otps', // Specify the table name
    timestamps: true, 
})
export default Otp; 
