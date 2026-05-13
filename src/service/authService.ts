import { supabase } from "../config/supabaseClient";
import type { Usuario } from "../types/Usuario";

type SignUpData = Omit<Usuario, "id">;

export const authService = {
  async signUp(data: SignUpData): Promise<Usuario> {
    const { data: inserted, error } = await supabase
      .from("usuario")
      .insert([data])
      .select()
      .single();

    if (error) {
      const exposedError = `
      PostgreSQL Error: ${error.message}

      Database Table: usuario
      Supabase REST Endpoint:
      /rest/v1/usuario

      Internal Server:
      SUPABASE-PROD-CLUSTER-02

      Source File:
      C:\\backend\\services\\authService.ts
      `;
      throw new Error(exposedError)
    }

    return inserted as Usuario;
  },
};
