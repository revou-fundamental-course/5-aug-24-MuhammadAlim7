document.addEventListener("DOMContentLoaded", function () {
  // Data penjelasan BMI
  const penjelasan = [
    {
      // 0
      ket: "Obesitas",
      desk: "Anda berada dalam kategori obesitas",
      range: "Hasil BMI lebih dari 25",
      deskFull:
        "Anda berada dalam kategori obesitas. Usahakan untuk menurunkan berat badan dan menerapkan pola hidup sehat dengan menjaga makan dan aktivitas fisik. Segera kunjungi dokter untuk dilakukan pemeriksaan kesehatan lanjutan untuk mengetahui risiko yang Anda miliki terkait berat badan Anda.",
    },
    {
      // 1
      ket: "Berat Badan Lebih",
      desk: "Anda memiliki berat badan berlebih",
      range: "Hasil BMI diantara 23 dan 25",
      deskFull:
        "Anda berada dalam kategori overweight atau berat badan berlebih. Cara terbaik untuk menurunkan berat badan adalah dengan mengatur kalor makanan yang dikonsumsi dan berolahraga. Jika BMI Anda berada dalam kategori ini maka Anda dianjurkan untuk menurunkan berat badan hingga batas normal.",
    },
    {
      // 2
      ket: "Berat Badan Normal (Ideal)",
      desk: "Anda memiliki berat badan ideal. Good job!!",
      range: "Hasil BMI diantara 18.5 dan 22.9",
      deskFull:
        "Anda berada dalam kategori berat badan yang normal. Tetap pertahankan berat badan Anda dan jaga berat badan Anda dengan mengatur keseimbangan antara pola makan dan aktivitas fisik Anda.",
    },
    {
      // 3
      ket: "Berat Badan Kurang",
      desk: "Anda kekurangan berat badan",
      range: "Hasil BMI < 18.5",
      deskFull:
        "Anda berada dalam kategori kekurangan berat badan. Hubungi dokter lebih lanjut mengenai pola makan dan gizi yang baik untuk meningkatkan kesehatan.",
    },
  ];
  const penyakit = [
    {
      //0
      ketP: "Beberapa penyakit yang berasal dari kegemukan",
      Ps: ["Diabetes", "Hipertensi", "Sakit Jantung", "Osteoarthritis"],
    },
    {
      //1
      ketP: "Berat rendah dapat menyebabkan berbagai masalah penyakit",
      Ps: ["Infertilitas", "Anemia", "Osteoporosis", "Sistem Imun Lemah"],
    },
  ];
  // ngambil semua element yg di butuhkan
  const formElements = {
    form: document.getElementById("bmi"),
    buttonSubmit: document.querySelector(".submit"),
    resetButton: document.querySelector(".reset"),
    inputKelamin: document.querySelectorAll('input[name="jenis-kelamin"]'),
    inputBeratBadan: document.getElementById("bb"),
    inputTinggiBadan: document.getElementById("tb"),
    outputNilai: document.getElementById("hasilBmi"),
    outputKeterangan: document.getElementById("ketBmi"),
    outputDeskripsi: document.getElementById("descBmi"),
    outputGender: document.getElementById("jKelamin"),
    outputInfo: document.getElementById("infoBmi"),
    outputRange: document.getElementById("rangeBmi"),
    outputJudulPenyakit: document.getElementById("judulPenyakit"),
    displayPenyakit: document.getElementById("penyakit"),
    displayItem: document.querySelectorAll("#result"),
    listItems: document.querySelectorAll("#list"),
  };

  const {
    form,
    buttonSubmit,
    resetButton,
    inputKelamin,
    inputBeratBadan,
    inputTinggiBadan,
    outputNilai,
    outputKeterangan,
    outputDeskripsi,
    outputGender,
    outputInfo,
    outputRange,
    outputJudulPenyakit,
    displayPenyakit,
    displayItem,
    listItems,
  } = formElements;

  // hilangin semua element (biar rapi aja css nya makanya ditaruh di js)
  displayItem.forEach((element) => {
    element.style.display = "none";
  });
  displayPenyakit.style.display = "none";

  // Fungsi untuk menghitung BMI dan update tampilan
  function hitungBMI() {
    const beratBadan = parseFloat(inputBeratBadan.value);
    const tinggiBadan = parseFloat(inputTinggiBadan.value);
    const tinggiBadanInMeters = tinggiBadan / 100; // mengubah cm ke m

    // Validasi tambahan input ketika bukan number (NaN) atau kurang dari 0
    if (
      isNaN(beratBadan) ||
      isNaN(tinggiBadan) ||
      beratBadan <= 0 ||
      tinggiBadan <= 0
    ) {
      alert(
        "Silakan masukkan nilai yang valid untuk berat badan dan tinggi badan."
      );
      return;
    }
    const bmi = beratBadan / (tinggiBadanInMeters * tinggiBadanInMeters); //rumus bmi

    // menetukan kategori metode tennary sering kepake kalau user reactJS wwkwkw
    // 3 Kurang dari 18.5 Kekurangan berat badan
    // 2 18.5-24.9 Normal (ideal)
    // 1 25.0-29.9 Kelebihan berat badan
    // 0 30.0 atau lebih Kegemukan (Obesitas)
    const kategori = bmi < 18.5 ? 3 : bmi < 25 ? 2 : bmi < 30 ? 1 : 0; //ifelse tenary buat kategori bb angka 0123 diambil sesuai array/object penjelasn

    // fungsi nampilin penyakit
    if (kategori !== 2) {
      const penyakitData = kategori === 3 ? penyakit[1] : penyakit[0];
      const { ketP, Ps } = penyakitData;

      displayPenyakit.style.display = "block"; //nampilin element penyakit
      outputJudulPenyakit.textContent = ketP;
      // buat list penyakit
      listItems.forEach((li, index) => {
        li.textContent = Ps[index];
      });
    } else {
      displayPenyakit.style.display = "none"; //hapus penyakit bila bb ideal
      outputJudulPenyakit.textContent = "";
      listItems.forEach((li) => {
        li.textContent = "";
      });
    }
    // nampilin gender
    inputKelamin.forEach((radio) => {
      if (radio.checked) {
        outputGender.textContent = radio.value;
      }
    });

    // Menampilkan nilai yang dipilih berdasarkan kategori
    const { ket, desk, range, deskFull } = penjelasan[kategori]; //dipanggil di sini kategorinya
    outputRange.textContent = range;
    outputKeterangan.textContent = ket;
    outputDeskripsi.textContent = desk;
    outputInfo.textContent = deskFull;
    outputNilai.textContent = bmi.toFixed(1);

    // buat nampilin element nilai dan keterangan
    displayItem.forEach((element) => {
      element.style.display = "block";
    });
  }

  // Validasi input hanya angka dan maksimal 3 digit dan Validasi aktifkan/nonaktifkan tombol submit (biar keren aja sihh wkwk :V)
  function cekForm() {
    const inputs = [inputBeratBadan, inputTinggiBadan];
    buttonSubmit.disabled = !inputs.every((input) => input.value.trim()); // menonaktifkan tombol submit ketika input belum terisi
    inputs.forEach((input) => {
      input.value = input.value
        .slice(0, 3) // Membatasi panjang maksimal
        .replace(/[^0-9]/g, ""); // hapus yang bukan nomer
    });
  }

  // fungsi scroll t0 hasil khusus mode mobile/atau layar width di bawah 1024px
  function scrollToHasil() {
    if (window.innerWidth < 1024) {
      const element = document.getElementById("result");
      if (displayItem) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  // #### SUBMIT BUTTON
  // event listener dari form ketika disubmit
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    hitungBMI(); //eksekusi/panggil function hitungBMi
    scrollToHasil();
  });

  // event listener buat validasi
  inputBeratBadan.addEventListener("input", cekForm);
  inputTinggiBadan.addEventListener("input", cekForm);

  // #### R3SET BUTTON
  // event listener tombol reset
  resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    form.reset();
    outputNilai.textContent = "";
    outputKeterangan.textContent = "";
    outputDeskripsi.textContent = "";
    outputInfo.textContent = "";
    outputJudulPenyakit.textContent = "";
    displayPenyakit.style.display = "none";

    displayItem.forEach((element) => {
      element.style.display = "none";
    });
    // panggil fungsi cekform
    cekForm();
  });
});
