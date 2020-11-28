const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        //MYSQL에서 Images 테이블 생성
        src: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Image',
        tableName: 'images',
        chatset: 'utf8',
        collate: 'utf8_general_ci',
        sequelize,
      },
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
};
