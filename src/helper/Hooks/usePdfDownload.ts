import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface UsePdfDownloadResult {
  generatePDF: (content: HTMLElement) => void;
  pdfData: Blob | null;
  resetPdfData: () => void;
}

const usePdfDownload = (): UsePdfDownloadResult => {
  const [pdfData, setPdfData] = useState<Blob | null>(null);

  const generatePDF = async (content: HTMLElement) => {
    const pdf = new jsPDF("p", "mm", "a4");

    const canvas = await html2canvas(content, {
      useCORS: true,
      allowTaint: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
    });

    const imageData = canvas.toDataURL("image/png");
    const imageWidth = pdf.internal.pageSize.getWidth() - 20;
    const imageHeight = (canvas.height * imageWidth) / canvas.width;

    let remainingHeight = imageHeight;

    while (remainingHeight > 0) {
      pdf.addImage(imageData, "PNG", 10, 10, imageWidth, imageHeight);
      remainingHeight -= imageHeight;

      if (remainingHeight > 0) {
        pdf.addPage();
      }
    }

    setPdfData(pdf.output("blob"));
  };

  const resetPdfData = () => {
    setPdfData(null);
  };

  return { generatePDF, pdfData, resetPdfData };
};

export default usePdfDownload;
