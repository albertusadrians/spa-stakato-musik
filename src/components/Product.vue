<template>
  <v-container>
    <v-toolbar color="background" flat>
      <v-toolbar-title class="mt-n3">
        <strong>Daftar Alat Musik</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Cari alat musik..."
        class="mt-5"
        color="brown"
        filled
        append-icon="mdi-magnify"
        dense
        solo
        flat
        rounded
        background-color="white"
      ></v-text-field>
    </v-toolbar>
    <v-row class="space px-16">
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        xs="12"
        sm="6"
        md="4"
      >
        <v-card class="mx-auto rounded-xl" max-width="250">
          <v-img :src="product.img" height="250px"></v-img>

          <v-card-title style="overflow-y: auto; height: 120px">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle
            ><strong>{{ convertToRupiah(product.price) }}</strong>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn v-on:click="addToCart(product)" color="orange" text>
              + Keranjang
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      alignments: ["start", "center", "end"],
      show: false,
      search: "",
    };
  },
  computed: {
    ...mapGetters(["lstProducts"]),
    filteredProducts: function () {
      return this.lstProducts.filter((product) => {
        return product.name.toUpperCase().match(this.search.toUpperCase());
      });
    },
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    ...mapActions(["getProducts", "addToCart"]),
    convertToRupiah: function (num) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(num);
    },
  },
};
</script>
