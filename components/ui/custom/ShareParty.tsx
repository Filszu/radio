"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from '@/components/ui/use-toast';
import { QRCodeSVG } from "qrcode.react";
import { Copy, Link, PartyPopper, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareParty({ partyUrl = "https://example.com/party/123" }) {
    const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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
      // If share fails (e.g., user cancels), fall back to copying
      await copyToClipboard();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden backdrop-blur-lg bg-white/30 dark:bg-black/30 border-none shadow-xl">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <PartyPopper className="w-8 h-8 text-primary animate-bounce" />
          <h2 className="text-2xl font-bold text-center">Share Your Party!</h2>
        </div>

        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG
              value={partyUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={partyUrl}
              className="bg-white/50 dark:bg-black/50"
            />
            <Button
              size="icon"
              variant="secondary"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              {copied ? (
                <Copy className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => window.open(partyUrl, "_blank")}
            >
              <Link className="w-4 h-4 mr-2" />
              Visit Party
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}