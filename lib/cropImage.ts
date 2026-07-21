import type { Area } from "react-easy-crop";

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.addEventListener("load", () => resolve(img));
        img.addEventListener("error", reject);
        img.crossOrigin = "anonymous";
        img.src = src;
    });
}

export async function getCroppedImageBlob(
    imageSrc: string,
    cropPixels: Area,
    outputWidth: number,
    outputHeight: number,
    fileType = "image/jpeg"
): Promise<Blob> {
    const image = await loadImage(imageSrc);

    const canvas = document.createElement("canvas");
    canvas.width = outputWidth;
    canvas.height = outputHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context.");

    ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        outputWidth,
        outputHeight
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("Canvas is empty."))),
            fileType,
            0.9
        );
    });
}
