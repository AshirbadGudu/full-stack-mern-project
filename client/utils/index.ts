import Swal from "sweetalert2";

export const handleError = (error: unknown) => {
  const message =
    error instanceof Error
      ? error?.message
      : "Internal Server Error, Please Try Again Later";
  Swal.fire("Error", message, "error");
};
