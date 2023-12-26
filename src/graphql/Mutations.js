import { gql } from '@apollo/client'

// ADMIN MUTATION ----------------------------------------------------------

export const MUTATION_ADMIN_LOGIN = gql`
  mutation CreateAdmin($username: String, $password: String) {
    adminLogin(username: $username, password: $password) {
      adminToken
      adminTokenExpire
      adminId
    }
  }
`
export const MUTATION_SEND_USEROTP = gql`
mutation Mutation($contact: String, $otp: String) {
  sendOtp(contact: $contact, otp: $otp)
}
`
export const MUTATION_USER_OTP_LOGIN = gql`
mutation Mutation($contact: String, $otp: String) {
  userOtpLogin(contact: $contact, otp: $otp) {
    userId
    userToken
    userTokenExpiration
  }
}
`
// USER MUTATION ----------------------------------------------------------


export const MUTATION_GET_USER = gql`
  mutation Mutation($userId :ID){
    getUser(userId :$userId){
    id
    fName
    lName
    contact
    email
    createDateTime
    status
    }
  }

`
export const UPDATE_USER = gql`
mutation Mutation($userInput: userInput) {
  updateUser(UserInput: $userInput) {
    id
  }
}
`
// PRODUCT MUTATION ----------------------------------------------------------

export const MUTATION_CREATE_PRODUCT = gql`
mutation CreateProduct($productInput: productInput) {
  createProduct(ProductInput: $productInput) {
    id
    productUniqueId
    productName
    productMRP
    productSellPrice
    productSubTitle
    productDescription
    stockAvailabilty
    category
    quantity
    tag
    additionInformation
    image
    createdDateTime
    status
  }
}
`
export const MUTATION_UPDATE_PRODUCT = gql`
mutation UpdateProduct($productInput: productInput) {
  updateProduct(ProductInput: $productInput) {
    id
    productUniqueId
    productName
    productMRP
    productSellPrice
    productSubTitle
    productDescription
    stockAvailabilty
    category
    tag
    additionInformation
    image
    createdDateTime
    status
  }
}
`
export const MUTATION_UPDATE_PRO_IMAGE = gql`
mutation UpdateProductImage($productInput: productInput) {
  updateProductImage(ProductInput: $productInput) {
    id
    productUniqueId
    productName
    productMRP
    productSellPrice
    productSubTitle
    productDescription
    stockAvailabilty
    category
    tag
    additionInformation
    image
    createdDateTime
    status
  }
}
`
export const MUTATION_DELETE_PRODUCT = gql`
mutation DeleteProductByid($productId: ID) {
  deleteProductByid(ProductId: $productId) {
    id
  }
}
`

// Order MUTATION ----------------------------------------------------------

export const MUTATION_CREATE_ORDER = gql`
mutation CreateOrder($orderInput: orderInput) {
  createOrder(OrderInput: $orderInput) {
    id
    orderId
    userId
    productDetails {
      productId
      productName
      productMRP
      productSellPrice
      productImage
      quantity
      category
    }
    fName
    lName
    contact
    alternateContactNo
    email
    address
    addressTwo
    state
    city
    pincode
    createdDateTime
    status
  }
}

`



export const MUTATION_UPDATE_BUY_ORDER = gql`
mutation Mutation($productInput: productInput) {
  updateBuyProduct(ProductInput: $productInput) {
    id
    productName
    productPrice
    productSubTitle
    productDescription
    warrantyDescription
    image
  }
}
`

export const MUTATION_ORDER_STATUS = gql`
mutation UpdateOrderStatusById($orderId: String, $status: String, $awt: String) {
  updateOrderStatusById(orderId: $orderId, status: $status, awt: $awt) {
    awt
    status
  }
}

`

// Add to Cart MUTATION ----------------------------------------------------------

export const MUTATION_CREATE_CART_ITEM = gql`
mutation CreateCartItem($cartItemInput: cartItemInput) {
  createCartItem(CartItemInput: $cartItemInput) {
    id
    userId
    productId
    productUniqueId
    productName
    description
    image
    price
    incrementPrice
    totalProductPrice
    quantity
    category
    storage
    color
    condition
    createDateTime
    status
  }
}
`
export const MUTATION_DELETE_CART_ITEM = gql`
mutation Mutation($itemId: String) {
  deleteCartItem(itemId: $itemId) {
    id
    createDateTime
    status
  }
}
`
export const MUTATION_UPDATE_CART_ITEM = gql`
mutation Mutation($cartItemInput: cartItemInput) {
  updateCartItem(CartItemInput: $cartItemInput) {
    id
    userId
    quantity
  }
}

`

// Wishlist MUTATION ----------------------------------------------------------

export const MUTATION_CREATE_WISHLIST = gql`
mutation CreateWishlist($wishlistInput: wishlistInput) {
  createWishlist(WishlistInput: $wishlistInput) {
    id
    userId
    productId
    productUniqueId
    productPrice
    productName
    productImage
    createdDateTime
    status
  }
}
`
export const MUTATION_DELETE_WISHLIST = gql`
mutation Mutation($productId: String) {
  deleteWishlistByID(productId: $productId) {
    id
  
  }
}
`





















