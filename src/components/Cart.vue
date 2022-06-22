<template>
  <v-container>
    <v-card class="rounded-xl mx-auto">
      <v-card-title><strong>Keranjang</strong> </v-card-title>
      <v-list
        v-for="item in lstCart"
        :key="item.id"
        subheader
        two-line
        class="mt-1"
      >
        <v-list-item>
          <v-list-item-avatar size="80" rounded color="grey lighten-4">
            <v-img :src="item.img"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">{{
              item.name
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              convertToRupiah(item.price * item.qty)
            }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-btn
                v-on:click="reduceQty(item.id)"
                class="my-1 mr-1"
                small
                color="primary"
              >
                <v-icon> mdi-minus </v-icon>
              </v-btn>
              {{ item.qty }} x
              <v-btn
                v-on:click="addQty(item.id)"
                class="my-1 ml-1"
                small
                color="primary"
              >
                <v-icon> mdi-plus </v-icon>
              </v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-toolbar flat>
        <strong>Subtotal</strong><v-spacer></v-spacer
        ><strong>{{ convertToRupiah(totalPrice) }}</strong>
      </v-toolbar>
      <div v-if="lstCart.length" class="mx-3">
        <v-card-actions>
          <v-btn
            class="rounded-xl mb-4"
            dark
            block
            tile
            color="blue"
            :disabled="isProcessing"
            v-on:click="redirectToCheckout()"
          >
            <span v-if="!isProcessing">Beli</span>
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isProcessing: false,
    };
  },
  computed: {
    ...mapGetters(["lstCart"]),
    totalPrice() {
      return this.lstCart.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },
  created() {
    this.invoiceDate = this.date;
  },
  methods: {
    ...mapActions(["addQty", "reduceQty", "removeItem"]),
    convertToRupiah: function (num) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(num);
    },
    redirectToCheckout() {
      this.$router.push("/checkout");
    },
  },
};
</script>
