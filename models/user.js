const { Model,DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class user extends Model {}

user.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:false,
    },
    username:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        isEmail:true,
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull:false, 
      validate: {
        len:[8]
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (userdata) => {
        userdata.password = await bcrypt.hash(userdata.password, 15);
        return userdata
      },
      beforeUpdate: async (newuserdata) => {
        newuserdata.password = await bcrypt.hash(newuserdata.password, 15);
        return newuserdata
      }
    }
  }
)