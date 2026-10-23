import { Sequelize, DataTypes } from "sequelize";
export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  },
);
const options = { timestamps: false };
export const Category = db.define(
  "category",
  { name: { type: DataTypes.STRING(60), allowNull: false } },
  { ...options, tableName: "categories" },
);
export const Specialty = db.define(
  "specialty",
  {
    name: { type: DataTypes.STRING(80), allowNull: false },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id",
    },
  },
  { ...options, tableName: "specialties" },
);
export const City = db.define("city", { name: { type: DataTypes.STRING(100), allowNull: false, unique: true } }, { ...options, tableName: "cities" });
export const Artisan = db.define(
  "artisan",
  {
    name: { type: DataTypes.STRING(120), allowNull: false },
    rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
    cityId: { type: DataTypes.INTEGER, allowNull: false, field: "city_id" },
    about: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.STRING(254), allowNull: false },
    website: DataTypes.STRING(255),
    top: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    image: { type: DataTypes.STRING(255), allowNull: false, defaultValue: "/artisan.svg" },
    specialtyId: { type: DataTypes.INTEGER, allowNull: false, field: "specialty_id" },
  },
  { ...options, tableName: "artisans" },
);
Category.hasMany(Specialty, { foreignKey: "categoryId" });
Specialty.belongsTo(Category, { foreignKey: "categoryId" });
Specialty.hasMany(Artisan, { foreignKey: "specialtyId" });
Artisan.belongsTo(Specialty, { foreignKey: "specialtyId" });

City.hasMany(Artisan, { foreignKey: "cityId" });
Artisan.belongsTo(City, { foreignKey: "cityId", as: "locality" });
