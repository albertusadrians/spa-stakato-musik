<template>
  <v-container>
    <v-card class="rounded-xl mx-auto">
      <v-card-title><strong>Checkout</strong></v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <div>{{ user.data.name }}</div>
        <div class="text--primary">
          {{ user.data.address }}
        </div>
        <div class="text--primary">
          {{ user.data.phoneNum }}
        </div>
      </v-card-text>
      <v-card-text>
        <strong>Alamat Pengiriman</strong>
        <v-text-field
          v-model="address"
          v-on:input="setShippingAdd(address)"
          label="Masukan alamat..."
          solo
          dense
        ></v-text-field>
      </v-card-text>
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
              convertToRupiah(item.price)
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-content>
            <v-list-item-subtitle> {{ item.qty }} x </v-list-item-subtitle>
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
      v-if="!lstCart.length"
      color="red"
      type="warning"
      >Anda belum menambah barang ke keranjang</v-alert
    >
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
    address: "",
  }),
  computed: {
    ...mapGetters(["lstCart", "user", "shippingAdd"]),
    totalPrice() {
      return this.lstCart.reduce((a, b) => a + b.qty * b.price, 0);
    },
  },

  methods: {
    ...mapActions(["setShippingAdd"]),

    convertToRupiah: function (num) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(num);
    },
  },
};
</script>
