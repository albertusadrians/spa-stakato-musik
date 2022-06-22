<template>
  <v-container>
    <v-alert v-if="orderPlaced" type="success">Menunggu pembayaran...</v-alert>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { db } from "../db";

export default {
  data() {
    return {
      isProcessing: false,
      orderPlaced: false,
      subTotal: 0,
      discount: 0,
      total: 0,
      itemOrdered: [],
    };
  },
  computed: {
    ...mapGetters(["lstCart", "date", "user", "shippingAdd"]),
    totalPrice() {
      return this.lstCart.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },
  methods: {
    ...mapActions(["emptyCart"]),
    placeOrder() {
      this.isProcessing = true;
      this.total = this.totalPrice;
      this.subTotal = this.totalPrice;
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
        this.emptyCart();
      }, 1000);
    },
    async uploadInvoice() {
      const database = db.collection("invoice").doc();
      await database.set({
        userId: this.user.id,
        name: this.user.data.name,
        shippingAddress: this.shippingAdd,
        itemOrdered: this.itemOrdered,
        invoiceDate: this.date,
        subTotal: this.subTotal,
        discount: this.discount,
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
