import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export interface LeadData {
  name?: string;
  email?: string;
  company?: string;
  budget?: string;
  projectType?: string;
  query: string;
  source?: 'form' | 'chatbot';
  chatHistory?: string;
}

const sendEmailNotification = async (lead: LeadData) => {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return;

  await emailjs.send(
    serviceId,
    templateId,
    {
      lead_name: lead.name || 'Not provided',
      lead_email: lead.email || 'Not provided',
      lead_company: lead.company || 'Not provided',
      lead_budget: lead.budget || 'Not specified',
      lead_project_type: lead.projectType || 'Not specified',
      lead_message: lead.query,
      lead_source: lead.source || 'website',
      to_email: 'hello@oceanalt.com.au',
    },
    publicKey
  );
};

export const saveLead = async (lead: LeadData) => {
  try {
    await addDoc(collection(db, 'leads'), {
      ...lead,
      timestamp: serverTimestamp(),
    });
    // Fire-and-forget — don't let email failure block the UX
    sendEmailNotification(lead).catch(() => {});
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
};
