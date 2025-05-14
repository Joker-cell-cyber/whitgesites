'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/app/components/ui/table";
import { Button } from "@/app/components/ui/button";
import { Campaign } from '@/app/lib/types/data-types';
import { formatCurrency, formatPercent, formatNumber } from '@/app/lib/format-utils';

interface DataTableProps {
  data: Campaign[];
  currency?: string;
}

export default function DataTable({ data, currency = "EUR" }: DataTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Campaign>('spend');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Fonction de tri
  const handleSort = (column: keyof Campaign) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };
  
  // Tri des données
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    // Gestion des valeurs undefined
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
  
  // Formatter les colonnes
  const formatColumn = (campaign: Campaign, column: keyof Campaign) => {
    const value = campaign[column];
    
    if (typeof value === 'number') {
      if (column === 'spend' || column === 'cpc' || column === 'cpm' || column === 'costPerConversion') {
        return formatCurrency(value, currency);
      } else if (column === 'ctr' || column === 'conversionRate') {
        return formatPercent(value);
      } else {
        return formatNumber(value);
      }
    }
    
    return value?.toString() || '';
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campagne</TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('spend')}
            >
              Dépense {sortColumn === 'spend' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('impressions')}
            >
              Impressions {sortColumn === 'impressions' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('clicks')}
            >
              Clics {sortColumn === 'clicks' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('ctr')}
            >
              CTR {sortColumn === 'ctr' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('cpc')}
            >
              CPC {sortColumn === 'cpc' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('conversions')}
            >
              Conv. {sortColumn === 'conversions' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((campaign) => (
            <TableRow key={campaign.id}>
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell>{formatColumn(campaign, 'spend')}</TableCell>
              <TableCell>{formatColumn(campaign, 'impressions')}</TableCell>
              <TableCell>{formatColumn(campaign, 'clicks')}</TableCell>
              <TableCell>{formatColumn(campaign, 'ctr')}</TableCell>
              <TableCell>{formatColumn(campaign, 'cpc')}</TableCell>
              <TableCell>{formatColumn(campaign, 'conversions')}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  Détails
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 