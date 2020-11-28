const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        //MYSQL에서 users 테이블 생성
        email: {
          type: DataTypes.STRING(30), //STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATATIME
          allowNull: false, //필수
          unique: true,
        },
        nickname: {
          type: DataTypes.STRING(50),
          allowNull: false, //필수
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false, //필수
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        chatset: 'utf8',
        collate: 'utf8_general_ci', //한글저장
        sequelize,
      },
    );
  }
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'FollowingId',
    });
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'FollowerId',
    });
  }
};
