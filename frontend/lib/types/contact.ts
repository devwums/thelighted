// frontend/src/lib/types/contact.ts
export enum ContactStatus {
  NEW = "new",
  READ = "read",
  REPLIED = "replied",
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}
