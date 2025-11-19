import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import React, { useEffect } from "react";


export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: message,
    timer: 1800,
    showConfirmButton: false,
    background: "#f9fafb",
  });
};

export const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    background: "#fef2f2",
  });
};

export const showConfirm = (message) => {
  return Swal.fire({
    icon: "warning",
    title: "Confirm Deletion",
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  });


};
