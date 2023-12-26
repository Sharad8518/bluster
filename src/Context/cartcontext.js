import React, { useEffect, useState, createContext } from "react";
import { MUTATION_CREATE_CART_ITEM } from "../graphql/Mutations";
import { MUTATION_DELETE_CART_ITEM } from "../graphql/Mutations";
import { MUTATION_UPDATE_CART_ITEM } from "../graphql/Mutations";
import { MUTATION_DELETE_WISHLIST } from "../graphql/Mutations";
import { MUTATION_CREATE_WISHLIST } from "../graphql/Mutations";
import { QUERY_GET_CART_ITEM_BY_ID } from "../graphql/Query";
import { QUERY_GET_WISHLIST_BY_USER_ID } from "../graphql/Query";
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'
import swal from 'sweetalert';
const CartContext = createContext();

const CartProvider = (props) => {


    //  Decaration Part --------------------------

    const userId = localStorage.getItem('userId');
    const [cartData, setCartdata] = useState([]);
    const [wishlistData, setWishlistdata] = useState([]);
    // const [totalAmount, setTotalAmount] = useState(0);



    // Add to Cart Mutation ------------------------------------------------------------
    const [createCartItem, { loading: Loading }] = useMutation(MUTATION_CREATE_CART_ITEM
        , {
            refetchQueries: [
                QUERY_GET_CART_ITEM_BY_ID
            ]
        }
    )

    const [deleteCartItem, { loading: delLoading }] = useMutation(MUTATION_DELETE_CART_ITEM
        , {
            refetchQueries: [
                QUERY_GET_CART_ITEM_BY_ID
            ]
        }
    )



    // Wishlist Mutation  ------------------------------------------------------------

    const [createWishlist, { loading: wishlistLoading }] = useMutation(MUTATION_CREATE_WISHLIST
        , {
            refetchQueries: [
                QUERY_GET_WISHLIST_BY_USER_ID
            ]
        }
    )

    const [deleteWishlistByID, { loading: wishdelLoading }] = useMutation(MUTATION_DELETE_WISHLIST
        , {
            refetchQueries: [
                QUERY_GET_WISHLIST_BY_USER_ID
            ]
        }
    )


    // Queries ------------------------------------------------------------

    const { data: getCartItemsByUserId, loading: dataLoading } = useQuery(QUERY_GET_CART_ITEM_BY_ID,
        {
            variables:
            {
                "userId": userId
            }
        });

    const { data: getWishlistByUserId, loading: wishlistdataLoading } = useQuery(QUERY_GET_WISHLIST_BY_USER_ID,
        {
            variables:
            {
                "userId": userId
            }
        });



    useEffect(() => {
        if (getCartItemsByUserId)
            setCartdata(getCartItemsByUserId?.getCartItemsByUserId)
        if (getWishlistByUserId)
            setWishlistdata(getWishlistByUserId?.getWishlistByUserId)

    }, [getCartItemsByUserId, getWishlistByUserId])

    // Add to Cart Functions ------------------------------------------------------------

    const addToCart = async (data) => {
        let id = await localStorage.getItem('userId')
        createCartItem({
            variables: {
                "cartItemInput": {
                    "productId": `${data.id}`,
                    // "userId": `${id}`,
                    "productUniqueId": `${data.productUniqueId}`,
                    "productName": `${data.productName}`,
                    "description": `${data.productDescription}`,
                    "image": `${data.image[0]}`,
                    "price": `${data.productSellPrice}`,
                    "quantity": `${data.quantity}`,
                    "category": `${data.category}`,
                }
            }
        }).then(() => {
            setCartdata([...cartData, data]);

            // swal({
            //     title: "Success",
            //     text: "Product Added in Cart",
            //     icon: "success",
            // });
        }).catch((e) => {
            // swal("Please Login First", " ", "warning");
        });

    }
    const removeItem = (data) => {
        deleteCartItem({
            variables: {
                "itemId": `${data.id}`
            }
        }).then(() => {

        })
        const newItems = cartData.filter((item) => item.id !== data.id)
        console.log("updated items", newItems)
        setCartdata(newItems);
    }
    const emptyCart = () => {
        for (let x of cartData) {
            removeItem(x)
        }
    }

    function incQuantity(id) {
        const newState = cartData.map(obj => {
            if (obj.id === id) {
                return { ...obj, quantity: parseInt(obj.quantity) + 1 }
            }
            return obj
        })
        setCartdata(newState)
    }

    function decQuantity(id) {
        const newState = cartData.map(obj => {
            if (obj.id === id && parseInt(obj.quantity) > 1) {
                return { ...obj, quantity: parseInt(obj.quantity) - 1 }
            }
            return obj
        })
        setCartdata(newState)
    }

    // Wishlist Functions ------------------------------------------------------------


    const addToWishlist = (data) => {
        // console.log("datacontext", data);

        createWishlist({
            variables: {
                "wishlistInput": {
                    "productId": `${data.id}`,
                    "userId": `${userId}`,
                    "productUniqueId": `${data.productUniqueId}`,
                    "productPrice": `${data.productMRP}`,
                    "productName": `${data.productName}`,
                    "productImage": `${data.image[0]}`
                }
            }
        }).then((data) => {
            console.log(data);
            setWishlistdata([...wishlistData, data]);

            // swal({
            //     title: "Success",
            //     text: "Product Added in Wishlist",
            //     icon: "success",
            // });
        }).catch((e) => {
            console.log(e);
            // swal("Please Login First", " ", "warning");
        });

    }
    const removewishItem = (data) => {

        deleteWishlistByID({
            variables: {
                "productId": `${data.id}`
            }
        }).then(() => {

        })
        const newwishItems = wishlistData.filter((item) => item.id !== data.id)
        // console.log("updated items", newItems)
        setWishlistdata(newwishItems);
    }
    const emptywishItem = () => {

        for (let x of wishlistData) {

            removewishItem(x)
        }

    }




    return (
        <CartContext.Provider value={{ cartData, emptyCart, addToCart, removeItem, incQuantity, decQuantity, addToWishlist, wishlistData, removewishItem, emptywishItem }}>
            {props.children}
        </CartContext.Provider>
    )
}
export { CartContext, CartProvider };
