import { describe, expect, it } from 'vitest';
import { checksum, checksumUrl, desktopVersion, downloadUrl, releaseUrl } from '../lib/site';

describe('desktop release metadata', () => {
  it('points every public download to the licensed Windows release', () => {
    expect(desktopVersion).toBe('1.1.0');
    expect(releaseUrl).toBe('https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v1.1.0');
    expect(downloadUrl).toBe('https://github.com/adamaghzad/TKDtech/releases/download/desktop-v1.1.0/TKD-Scoring-Windows-x64.zip');
    expect(checksumUrl).toBe(`${downloadUrl}.sha256`);
    expect(checksum).toMatch(/^[a-f0-9]{64}$/);
  });
});
