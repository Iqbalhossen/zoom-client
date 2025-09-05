"use client";
import { fetchAuthData } from "@/redux-toolkit/features/slices/authSlice/authSlice";
import { selectTotalItems } from "@/redux-toolkit/features/slices/cartSlice/cartSlice";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const totalItems = useSelector(selectTotalItems);

  const { AuthInfo, token, isAuthenticated, AuthData, isAuthLoading } =
    useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthData());
  }, [dispatch]);

  return (
    <>
      <header className="gi-header bg-[#fff] z-[14] max-[991px]:z-[16] relative">
        <div className="header-top py-[10px] text-[#777] bg-[#f8f8fb] max-[767px]:hidden">
          <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="w-full flex flex-wrap px-[12px]">
              <div className="grow-[1] shrink-[0] basis-[0%] min-[992px]:block max-[767px]:hidden">
                <div className="header-top-social">
                  <ul className="mb-[0] p-[0] flex">
                    <li className="list-inline-item    flex text-[13px] mr-[15px]">
                      <a
                        href=""
                        className="mx-[5px] text-center flex items-center justify-center text-[15px]"
                      >
                        <i className="fi fi-rr-phone-call    text-[#777]"></i>
                      </a>
                      +91 987 654 3210
                    </li>
                    <li className="list-inline-item    flex text-[13px]">
                      <a
                        href=""
                        className="mx-[5px] text-center flex items-center justify-center text-[15px]"
                      >
                        <i className="fi fi-brands-whatsapp    text-[#777]"></i>
                      </a>
                      +91 987 654 3210
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grow-[1] shrink-[0] basis-[0%] text-center max-[1199px]:hidden">
                <div className="header-top-message text-[13px]">
                  Worlds Fastest Online Shopping Destination
                </div>
              </div>
              <div className="grow-[1] shrink-[0] basis-[0%]">
                <div className="header-top-right-inner flex justify-end">
                  <a
                    className="gi-help pl-[20px] text-[13px] text-[#777] tracking-[0.7px] font-normal hover:text-[#5caf90]"
                    href="faq.html"
                  >
                    Help?
                  </a>
                  <a
                    className="gi-help pl-[20px] text-[13px] text-[#777] tracking-[0.7px] font-normal hover:text-[#5caf90]"
                    href="track-order.html"
                  >
                    Track Order?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gi-header-bottom py-[12px] max-[991px]:py-[10px] max-[991px]:border-b-[1px] border-solid border-[#eee]">
          <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div className="w-full flex flex-wrap px-[12px]">
              <div className="gi-flex flex flex-row justify-between w-full max-[575px]:flex-col">
                <div className="self-center gi-header-logo max-[575px]:mb-[15px]">
                  <div className="header-logo text-left">
                    <Link href="/">
                      <img
                        src="assets/img/logo/logo.png"
                        alt="Site Logo"
                        className="w-[230px] max-[1399px]:w-[180px] max-[1199px]:w-[150px] max-[991px]:w-[120px] max-[767px]:w-[100px] "
                      />
                    </Link>
                  </div>
                </div>
                <div
                  id="gi-main-menu-desk"
                  className="w-full flex items-center min-[992px]:block hidden"
                >
                  <div className="nav-desk">
                    <div className="w-full flex flex-wrap px-[12px] min-[1400px]:relative">
                      <div className="basis-auto w-full self-center">
                        <div className="gi-main-menu flex">
                          <ul className="w-full flex justify-center flex-wrap pl-[0]">
                            <li className="dropdown drop-list relative ml-[20px] mr-[30px]    max-[1199px]:ml-[15px]">
                              <Link
                                href="/"
                                className="dropdown-arrow relative    text-[15px] leading-[60px] capitalize text-[#4b5966] flex items-center font-medium"
                              >
                                Home
                                <i className="fi-rr-angle-small-right    mr-[5px] text-[#4b5966] absolute right-[-27px] text-[18px] rotate-[90deg] flex"></i>
                              </Link>
                            </li>

                            <li className="dropdown drop-list relative ml-[20px] mr-[30px]    max-[1199px]:ml-[15px]">
                              <Link
                                href="/product"
                                className="dropdown-arrow relative    text-[15px] leading-[60px] capitalize text-[#4b5966] flex items-center font-medium"
                              >
                                Products
                                <i className="fi-rr-angle-small-right    mr-[5px] text-[#4b5966] absolute right-[-27px] text-[18px] rotate-[90deg] flex"></i>
                              </Link>
                            </li>
                            <li className="dropdown drop-list relative ml-[20px] mr-[30px]    max-[1199px]:ml-[15px]">
                              <a
                                href=""
                                className="dropdown-arrow relative    text-[15px] leading-[60px] capitalize text-[#4b5966] flex items-center font-medium"
                              >
                                Blog
                                <i className="fi-rr-angle-small-right    mr-[5px] text-[#4b5966] absolute right-[-27px] text-[18px] rotate-[90deg] flex"></i>
                              </a>
                            </li>
                            <li className="dropdown drop-list relative ml-[20px] mr-[30px]    max-[1199px]:ml-[15px]">
                              <a
                                href=""
                                className="dropdown-arrow relative    text-[15px] leading-[60px] capitalize text-[#4b5966] flex items-center font-medium"
                              >
                                About Us
                                <i className="fi-rr-angle-small-right    mr-[5px] text-[#4b5966] absolute right-[-27px] text-[18px] rotate-[90deg] flex"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gi-header-action self-center max-[991px]:hidden">
                  <div className="gi-header-bottons flex justify-end">
                    <div className="gi-acc-drop relative">
                      {AuthData?.role === "admin" && (
                        <Link
                          href="/admin/dashboard"
                          className="gi-header-btn gi-header-user dropdown-toggle gi-user-toggle mr-[30px]    relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
                          title="Account"
                        >
                          <div className="header-icon relative flex">
                            <i className="fi-rr-user text-[24px] leading-[17px]"></i>
                          </div>
                          <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
                            <span className="gi-btn-stitle    text-[13px] font-medium text-[#4b5966] leading-[14px] max-[1199px]:text-[11px] max-[1199px]:min-w-[48px]">
                              Dashboard
                            </span>
                          </div>
                        </Link>
                      )}
                      {AuthData?.role === "user" && (
                        <Link
                          href="/user/dashboard"
                          className="gi-header-btn gi-header-user dropdown-toggle gi-user-toggle mr-[30px]    relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
                          title="Account"
                        >
                          <div className="header-icon relative flex">
                            <i className="fi-rr-user text-[24px] leading-[17px]"></i>
                          </div>
                          <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
                            <span className="gi-btn-stitle    text-[13px] font-medium text-[#4b5966] leading-[14px] max-[1199px]:text-[11px] max-[1199px]:min-w-[48px]">
                              Dashboard
                            </span>
                          </div>
                        </Link>
                      )}
                      {!AuthData && (
                        <Link
                          href="/login"
                          className="gi-header-btn gi-header-user dropdown-toggle gi-user-toggle mr-[30px]    relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
                          title="Account"
                        >
                          <div className="header-icon relative flex">
                            <i className="fi-rr-user text-[24px] leading-[17px]"></i>
                          </div>
                          <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
                            <span className="gi-btn-stitle    text-[13px] font-medium text-[#4b5966] leading-[14px] max-[1199px]:text-[11px] max-[1199px]:min-w-[48px]">
                              Login
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                    <a
                      href="wishlist.html"
                      className="gi-header-btn gi-wish-toggle mr-[30px]    relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
                      title="Wishlist"
                    >
                      <div className="header-icon relative flex">
                        <i className="fi-rr-heart text-[24px] leading-[17px]"></i>
                      </div>
                      <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
                        <span className="gi-btn-title    text-[12px] leading-[1] text-[#777] mb-[6px] tracking-[0.6px] capitalize font-medium">
                          Wishlist
                        </span>
                      </div>
                    </a>
                    <Link
                      href="/cart"
                      className="gi-header-btn gi-cart-toggle    relative flex text-[#4b5966] w-[auto] items-center whitespace-nowrap"
                      title="Cart"
                    >
                      <div className="header-icon relative flex">
                        <i className="fi-rr-shopping-bag text-[24px] leading-[17px]"></i>
                        <span className="main-label-note-new    h-[10px] w-[10px] m-auto bg-[#ec716d] rounded-[50%] cursor-default hidden absolute bottom-[15px] left-[0] right-[0] z-[3]"></span>
                      </div>
                      <div className="gi-btn-desc flex flex-col uppercase ml-[10px] max-[1199px]:hidden">
                        <span className="gi-btn-title    text-[12px] leading-[1] text-[#777] mb-[6px] tracking-[0.6px] capitalize font-medium">
                          Cart
                        </span>
                        <span className="gi-btn-stitle    text-[13px] font-medium text-[#4b5966] leading-[14px] max-[1199px]:text-[11px] max-[1199px]:min-w-[48px]">
                          <b className="gi-cart-count">
                            {totalItems && totalItems}
                          </b>
                          -items
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="grow-[1] shrink-[0] basis-[0%]  min-[576px]:flex justify-end items-center min-[992px]:hidden">
                  <div className="gi-header-bottons flex justify-end">
                    <div className="right-icons flex flex-row">
                      <a
                        href="login.html"
                        className="gi-header-btn gi-header-user mr-[30px] relative    relative flex text-[#4b5966] w-[auto] items-center"
                      >
                        <div className="header-icon relative flex">
                          <i className="fi-rr-user text-[24px] leading-[17px]"></i>
                        </div>
                      </a>
                      <a
                        href="wishlist.html"
                        className="gi-header-btn gi-wish-toggle mr-[30px] relative    relative flex text-[#4b5966] w-[auto] items-center"
                      >
                        <div className="header-icon relative flex">
                          <i className="fi-rr-heart text-[24px] leading-[17px]"></i>
                        </div>
                        <span className="gi-header-count gi-wishlist-count w-[15px] h-[15px] text-[#fff] flex items-center justify-center rounded-[50%] text-[11px] absolute top-[-2px] right-[-6px] opacity-[0.8]">
                          3
                        </span>
                      </a>
                      <a
                        href=""
                        className="gi-header-btn gi-cart-toggle mr-[30px] relative    relative flex text-[#4b5966] w-[auto] items-center"
                      >
                        <div className="header-icon relative flex">
                          <i className="fi-rr-shopping-bag text-[24px] leading-[17px]"></i>
                          <span className="main-label-note-new"></span>
                        </div>
                        <span className="gi-header-count gi-cart-count  w-[15px] h-[15px] text-[#fff] flex items-center justify-center rounded-[50%] text-[11px] absolute top-[-2px] right-[-6px] opacity-[0.8]">
                          3
                        </span>
                      </a>
                      <a
                        href=""
                        className="gi-header-btn gi-site-menu-icon relative    relative flex text-[#4b5966] w-[auto] items-center"
                      >
                        <i className="fi-rr-menu-burger text-[24px] leading-[17px]"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gi-header-cat    bg-[#fff] border-t-[1px] border-b-[1px] border-solid border-[#eee] hidden min-[992px]:block">
          <div className="flex flex-wrap justify-between items-center mx-auto min-[1600px]:max-w-[1600px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px] relative">
            <div className="gi-nav-bar flex flex-row justify-between relative w-full px-[12px]">
              <div className="gi-category-icon-block py-[5px] static">
                <div className="gi-category-menu relative">
                  <div className="gi-category-toggle w-[200px] min-h-[50px] px-[15px] flex items-center bg-[#5caf90] cursor-pointer max-[1199px]:w-auto max-[991px]:border-[0]">
                    <i className="fi fi-rr-apps text-[18px] text-[#fff] leading-[0]"></i>
                    <span className="text ml-[10px] text-[15px] text-[#fff] font-medium max-[1199px]:hidden">
                      All Categories
                    </span>
                    <i
                      className="fi-rr-angle-small-down gi-angle text-[18px] uppercase text-[#fff] text-center absolute right-[15px] leading-[0] max-[1199px]:hidden"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="gi-cat-dropdown    w-[600px] mt-[15px] p-[15px] absolute bg-[#fff] opacity-[0] invisible left-[0] z-[-15] border-[1px] border-solid border-[#eee]">
                  <div className="gi-cat-block">
                    <div className="gi-cat-tab flex">
                      <ul
                        className="nav-tabs min-w-[240px] p-[10px] flex-col justify-center mr-[16px]"
                        id="myTab"
                      >
                        <li className="active    cursor-pointer px-[15px] py-[10px] bg-[#fff] text-[13px] text-[#4b5966] font-medium text-left capitalize border-[1px] border-solid border-[#eee] flex items-center mb-[10px]">
                          <a href="#v-pills-Header" className="flex">
                            <img
                              src="assets/img/category/c-1.png"
                              alt="category"
                              className="w-[20px] mr-[10px]"
                            />
                            Cothes & Footwear
                          </a>
                        </li>
                        <li className="   cursor-pointer px-[15px] py-[10px] bg-[#fff] text-[13px] text-[#4b5966] font-medium text-left capitalize border-[1px] border-solid border-[#eee] flex items-center mb-[10px]">
                          <a href="#v-pills-profile" className="flex">
                            <img
                              src="assets/img/category/c-8.png"
                              alt="category"
                              className="w-[20px] mr-[10px]"
                            />
                            Jewellery
                          </a>
                        </li>
                        <li className="   cursor-pointer px-[15px] py-[10px] bg-[#fff] text-[13px] text-[#4b5966] font-medium text-left capitalize border-[1px] border-solid border-[#eee] flex items-center mb-[10px]">
                          <a href="#v-pills-messages" className="flex">
                            <img
                              src="assets/img/category/c-9.png"
                              alt="category"
                              className="w-[20px] mr-[10px]"
                            />
                            perfume & cosmetics
                          </a>
                        </li>
                        <li className="   cursor-pointer px-[15px] py-[10px] bg-[#fff] text-[13px] text-[#4b5966] font-medium text-left capitalize border-[1px] border-solid border-[#eee] flex items-center">
                          <a href="#v-pills-settings" className="flex">
                            <img
                              src="assets/img/category/c-4.png"
                              alt="category"
                              className="w-[20px] mr-[10px]"
                            />
                            glasses & bags
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content  w-full" id="myTabContent">
                        <div className="tab-pane" id="v-pills-Header">
                          <div className="tab-list w-full flex flex-wrap">
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                Cothes
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Shirt
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    shorts{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    jacket
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    dress & frock
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                Footwear
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Sports
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Formal
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Casual
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    safety shoes{" "}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="v-pills-profile">
                          <div className="tab-list w-full flex flex-wrap">
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                jewelry
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Earrings
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Couple Rings{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Necklace{" "}
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                jewelry
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Earrings
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Couple Rings{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Necklace{" "}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="v-pills-messages">
                          <div className="tab-list w-full flex flex-wrap">
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                perfume
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Clothes perfume
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    deodorant
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Flower fragrance
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Air Freshener
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                cosmetics
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    shampoo
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Sunscreen
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    body wash
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    makeup kit
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane" id="v-pills-settings">
                          <div className="tab-list w-full flex flex-wrap">
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                glasses
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Sunglasses
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Lenses
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="px-[12px] grow-[1]">
                              <h6 className="gi-col-title text-[#5caf90] font-Poppins text-[15px] font-medium leading-[30px] capitalize block border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] h-auto">
                                bags
                              </h6>
                              <ul className="cat-list">
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    shopping bag{" "}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    Gym backpack
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    purse
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="text-[#777] capitalize leading-[28px] font-normal text-[13px] block py-[5px] border-[0] h-auto hover:text-[#5caf90]"
                                  >
                                    wallet
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="gi-mobile-menu-overlay hidden w-full h-screen fixed top-[0] left-[0] bg-[#000000cc] z-[16]"></div>
        <div
          id="gi-mobile-menu"
          className="gi-mobile-menu    w-[340px] h-full pt-[15px] pb-[20px] px-[20px] fixed top-[0] right-[auto] left-[0] bg-[#fff] flex flex-col z-[17] overflow-auto max-[480px]:w-[300px]"
        >
          <div className="gi-menu-title w-full pb-[10px] flex flex-wrap justify-between">
            <span className="menu_title flex items-center text-[16px] text-[#4b5966] font-semibold">
              My Menu
            </span>
            <button
              type="button"
              className="gi-close-menu relative text-[30px] leading-[1] text-[#777] bg-transparent border-0 mx-[5px]"
            >
              ×
            </button>
          </div>
          <div className="gi-menu-inner">
            <div className="gi-menu-content">
              <ul>
                <li className="dropdown relative drop-list">
                  <a
                    href=""
                    className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
                  >
                    Header
                  </a>
                  <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                    <li>
                      <a
                        href="index.html"
                        className="mb-[0] pl-[15px] py-[12px] pr-[0] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Grocery
                      </a>
                    </li>
                    <li>
                      <a
                        href="demo-2.html"
                        className="mb-[0] pl-[15px] py-[12px] pr-[0] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Fashion
                      </a>
                    </li>
                    <li>
                      <a
                        href="demo-3.html"
                        className="mb-[0] pl-[15px] py-[12px] pr-[0] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Fashion 2
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="relative">
                  <a
                    href=""
                    className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
                  >
                    Categories
                  </a>
                  <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                    <li className="relative">
                      <a
                        href=""
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        classNameic Variation
                      </a>
                      <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                        <li>
                          <a
                            href="shop-left-sidebar-col-3.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Left sidebar 3 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-left-sidebar-col-4.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Left sidebar 4 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-right-sidebar-col-3.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Right sidebar 3 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-right-sidebar-col-4.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Right sidebar 4 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-full-width.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Full width 4 column
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="relative">
                      <a
                        href=""
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        classNameic Variation
                      </a>
                      <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                        <li>
                          <a
                            href="shop-banner-left-sidebar-col-3.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner left sidebar 3 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-banner-left-sidebar-col-4.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner left sidebar 4 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-banner-right-sidebar-col-3.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner right sidebar 3 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-banner-right-sidebar-col-4.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner right sidebar 4 column
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-banner-full-width.html"
                            className="pl-[30px] py-[12px] text-[14px] block text-[#999] font-normal"
                          >
                            Banner Full width 4 column
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="relative">
                      <a
                        href=""
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Columns Variation
                      </a>
                      <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                        <li>
                          <a
                            href="shop-full-width-col-3.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            3 Columns full width
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-full-width-col-4.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            4 Columns full width
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-full-width-col-5.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            5 Columns full width
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-full-width-col-6.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            6 Columns full width
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-banner-full-width-col-3.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner 3 Columns
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="relative">
                      <a
                        href=""
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        List Variation
                      </a>
                      <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                        <li>
                          <a
                            href="shop-list-left-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Shop left sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-list-right-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Shop right sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-list-banner-left-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner left sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-list-banner-right-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Banner right sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="shop-list-full-col-2.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Full width 2 columns
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="relative">
                  <a
                    href=""
                    className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
                  >
                    Products
                  </a>
                  <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                    <li className="relative">
                      <a
                        href=""
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Product page
                      </a>
                      <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                        <li>
                          <a
                            href="product-left-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Product left sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="product-right-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            Product right sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="relative">
                      <a
                        href=""
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Product accordion
                      </a>
                      <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                        <li>
                          <a
                            href="product-accordion-left-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            left sidebar
                          </a>
                        </li>
                        <li>
                          <a
                            href="product-accordion-right-sidebar.html"
                            className="pl-[30px] py-[12px] block text-[14px] text-[#999] font-normal"
                          >
                            right sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        href="product-full-width.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        product full width
                      </a>
                    </li>
                    <li>
                      <a
                        href="product-accordion-full-width.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        accordion full width
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="dropdown relative">
                  <a
                    href=""
                    className="dropdown-arrow mb-[12px] p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
                  >
                    Blog
                  </a>
                  <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                    <li>
                      <a
                        href="blog-left-sidebar.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Blog left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog-right-sidebar.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Blog right sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog-detail-left-sidebar.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Blog detail left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog-detail-right-sidebar.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Blog detail right sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog-full-width.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Blog full width
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog-detail-full-width.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Blog detail full width
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="relative">
                  <a
                    href=""
                    className="dropdown-arrow p-[12px] block capitalize text-[#777] border-[1px] border-solid border-[#eee] text-[15px] font-medium"
                  >
                    Others
                  </a>
                  <ul className="sub-menu w-full min-w-[auto] p-0 mb-[10px] static hidden visible transition-none opacity-[1]">
                    <li>
                      <a
                        href="about-us.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="contact-us.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a
                        href="cart.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Cart
                      </a>
                    </li>
                    <li>
                      <a
                        href="checkout.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Checkout
                      </a>
                    </li>
                    <li>
                      <a
                        href="compare.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Compare
                      </a>
                    </li>
                    <li>
                      <a
                        href="faq.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        href="login.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Login
                      </a>
                    </li>
                    <li>
                      <a
                        href="register.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Register
                      </a>
                    </li>
                    <li>
                      <a
                        href="track-order.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Track Order
                      </a>
                    </li>
                    <li>
                      <a
                        href="terms-condition.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Terms Condition
                      </a>
                    </li>
                    <li>
                      <a
                        href="privacy-policy.html"
                        className="mb-[0] pl-[15px] pr-[0] py-[12px] capitalize block text-[14px] font-normal text-[#777]"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header-res-lan-curr">
              <div className="header-res-social mt-[30px]">
                <div className="header-top-social">
                  <ul className="flex flex-row justify-center">
                    <li className="list-inline-item h-[30px] w-[30px] flex items-center justify-center bg-[#4b5966] mr-[15px]">
                      <a href="#">
                        <i className="gicon gi-facebook text-[#fff]"></i>
                      </a>
                    </li>
                    <li className="list-inline-item h-[30px] w-[30px] flex items-center justify-center bg-[#4b5966] mr-[15px]">
                      <a href="#">
                        <i className="gicon gi-twitter text-[#fff]"></i>
                      </a>
                    </li>
                    <li className="list-inline-item h-[30px] w-[30px] flex items-center justify-center bg-[#4b5966] mr-[15px]">
                      <a href="#">
                        <i className="gicon gi-instagram text-[#fff]"></i>
                      </a>
                    </li>
                    <li className="list-inline-item h-[30px] w-[30px] flex items-center justify-center bg-[#4b5966]">
                      <a href="#">
                        <i className="gicon gi-linkedin text-[#fff]"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </header>
    </>
  );
}
