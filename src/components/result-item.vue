<template>
  <div class="mb-5">
    <v-card>
      <div class="d-flex justify-space-between">
        <div class="price-label primary white--text align-self-center ml-6" style="width: 45px">{{route.total}}$</div>
        <div class="d-flex justify-end mr-6 my-6">
          <div v-for="(call, i) in route.route"
               :key="i"
               class="d-flex">
            <div v-if="i === 0" class="node-label align-self-end">{{call.from}}</div>
            <div style="width: 120px; white-space: nowrap;"
                 class="d-flex flex-column align-content-center mb-2">
              <div class="price-label primary white--text">{{call.price[0]}} {{call.price[1]}}$</div>
              <v-icon class="mt-4">mdi-arrow-right</v-icon>
            </div>
            <div class="node-label align-self-end">{{call.to}}</div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "result-item",
  props: {
    route: {
      required: true,
      type: Object
    }
  },
}
</script>

<style scoped>
  .price-label{
    padding: 6px 8px;
    border-radius: 5px;
    width: min-content;
    height: min-content;
    align-self: center;
    text-align: center;
  }
  .node-label {
    padding: 6px 8px;
    border-radius: 5px;
    border: 2px solid #797979;
    height: min-content;
    width: 40px;
    text-align: center;
  }
</style>