const API_URL = 'http://localhost:7070/';

export async function getAllTickets() {
  const res = await fetch(`${API_URL}?method=allTickets`);
  return res.json();
}

export async function getTicketById(id) {
  const res = await fetch(`${API_URL}?method=ticketById&id=${id}`);
  return res.json();
}

export async function createTicket({ name, description, status }) {
  const res = await fetch(`${API_URL}?method=createTicket`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, status }),
  });
  return res.json();
}

export async function updateTicket(id, { name, description, status }) {
  const res = await fetch(`${API_URL}?method=updateById&id=${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, status }),
  });
  return res.json();
}

export async function deleteTicket(id) {
  return fetch(`${API_URL}?method=deleteById&id=${id}`);
} 