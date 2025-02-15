import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    total: Number(localStorage.getItem("total")) || 0,
    totalItems: Number(localStorage.getItem("totalItems")) || 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalItems(state, action) {
            state.totalItems = action.payload;
        },
        resetCart(state) {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
            toast.success("Cart Reset Successfully");
        },
        addToCart(state, action) {
            const course = action.payload;

            if (!course?._id || typeof course?.price !== "number") {
                toast.error("Invalid course data");
                return;
            }

            const isCourseInCart = state.cart.some((item) => item._id === course._id);

            if (isCourseInCart) {
                toast.error("Course is already in the cart");
                return;
            }

            state.cart.push(course);
            state.totalItems += 1;
            state.total += course.price; // Directly add as numbers

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", state.total.toString());
            localStorage.setItem("totalItems", state.totalItems.toString());

            toast.success("Course Added to the Cart");
        },
        removeFromCart(state, action) {
            const courseId = action.payload?._id;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if (index >= 0) {
                const removedItemPrice = state.cart[index].price;
                state.cart.splice(index, 1);
                state.totalItems -= 1;
                state.total -= removedItemPrice;

                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", state.total.toString());
                localStorage.setItem("totalItems", state.totalItems.toString());

                toast.success("Course Removed from the Cart");
            }
        }
    }
});

export const { setTotalItems, resetCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;