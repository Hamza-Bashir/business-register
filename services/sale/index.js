const asyncErrorHandler = require("../../utils/asyncErrorHandler");
const { STATUS_CODES, TEXTS } = require("../../config/constants");
const { Product, Sale } = require('../../models');
const {Sequelize} = require("sequelize")

// --------- Add SALE ----------------

const addSale = asyncErrorHandler(async (req,res)=>{

    const {product_id} = req.body
    
    if(!product_id){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.ID_NOT_FOUND
        })
    }

    const existingProduct = await Product.findOne({
        where:{id:product_id}
    })

    if(!existingProduct){
        return res.status(STATUS_CODES.NOT_FOUND).json({
            statusCode:STATUS_CODES.NOT_FOUND,
            message:TEXTS.NOT_FOUND
        })
    }

    await Sale.create({
        product_id:existingProduct.id
    })

    res.status(STATUS_CODES.SUCCESS).json({
        statusCode:STATUS_CODES.SUCCESS,
        message:TEXTS.CREATED
    })

    
})


// --------- Add SALE Detail ----------------

const getSaleDetail = async (req, res) => {
      const sales = await Sale.findAll({
        attributes: [
          "product_id",
          [Sequelize.fn("COUNT", Sequelize.col("product_id")), "total_sales"]
        ],
        include: [
          {
            model: Product,
            as: "product",  // Use the alias from the Sale model
            attributes: ["name", "price"]
          }
        ],
        group: ["Sale.product_id", "product.id"] // Use product.id for consistency
      });
  
      res.status(STATUS_CODES.SUCCESS).json({
        statusCode: STATUS_CODES.SUCCESS,
        message:TEXTS.FOUND,
        sales
      });
     
  };
  
  

module.exports = {addSale, getSaleDetail}