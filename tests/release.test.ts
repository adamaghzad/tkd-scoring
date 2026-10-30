import { describe, expect, it } from 'vitest';
import { androidChecksum, androidChecksumUrl, androidDownloadUrl, androidReleaseUrl, androidVersion, checksum, checksumUrl, desktopVersion, downloadUrl, releaseUrl } from '../lib/site';

describe('desktop release metadata', () => {
  it('points every public download to the licensed Windows release', () => {
    expect(desktopVersion).toBe('1.2.1');
    expect(releaseUrl).toBe('https://github.com/adamaghzad/TKDtech/releases/tag/desktop-v1.2.1');
    expect(downloadUrl).toBe('https://github.com/adamaghzad/TKDtech/releases/download/desktop-v1.2.1/TKD-Scoring-Windows-x64.zip');
    expect(checksumUrl).toBe(`${downloadUrl}.sha256`);
    expect(checksum).toMatch(/^[a-f0-9]{64}$/);
  });

  it('keeps the Android validation APK separate from the stable Windows release', () => {
    expect(androidVersion).toBe('0.1.0-validation');
    expect(androidReleaseUrl).toBe('https://github.com/adamaghzad/TKDtech/releases/tag/android-v0.1.0-validation');
    expect(androidDownloadUrl).toBe('https://github.com/adamaghzad/TKDtech/releases/download/android-v0.1.0-validation/TKD-Scoring-Android-arm64-validation-debug.apk');
    expect(androidChecksumUrl).toBe(`${androidDownloadUrl}.sha256`);
    expect(androidChecksum).toMatch(/^[a-f0-9]{64}$/);
    expect(androidDownloadUrl).not.toBe(downloadUrl);
  });
});
