module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      //MYSQL에서 Hashtags 테이블 생성
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      chatset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장.
    },
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };
  return Hashtag;
};
