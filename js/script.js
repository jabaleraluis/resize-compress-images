const uploadBox = document.querySelector(".upload-box"),
  imgPreview = uploadBox.querySelector("img"),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector(".ratio input"),
  qualityInput = document.querySelector(".quality input"),
  downloadBtn = document.querySelector(".download-btn");

let ogImgRatio;

const loadFile = (e) => {
  const file = e.target.files[0];

  if (!file) return;
  imgPreview.src = URL.createObjectURL(file);
  imgPreview.addEventListener("load", () => {
    widthInput.value = imgPreview.naturalWidth;
    heightInput.value = imgPreview.naturalHeight;
    ogImgRatio = imgPreview.naturalWidth / imgPreview.naturalHeight;
    document.querySelector(".wrapper").classList.add("active");
  });
};

widthInput.addEventListener("keyup", () => {
  const height = ratioInput.checked ? widthInput.value / ogImgRatio : heightInput.value;
  heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () => {
  const width = ratioInput.checked ? heightInput.value / ogImgRatio : widthInput.value;
  widthInput.value = Math.floor(width);
});

const resizeAndDownload = () => {
  const canvas = document.createElement("canvas");
  const a = document.createElement("a");
  const ctx = canvas.getContext("2d");

  const imgQuality = qualityInput.checked ? 0.7 : 1.0;

  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(imgPreview, 0, 0, canvas.width, canvas.height);
  a.href = canvas.toDataURL("img/jpeg", imgQuality);
  a.download = new Date().getTime();
  a.click();
};

downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
