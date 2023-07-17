"use client";
import { Image } from "antd";
import { useState } from "react";

const ImagePreview = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        <div className="w-40 h-40 overflow-hidden rounded">
          <Image
            alt="image preview"
            preview={{
              visible: false,
            }}
            className="object-cover w-full h-full"
            src="https://i.ibb.co/GtyHgvB/louis-vuitton-monogram-cotton-overshirt-HPB45-W026906-PM2-Front-view.webp"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="w-40 h-40 overflow-hidden rounded">
          <Image
            alt="image preview"
            preview={{
              visible: false,
            }}
            className="object-cover w-full h-full"
            src="https://i.ibb.co/j9KxwVm/louis-vuitton-3d-monogram-asymmetrical-pleat-midi-skirt-FPSX35-ADD001-PM2-Front-view.webp"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="w-40 h-40 overflow-hidden rounded">
          <Image
            alt="image preview"
            preview={{
              visible: false,
            }}
            className="object-cover w-full h-full"
            src="https://i.ibb.co/g67zrQd/louis-vuitton-key-pouch-M62650-PM2-Front-view.webp"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        >
          <Image src="https://i.ibb.co/GtyHgvB/louis-vuitton-monogram-cotton-overshirt-HPB45-W026906-PM2-Front-view.webp" />
          <Image src="https://i.ibb.co/j9KxwVm/louis-vuitton-3d-monogram-asymmetrical-pleat-midi-skirt-FPSX35-ADD001-PM2-Front-view.webp" />
          <Image src="https://i.ibb.co/g67zrQd/louis-vuitton-key-pouch-M62650-PM2-Front-view.webp" />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default ImagePreview;
