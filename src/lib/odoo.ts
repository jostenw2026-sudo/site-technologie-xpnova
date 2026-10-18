/**
 * lib/odoo.ts — Client JSON-RPC minimal vers le CRM Odoo du groupe
 * (repris de portail-xp-nova/src/lib/odoo.ts, réduit à la création).
 *
 * Secrets injectés par l'environnement (Coolify) — jamais dans le dépôt :
 * ODOO_URL, ODOO_DB, ODOO_USER, ODOO_API_KEY. Sans eux : odooConfigured() = false.
 */

interface JsonRpcResponse<T> {
  result?: T;
  error?: { message?: string; data?: { message?: string } };
}

function config() {
  const url = process.env.ODOO_URL?.replace(/\/$/, "");
  const db = process.env.ODOO_DB;
  const user = process.env.ODOO_USER;
  const apiKey = process.env.ODOO_API_KEY;
  if (!url || !db || !user || !apiKey) return null;
  return { url, db, user, apiKey };
}

export const odooConfigured = (): boolean => config() !== null;

async function rpc<T>(url: string, service: string, method: string, args: unknown[]): Promise<T> {
  const res = await fetch(`${url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "call", params: { service, method, args }, id: Date.now() }),
    signal: AbortSignal.timeout(15_000),
  });
  const data = (await res.json()) as JsonRpcResponse<T>;
  if (data.error) throw new Error(data.error.data?.message ?? data.error.message ?? "Erreur Odoo");
  return data.result as T;
}

/** Crée un enregistrement Odoo (ex. crm.lead). Retourne l'id créé. */
export async function odooCreate(model: string, values: Record<string, unknown>): Promise<number> {
  const c = config();
  if (!c) throw new Error("Odoo non configuré");
  const uid = await rpc<number | false>(c.url, "common", "authenticate", [c.db, c.user, c.apiKey, {}]);
  if (!uid) throw new Error("Authentification Odoo refusée");
  return rpc<number>(c.url, "object", "execute_kw", [c.db, uid, c.apiKey, model, "create", [values]]);
}
