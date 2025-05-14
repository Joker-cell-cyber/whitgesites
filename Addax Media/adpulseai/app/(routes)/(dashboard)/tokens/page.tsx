"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/app/hooks/useUserSubscription";
import { Coins, MessagesSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Prix fixe par token
const TOKEN_PRICE = 0.35;

// Options de tokens disponibles avec leurs prix calculés à partir du prix unitaire
const tokenOptions = [
  { tokens: 10, price: 10 * TOKEN_PRICE },
  { tokens: 20, price: 20 * TOKEN_PRICE },
  { tokens: 30, price: 30 * TOKEN_PRICE },
  { tokens: 40, price: 40 * TOKEN_PRICE },
  { tokens: 50, price: 50 * TOKEN_PRICE },
  { tokens: 100, price: 100 * TOKEN_PRICE },
  { tokens: 200, price: 200 * TOKEN_PRICE },
  { tokens: 300, price: 300 * TOKEN_PRICE },
  { tokens: 500, price: 500 * TOKEN_PRICE }
];

// Map des tokens à leurs IDs de produit pour le plan pro (IDs depuis le fichier CSV)
const tokenToProductId: Record<number, number> = {
  10: 37467,  // Pro tier token pack IDs from new_temp_cleaned_offres_adpulsai_28.csv
  20: 37468,
  30: 37469,
  40: 37470,
  50: 37471,
  100: 37476,
  200: 37486,
  300: 37496,
  500: 37516
};

const TokensPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { tokens, isLoading } = useUserSubscription();
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [contactReason, setContactReason] = useState<string>("plan");
  const [message, setMessage] = useState<string>("");
  const [selectedTokens, setSelectedTokens] = useState<number>(500);

  // Calcul du prix unitaire
  const getTokenOption = () => tokenOptions.find(opt => opt.tokens === selectedTokens) || tokenOptions[tokenOptions.length - 1];
  const getUnitPrice = () => {
    return TOKEN_PRICE.toString();
  };

  const handlePurchase = async () => {
    setIsSubmitting(true);
    
    // Redirection vers la page de pré-checkout avec les paramètres du token sélectionné
    // Utiliser le plan "pro" au lieu de "pay-as-you-go"
    const tokenProductId = tokenToProductId[selectedTokens] || tokenToProductId[500];
    const price = (selectedTokens * TOKEN_PRICE).toFixed(2);
    
    // Rediriger vers /pre-checkout avec les bons paramètres
    router.push(`/pre-checkout?plan=pro&period=one-time&tokens=${selectedTokens}&price=${price}&tokenPrice=${TOKEN_PRICE}&productId=${tokenProductId}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage("");
      toast({
        title: "Message envoyé",
        description: "Notre équipe vous répondra dans les plus brefs délais.",
      });
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 max-w-3xl">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-center">Achat de tokens supplémentaires</h1>
        <p className="text-center text-muted-foreground">Paiement unique sans abonnement récurrent</p>
      </div>

      <Card className="border shadow-sm bg-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Nombre de tokens souhaités :</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <Label htmlFor="token-select">Sélectionnez le nombre de tokens :</Label>
            <Select
              value={selectedTokens.toString()}
              onValueChange={(value) => setSelectedTokens(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="500 tokens" />
              </SelectTrigger>
              <SelectContent>
                {tokenOptions.map((option) => (
                  <SelectItem key={option.tokens} value={option.tokens.toString()}>
                    {option.tokens} tokens - {option.price.toFixed(2)}€
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="bg-accent/30 rounded-lg p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">{selectedTokens} tokens</h3>
                <p className="text-sm text-muted-foreground">Paiement unique</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{(selectedTokens * TOKEN_PRICE).toFixed(2)}€</p>
                <p className="text-sm text-muted-foreground">pour {selectedTokens} tokens</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm">
                <Coins className="h-4 w-4 text-primary" />
                <span>{selectedTokens} tokens disponibles immédiatement</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>{TOKEN_PRICE.toFixed(2)}€ par token</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span>Validité 1 an</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>✓ Pas d'abonnement récurrent</span>
              </div>
            </div>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handlePurchase}
            disabled={isSubmitting}
          >
            Acheter des tokens (paiement unique)
          </Button>
        </CardContent>
      </Card>

      <Card className="border shadow-sm bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessagesSquare className="h-5 w-5" />
            Contacter le support
          </CardTitle>
          <CardDescription>
            Pour changer de plan d'abonnement ou modifier votre période de facturation, veuillez contacter notre équipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Raison du contact :</Label>
              <RadioGroup 
                defaultValue="plan" 
                value={contactReason}
                onValueChange={setContactReason}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="plan" id="plan" />
                  <Label htmlFor="plan">Changer de plan d'abonnement</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Votre message :</Label>
              <Textarea
                id="message"
                placeholder="Décrivez votre demande en détail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              Envoyer ma demande
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokensPage;