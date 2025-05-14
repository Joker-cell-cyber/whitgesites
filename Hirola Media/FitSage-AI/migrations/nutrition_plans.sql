-- Création de la table nutrition_plans pour stocker les plans nutritionnels
CREATE TABLE IF NOT EXISTS "public"."nutrition_plans" (
  "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
  "user_id" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "goal" TEXT NOT NULL,
  "calories" INTEGER NOT NULL,
  "data" JSONB NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

-- Ajout des index pour accélérer les recherches
CREATE INDEX IF NOT EXISTS "nutrition_plans_user_id_idx" ON "public"."nutrition_plans" ("user_id");
CREATE INDEX IF NOT EXISTS "nutrition_plans_created_at_idx" ON "public"."nutrition_plans" ("created_at");

-- Ajout des politiques de sécurité RLS (Row Level Security)
ALTER TABLE "public"."nutrition_plans" ENABLE ROW LEVEL SECURITY;

-- Politique pour la lecture (SELECT)
CREATE POLICY "Users can read their own nutrition plans" 
ON "public"."nutrition_plans" 
FOR SELECT 
USING (auth.uid() = user_id);

-- Politique pour l'insertion (INSERT)
CREATE POLICY "Users can insert their own nutrition plans" 
ON "public"."nutrition_plans" 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Politique pour la mise à jour (UPDATE)
CREATE POLICY "Users can update their own nutrition plans" 
ON "public"."nutrition_plans" 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Politique pour la suppression (DELETE)
CREATE POLICY "Users can delete their own nutrition plans" 
ON "public"."nutrition_plans" 
FOR DELETE 
USING (auth.uid() = user_id);

-- Fonction trigger pour mettre à jour le champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour mettre à jour le champ updated_at automatiquement
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON "public"."nutrition_plans"
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column(); 