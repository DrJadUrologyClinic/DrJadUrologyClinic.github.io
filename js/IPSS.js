// Automatically set the current date in the date input if it's not filled
function setDateAutomatically() {
  const dateInput = document.getElementById('date');
  if (!dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;  // Set the current date in the format YYYY-MM-DD
  }
}

// Submit the partial data and move to the next section when the button is clicked
function submitPartialData(formId, nextFunction) {
  setDateAutomatically(); // Automatically set the date if not provided
  const form = document.getElementById(formId);
  const formData = new FormData(form);

  // Convert form data to URLSearchParams format to send via POST
  const formDataObj = new URLSearchParams();
  for (const pair of formData) {
    formDataObj.append(pair[0], pair[1]);
  }

  // Send the data to Google Apps Script using fetch
  fetch('https://script.google.com/macros/s/AKfycbzMTWqdDju2IL4uVuEpxH1GWwgCH2HvFTeoIGAuDfb_69ojaiq1ZvLacnW3zd2tJ1yp/exec', {
    method: 'POST',
    body: formDataObj,
  })
  .then(response => response.text())
  .then(result => {
    console.log('Data submitted: ', result);

    // Call the function to move to the next page or question
    if (typeof nextFunction === 'function') {
      nextFunction();
    }
  })
  .catch(error => {
    console.error('Error submitting data: ', error);
  });
}

// Toggle duration input for medical conditions
function toggleDurationInput(condition) {
  const conditionCheckbox = document.getElementById(condition);
  const yearsInput = document.getElementById('years_' + condition);
  
  if (conditionCheckbox.checked) {
    yearsInput.style.display = 'inline-block';
  } else {
    yearsInput.style.display = 'none';
    yearsInput.value = '';  // Clear the value if unchecked
  }
}

// Move to the first question in the IPSS survey
function showFirstQuestion() {
  document.getElementById('patientInfoSection').style.display = 'none';
  document.getElementById('questionnaireSection').style.display = 'block';
  document.getElementById('question1').style.display = 'block';  // Show the first question
}

// Attach listeners for BMI and PSA ratio inputs
function attachListeners() {
  document.getElementById('height').addEventListener('input', calculateBMI);
  document.getElementById('weight').addEventListener('input', calculateBMI);
  document.getElementById('totalPSA').addEventListener('input', calculatePSARatio);
  document.getElementById('freePSA').addEventListener('input', calculatePSARatio);
}

// Move to the next question
function nextQuestion(currentQuestionNumber) {
  hideAllQuestions(); // Hide all questions
  const nextQuestionNumber = currentQuestionNumber + 1;
  
  // If there's a next question, show it. Otherwise, submit the form and calculate the score.
  if (document.getElementById(`question${nextQuestionNumber}`)) {
    document.getElementById(`question${nextQuestionNumber}`).style.display = 'block';
  } else {
    submitPartialData('symptomForm', calculateScore); // Submit and calculate the score on the last question
  }
}

// Move to the previous question
function previousQuestion(questionNumber) {
  hideAllQuestions(); // Hide all questions first
  const previousQuestionNumber = questionNumber - 1;
  
  // Show the previous question only
  document.getElementById(`question${previousQuestionNumber}`).style.display = 'block';
}

// Hide all questions
function hideAllQuestions() {
  const questions = document.querySelectorAll('.question');
  questions.forEach(question => question.style.display = 'none');
}

// Initialize the page on load
window.onload = function() {
  attachListeners();  // Attach event listeners for BMI and PSA ratio calculation
  setDateAutomatically(); // Set the date automatically when the page loads
  document.getElementById('patientInfoSection').style.display = 'block';  // Show patient info section by default
};

// Calculate the total score from all seven questions and show the recommendation
function calculateScore() {
  let totalScore = 0;
  const answers = document.getElementById('symptomForm').querySelectorAll('select');

  // Sum the values of all seven questions
  answers.forEach(answer => {
    totalScore += parseInt(answer.value);
  });

  // Display the total score in the result section
  document.getElementById('score').innerText = totalScore;

  let category = '';
  if (totalScore <= 7) {
    category = 'أعراض خفيفة';
    showRecommendation('mildSymptoms');
  } else if (totalScore <= 19) {
    category = 'أعراض متوسطة';
    showRecommendation('moderateSymptoms');
  } else {
    category = 'أعراض شديدة';
    showRecommendation('severeSymptoms');
  }

  // Display the symptom category
  document.getElementById('symptomCategory').innerText = category;
  hideAllSections(); // Hide all sections
  document.getElementById('resultSection').style.display = 'block'; // Show the result section
}

// Show the appropriate recommendation based on the score
function showRecommendation(recommendationId) {
  document.getElementById(recommendationId).style.display = 'block';
}

// Hide all sections
function hideAllSections() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.style.display = 'none');
}

// Move to the appropriate recommendation page based on score
function nextPage() {
  const totalScore = parseInt(document.getElementById('score').innerText);
  
  // Hide the result section
  document.getElementById('resultSection').style.display = 'none';

  // Show the appropriate recommendation based on the score
  if (totalScore <= 7) {
    document.getElementById('mildSymptoms').style.display = 'block';
  } else if (totalScore <= 19) {
    document.getElementById('moderateSymptoms').style.display = 'block';
  } else {
    document.getElementById('severeSymptoms').style.display = 'block';
  }
}

// Go back to the previous section (like the patient info section)
function goBack() {
  hideAllSections();  // Hide all sections
  document.getElementById('patientInfoSection').style.display = 'block'; // Show the patient info section again
}

// Function to download the result as an image
function downloadAsImage() {
  const downloadButton = document.getElementById('downloadButton');
  downloadButton.style.display = 'none';  // Hide download button during capture

  html2canvas(document.getElementById('result-content')).then(function(canvas) {
    const link = document.createElement('a');
    link.download = 'Dr Jad Alsmadi Urology Clinic.png';
    link.href = canvas.toDataURL();
    link.click();

    downloadButton.style.display = 'block';  // Show the download button again after the capture
  });
}

// Function to share the result as an image
function shareImage() {
  html2canvas(document.getElementById('result-content')).then(function(canvas) {
    const image = canvas.toDataURL();
    if (navigator.share) {
      navigator.share({
        title: 'نتيجة الاستبيان',
        text: 'نتيجة استبيان أعراض البروستات.',
        files: [
          new File([image], 'DrJadAlsmadiClinic.png', { type: 'image/png' })
        ]
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('مشاركة الصور غير مدعومة على هذا الجهاز');
    }
  });
}

// Automatically calculate BMI when height and weight are filled
function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const bmiInput = document.getElementById('bmi');

  if (height && weight) {
    const bmi = weight / (height * height);
    bmiInput.value = bmi.toFixed(2); // Display BMI with 2 decimal places
  }
}

// Automatically calculate PSA ratio when total PSA and free PSA are provided
function calculatePSARatio() {
  const totalPSA = parseFloat(document.getElementById('totalPSA').value);
  const freePSA = parseFloat(document.getElementById('freePSA').value);
  const psaRatioInput = document.getElementById('psaRatio');

  if (totalPSA && freePSA) {
    const ratio = (freePSA / totalPSA) * 100;
    psaRatioInput.value = ratio.toFixed(2) + '%'; // Display PSA ratio as percentage
  }
}

// Toggle visibility of operation details based on the selection
function toggleOperationDetails() {
  var prostateOperation = document.getElementById("prostateOperation").value;
  var operationDetails = document.getElementById("operationDetails");

  if (prostateOperation === "yes") {
    operationDetails.style.display = "block";
  } else {
    operationDetails.style.display = "none";
  }
}

