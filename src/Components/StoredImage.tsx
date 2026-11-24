import { useEffect, useState } from 'react';
import type { MediaRef } from '../types/serenia';
import { useFileUrl } from '../hooks/useFileUrl';

type Props = {
  media: MediaRef | null;
  alt: string;
  className?: string;
};

export default function StoredImage({ media, alt, className = '' }: Props): React.JSX.Element {
  const { url, loading, error } = useFileUrl(media);
  const [imageFailed, setImageFailed] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    setImageLoading(Boolean(url));
    setImageFailed(false);
  }, [url]);

  if (loading) {
    return <div aria-label={`Loading ${alt}`} className={`animate-pulse bg-[#eeede7] ${className}`} />;
  }

  if (!url || error || imageFailed) {
    return (
      <div role="img" aria-label={`${alt} unavailable`} className={`flex items-center justify-center bg-[#eeede7] text-[10px] text-[#85847b] ${className}`}>
        Image unavailable
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {imageLoading && <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-[#eeede7]" />}
      <img
        src={url}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => {
          setImageFailed(true);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
      />
    </div>
  );
}
