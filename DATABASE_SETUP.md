# FemmeFlex Database Setup

This project uses **SQLite** for local data storage with an **Express.js** backend API.

## Database Structure

### Tables

1. **enquiries** - Stores contact form submissions
   - `id` - Primary key
   - `client_name` - Client's full name
   - `phone` - Phone number
   - `email` - Email address (optional)
   - `selected_plan` - Chosen gym plan
   - `plan_price` - Plan price
   - `plan_duration` - Plan duration
   - `plan_location` - Branch location
   - `notes` - Additional notes
   - `status` - Enquiry status (new, contacted, converted, closed)
   - `created_at` / `updated_at` - Timestamps

2. **bmi_records** - Stores BMI calculations
   - `id` - Primary key
   - `client_name` - Client's name
   - `height_cm` - Height in centimeters
   - `weight_kg` - Weight in kilograms
   - `bmi_value` - Calculated BMI
   - `category` - BMI category (Underweight, Normal Weight, Overweight, Obese)
   - `notes` - Additional notes
   - `created_at` - Timestamp

## Setup Instructions

### 1. Install Server Dependencies

```bash
cd server
npm install
cd ..
```

### 2. Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:3001`

The database file `femmeflex.db` will be created automatically in the project root.

### 3. Start the Frontend (in a new terminal)

```bash
npm run dev
```

## API Endpoints

### Enquiries

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiries` | Create new enquiry |
| GET | `/api/enquiries` | Get all enquiries |
| GET | `/api/enquiries/:id` | Get enquiry by ID |
| GET | `/api/enquiries/search/:name` | Search by client name |
| PATCH | `/api/enquiries/:id/status` | Update enquiry status |
| DELETE | `/api/enquiries/:id` | Delete enquiry |

### BMI Records

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bmi` | Create new BMI record |
| GET | `/api/bmi` | Get all BMI records |
| GET | `/api/bmi/:id` | Get BMI record by ID |
| GET | `/api/bmi/search/:name` | Search by client name |
| GET | `/api/bmi/client/:name/latest` | Get latest record for client |
| DELETE | `/api/bmi/:id` | Delete BMI record |

## Usage in Components

The frontend API service is located at `src/services/api.ts`.

### Example: Saving an Enquiry

```typescript
import { createEnquiry } from '../services/api';

const handleSubmit = async () => {
  try {
    const result = await createEnquiry({
      client_name: formData.name,
      phone: formData.phone,
      email: formData.email,
      selected_plan: formData.plan,
      plan_price: selectedPlan?.price,
      plan_duration: selectedPlan?.duration,
      plan_location: selectedPlan?.location,
      notes: formData.notes,
    });
    console.log('Enquiry saved with ID:', result.id);
  } catch (error) {
    console.error('Failed to save enquiry:', error);
  }
};
```

### Example: Saving a BMI Record

```typescript
import { createBMIRecord } from '../services/api';

const saveBMIRecord = async (clientName: string) => {
  try {
    const result = await createBMIRecord({
      client_name: clientName,
      height_cm: parseFloat(height),
      weight_kg: parseFloat(weight),
      bmi_value: bmi,
      category: category,
    });
    console.log('BMI record saved with ID:', result.id);
  } catch (error) {
    console.error('Failed to save BMI record:', error);
  }
};
```

## Database File Location

The SQLite database file `femmeflex.db` is stored in the project root directory. You can open it with any SQLite viewer or command line tool.

```bash
# Using SQLite CLI
sqlite3 femmeflex.db

# View all enquiries
SELECT * FROM enquiries;

# View all BMI records
SELECT * FROM bmi_records;

# Exit
.quit
```
