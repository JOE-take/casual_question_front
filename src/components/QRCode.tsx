import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeProps {
  url: string;
}

const QRCodeComponent: React.FC<QRCodeProps> = ({ url }) =>  {

  return (
    <div>
      <QRCode value={url} size={200} level="H" />
    </div>
  );
}

export default QRCodeComponent;