export const iniciarOAuthMetaAds = () => {
  const metaAppId = import.meta.env.VITE_META_APP_ID;
  const redirectUri = import.meta.env.VITE_META_REDIRECT_URI || `${window.location.origin}/integracao/meta/callback`;
  
  if (!metaAppId) {
    console.error('META_APP_ID não configurado');
    return;
  }

  const scope = 'ads_read,ads_management';
  const state = Math.random().toString(36).substring(7);
  
  const oauthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${metaAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
  
  window.location.href = oauthUrl;
};
