import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "../db";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        lstProducts: [],
        lstCart: [],
        user: null,
        date: new Date(Date.now()).toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
    },
    getters: {
        lstProducts: state => state.lstProducts,
        lstCart: state => state.lstCart,
        date: state => state.date,
        user: state => state.user,
    },
    mutations: {
        setUser(state,user) {
            state.user = user;
            console.log(user);
        },
        getProductsData(state){
          db.collection("product")
          .get()
          .then((querySnapshot) => {
            const documents = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            state.lstProducts = documents;
            console.log(documents)
          });
        },
        addItemToCart(state, item){
          const itemInCart = state.lstCart.find(product => product.id === item.id)
          if(itemInCart){
            itemInCart.qty++
          } else {
            state.lstCart.push({...item,qty:1})
          }
        },
        addQty(state,id){
          const selectedItem = state.lstCart.find(product => product.id === id);
          selectedItem.qty++
        },
        reduceQty(state,id){
          const selectedItem = state.lstCart.find(product => product.id === id);
          if(selectedItem.qty <= 1){
            state.lstCart = state.lstCart.filter((product)=>product.id !== id);
          } else {
            selectedItem.qty--
          }
        },
        removeItem(state,id){
          state.lstCart = state.lstCart.filter((product)=>product.id !== id)
        },
        emptyCart(state){
          state.lstCart = []
        }
      },
    actions: {
        setUser({commit},data){
            commit("setUser",data)
        },
        getProducts({commit}){
          commit("getProductsData")
        },
        addToCart({commit},item){
          commit("addItemToCart",item)
        },
        addQty({commit},id){
          commit("addQty",id)
        },
        reduceQty({commit},id){
          commit("reduceQty",id)
        },
        removeItem({commit},id){
          commit("removeItem",id)
        },
        emptyCart({commit}){
          commit("emptyCart")
        }
    },
})
