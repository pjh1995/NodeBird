module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      //MYSQL에서 Images 테이블 생성
      src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      chatset: 'utf8',
      collate: 'utf8_general_ci', //이모티콘 저장
    },
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
