import { useEffect, useState } from 'react';
import type { MediaRef } from '../types/serenia';
import { getFileUrl } from '../services/fileService';

type FileUrlState = {
  url: string | null;
  loading: boolean;
  error: Error | null;
};

export function useFileUrl(media: MediaRef | null): FileUrlState {
  const [state, setState] = useState<FileUrlState>({
    url: null,
    loading: media !== null,
    error: null,
  });

  const kind = media?.kind ?? null;
  const remoteUrl = media?.kind === 'url' ? media.url : null;
  const fileId = media?.kind === 'file' ? media.fileId : null;
  const name = media?.kind === 'file' ? media.name : null;
  const size = media?.kind === 'file' ? media.size : null;
  const mimeType = media?.kind === 'file' ? media.mimeType : null;

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;
    setState({ url: remoteUrl, loading: Boolean(kind && kind === 'file'), error: null });
    if (!kind || remoteUrl) return () => { active = false; };

    const fileRef: MediaRef = {
      kind: 'file',
      fileId: fileId ?? '',
      name: name ?? '',
      size: size ?? 0,
      mimeType: mimeType ?? '',
    };
    getFileUrl(fileRef)
      .then((url) => {
        if (!active) {
          if (url.startsWith('blob:')) URL.revokeObjectURL(url);
          return;
        }
        objectUrl = url.startsWith('blob:') ? url : null;
        setState({ url, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            url: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unable to load this image.'),
          });
        }
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileId, kind, mimeType, name, remoteUrl, size]);

  return state;
}
