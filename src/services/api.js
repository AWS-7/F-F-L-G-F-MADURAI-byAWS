// API service for FemmeFlex database operations
const API_BASE = 'http://localhost:3001/api';

// ===== ENQUIRY API FUNCTIONS =====

export async function createEnquiry(data) {
  const response = await fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create enquiry');
  }

  return response.json();
}

export async function getAllEnquiries() {
  const response = await fetch(`${API_BASE}/enquiries`);
  if (!response.ok) {
    throw new Error('Failed to fetch enquiries');
  }
  return response.json();
}

export async function getEnquiryById(id) {
  const response = await fetch(`${API_BASE}/enquiries/${id}`);
  if (!response.ok) {
    throw new Error('Enquiry not found');
  }
  return response.json();
}

export async function searchEnquiriesByName(name) {
  const response = await fetch(`${API_BASE}/enquiries/search/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error('Failed to search enquiries');
  }
  return response.json();
}

export async function updateEnquiryStatus(id, status) {
  const response = await fetch(`${API_BASE}/enquiries/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update status');
  }
}

export async function deleteEnquiry(id) {
  const response = await fetch(`${API_BASE}/enquiries/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete enquiry');
  }
}

// ===== BMI RECORD API FUNCTIONS =====

export async function createBMIRecord(data) {
  const response = await fetch(`${API_BASE}/bmi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create BMI record');
  }

  return response.json();
}

export async function getAllBMIRecords() {
  const response = await fetch(`${API_BASE}/bmi`);
  if (!response.ok) {
    throw new Error('Failed to fetch BMI records');
  }
  return response.json();
}

export async function getBMIRecordById(id) {
  const response = await fetch(`${API_BASE}/bmi/${id}`);
  if (!response.ok) {
    throw new Error('BMI record not found');
  }
  return response.json();
}

export async function searchBMIRecordsByName(name) {
  const response = await fetch(`${API_BASE}/bmi/search/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error('Failed to search BMI records');
  }
  return response.json();
}

export async function getLatestBMIRecordByClientName(name) {
  const response = await fetch(`${API_BASE}/bmi/client/${encodeURIComponent(name)}/latest`);
  if (!response.ok) {
    throw new Error('No BMI records found for this client');
  }
  return response.json();
}

export async function deleteBMIRecord(id) {
  const response = await fetch(`${API_BASE}/bmi/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete BMI record');
  }
}

// Health check
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) {
    throw new Error('Server is not responding');
  }
  return response.json();
}
