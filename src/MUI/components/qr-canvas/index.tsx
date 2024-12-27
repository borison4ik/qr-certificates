import { FC, useEffect, useRef, useState } from 'react';

import styles from './index.module.scss';
import { Button } from '@/ui/buttons/Button';

interface IQrCanvasProps {
  imgUrl: string;
}
const QrCanvas: FC<IQrCanvasProps> = ({ imgUrl, ...props }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imgUrl;
    if (ctx == null || img == null) return;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 250, 250);
    };
  }, [imgUrl]);

  return (
    <div>
      <canvas ref={ref} {...props} className={styles.qr__canvas} width={250} height={250} />
      <Button type='button'>Скачать</Button>
    </div>
  );
};

export { QrCanvas };
