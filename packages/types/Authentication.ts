/**
 * SAML認証情報のマッピング型
 */
export type SamlProfile = {
  'http://schemas.auth0.com/clientID': string | null;
  'http://schemas.auth0.com/created_at': string | null;
  'http://schemas.auth0.com/identities/default/connection': string | null;
  'http://schemas.auth0.com/identities/default/provider': string | null;
  'http://schemas.auth0.com/nickname': string | null;
  'http://schemas.auth0.com/picture': string | null;
  'http://schemas.auth0.com/updated_at': string | null;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress':
    | string
    | null;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string | null;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier':
    | string
    | null;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn': string | null;
};

/**
 * SAML認証情報のマッピング型
 */
export type Profile = {
  clientID: string | null;
  createdAtText: string | null;
  connection: string | null;
  provider: string | null;
  nickname: string | null;
  photoURL: string | null;
  updatedAtText: string | null;
  email: string | null;
  name: string | null;
};

export function convertProfile(samlProfile: SamlProfile): Profile {
  const {
    'http://schemas.auth0.com/clientID': clientID,
    'http://schemas.auth0.com/created_at': createdAtText,
    'http://schemas.auth0.com/identities/default/connection': connection,
    'http://schemas.auth0.com/identities/default/provider': provider,
    'http://schemas.auth0.com/nickname': nickname,
    'http://schemas.auth0.com/picture': photoURL,
    'http://schemas.auth0.com/updated_at': updatedAtText,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': email,
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': name,
  } = samlProfile;

  return {
    clientID,
    createdAtText,
    connection,
    provider,
    nickname,
    photoURL,
    updatedAtText,
    email,
    name,
  };
}
