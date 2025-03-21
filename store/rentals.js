import { defineStore } from "pinia";

export const useRentalStore = defineStore("rentals", {
  state: () => ({
    rentals: [],
  }),

  actions: {
    // Add a new rental and save it to localStorage
    addRental(rental) {
      this.rentals.push(rental);
      this.updateLocalStorage();
    },

    // Retrieve the list of rentals from localStorage
    getRentals() {
      if (typeof window !== "undefined" && window.localStorage) {
        const storedRentals = localStorage.getItem("rentals");
        if (storedRentals) {
          this.rentals = JSON.parse(storedRentals);
        }
      }
      return this.rentals;
    },

    // Persist rental data to localStorage
    updateLocalStorage() {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("rentals", JSON.stringify(this.rentals));
      }
    },

    // Clear all rentals from localStorage
    clearRentals() {
      this.rentals = [];
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("rentals");
      }
    },

    // Delete an individual rental by unique identifier (e.g., license)
    deleteRental(license) {
      this.rentals = this.rentals.filter((rental) => rental.license !== license);
      this.updateLocalStorage();
    },
  },
});
