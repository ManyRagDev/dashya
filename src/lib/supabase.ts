import { createClient } from '@supabase/supabase-js';

// Essas variáveis vêm do arquivo .env que a gente configurou
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Aqui estamos criando a "Instância" que será usada no Login
export const supabase = createClient(supabaseUrl, supabaseKey);