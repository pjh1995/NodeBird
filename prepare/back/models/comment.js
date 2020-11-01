module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      //MYSQL에서 Comments 테이블 생성
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      chatset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘 저장
    },
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
