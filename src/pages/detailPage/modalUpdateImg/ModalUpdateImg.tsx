import { Button, Modal } from "react-bootstrap";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";

import { canvasPreview } from "@/src/utils/preview/canvasPreview";
import { imgPreview } from "@/src/utils/preview/imgPreview";
import { useDebounceEffect } from "@/src/hooks/hooks";
import UserService from "@/src/services/user/userSevices";
import Swal from "sweetalert2";
import { dataURLtoBlob } from "@/src/utils/dataURLtoBlob";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const UserSevices = new UserService();

export default function ModalUpdateImg(props: any) {
  const { show, handleClose, getUser } = props;

  const [imgSrc, setImgSrc] = useState<string>("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(9 / 9);
  const [isUpload, setIsUpload] = useState<boolean>(false);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(9 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 9 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  }

  async function handleSubmit() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const dataUrl = previewCanvasRef.current.toDataURL();
    const blob: Blob = dataURLtoBlob(dataUrl);
    const formData = new FormData();
    formData.append("file", blob, "avatar.png");

    setIsUpload(true);
    const upload: any = await UserSevices.uploadAvatar(formData);
    if (upload.code < 400) {
      getUser();
      handleClose();
    }
    setIsUpload(false);
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Avatar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
        {!!imgSrc ? (
          <div>
            <button
              className="btn btn-primary mt-2"
              onClick={handleToggleAspectClick}
            >
              Toggle aspect {aspect ? "off" : "on"}
            </button>
          </div>
        ) : (
          ""
        )}
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            circularCrop
            keepSelection
            aspect={aspect}
            minHeight={100}
            className="mt-2"
          >
            <img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
          </ReactCrop>
        )}
        {!!completedCrop && (
          <>
            <div>
              <canvas
                className="rounded-circle"
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop.width,
                  height: completedCrop.height,
                }}
              />
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
