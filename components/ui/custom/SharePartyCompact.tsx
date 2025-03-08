"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Link, PartyPopper, QrCode, Share2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { QrCodeModal } from "./QrCodeModal";
import { useToast } from "../use-toast";

export function SharePartyCompact({ partyUrlShort = "radio-elektron" }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

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
          title: `${partyUrl}, Join my party! `,
          text: "Let's vote for your favorite music!",
          
          url: partyUrl,
        });
      } else {
        await copyToClipboard();
      }
    } catch (err) {
      await copyToClipboard();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md mx-auto overflow-hidden backdrop-blur-lg bg-white/30 dark:bg-black/30 border-none shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
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
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="w-full transition-all duration-300"
                  onClick={() => setShowQrCode(true)}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  Show QR Code
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>

      <QrCodeModal
        open={showQrCode}
        onOpenChange={setShowQrCode}
        partyUrl={partyUrl}
      />
    </>
  );
}