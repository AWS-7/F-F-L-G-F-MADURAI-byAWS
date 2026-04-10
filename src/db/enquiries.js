import { getDatabase } from './database';

export function createEnquiry(enquiry) {
  const db = getDatabase();

  const stmt = db.prepare(`
    INSERT INTO enquiries (
      client_name, phone, email, selected_plan, plan_price,
      plan_duration, plan_location, notes, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    enquiry.client_name,
    enquiry.phone,
    enquiry.email || null,
    enquiry.selected_plan,
    enquiry.plan_price || null,
    enquiry.plan_duration || null,
    enquiry.plan_location || null,
    enquiry.notes || null,
    enquiry.status || 'new'
  );

  return {
    ...enquiry,
    id: Number(result.lastInsertRowid),
  };
}

export function getAllEnquiries() {
  const db = getDatabase();
  return db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();
}

export function getEnquiryById(id) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
}

export function getEnquiriesByClientName(clientName) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM enquiries WHERE client_name LIKE ? ORDER BY created_at DESC')
    .all(`%${clientName}%`);
}

export function updateEnquiryStatus(id, status) {
  const db = getDatabase();
  db.prepare(`
    UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(status, id);
}

export function deleteEnquiry(id) {
  const db = getDatabase();
  db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);
}
