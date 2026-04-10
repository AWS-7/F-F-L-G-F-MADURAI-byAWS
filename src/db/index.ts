// Database exports
export { getDatabase, closeDatabase } from './database';
export type { Enquiry, BMIRecord } from './database';
export {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  getEnquiriesByClientName,
  updateEnquiryStatus,
  deleteEnquiry,
} from './enquiries';

export {
  createBMIRecord,
  getAllBMIRecords,
  getBMIRecordById,
  getBMIRecordsByClientName,
  getLatestBMIRecordByClientName,
  deleteBMIRecord,
} from './bmiRecords';
