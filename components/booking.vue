<template>
  <v-container
    fluid
    class="d-flex justify-center align-center mt-15"
    style="min-height: 80vh; overflow-y: auto"
  >
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4 component-shadow" max-width="600">
          <v-card-title class="text-h5 text-center">Booking Form</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form" v-model="isValid">
              <v-text-field
                v-model="customer.name"
                label="First Name"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="customer.surname"
                label="Last Name"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="customer.address"
                label="Address"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="customer.age"
                label="Age"
                type="number"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-text-field>

              <v-select
                v-model="customer.license"
                :items="['Yes', 'No']"
                label="Valid Driving License?"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-select>

              <v-select
                v-model="rental.carType"
                :items="carTypes"
                label="Select Car Type"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-select>
              <v-select
                v-model="rental.fuelType"
                :items="fuelTypes"
                label="Select Fuel Type"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required]"
              ></v-select>
              <v-select
                v-model="rental.optionalExtra"
                :items="optionalExtras"
                label="Select Optional Extras"
                variant="underlined"
                color="primary"
                density="comfortable"
              ></v-select>
              <v-text-field
                v-model="rental.days"
                label="Rental Days (1-28)"
                type="number"
                variant="underlined"
                color="primary"
                density="comfortable"
                :rules="[rules.required, rules.rentalDays]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="primary"
              variant="elevated"
              block
              @click="submitBooking"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-card
        class="pa-4 component-shadow mt-15"
        max-width="600"
        max-height="600"
        style="position: absolute; top: 7%; right: 7%"
      >
        <v-card-title class="text-h5 text-center">Booking Summary</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p>
            Customer Name: <b>{{ customer.name }} {{ customer.surname }}</b>
          </p>
          <p>
            Address: <b>{{ customer.address }}</b>
          </p>
          <p>
            Age: <b>{{ customer.age }}</b>
          </p>
          <p>
            Driving License: <b>{{ customer.license }}</b>
          </p>
          <p>
            Car Type: <b>{{ rental.carType }}</b>
          </p>
          <p>
            Fuel Type: <b>{{ rental.fuelType }}</b>
          </p>
          <p>
            Days: <b>{{ rental.days }}</b>
          </p>
          <p>
            Optional Extra: <b>{{ rental.optionalExtra }}</b>
          </p>
          <p>
            Total Price: <b> £{{ totalPrice }}</b>
          </p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { useRentalStore } from "~/store/rentals";

export default {
  data() {
    return {
      isValid: false,
      customer: {
        name: "",
        surname: "",
        address: "",
        age: "",
        license: "Yes",
      },
      rental: {
        carType: "",
        fuelType: "",
        days: 1,
        optionalExtra: "",
      },
      totalPrice: 0,
      carTypes: [
        "City car (No extra charge)",
        "Family Car (+£50)",
        "Sports Car (+£75)",
        "SUV (+£65)",
      ],
      fuelTypes: [
        "Petrol (No extra charge)",
        "Diesel (No extra charge)",
        "Hybrid (+£30)",
        "Full Electric (+£50)",
      ],
      optionalExtras: [
        "Unlimited mileage (+ £10 per day)",
        "Breakdown cover (+ £2 per day)",
      ],
      rules: {
        required: (value) => !!value || "This field is required.",
        rentalDays: (value) => {
          if (value < 1) return "Rental days must be at least 1";
          if (value > 28) return "Rental days cannot exceed 28";
          return true;
        },
      },
      rentals: [],
    };
  },
  mounted() {
    console.log("query:", this.$route.query.edit === "editMode");
    this.loadRentals();
  },
  methods: {
    loadRentals() {
      this.loading = true;
      const rentalStore = useRentalStore();
      this.rentals = rentalStore.getRentals(); // Retrieve from localStorage
      this.loading = false;
      if (this.$route.query.edit === "editMode") {
        let selectedItem = this.rentals.find(
          (item) => item.id === parseInt(this.$route.query.id)
        );
        this.customer.name = selectedItem.name;
        this.customer.surname = selectedItem.surname;
        this.customer.address = selectedItem.address;
        this.customer.age = selectedItem.age;
        this.customer.license = selectedItem.license;
        this.rental.carType = selectedItem.carType;
        this.rental.fuelType = selectedItem.fuelType;
        this.rental.days = selectedItem.days;
        this.rental.optionalExtra = selectedItem.optionalExtra;

        console.log("selectedItem", this.$route.query.id, selectedItem);
      }
    },
    calculateTotal() {
      let price = this.rental.days * 25;
      if (this.rental.carType.includes("Family")) price += 50;
      if (this.rental.carType.includes("Sports")) price += 75;
      if (this.rental.carType.includes("SUV")) price += 65;
      if (this.rental.fuelType.includes("Hybrid")) price += 30;
      if (this.rental.fuelType.includes("Full Electric")) price += 50;
      if (this.rental.optionalExtra.includes("Unlimited mileage"))
        price += 10 * this.rental.days;
      if (this.rental.optionalExtra.includes("Breakdown cover"))
        price += 2 * this.rental.days;
      this.totalPrice = price;
    },
    async submitBooking() {
      if (this.customer.license === "No") {
        alert("Cannot proceed without a valid license");
        return;
      }
      let validate = await this.$refs.form.validate();
      if (validate.valid) {
        if (this.$route.query.edit === "editMode") {
          let selectedItem = this.rentals.find(
            (item) => item.id === parseInt(this.$route.query.id)
          );
          console.log("selectedItem", selectedItem);
          selectedItem = {
            ...selectedItem,
            ...this.customer,
            ...this.rental,
            total: this.totalPrice,
          };
          console.log("selectedItem12", selectedItem);
          console.log("rentals", this.rentals);
          this.rentals.splice(
            this.rentals.indexOf(parseInt(this.$route.query.id)),
            1,
            selectedItem
          );
          console.log("rentals", this.rentals);
          localStorage.setItem("rentals", JSON.stringify(this.rentals));
          alert("Booking Updated Successful!");
          this.$router.push("/rentals");
        } else {
          const rentalStore = useRentalStore();
          rentalStore.addRental({
            ...this.customer,
            ...this.rental,
            total: this.totalPrice,
            id: this.rentals.length + 1,
          });
          alert("Booking Successful!");
          this.$router.push("/rentals");
        }
      }
    },
  },
  watch: {
    "rental.days": "calculateTotal",
    "rental.carType": "calculateTotal",
    "rental.fuelType": "calculateTotal",
    "rental.optionalExtra": "calculateTotal",
  },
};
</script>
