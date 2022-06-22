<template>
  <v-container fluid>
    <v-row v-for="invoice in lstInvoices" :key="invoice.id" class="space px-16">
      <v-col>
        <v-card class="mx-auto rounded-xl" max-width="90%">
          <v-card-title> INV #{{ invoice.id }} </v-card-title>
          <v-card-subtitle>{{ invoice.invoiceDate }} </v-card-subtitle>
          <v-card-text
            ><strong> Total: {{ convertToRupiah(invoice.total) }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../db";

export default {
  name: "History",
  data() {
    return {
      lstInvoices: [],
    };
  },
  mounted() {
    db.collection("invoice")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.lstInvoices = documents;
      });
  },
  methods: {
    convertToRupiah: function (num) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(num);
    },
  },
};
</script>
