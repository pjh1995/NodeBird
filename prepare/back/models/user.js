module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
      chatset: 'utf8',
      collate: 'utf8_general_ci', //한글저장
    },
  );
  User.associate = (db) => {
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
  };
  return User;
};
