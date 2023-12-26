import { Fragment, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getSortedProducts } from '../../helpers/product';
import SEO from "../../components/seo";
import LayoutOne from '../../layouts/LayoutOne';
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb';
import ShopSidebar from '../../wrappers/product/ShopSidebar';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import categoryData from "../../data/category/category-one.json";
import { Suspense, lazy } from "react";
import { useQuery } from '@apollo/client'
import { QUERY_GET_PRODUCT_BY_CATEGORY, QUERY_All_Product } from '../../graphql/Query'

const ShopGridStandard = () => {
    const location = useLocation()
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const { products } = useSelector((state) => state.product);
    const { data: allproductdata, loading: productProLoading } = useQuery(QUERY_All_Product);
    const { data: productdatabyId, loading: dataloading } = useQuery(QUERY_GET_PRODUCT_BY_CATEGORY, {
        variables: {
            "cat": location.state?.category
        },

    })
    // console.log("shoppaged", currentData);
    let { pathname } = useLocation();

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const getSortParams = (sortType, sortValue) => {
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = (sortType, sortValue) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        if (location.state?.category == null) {
            setCurrentData(allproductdata && allproductdata.getAllProducts);
        }
        else {
            setCurrentData(productdatabyId && productdatabyId.getProductByCatagory);
        }
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue, productdatabyId, allproductdata]);
    return (
        <Fragment>
            <SEO
                titleTemplate="Shop Page"
                description="Shop page of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: "Home", path: process.env.PUBLIC_URL + "/" },
                        { label: "Shop", path: process.env.PUBLIC_URL + pathname }
                    ]}
                />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            {/* shop sidebar */}
                            <div className="col-lg-3 order-2 order-lg-1">

                                <ShopSidebar products={categoryData} getSortParams={getSortParams} sideSpaceClass="mr-30" />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                {/* <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} /> */}
                                {/* shop page content default */}
                                <Suspense fallback={
                                    <div className="flone-preloader-wrapper">
                                        <div className="flone-preloader">
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                }>
                                    {/* shop page content default */}
                                    <ShopProducts layout={layout} products={currentData} />
                                </Suspense>

                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    )
}


export default ShopGridStandard;