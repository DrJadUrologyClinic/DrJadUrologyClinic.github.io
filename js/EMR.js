document.addEventListener('DOMContentLoaded', loadPatients);

let attachments = [];

function addAttachment() {
  const attachmentInput = document.getElementById('attachmentInput');
  const attachmentList = document.getElementById('attachmentList');
  
  for (let file of attachmentInput.files) {
    attachments.push(file);
    const listItem = document.createElement('li');
    listItem.classList.add('attachment-item');
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.target = "_blank";
    link.innerText = file.name;
    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.onclick = () => removeAttachment(file.name);
    
    listItem.appendChild(link);
    listItem.appendChild(removeButton);
    attachmentList.appendChild(listItem);
  }
  
  attachmentInput.value = ''; // Clear the input after adding
}

function removeAttachment(fileName) {
  attachments = attachments.filter(file => file.name !== fileName);
  const attachmentList = document.getElementById('attachmentList');
  const items = Array.from(attachmentList.getElementsByTagName('li'));
  for (let item of items) {
    if (item.firstChild.innerText === fileName) {
      attachmentList.removeChild(item);
      break;
    }
  }
}

function addPatient() {
  const name = document.getElementById('name').value;
  if (!name) {
    alert('Name is required.');
    return;
  }

  const age = document.getElementById('age').value;
  const medicalHistory = document.getElementById('medicalHistory').value;
  const prescriptions = document.getElementById('prescriptions').value;
  const dateOfFirstVisit = document.getElementById('dateOfFirstVisit').value;
  const notes = document.getElementById('notes').value;
  const physicalExamination = document.getElementById('physicalExamination').value;
  const inClinicUS = document.getElementById('inClinicUS').value;

  let patients = JSON.parse(localStorage.getItem('patients')) || [];

  const patient = {
    id: patients.length > 0 ? patients[patients.length - 1].id + 1 : 1,
    name,
    age,
    dateOfFirstVisit,
    notes,
    medicalHistory,
    prescriptions,
    physicalExamination,
    inClinicUS,
    attachments: attachments.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }))
  };

  patients.push(patient);
  localStorage.setItem('patients', JSON.stringify(patients));

  loadPatients();
  document.getElementById('patientForm').reset();
  attachments = [];
  document.getElementById('attachmentList').innerHTML = '';
}

function loadPatients() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  displayPatients(patients);
}

function displayPatients(patients) {
  const patientTableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
  patientTableBody.innerHTML = '';

  patients.forEach(patient => {
    const row = patientTableBody.insertRow();

    const idCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const ageCell = row.insertCell(2);
    const dateOfFirstVisitCell = row.insertCell(3);
    const notesCell = row.insertCell(4);
    const medicalHistoryCell = row.insertCell(5);
    const prescriptionsCell = row.insertCell(6);
    const physicalExaminationCell = row.insertCell(7);
    const inClinicUSCell = row.insertCell(8);
    const attachmentsCell = row.insertCell(9);
    const actionsCell = row.insertCell(10);

    idCell.innerText = patient.id;
    nameCell.innerText = patient.name;
    ageCell.innerText = patient.age || '';
    dateOfFirstVisitCell.innerText = patient.dateOfFirstVisit || '';
    notesCell.innerText = patient.notes || '';
    medicalHistoryCell.innerText = patient.medicalHistory || '';
    prescriptionsCell.innerText = patient.prescriptions || '';
    physicalExaminationCell.innerText = patient.physicalExamination || '';
    inClinicUSCell.innerText = patient.inClinicUS || '';
    attachmentsCell.innerHTML = patient.attachments.map(file => `<div><a href="${file.url}" target="_blank">${file.name}</a></div>`).join('');

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.onclick = () => fillEditForm(patient.id);
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => deletePatient(patient.id);
    actionsCell.appendChild(deleteButton);
  });
}

function fillEditForm(patientId) {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const patient = patients.find(p => p.id === patientId);

  document.getElementById('name').value = patient.name;
  document.getElementById('age').value = patient.age || '';
  document.getElementById('medicalHistory').value = patient.medicalHistory || '';
  document.getElementById('prescriptions').value = patient.prescriptions || '';
  document.getElementById('dateOfFirstVisit').value = patient.dateOfFirstVisit || '';
  document.getElementById('notes').value = patient.notes || '';
  document.getElementById('physicalExamination').value = patient.physicalExamination || '';
  document.getElementById('inClinicUS').value = patient.inClinicUS || '';

  attachments = patient.attachments.map(file => {
    return { name: file.name, file: null, url: file.url };
  });
  const attachmentList = document.getElementById('attachmentList');
  attachmentList.innerHTML = '';
  for (let file of attachments) {
    const listItem = document.createElement('li');
    listItem.classList.add('attachment-item');

    const link = document.createElement('a');
    link.href = file.url;
    link.target = "_blank";
    link.innerText = file.name;

    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.onclick = () => removeAttachment(file.name);

    listItem.appendChild(link);
    listItem.appendChild(removeButton);
    attachmentList.appendChild(listItem);
  }

  document.getElementById('patientForm').dataset.editingId = patientId;

  document.getElementById('addPatientButton').disabled = true;
  document.getElementById('saveChangesButton').disabled = false;
}

function saveEditedPatient() {
  const patientId = parseInt(document.getElementById('patientForm').dataset.editingId, 10);
  const name = document.getElementById('name').value;
  if (!name) {
    alert('Name is required.');
    return;
  }
  const age = document.getElementById('age').value;
  const medicalHistory = document.getElementById('medicalHistory').value;
  const prescriptions = document.getElementById('prescriptions').value;
  const dateOfFirstVisit = document.getElementById('dateOfFirstVisit').value;
  const notes = document.getElementById('notes').value;
  const physicalExamination = document.getElementById('physicalExamination').value;
  const inClinicUS = document.getElementById('inClinicUS').value;

  let patients = JSON.parse(localStorage.getItem('patients')) || [];
  const patientIndex = patients.findIndex(p => p.id === patientId);

  if (patientIndex !== -1) {
    patients[patientIndex] = {
      id: patientId,
      name,
      age,
      dateOfFirstVisit,
      notes,
      medicalHistory,
      prescriptions,
      physicalExamination,
      inClinicUS,
      attachments: attachments.map(file => ({
        name: file.name,
        url: file.url || URL.createObjectURL(file)
      }))
    };
    localStorage.setItem('patients', JSON.stringify(patients));
    loadPatients();
    document.getElementById('patientForm').reset();
    attachments = [];
    document.getElementById('attachmentList').innerHTML = '';
    delete document.getElementById('patientForm').dataset.editingId;

    document.getElementById('addPatientButton').disabled = false;
    document.getElementById('saveChangesButton').disabled = true;
  }
}

function deletePatient(patientId) {
  let patients = JSON.parse(localStorage.getItem('patients')) || [];
  patients = patients.filter(patient => patient.id !== patientId);

  localStorage.setItem('patients', JSON.stringify(patients));
  loadPatients();
}

function searchPatients() {
  const nameQuery = document.getElementById('searchNameInput').value.toLowerCase();
  const idQuery = document.getElementById('searchIDInput').value;
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  
  let filteredPatients = patients;

  if (nameQuery) {
    filteredPatients = filteredPatients.filter(patient => patient.name.toLowerCase().includes(nameQuery));
  }

  if (idQuery) {
    filteredPatients = filteredPatients.filter(patient => patient.id.toString().includes(idQuery));
  }

  displayPatients(filteredPatients);
}
