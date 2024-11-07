const uploadInput = document.getElementById("upload-input");
const imagePreview = document.getElementById("image-preview");
const errorMessage = document.getElementById("error-message");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let uploadedFiles = [];
let currentIndex = 0;

uploadInput.addEventListener("change", function() {
  const files = Array.from(uploadInput.files);
  
 
  errorMessage.style.display = "none";


  const validFiles = files.filter(file => file.type.startsWith('image/'));


  if (uploadedFiles.length + validFiles.length > 5) {
    errorMessage.innerText = "You can only upload a maximum of 5 images!";
    errorMessage.style.display = "block";
    uploadInput.value = ''; 
    return;
  }

  
  uploadedFiles.push(...validFiles);
  
  
  currentIndex = uploadedFiles.length - 1;


  showImage(currentIndex);

 
  updateButtonState();
});

function showImage(index) {
  imagePreview.innerHTML = ''; 


  const imgElement = document.createElement("img");
  const reader = new FileReader();
  
  reader.onload = function(e) {
    imgElement.src = e.target.result;
    imagePreview.appendChild(imgElement);
  };
  
  reader.readAsDataURL(uploadedFiles[index]); 
}

prevButton.addEventListener("click", function() {
  if (currentIndex > 0) {
    currentIndex--;
    showImage(currentIndex);
    updateButtonState();
  }
});

nextButton.addEventListener("click", function() {
  if (currentIndex < uploadedFiles.length - 1) {
    currentIndex++;
    showImage(currentIndex);
    updateButtonState();
  }
});


function updateButtonState() {
  prevButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex >= uploadedFiles.length - 1;


  if (uploadedFiles.length >= 5) {
    uploadInput.disabled = true;
    errorMessage.innerText = "You have reached the maximum upload limit of 5 images.";
    errorMessage.style.display = "block"; 
  }
}
