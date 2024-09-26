function toggleOperationDetails() {
  var prostateOperation = document.getElementById("prostateOperation").value;
  var operationDetails = document.getElementById("operationDetails");

  if (prostateOperation === "yes") {
    operationDetails.style.display = "block";
  } else {
    operationDetails.style.display = "none";
  }
}


let currentQuestion = 1;

// Function to hide all sections (questions, result, recommendations)
function hideAllSections() {
  // Hide all questions
  const questions = document.querySelectorAll('.question');
  questions.forEach(question => question.style.display = 'none');

  // Hide the patient info, questionnaire, result, and recommendation sections
  document.getElementById('resultSection').style.display = 'none';
  document.getElementById('mildSymptoms').style.display = 'none';
  document.getElementById('moderateSymptoms').style.display = 'none';
  document.getElementById('severeSymptoms').style.display = 'none';
  document.getElementById('patientInfoSection').style.display = 'none';
  document.getElementById('questionnaireSection').style.display = 'none';
}

// Show the first question and reset the state when starting the questionnaire
function showFirstQuestion() {
  hideAllSections();  // Hide everything first
  currentQuestion = 1;  // Reset to the first question
  document.getElementById('questionnaireSection').style.display = 'block';  // Show the questionnaire section
  document.getElementById('question1').style.display = 'block';  // Show the first question
}

// Move to the next question
function nextQuestion(questionNumber) {
  document.getElementById(`question${questionNumber}`).style.display = 'none';  // Hide the current question
  currentQuestion = questionNumber + 1;  // Increment to the next question
  document.getElementById(`question${currentQuestion}`).style.display = 'block';  // Show the next question
}

// Move to the previous question
function previousQuestion(questionNumber) {
  document.getElementById(`question${questionNumber}`).style.display = 'none';  // Hide the current question
  currentQuestion = questionNumber - 1;  // Decrement to the previous question
  document.getElementById(`question${currentQuestion}`).style.display = 'block';  // Show the previous question
}

// Auto-calculate BMI when height and weight are filled
function calculateBMI() {
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const bmiInput = document.getElementById('bmi');

  if (height && weight) {
    const bmi = weight / (height * height);
    bmiInput.value = bmi.toFixed(2);
  }
}

// Auto-calculate PSA ratio when total PSA and free PSA are provided
function calculatePSARatio() {
  const totalPSA = parseFloat(document.getElementById('totalPSA').value);
  const freePSA = parseFloat(document.getElementById('freePSA').value);
  const psaRatioInput = document.getElementById('psaRatio');

  if (totalPSA && freePSA) {
    const ratio = (freePSA / totalPSA) * 100;
    psaRatioInput.value = ratio.toFixed(2) + '%';
  }
}

// Attach event listeners to BMI and PSA ratio inputs
function attachListeners() {
  document.getElementById('height').addEventListener('input', calculateBMI);
  document.getElementById('weight').addEventListener('input', calculateBMI);
  document.getElementById('totalPSA').addEventListener('input', calculatePSARatio);
  document.getElementById('freePSA').addEventListener('input', calculatePSARatio);
}

// Submit the patient info form and proceed to the questionnaire
function submitForm() {
  hideAllSections();  // Hide everything first
  showFirstQuestion();  // Reset and show the first question
}

// Go back to the patient information form
function goBack() {
  hideAllSections();  // Hide all questions and recommendations
  document.getElementById('patientInfoSection').style.display = 'block';  // Show patient info section
}

// Calculate the symptom score based on user input
function calculateScore() {
  let totalScore = 0;
  const answers = document.getElementById('symptomForm').querySelectorAll('select');
  
  answers.forEach(answer => {
    totalScore += parseInt(answer.value);
  });

  document.getElementById('score').innerText = totalScore;

  let category = '';
  if (totalScore <= 7) {
    category = 'أعراض خفيفة';
  } else if (totalScore <= 19) {
    category = 'أعراض متوسطة';
  } else {
    category = 'أعراض شديدة';
  }

  document.getElementById('symptomCategory').innerText = category;
  hideAllSections();  // Hide all sections
  document.getElementById('resultSection').style.display = 'block';  // Show the result section
}

// Move to the appropriate recommendation page based on score
function nextPage() {
  const totalScore = parseInt(document.getElementById('score').innerText);
  hideAllSections();  // Hide all previous recommendations

  if (totalScore <= 7) {
    document.getElementById('mildSymptoms').style.display = 'block';
  } else if (totalScore <= 19) {
    document.getElementById('moderateSymptoms').style.display = 'block';
  } else {
    document.getElementById('severeSymptoms').style.display = 'block';
  }
}

// Download result as an image
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

// Initialize the page on load
window.onload = function() {
  attachListeners();  // Attach event listeners for BMI and PSA ratio calculation
  hideAllSections();  // Ensure all questions and recommendations are hidden initially
  document.getElementById('patientInfoSection').style.display = 'block';  // Show patient info section by default
};


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
