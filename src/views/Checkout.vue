<template>
  <v-app>
    <v-container fluid
      ><div>
        <v-row>
          <v-col cols="8">
            <v-container>
              <v-card class="rounded-xl mx-auto">
                <v-card-title><strong>Checkout</strong></v-card-title>
                <v-divider class="mx-4"></v-divider>
                <v-card-text>
                  <div>{{ user.data.name }}</div>
                  <div class="text--primary">
                    {{ user.data.phoneNum }}
                  </div>
                </v-card-text>
                <v-card-text>
                  <strong>Alamat Pengiriman</strong>
                  <v-form v-model="isValid">
                    <v-text-field
                      v-model="shippingAddress"
                      label="Masukan alamat..."
                      solo
                      dense
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-list
                  v-for="item in lstCart"
                  :key="item.id"
                  subheader
                  two-line
                  class="mt-1"
                >
                  <v-list-item>
                    <v-list-item-avatar
                      size="80"
                      rounded
                      color="grey lighten-4"
                    >
                      <v-img :src="item.img"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="subtitle-2">{{
                        item.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        convertToRupiah(item.price)
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ item.qty }} x
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        {{ convertToRupiah(item.qty * item.price) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
              <v-alert
                class="rounded-xl my-5"
                v-if="!lstCart.length && !orderPlaced"
                color="red"
                type="warning"
                >Anda belum menambah barang ke keranjang
              </v-alert>
            </v-container>
          </v-col>
          <v-col cols="4">
            <v-container>
              <v-alert v-if="orderPlaced" type="success"
                >Transaksi berhasil...</v-alert
              >
              <v-card class="rounded-xl mx-auto">
                <v-card-title><strong>Ringkasan Belanja</strong></v-card-title>
                <v-toolbar flat>
                  <strong>Subtotal</strong><v-spacer></v-spacer
                  ><strong>{{ convertToRupiah(totalPrice) }}</strong>
                </v-toolbar>
                <div v-if="lstCart.length" class="mx-3 mt-2">
                  <v-divider class="mx-4"></v-divider>
                  <strong>Proses pembayaran</strong>
                  <v-card-actions>
                    <v-btn
                      class="rounded-xl my-4"
                      dark
                      block
                      tile
                      color="blue"
                      :disabled="isProcessing"
                      v-on:click="placeOrder()"
                    >
                      <span v-if="!isProcessing">Bayar</span>
                      <v-progress-circular
                        v-else
                        :size="50"
                        color="primary"
                        indeterminate
                      >
                        <span>Loading...</span>
                      </v-progress-circular>
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { db } from "../db";

export default {
  name: "Checkout",
  data: () => ({
    shippingAddress: "",
    isProcessing: false,
    orderPlaced: false,
    total: 0,
    itemOrdered: [],
  }),
  computed: {
    ...mapGetters(["lstCart", "user", "date"]),
    totalPrice() {
      return this.lstCart.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },

  methods: {
    ...mapActions(["emptyCart"]),
    placeOrder() {
      if (this.shippingAddress === "") {
        alert("Masukan alamat pengiriman terlebih dahulu!");
      } else {
        this.isProcessing = true;
        this.total = this.totalPrice;
        for (let i = 0; i < this.lstCart.length; i++) {
          this.itemOrdered.push({
            nama: this.lstCart[i].name,
            price: this.lstCart[i].price * this.lstCart[i].qty,
            qty: this.lstCart[i].qty,
          });
        }
        setTimeout(() => {
          this.uploadInvoice();
          this.orderPlaced = true;
          this.isProcessing = false;
          this.shippingAddress = "";
          this.isValid = false;
          this.emptyCart();
        }, 1000);
      }
    },
    async uploadInvoice() {
      const database = db.collection("invoice").doc();
      await database.set({
        userId: this.user.id,
        name: this.user.data.name,
        shippingAddress: this.shippingAddress,
        itemOrdered: this.itemOrdered,
        invoiceDate: this.date,
        total: this.total,
      });
    },
    convertToRupiah: function (num) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(num);
    },
  },
};
</script>
