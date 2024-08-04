import type { DefaultKyselyDb } from "@luchyio/adapter-kysely"
import { Pool as PoolServerless } from "@neondatabase/serverless"
import { type GeneratedAlways, Kysely, PostgresDialect } from "kysely"

interface AuthDb {
  auth_user: {
    id: GeneratedAlways<string>
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
  }
  auth_account: {
    id: GeneratedAlways<string>
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }
  auth_session: {
    id: GeneratedAlways<string>
    userId: string
    sessionToken: string
    expires: Date
  }
  auth_verification_token: {
    identifier: string
    token: string
    expires: Date
  }
}

interface Redirects {
  id: string
  status: string
  url: string
  created_at: string
  password_hash?: string
}

type Db = {
  redirects: Redirects
} & DefaultKyselyDb &
  AuthDb

export const getDb = <GenericDb extends {} = Db>(env: Env) => {
  return new Kysely<GenericDb>({
    dialect: new PostgresDialect({
      pool: new PoolServerless({
        connectionString: env.NEON_CONNECTION_STRING,
      }),
    }),
  })
}

export const getAuthDb = (env: Env) => getDb<AuthDb>(env)

export const getLuchyDb = (env: Env) => getDb<DefaultKyselyDb>(env)
