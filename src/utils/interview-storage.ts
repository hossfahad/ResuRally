// Define types for our interview history data
export type JobInterview = {
  id: string;
  title: string;
  job_description: string;
  created_at: string;
  questions: string;
  score?: number;
};

// Save an interview to localStorage
export const saveInterview = (interview: Omit<JobInterview, 'id' | 'created_at'>) => {
  try {
    // Generate a unique ID and timestamp
    const newInterview: JobInterview = {
      ...interview,
      id: generateId(),
      created_at: new Date().toISOString(),
    };
    
    // Get existing interviews from localStorage or initialize empty array
    const existingInterviews = getInterviews();
    
    // Add new interview to the array
    const updatedInterviews = [...existingInterviews, newInterview];
    
    // Save updated array back to localStorage
    localStorage.setItem('interview-history', JSON.stringify(updatedInterviews));
    
    return newInterview;
  } catch (error) {
    console.error('Error saving interview to localStorage:', error);
    return null;
  }
};

// Get all interviews from localStorage
export const getInterviews = (): JobInterview[] => {
  try {
    const savedInterviews = localStorage.getItem('interview-history');
    return savedInterviews ? JSON.parse(savedInterviews) : [];
  } catch (error) {
    console.error('Error loading interviews from localStorage:', error);
    return [];
  }
};

// Update an existing interview
export const updateInterview = (interviewId: string, updates: Partial<JobInterview>) => {
  try {
    const interviews = getInterviews();
    const updatedInterviews = interviews.map(interview => 
      interview.id === interviewId ? { ...interview, ...updates } : interview
    );
    
    localStorage.setItem('interview-history', JSON.stringify(updatedInterviews));
    return true;
  } catch (error) {
    console.error('Error updating interview in localStorage:', error);
    return false;
  }
};

// Delete an interview
export const deleteInterview = (interviewId: string) => {
  try {
    const interviews = getInterviews();
    const updatedInterviews = interviews.filter(interview => interview.id !== interviewId);
    
    localStorage.setItem('interview-history', JSON.stringify(updatedInterviews));
    return true;
  } catch (error) {
    console.error('Error deleting interview from localStorage:', error);
    return false;
  }
};

// Generate a random ID
const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}; 