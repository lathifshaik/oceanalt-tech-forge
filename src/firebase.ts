import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, type Firestore } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

let app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;

if (firebaseEnabled) {
  app = initializeApp(firebaseConfig);
  _db = getFirestore(app, process.env.FIREBASE_FIRESTORE_DATABASE_ID || '(default)');
  _auth = getAuth(app);
} else if (typeof window !== 'undefined') {
  console.warn('[Oceanalt] Firebase env vars not set — lead capture will email-only. Copy .env.example to .env and fill in FIREBASE_* values to enable Firestore writes.');
}

export const db = _db;
export const auth = _auth;

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
    if (_db) {
      await addDoc(collection(_db, 'leads'), {
        ...lead,
        timestamp: serverTimestamp(),
      });
    }
    sendEmailNotification(lead).catch(() => {});
  } catch (error) {
    console.error('Error saving lead:', error);
    throw error;
  }
};
