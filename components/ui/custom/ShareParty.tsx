"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { QRCodeSVG } from "qrcode.react";
import { Copy, Download, Link, PartyPopper, Share2 } from "lucide-react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "../use-toast";

export function ShareParty({ partyUrlShort = "radio-elektron" }) {
    const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const partyUrl = "https://partyvote.ciac.me/party/"+partyUrlShort;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(partyUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Party link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join my party!",
          url: partyUrl,
        });
      } else {
        await copyToClipboard();
      }
    } catch (err) {
      await copyToClipboard();
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden  bg-white/30 dark:bg-black/30 border-none shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <motion.div
          className="p-6 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <PartyPopper className="w-8 h-8 text-primary animate-bounce" />
            <h2 className="text-2xl font-bold text-center">Share Your Party!</h2>
          </motion.div>

          <motion.div
            className="flex justify-center relative group"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div 
              ref={qrRef}
              className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <QRCodeSVG
                value={partyUrl}
                size={200}
                level="H"
                includeMargin={true}
              />
              <motion.div
                className="absolute -bottom-4 left-1/2 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={downloadQR}
                  className="shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save QR
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={partyUrl}
                className="bg-white/50 dark:bg-black/50 transition-all duration-300 hover:bg-white/70 dark:hover:bg-black/70"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={copyToClipboard}
                  className="shrink-0 transition-colors duration-300"
                >
                  <motion.div
                    animate={copied ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {copied ? (
                      <Copy className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>

            <div className="flex gap-2">
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full transition-all duration-300"
                  onClick={() => window.open(partyUrl, "_blank")}
                >
                  <Link className="w-4 h-4 mr-2" />
                  Visit Party
                </Button>
              </motion.div>
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="secondary"
                  className="w-full transition-all duration-300"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
}