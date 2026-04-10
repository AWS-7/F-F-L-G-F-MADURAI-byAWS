import { getDatabase } from './database';

export function createBMIRecord(record) {
  const db = getDatabase();

  const stmt = db.prepare(`
    INSERT INTO bmi_records (
      client_name, height_cm, weight_kg, bmi_value, category, notes
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    record.client_name,
    record.height_cm,
    record.weight_kg,
    record.bmi_value,
    record.category,
    record.notes || null
  );

  return {
    ...record,
    id: Number(result.lastInsertRowid),
  };
}

export function getAllBMIRecords() {
  const db = getDatabase();
  return db.prepare('SELECT * FROM bmi_records ORDER BY created_at DESC').all();
}

export function getBMIRecordById(id) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM bmi_records WHERE id = ?').get(id);
}

export function getBMIRecordsByClientName(clientName) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM bmi_records WHERE client_name LIKE ? ORDER BY created_at DESC')
    .all(`%${clientName}%`);
}

export function getLatestBMIRecordByClientName(clientName) {
  const db = getDatabase();
  return db.prepare(`
    SELECT * FROM bmi_records 
    WHERE client_name = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `).get(clientName);
}

export function deleteBMIRecord(id) {
  const db = getDatabase();
  db.prepare('DELETE FROM bmi_records WHERE id = ?').run(id);
}
