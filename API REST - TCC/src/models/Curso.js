import Sequelize, { Model } from 'sequelize';

export default class Curso extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      descricao: {
        type: Sequelize.TEXT,
        defaultValue: '',
        validate: {
          len: {
            args: [10, 500],
            msg: 'Campo descrição não pode ser nulo.',
          },
        },
      },
      categoria: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Selecione uma categoria.',
          },
        },
      },
      preco: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo preço é obrigatório.',
          },
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo User_id é obrigatório.',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  static associate(models) {
    this.hasMany(models.FotoCurso, { foreignKey: 'curso_id' });
    this.hasMany(models.VideoCurso, { foreignKey: 'curso_id' });
  }
}