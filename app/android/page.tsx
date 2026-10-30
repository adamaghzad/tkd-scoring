import type { Metadata } from 'next';
import { AndroidContent } from '@/components/android-content';

export const metadata: Metadata = {
  title: 'Android installation and validation download',
  description: 'Install the TKD Scoring Android host validation APK, verify its checksum, connect local judges and back up tournament data.',
};

export default function AndroidPage() { return <AndroidContent />; }
