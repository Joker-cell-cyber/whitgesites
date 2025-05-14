import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface KPIContext {
  industry: string;
  targetMarket: string;
  productType: string;
  priceRange: string;
  averageOrderValue: string;
  profitMargin: string;
}

interface KPIContextFormProps {
  onSubmit: (data: KPIContext) => void;
  onCancel: () => void;
}

export function KPIContextForm({ onSubmit, onCancel }: KPIContextFormProps) {
  const [formData, setFormData] = useState({
    industry: '',
    targetMarket: '',
    productType: '',
    priceRange: '',
    averageOrderValue: '',
    profitMargin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contexte de l'analyse</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Secteur d'activité</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => setFormData({ ...formData, industry: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="education">Éducation</SelectItem>
                <SelectItem value="healthcare">Santé</SelectItem>
                <SelectItem value="technology">Technologie</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetMarket">Marché cible</Label>
            <Input
              id="targetMarket"
              value={formData.targetMarket}
              onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
              placeholder="Ex: Professionnels 25-45 ans"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productType">Type de produit</Label>
            <Select
              value={formData.productType}
              onValueChange={(value) => setFormData({ ...formData, productType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type de produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Produit physique</SelectItem>
                <SelectItem value="digital">Produit digital</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="subscription">Abonnement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priceRange">Gamme de prix</Label>
            <Select
              value={formData.priceRange}
              onValueChange={(value) => setFormData({ ...formData, priceRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une gamme de prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="budget">Budget</SelectItem>
                <SelectItem value="mid">Milieu de gamme</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="luxury">Luxe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="averageOrderValue">Panier moyen (€)</Label>
            <Input
              id="averageOrderValue"
              type="number"
              value={formData.averageOrderValue}
              onChange={(e) => setFormData({ ...formData, averageOrderValue: e.target.value })}
              placeholder="Ex: 150"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profitMargin">Marge de profit (%)</Label>
            <Input
              id="profitMargin"
              type="number"
              value={formData.profitMargin}
              onChange={(e) => setFormData({ ...formData, profitMargin: e.target.value })}
              placeholder="Ex: 30"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">
              Valider
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 