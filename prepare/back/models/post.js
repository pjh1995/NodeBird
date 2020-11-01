module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      //MYSQL에서 Posts 테이블 생성
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
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //post는 하나의 user에 속해있음, belongsTo를 해놓으면 UserId(foreignKey) 컬럼이 생김.
    db.Post.hasMany(db.Comment); //post 하나에 여러 comment가 달릴 수 있음.
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); //post와 hashtag모두 여러개가 속할 수 있음,
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //belongsToMany를 사용시 중간 단계 테이블이 하나 생기는데 through로 이름을 지어줄 수 있음. default = 두 테이블의 이름
    db.Post.belongsTo(db.Post, { as: 'RetweetId' });
    db.Post.hasMany(db.Image);
  };
  return Post;
};
