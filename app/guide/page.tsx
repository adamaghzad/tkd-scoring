import type { Metadata } from 'next';
import { GuideContent } from '@/components/guide-content';
export const metadata: Metadata = { title: 'Complete setup and operations guide', description: 'Install TKD Scoring, build a tournament, pair judge phones, score matches, back up data and troubleshoot the local network.' };
export default function GuidePage() { return <GuideContent />; }
