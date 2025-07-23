const API_BASE_URL = 'http://localhost:3001';

export interface CreateSectionRequest {
  idea: string;
}

export interface SectionResponse {
  id: string;
  idea: string;
  sections: string[];
  createdAt: string;
}

export const sectionsApi = {
  async create(data: CreateSectionRequest): Promise<SectionResponse> {
    const response = await fetch(`${API_BASE_URL}/sections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  async getById(id: string): Promise<SectionResponse> {
    const response = await fetch(`${API_BASE_URL}/sections/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};


/**
 * Dear Mr. Mohamed,

I apologize for the late submission. I encountered several internet connectivity issues and technical challenges while working on the project, but I was able to resolve them and complete the task.

**Project Details:**
- **Backend (NestJS)**: Runs on port 3001
- **Frontend (Next.js)**: Runs on port 3000
- **Database**: MongoDB (localhost:27017)

**To run the project:**

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

2. **Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

**Features implemented:**
- API endpoint to create website sections based on user ideas
- Frontend form to submit ideas
- Preview page to display generated sections
- MongoDB integration for data persistence
- Proper error handling and validation

The application allows users to input a website idea and generates relevant sections for that type of website.

Thank you for your understanding regarding the delay.

Best regards,
Mohamed Ali
 */