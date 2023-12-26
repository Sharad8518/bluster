import { gql } from '@apollo/client'

export const QUERY_GET_ALL_USER = gql`
query Query {
  getAllUser {
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
export const QUERY_GET_USER_BY_ID = gql`
query GetUserDetailsByID($userId: String) {
  getUserDetailsByID(userId: $userId) {
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
export const QUERY_GET_All_ORDERS = gql`
query GetAllOrders {
  getAllOrders {
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
    awt
    city
    pincode
    createdDateTime
    status
  }
}
`
export const QUERY_GET_ORDERS_USER_ID = gql`

query GetOrderByUserId($userId: String) {
  getOrderByUserId(UserId: $userId) {
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
    state
    city
    pincode
    createdDateTime
    status
  }
}
`
export const QUERY_GET_SELL_PRODUCT = gql`
query Query {
  getSellProduct {
    id
    productName
    productPrice
    productDescription
    variant
    series
    productType
    category
    productBrand
    image
    createdDateTime
    status
  }
}
`
export const QUERY_GET_ALL_BRANDS = gql`

query Query {
  getAllBrands {
    id
    brandName
    brandImage
    category
    createdDateTime
    status
  }
}

`

export const QUERY_GET_PRODUCT_BY_ID = gql`

query GetProductById($id: String) {
  getProductById(Id: $id) {
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
export const QUERY_GET_PRODUCTS = gql`
query GetProducts($productBrand: String, $category: String) {
  getProducts(ProductBrand: $productBrand, category: $category) {
    id
    productName
    productDescription
    variant
    series
    productType
    category
    quantity
    productBrand
    image
    productPrice
    createdDateTime
    status
  }
}

`
export const GET_SPECIFIC_PRODUCT = gql`

query GetSpecificProduct($productName: String) {
  getSpecificProduct(productName: $productName) {
    id
    productName
    productDescription
    variant
    series
    productType
    category
    productBrand
    image
    productPrice
    createdDateTime
    status
  }
}
`
export const QUERY_GET_ALL_ORDERS_BY_USERID = gql`
query GetSellOrderByUserId($userId: String) {
  getSellOrderByUserId(UserId: $userId) {
    id
    userId
    imageKey
    orderId
    productCategory
    productBrand
    productName
    storage
    ram
    details {
      que
      ans
    }
    addressName
    addressEmail
    addressContact
    addressFlat
    addressState
    addressCity
    addressLandmark
    addressPincode
    addressAlternatContact
    addressType
    wantToPickupYourself
    pickupDate
    pickupTime
    paymentMethod
    bankName
    bankAccountHolderName
    bankIfsc
    bankAccountNo
    upiId
    sellingAmount
    createdDateTime
    status
  }
}
`


export const QUERY_GET_PRODUCT_BY_CATEGORY = gql`
query GetProductByCatagory($cat: String) {
  getProductByCatagory(Cat: $cat) {
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
export const QUERY_All_Product = gql`
query Query {
  getAllProducts {
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
export const QUERY_GET_USER_DETAIL_BY_ID = gql`
query GetUserDetailById($userId: String) {
  getUserDetailById(userId: $userId) {
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
export const QUERY_GET_WISHLIST_BY_USER_ID = gql`
query GetWishlistByUserId($userId: String) {
  getWishlistByUserId(UserId: $userId) {
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
export const QUERY_GET_CART_ITEM_BY_ID = gql`
query GetCartItemsByUserId($userId: String) {
  getCartItemsByUserId(userId: $userId) {
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
export const QUERY_GET_ACTIVE_ORDERS = gql`
query GetActiveOrders {
  getActiveOrders {
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
    awt
    city
    pincode
    createdDateTime
    status
  }
}
`
export const QUERY_GET_CANCELLED_ORDERS = gql`
query GetCancelledOrders {
  getCancelledOrders {
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
    awt
    city
    pincode
    createdDateTime
    status
  }
}
`