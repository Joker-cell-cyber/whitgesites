"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";

interface BlogPreviewProps {
  title: string;
  content: string;
  onExport: (format: string) => void;
}

export default function BlogPreview({ title, content, onExport }: BlogPreviewProps) {
  const [selectedFormat, setSelectedFormat] = useState<string>("markdown");

  const handleExport = () => {
    onExport(selectedFormat);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Article généré avec succès</span>
          <span>•</span>
          <span>{new Date().toLocaleDateString("fr-FR")}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm sm:prose max-w-none">
          <div
            className="p-4 border rounded-md bg-muted/30 h-[500px] overflow-y-auto whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="markdown">Markdown</option>
            <option value="html">HTML</option>
            <option value="text">Texte brut</option>
          </select>
          <Button onClick={handleExport}>Exporter</Button>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Modifier
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            Sauvegarder
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 