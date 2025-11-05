import { supabase } from './supabase-config';
import toast from 'react-hot-toast';

/* ---------- USERS ---------- */
export async function getUserProfile(id) {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) toast.error(error.message);
  return data;
}

export async function updateVerification(id, status) {
  const { error } = await supabase.from('users').update({ verification_status: status }).eq('id', id);
  if (error) toast.error(error.message);
  else toast.success(`User marked as ${status}`);
}

/* ---------- APPLICATIONS ---------- */
export async function fetchApplications() {
  const { data, error } = await supabase.from('applications').select('*').order('created_at', { ascending: false });
  if (error) toast.error('Could not load applications');
  return data;
}

export async function approveApplication(id) {
  const { error } = await supabase.from('applications').update({ status: 'approved' }).eq('id', id);
  if (error) toast.error(error.message);
  else toast.success('Application approved');
}

export async function rejectApplication(id) {
  const { error } = await supabase.from('applications').update({ status: 'rejected' }).eq('id', id);
  if (error) toast.error(error.message);
  else toast.success('Application rejected');
}

/* ---------- FILE STORAGE ---------- */
export async function uploadAttachment(file) {
  const filename = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from('attachments').upload(filename, file);
  if (error) toast.error(error.message);
  else toast.success('File uploaded');
  return filename;
}
