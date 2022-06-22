<template>
  <v-container fluid
    ><div>
      <v-row>
        <v-col cols="8"><Product /></v-col>
        <v-col cols="4"><Cart /></v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src

import Product from "@/components/Product.vue";
import Cart from "@/components/Cart.vue";

export default {
  name: "Shop",
  components: {
    Product,
    Cart,
  },
};
</script>
