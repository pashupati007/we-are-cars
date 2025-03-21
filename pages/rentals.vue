<template>
  <div>
    <Appbar />
    <v-container
      fluid
      class="d-flex justify-center align-center"
      height="100vh"
    >
      <v-row>
        <v-col align="center">
          <v-card flat>
            <v-card-title class="d-flex align-center pe-2">
              <p><b>Car Rentals</b></p>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="elevated" @click="addNewRental">
                Add Rental
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-data-table
              :headers="headers"
              :items="rentals"
              item-per-page="10"
              loading-text="Loading... Please wait"
              :loading="loading"
            >
              <template v-slot:item.actions="{ item }">
                <div class="d-flex ga-2 justify-start">
                  <v-tooltip text="View Details" location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        color="medium-emphasis"
                        icon="mdi-delete"
                        size="small"
                        class="cursor-pointer"
                        @click="deleteitem(item)"
                      ></v-icon>
                    </template>
                  </v-tooltip>
                  <v-tooltip text="Edit" location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        color="medium-emphasis"
                        icon="mdi-pencil"
                        size="small"
                        class="cursor-pointer"
                        @click="edititem(item)"
                      ></v-icon>
                    </template>
                  </v-tooltip>
                </div>
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" varity="elevated" @click="loadRentals"
                  >Reset</v-btn
                >
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-delete"
        text="Are you sure you want to delete this rental?"
        title="Delete Confirmation"
      >
        <template v-slot:actions>
          <v-btn
            color="primary"
            variant="tonal"
            class="ms-auto"
            @click="deleteConfirm"
          >
            Ok
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useRentalStore } from "~/store/rentals";

export default {
  data() {
    return {
      dialog: false,
      editDialog: false,
      loading: false,
      selected: "",

      headers: [
        {
          title: "Name",
          align: "start",
          key: "name",
        },
        {
          title: "Address",
          align: "start",
          key: "address",
        },
        {
          title: "Age",
          align: "start",
          key: "age",
        },
        {
          title: "License",
          align: "start",
          key: "license",
        },
        {
          title: "Days",
          align: "start",
          key: "days",
        },
        {
          title: "Car Type",
          align: "start",
          key: "carType",
        },
        {
          title: "Fuel Type",
          align: "start",
          key: "fuelType",
        },
        {
          title: "Total Price",
          align: "start",
          key: "total",
        },
        {
          title: "Actions",
          align: "start",
          key: "actions",
        },
      ],
      rentals: [],
    };
  },
  mounted() {
    this.loadRentals(); // Load rentals when component is mounted
  },
  methods: {
    addNewRental() {
      this.$router.push("/booking");
    },
    loadRentals() {
      this.loading = true;
      const rentalStore = useRentalStore();
      this.rentals = rentalStore.getRentals(); // Retrieve from localStorage
      this.loading = false;
    },
    clearAllRentals() {
      const rentalStore = useRentalStore();
      rentalStore.clearRentals();
      this.rentals = []; // Clear UI
    },
    edititem(item) {
      console.log("edititem", item);
      this.$router.push({
        name: "booking",
        query: { edit: "editMode", id: item.id, address: item.address },
      });
      // this.$router.push({ name: "edit-booking", params: { license: item.total } });

      // this.$router.push({
      //   name: 'edit-booking',
      //   params: { id: item.id },
      // });
    },
    deleteitem(item) {
      this.dialog = true;
      this.selected = item;
    },
    deleteConfirm() {
      this.dataLoading = true;
      this.rentals.splice(this.rentals.indexOf(this.selected), 1);
      localStorage.setItem("rentals", JSON.stringify(this.rentals));
      this.dataLoading = false;
      this.dialog = false;
    },
  },
};
</script>
