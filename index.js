const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000
const dbURi = "mongodb+srv://Muqads:Muqads123@cluster0.zh5ajuh.mongodb.net/?retryWrites=true&w=majority"
// const base_url = "https://smiling-suit-moth.cyclic.app"
app.use(express.json())
app.use(cors())
const mongoose = require("mongoose")
const userModel = require("./models/user")
const signupUsers = require("./models/signup")
const todoModel = require("./models/todo")
const cardModel = require("./models/card")
const wishCardModel = require("./models/wishCards")
// const requesterModel = require("./models/requester")
var bcrypt = require('bcryptjs');
mongoose.connect(dbURi)
  .then((res) => {
    console.log("Mongo Connect")
  }).catch((error) => {
    console.log(error)
  })



//Dummy
//Create and Send Data To mongodb 
// app.post("/user" , (req , res)=>{
//   const obj = req.body
//   if(!obj.firstName || !obj.lastName || !obj.email || !obj.password){
//     res.json({
//       message: "Required Fields are missing",
//       status : "false"
//     })
//   }else{
//   const objToSend = {
//     first_name : obj.firstName ,
//     last_name : obj.lastName ,
//     email : obj.email,
//     password : obj.password
//   }
//    userModel.create(objToSend , (error , data)=>{
// if(error){
//   res.json({
//     message : error , 
//     status : "flase"
//   })
// }else{
//   res.json({
//     message : "Data send Successfully" , 
//     data : data ,
//     status : "flase"
//   })
// }
//    })
//   }
// })

// Get Data by id (Params)
// app.get("/user/:userId", (req, res) => {
//   const { userId } = req.params;
//   console.log(userId);

//   userModel.findById(userId, (error, data) => {
//     if (error) {
//       res.json({
//         message: error,
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Get Successfully",
//         data: data,
//         status: "false"
//       })
//     }
//   })
// })

//Get Data by id  (Query)
// app.get("/user", (req, res) => {
//   const { id } = req.query;
//   console.log(id);
//   userModel.findById(id, (error, data) => {
//     if (error) {
//       res.json({
//         message: error,
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Get Successfully",
//         data: data,
//         status: "true"
//       })
//     }
//   })
// })

// Get Data by firstName
// app.get("/user", (req, res) => {
//   userModel.findOne({first_name:"Saqads"}, (error, data) => {
//     if (error) {
//       res.json({
//         message: error,
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Get Successfully",
//         data: data,
//         status: "false"
//       })
//     }
//   })
// })




//Signup & Login

//Signup User
app.post("/signup", (req, res) => {
  const { firstName, lastName, password, email } = req.body
  if (!firstName || !lastName || !email || !password) {
    res.json({
      message: "Required Fields are missing",
      status: "false"
    })
  } else {
    signupUsers.findOne({ email: email }, (error, user) => {
      if (error) {
        res.json({
          message: "Internal Error",
          status: "false"
        })
      } else if (user) {
        res.json({
          message: "User Already Exist",
          status: "false"
        })
      } else {
        const hashPassword = bcrypt.hashSync(password, 10)
        const objToSend = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: hashPassword
        }
        signupUsers.create(objToSend, (error, data) => {
          if (error) {
            res.json({
              message: "Internal Error",
              status: "false"
            })
          } else {
            res.json({
              message: "User Signup Successfully",
              status: "true",
              data,
            })
          }
        })
      }
    })
  }
})

//Login User
app.post("/login", (req, res) => {
  const { password, email } = req.body
  if (!email || !password) {
    res.json({
      message: "Required Fields are missing",
      status: "false"
    })
  } else {
    signupUsers.findOne({ email: email }, (error, user) => {
      if (error) {
        res.json({
          message: "Internal Error",
          status: "false"
        })
      } else if (!user) {
        res.json({
          message: "Credential Error",
          status: "false"
        })
      } else {
        const comparePassword = bcrypt.compareSync(password, user.password)
        if (comparePassword) {
          res.json({
            message: "User Login Successfully",
            data: user,
            status: "true"
          })
        } else {
          res.json({
            message: "Credential Error",
            status: "false"
          })
        }
      }
    })

  }

})





//Todo
// //Create Todo
// app.post("/todos", (req, res) => {
//   const { todo } = req.body
//   if (!todo) {
//     res.json({
//       message: "Required fields are missing",
//       status: "false"
//     })
//   } else {
//     const objToSend = {
//       todo: todo
//     }
//     todoModel.create(objToSend, (error, data) => {
//       if (error) {
//         res.json({
//           message: "Internal Error",
//           status: "false"
//         })
//       } else {
//         res.json({
//           message: "Todo Created Successfully",
//           data: data,
//           status: "false"
//         })
//       }
//     })
//   }
// })

// //Send Todos Collection 
// app.get("/todos", (req, res) => {
//   todoModel.find({}, (error, data) => {
//     if (error) {
//       res.json({
//         message: "Internal Error",
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Get Successfully",
//         data: data,
//         status: "true"
//       })
//     }
//   })
// })

// //Delete Todo 
// app.delete("/todos/:id", (req, res) => {
//   const { id } = req.params
//   todoModel.findByIdAndDelete(id, (error, data) => {
//     if (error) {
//       res.json({
//         message: "Internal Error",
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Deleted Successfully",
//         status: "true"
//       })
//     }
//   })
// })

// //Edit Todo
// app.put("/todos/:id", (req, res) => {
//   const { id } = req.params
//   const { todo } = req.body;
//   if (!todo) {
//     res.json({
//       message: "Required Fields Are Missing",
//       status: "false"
//     })
//   } else {
//     const objToSend = {
//       todo: todo
//     }
//     todoModel.findByIdAndUpdate(id, objToSend, (error, data) => {
//       if (error) {
//         res.json({
//           message: "Internal Error",
//           status: "false"
//         })
//       } else {
//         res.json({
//           message: "Data Updated Successfully",
//           status: "true"
//         })
//       }
//     })
//   }
// })




//Cart
// //Cart Collection
// app.get("/card", (req, res) => {
//   cardModel.find({}, (error, data) => {
//     if (error) {
//       res.json({
//         message: "Internal Error",
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Get Successfully",
//         data: data,
//         status: "true"
//       })
//     }
//   })
// })
// //Add to Cart
// app.post("/card", (req, res) => {
//   const { img, name, text, color, size, rating, price , quantity } = req.body
//   if (!img || !name || !text || !color || !size || !rating || !price || !quantity){
//     res.json({
//       message: "Required fields are missing",
//       status: "false"
//     })
//   } else {
//  cardModel.findOne({ name: name }, (error, data) => {
//       if (error) {
//         res.json({
//           message: "Internal Error",
//           status: "false"
//         })
//       } else if(data){
//         res.json({
//           quantity : quantity + 1,
//           message: "Add to cart successfully",
//           status: "true"
//         })
//       }else{
//         const objToSend = {
//           img: img,
//           name: name,
//           text: text,
//           color: color,
//           size: size,
//           rating: rating,
//           price: price,
//           quantity : quantity,
//         }
//         cardModel.create(objToSend, (error, data) => {
//           if (error) {
//             res.json({
//               message: "Internal Error",
//               status: "false"
//             })
//           } else {
//             res.json({
//               message: "Add to cart successfully",
//               data: data,
//               status: "true"
//             })
//           }
//         })
//       }
//   }) 
//   }
// })
// //Remove from Cart
// app.delete("/card/:id", (req, res) => {
//   const { id } = req.params
//   cardModel.findByIdAndDelete(id, (error, data) => {
//     if (error) {
//       res.json({
//         message: "Internal Error",
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Removed from cart",
//         status: "true"
//       })
//     }
//   })
// })




//Wishlist
//WishList Collection
// app.get("/wishCard", (req, res) => {
//   wishCardModel.find({}, (error, data) => {
//     if (error) {
//       res.json({
//         message: "Internal Error",
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Data Get Successfully",
//         data: data,
//         status: "true"
//       })
//     }
//   })
// })
// //Add to Wishlist
// app.post("/wishCard", (req, res) => {
//   const { img, name, text, color, size, rating, price , quantity } = req.body
//   if (!img || !name || !text || !color || !size || !rating || !price || !quantity) {
//     res.json({
//       message: "Required fields are missing",
//       status: "false"
//     })
//   }else {
//     wishCardModel.findOne({ name: name }, (error, data) => {
//       if (error) {
//         res.json({
//           message: "Internal Error",
//           status: "false"
//         })
//       } else if(data){
//         res.json({
//           message: "Already added to wishlist",
//           status: "false"
//         })
//       }else{
//         const objToSend = {
//           img: img,
//           name: name,
//           text: text,
//           color: color,
//           size: size,
//           rating: rating,
//           price: price
//         }
//         wishCardModel.create(objToSend, (error, data) => {
//           if (error) {
//             res.json({
//               message: "Internal Error",
//               status: "false"
//             })
//           } else {
//             res.json({
//               message: "Add to wishlist successfully",
//               data: data,
//               status: "true"
//             })
//           }
//         })

//       }
//     })










//   }
// })
// //Remove from wishlist
// app.delete("/wishCard/:id", (req, res) => {
//   const { id } = req.params
//   wishCardModel.findByIdAndDelete(id, (error, data) => {
//     if (error) {
//       res.json({
//         message: "Internal Error",
//         status: "false"
//       })
//     } else {
//       res.json({
//         message: "Removed from wishlist",
//         status: "true"
//       })
//     }
//   })
// })



// //Requester

// const mongoose = require("mongoose")

const requesterSchema = mongoose.Schema({
  curr_latitude: Number,
  curr_longitude: Number,
  category: String,
  sub_category: String,
  name: String,

})
const requesterModel = mongoose.model("Requester", requesterSchema)
module.exports = requesterModel


app.get("/requester", (req, res) => {
  requesterModel.find({}, (error, data) => {
    if (error) {
      res.json({
        message: "Internal Error",
        status: "false"
      })
    } else {
      res.json({
        message: "Data Get Successfully",
        data: data,
        status: "true"
      })
    }
  })
})


app.post("/requester", (req, res) => {
  const { currLatitude, currLongitude, category, subCategory, name } = req.body
  if (!currLatitude || !currLongitude || !category || !subCategory || !name) {
    res.json({
      message: "Required fields are missing",
      status: "false"
    })
  } else {
    const objToSend = {
      curr_latitude: currLatitude,
      curr_longitude: currLongitude,
      category: category,
      sub_category: subCategory,
      name: name
    }
    requesterModel.create(objToSend, (error, data) => {
      if (error) {
        res.json({
          message: "Internal Error",
          status: "false"
        })
      } else {
        res.json({
          message: "Data sent successfully",
          data: data,
          status: "true"
        })
      }
    })
  }
})





app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
