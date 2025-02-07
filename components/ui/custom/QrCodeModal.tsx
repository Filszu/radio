"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../use-toast";

interface QrCodeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partyUrl: string;
}

export function QrCodeModal({ open, onOpenChange, partyUrl }: QrCodeModalProps) {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    try {
      const canvas = document.createElement("canvas");
      const svg = qrRef.current?.querySelector("svg");
      
      if (!svg) {
        throw new Error("QR Code not found");
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        // Fill white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "party-qr-code.png";
        downloadLink.href = pngFile;
        downloadLink.click();
        
        toast({
          title: "Downloaded!",
          description: "QR code saved successfully",
        });
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (err) {
      toast({
        title: "Download failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Party QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="relative group"
              >
                <div
                  ref={qrRef}
                  className="p-4 bg-white rounded-lg shadow-lg"
                >
                  <QRCodeSVG
                    value={partyUrl}
                    size={250}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={downloadQR}
              className="w-full sm:w-auto"
              variant="secondary"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}