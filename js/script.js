// Validasi form input tidak boleh lebih dari 3
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function () {
    const batas = 3;
    if (this.value.length > batas) {
      this.value = this.value.slice(0, batas);
    }
  });
});
